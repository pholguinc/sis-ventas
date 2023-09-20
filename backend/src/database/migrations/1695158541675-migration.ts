import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1695158541675 implements MigrationInterface {
    name = 'Migration1695158541675'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "sales_detail" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "price" numeric(5,2) NOT NULL, "quantity" numeric(5,2) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "update_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_b683a33c50fe3ce4d87669f6e4d" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "sales_detail"`);
    }

}
