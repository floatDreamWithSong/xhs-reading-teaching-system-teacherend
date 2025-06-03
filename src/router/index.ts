import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHashHistory } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/HomePage.vue'),
  },
  {
    path: '/bank',
    name: 'Bank',
    component: () => import('../views/BankPage.vue'),
  },
  {
    path: '/homework',
    name: 'Homework',
    component: () => import('../views/HomeworkPage.vue'),
  },
  {
    path: '/class',
    name: 'Class',
    component: () => import('../views/ClassPage.vue'),
    children: [

      {
        path: '',
        name: 'HomeContent',
        component: () => import('../views/ClassContent.vue'),
      },
      {
        path: 'create-class',
        name: 'CreateClass',
        component: () => import('../views/CreateClassPage.vue'),
      },
    ],
  },
  {
    path: '/data',
    name: 'Data',
    component: () => import('../views/DataPage.vue'),
  },
  {
    path: '/settings',
    name: 'Settings',
    component: () => import('../views/SettingsPage.vue'),
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
