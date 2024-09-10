import { DataSource } from 'typeorm';
import { User } from './src/models/entity/userEntity';
import { Article } from './src/models/entity/articleEntity';
import { System } from './src/models/entity/systemEntity';

export const AppDataSource = new DataSource({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '88888888',
    database: 'huafeng',//数据库名
    entities: [User,Article,System],//一个数组，用于指定 TypeORM 应该加载哪些实体类
    synchronize: true,
});

  