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
exports.articleContentGet = exports.articleGet = exports.articlePut = exports.articleDel = exports.articleAdd = void 0;
const article_1 = require("../utils/validation/article");
const article_2 = require("../models/article");
// 创建文章服务实例
const articleDataService = new article_2.ArticleDataService();
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
 * 添加新文章
 * @param ctx Koa上下文
 * POST /api/article
 */
const articleAdd = (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //校验参数
        const value = (0, article_1.verifyAction)(article_1.addArticleSchema, ctx.request.body);
        //crud
        yield articleDataService.addArticle(value);
        ctx.status = 200;
        ctx.body = { success: true, message: "添加文章成功" };
    }
    catch (error) {
        handleError(ctx, error);
    }
});
exports.articleAdd = articleAdd;
/**
 * 删除文章
 * @param ctx Koa上下文
 * DELETE /api/article/:id
 */
const articleDel = (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const value = (0, article_1.verifyAction)(article_1.delArticleSchema, ctx.params);
        yield articleDataService.delArticle(value);
        ctx.status = 200;
        ctx.body = { success: true, message: "删除文章成功" };
    }
    catch (error) {
        handleError(ctx, error);
    }
});
exports.articleDel = articleDel;
/**
 * 更新文章
 * @param ctx Koa上下文
 * PUT /api/article
 */
const articlePut = (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const value = (0, article_1.verifyAction)(article_1.putArticleSchema, ctx.request.body);
        yield articleDataService.putArticle(value);
        ctx.status = 200;
        ctx.body = { success: true, message: "修改文章成功" };
    }
    catch (error) {
        handleError(ctx, error);
    }
});
exports.articlePut = articlePut;
/**
 * 获取文章列表
 * @param ctx Koa上下文
 * GET /api/article
 */
const articleGet = (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const value = (0, article_1.verifyAction)(article_1.getArticleSchema, ctx.query);
        const { articlelist, totalCount } = yield articleDataService.getArticle(value);
        ctx.status = 200;
        ctx.body = {
            success: true,
            data: articlelist,
            totalCount: totalCount,
            message: "获取文章列表成功"
        };
    }
    catch (error) {
        handleError(ctx, error);
    }
});
exports.articleGet = articleGet;
/**
 * 获取文章详情
 * @param ctx Koa上下文
 * GET /api/article/content
 */
const articleContentGet = (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const value = (0, article_1.verifyAction)(article_1.getArticleContentSchema, ctx.query);
        const data = yield articleDataService.getArticleContent(value);
        ctx.status = 200;
        ctx.body = {
            success: true,
            data: data,
            message: "获取文章详情成功"
        };
    }
    catch (error) {
        handleError(ctx, error);
    }
});
exports.articleContentGet = articleContentGet;
