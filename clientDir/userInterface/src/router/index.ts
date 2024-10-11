import { createRouter, createWebHistory } from 'vue-router'
 import HomeView from '../views/HomeView.vue'
 import PrivacyView from '@/views/PrivacyView.vue'
 import AboutView from '@/views/AboutView.vue'
 import ArticleView from '@/views/ArticleView.vue'

 import ArticleParticulars from '@/components/ArticleParticulars.vue'

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
      path:'/articleParticulars',
      name:"文章详情",
      component:ArticleParticulars
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
  ]
})

export default router
