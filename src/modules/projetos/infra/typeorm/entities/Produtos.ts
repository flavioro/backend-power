/* eslint-disable camelcase */
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm';

import Projeto from '@modules/projetos/infra/typeorm/entities/Projetos';

@Entity('produtos')
class Produtos {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  projeto_id: string;

  @ManyToOne(() => Projeto, (projeto) => projeto.produtos)
  @JoinColumn({ name: 'projeto_id' })
  projeto: Projeto;

  @Column('boolean', { default: true })
  ativo: boolean;

  @Column()
  descricao_item: string;

  @Column({ type: 'decimal' })
  preco: number;

  @Column()
  tipo_projeto: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Produtos;
