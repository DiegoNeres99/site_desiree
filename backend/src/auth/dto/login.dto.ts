import { IsEmail, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({
    example: 'admin@desireehonorio.com.br',
    description: 'Email do administrador',
  })
  @IsEmail({}, { message: 'Informe um email válido' })
  email: string;

  @ApiProperty({
    example: 'Admin@2024',
    description: 'Senha do administrador (mínimo 6 caracteres)',
  })
  @IsString()
  @MinLength(6, { message: 'A senha deve ter no mínimo 6 caracteres' })
  password: string;
}
