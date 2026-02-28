import {
  IsString,
  IsOptional,
  IsEnum,
  IsNumber,
  IsBoolean,
} from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { GalleryCategory } from '../entities/gallery-image.entity';

export class UploadImageDto {
  @ApiPropertyOptional({ example: 'Sobrancelha fio a fio' })
  @IsString()
  @IsOptional()
  title?: string;

  @ApiPropertyOptional({
    enum: ['sobrancelha', 'tatuagem', 'barba', 'outros'],
    default: 'outros',
  })
  @IsEnum(['sobrancelha', 'tatuagem', 'barba', 'outros'])
  @IsOptional()
  category?: GalleryCategory;

  @ApiPropertyOptional()
  @IsNumber()
  @IsOptional()
  order?: number;
}

export class UpdateGalleryImageDto {
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  title?: string;

  @ApiPropertyOptional({ enum: ['sobrancelha', 'tatuagem', 'barba', 'outros'] })
  @IsEnum(['sobrancelha', 'tatuagem', 'barba', 'outros'])
  @IsOptional()
  category?: GalleryCategory;

  @ApiPropertyOptional()
  @IsNumber()
  @IsOptional()
  order?: number;

  @ApiPropertyOptional()
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}
