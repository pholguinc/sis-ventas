import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1695234349159 implements MigrationInterface {
    name = 'Migration1695234349159'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "sales_products" ("sales_id" uuid NOT NULL, "product_id" uuid NOT NULL, CONSTRAINT "PK_527d2996df781a0f31f27597946" PRIMARY KEY ("sales_id", "product_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_3f8089c95c3989024d52d0f86e" ON "sales_products" ("sales_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_e1f5f809226b6fcfe8fe21bcce" ON "sales_products" ("product_id") `);
        await queryRunner.query(`ALTER TABLE "sales_products" ADD CONSTRAINT "FK_3f8089c95c3989024d52d0f86e7" FOREIGN KEY ("sales_id") REFERENCES "sales"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "sales_products" ADD CONSTRAINT "FK_e1f5f809226b6fcfe8fe21bcceb" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sales_products" DROP CONSTRAINT "FK_e1f5f809226b6fcfe8fe21bcceb"`);
        await queryRunner.query(`ALTER TABLE "sales_products" DROP CONSTRAINT "FK_3f8089c95c3989024d52d0f86e7"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_e1f5f809226b6fcfe8fe21bcce"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_3f8089c95c3989024d52d0f86e"`);
        await queryRunner.query(`DROP TABLE "sales_products"`);
    }

}
