import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1737375166175 implements MigrationInterface {
    name = 'InitialMigration1737375166175'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`username\``);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`username\` varchar(255) NOT NULL DEFAULT 'huafengAdmin'`);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`password\``);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`password\` varchar(255) NOT NULL DEFAULT 'ooo000---'`);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`nickname\``);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`nickname\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`avatar\``);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`avatar\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`declaration\``);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`declaration\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`position\``);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`position\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`address\``);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`address\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`article\` DROP COLUMN \`title\``);
        await queryRunner.query(`ALTER TABLE \`article\` ADD \`title\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`article\` DROP COLUMN \`abstract\``);
        await queryRunner.query(`ALTER TABLE \`article\` ADD \`abstract\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`categories\` DROP COLUMN \`name\``);
        await queryRunner.query(`ALTER TABLE \`categories\` ADD \`name\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`categories\` DROP COLUMN \`type\``);
        await queryRunner.query(`ALTER TABLE \`categories\` ADD \`type\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`categories\` DROP COLUMN \`type\``);
        await queryRunner.query(`ALTER TABLE \`categories\` ADD \`type\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`categories\` DROP COLUMN \`name\``);
        await queryRunner.query(`ALTER TABLE \`categories\` ADD \`name\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`article\` DROP COLUMN \`abstract\``);
        await queryRunner.query(`ALTER TABLE \`article\` ADD \`abstract\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`article\` DROP COLUMN \`title\``);
        await queryRunner.query(`ALTER TABLE \`article\` ADD \`title\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`address\``);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`address\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`position\``);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`position\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`declaration\``);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`declaration\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`avatar\``);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`avatar\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`nickname\``);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`nickname\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`password\``);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`password\` varchar(255) NOT NULL DEFAULT 'ooo000---'`);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`username\``);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`username\` varchar(255) NOT NULL DEFAULT 'huafengAdmin'`);
    }

}
