import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1695422741115 implements MigrationInterface {
    name = 'Migration1695422741115'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" DROP CONSTRAINT "FK_76e194b976e8be1e5f4217b3588"`);
        await queryRunner.query(`ALTER TABLE "products" RENAME COLUMN "skuId" TO "sku"`);
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "sku"`);
        await queryRunner.query(`ALTER TABLE "products" ADD "sku" character varying(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "products" ADD CONSTRAINT "UQ_c44ac33a05b144dd0d9ddcf9327" UNIQUE ("sku")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" DROP CONSTRAINT "UQ_c44ac33a05b144dd0d9ddcf9327"`);
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "sku"`);
        await queryRunner.query(`ALTER TABLE "products" ADD "sku" uuid`);
        await queryRunner.query(`ALTER TABLE "products" RENAME COLUMN "sku" TO "skuId"`);
        await queryRunner.query(`ALTER TABLE "products" ADD CONSTRAINT "FK_76e194b976e8be1e5f4217b3588" FOREIGN KEY ("skuId") REFERENCES "sku"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
