import {
  Controller,
  Get,
  Put,
  Body,
  UseGuards,
  Request,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
  ApiResponse,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { AdminService } from './admin.service';
import { ChangePasswordDto, ChangeEmailDto } from './dto/create-admin.dto';

@ApiTags('Admin')
@ApiBearerAuth('JWT-auth')
@UseGuards(JwtAuthGuard) // Todas as rotas deste controller exigem JWT
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('profile')
  @ApiOperation({ summary: 'Retorna os dados do admin logado' })
  @ApiResponse({ status: 200, description: 'Perfil do administrador' })
  async getProfile(@Request() req) {
    return this.adminService.getProfile(req.user.id);
  }

  @Put('change-password')
  @ApiOperation({ summary: 'Altera a senha do admin' })
  @ApiResponse({ status: 200, description: 'Senha alterada com sucesso' })
  @ApiResponse({ status: 401, description: 'Senha atual incorreta' })
  async changePassword(@Request() req, @Body() dto: ChangePasswordDto) {
    return this.adminService.changePassword(req.user.id, dto);
  }

  @Put('change-email')
  @ApiOperation({ summary: 'Altera o email do admin' })
  @ApiResponse({ status: 200, description: 'Email alterado com sucesso' })
  @ApiResponse({ status: 409, description: 'Email já em uso' })
  async changeEmail(@Request() req, @Body() dto: ChangeEmailDto) {
    return this.adminService.changeEmail(req.user.id, dto);
  }
}
