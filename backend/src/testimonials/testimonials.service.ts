import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Testimonial } from './entities/testimonial.entity';
import {
  CreateTestimonialDto,
  UpdateTestimonialDto,
} from './dto/create-testimonial.dto';

const INITIAL_TESTIMONIALS = [
  {
    clientName: 'Ana Paula Silva',
    text: 'Amei o resultado! A Desiree tem um talento incrível. Minha sobrancelha ficou perfeita, super natural e realçou muito meu olhar. Recomendo de olhos fechados!',
    rating: 5,
    service: 'Design de Sobrancelhas',
    isActive: true,
    order: 0,
  },
  {
    clientName: 'Marcos Oliveira',
    text: 'Fiz micropigmentação de barba e fiquei impressionado com o resultado. Muito natural e exatamente o que eu queria. Profissional excelente e atenciosa!',
    rating: 5,
    service: 'Micropigmentação de Barba',
    isActive: true,
    order: 1,
  },
  {
    clientName: 'Carla Mendes',
    text: 'Comecei o tratamento de remoção de tatuagem e já na primeira sessão vi diferença. A Desiree é muito cuidadosa e explica todo o processo. Estou muito satisfeita!',
    rating: 5,
    service: 'Remoção de Tatuagem a Laser',
    isActive: true,
    order: 2,
  },
];

@Injectable()
export class TestimonialsService implements OnModuleInit {
  constructor(
    @InjectRepository(Testimonial)
    private readonly testimonialRepository: Repository<Testimonial>,
  ) {}

  async onModuleInit() {
    await this.seedInitialTestimonials();
  }

  private async seedInitialTestimonials() {
    const count = await this.testimonialRepository.count();
    if (count === 0) {
      const items = INITIAL_TESTIMONIALS.map((t) =>
        this.testimonialRepository.create(t),
      );
      await this.testimonialRepository.save(items);
      console.log(' ✅ Depoimentos iniciais criados');
    }
  }

  async findActive(): Promise<Testimonial[]> {
    return this.testimonialRepository.find({
      where: { isActive: true },
      order: { order: 'ASC' },
    });
  }

  async findAll(): Promise<Testimonial[]> {
    return this.testimonialRepository.find({
      order: { order: 'ASC', createdAt: 'DESC' },
    });
  }

  async create(dto: CreateTestimonialDto): Promise<Testimonial> {
    const testimonial = this.testimonialRepository.create({
      ...dto,
      rating: dto.rating ?? 5,
    });
    return this.testimonialRepository.save(testimonial);
  }

  async update(id: number, dto: UpdateTestimonialDto): Promise<Testimonial> {
    const testimonial = await this.findOne(id);
    Object.assign(testimonial, dto);
    return this.testimonialRepository.save(testimonial);
  }

  async remove(id: number): Promise<void> {
    const testimonial = await this.findOne(id);
    await this.testimonialRepository.remove(testimonial);
  }

  async toggle(id: number): Promise<Testimonial> {
    const testimonial = await this.findOne(id);
    testimonial.isActive = !testimonial.isActive;
    return this.testimonialRepository.save(testimonial);
  }

  private async findOne(id: number): Promise<Testimonial> {
    const testimonial = await this.testimonialRepository.findOne({
      where: { id },
    });
    if (!testimonial) {
      throw new NotFoundException(`Depoimento #${id} não encontrado`);
    }
    return testimonial;
  }
}
