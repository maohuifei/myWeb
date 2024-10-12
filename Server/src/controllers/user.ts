import { Context } from 'koa';//引入koa类型信息，不然ctx会报错

import { addUserSchema, deleteUserSchema, updateUserSchema, getUserSchema, verifyAction,registerSchema,loginSchema } from '../utils/validation/user'
import { UserDataService } from '../models/user';

import { signToken } from '../utils/jwt';

const userDataService = new UserDataService()
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
        const { userlist, totalCount } = await userDataService.getUser(value)
        ctx.status = 200
        ctx.body = {
            data: userlist,
            totalCount: totalCount,
            message: "获取用户列表成功"
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
//登录
const loginPot = async (ctx:Context) => {
    try {
        const value = verifyAction(loginSchema, ctx.request.body)
        const data=await userDataService.potLogin(value)
        const token = signToken(data.id,data.username,data.password)
        ctx.status = 200
        ctx.body = {
            message: "登录成功",
            token:token
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
//注册
// const registerPot = async (ctx:Context) => {
//     try {
        
//     } catch (error) {
//         if (error instanceof Error) {
//             ctx.status = 400;
//             ctx.body = `Error错误：${error}`
//         } else {
//             ctx.status = 400;
//             ctx.body = `其他错误：${error}`
//         }
//     }
    
// }
// //更新token
// const updataTokenPot = async (ctx:Context) => {
//     try {
        
//     } catch (error) {
//         if (error instanceof Error) {
//             ctx.status = 400;
//             ctx.body = `Error错误：${error}`
//         } else {
//             ctx.status = 400;
//             ctx.body = `其他错误：${error}`
//         }
//     }
    
// }

export {
    userAdd,
    userDel,
    userPut,
    userGet,
    loginPot,
    // registerPot,
    // updataTokenPot,
}