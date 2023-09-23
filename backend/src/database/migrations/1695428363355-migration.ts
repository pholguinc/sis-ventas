import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1695428363355 implements MigrationInterface {
    name = 'Migration1695428363355'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "categories" DROP CONSTRAINT "FK_c504d455563ad5a8f09f2b3ddce"`);
        await queryRunner.query(`ALTER TABLE "brands" DROP CONSTRAINT "FK_f16db623f77993dd9cf51632a4f"`);
        await queryRunner.query(`ALTER TABLE "categories" DROP COLUMN "skuId"`);
        await queryRunner.query(`ALTER TABLE "products" DROP CONSTRAINT "UQ_c44ac33a05b144dd0d9ddcf9327"`);
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "sku"`);
        await queryRunner.query(`ALTER TABLE "brands" DROP COLUMN "skuId"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "brands" ADD "skuId" uuid`);
        await queryRunner.query(`ALTER TABLE "products" ADD "sku" character varying(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "products" ADD CONSTRAINT "UQ_c44ac33a05b144dd0d9ddcf9327" UNIQUE ("sku")`);
        await queryRunner.query(`ALTER TABLE "categories" ADD "skuId" uuid`);
        await queryRunner.query(`ALTER TABLE "brands" ADD CONSTRAINT "FK_f16db623f77993dd9cf51632a4f" FOREIGN KEY ("skuId") REFERENCES "sku"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "categories" ADD CONSTRAINT "FK_c504d455563ad5a8f09f2b3ddce" FOREIGN KEY ("skuId") REFERENCES "sku"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
