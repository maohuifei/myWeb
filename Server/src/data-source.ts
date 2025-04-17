import { DataSource } from 'typeorm';
import { User } from './models/entity/userEntity';
import { Article } from './models/entity/articleEntity';
import { Categories } from './models/entity/categoriesEntity';
import { Link } from './models/entity/LinkEntity';

export const AppDataSource = new DataSource({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'huafeng',
    password: 'HFhf991((!',
    database: 'huafengSQL',//数据库名
    entities: [User,Article,Categories,Link],//一个数组，用于指定 TypeORM 应该加载哪些实体类
    synchronize: true,
    // synchronize: false,
    migrations: ['src/migrations/*.js'], // 迁移文件路径
    migrationsTableName: 'migrations', // 迁移记录表名
    // logging: true,
});

  