import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1695269899528 implements MigrationInterface {
    name = 'Migration1695269899528'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "sales_detail" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "price" numeric(5,2) NOT NULL, "quantity" numeric(5,2) NOT NULL, "sale_id" uuid, CONSTRAINT "PK_b683a33c50fe3ce4d87669f6e4d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "sales_detail" ADD CONSTRAINT "FK_d248eeebb2ad4543545212142a8" FOREIGN KEY ("sale_id") REFERENCES "sales"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sales_detail" DROP CONSTRAINT "FK_d248eeebb2ad4543545212142a8"`);
        await queryRunner.query(`DROP TABLE "sales_detail"`);
    }

}
