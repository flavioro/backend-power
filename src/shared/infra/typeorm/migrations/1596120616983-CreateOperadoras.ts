import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateOperadoras1596120616983 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'operadoras',
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
            name: 'tipo_venda', // Venda Presencial - Venda sem leitor - Vendas pela internet
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'dias_pag',
            type: 'serial',
          },
          {
            name: 'operadora',
            type: 'varchar',
          },
          {
            name: 'valor_fixo',
            type: 'real',
          },
          {
            name: 'tarifa_intermediacao',
            type: 'real',
          },
          {
            name: 'taxa_vista',
            type: 'real',
          },
          {
            name: 'taxa_parcelamento',
            type: 'real',
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
    await queryRunner.dropTable('operadoras');
  }
}
