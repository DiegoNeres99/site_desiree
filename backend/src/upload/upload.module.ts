import { Module, Global } from '@nestjs/common';
import { UploadService } from './upload.service';

/**
 * @Global() — torna o UploadService disponível em toda a aplicação
 * sem precisar importar o UploadModule em cada módulo.
 */
@Global()
@Module({
  providers: [UploadService],
  exports: [UploadService],
})
export class UploadModule {}
