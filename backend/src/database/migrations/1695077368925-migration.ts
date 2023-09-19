import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1695077368925 implements MigrationInterface {
    name = 'Migration1695077368925'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "description"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" ADD "description" text NOT NULL`);
    }

}
