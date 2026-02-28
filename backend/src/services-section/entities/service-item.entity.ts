import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
} from 'typeorm';

@Entity('service_items')
export class ServiceItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  title: string;

  @Column({ type: 'text' })
  description: string;

  /**
   * Nome do ícone (ex: nome de um lucide-react ou emoji)
   */
  @Column({ length: 50, nullable: true })
  icon: string;

  /**
   * URL da imagem do serviço (armazenada no Cloudinary)
   */
  @Column({ name: 'image_url', nullable: true })
  imageUrl: string;

  /**
   * Ordem de exibição na página (menor número = aparece primeiro)
   */
  @Column({ default: 0 })
  order: number;

  /**
   * Se false, não aparece no site público
   */
  @Column({ name: 'is_active', default: true })
  isActive: boolean;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
