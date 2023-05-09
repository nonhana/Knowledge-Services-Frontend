import { createRouter, createWebHashHistory } from "vue-router"

const routes = [
  {
    path: '/home',
    name: 'home',
    component: () => import('../pages/home/index.vue')
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('../pages/home/index.vue')
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('../pages/home/index.vue')
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('../pages/home/index.vue')
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('../pages/home/index.vue')
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('../pages/home/index.vue')
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('../pages/home/index.vue')
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('../pages/home/index.vue')
  }
]
export const router = createRouter({
  history: createWebHashHistory(),
  routes: routes
})

export default router
