/* eslint-disable camelcase */
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

import Produtos from './Produtos';
import Videos from './Videos';

@Entity('projetos')
class Projetos {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('boolean', { default: true })
  ativo: boolean;

  @Column()
  'nome_projeto': string;

  @Column()
  'codigo_projeto': string;

  @Column()
  'descricao_projeto': string;

  @Column()
  'tipo_construcao': string;

  @Column()
  'categoria': string;

  @Column()
  'quartos': number;

  @Column()
  'suites': number;

  @Column()
  'garagens': number;

  @Column()
  'area_gourmet': number;

  @Column()
  'piscinas': number;

  @Column()
  'banheiros': number;

  @Column()
  'escritorios': number;

  @Column()
  'salas': number;

  @Column()
  'cozinhas': number;

  @Column()
  'varandas': number;

  @Column()
  'academia': number;

  @Column()
  'sala_tv': number;

  @Column()
  'brinquedoteca': number;

  @Column()
  'lavanderia': number;

  @Column()
  'adega': number;

  @Column({ type: 'decimal' })
  'area_construida': number;

  @Column({ type: 'decimal' })
  'largura_casa': number;

  @Column({ type: 'decimal' })
  'comprimento_casa': number;

  @Column({ type: 'decimal' })
  'largura_terreno': number;

  @Column({ type: 'decimal' })
  'comprimento_terreno': number;

  @Column({ type: 'decimal' })
  'recuo_frontal': number;

  @Column({ type: 'decimal' })
  'recuo_fundo': number;

  @Column({ type: 'decimal' })
  'recuo_esquerdo': number;

  @Column({ type: 'decimal' })
  'recuo_direito': number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => Produtos, (produto) => produto.projeto)
  produtos: Produtos;

  @OneToMany(() => Videos, (video) => video.projeto)
  videos: Videos;
}

export default Projetos;
