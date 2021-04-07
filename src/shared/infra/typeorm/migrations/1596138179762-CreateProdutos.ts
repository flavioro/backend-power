/* eslint-disable import/prefer-default-export */
import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateProdutos1596138179762 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'produtos',
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
            name: 'projeto_id',
            type: 'uuid',
          },
          {
            name: 'descricao_item',
            type: 'varchar',
          },
          {
            name: 'preco',
            type: 'real',
          },
          {
            name: 'tipo_projeto',
            type: 'varchar',
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

    await queryRunner.createForeignKey(
      'produtos',
      new TableForeignKey({
        name: 'foreignKeyProdutos_projeto_id',
        columnNames: ['projeto_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'projetos',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(
      'produtos',
      'foreignKeyProdutos_projeto_id',
    );

    await queryRunner.dropTable('produtos');
  }
}
