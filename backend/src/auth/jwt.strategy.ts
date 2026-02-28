import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Admin } from '../admin/admin.entity';

/**
 * Estratégia JWT do Passport.
 * Extrai o token do header Authorization: Bearer <token>
 * e valida o payload, retornando o admin correspondente.
 */
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    @InjectRepository(Admin)
    private readonly adminRepository: Repository<Admin>,
  ) {
    super({
      // Extrai o token do header Authorization: Bearer <token>
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET'),
    });
  }

  /**
   * Chamado após a verificação da assinatura do token.
   * O payload contém os dados que foram colocados no token no momento do login.
   */
  async validate(payload: { sub: number; email: string }) {
    const admin = await this.adminRepository.findOne({
      where: { id: payload.sub },
    });

    if (!admin) {
      throw new UnauthorizedException('Administrador não encontrado');
    }

    // O objeto retornado aqui fica disponível como req.user nas rotas protegidas
    return { id: admin.id, email: admin.email, name: admin.name };
  }
}
