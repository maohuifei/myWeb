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
exports.getCategories = exports.delCategories = exports.addCategories = void 0;
const categories_1 = require("../utils/validation/categories");
const categories_2 = require("../models/categories");
const systemDataService = new categories_2.CategoriesDataService();
const addCategories = (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const value = (0, categories_1.verifyAction)(categories_1.addCategoriesSchema, ctx.request.body);
        yield systemDataService.addCategories(value);
        ctx.state = 200;
        ctx.body = {
            message: "添加成功"
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
exports.addCategories = addCategories;
const delCategories = (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const value = (0, categories_1.verifyAction)(categories_1.delCategoriesSchema, ctx.params);
        yield systemDataService.delCategories(value);
        ctx.state = 200;
        ctx.body = {
            message: "删除成功"
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
exports.delCategories = delCategories;
const getCategories = (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const value = (0, categories_1.verifyAction)(categories_1.getCategoriesSchema, ctx.request.query);
        const systemList = yield systemDataService.getCategories(value);
        ctx.state = 200;
        ctx.body = {
            data: systemList,
            message: "获取成功"
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
exports.getCategories = getCategories;
