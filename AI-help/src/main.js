import { createApp } from 'vue'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(router)
function mountApp() {
  app.mount('#app')
}
if (!window.__POWERED_BY_QIANKUN__) {
  mountApp()
}

export async function bootstrap() {
  console.log('AI-help bootstraped')
}

export function mount() {
  mountApp()
}

export async function unmount() {
  app.unmount()
}
