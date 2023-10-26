import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1697084679992 implements MigrationInterface {
    name = 'Migration1697084679992'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "shoppingDetails" ADD "shopping_id" uuid`);
        await queryRunner.query(`ALTER TABLE "shoppingDetails" ADD CONSTRAINT "FK_6a37e87f6e59ee3b885605184c3" FOREIGN KEY ("shopping_id") REFERENCES "shopping"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "shoppingDetails" DROP CONSTRAINT "FK_6a37e87f6e59ee3b885605184c3"`);
        await queryRunner.query(`ALTER TABLE "shoppingDetails" DROP COLUMN "shopping_id"`);
    }

}
