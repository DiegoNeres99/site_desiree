import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ThrottlerModule } from '@nestjs/throttler';
import { getDatabaseConfig } from './config/database.config';
import { AuthModule } from './auth/auth.module';
import { AdminModule } from './admin/admin.module';
import { SiteContentModule } from './site-content/site-content.module';
import { ServicesSectionModule } from './services-section/services-section.module';
import { GalleryModule } from './gallery/gallery.module';
import { TestimonialsModule } from './testimonials/testimonials.module';
import { UploadModule } from './upload/upload.module';

@Module({
  imports: [
    // ─── Variáveis de Ambiente ─────────────────────────────────────────
    ConfigModule.forRoot({
      isGlobal: true,     // Disponível em todos os módulos sem importar
      envFilePath: '.env',
    }),

    // ─── Banco de Dados PostgreSQL ─────────────────────────────────────
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getDatabaseConfig,
    }),

    // ─── Rate Limiting (proteção contra brute force) ───────────────────
    // Máximo de 100 requisições por minuto por IP (geral)
    // Regra mais restritiva para /auth/login definida no AuthController
    ThrottlerModule.forRoot([
      {
        ttl: 60000,   // janela de tempo: 60 segundos
        limit: 100,   // máximo de requisições nessa janela
      },
    ]),

    // ─── Módulos da Aplicação ──────────────────────────────────────────
    AuthModule,
    AdminModule,
    SiteContentModule,
    ServicesSectionModule,
    GalleryModule,
    TestimonialsModule,
    UploadModule,
  ],
})
export class AppModule {}
