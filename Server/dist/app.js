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
const koa_1 = __importDefault(require("koa"));
const koa_body_1 = __importDefault(require("koa-body"));
const koa_json_error_1 = __importDefault(require("koa-json-error"));
const user_1 = __importDefault(require("./routes/user"));
const article_1 = __importDefault(require("./routes/article"));
const categories_1 = __importDefault(require("./routes/categories"));
const data_source_1 = require("./data-source"); // 导入 DataSource 实例
const koa2_cors_1 = __importDefault(require("koa2-cors"));
const tokenAuth_1 = require("./utils/tokenAuth");
require("reflect-metadata");
const app = new koa_1.default();
// 定义允许的域名
const allowedOrigins = [
    'http://localhost:5173',
    'http://localhost:5174',
];
// 配置 CORS 选项
const corsOptions = {
    origin: (ctx) => {
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
app.use((0, koa2_cors_1.default)(corsOptions));
app.use((ctx, next) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, tokenAuth_1.authenticate)(ctx, next);
}));
app.use((0, koa_body_1.default)({
    json: true,
}));
app.use((0, koa_json_error_1.default)());
// 初始化 DataSource
data_source_1.AppDataSource.initialize()
    .then(() => {
    app.use(user_1.default.routes());
    app.use(article_1.default.routes());
    app.use(categories_1.default.routes());
    app.listen(3000, () => {
        console.log("服务运行----，本地预览：http://localhost:3000");
    });
})
    .catch((error) => {
    console.error('数据源初始化时出错:', error);
});
