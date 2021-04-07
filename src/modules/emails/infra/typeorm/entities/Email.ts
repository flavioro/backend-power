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

@Entity('emails')
class Email {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  pessoa_id: string;

  @ManyToOne(() => Pessoa, pessoa => pessoa.emails)
  @JoinColumn({ name: 'pessoa_id' })
  pessoa: Pessoa;

  @Column()
  subject: string;

  @Column()
  message_text: string;

  @Column()
  message_html: string;

  @Column()
  email_from: string;

  @Column()
  email_to: string;

  // @Column()
  // attachments: Buffer;

  @Column()
  email_send: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Email;
