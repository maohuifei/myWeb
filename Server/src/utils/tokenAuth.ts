// src/middleware/auth.ts  
import { verifyToken } from '../utils/jwt';  
  
// 定义不需要进行身份验证的路由白名单  
const whiteList = [   
  '/api/article/list',
  '/api/article/content',
  '/api/user/login', // 例如登录接口通常不需要身份验证  
  '/api/user/add',
];  
  
export async function authenticate(ctx: any, next: any) {  
    const path = ctx.path;  
    if (whiteList.includes(path)) {  
        await next();  
        return;  
    }  

    const authorization = ctx.headers.authorization;  
    if (!authorization) {  
        ctx.throw(405, '未携带token');  
    }  

    const parts = authorization.split(' ');  
    if (parts.length !== 2 || parts[0] !== 'Bearer') {  
        ctx.throw(405, '无效的token格式');  
    }  

    const token = parts[1];  
    const decoded = verifyToken(token);  
    if (!decoded) {  
        ctx.throw(405, 'token验证错误');  
    }  

    ctx.state.userId = decoded.user_id; // 注意这里使用 decoded.user_id 而不是 decoded.id  
    await next();  
}