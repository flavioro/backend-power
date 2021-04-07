/* eslint-disable import/prefer-default-export */
import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateProjetos1596135026626 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'projetos',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'ativo',
            type: 'boolean',
            default: true,
          },
          {
            name: 'nome_projeto',
            type: 'varchar',
          },
          {
            name: 'codigo_projeto',
            type: 'varchar',
            isUnique: true,
          },
          {
            name: 'descricao_projeto',
            type: 'text',
          },
          {
            name: 'tipo_construcao',
            type: 'varchar',
          },
          {
            name: 'categoria',
            type: 'varchar',
          },
          {
            name: 'quartos',
            type: 'smallserial',
          },
          {
            name: 'suites',
            type: 'smallserial',
          },
          {
            name: 'garagens',
            type: 'smallserial',
          },
          {
            name: 'area_gourmet',
            type: 'smallserial',
          },
          {
            name: 'piscinas',
            type: 'smallserial',
          },
          {
            name: 'banheiros',
            type: 'smallserial',
          },
          {
            name: 'escritorios',
            type: 'smallserial',
          },
          {
            name: 'salas',
            type: 'smallserial',
          },
          {
            name: 'cozinhas',
            type: 'smallserial',
          },
          {
            name: 'varandas',
            type: 'smallserial',
          },
          {
            name: 'academia',
            type: 'smallserial',
          },
          {
            name: 'sala_tv',
            type: 'smallserial',
          },
          {
            name: 'brinquedoteca',
            type: 'smallserial',
          },
          {
            name: 'lavanderia',
            type: 'smallserial',
          },
          {
            name: 'adega',
            type: 'smallserial',
          },
          {
            name: 'area_construida',
            type: 'decimal',
            precision: 8,
            scale: 2,
          },
          {
            name: 'largura_casa',
            type: 'decimal',
            precision: 8,
            scale: 2,
          },
          {
            name: 'comprimento_casa',
            type: 'decimal',
            precision: 8,
            scale: 2,
          },
          {
            name: 'largura_terreno',
            type: 'decimal',
            precision: 8,
            scale: 2,
          },
          {
            name: 'comprimento_terreno',
            type: 'decimal',
            precision: 8,
            scale: 2,
          },
          {
            name: 'recuo_frontal',
            type: 'decimal',
            precision: 8,
            scale: 2,
          },
          {
            name: 'recuo_fundo',
            type: 'decimal',
            precision: 8,
            scale: 2,
          },
          {
            name: 'recuo_esquerdo',
            type: 'decimal',
            precision: 8,
            scale: 2,
          },
          {
            name: 'recuo_direito',
            type: 'decimal',
            precision: 8,
            scale: 2,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('projetos');
  }
}
