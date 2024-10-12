import { Context } from "koa";
import { addSystemSchema,delSystemSchema,getSystemSchema,verifyAction } from "../utils/validation/system";
import { SystemDataService } from "../models/system";

const systemDataService=new SystemDataService()
const addSystem=async(ctx:Context)=>{
    try {
        const value=verifyAction(addSystemSchema,ctx.request.body)
        await systemDataService.addSystem(value)
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
const delSystem=async(ctx:Context)=>{
    try {
        const value=verifyAction(delSystemSchema,ctx.params)
        await systemDataService.delSystem(value)
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
const getSystem=async(ctx:Context)=>{
    try {
        const value=verifyAction(getSystemSchema,ctx.request.query)
        const systemList=await systemDataService.getSystem(value)
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
const getTypeListSystem=async(ctx:Context)=>{
    try {
        const value=verifyAction(getSystemSchema,ctx.request.query)
        const systemList=await systemDataService.gettypeSystem()
        ctx.state=200;
        ctx.body={
            data:systemList,
            message:"获取type列表成功"
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
    addSystem,
    delSystem,
    getSystem,
    getTypeListSystem,
}