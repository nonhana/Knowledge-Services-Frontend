import { createApp } from 'vue'
import App from './App.vue'
import router from './router' // 引入vue-router
import { createPinia } from 'pinia' //引入pinia
import ElementPlus from 'element-plus' // 引入element-plus
import 'element-plus/dist/index.css'
import 'uno.css' // 引入unocss

const app = createApp(App)
app.use(router)
app.use(createPinia())
app.use(ElementPlus)
app.mount('#app')