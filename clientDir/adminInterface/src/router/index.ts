
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  routes: [
    {
      path:'/',//设置初始界面
      redirect:'/home'
    },
    {
      path:'/login',
      name:'login',
      component: ()=>import('../views/Login.vue')
    },
    {
      path: '/home',
      name: 'home',
      component: ()=>import('../views/Home.vue')
    },
  ],
  history: createWebHistory(import.meta.env.BASE_URL)
})

export default router
