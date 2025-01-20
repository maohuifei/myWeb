import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: '首页',
      component: () => import('@/views/HomeView.vue')
    },
    {
      path: '/article',
      name: '文章',
      component: () => import('@/views/ArticleView.vue')
    },
    {
      path:'/articleParticulars',
      name:"文章详情",
      component:() => import('@/components/ArticleParticulars.vue')
    },
    {
      path: '/about',
      name: '关于',
      component: () => import('@/views/AboutView.vue')
    },
    {
      path: '/privacy',
      name: '隐私政策',
      component: () => import('@/views/PrivacyView.vue')
    },{
      path:'/maintenance',
      name:'维护中',
      component:() => import('@/components/Maintenance.vue')
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    // 始终滚动到顶部
    return { top: 0 }
  }
})

export default router
