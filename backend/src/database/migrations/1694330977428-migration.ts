import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1694330977428 implements MigrationInterface {
    name = 'Migration1694330977428'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "categories"
            ADD "code" character varying(255) NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "categories"
            ADD CONSTRAINT "UQ_77d7eff8a7aaa05457a12b8007a" UNIQUE ("code")
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "categories" DROP CONSTRAINT "UQ_77d7eff8a7aaa05457a12b8007a"
        `);
        await queryRunner.query(`
            ALTER TABLE "categories" DROP COLUMN "code"
        `);
    }

}
