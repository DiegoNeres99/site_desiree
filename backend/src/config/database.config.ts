import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

/**
 * Retorna as opções do TypeORM com base nas variáveis de ambiente.
 * Usado no AppModule para configurar a conexão com o PostgreSQL.
 */
export const getDatabaseConfig = (
  configService: ConfigService,
): TypeOrmModuleOptions => ({
  type: 'postgres',
  host: configService.get<string>('DATABASE_HOST', 'localhost'),
  port: configService.get<number>('DATABASE_PORT', 5432),
  username: configService.get<string>('DATABASE_USER', 'postgres'),
  password: configService.get<string>('DATABASE_PASS', 'postgres'),
  database: configService.get<string>('DATABASE_NAME', 'desiree_db'),
  // Entidades serão carregadas automaticamente pelo autoLoadEntities
  autoLoadEntities: true,
  // Em produção, desabilitar synchronize e usar migrations
  synchronize: configService.get<string>('NODE_ENV') !== 'production',
  logging: configService.get<string>('NODE_ENV') === 'development',
});
