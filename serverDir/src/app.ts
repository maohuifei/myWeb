import Koa from 'koa';
import koaBody from 'koa-body';
import jsonError from 'koa-json-error';
import userRouter from './routes/user';
import { AppDataSource } from '../data-source'; // 导入 DataSource 实例

const app = new Koa();

app.use(koaBody({
    json: true,
}));
app.use(jsonError());

// 初始化 DataSource
AppDataSource.initialize()
    .then(() => {
        app.use(userRouter.routes());
        app.listen(3000, () => {
            console.log("服务运行----，本地预览：http://localhost:3000");
        });
    })
    .catch((error) => {
        console.error('数据源初始化时出错:', error);
    });