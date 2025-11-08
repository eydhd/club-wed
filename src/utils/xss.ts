// xss-util.ts
import xss from "xss";
import type { IFilterXSSOptions } from "xss";

/**
 * XSS防护工具函数（基于xss库实现）
 * 替代原sanitizeInput，专注于输入内容的HTML特殊字符转义
 */
export function sanitizeInput(input: string): string {
  if (!input) return "";

  // 仅转义HTML特殊字符，不额外过滤标签（适用于纯文本输入场景）
  const options: IFilterXSSOptions = {
    // 禁用所有标签保留，只做字符转义
    whiteList: {},
    // 转义所有HTML实体
    escapeHtml: (html) => html,
  };

  return xss(input, options);
}

/**
 * 清理HTML内容（基于xss库实现）
 * 替代原sanitizeHTML，移除危险标签和属性，保留安全标签
 */
export function sanitizeHTML(html: string): string {
  if (!html) return "";

  // 自定义安全标签白名单（可根据业务需求扩展）
  const safeTags: IFilterXSSOptions["whiteList"] = {
    // 允许常见文本标签
    p: [],
    div: [],
    span: [],
    br: [],
    // 允许图片标签及安全属性
    img: ["src", "alt", "title", "width", "height"],
    // 允许链接标签及安全属性
    a: ["href", "title", "target"],
    // 允许标题标签
    h1: [],
    h2: [],
    h3: [],
    h4: [],
    h5: [],
    h6: [],
    // 允许列表标签
    ul: [],
    ol: [],
    li: [],
  };

  const options: IFilterXSSOptions = {
    whiteList: safeTags,
    // 移除不在白名单中的标签（而非转义）
    stripIgnoreTag: true,
    onTagAttr: (tag, name, value) => {
      if (tag === "a" && name === "href" && value.startsWith("javascript:")) {
        return; // 改为返回void而非null
      }
      // 使用xss库提供的escape方法转义属性值
      return `${name}="${xss(value, {
        whiteList: {},
        escapeHtml: (html) => html,
      })}"`;
    },
  };

  return xss(html, options);
}
