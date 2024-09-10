import { createRouter, createWebHistory } from 'vue-router'
 import HomeView from '../views/HomeView.vue'
 import PrivacyView from '@/views/PrivacyView.vue'
 import AboutView from '@/views/AboutView.vue'
 import ArticleView from '@/views/ArticleView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: '首页',
      component: HomeView
    },
    {
      path: '/article',
      name: '文章',
      component: ArticleView
    },
    {
      path: '/about',
      name: '关于',
      component: AboutView
    },
    {
      path: '/privacy',
      name: '隐私政策',
      component: PrivacyView
    },
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue')
    // }
  ]
})

export default router
