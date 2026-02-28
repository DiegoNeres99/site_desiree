import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SiteContentController } from './site-content.controller';
import { SiteContentService } from './site-content.service';
import { SiteContent } from './entities/site-content.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SiteContent])],
  controllers: [SiteContentController],
  providers: [SiteContentService],
  exports: [SiteContentService],
})
export class SiteContentModule {}
