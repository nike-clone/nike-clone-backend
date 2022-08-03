import { MigrationInterface, QueryRunner } from "typeorm";

export class test1659538304674 implements MigrationInterface {
    name = 'test1659538304674'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`Banner\` (\`id\` int NOT NULL AUTO_INCREMENT, \`imagePath\` varchar(255) NOT NULL, \`content\` text NOT NULL, \`type\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`user\` DROP PRIMARY KEY`);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`ID\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`EMAIL\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`PASSWORD\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`NAME\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`PHONE\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`BIRTHOFDATE\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`GENDER\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`SIGNUPVERIFYTOKEN\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`STATUS\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`ISADMIN\``);
        await queryRunner.query(`ALTER TABLE \`goods\` ADD \`salePrice\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`goods\` ADD \`salePercentage\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`goods\` ADD \`classificationId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`id\` varchar(255) NOT NULL PRIMARY KEY`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`email\` varchar(60) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`password\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`name\` varchar(30) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`phone\` varchar(20) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`birthOfDate\` datetime NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`gender\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`isAdmin\` tinyint NOT NULL DEFAULT 0`);
        await queryRunner.query(`ALTER TABLE \`goods\` ADD CONSTRAINT \`FK_3db22db412c4b3d6523e48c6246\` FOREIGN KEY (\`classificationId\`) REFERENCES \`goods_classification\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`goods\` DROP FOREIGN KEY \`FK_3db22db412c4b3d6523e48c6246\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`isAdmin\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`gender\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`birthOfDate\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`phone\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`name\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`password\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`email\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`id\``);
        await queryRunner.query(`ALTER TABLE \`goods\` DROP COLUMN \`classificationId\``);
        await queryRunner.query(`ALTER TABLE \`goods\` DROP COLUMN \`salePercentage\``);
        await queryRunner.query(`ALTER TABLE \`goods\` DROP COLUMN \`salePrice\``);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`ISADMIN\` tinyint NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`STATUS\` varchar(255) NOT NULL DEFAULT 'Proceeding'`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`SIGNUPVERIFYTOKEN\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`GENDER\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`BIRTHOFDATE\` datetime NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`PHONE\` varchar(20) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`NAME\` varchar(30) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`PASSWORD\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`EMAIL\` varchar(60) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`ID\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD PRIMARY KEY (\`ID\`)`);
        await queryRunner.query(`DROP TABLE \`Banner\``);
    }

}
