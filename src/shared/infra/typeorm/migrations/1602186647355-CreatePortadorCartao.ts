import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreatePortadorCartao1602186647355 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'portadorCartao',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'pessoa_id',
            type: 'uuid',
          },
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'email',
            type: 'varchar',
            isUnique: true,
          },
          {
            name: 'cpf',
            type: 'varchar',
            isUnique: true,
          },
          {
            name: 'dt_nascimento',
            type: 'timestamp',
          },
          {
            name: 'phone',
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
      'portadorCartao',
      new TableForeignKey({
        name: 'foreignKeyClientes_pessoa_id',
        columnNames: ['pessoa_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'pessoas',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('portadorCartao', 'foreignKeyClientes_pessoa_id');

    await queryRunner.dropTable('portadorCartao');
  }
}
