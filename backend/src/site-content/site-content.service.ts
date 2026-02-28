import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SiteContent } from './entities/site-content.entity';
import { UpdateContentDto } from './dto/update-content.dto';

/** Dados iniciais do site para popular o banco na primeira execução */
const INITIAL_CONTENT = [
  // ─── Seção Hero ───────────────────────────────────────────
  { section: 'hero', key: 'title', value: 'Realce Sua Beleza Natural' },
  { section: 'hero', key: 'subtitle', value: 'Especialista em design de sobrancelhas, micropigmentação e remoção de tatuagem a laser em Curitiba' },
  { section: 'hero', key: 'cta_text', value: 'Agendar Consulta' },
  { section: 'hero', key: 'cta_whatsapp', value: '5541999999999' },

  // ─── Seção Sobre ──────────────────────────────────────────
  { section: 'about', key: 'title', value: 'Sobre Desiree Honório' },
  { section: 'about', key: 'description', value: 'Sou esteticista especialista com mais de 8 anos de experiência. Minha missão é realçar a beleza natural de cada cliente com técnicas modernas e seguras, sempre priorizando resultados naturais e duradouros.' },
  { section: 'about', key: 'years_experience', value: '8' },
  { section: 'about', key: 'clients_count', value: '500' },
  { section: 'about', key: 'certifications_count', value: '12' },
  { section: 'about', key: 'photo_url', value: '' },

  // ─── Seção Contato ────────────────────────────────────────
  { section: 'contact', key: 'whatsapp', value: '5541999999999' },
  { section: 'contact', key: 'email', value: 'contato@desireehonorio.com.br' },
  { section: 'contact', key: 'address', value: 'Rua das Flores, 123' },
  { section: 'contact', key: 'city', value: 'Curitiba - PR' },
  { section: 'contact', key: 'working_hours', value: 'Segunda a Sábado: 9h às 18h' },
  { section: 'contact', key: 'instagram_url', value: 'https://instagram.com/desireehonorio' },
  { section: 'contact', key: 'facebook_url', value: '' },

  // ─── SEO ──────────────────────────────────────────────────
  { section: 'seo', key: 'meta_title', value: 'Desiree Honório — Esteticista Especialista em Curitiba' },
  { section: 'seo', key: 'meta_description', value: 'Design de sobrancelhas, micropigmentação e remoção de tatuagem a laser. Agende sua consulta em Curitiba.' },
];

@Injectable()
export class SiteContentService implements OnModuleInit {
  constructor(
    @InjectRepository(SiteContent)
    private readonly contentRepository: Repository<SiteContent>,
  ) {}

  /** Seed automático na inicialização */
  async onModuleInit() {
    await this.seedInitialContent();
  }

  private async seedInitialContent() {
    const count = await this.contentRepository.count();
    if (count === 0) {
      const items = INITIAL_CONTENT.map((item) =>
        this.contentRepository.create(item),
      );
      await this.contentRepository.save(items);
      console.log(' ✅ Conteúdos iniciais do site criados');
    }
  }

  /** Retorna todos os conteúdos agrupados por seção */
  async findAll(): Promise<Record<string, Record<string, string>>> {
    const items = await this.contentRepository.find({
      order: { section: 'ASC', key: 'ASC' },
    });

    // Transforma array em objeto agrupado: { hero: { title: '...' }, about: { ... } }
    return items.reduce((acc, item) => {
      if (!acc[item.section]) acc[item.section] = {};
      acc[item.section][item.key] = item.value;
      return acc;
    }, {} as Record<string, Record<string, string>>);
  }

  /** Retorna conteúdos de uma seção específica */
  async findBySection(section: string): Promise<Record<string, string>> {
    const items = await this.contentRepository.find({
      where: { section },
      order: { key: 'ASC' },
    });

    if (items.length === 0) {
      throw new NotFoundException(`Seção '${section}' não encontrada`);
    }

    return items.reduce((acc, item) => {
      acc[item.key] = item.value;
      return acc;
    }, {} as Record<string, string>);
  }

  /** Atualiza o valor de um campo específico */
  async updateContent(
    section: string,
    key: string,
    dto: UpdateContentDto,
  ): Promise<SiteContent> {
    let item = await this.contentRepository.findOne({
      where: { section, key },
    });

    if (!item) {
      // Se não existir, cria o registro
      item = this.contentRepository.create({ section, key, value: dto.value });
    } else {
      item.value = dto.value;
    }

    return this.contentRepository.save(item);
  }

  /** Força re-seed dos dados iniciais (protegido por JWT) */
  async reseed() {
    await this.contentRepository.delete({});
    await this.seedInitialContent();
    return { message: 'Dados re-populados com sucesso' };
  }
}
