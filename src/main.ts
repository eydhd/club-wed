import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import { registerMicroApps, start } from 'qiankun'
// 导入 FontAwesome 相关（之前的图标组件问题）
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faTriangleExclamation, faAngleLeft } from '@fortawesome/free-solid-svg-icons'
import MyComponent from '@/components/index'
// 注册 FontAwesome 图标
library.add(faTriangleExclamation, faAngleLeft)

// 注册微应用（关键配置：处理 ESM 脚本）
registerMicroApps(
  [
    {
      name: 'AI-help', // 必须和子应用 appName 一致
      entry: 'http://localhost:5174', // 子应用 index.html 地址（不是 js 入口）
      container: '#AI-help', // 父应用挂载容器（必须存在）
      activeRule: '/AI-help', // 子应用激活路由
    },
  ],
  {
    // 加载子应用脚本时，强制添加 type="module"（核心修复）
    getEmbedAppScript: (scriptSrc: string) => {
      // 排除非 JS 脚本（如样式、图片）
      if (
        scriptSrc.endsWith('.js') ||
        scriptSrc.includes('virtual:') ||
        scriptSrc.includes('@vite/')
      ) {
        return `<script type="module" src="${scriptSrc}"></script>`
      }
      return `<script src="${scriptSrc}"></script>`
    },
    // 可选：加载失败回调
    onError: (err: Error) => {
      console.error('子应用加载失败：', err)
    },
  },
)
// 创建主应用
const app = createApp(App)
// 全局注册 FontAwesome 组件
app.component('font-awesome-icon', FontAwesomeIcon)
// 挂载路由和 Pinia
app.use(router).use(createPinia()).mount('#app')

// 启动 qiankun（确保主应用挂载后启动）
setTimeout(() => {
  start({
    sandbox: {
      strictStyleIsolation: true, // 开启样式隔离（避免子应用样式污染主应用）
    },
  })
}, 0)
Object.entries(MyComponent).forEach(([name, component]) => {
  app.component(name, component)
})
