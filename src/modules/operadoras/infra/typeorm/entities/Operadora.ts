import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('operadoras')
class Operadoras {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('boolean', { default: true })
  ativo: boolean;

  @Column()
  dias_pag: number;

  @Column()
  operadora: string;

  @Column({ type: 'decimal' })
  valor_fixo: number;

  @Column({ type: 'decimal' })
  tarifa_intermediacao: number;

  @Column({ type: 'decimal' })
  taxa_parcelamento: number;

  @Column({ type: 'decimal' })
  taxa_vista: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Operadoras;
