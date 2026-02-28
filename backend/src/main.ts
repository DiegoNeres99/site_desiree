import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import helmet from 'helmet';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT', 3000);

  // ─── Segurança: Headers HTTP com Helmet ──────────────────────────
  app.use(helmet());

  // ─── CORS ────────────────────────────────────────────────────────
  // Permite apenas os domínios configurados no .env
  const allowedOrigins = [
    configService.get<string>('FRONTEND_URL', 'http://localhost:5173'),
    configService.get<string>('ADMIN_URL', 'http://localhost:5174'),
  ];
  app.enableCors({
    origin: allowedOrigins,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  });

  // ─── Prefixo Global da API ────────────────────────────────────────
  app.setGlobalPrefix('api');

  // ─── Validação Global com class-validator ─────────────────────────
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,        // Remove campos não declarados no DTO
      forbidNonWhitelisted: true, // Rejeita requisições com campos extras
      transform: true,        // Converte tipos automaticamente
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  // ─── Swagger (Documentação da API) ────────────────────────────────
  if (configService.get<string>('NODE_ENV') !== 'production') {
    const swaggerConfig = new DocumentBuilder()
      .setTitle('Desiree Honório — API')
      .setDescription(
        'API completa para o site e painel administrativo da esteticista Desiree Honório.\n\n' +
        '**Login padrão:** admin@desireehonorio.com.br / Admin@2024\n\n' +
        'Após o login, clique em **Authorize** e cole o token no formato: `Bearer <token>`',
      )
      .setVersion('1.0')
      .addBearerAuth(
        {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'Insira o JWT token retornado pelo endpoint /api/auth/login',
        },
        'JWT-auth',
      )
      .addTag('Auth', 'Autenticação do painel administrativo')
      .addTag('Admin', 'Gerenciamento do administrador')
      .addTag('Site Content', 'Conteúdo editável do site (textos, dados de contato)')
      .addTag('Services', 'Serviços oferecidos pela esteticista')
      .addTag('Gallery', 'Galeria de fotos do trabalho')
      .addTag('Testimonials', 'Depoimentos de clientes')
      .build();

    const document = SwaggerModule.createDocument(app, swaggerConfig);
    SwaggerModule.setup('api/docs', app, document, {
      swaggerOptions: {
        persistAuthorization: true, // Mantém o token entre recarregamentos
      },
    });
  }

  await app.listen(port);

  console.log('\n ✨ Desiree Honório API inicializada!');
  console.log(` 🚀 Servidor: http://localhost:${port}/api`);
  console.log(` 📚 Documentação: http://localhost:${port}/api/docs\n`);
}

bootstrap();
