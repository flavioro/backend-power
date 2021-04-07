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

import Pessoa from '@modules/pessoas/infra/typeorm/entities/Pessoa';

@Entity()
class SiteContato {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  pessoa_id: string;

  @ManyToOne(() => Pessoa, pessoa => pessoa.siteContacts)
  @JoinColumn({ name: 'pessoa_id' })
  pessoa: Pessoa;

  @Column()
  subject: string;

  @Column()
  message: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default SiteContato;
