import { Context } from "koa";
import { addCategoriesSchema,delCategoriesSchema,getCategoriesSchema,verifyAction } from "../utils/validation/categories";
import { CategoriesDataService } from "../models/categories";

const systemDataService=new CategoriesDataService()
const addCategories=async(ctx:Context)=>{
    try {
        const value=verifyAction(addCategoriesSchema,ctx.request.body)
        await systemDataService.addCategories(value)
        ctx.state=200;
        ctx.body={
            message:"添加成功"
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
const delCategories=async(ctx:Context)=>{
    try {
        const value=verifyAction(delCategoriesSchema,ctx.params)
        await systemDataService.delCategories(value)
        ctx.state=200;
        ctx.body={
            message:"删除成功"
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
const getCategories=async(ctx:Context)=>{
    try {
        const value=verifyAction(getCategoriesSchema,ctx.request.query)
        const systemList=await systemDataService.getCategories(value)
        ctx.state=200;
        ctx.body={
            data:systemList,
            message:"获取成功"
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

export{
    addCategories,
    delCategories,
    getCategories,
}