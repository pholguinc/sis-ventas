import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1695058983567 implements MigrationInterface {
    name = 'Migration1695058983567'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "products"
            ADD "providerId" uuid
        `);
        await queryRunner.query(`
            ALTER TABLE "products"
            ADD CONSTRAINT "FK_2135007a246ddab8cbd4ef2bfce" FOREIGN KEY ("providerId") REFERENCES "providers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "products" DROP CONSTRAINT "FK_2135007a246ddab8cbd4ef2bfce"
        `);
        await queryRunner.query(`
            ALTER TABLE "products" DROP COLUMN "providerId"
        `);
    }

}
