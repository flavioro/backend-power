import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

// eslint-disable-next-line import/prefer-default-export
export class CreatePessoas1602181698440 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'pessoas',
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
            name: 'user_id',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'nome',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'email',
            type: 'varchar',
            isUnique: true,
          },
          {
            name: 'tipo_cadastro', // Cliente, Funcionario, Arquiteto, Inscrito, Fornecedor
            type: 'varchar',
          },
          {
            name: 'cpf',
            type: 'varchar',
            isUnique: true,
            isNullable: true,
          },
          {
            name: 'dt_nascimento',
            type: 'timestamp',
            isNullable: true,
          },
          {
            name: 'country',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'phone',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'uf',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'cidade',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'cep',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'bairro',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'logradouro',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'numero_casa',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'complemento',
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
      'pessoas',
      new TableForeignKey({
        name: 'foreignKeyClientes_user_id',
        columnNames: ['user_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('pessoas', 'foreignKeyClientes_user_id');

    await queryRunner.dropTable('pessoas');
  }
}
