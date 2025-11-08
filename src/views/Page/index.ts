import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../HomeView.vue'
import AboutView from './essay/AboutView.vue' // 文章页
import ClubView from './club/club.vue' // 俱乐部页
import CommentView from './Comment-section/Comment-section.vue' // 评论区
import ConcerningView from './concerning/concerning.vue' // 关于页
import NotFoundView from './404/404.vue' // 404页
import AIHelp from './AI-help/AI-help.vue'

const pagerouter = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: HomeView },
    { path: '/about', name: 'about', component: AboutView },
    { path: '/club', name: 'club', component: ClubView },
    { path: '/Comment', name: 'comment', component: CommentView },
    { path: '/concerning', name: 'concerning', component: ConcerningView },
    { path: '/AI-help', name: 'concerning', component: AIHelp },
    { path: '/:pathMatch(.*)*', name: 'not-found', component: NotFoundView }, // 404路由
  ],
})

export default pagerouter
