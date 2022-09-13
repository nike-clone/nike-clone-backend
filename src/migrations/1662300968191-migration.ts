import { MigrationInterface, QueryRunner } from "typeorm";

export class migration1662300968191 implements MigrationInterface {
    name = 'migration1662300968191'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`anonymous_cart\` (\`id\` varchar(255) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`cart_items\` ADD \`anonymousCartId\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`cart_items\` ADD CONSTRAINT \`FK_ddeec60a6d454d3b52ec74637b0\` FOREIGN KEY (\`anonymousCartId\`) REFERENCES \`anonymous_cart\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`cart_items\` DROP FOREIGN KEY \`FK_ddeec60a6d454d3b52ec74637b0\``);
        await queryRunner.query(`ALTER TABLE \`cart_items\` DROP COLUMN \`anonymousCartId\``);
        await queryRunner.query(`DROP TABLE \`anonymous_cart\``);
    }

}
