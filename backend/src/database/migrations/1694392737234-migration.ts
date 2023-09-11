import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1694392737234 implements MigrationInterface {
    name = 'Migration1694392737234'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "products"
                RENAME COLUMN "sales" TO "sale"
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "products"
                RENAME COLUMN "sale" TO "sales"
        `);
    }

}
