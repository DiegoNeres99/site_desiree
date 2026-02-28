import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

export type GalleryCategory = 'sobrancelha' | 'tatuagem' | 'barba' | 'outros';

@Entity('gallery_images')
export class GalleryImage {
  @PrimaryGeneratedColumn()
  id: number;

  /**
   * URL segura da imagem no Cloudinary
   */
  @Column()
  url: string;

  /**
   * ID público do Cloudinary — necessário para deletar a imagem
   * Ex: desiree/gallery/abc123
   */
  @Column({ name: 'public_id' })
  publicId: string;

  @Column({
    type: 'enum',
    enum: ['sobrancelha', 'tatuagem', 'barba', 'outros'],
    default: 'outros',
  })
  category: GalleryCategory;

  @Column({ length: 150, nullable: true })
  title: string;

  @Column({ default: 0 })
  order: number;

  @Column({ name: 'is_active', default: true })
  isActive: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
