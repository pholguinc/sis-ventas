import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1694407464054 implements MigrationInterface {
    name = 'Migration1694407464054'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "providers" DROP COLUMN "email"
        `);
        await queryRunner.query(`
            ALTER TABLE "providers"
            ADD "email" character varying NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "providers" DROP COLUMN "address"
        `);
        await queryRunner.query(`
            ALTER TABLE "providers"
            ADD "address" character varying NOT NULL
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "providers" DROP COLUMN "address"
        `);
        await queryRunner.query(`
            ALTER TABLE "providers"
            ADD "address" character varying(9) NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "providers" DROP COLUMN "email"
        `);
        await queryRunner.query(`
            ALTER TABLE "providers"
            ADD "email" character varying(11) NOT NULL
        `);
    }

}
