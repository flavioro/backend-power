import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateContasReceberItens1602182428417 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'contasReceberItens',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'contas_receber_id',
            type: 'uuid',
          },
          {
            name: 'produto_id',
            type: 'uuid',
          },
          {
            name: 'tipo_produto',
            type: 'varchar',
          },
          {
            name: 'ordem_item',
            type: 'integer',
            isNullable: true,
          },
          {
            name: 'descricao_item',
            type: 'varchar',
          },
          {
            name: 'valor_item',
            type: 'real',
          },
          {
            name: 'dt_receber',
            type: 'timestamp',
            isNullable: true,
          },
          {
            name: 'vl_receber',
            type: 'real',
            isNullable: true,
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
      'contasReceberItens',
      new TableForeignKey({
        name: 'foreignKeyContasReceberItens_contas_receber_id',
        columnNames: ['contas_receber_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'contasReceber',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'contasReceberItens',
      new TableForeignKey({
        name: 'foreignKeyContasReceberItens_produto_id',
        columnNames: ['produto_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'produtos',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('contasReceberItens', 'foreignKeyContasReceberItens_produto_id');

    await queryRunner.dropForeignKey('contasReceberItens', 'foreignKeyContasReceberItens_contas_receber_id');

    await queryRunner.dropTable('contasReceberItens');
  }


}
