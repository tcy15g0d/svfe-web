/**
 * router/index.ts
 *
 * Automatic routes for `./src/pages/*.vue`
 */

// Composables
import { createRouter, createWebHistory } from 'vue-router/auto'
import { setupLayouts } from 'virtual:generated-layouts'
// import { routes } from 'vue-router/auto-routes'
import NovelsList from '../pages/NovelsList.vue';
import NovelDetails from '../pages/NovelDetails.vue';
import ChapterDetails from '../pages/ChapterDetails.vue';

import { onAuthStateChanged } from "firebase/auth";
import Firebase from "../firebase_settings/index.js"
const auth = Firebase.auth

const routes = [
  {
    path: "/",
    name: "/",
    component: () => import("@/pages/index.vue"),
    meta: { requiresAuth: true }, // 需要登入
  },
  {
    "path": "/HomeView",
    "name": "/HomeView",
    "component": () => import("@/pages/HomeView.vue")
  },
  {
    "path": "/InboxTemp",
    "name": "/InboxTemp",
    "component": () => import("@/pages/InboxTemp.vue")
  },
  {
    path: "/Login",
    name: "/Login",
    component: () => import("@/pages/Login.vue"),
    meta: { layout: "loginLayout" }, // 使用 DefaultLayout
  },
  {
    "path": "/LoginView",
    "name": "/LoginView",
    "component": () => import("@/pages/LoginView.vue")
  },
  {
    path: "/NovelsList",
    name: "/NovelsList",
    component: () => import("@/pages/NovelsList.vue"),
    meta: { requiresAuth: true }, // 需要登入
  },
  {
    path: '/NovelsList/:novel',
    name: '/NovelDetails',
    component: NovelDetails,
    props: true,
    meta: { requiresAuth: true }, // 需要登入
  },
  {
    path: '/NovelsList/:novel/:chapter',
    name: '/ChapterDetails',
    component: ChapterDetails,
    props: true,
    meta: { requiresAuth: true }, // 需要登入
  },

]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: setupLayouts(routes),
})
// console.log(routes)
// Workaround for https://github.com/vitejs/vite/issues/11804
router.onError((err, to) => {
  if (err?.message?.includes?.('Failed to fetch dynamically imported module')) {
    if (!localStorage.getItem('vuetify:dynamic-reload')) {
      console.log('Reloading page to fix dynamic import error')
      localStorage.setItem('vuetify:dynamic-reload', 'true')
      location.assign(to.fullPath)
    } else {
      console.error('Dynamic import error, reloading page did not fix it', err)
    }
  } else {
    console.error(err)
  }
})

router.isReady().then(() => {
  localStorage.removeItem('vuetify:dynamic-reload')
})

// 路由守衛
router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  const user = JSON.parse(localStorage.getItem("user"));//全局獲取使用者
    if (requiresAuth && !user) {
      // 未登入，導向登入頁面
      next("/Login");
    } else {
      // 已登入或不需要驗證
      next();
    }
});

export default router
