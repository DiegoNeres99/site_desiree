import { IsEmail, IsString, MinLength, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAdminDto {
  @ApiProperty({ example: 'Desiree Honório' })
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  name: string;

  @ApiProperty({ example: 'admin@desireehonorio.com.br' })
  @IsEmail({}, { message: 'Informe um email válido' })
  email: string;

  @ApiProperty({ example: 'Admin@2024', minLength: 8 })
  @IsString()
  @MinLength(8, { message: 'A senha deve ter no mínimo 8 caracteres' })
  password: string;
}

export class ChangePasswordDto {
  @ApiProperty({ description: 'Senha atual' })
  @IsString()
  currentPassword: string;

  @ApiProperty({ description: 'Nova senha (mínimo 8 caracteres)' })
  @IsString()
  @MinLength(8, { message: 'A nova senha deve ter no mínimo 8 caracteres' })
  newPassword: string;
}

export class ChangeEmailDto {
  @ApiProperty({ example: 'novo@email.com.br' })
  @IsEmail({}, { message: 'Informe um email válido' })
  newEmail: string;

  @ApiProperty({ description: 'Senha atual para confirmar a alteração' })
  @IsString()
  currentPassword: string;
}
