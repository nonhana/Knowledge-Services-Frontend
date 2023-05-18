import { createApp } from "vue";
import App from "./App.vue";
import router from "./router"; // 引入vue-router
import { createPinia } from "pinia"; //引入pinia
import ElementPlus from "element-plus"; // 引入element-plus
import "element-plus/dist/index.css";
import "uno.css"; // 引入unocss
import mainHeader from "./little/mainHeader.vue"; // 注册全局组件mainHeader

const app = createApp(App);
app.use(router);
app.use(createPinia());
app.use(ElementPlus);
app.component("MainHeader", mainHeader);
app.mount("#app");
