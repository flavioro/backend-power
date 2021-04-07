/* eslint-disable camelcase */
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Exclude, Expose } from 'class-transformer';

@Entity('users')
class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  @Exclude()
  password: string;

  @Column()
  picture: string;

  @Column()
  token: string;

  @Column()
  phone: string;

  @Column()
  tipo_cadastro: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Expose({ name: 'picture_url' })
  getAvatarUrl(): string | null {
    return this.picture
      ? `${process.env.APP_API_URL}/files/${this.picture}`
      : null;
  }
}

export default User;
