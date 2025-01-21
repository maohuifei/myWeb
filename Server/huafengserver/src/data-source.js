"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const userEntity_1 = require("./models/entity/userEntity");
const articleEntity_1 = require("./models/entity/articleEntity");
const categoriesEntity_1 = require("./models/entity/categoriesEntity");
exports.AppDataSource = new typeorm_1.DataSource({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'huafeng',
    password: 'HFhf991((!',
    database: 'huafengSQL', //数据库名
    entities: [userEntity_1.User, articleEntity_1.Article, categoriesEntity_1.Categories], //一个数组，用于指定 TypeORM 应该加载哪些实体类
    synchronize: false,
    migrations: ['src/migrations/*.ts'], // 迁移文件路径
    migrationsTableName: 'migrations', // 迁移记录表名
    // logging: true,
});
