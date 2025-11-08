// commentApi.ts
// 导入 http.ts 中封装的请求方法和类型（按需导入）
import { get, post, type RequestConfig } from '@/utils/http'

// 定义评论和回复的基础类型（保持不变）
export interface Reply {
  id: string | number
  author: string
  avatarColor: string
  content: string
  timestamp: number
}

export interface Comment {
  id: string | number
  author: string
  avatarColor: string
  content: string
  timestamp: number
  likes: number
  liked: boolean
  replies: Reply[]
}

// 提交操作的类型定义（保持不变）
type ActionType = 'comment' | 'reply' | 'like'

type SubmitData =
  | Omit<Comment, 'id'> // 发布评论
  | { commentId: string | number; reply: Omit<Reply, 'id'> } // 回复评论
  | { commentId: string | number; liked: boolean } // 点赞操作

// 函数重载定义（保持不变，确保类型提示正确）
export function submitCommentAction(
  action: 'comment',
  data: Omit<Comment, 'id'>,
  config?: RequestConfig,
): Promise<Comment>
export function submitCommentAction(
  action: 'reply',
  data: { commentId: string | number; reply: Omit<Reply, 'id'> },
  config?: RequestConfig,
): Promise<Reply>
export function submitCommentAction(
  action: 'like',
  data: { commentId: string | number; liked: boolean },
  config?: RequestConfig,
): Promise<Comment>

// 实现函数：改用 http.ts 的 post 方法（替换原自定义 Axios 实例）
export async function submitCommentAction(
  action: ActionType,
  data: SubmitData,
  config?: RequestConfig, // 支持传入 http.ts 定义的自定义配置（如 loading/错误提示）
): Promise<Comment | Reply> {
  // 调用 http.ts 的 post 方法，自动继承基础配置（baseURL、请求拦截器等）
  return post<Comment | Reply>('/submit', { action, data }, config)
}

// 获取评论列表：改用 http.ts 的 get 方法（替换原自定义 Axios 实例）
export const fetchComments = async (
  searchQuery = '',
  config?: RequestConfig, // 支持传入自定义配置
): Promise<Comment[]> => {
  const params = searchQuery ? { query: searchQuery } : {}
  // 调用 http.ts 的 get 方法，参数格式与原逻辑一致
  return get<Comment[]>('/comments', params, config)
}

export default {
  fetchComments,
  submitCommentAction,
}
