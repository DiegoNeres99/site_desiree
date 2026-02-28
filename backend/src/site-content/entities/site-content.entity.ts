import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
  Index,
} from 'typeorm';

@Entity('site_contents')
// Índice composto único: não pode existir dois registros com mesma section + key
@Index(['section', 'key'], { unique: true })
export class SiteContent {
  @PrimaryGeneratedColumn()
  id: number;

  /**
   * Seções disponíveis: hero | about | contact | seo
   */
  @Column({ length: 50 })
  section: string;

  /**
   * Chave dentro da seção.
   * Ex: section=hero, key=title
   */
  @Column({ length: 100 })
  key: string;

  /**
   * Valor editável (texto, URL, número, etc.)
   * Usar TEXT para suportar conteúdos longos
   */
  @Column({ type: 'text', nullable: true })
  value: string;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
