import Router from 'koa-router'
import { addSystem, delSystem, getSystem,getTypeListSystem } from '../controllers/system'

const router = new Router({
    prefix: '/configuration'
})

router.get('/list', async (ctx) => {
    await getSystem(ctx)
})
router.get('/typeList', async (ctx) => {
    await getTypeListSystem(ctx)
})
router.post('/add', async (ctx) => {
    await addSystem(ctx)
})
router.delete('/delete/:id', async (ctx) => {
    await delSystem(ctx)
})

export default router