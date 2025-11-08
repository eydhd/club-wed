// search-service.ts
import { sanitizeInput, sanitizeHTML } from "./xss";

// 模拟搜索建议数据
const mockSuggestions = [
  "JavaScript 教程",
  "TypeScript 入门",
  "Vue 3 组件开发",
  "React Hooks 指南",
  "CSS 动画效果",
  "SCSS 高级用法",
  "前端性能优化",
  "响应式设计原则",
  "Node.js 基础",
  "RESTful API 设计",
];

export class SearchService {
  /**
   * 获取搜索建议
   * @param query 搜索关键词
   * @returns 过滤后的建议列表
   */
  async getSuggestions(query: string): Promise<string[]> {
    // 先进行XSS过滤
    const safeQuery = sanitizeInput(query);

    if (!safeQuery.trim()) {
      return [];
    }

    // 模拟API请求延迟
    await new Promise((resolve) => setTimeout(resolve, 150));

    // 过滤并返回匹配的建议，同时进行XSS过滤
    return mockSuggestions
      .filter((item) => item.toLowerCase().includes(safeQuery.toLowerCase()))
      .map((item) => sanitizeHTML(item));
  }

  /**
   * 执行搜索
   * @param query 搜索关键词
   * @returns 搜索结果
   */
  async performSearch(query: string): Promise<{
    success: boolean;
    results?: Array<{ id: number; title: string }>;
    message?: string;
  }> {
    // 进行XSS过滤
    const safeQuery = sanitizeInput(query);

    if (!safeQuery.trim()) {
      return { success: false, message: "搜索内容不能为空" };
    }

    // 模拟API请求
    await new Promise((resolve) => setTimeout(resolve, 300));

    // 返回模拟搜索结果
    return {
      success: true,
      results: [
        { id: 1, title: `关于 "${safeQuery}" 的搜索结果 1` },
        { id: 2, title: `关于 "${safeQuery}" 的搜索结果 2` },
        { id: 3, title: `关于 "${safeQuery}" 的搜索结果 3` },
      ],
    };
  }
}
