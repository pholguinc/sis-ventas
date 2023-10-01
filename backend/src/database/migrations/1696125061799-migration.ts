import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1696125061799 implements MigrationInterface {
    name = 'Migration1696125061799'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "users" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "names" character varying(255) NOT NULL,
                "lastname_pater" character varying(255) NOT NULL,
                "lastname_mater" character varying(255) NOT NULL,
                "numDoc" character varying(255) NOT NULL,
                "phone" character varying(9) NOT NULL,
                "address" text NOT NULL,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "update_at" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id")
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
            ADD "names" character varying(255) NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "users"
            ADD "lastname_pater" character varying(255) NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "users"
            ADD "lastname_mater" character varying(255) NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "users"
            ADD "numDoc" character varying(255) NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "users"
            ADD "phone" character varying(9) NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "users"
            ADD "address" text NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "users"
            ADD "email" character varying(255) NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "users"
            ADD CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email")
        `);
        await queryRunner.query(`
            ALTER TABLE "users"
            ADD "password" character varying(255) NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "users"
            ADD "role" character varying(100) NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "users"
            ADD "profile_id" uuid
        `);
        await queryRunner.query(`
            ALTER TABLE "users"
            ADD CONSTRAINT "UQ_23371445bd80cb3e413089551bf" UNIQUE ("profile_id")
        `);
        await queryRunner.query(`
            ALTER TABLE "users"
            ADD CONSTRAINT "FK_23371445bd80cb3e413089551bf" FOREIGN KEY ("profile_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "sales"
            ADD CONSTRAINT "FK_5f282f3656814ec9ca2675aef6f" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "sales" DROP CONSTRAINT "FK_5f282f3656814ec9ca2675aef6f"
        `);
        await queryRunner.query(`
            ALTER TABLE "users" DROP CONSTRAINT "FK_23371445bd80cb3e413089551bf"
        `);
        await queryRunner.query(`
            ALTER TABLE "users" DROP CONSTRAINT "UQ_23371445bd80cb3e413089551bf"
        `);
        await queryRunner.query(`
            ALTER TABLE "users" DROP COLUMN "profile_id"
        `);
        await queryRunner.query(`
            ALTER TABLE "users" DROP COLUMN "role"
        `);
        await queryRunner.query(`
            ALTER TABLE "users" DROP COLUMN "password"
        `);
        await queryRunner.query(`
            ALTER TABLE "users" DROP CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3"
        `);
        await queryRunner.query(`
            ALTER TABLE "users" DROP COLUMN "email"
        `);
        await queryRunner.query(`
            ALTER TABLE "users" DROP COLUMN "address"
        `);
        await queryRunner.query(`
            ALTER TABLE "users" DROP COLUMN "phone"
        `);
        await queryRunner.query(`
            ALTER TABLE "users" DROP COLUMN "numDoc"
        `);
        await queryRunner.query(`
            ALTER TABLE "users" DROP COLUMN "lastname_mater"
        `);
        await queryRunner.query(`
            ALTER TABLE "users" DROP COLUMN "lastname_pater"
        `);
        await queryRunner.query(`
            ALTER TABLE "users" DROP COLUMN "names"
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
            DROP TABLE "users"
        `);
    }

}
