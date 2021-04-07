import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class CreateContasReceber1602182356139 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'contasReceber',
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
            name: 'pessoa_id',
            type: 'uuid',
          },
          {
            name: 'operadora_id',
            type: 'uuid',
          },
          {
            name: 'total_itens',
            type: 'serial',
          },
          {
            name: 'total_parcelas',
            type: 'serial',
          },
          {
            name: 'dt_venda',
            type: 'timestamp',
          },
          {
            name: 'vl_total_original',
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
            name: 'vl_parcela',
            type: 'real',
            isNullable: true,
          },
          {
            name: 'vl_taxa',
            type: 'real',
            isNullable: true,
          },
          {
            name: 'vl_desconto',
            type: 'real',
            isNullable: true,
          },
          {
            name: 'vl_extra',
            type: 'real',
            isNullable: true,
          },
          {
            name: 'tarifa_intermediacao',
            type: 'real',
            isNullable: true,
          },
          {
            name: 'taxa_intermediacao',
            type: 'real',
            isNullable: true,
          },
          {
            name: 'taxa_parcelamento_cartao',
            type: 'real',
            isNullable: true,
          },
          {
            name: 'origem', //PagSeguro, Paypall
            type: 'varchar',
          },
          {
            name: 'tipo_recebimento', //CartaoCredito, boleto,
            type: 'varchar',
          },
          {
            name: 'referencia', // reference: 'Tipo CREDITCARD, 23/09/2020 10:35, valorTotal 2370',
            type: 'varchar',
          },
          {
            name: 'status', // status: 'success', 'pendente'
            type: 'varchar',
          },
          {
            name: 'protocolo', // code: 'FFB420D7-2311-41DD-A0EC-257634D28204',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'link_pag',
            type: 'varchar',
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
      'contasReceber',
      new TableForeignKey({
        name: 'foreignKeyContasReceber_pessoa_id',
        columnNames: ['pessoa_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'pessoas',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'contasReceber',
      new TableForeignKey({
        name: 'foreignKeyContasReceber_operadora_id',
        columnNames: ['operadora_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'operadoras',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('contasReceber', 'foreignKeyContasReceber_pessoa_id');

    await queryRunner.dropForeignKey('contasReceber', 'foreignKeyContasReceber_operadora_id');

    await queryRunner.dropTable('contasReceber');
  }

}
