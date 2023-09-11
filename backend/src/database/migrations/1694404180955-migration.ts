import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1694404180955 implements MigrationInterface {
    name = 'Migration1694404180955'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "providers" DROP COLUMN "image"
        `);
        await queryRunner.query(`
            ALTER TABLE "providers"
            ADD "email" character varying(11) NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "providers"
            ADD "address" character varying(9) NOT NULL
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "providers" DROP COLUMN "address"
        `);
        await queryRunner.query(`
            ALTER TABLE "providers" DROP COLUMN "email"
        `);
        await queryRunner.query(`
            ALTER TABLE "providers"
            ADD "image" character varying NOT NULL
        `);
    }

}
