import { v2 as cloudinary } from 'cloudinary';
import { ConfigService } from '@nestjs/config';

/**
 * Configura o SDK do Cloudinary com as credenciais do .env.
 * Esta função é chamada no UploadModule durante a inicialização.
 */
export const configureCloudinary = (configService: ConfigService): void => {
  cloudinary.config({
    cloud_name: configService.get<string>('CLOUDINARY_CLOUD_NAME'),
    api_key: configService.get<string>('CLOUDINARY_API_KEY'),
    api_secret: configService.get<string>('CLOUDINARY_API_SECRET'),
    secure: true, // Sempre usar HTTPS
  });
};

export { cloudinary };
