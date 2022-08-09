import { MigrationInterface, QueryRunner } from "typeorm";

export class migration1659629476773 implements MigrationInterface {
    name = 'migration1659629476773'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`goods\` ADD \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`goods\` DROP COLUMN \`created_at\``);
    }

}
