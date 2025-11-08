import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
const appName = 'AI-help'
let app: ReturnType<typeof createApp> | null = null

// 独立运行时（非qiankun环境）直接挂载
if (!(window as any).__POWERED_BY_QIANKUN__) {
  createApp(App).use(router).mount('#app')
}

/**
 * qiankun 生命周期：初始化（只执行一次）
 */
export async function bootstrap() {
  console.log(`${appName} bootstraped`)
}

/**
 * qiankun 生命周期：挂载（每次进入子应用路由执行）
 */
export async function mount(props: any) {
  // 用 qiankun 提供的容器挂载（父应用的 #AI-help）
  app = createApp(App)
  app.use(router)
  app.mount(props.container.querySelector('#app') || '#app')
}

/**
 * qiankun 生命周期：卸载（每次离开子应用路由执行）
 */
export async function unmount() {
  if (app) {
    app.unmount()
    app = null
  }
}

// 可选：支持热更新（开发环境）
if (import.meta.hot) {
  import.meta.hot.accept()
}
