import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import ContasReceber from '@modules/contasReceber/infra/typeorm/entities/ContasReceber';
import Produto from '@modules/projetos/infra/typeorm/entities/Produtos';

@Entity('contasReceberItens')
class ContasReceberItens {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  contas_receber_id: string;

  @ManyToOne(() => ContasReceber)
  @JoinColumn({ name: 'contas_receber_id' })
  contasReceber: ContasReceber;

  @Column()
  produto_id: string;

  @ManyToOne(() => Produto)
  @JoinColumn({ name: 'produto_id' })
  produto: Produto;

  @Column()
  tipo_produto: string;

  @Column()
  ordem_item: number;

  @Column()
  descricao_item: string;

  @Column({ type: 'decimal' })
  valor_item: number;

  @Column('timestamp with time zone')
  dt_receber: Date;

  @Column({ type: 'decimal' })
  vl_receber: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default ContasReceberItens;
