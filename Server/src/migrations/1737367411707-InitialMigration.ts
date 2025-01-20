import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1737367411707 implements MigrationInterface {
    name = 'InitialMigration1737367411707'

    public async up(queryRunner: QueryRunner): Promise<void> {
        // 创建 user 表
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS \`user\` (
                \`id\` int NOT NULL AUTO_INCREMENT,
                \`username\` varchar(255) NOT NULL DEFAULT 'huafengAdmin',
                \`password\` varchar(255) NOT NULL DEFAULT 'ooo000---',
                \`nickname\` varchar(255) NULL,
                \`avatar\` varchar(255) NULL,
                \`declaration\` varchar(255) NULL,
                \`position\` varchar(255) NULL,
                \`address\` varchar(255) NULL,
                PRIMARY KEY (\`id\`)
            ) ENGINE=InnoDB
        `);

        // 创建 article 表
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS \`article\` (
                \`id\` int NOT NULL AUTO_INCREMENT,
                \`title\` varchar(255) NOT NULL,
                \`abstract\` varchar(255) NOT NULL,
                \`content\` text NOT NULL,
                \`createTime\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
                \`updateTime\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                PRIMARY KEY (\`id\`)
            ) ENGINE=InnoDB
        `);

        // 创建 categories 表
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS \`categories\` (
                \`id\` int NOT NULL AUTO_INCREMENT,
                \`name\` varchar(255) NOT NULL,
                \`type\` varchar(255) NOT NULL,
                PRIMARY KEY (\`id\`)
            ) ENGINE=InnoDB
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // 删除表
        await queryRunner.query(`DROP TABLE IF EXISTS \`categories\``);
        await queryRunner.query(`DROP TABLE IF EXISTS \`article\``);
        await queryRunner.query(`DROP TABLE IF EXISTS \`user\``);
    }
}
