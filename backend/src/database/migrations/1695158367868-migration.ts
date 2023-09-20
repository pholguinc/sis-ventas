import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1695158367868 implements MigrationInterface {
    name = 'Migration1695158367868'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "sale_detail" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "price" numeric(5,2) NOT NULL, "quantity" numeric(5,2) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "update_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_4a2e151a26169857b1f3d47c198" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "sale_detail"`);
    }

}
