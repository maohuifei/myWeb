import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import axios from 'axios'

import App from './App.vue'
import router from './router'

import './assets/icon/iconfont.js'

const app = createApp(App)

app.use(axios)
app.use(createPinia())
app.use(router)


app.mount('#app')
