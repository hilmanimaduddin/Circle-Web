import { MigrationInterface, QueryRunner } from "typeorm";

export class MyMigration1698027936857 implements MigrationInterface {
    name = 'MyMigration1698027936857'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "profile_background" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "profile_background"`);
    }

}
