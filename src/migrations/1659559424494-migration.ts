import { MigrationInterface, QueryRunner } from "typeorm";

export class migration1659559424494 implements MigrationInterface {
    name = 'migration1659559424494'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`goods_classification\` ADD \`alias\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`goods_classification\` DROP COLUMN \`alias\``);
    }

}
