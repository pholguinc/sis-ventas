import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1697063199627 implements MigrationInterface {
    name = 'Migration1697063199627'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" DROP CONSTRAINT "FK_487f08da85a58f1fa47863a9474"`);
        await queryRunner.query(`ALTER TABLE "products" RENAME COLUMN "provider_id" TO "providerId"`);
        await queryRunner.query(`ALTER TABLE "products" ADD CONSTRAINT "FK_2135007a246ddab8cbd4ef2bfce" FOREIGN KEY ("providerId") REFERENCES "providers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" DROP CONSTRAINT "FK_2135007a246ddab8cbd4ef2bfce"`);
        await queryRunner.query(`ALTER TABLE "products" RENAME COLUMN "providerId" TO "provider_id"`);
        await queryRunner.query(`ALTER TABLE "products" ADD CONSTRAINT "FK_487f08da85a58f1fa47863a9474" FOREIGN KEY ("provider_id") REFERENCES "providers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
