import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1694376966643 implements MigrationInterface {
    name = 'Migration1694376966643'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "products" DROP COLUMN "image"
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "products"
            ADD "image" character varying NOT NULL
        `);
    }

}
