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
exports.loginPot = exports.userGet = exports.userPut = exports.userDel = exports.userAdd = void 0;
const user_1 = require("../utils/validation/user");
const user_2 = require("../models/user");
const jwt_1 = require("../utils/jwt");
const userDataService = new user_2.UserDataService();
const userAdd = (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //校验参数
        const value = (0, user_1.verifyAction)(user_1.addUserSchema, ctx.request.body);
        //crud
        yield userDataService.addUser(value);
        ctx.status = 200;
        ctx.body = { message: "添加用户成功" };
    }
    catch (error) {
        //从 TypeScript 3.0 开始，unknown 是更安全的默认类型，因为它不允许你直接访问其属性或方法，除非你首先将其断言或转换为更具体的类型
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
exports.userAdd = userAdd;
const userDel = (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const value = (0, user_1.verifyAction)(user_1.deleteUserSchema, ctx.params);
        yield userDataService.delUser(value);
        ctx.status = 200;
        ctx.body = { message: "删除用户成功" };
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
exports.userDel = userDel;
const userPut = (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const value = (0, user_1.verifyAction)(user_1.updateUserSchema, ctx.request.body);
        yield userDataService.putUser(value);
        ctx.status = 200;
        ctx.body = { message: "修改用户成功" };
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
exports.userPut = userPut;
const userGet = (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const value = (0, user_1.verifyAction)(user_1.getUserSchema, ctx.query);
        const { userlist, totalCount } = yield userDataService.getUser(value);
        ctx.status = 200;
        ctx.body = {
            data: userlist,
            totalCount: totalCount,
            message: "获取用户列表成功"
        };
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
exports.userGet = userGet;
//登录
const loginPot = (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const value = (0, user_1.verifyAction)(user_1.loginSchema, ctx.request.body);
        const data = yield userDataService.potLogin(value);
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
            ctx.body = `Error错误：${error}`;
        }
        else {
            ctx.status = 400;
            ctx.body = `其他错误：${error}`;
        }
    }
});
exports.loginPot = loginPot;
