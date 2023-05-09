import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router' // 引入vue-router
import { createPinia } from 'pinia' //引入pinia

const app = createApp(App)
app.use(router)
app.use(createPinia())
app.mount('#app')