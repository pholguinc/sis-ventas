import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1696309299895 implements MigrationInterface {
    name = 'Migration1696309299895'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "shopping" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "quantity" integer NOT NULL,
                "price_shop" numeric(5, 2) NOT NULL,
                "price_sale" numeric(5, 2) NOT NULL,
                "total" numeric(5, 2) NOT NULL,
                "change" numeric(5, 2) NOT NULL,
                "serie_comp" integer NOT NULL,
                "settingId" uuid,
                CONSTRAINT "PK_7e310c863e4d0cc737aee7618fd" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            ALTER TABLE "shopping"
            ADD CONSTRAINT "FK_43e182b7d486bca8669511a1ab4" FOREIGN KEY ("settingId") REFERENCES "settings"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "shopping" DROP CONSTRAINT "FK_43e182b7d486bca8669511a1ab4"
        `);
        await queryRunner.query(`
            DROP TABLE "shopping"
        `);
    }

}
