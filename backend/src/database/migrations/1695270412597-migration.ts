import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1695270412597 implements MigrationInterface {
    name = 'Migration1695270412597'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" ADD "provider_id" uuid`);
        await queryRunner.query(`ALTER TABLE "products" ADD CONSTRAINT "FK_487f08da85a58f1fa47863a9474" FOREIGN KEY ("provider_id") REFERENCES "providers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" DROP CONSTRAINT "FK_487f08da85a58f1fa47863a9474"`);
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "provider_id"`);
    }

}
