import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import pinia from "@/stores/index";
import DataVVue3 from "@kjgl77/datav-vue3";
// 引入全局css
import './assets/scss/style.scss';
// 引入图表（所有图标见 icon 目录下的 demo_index.html）
import './assets/icon/iconfont.css'
// 引入 全局注册组件
import PublicComponent from '@/components/componentInstall';
import ElementPlus from 'element-plus'
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import 'element-plus/dist/index.css'
import "./assets/scss/element/index.scss";

const app = createApp(App)
app.use(PublicComponent)
app.use(ElementPlus)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
// app.use(dataV)
app.use(DataVVue3);
app.use(pinia)
app.use(router)
app.mount('#app')
