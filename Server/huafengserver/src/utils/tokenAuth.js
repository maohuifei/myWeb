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
/**
 * 认证中间件
 * 用于验证请求中的JWT token，保护需要认证的API接口
 */
const jwt_1 = require("../utils/jwt");
/**
 * 不需要进行身份验证的路由白名单
 * 这些路由可以直接访问，不需要提供token
 */
const whiteList = [
    '/api/article/list', // 文章列表
    '/api/article/content', // 文章内容
    '/api/user/login', // 用户登录
    '/api/categories/list', // 分类列表
];
/**
 * 认证中间件函数
 * 验证请求中的JWT token是否有效
 * @param ctx Koa上下文对象
 * @param next 下一个中间件函数
 * @throws 401 当token未提供或格式错误时
 * @throws 405 当token验证失败时
 */
function authenticate(ctx, next) {
    return __awaiter(this, void 0, void 0, function* () {
        // 检查请求路径是否在白名单中
        const path = ctx.path;
        if (whiteList.includes(path)) {
            yield next();
            return;
        }
        // 获取并验证Authorization头
        const authorization = ctx.headers.authorization;
        if (!authorization) {
            ctx.throw(405, '未携带token');
        }
        // 验证token格式
        const parts = authorization.split(' ');
        if (parts.length !== 2 || parts[0] !== 'Bearer') {
            ctx.throw(405, '无效的token格式');
        }
        // 验证token有效性
        const token = parts[1];
        const decoded = (0, jwt_1.verifyToken)(token);
        if (!decoded) {
            ctx.throw(405, 'token验证错误');
        }
        // 将解码后的用户信息存储在上下文中
        ctx.state.userId = decoded.user_id;
        yield next();
    });
}
