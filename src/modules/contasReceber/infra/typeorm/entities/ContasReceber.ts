import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import Pessoa from '@modules/pessoas/infra/typeorm/entities/Pessoa';
import Operadora from '@modules/operadoras/infra/typeorm/entities/Operadora';
import { number } from '@hapi/joi';

@Entity('contasReceber')
class ContasReceber {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('boolean', { default: true })
  ativo: boolean;

  @Column()
  pessoa_id: string;

  @ManyToOne(() => Pessoa)
  @JoinColumn({ name: 'pessoa_id' })
  pessoa: Pessoa;

  @Column()
  operadora_id: string;

  @ManyToOne(() => Operadora)
  @JoinColumn({ name: 'operadora_id' })
  operadora: Operadora;

  @Column()
  total_itens: number;

  @Column('timestamp with time zone')
  dt_venda: Date;

  @Column({ type: 'decimal' })
  vl_total_original: number;

  @Column('timestamp with time zone')
  dt_receber: Date;

  @Column({ type: 'decimal' })
  vl_receber: number;

  @Column({ type: 'decimal' })
  vl_parcela: number;

  @Column({ type: 'decimal' })
  vl_taxa: number;

  @Column({ type: 'decimal' })
  vl_desconto: number;

  @Column({ type: 'decimal' })
  vl_extra: number;

  @Column({ type: 'decimal' })
  tarifa_intermediacao: number;

  @Column({ type: 'decimal' })
  taxa_intermediacao: number;

  @Column({ type: 'decimal' })
  taxa_parcelamento_cartao: number;

  @Column()
  origem: string;

  @Column()
  tipo_recebimento: string;

  @Column()
  referencia: string;

  @Column()
  status: string;

  @Column()
  protocolo: string;

  @Column()
  link_pag: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default ContasReceber;
