import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1697331842947 implements MigrationInterface {
    name = 'Migration1697331842947'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "shoppingDetails" DROP COLUMN "unit_price"`);
        await queryRunner.query(`ALTER TABLE "shoppingDetails" DROP COLUMN "total_price"`);
        await queryRunner.query(`ALTER TABLE "shoppingDetails" ADD "price" numeric(5,2) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "shoppingDetails" ADD "total" numeric(5,2) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "shoppingDetails" ADD "quantity" integer NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "shoppingDetails" DROP COLUMN "quantity"`);
        await queryRunner.query(`ALTER TABLE "shoppingDetails" DROP COLUMN "total"`);
        await queryRunner.query(`ALTER TABLE "shoppingDetails" DROP COLUMN "price"`);
        await queryRunner.query(`ALTER TABLE "shoppingDetails" ADD "total_price" numeric(5,2) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "shoppingDetails" ADD "unit_price" numeric(5,2) NOT NULL`);
    }

}
