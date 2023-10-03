import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1696304510011 implements MigrationInterface {
    name = 'Migration1696304510011'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "sales_detail"
            ADD "product_id" uuid
        `);
        await queryRunner.query(`
            ALTER TABLE "sales_detail"
            ADD CONSTRAINT "FK_7f1a9176fe65090e4552b9dbc0c" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "sales_detail" DROP CONSTRAINT "FK_7f1a9176fe65090e4552b9dbc0c"
        `);
        await queryRunner.query(`
            ALTER TABLE "sales_detail" DROP COLUMN "product_id"
        `);
    }

}
