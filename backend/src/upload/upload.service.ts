import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';

@Injectable()
export class UploadService {
  constructor(private readonly configService: ConfigService) {
    // Configura o Cloudinary com as credenciais do .env
    cloudinary.config({
      cloud_name: this.configService.get<string>('CLOUDINARY_CLOUD_NAME'),
      api_key: this.configService.get<string>('CLOUDINARY_API_KEY'),
      api_secret: this.configService.get<string>('CLOUDINARY_API_SECRET'),
      secure: true,
    });
  }

  /**
   * Faz upload de um buffer de imagem para o Cloudinary.
   * As imagens são automaticamente convertidas para WebP e redimensionadas.
   *
   * @param buffer - Buffer da imagem (vindo do Multer memoryStorage)
   * @param folder - Pasta no Cloudinary (ex: 'desiree/gallery')
   * @returns URL segura e publicId da imagem
   */
  async uploadToCloudinary(
    buffer: Buffer,
    folder: string = 'desiree/gallery',
  ): Promise<{ url: string; publicId: string }> {
    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder,
          // Converte para WebP automaticamente para melhor performance
          format: 'webp',
          // Transformações automáticas: limita a 1200px de largura
          transformation: [
            {
              width: 1200,
              height: 1200,
              crop: 'limit', // Não aumenta, apenas reduz se necessário
              quality: 'auto:good',
            },
          ],
          // Permite upload de imagens JPG, PNG, WebP
          allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
        },
        (error, result: UploadApiResponse) => {
          if (error || !result) {
            console.error('Cloudinary upload error:', error);
            reject(
              new InternalServerErrorException(
                'Falha ao fazer upload da imagem. Tente novamente.',
              ),
            );
            return;
          }
          resolve({
            url: result.secure_url,
            publicId: result.public_id,
          });
        },
      );

      // Converte o buffer para stream e envia ao Cloudinary
      const { Readable } = require('stream');
      const readableStream = new Readable();
      readableStream.push(buffer);
      readableStream.push(null);
      readableStream.pipe(uploadStream);
    });
  }

  /**
   * Faz upload de imagem para a pasta 'about' (foto da Desiree).
   * Configuração especial: retrato otimizado para foto de perfil.
   */
  async uploadAboutPhoto(buffer: Buffer): Promise<{ url: string; publicId: string }> {
    return this.uploadToCloudinary(buffer, 'desiree/about');
  }

  /**
   * Faz upload de imagem para a pasta 'services'.
   */
  async uploadServiceImage(buffer: Buffer): Promise<{ url: string; publicId: string }> {
    return this.uploadToCloudinary(buffer, 'desiree/services');
  }

  /**
   * Remove uma imagem do Cloudinary pelo seu publicId.
   * Usado quando o admin deleta uma imagem da galeria.
   */
  async deleteFromCloudinary(publicId: string): Promise<void> {
    try {
      await cloudinary.uploader.destroy(publicId);
    } catch (error) {
      console.error(`Erro ao deletar imagem do Cloudinary (${publicId}):`, error);
      // Não lança erro — a imagem pode já ter sido removida manualmente
    }
  }
}
