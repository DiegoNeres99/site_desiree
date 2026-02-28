import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Patch,
  Body,
  Param,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
  ApiResponse,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ServicesSectionService } from './services-section.service';
import {
  CreateServiceDto,
  UpdateServiceDto,
  ReorderServicesDto,
} from './dto/update-service.dto';

@ApiTags('Services')
@Controller('services')
export class ServicesSectionController {
  constructor(private readonly servicesService: ServicesSectionService) {}

  // ─── Rotas Públicas ───────────────────────────────────────────────

  @Get()
  @ApiOperation({ summary: 'Lista todos os serviços ativos' })
  findActive() {
    return this.servicesService.findActive();
  }

  // ─── Rotas Protegidas ─────────────────────────────────────────────

  @Get('all')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Lista todos os serviços (incluindo inativos)' })
  findAll() {
    return this.servicesService.findAll();
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Cria um novo serviço' })
  @ApiResponse({ status: 201, description: 'Serviço criado' })
  create(@Body() dto: CreateServiceDto) {
    return this.servicesService.create(dto);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Atualiza um serviço' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateServiceDto,
  ) {
    return this.servicesService.update(id, dto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Remove um serviço' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.servicesService.remove(id);
  }

  @Patch(':id/toggle')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Ativa ou desativa um serviço' })
  toggle(@Param('id', ParseIntPipe) id: number) {
    return this.servicesService.toggle(id);
  }

  @Patch('reorder')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Reordena múltiplos serviços' })
  reorder(@Body() dto: ReorderServicesDto) {
    return this.servicesService.reorder(dto);
  }
}
