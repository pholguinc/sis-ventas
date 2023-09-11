import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1694392406591 implements MigrationInterface {
    name = 'Migration1694392406591'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP INDEX "public"."IDX_75895eeb1903f8a17816dafe0a"
        `);
        await queryRunner.query(`
            ALTER TABLE "products"
            ADD "sales" numeric(10, 2) NOT NULL
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_4fbc36ad745962e5c11001e1a8"
        `);
        await queryRunner.query(`
            ALTER TABLE "products" DROP COLUMN "price"
        `);
        await queryRunner.query(`
            ALTER TABLE "products"
            ADD "price" numeric(10, 2) NOT NULL
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_048a28949bb332d397edb9b7ab" ON "products" ("stock")
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_4fbc36ad745962e5c11001e1a8" ON "products" ("price", "stock")
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP INDEX "public"."IDX_4fbc36ad745962e5c11001e1a8"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_048a28949bb332d397edb9b7ab"
        `);
        await queryRunner.query(`
            ALTER TABLE "products" DROP COLUMN "price"
        `);
        await queryRunner.query(`
            ALTER TABLE "products"
            ADD "price" integer NOT NULL
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_4fbc36ad745962e5c11001e1a8" ON "products" ("price", "stock")
        `);
        await queryRunner.query(`
            ALTER TABLE "products" DROP COLUMN "sales"
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_75895eeb1903f8a17816dafe0a" ON "products" ("price")
        `);
    }

}
