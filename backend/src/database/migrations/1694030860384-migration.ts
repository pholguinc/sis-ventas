import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1694030860384 implements MigrationInterface {
    name = 'Migration1694030860384'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "brands" DROP COLUMN "image"
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "brands"
            ADD "image" character varying NOT NULL
        `);
    }

}
