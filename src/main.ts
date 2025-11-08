import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
// 导入组件
import MyComponent from './components'
// import { registerMicroApps } from 'qiankun'

// registerMicroApps([
//   {
//     name: 'AI-help',
//     entry: 'http://localhost:5174',
//     container: '#AI-help',
//     activeRule: '/AI-help',
//   },
// ])
const app = createApp(App)
// 全局注册所有组件
Object.entries(MyComponent).forEach(([name, component]) => {
  app.component(name, component)
})

app.use(router).use(createPinia()).mount('#app')
//git init; git add -A ; git commit -m "initial commit"
