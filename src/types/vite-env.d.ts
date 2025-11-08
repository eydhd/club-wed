// src/env.d.ts
interface ImportMetaEnv {
  // 自定义的环境变量（根据你的.env文件定义）
  //   readonly VITE_API_BASE_URL: string
}

// 扩展ImportMeta接口，让TS识别import.meta.env
interface ImportMeta {
  readonly env: ImportMetaEnv
}
