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
 * 用户相关路由定义
 * 处理所有与用户相关的HTTP路由
 */
const koa_router_1 = __importDefault(require("koa-router"));
const user_1 = require("../controllers/user");
/**
 * 创建路由实例
 * 所有用户相关的路由都以/api/user为前缀
 */
const router = new koa_router_1.default({
    prefix: '/api/user'
});
/**
 * 用户登录
 * POST /api/user/login
 * Body: { username: string, password: string }
 * 返回: { message: string, token: string }
 */
router.post('/login', (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, user_1.loginPot)(ctx);
}));
//修改用户信息
router.put('/revise', (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, user_1.revisePot)(ctx);
}));
//查询用户信息
router.get('/query', (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, user_1.queryPot)(ctx);
}));
exports.default = router;
