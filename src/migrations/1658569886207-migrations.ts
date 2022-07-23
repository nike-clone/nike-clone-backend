import { MigrationInterface, QueryRunner } from 'typeorm';

export class migrations1658569886207 implements MigrationInterface {
  name = 'migrations1658569886207';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`Banner\` (\`id\` int NOT NULL AUTO_INCREMENT, \`imagePath\` varchar(255) NOT NULL, \`content\` text NOT NULL, \`type\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`color\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`colorCode\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`size\` (\`id\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`goods\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`price\` int NOT NULL, \`imagePath\` varchar(255) NOT NULL, \`genderId\` int NULL, \`colorId\` int NULL, \`sizeId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`gender\` (\`id\` int NOT NULL AUTO_INCREMENT, \`gender\` varchar(255) NOT NULL, \`name\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`Category\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    // await queryRunner.query(`CREATE TABLE \`User\` (\`id\` varchar(255) NOT NULL, \`email\` varchar(60) NOT NULL, \`password\` varchar(255) NOT NULL, \`name\` varchar(30) NOT NULL, \`phone\` varchar(20) NOT NULL, \`birthOfDate\` datetime NOT NULL, \`gender\` varchar(255) NOT NULL, \`isAdmin\` tinyint NOT NULL DEFAULT 0, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    await queryRunner.query(
      `ALTER TABLE \`goods\` ADD CONSTRAINT \`FK_6c00e3129520dac363bfd6c86ce\` FOREIGN KEY (\`genderId\`) REFERENCES \`gender\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`goods\` ADD CONSTRAINT \`FK_47f63e9eac15a07fbc559d89496\` FOREIGN KEY (\`colorId\`) REFERENCES \`color\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`goods\` ADD CONSTRAINT \`FK_eee6087deaa58ad22586e95541f\` FOREIGN KEY (\`sizeId\`) REFERENCES \`size\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`goods\` DROP FOREIGN KEY \`FK_eee6087deaa58ad22586e95541f\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`goods\` DROP FOREIGN KEY \`FK_47f63e9eac15a07fbc559d89496\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`goods\` DROP FOREIGN KEY \`FK_6c00e3129520dac363bfd6c86ce\``,
    );
    // await queryRunner.query(`DROP TABLE \`User\``);
    await queryRunner.query(`DROP TABLE \`Category\``);
    await queryRunner.query(`DROP TABLE \`gender\``);
    await queryRunner.query(`DROP TABLE \`goods\``);
    await queryRunner.query(`DROP TABLE \`size\``);
    await queryRunner.query(`DROP TABLE \`color\``);
    await queryRunner.query(`DROP TABLE \`Banner\``);
  }
}
