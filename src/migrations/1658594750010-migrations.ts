import { MigrationInterface, QueryRunner } from 'typeorm';

export class migrations1658594750010 implements MigrationInterface {
  name = 'migrations1658594750010';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // await queryRunner.query(`CREATE TABLE \`Banner\` (\`id\` int NOT NULL AUTO_INCREMENT, \`imagePath\` varchar(255) NOT NULL, \`content\` text NOT NULL, \`type\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    // await queryRunner.query(`CREATE TABLE \`Category\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    // await queryRunner.query(`CREATE TABLE \`User\` (\`id\` varchar(255) NOT NULL, \`email\` varchar(60) NOT NULL, \`password\` varchar(255) NOT NULL, \`name\` varchar(30) NOT NULL, \`phone\` varchar(20) NOT NULL, \`birthOfDate\` datetime NOT NULL, \`gender\` varchar(255) NOT NULL, \`isAdmin\` tinyint NOT NULL DEFAULT 0, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    await queryRunner.query(
      `ALTER TABLE \`goods\` CHANGE \`stock\` \`stock\` int NOT NULL DEFAULT '10'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`goods\` CHANGE \`stock\` \`stock\` int NOT NULL`,
    );
    // await queryRunner.query(`DROP TABLE \`User\``);
    // await queryRunner.query(`DROP TABLE \`Category\``);
    // await queryRunner.query(`DROP TABLE \`Banner\``);
  }
}
