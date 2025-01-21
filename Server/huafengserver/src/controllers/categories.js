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
// 创建分类服务实例
const categoriesDataService = new categories_2.CategoriesDataService();
/**
 * 统一的错误处理函数
 * @param ctx Koa上下文
 * @param error 捕获的错误
 */
const handleError = (ctx, error) => {
    ctx.status = 400;
    if (error instanceof Error) {
        ctx.body = { success: false, message: error.message };
    }
    else {
        ctx.body = { success: false, message: `未知错误：${error}` };
    }
};
/**
 * 添加新分类
 * @param ctx Koa上下文
 * POST /api/categories
 */
const addCategories = (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const value = (0, categories_1.verifyAction)(categories_1.addCategoriesSchema, ctx.request.body);
        yield categoriesDataService.addCategories(value);
        ctx.status = 200;
        ctx.body = {
            success: true,
            message: "添加分类成功"
        };
    }
    catch (error) {
        handleError(ctx, error);
    }
});
exports.addCategories = addCategories;
/**
 * 删除分类
 * @param ctx Koa上下文
 * DELETE /api/categories/:id
 */
const delCategories = (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const value = (0, categories_1.verifyAction)(categories_1.delCategoriesSchema, ctx.params);
        yield categoriesDataService.delCategories(value);
        ctx.status = 200;
        ctx.body = {
            success: true,
            message: "删除分类成功"
        };
    }
    catch (error) {
        handleError(ctx, error);
    }
});
exports.delCategories = delCategories;
/**
 * 获取分类列表
 * @param ctx Koa上下文
 * GET /api/categories
 */
const getCategories = (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const value = (0, categories_1.verifyAction)(categories_1.getCategoriesSchema, ctx.request.query);
        const categoriesList = yield categoriesDataService.getCategories(value);
        ctx.status = 200;
        ctx.body = {
            success: true,
            data: categoriesList,
            message: "获取分类列表成功"
        };
    }
    catch (error) {
        handleError(ctx, error);
    }
});
exports.getCategories = getCategories;
