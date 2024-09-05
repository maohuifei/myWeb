import { DataSource } from 'typeorm';
import { User } from './src/entity/User';

export const AppDataSource = new DataSource({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '88888888',
    database: 'huafeng',
    entities: [User],
    synchronize: true,
});

  