import HomeView from "../HomeView.vue"; // 首页
import AboutView from "./essay/AboutView.vue"; // 文章
import club from "./club/club.vue"; // 俱乐部
import Comment from "./Comment-section/Comment-section.vue"; // 评论区
import concerning from "./concerning/concerning.vue"; // 关于
import NotFound from "./404/404.vue"; // 404

// 修正：返回各页面组件的映射
export function rotes() {
  return {
    HomeVie: HomeView, // 直接返回组件，而非 { component: ... }
    AboutVie: AboutView,
    clu: club,
    Common: Comment,
    concern: concerning,
    NotFaun: NotFound,
  };
}
