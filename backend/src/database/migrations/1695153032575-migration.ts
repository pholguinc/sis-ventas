import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1695153032575 implements MigrationInterface {
    name = 'Migration1695153032575'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "sale_detail" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "price" numeric(5,2) NOT NULL, "quantity" numeric(5,2) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "update_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_4a2e151a26169857b1f3d47c198" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "product_provider" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "product_id" uuid, "provider_id" uuid, CONSTRAINT "PK_21370c1fdc836875d42b50851de" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "sales" ADD "sale_detail_id" uuid`);
        await queryRunner.query(`ALTER TABLE "sales" ADD CONSTRAINT "FK_ce900da5f68d5ac48f26be30fce" FOREIGN KEY ("sale_detail_id") REFERENCES "sale_detail"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product_provider" ADD CONSTRAINT "FK_62869d214dfeb37631191f014d4" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product_provider" ADD CONSTRAINT "FK_83aa5b5a045cc74423c52568f97" FOREIGN KEY ("provider_id") REFERENCES "providers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product_provider" DROP CONSTRAINT "FK_83aa5b5a045cc74423c52568f97"`);
        await queryRunner.query(`ALTER TABLE "product_provider" DROP CONSTRAINT "FK_62869d214dfeb37631191f014d4"`);
        await queryRunner.query(`ALTER TABLE "sales" DROP CONSTRAINT "FK_ce900da5f68d5ac48f26be30fce"`);
        await queryRunner.query(`ALTER TABLE "sales" DROP COLUMN "sale_detail_id"`);
        await queryRunner.query(`DROP TABLE "product_provider"`);
        await queryRunner.query(`DROP TABLE "sale_detail"`);
    }

}
