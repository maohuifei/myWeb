import { Context } from 'koa';//引入koa类型信息，不然ctx会报错

import { addArticleSchema, delArticleSchema, putArticleSchema, getArticleSchema,getArticleContentSchema,verifyAction } from '../utils/validation/article'
import  {ArticleDataService}  from '../models/article';

const articleDataService =new ArticleDataService()

const articleAdd = async (ctx: Context) => {
    try {
        //校验参数
        const value = verifyAction(addArticleSchema, ctx.request.body)
        //crud
        await articleDataService.addArticle(value)
        ctx.status = 200
        ctx.body = { message: "添加文章成功" }
    } catch (error) {
        //从 TypeScript 3.0 开始，unknown 是更安全的默认类型，因为它不允许你直接访问其属性或方法，除非你首先将其断言或转换为更具体的类型
        if (error instanceof Error) {
            ctx.status = 400;
            ctx.body = `Error错误：${error}`
        } else {
            ctx.status = 400;
            ctx.body = `其他错误：${error}`
        }
    }

}
const articleDel = async (ctx: Context) => {
    try {
        const value = verifyAction(delArticleSchema, ctx.params)
        await articleDataService.delArticle(value)
        ctx.status = 200
        ctx.body = { message: "删除文章成功" }
    } catch (error) {
        if (error instanceof Error) {
            ctx.status = 400;
            ctx.body = `Error错误：${error}`
        } else {
            ctx.status = 400;
            ctx.body = `其他错误：${error}`
        }
    }
}
const articlePut = async (ctx: Context) => {
    try {
        const value = verifyAction(putArticleSchema, ctx.request.body)
        await articleDataService.putArticle(value)
        ctx.status = 200
        ctx.body = { message: "修改文章成功" }
    } catch (error) {
        if (error instanceof Error) {
            ctx.status = 400;
            ctx.body = `Error错误：${error}`
        } else {
            ctx.status = 400;
            ctx.body = `其他错误：${error}`
        }
    }

}
const articleGet = async (ctx: Context) => {
    try {
        const value = verifyAction(getArticleSchema, ctx.query)
        const {articlelist,totalCount}=await articleDataService.getArticle(value)
        ctx.status = 200
        ctx.body = {
            data:articlelist,
            totalCount:totalCount,
            message:"获取文章列表成功"
        }
    } catch (error) {
        if (error instanceof Error) {
            ctx.status = 400;
            ctx.body = `Error错误：${error}`
        } else {
            ctx.status = 400;
            ctx.body = `其他错误：${error}`
        }
    }

}
const articleContentGet = async (ctx: Context) => {
    try {
        const value = verifyAction(getArticleContentSchema, ctx.query)
        const data=await articleDataService.getArticleContent(value)
        ctx.status = 200
        ctx.body = {
            data:data,
            message:"获取文章详情成功"
        }
    } catch (error) {
        if (error instanceof Error) {
            ctx.status = 400;
            ctx.body = `Error错误：${error}`
        } else {
            ctx.status = 400;
            ctx.body = `其他错误：${error}`
        }
    }

}

export {
    articleAdd,
    articleDel,
    articlePut,
    articleGet,
    articleContentGet
}