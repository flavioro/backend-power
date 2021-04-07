import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

// eslint-disable-next-line import/prefer-default-export
export class CreateSiteContato1611835553006 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'site_contato',
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
            isNullable: true,
          },
          {
            name: 'subject',
            type: 'varchar',
          },
          {
            name: 'message',
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
      'site_contato',
      new TableForeignKey({
        name: 'foreignKey_SiteContato_pessoa_id',
        columnNames: ['pessoa_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'pessoas',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(
      'site_contato',
      'foreignKey_SiteContato_pessoa_id',
    );

    await queryRunner.dropTable('site_contato');
  }
}
