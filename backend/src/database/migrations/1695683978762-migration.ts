import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1695683978762 implements MigrationInterface {
    name = 'Migration1695683978762'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" DROP CONSTRAINT "FK_53df0a75ca679ef4ad044516862"`);
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "providersId"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" ADD "providersId" uuid`);
        await queryRunner.query(`ALTER TABLE "products" ADD CONSTRAINT "FK_53df0a75ca679ef4ad044516862" FOREIGN KEY ("providersId") REFERENCES "providers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
