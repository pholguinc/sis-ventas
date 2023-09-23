import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1695421779907 implements MigrationInterface {
    name = 'Migration1695421779907'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sku" ADD "code" character varying(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "sku" ADD CONSTRAINT "UQ_19ec6e4f8253df824722c3b8aba" UNIQUE ("code")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sku" DROP CONSTRAINT "UQ_19ec6e4f8253df824722c3b8aba"`);
        await queryRunner.query(`ALTER TABLE "sku" DROP COLUMN "code"`);
    }

}
