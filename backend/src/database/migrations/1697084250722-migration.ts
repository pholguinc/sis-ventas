import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1697084250722 implements MigrationInterface {
    name = 'Migration1697084250722'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" DROP CONSTRAINT "FK_b78c755e07b215617780d4f6afc"`);
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "shoppingDetailsId"`);
        await queryRunner.query(`ALTER TABLE "shoppingDetails" ADD "product_id" uuid`);
        await queryRunner.query(`ALTER TABLE "shoppingDetails" ADD CONSTRAINT "FK_a5d1271e18c9d7db685885e1538" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "shoppingDetails" DROP CONSTRAINT "FK_a5d1271e18c9d7db685885e1538"`);
        await queryRunner.query(`ALTER TABLE "shoppingDetails" DROP COLUMN "product_id"`);
        await queryRunner.query(`ALTER TABLE "products" ADD "shoppingDetailsId" uuid`);
        await queryRunner.query(`ALTER TABLE "products" ADD CONSTRAINT "FK_b78c755e07b215617780d4f6afc" FOREIGN KEY ("shoppingDetailsId") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
