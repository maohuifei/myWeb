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
exports.authenticate = authenticate;
// src/middleware/auth.ts  
const jwt_1 = require("../utils/jwt");
// 定义不需要进行身份验证的路由白名单  
const whiteList = [
    '/api/article/list',
    '/api/article/content',
    '/api/user/login', // 例如登录接口通常不需要身份验证  
    '/api/user/add',
    '/api/categories/list',
];
function authenticate(ctx, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const path = ctx.path;
        if (whiteList.includes(path)) {
            yield next();
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
        const decoded = (0, jwt_1.verifyToken)(token);
        if (!decoded) {
            ctx.throw(405, 'token验证错误');
        }
        ctx.state.userId = decoded.user_id; // 注意这里使用 decoded.user_id 而不是 decoded.id  
        yield next();
    });
}
