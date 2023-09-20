import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1695158152661 implements MigrationInterface {
    name = 'Migration1695158152661'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sales" DROP CONSTRAINT "FK_ce900da5f68d5ac48f26be30fce"`);
        await queryRunner.query(`ALTER TABLE "sales" DROP COLUMN "sale_detail_id"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sales" ADD "sale_detail_id" uuid`);
        await queryRunner.query(`ALTER TABLE "sales" ADD CONSTRAINT "FK_ce900da5f68d5ac48f26be30fce" FOREIGN KEY ("sale_detail_id") REFERENCES "sale_detail"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
