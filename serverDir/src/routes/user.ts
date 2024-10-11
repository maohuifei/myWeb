import Router from 'koa-router'

import { userAdd,userDel,userPut,userGet,loginPot} from '../controllers/user';

const router = new Router({
    prefix: '/user'
})

//增
router.post('/add', async (ctx) => {
    await userAdd(ctx)
})
//删
router.delete('/delete/:id', async (ctx) => {
    await userDel(ctx)
});

//改
router.put('/put', async (ctx) => {
    await userPut(ctx)
});
//查
router.get('/list', async (ctx) => {
    await userGet(ctx)
})

//登录
router.post('/login', async (ctx) => {
    await loginPot(ctx)
})

// //注册
// router.post('/register', async (ctx) => {
//     await registerPot(ctx)
// })

// //更新token
// router.post('/updataToken', async (ctx) => {
//     await updataTokenPot(ctx)
// })

export default router