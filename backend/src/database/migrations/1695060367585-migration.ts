import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1695060367585 implements MigrationInterface {
    name = 'Migration1695060367585'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "products"
            ADD "code" character varying(255) NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "products"
            ADD CONSTRAINT "UQ_7cfc24d6c24f0ec91294003d6b8" UNIQUE ("code")
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "products" DROP CONSTRAINT "UQ_7cfc24d6c24f0ec91294003d6b8"
        `);
        await queryRunner.query(`
            ALTER TABLE "products" DROP COLUMN "code"
        `);
    }

}
