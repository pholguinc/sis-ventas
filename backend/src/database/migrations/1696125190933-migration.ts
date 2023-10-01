import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1696125190933 implements MigrationInterface {
    name = 'Migration1696125190933'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "users" DROP CONSTRAINT "FK_23371445bd80cb3e413089551bf"
        `);
        await queryRunner.query(`
            CREATE TABLE "profile" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "names" character varying(255) NOT NULL,
                "lastname_pater" character varying(255) NOT NULL,
                "lastname_mater" character varying(255) NOT NULL,
                "numDoc" character varying(255) NOT NULL,
                "phone" character varying(9) NOT NULL,
                "address" text NOT NULL,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "update_at" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "PK_3dd8bfc97e4a77c70971591bdcb" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            ALTER TABLE "users" DROP COLUMN "names"
        `);
        await queryRunner.query(`
            ALTER TABLE "users" DROP COLUMN "lastname_pater"
        `);
        await queryRunner.query(`
            ALTER TABLE "users" DROP COLUMN "lastname_mater"
        `);
        await queryRunner.query(`
            ALTER TABLE "users" DROP COLUMN "numDoc"
        `);
        await queryRunner.query(`
            ALTER TABLE "users" DROP COLUMN "phone"
        `);
        await queryRunner.query(`
            ALTER TABLE "users" DROP COLUMN "address"
        `);
        await queryRunner.query(`
            ALTER TABLE "users"
            ADD CONSTRAINT "FK_23371445bd80cb3e413089551bf" FOREIGN KEY ("profile_id") REFERENCES "profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "users" DROP CONSTRAINT "FK_23371445bd80cb3e413089551bf"
        `);
        await queryRunner.query(`
            ALTER TABLE "users"
            ADD "address" text NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "users"
            ADD "phone" character varying(9) NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "users"
            ADD "numDoc" character varying(255) NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "users"
            ADD "lastname_mater" character varying(255) NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "users"
            ADD "lastname_pater" character varying(255) NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "users"
            ADD "names" character varying(255) NOT NULL
        `);
        await queryRunner.query(`
            DROP TABLE "profile"
        `);
        await queryRunner.query(`
            ALTER TABLE "users"
            ADD CONSTRAINT "FK_23371445bd80cb3e413089551bf" FOREIGN KEY ("profile_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

}
