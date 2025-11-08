import axios from 'axios'
import type { AxiosInstance, InternalAxiosRequestConfig, AxiosResponse, AxiosError } from 'axios'
// -------------------------- 类型定义 --------------------------
// 1. 修改：定义ApiResponse接口，泛型T表示data字段的类型

// 定义API响应的基础格式（不变）
export interface ApiResponse<T = any> {
  code: number // 状态码：200成功，其他为错误
  message: string // 提示信息
  data: T // 响应数据
  success: boolean // 是否成功标识
}
// 2. 修改：让 RequestConfig 继承 InternalAxiosRequestConfig
export interface RequestConfig extends InternalAxiosRequestConfig {
  showLoading?: boolean // 是否显示加载中动画（自定义属性不变）
  showErrorToast?: boolean // 是否显示错误提示（自定义属性不变）
}

// 创建Axios实例（不变，已设置默认headers，避免undefined）
const service: AxiosInstance = axios.create({
  baseURL: '/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json;charset=utf-8', // 默认headers，确保存在
  },
})

// -------------------------- 请求拦截器 --------------------------
// 此时 config: RequestConfig 与拦截器要求的类型完全兼容
service.interceptors.request.use(
  (config: RequestConfig) => {
    // 1. 处理加载中状态（不变）
    if (config.showLoading !== false) {
      // 示例：LoadingService.show({ text: '加载中...' });
    }

    // 2. 添加Token（不变，且 config.headers 必存在，可省略 && config.headers 判断）
    const token = localStorage.getItem('token') || sessionStorage.getItem('token')
    if (token) {
      // 这里可去掉 && config.headers，因为 InternalAxiosRequestConfig 确保 headers 存在
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },
  (error: AxiosError) => {
    console.error('请求发送失败:', error.message)
    return Promise.reject(error)
  },
)
// -------------------------- 响应拦截器 --------------------------
service.interceptors.response.use(
  (response: AxiosResponse<ApiResponse>) => {
    const config = response.config as RequestConfig
    const res = response.data

    // 1. 关闭加载中状态
    if (config.showLoading !== false) {
      // 示例：LoadingService.close();
    }

    // 2. 处理业务错误（非200状态码）
    if (res.code !== 200) {
      // 错误提示（可结合UI组件库的消息提示，如ElMessage）
      if (config.showErrorToast !== false) {
        // 示例：ElMessage.error(res.message || '请求失败，请稍后重试');
      }

      // 特殊错误码处理（如Token过期、无权限等）
      switch (res.code) {
        case 400:
          console.error('请求参数错误')
          break
        case 401: // Token过期
          localStorage.removeItem('token')
          sessionStorage.removeItem('token')
          // window.location.href = "/login"; // 跳转到登录页
          break
        case 403: // 无权限
          window.location.href = '/403' // 跳转到无权限页面
          break
        case 404:
          console.error('请求参数错误')
          window.location.href = '/:pathMatch(.*)*'
          break
      }

      return Promise.reject(new Error(res.message || '请求失败'))
    }

    // 3. 成功响应：直接返回data字段（简化业务层调用）
    return res.data
  },
  (error: AxiosError<ApiResponse>) => {
    const config = error.config as RequestConfig
    const errorRes = error.response?.data

    // 1. 关闭加载中状态
    if (config?.showLoading !== false) {
      // 示例：LoadingService.close();
    }

    // 2. 处理网络错误/超时错误
    let errorMsg = ''
    if (!error.response) {
      errorMsg = error.message === 'timeout' ? '请求超时，请检查网络' : '网络错误，请稍后重试'
    } else {
      // 后端返回的错误信息
      errorMsg = errorRes?.message || `请求失败（${error.response.status}）`
    }

    // 3. 显示错误提示
    if (config?.showErrorToast !== false) {
      // 示例：ElMessage.error(errorMsg);
    }

    console.error('响应错误详情:', error)
    return Promise.reject(new Error(errorMsg))
  },
)

// -------------------------- 封装请求方法 --------------------------
/**
 * GET 请求
 * @param url 请求地址
 * @param params URL参数
 * @param config 额外配置
 */
export const get = <T = any>(
  url: string,
  params?: Record<string, any>,
  config?: RequestConfig,
): Promise<T> => {
  return service.get(url, { params, ...config })
}

/**
 * POST 请求（JSON格式）
 * @param url 请求地址
 * @param data 请求体
 * @param config 额外配置
 */
export const post = <T = any>(
  url: string,
  data?: Record<string, any>,
  config?: RequestConfig,
): Promise<T> => {
  return service.post(url, data, config)
}

/**
 * PUT 请求（JSON格式）
 * @param url 请求地址
 * @param data 请求体
 * @param config 额外配置
 */
export const put = <T = any>(
  url: string,
  data?: Record<string, any>,
  config?: RequestConfig,
): Promise<T> => {
  return service.put(url, data, config)
}

/**
 * DELETE 请求
 * @param url 请求地址
 * @param params URL参数
 * @param config 额外配置
 */
export const del = <T = any>(
  url: string,
  params?: Record<string, any>,
  config?: RequestConfig,
): Promise<T> => {
  return service.delete(url, { params, ...config })
}

// 导出Axios实例（供特殊场景使用，如自定义拦截器）
export default service
