import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'
import qiankun from 'vite-plugin-qiankun'
// 子应用名称（必须和主应用 registerMicroApps 中的 name 一致）
const appName = 'AI-help'

export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    vueDevTools(),
    // 启用 qiankun 插件
    qiankun(appName, {
      useDevMode: true, // 开发环境启用（关键：让插件处理 ESM 格式）
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    port: 5174, // 固定子应用端口（和主应用配置一致）
    cors: true, // 允许跨域（主应用从不同端口访问）
    origin: 'http://localhost:5174', // 显式指定 origin（避免资源路径错误）
  },
  base:
    process.env.NODE_ENV === 'production'
      ? `/${appName}/` // 生产环境基座路径（需和主应用部署路径匹配）
      : '/', // 开发环境直接用根路径
})
