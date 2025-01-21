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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 应用程序入口文件
 * 配置和启动Koa服务器
 */
const koa_1 = __importDefault(require("koa"));
const koa_body_1 = __importDefault(require("koa-body"));
const koa_json_error_1 = __importDefault(require("koa-json-error"));
const user_1 = __importDefault(require("./routes/user"));
const article_1 = __importDefault(require("./routes/article"));
const categories_1 = __importDefault(require("./routes/categories"));
const data_source_1 = require("./data-source");
const koa2_cors_1 = __importDefault(require("koa2-cors"));
const tokenAuth_1 = require("./utils/tokenAuth");
require("reflect-metadata");
const user_2 = require("./models/user");
// 创建Koa应用实例
const app = new koa_1.default();
/**
 * CORS中间件配置选项
 */
const corsOptions = {
    origin: (ctx) => {
        const origin = ctx.request.header.origin;
        // 允许的域名列表
        const whitelist = [
            'http://localhost:5173',
            'http://localhost:5174',
            'http://140.143.143.80',
            'http://huafeng.website',
            'http://www.huafeng.website',
            'http://huafeng.website:80',
            'http://www.huafeng.website:80'
        ];
        if (!origin || whitelist.includes(origin)) {
            return origin || '';
        }
        return false;
    },
    credentials: true,
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowHeaders: ['Content-Type', 'Authorization', 'Accept', 'X-Requested-With'],
    exposeHeaders: ['Content-Length', 'Content-Range'],
    maxAge: 86400, // 24小时
};
// 使用CORS中间件
app.use((0, koa2_cors_1.default)(corsOptions));
// 使用认证中间件
app.use((ctx, next) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, tokenAuth_1.authenticate)(ctx, next);
}));
// 使用请求体解析中间件
app.use((0, koa_body_1.default)({
    json: true, // 支持JSON格式的请求体
}));
// 使用错误处理中间件
app.use((0, koa_json_error_1.default)());
// 初始化数据库连接
data_source_1.AppDataSource.initialize()
    .then(() => __awaiter(void 0, void 0, void 0, function* () {
    // 初始化管理员账号
    const userService = new user_2.UserDataService();
    yield userService.initAdmin();
    // 注册路由
    app.use(user_1.default.routes());
    app.use(article_1.default.routes());
    app.use(categories_1.default.routes());
    // 启动服务器
    app.listen(3000, () => {
        console.log("服务运行----，本地预览：http://localhost:3000");
    });
}))
    .catch((error) => {
    console.error('数据源初始化时出错:', error);
});
