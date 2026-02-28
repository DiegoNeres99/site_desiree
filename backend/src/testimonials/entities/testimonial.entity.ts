import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';
import { Min, Max } from 'class-validator';

@Entity('testimonials')
export class Testimonial {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'client_name', length: 100 })
  clientName: string;

  /**
   * URL da foto do cliente (opcional — pode usar iniciais como avatar)
   */
  @Column({ name: 'client_photo', nullable: true })
  clientPhoto: string;

  @Column({ type: 'text' })
  text: string;

  /**
   * Avaliação de 1 a 5 estrelas
   */
  @Column({ default: 5 })
  @Min(1)
  @Max(5)
  rating: number;

  /**
   * Qual serviço o cliente realizou (para contexto)
   */
  @Column({ length: 100, nullable: true })
  service: string;

  @Column({ name: 'is_active', default: true })
  isActive: boolean;

  @Column({ default: 0 })
  order: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
