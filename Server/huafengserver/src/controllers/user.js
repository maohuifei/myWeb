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
exports.queryPot = exports.revisePot = exports.loginPot = void 0;
const user_1 = require("../utils/validation/user");
const user_2 = require("../models/user");
const jwt_1 = require("../utils/jwt");
// 创建用户服务实例
const userDataService = new user_2.UserDataService();
/**
 * 用户登录
 * @param ctx Koa上下文对象
 * POST /api/user/login
 * 成功时返回JWT token
 */
const loginPot = (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // 验证登录信息
        const value = (0, user_1.verifyAction)(user_1.loginSchema, ctx.request.body);
        const data = yield userDataService.potLogin(value);
        // 生成JWT token
        const token = (0, jwt_1.signToken)(data.id, data.username, data.password);
        ctx.status = 200;
        ctx.body = {
            message: "登录成功",
            token: token
        };
    }
    catch (error) {
        if (error instanceof Error) {
            ctx.status = 400;
            ctx.body = error.message;
        }
        else {
            ctx.status = 400;
            ctx.body = `未知错误：${error}`;
        }
    }
});
exports.loginPot = loginPot;
//修改用户信息
const revisePot = (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const value = (0, user_1.verifyAction)(user_1.reviseSchema, ctx.request.body);
        yield userDataService.reviseUser(value);
        ctx.status = 200;
        ctx.body = { message: "修改用户信息成功" };
    }
    catch (error) {
        if (error instanceof Error) {
            ctx.status = 400;
            ctx.body = `Error错误：${error}`;
        }
        else {
            ctx.status = 400;
            ctx.body = `其他错误：${error}`;
        }
    }
});
exports.revisePot = revisePot;
//查询用户信息
const queryPot = (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    const value = (0, user_1.verifyAction)(user_1.querySchema, ctx.request.query);
    const data = yield userDataService.queryUser(value);
    ctx.status = 200;
    ctx.body = {
        data: data,
        message: "查询用户信息成功"
    };
});
exports.queryPot = queryPot;
