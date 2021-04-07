import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

// eslint-disable-next-line import/prefer-default-export
export class addLandpageFieldToPeoples1617276400869
  implements
    // eslint-disable-next-line indent
    MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'pessoas',
      new TableColumn({
        name: 'landPage',
        type: 'varchar',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('pessoas', 'landPage');
  }
}
