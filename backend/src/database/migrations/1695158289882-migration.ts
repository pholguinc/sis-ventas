import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1695158289882 implements MigrationInterface {
    name = 'Migration1695158289882'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "saleDetails" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "price" numeric(5,2) NOT NULL, "quantity" numeric(5,2) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "update_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_1157fdce41126a20cc589e87906" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "saleDetails"`);
    }

}
