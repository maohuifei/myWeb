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
exports.InitialMigration1737375166175 = void 0;
class InitialMigration1737375166175 {
    constructor() {
        this.name = 'InitialMigration1737375166175';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`username\``);
            yield queryRunner.query(`ALTER TABLE \`user\` ADD \`username\` varchar(255) NOT NULL DEFAULT 'huafengAdmin'`);
            yield queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`password\``);
            yield queryRunner.query(`ALTER TABLE \`user\` ADD \`password\` varchar(255) NOT NULL DEFAULT 'ooo000---'`);
            yield queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`nickname\``);
            yield queryRunner.query(`ALTER TABLE \`user\` ADD \`nickname\` varchar(255) NULL`);
            yield queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`avatar\``);
            yield queryRunner.query(`ALTER TABLE \`user\` ADD \`avatar\` varchar(255) NULL`);
            yield queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`declaration\``);
            yield queryRunner.query(`ALTER TABLE \`user\` ADD \`declaration\` varchar(255) NULL`);
            yield queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`position\``);
            yield queryRunner.query(`ALTER TABLE \`user\` ADD \`position\` varchar(255) NULL`);
            yield queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`address\``);
            yield queryRunner.query(`ALTER TABLE \`user\` ADD \`address\` varchar(255) NULL`);
            yield queryRunner.query(`ALTER TABLE \`article\` DROP COLUMN \`title\``);
            yield queryRunner.query(`ALTER TABLE \`article\` ADD \`title\` varchar(255) NOT NULL`);
            yield queryRunner.query(`ALTER TABLE \`article\` DROP COLUMN \`abstract\``);
            yield queryRunner.query(`ALTER TABLE \`article\` ADD \`abstract\` varchar(255) NOT NULL`);
            yield queryRunner.query(`ALTER TABLE \`categories\` DROP COLUMN \`name\``);
            yield queryRunner.query(`ALTER TABLE \`categories\` ADD \`name\` varchar(255) NOT NULL`);
            yield queryRunner.query(`ALTER TABLE \`categories\` DROP COLUMN \`type\``);
            yield queryRunner.query(`ALTER TABLE \`categories\` ADD \`type\` varchar(255) NOT NULL`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE \`categories\` DROP COLUMN \`type\``);
            yield queryRunner.query(`ALTER TABLE \`categories\` ADD \`type\` varchar(255) NOT NULL`);
            yield queryRunner.query(`ALTER TABLE \`categories\` DROP COLUMN \`name\``);
            yield queryRunner.query(`ALTER TABLE \`categories\` ADD \`name\` varchar(255) NOT NULL`);
            yield queryRunner.query(`ALTER TABLE \`article\` DROP COLUMN \`abstract\``);
            yield queryRunner.query(`ALTER TABLE \`article\` ADD \`abstract\` varchar(255) NOT NULL`);
            yield queryRunner.query(`ALTER TABLE \`article\` DROP COLUMN \`title\``);
            yield queryRunner.query(`ALTER TABLE \`article\` ADD \`title\` varchar(255) NOT NULL`);
            yield queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`address\``);
            yield queryRunner.query(`ALTER TABLE \`user\` ADD \`address\` varchar(255) NULL`);
            yield queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`position\``);
            yield queryRunner.query(`ALTER TABLE \`user\` ADD \`position\` varchar(255) NULL`);
            yield queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`declaration\``);
            yield queryRunner.query(`ALTER TABLE \`user\` ADD \`declaration\` varchar(255) NULL`);
            yield queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`avatar\``);
            yield queryRunner.query(`ALTER TABLE \`user\` ADD \`avatar\` varchar(255) NULL`);
            yield queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`nickname\``);
            yield queryRunner.query(`ALTER TABLE \`user\` ADD \`nickname\` varchar(255) NULL`);
            yield queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`password\``);
            yield queryRunner.query(`ALTER TABLE \`user\` ADD \`password\` varchar(255) NOT NULL DEFAULT 'ooo000---'`);
            yield queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`username\``);
            yield queryRunner.query(`ALTER TABLE \`user\` ADD \`username\` varchar(255) NOT NULL DEFAULT 'huafengAdmin'`);
        });
    }
}
exports.InitialMigration1737375166175 = InitialMigration1737375166175;
