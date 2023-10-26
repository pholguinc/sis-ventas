import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1697309632403 implements MigrationInterface {
    name = 'Migration1697309632403'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "shopping" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "shopping" ADD "update_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "shopping" DROP COLUMN "serie_voucher"`);
        await queryRunner.query(`ALTER TABLE "shopping" ADD "serie_voucher" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "shopping" DROP COLUMN "serie_voucher"`);
        await queryRunner.query(`ALTER TABLE "shopping" ADD "serie_voucher" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "shopping" DROP COLUMN "update_at"`);
        await queryRunner.query(`ALTER TABLE "shopping" DROP COLUMN "created_at"`);
    }

}
