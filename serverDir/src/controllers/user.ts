import { Context } from 'koa';//引入koa类型信息，不然ctx会报错

import { addUserSchema, deleteUserSchema, updateUserSchema, getUserSchema,verifyAction } from '../utils/validation/user'
import  {UserDataService}  from '../models/user';

const userDataService =new UserDataService()
const userAdd = async (ctx: Context) => {
    try {
        //校验参数
        const value = verifyAction(addUserSchema, ctx.request.body)
        //crud
        await userDataService.addUser(value)
        ctx.status = 200
        ctx.body = { message: "添加用户成功" }
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
const userDel = async (ctx: Context) => {
    try {
        const value = verifyAction(deleteUserSchema, ctx.params)
        await userDataService.delUser(value)
        ctx.status = 200
        ctx.body = { message: "删除用户成功" }
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
const userPut = async (ctx: Context) => {
    try {
        const value = verifyAction(updateUserSchema, ctx.request.body)
        await userDataService.putUser(value)
        ctx.status = 200
        ctx.body = { message: "修改用户成功" }
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
const userGet = async (ctx: Context) => {
    try {
        const value = verifyAction(getUserSchema, ctx.query)
        ctx.status = 200
        ctx.body = await userDataService.getUser(value)
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
    userAdd,
    userDel,
    userPut,
    userGet
}