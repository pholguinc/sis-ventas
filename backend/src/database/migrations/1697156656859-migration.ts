import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1697156656859 implements MigrationInterface {
    name = 'Migration1697156656859'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "shoppingDetails" DROP CONSTRAINT "FK_6a37e87f6e59ee3b885605184c3"`);
        await queryRunner.query(`ALTER TABLE "shoppingDetails" RENAME COLUMN "shopping_id" TO "shoppingId"`);
        await queryRunner.query(`ALTER TABLE "shoppingDetails" ADD CONSTRAINT "FK_c5cd8ccb7512d97df1000b76ad6" FOREIGN KEY ("shoppingId") REFERENCES "shopping"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "shoppingDetails" DROP CONSTRAINT "FK_c5cd8ccb7512d97df1000b76ad6"`);
        await queryRunner.query(`ALTER TABLE "shoppingDetails" RENAME COLUMN "shoppingId" TO "shopping_id"`);
        await queryRunner.query(`ALTER TABLE "shoppingDetails" ADD CONSTRAINT "FK_6a37e87f6e59ee3b885605184c3" FOREIGN KEY ("shopping_id") REFERENCES "shopping"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
