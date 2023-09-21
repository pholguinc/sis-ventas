import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1695326361646 implements MigrationInterface {
    name = 'Migration1695326361646'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sku" ADD "description" character varying(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "sku" ADD CONSTRAINT "UQ_d260c995b672b14cbab20899bad" UNIQUE ("name")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sku" DROP CONSTRAINT "UQ_d260c995b672b14cbab20899bad"`);
        await queryRunner.query(`ALTER TABLE "sku" DROP COLUMN "description"`);
    }

}
