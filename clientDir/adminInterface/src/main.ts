import './assets/main.css'

import { createApp, VueElement } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import router from './router'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import { createPinia } from 'pinia' 
import axios from 'axios'

const app = createApp(App)
const pinia=createPinia()

app.use(ElementPlus)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

app.use(axios)
app.use(pinia)
app.use(router)


app.mount('#app')
