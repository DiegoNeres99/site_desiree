import { IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateContentDto {
  @ApiProperty({
    description: 'Novo valor para o campo',
    example: 'Especialista em Design de Sobrancelhas',
  })
  @IsString()
  @IsOptional()
  value: string;
}
