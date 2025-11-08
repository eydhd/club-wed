/// <reference types="./auto-import.d.ts" />
/// <reference types="./shims-vue.d.ts" />
/// <reference types="./vite-env.d.ts" />
/// <reference types="./crypto-js.d.ts" />
/* eslint-disable */
/* prettier-ignore */
// @ts-nocheck
// noinspection JSUnusedGlobalSymbols
// biome-ignore lint: disable
export {}
declare global {
  const createRouter: typeof import('vue-router').createRouter
  const createWebHistory: typeof import('vue-router').createWebHistory
}
// 用 as 断言为 any 绕过检查（不推荐长期使用，会丢失类型校验）
const lifeCycles: FrameworkLifeCycles<ObjectType> = {
  // FrameworkLifeCycles 原有属性...
  getEmbedAppScript() {
    return 'script content'
  },
} as any
