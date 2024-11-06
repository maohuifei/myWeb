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
const articleDataService = new article_2.ArticleDataService();
const articleAdd = (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //校验参数
        const value = (0, article_1.verifyAction)(article_1.addArticleSchema, ctx.request.body);
        //crud
        yield articleDataService.addArticle(value);
        ctx.status = 200;
        ctx.body = { message: "添加文章成功" };
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
exports.articleAdd = articleAdd;
const articleDel = (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const value = (0, article_1.verifyAction)(article_1.delArticleSchema, ctx.params);
        yield articleDataService.delArticle(value);
        ctx.status = 200;
        ctx.body = { message: "删除文章成功" };
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
exports.articleDel = articleDel;
const articlePut = (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const value = (0, article_1.verifyAction)(article_1.putArticleSchema, ctx.request.body);
        yield articleDataService.putArticle(value);
        ctx.status = 200;
        ctx.body = { message: "修改文章成功" };
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
exports.articlePut = articlePut;
const articleGet = (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const value = (0, article_1.verifyAction)(article_1.getArticleSchema, ctx.query);
        const { articlelist, totalCount } = yield articleDataService.getArticle(value);
        ctx.status = 200;
        ctx.body = {
            data: articlelist,
            totalCount: totalCount,
            message: "获取文章列表成功"
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
exports.articleGet = articleGet;
const articleContentGet = (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const value = (0, article_1.verifyAction)(article_1.getArticleContentSchema, ctx.query);
        const data = yield articleDataService.getArticleContent(value);
        ctx.status = 200;
        ctx.body = {
            data: data,
            message: "获取文章详情成功"
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
exports.articleContentGet = articleContentGet;
