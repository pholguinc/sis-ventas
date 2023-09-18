import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1695063927778 implements MigrationInterface {
    name = 'Migration1695063927778'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "products" DROP CONSTRAINT "FK_487f08da85a58f1fa47863a9474"
        `);
        await queryRunner.query(`
            CREATE TABLE "products_provider" (
                "product_id" uuid NOT NULL,
                "provider_id" uuid NOT NULL,
                CONSTRAINT "PK_8241ec11f861ce8c2fee116be1d" PRIMARY KEY ("product_id", "provider_id")
            )
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_d602b0ee8acfc0d970bce32ff7" ON "products_provider" ("product_id")
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_da6eac4e0dd1858188eaa93bec" ON "products_provider" ("provider_id")
        `);
        await queryRunner.query(`
            ALTER TABLE "products" DROP COLUMN "provider_id"
        `);
        await queryRunner.query(`
            ALTER TABLE "products_provider"
            ADD CONSTRAINT "FK_d602b0ee8acfc0d970bce32ff75" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
        await queryRunner.query(`
            ALTER TABLE "products_provider"
            ADD CONSTRAINT "FK_da6eac4e0dd1858188eaa93bec9" FOREIGN KEY ("provider_id") REFERENCES "providers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "products_provider" DROP CONSTRAINT "FK_da6eac4e0dd1858188eaa93bec9"
        `);
        await queryRunner.query(`
            ALTER TABLE "products_provider" DROP CONSTRAINT "FK_d602b0ee8acfc0d970bce32ff75"
        `);
        await queryRunner.query(`
            ALTER TABLE "products"
            ADD "provider_id" uuid
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_da6eac4e0dd1858188eaa93bec"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_d602b0ee8acfc0d970bce32ff7"
        `);
        await queryRunner.query(`
            DROP TABLE "products_provider"
        `);
        await queryRunner.query(`
            ALTER TABLE "products"
            ADD CONSTRAINT "FK_487f08da85a58f1fa47863a9474" FOREIGN KEY ("provider_id") REFERENCES "providers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

}
