import Koa from 'koa';
import koaBody from 'koa-body';
import jsonError from 'koa-json-error';
import userRouter from './routes/user';
import ariticleRouter from './routes/article'
import systemRouter from './routes/system'
import categoriesRouter from './routes/categories'
import { AppDataSource } from '../data-source'; // 导入 DataSource 实例
import cors from 'koa2-cors'
import { authenticate } from './utils/tokenAuth';

const app = new Koa();

// 定义允许的域名
const allowedOrigins = [
  'http://localhost:5173',
   'http://localhost:5174',
 ];
// 配置 CORS 选项
const corsOptions = {
   origin: (ctx:any) => {
     const origin = ctx.request.headers.origin;
     if (allowedOrigins.includes(origin)) {
       return origin; // 允许的域名
     }
     return null; // 不允许的域名
   },
   // allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // 允许的请求方法
   // allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
   credentials: true,
   maxAge: 5,
 };

// 使用 CORS 中间件
app.use(cors(corsOptions));


app.use(async (ctx, next) => {
    await authenticate(ctx, next);
});

app.use(koaBody({
    json: true,
}));


app.use(jsonError());
// 初始化 DataSource
AppDataSource.initialize()
    .then(() => {
        app.use(userRouter.routes());
        app.use(ariticleRouter.routes());
        app.use(systemRouter.routes());
        app.use(categoriesRouter.routes());
        app.listen(3000, () => {
            console.log("服务运行----，本地预览：http://localhost:3000");
        });
    })
    .catch((error) => {
        console.error('数据源初始化时出错:', error);
    });