import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1695331941861 implements MigrationInterface {
    name = 'Migration1695331941861'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" ADD "skuId" uuid`);
        await queryRunner.query(`ALTER TABLE "brands" ADD "skuId" uuid`);
        await queryRunner.query(`ALTER TABLE "products" ADD CONSTRAINT "FK_76e194b976e8be1e5f4217b3588" FOREIGN KEY ("skuId") REFERENCES "sku"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "brands" ADD CONSTRAINT "FK_f16db623f77993dd9cf51632a4f" FOREIGN KEY ("skuId") REFERENCES "sku"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "brands" DROP CONSTRAINT "FK_f16db623f77993dd9cf51632a4f"`);
        await queryRunner.query(`ALTER TABLE "products" DROP CONSTRAINT "FK_76e194b976e8be1e5f4217b3588"`);
        await queryRunner.query(`ALTER TABLE "brands" DROP COLUMN "skuId"`);
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "skuId"`);
    }

}
