import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateVideos1596138917235 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'videos',
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
            name: 'link_video',
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
      'videos',
      new TableForeignKey({
        name: 'foreignKeyVideos_projeto_id',
        columnNames: ['projeto_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'projetos',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('videos', 'foreignKeyVideos_projeto_id');

    await queryRunner.dropTable('videos');
  }

}

