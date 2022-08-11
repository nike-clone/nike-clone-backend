import { MigrationInterface, QueryRunner } from "typeorm";

export class migration1660205061093 implements MigrationInterface {
    name = 'migration1660205061093'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`goods\` DROP FOREIGN KEY \`FK_47f63e9eac15a07fbc559d89496\``);
        await queryRunner.query(`ALTER TABLE \`goods\` DROP FOREIGN KEY \`FK_eee6087deaa58ad22586e95541f\``);
        await queryRunner.query(`CREATE TABLE \`goods_item\` (\`id\` int NOT NULL AUTO_INCREMENT, \`stock\` int NOT NULL DEFAULT '10', \`colorId\` int NULL, \`sizeId\` int NULL, \`goodsId\` int NULL, \`goodsItemImagesId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`goods_item_images\` (\`id\` int NOT NULL AUTO_INCREMENT, \`goodsName\` varchar(255) NOT NULL, \`color\` varchar(255) NOT NULL, \`goodsItemImages\` text NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`goods\` DROP COLUMN \`imagePath\``);
        await queryRunner.query(`ALTER TABLE \`goods\` DROP COLUMN \`colorId\``);
        await queryRunner.query(`ALTER TABLE \`goods\` DROP COLUMN \`sizeId\``);
        await queryRunner.query(`ALTER TABLE \`goods\` DROP COLUMN \`stock\``);
        await queryRunner.query(`ALTER TABLE \`goods\` ADD \`productImagePrimary\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`goods\` ADD \`productImageExtra\` text NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`goods_item\` ADD CONSTRAINT \`FK_09234e600c2ebb6ea701dc0a91d\` FOREIGN KEY (\`colorId\`) REFERENCES \`color\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`goods_item\` ADD CONSTRAINT \`FK_df030fa65167765d2a9dcb4e029\` FOREIGN KEY (\`sizeId\`) REFERENCES \`size\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`goods_item\` ADD CONSTRAINT \`FK_79cee319fb07a04675150118543\` FOREIGN KEY (\`goodsId\`) REFERENCES \`goods\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`goods_item\` ADD CONSTRAINT \`FK_a33fbf964b2073e1cc7a15a07ec\` FOREIGN KEY (\`goodsItemImagesId\`) REFERENCES \`goods_item_images\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`goods_item\` DROP FOREIGN KEY \`FK_a33fbf964b2073e1cc7a15a07ec\``);
        await queryRunner.query(`ALTER TABLE \`goods_item\` DROP FOREIGN KEY \`FK_79cee319fb07a04675150118543\``);
        await queryRunner.query(`ALTER TABLE \`goods_item\` DROP FOREIGN KEY \`FK_df030fa65167765d2a9dcb4e029\``);
        await queryRunner.query(`ALTER TABLE \`goods_item\` DROP FOREIGN KEY \`FK_09234e600c2ebb6ea701dc0a91d\``);
        await queryRunner.query(`ALTER TABLE \`goods\` DROP COLUMN \`productImageExtra\``);
        await queryRunner.query(`ALTER TABLE \`goods\` DROP COLUMN \`productImagePrimary\``);
        await queryRunner.query(`ALTER TABLE \`goods\` ADD \`stock\` int NOT NULL DEFAULT '10'`);
        await queryRunner.query(`ALTER TABLE \`goods\` ADD \`sizeId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`goods\` ADD \`colorId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`goods\` ADD \`imagePath\` varchar(255) NOT NULL`);
        await queryRunner.query(`DROP TABLE \`goods_item_images\``);
        await queryRunner.query(`DROP TABLE \`goods_item\``);
        await queryRunner.query(`ALTER TABLE \`goods\` ADD CONSTRAINT \`FK_eee6087deaa58ad22586e95541f\` FOREIGN KEY (\`sizeId\`) REFERENCES \`size\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`goods\` ADD CONSTRAINT \`FK_47f63e9eac15a07fbc559d89496\` FOREIGN KEY (\`colorId\`) REFERENCES \`color\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
