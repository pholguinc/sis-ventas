import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1697332102514 implements MigrationInterface {
    name = 'Migration1697332102514'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "shopping" RENAME COLUMN "serie_voucher" TO "subtotal"`);
        await queryRunner.query(`ALTER TABLE "shopping" DROP COLUMN "subtotal"`);
        await queryRunner.query(`ALTER TABLE "shopping" ADD "subtotal" numeric(5,2) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "shopping" DROP COLUMN "subtotal"`);
        await queryRunner.query(`ALTER TABLE "shopping" ADD "subtotal" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "shopping" RENAME COLUMN "subtotal" TO "serie_voucher"`);
    }

}
