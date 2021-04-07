/* eslint-disable camelcase */
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';

import User from '@modules/users/infra/typeorm/entities/User';
import Email from '@modules/emails/infra/typeorm/entities/Email';
import SiteContatcts from './SiteContato';

@Entity('pessoas')
class Pessoa {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  user_id: string;

  @OneToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column('boolean', { default: true })
  ativo: boolean;

  @Column()
  cpf: string;

  @Column()
  nome: string;

  @Column()
  email: string;

  @Column()
  tipo_cadastro: string; // Cliente, Funcionario, Arquiteto, Inscrito, Fornecedor

  @Column()
  landPage: string;

  @Column()
  dt_nascimento: Date;

  @Column()
  country: string;

  @Column()
  phone: string;

  @Column()
  uf: string;

  @Column()
  cidade: string;

  @Column()
  cep: string;

  @Column()
  bairro: string;

  @Column()
  logradouro: string;

  @Column()
  numero_casa: string;

  @Column()
  complemento: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => Email, email => email.pessoa)
  emails: Email[];

  @OneToMany(() => SiteContatcts, siteContact => siteContact.pessoa)
  siteContacts: SiteContatcts;
}

export default Pessoa;
