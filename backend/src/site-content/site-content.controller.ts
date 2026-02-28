import {
  Controller,
  Get,
  Put,
  Post,
  Param,
  Body,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
  ApiParam,
  ApiResponse,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { SiteContentService } from './site-content.service';
import { UpdateContentDto } from './dto/update-content.dto';

@ApiTags('Site Content')
@Controller('site-content')
export class SiteContentController {
  constructor(private readonly siteContentService: SiteContentService) {}

  // ─── Rotas Públicas ───────────────────────────────────────────────

  @Get()
  @ApiOperation({
    summary: 'Retorna todos os conteúdos do site',
    description: 'Rota pública — usada pelo frontend React para carregar os textos do site',
  })
  @ApiResponse({
    status: 200,
    description: 'Conteúdos agrupados por seção',
    schema: {
      example: {
        hero: { title: 'Realce Sua Beleza Natural', subtitle: '...' },
        about: { title: 'Sobre Desiree', description: '...' },
      },
    },
  })
  findAll() {
    return this.siteContentService.findAll();
  }

  @Get(':section')
  @ApiOperation({ summary: 'Retorna conteúdos de uma seção específica' })
  @ApiParam({ name: 'section', enum: ['hero', 'about', 'contact', 'seo'] })
  findBySection(@Param('section') section: string) {
    return this.siteContentService.findBySection(section);
  }

  // ─── Rotas Protegidas (exigem JWT) ───────────────────────────────

  @Put(':section/:key')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Atualiza um campo de conteúdo' })
  @ApiParam({ name: 'section', example: 'hero' })
  @ApiParam({ name: 'key', example: 'title' })
  @ApiResponse({ status: 200, description: 'Campo atualizado com sucesso' })
  updateContent(
    @Param('section') section: string,
    @Param('key') key: string,
    @Body() dto: UpdateContentDto,
  ) {
    return this.siteContentService.updateContent(section, key, dto);
  }

  @Post('seed')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({
    summary: 'Força re-seed dos conteúdos iniciais',
    description: '⚠️ Apaga todos os conteúdos e recria os dados padrão',
  })
  reseed() {
    return this.siteContentService.reseed();
  }
}
