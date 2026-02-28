import {
  Injectable,
  NotFoundException,
  OnModuleInit,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ServiceItem } from './entities/service-item.entity';
import {
  CreateServiceDto,
  UpdateServiceDto,
  ReorderServicesDto,
} from './dto/update-service.dto';

const INITIAL_SERVICES = [
  {
    title: 'Design de Sobrancelhas',
    description: 'Técnica exclusiva de design que realça o olhar com precisão e naturalidade. Utilizamos fios de seda ou cera para modelar o formato ideal para cada rosto, valorizando seus traços únicos.',
    icon: '✨',
    order: 0,
    isActive: true,
  },
  {
    title: 'Remoção de Tatuagem a Laser',
    description: 'Tecnologia laser de última geração para remoção segura e eficaz de tatuagens. Processo gradual com mínimo desconforto, adaptado ao tipo de pele e cor da tatuagem.',
    icon: '💫',
    order: 1,
    isActive: true,
  },
  {
    title: 'Micropigmentação de Sobrancelha',
    description: 'Técnica de pigmentação que simula fios reais, corrigindo falhas e definindo o formato ideal das sobrancelhas. Resultado natural e duradouro por até 2 anos.',
    icon: '🎨',
    order: 2,
    isActive: true,
  },
  {
    title: 'Micropigmentação de Barba',
    description: 'Solução perfeita para preencher falhas na barba e definir o contorno facial. Técnica especializada que proporciona um visual mais jovem e bem cuidado.',
    icon: '🪒',
    order: 3,
    isActive: true,
  },
];

@Injectable()
export class ServicesSectionService implements OnModuleInit {
  constructor(
    @InjectRepository(ServiceItem)
    private readonly serviceRepository: Repository<ServiceItem>,
  ) {}

  async onModuleInit() {
    await this.seedInitialServices();
  }

  private async seedInitialServices() {
    const count = await this.serviceRepository.count();
    if (count === 0) {
      const items = INITIAL_SERVICES.map((s) =>
        this.serviceRepository.create(s),
      );
      await this.serviceRepository.save(items);
      console.log(' ✅ Serviços iniciais criados');
    }
  }

  /** Lista apenas serviços ativos (rota pública) */
  async findActive(): Promise<ServiceItem[]> {
    return this.serviceRepository.find({
      where: { isActive: true },
      order: { order: 'ASC' },
    });
  }

  /** Lista todos os serviços incluindo inativos (rota protegida) */
  async findAll(): Promise<ServiceItem[]> {
    return this.serviceRepository.find({ order: { order: 'ASC' } });
  }

  async findOne(id: number): Promise<ServiceItem> {
    const item = await this.serviceRepository.findOne({ where: { id } });
    if (!item) throw new NotFoundException(`Serviço #${id} não encontrado`);
    return item;
  }

  async create(dto: CreateServiceDto): Promise<ServiceItem> {
    const service = this.serviceRepository.create(dto);
    return this.serviceRepository.save(service);
  }

  async update(id: number, dto: UpdateServiceDto): Promise<ServiceItem> {
    const service = await this.findOne(id);
    Object.assign(service, dto);
    return this.serviceRepository.save(service);
  }

  async remove(id: number): Promise<void> {
    const service = await this.findOne(id);
    await this.serviceRepository.remove(service);
  }

  async toggle(id: number): Promise<ServiceItem> {
    const service = await this.findOne(id);
    service.isActive = !service.isActive;
    return this.serviceRepository.save(service);
  }

  /** Reordena múltiplos serviços em uma única operação */
  async reorder(dto: ReorderServicesDto): Promise<void> {
    const updates = dto.items.map(({ id, order }) =>
      this.serviceRepository.update(id, { order }),
    );
    await Promise.all(updates);
  }
}
