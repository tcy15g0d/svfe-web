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

const routes = [
  {
    "path": "/",
    "name": "/",
    "component": () => import("@/pages/index.vue")
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
    "path": "/Login",
    "name": "/Login",
    "component": () => import("@/pages/Login.vue")
  },
  {
    "path": "/LoginView",
    "name": "/LoginView",
    "component": () => import("@/pages/LoginView.vue")
  },
  {
    "path": "/NovelsList",
    "name": "/NovelsList",
    "component": () => import("@/pages/NovelsList.vue")
  },
  {
    path: '/NovelsList/:novel',
    name: '/NovelDetails',
    component: NovelDetails,
    props: true,
  },
  {
    path: '/NovelsList/:novel/:chapter',
    name: '/ChapterDetails',
    component: ChapterDetails,
    props: true,
  },

]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: setupLayouts(routes),
})
console.log(routes)
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

export default router
