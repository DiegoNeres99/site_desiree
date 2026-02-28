import {
  Injectable,
  OnModuleInit,
  NotFoundException,
  UnauthorizedException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { Admin } from './admin.entity';
import { ChangePasswordDto, ChangeEmailDto } from './dto/create-admin.dto';

@Injectable()
export class AdminService implements OnModuleInit {
  constructor(
    @InjectRepository(Admin)
    private readonly adminRepository: Repository<Admin>,
  ) {}

  /**
   * Roda automaticamente quando o módulo é inicializado.
   * Cria o admin padrão se não existir nenhum no banco.
   */
  async onModuleInit() {
    await this.seedDefaultAdmin();
  }

  /**
   * Cria o admin padrão na primeira inicialização da aplicação.
   */
  private async seedDefaultAdmin() {
    const adminCount = await this.adminRepository.count();

    if (adminCount === 0) {
      const hashedPassword = await bcrypt.hash('Admin@2024', 12);

      const admin = this.adminRepository.create({
        name: 'Desiree Honório',
        email: 'admin@desireehonorio.com.br',
        password: hashedPassword,
      });

      await this.adminRepository.save(admin);
      console.log(' ✅ Admin padrão criado: admin@desireehonorio.com.br');
    }
  }

  /**
   * Retorna os dados do admin logado (sem a senha).
   */
  async getProfile(adminId: number) {
    const admin = await this.adminRepository.findOne({
      where: { id: adminId },
      select: ['id', 'name', 'email', 'createdAt'],
    });

    if (!admin) {
      throw new NotFoundException('Administrador não encontrado');
    }

    return admin;
  }

  /**
   * Altera a senha do admin após verificar a senha atual.
   */
  async changePassword(adminId: number, dto: ChangePasswordDto) {
    const admin = await this.adminRepository.findOne({ where: { id: adminId } });

    if (!admin) throw new NotFoundException('Administrador não encontrado');

    const isCurrentPasswordValid = await bcrypt.compare(
      dto.currentPassword,
      admin.password,
    );

    if (!isCurrentPasswordValid) {
      throw new UnauthorizedException('Senha atual incorreta');
    }

    admin.password = await bcrypt.hash(dto.newPassword, 12);
    await this.adminRepository.save(admin);

    return { message: 'Senha alterada com sucesso' };
  }

  /**
   * Altera o email do admin após verificar a senha atual.
   */
  async changeEmail(adminId: number, dto: ChangeEmailDto) {
    const admin = await this.adminRepository.findOne({ where: { id: adminId } });

    if (!admin) throw new NotFoundException('Administrador não encontrado');

    // Verifica se o email já está em uso
    const emailExists = await this.adminRepository.findOne({
      where: { email: dto.newEmail },
    });

    if (emailExists && emailExists.id !== adminId) {
      throw new ConflictException('Este email já está em uso');
    }

    const isPasswordValid = await bcrypt.compare(
      dto.currentPassword,
      admin.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Senha incorreta');
    }

    admin.email = dto.newEmail;
    await this.adminRepository.save(admin);

    return { message: 'Email alterado com sucesso' };
  }
}
