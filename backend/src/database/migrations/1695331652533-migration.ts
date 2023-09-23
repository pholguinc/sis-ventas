import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1695331652533 implements MigrationInterface {
    name = 'Migration1695331652533'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "categories" ADD "skuId" uuid`);
        await queryRunner.query(`ALTER TABLE "categories" ADD CONSTRAINT "FK_c504d455563ad5a8f09f2b3ddce" FOREIGN KEY ("skuId") REFERENCES "sku"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "categories" DROP CONSTRAINT "FK_c504d455563ad5a8f09f2b3ddce"`);
        await queryRunner.query(`ALTER TABLE "categories" DROP COLUMN "skuId"`);
    }

}
