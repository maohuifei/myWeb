// 导入Vue核心功能
import { createApp } from 'vue'
import { createPinia } from 'pinia' 

// 导入根组件
import App from './App.vue'

// 导入路由
import router from './router'

// 导入Element Plus相关
import ElementPlus from 'element-plus'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import 'element-plus/dist/index.css'

// 导入全局样式
import './assets/main.css'
import './assets/theme.css'

// 导入HTTP客户端
import axios from 'axios'

// 创建Vue应用实例
const app = createApp(App)
const pinia = createPinia()

// 注册Element Plus
app.use(ElementPlus)

// 注册Element Plus图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

// 配置全局属性
app.config.globalProperties.$axios = axios

// 注册插件
app.use(pinia)
app.use(router)

// 挂载应用
app.mount('#app')
