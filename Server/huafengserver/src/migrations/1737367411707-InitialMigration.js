"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InitialMigration1737367411707 = void 0;
class InitialMigration1737367411707 {
    constructor() {
        this.name = 'InitialMigration1737367411707';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            // 创建 user 表
            yield queryRunner.query(`
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
            yield queryRunner.query(`
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
            yield queryRunner.query(`
            CREATE TABLE IF NOT EXISTS \`categories\` (
                \`id\` int NOT NULL AUTO_INCREMENT,
                \`name\` varchar(255) NOT NULL,
                \`type\` varchar(255) NOT NULL,
                PRIMARY KEY (\`id\`)
            ) ENGINE=InnoDB
        `);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            // 删除表
            yield queryRunner.query(`DROP TABLE IF EXISTS \`categories\``);
            yield queryRunner.query(`DROP TABLE IF EXISTS \`article\``);
            yield queryRunner.query(`DROP TABLE IF EXISTS \`user\``);
        });
    }
}
exports.InitialMigration1737367411707 = InitialMigration1737367411707;
