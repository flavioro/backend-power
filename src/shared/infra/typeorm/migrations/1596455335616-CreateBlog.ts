import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateBlog1596455335616 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'blogs',
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
          },
          {
            name: 'link_page',
            type: 'varchar',
          },
          {
            name: 'texto_post',
            type: 'varchar',
          },
          {
            name: 'like',
            type: 'boolean',
          },
          {
            name: 'dt_post',
            type: 'timestamp',
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
      'blogs',
      new TableForeignKey({
        name: 'foreignKeyBlogs_user_id',
        columnNames: ['user_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }
  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('blogs', 'foreignKeyBlogs_user_id');

    await queryRunner.dropTable('blogs');
  }
}

