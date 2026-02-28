import {
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { Admin } from '../admin/admin.entity';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Admin)
    private readonly adminRepository: Repository<Admin>,
    private readonly jwtService: JwtService,
  ) {}

  /**
   * Valida as credenciais do admin e retorna um JWT token.
   * Arremessa UnauthorizedException se as credenciais forem inválidas.
   */
  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;

    // Busca o admin pelo email
    const admin = await this.adminRepository.findOne({ where: { email } });

    if (!admin) {
      // Mensagem genérica para não revelar se o email existe
      throw new UnauthorizedException('Credenciais inválidas');
    }

    // Compara a senha com o hash armazenado
    const isPasswordValid = await bcrypt.compare(password, admin.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    // Payload que será codificado no JWT
    const payload = { sub: admin.id, email: admin.email };
    const token = this.jwtService.sign(payload);

    return {
      access_token: token,
      admin: {
        id: admin.id,
        name: admin.name,
        email: admin.email,
      },
    };
  }
}
