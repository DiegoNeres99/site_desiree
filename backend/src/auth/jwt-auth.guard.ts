import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

/**
 * Guard JWT — protege rotas que exigem autenticação.
 * Uso: @UseGuards(JwtAuthGuard) no controller ou no método.
 *
 * Retorna 401 Unauthorized automaticamente se:
 * - O token não for enviado
 * - O token for inválido
 * - O token estiver expirado
 */
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
