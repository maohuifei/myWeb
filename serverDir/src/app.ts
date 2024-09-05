import Koa from 'koa'
import koaBody from 'koa-body'
import jsonError from 'koa-json-error'

import userRouter from "./controllers/user"

const app=new Koa()

app.use(koaBody({
    json: true,
}))
app.use(jsonError())

app.use(userRouter.routes())

app.listen(3000,()=>{
    console.log("服务运行中……，本地预览：http://localhost:3000")
})