import { MigrationInterface, QueryRunner } from "typeorm";

export class goodsClassification1659538850817 implements MigrationInterface {
    name = 'goodsClassification1659538850817'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`user\` (\`id\` varchar(255) NOT NULL, \`email\` varchar(60) NOT NULL, \`password\` varchar(255) NOT NULL, \`name\` varchar(30) NOT NULL, \`phone\` varchar(20) NOT NULL, \`birthOfDate\` datetime NOT NULL, \`gender\` varchar(255) NOT NULL, \`isAdmin\` tinyint NOT NULL DEFAULT 0, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`goods\` ADD \`salePrice\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`goods\` ADD \`salePercentage\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`goods\` ADD \`classificationId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`goods\` ADD CONSTRAINT \`FK_3db22db412c4b3d6523e48c6246\` FOREIGN KEY (\`classificationId\`) REFERENCES \`goods_classification\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`goods\` DROP FOREIGN KEY \`FK_3db22db412c4b3d6523e48c6246\``);
        await queryRunner.query(`ALTER TABLE \`goods\` DROP COLUMN \`classificationId\``);
        await queryRunner.query(`ALTER TABLE \`goods\` DROP COLUMN \`salePercentage\``);
        await queryRunner.query(`ALTER TABLE \`goods\` DROP COLUMN \`salePrice\``);
        await queryRunner.query(`DROP TABLE \`user\``);
    }

}
