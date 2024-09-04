import Koa from 'koa'
import Router from 'koa-router'
import koaBody from 'koa-body'

const app=new Koa()
const router=new Router({
    prefix:'/user'
})

app.use(koaBody({
    json: true,
}))//这里有顺序要求，必须在前面

router.get('/',async(ctx)=>{
    ctx.body="user home"
})
router.post('/add',async(ctx)=>{
    const bdy=ctx.request.body
    console.log(bdy)
    ctx.body="user add"
})

app.use(router.routes())

app.listen(3000)