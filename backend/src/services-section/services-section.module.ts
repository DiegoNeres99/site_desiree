import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServicesSectionController } from './services-section.controller';
import { ServicesSectionService } from './services-section.service';
import { ServiceItem } from './entities/service-item.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ServiceItem])],
  controllers: [ServicesSectionController],
  providers: [ServicesSectionService],
  exports: [ServicesSectionService],
})
export class ServicesSectionModule {}
