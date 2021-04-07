/* eslint-disable camelcase */
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';

import Pessoa from '@modules/pessoas/infra/typeorm/entities/Pessoa';

@Entity('portadorCartao')
class PortadorCartao {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  pessoa_id: string;

  @OneToOne(() => Pessoa)
  @JoinColumn({ name: 'pessoa_id' })
  pessoa: Pessoa;

  @Column()
  cpf: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  dt_nascimento: Date;

  @Column()
  phone: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default PortadorCartao;
