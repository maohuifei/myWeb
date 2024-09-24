import Koa from 'koa';
import koaBody from 'koa-body';
import jsonError from 'koa-json-error';
import userRouter from './routes/user';
import ariticleRouter from './routes/article'
import systemRouter from './routes/system'
import { AppDataSource } from '../data-source'; // 导入 DataSource 实例
import cors from 'koa2-cors'
import { authenticate } from './utils/tokenAuth';

const app = new Koa();

app.use(async (ctx, next) => {  
      await authenticate(ctx, next);
  }); 

app.use(koaBody({
    json: true,
}));
app.use(cors({  
    origin: function (ctx) {  
      // 动态设置允许跨域的域名，这里以允许所有域名为例  
      return '*';
    // return 'http://localhost:5174','http://localhost:5173';
    },  
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'HEAD'], // 允许的HTTP方法  
    exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'], // 需要暴露给客户端的头部  
    allowHeaders: ['Content-Type', 'Authorization', 'Accept'], // 允许客户端发送的头部  
    maxAge: 5, // 预检请求的缓存时间（秒）  
    credentials: true, // 是否允许发送Cookie  
  }));  

app.use(jsonError());
// 初始化 DataSource
AppDataSource.initialize()
    .then(() => {
        app.use(userRouter.routes());
        app.use(ariticleRouter.routes());
        app.use(systemRouter.routes());
        app.listen(3000, () => {
            console.log("服务运行----，本地预览：http://localhost:3000");
        });
    })
    .catch((error) => {
        console.error('数据源初始化时出错:', error);
    });