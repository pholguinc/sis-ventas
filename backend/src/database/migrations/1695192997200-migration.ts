import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1695192997200 implements MigrationInterface {
    name = 'Migration1695192997200'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sales_detail" ADD "saleId" uuid`);
        await queryRunner.query(`ALTER TABLE "sales_detail" ADD CONSTRAINT "FK_44a9354f3d5d64611d587e9d3ec" FOREIGN KEY ("saleId") REFERENCES "sales"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sales_detail" DROP CONSTRAINT "FK_44a9354f3d5d64611d587e9d3ec"`);
        await queryRunner.query(`ALTER TABLE "sales_detail" DROP COLUMN "saleId"`);
    }

}
