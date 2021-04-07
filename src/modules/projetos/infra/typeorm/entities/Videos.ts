import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm';

import Projeto from './Projetos';

@Entity('videos')
class Videos {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  projeto_id: string;

  @ManyToOne(() => Projeto, projeto => projeto.videos)
  @JoinColumn({ name: 'projeto_id' })
  projeto: Projeto;

  @Column('boolean', { default: true })
  ativo: boolean;

  @Column()
  link_video: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Videos;
