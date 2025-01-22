// 导入全局样式
import './assets/main.css'

// 导入Vue核心功能
import { createApp } from 'vue'
import { createPinia } from 'pinia'

// 导入根组件
import App from './App.vue'

// 导入路由
import router from './router'

// 导入HTTP客户端
import axios from 'axios'

// 导入图标
import './assets/icon/iconfont.js'

// 创建Vue应用实例
const app = createApp(App)

// 配置全局属性
app.config.globalProperties.$axios = axios

// 注册插件
app.use(createPinia())
app.use(router)

// 挂载应用
app.mount('#app')
