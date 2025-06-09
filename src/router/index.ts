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
    children: [
      {
        path: '',
        name: 'manage',
        component: () => import('../views/bank/ManagePage.vue'),
        children: [{
          path: '',
          name: 'inclass',
          component: () => import('../views/bank/manage/InClass.vue')
        }, {
          path: 'outofclass',
          name: 'outofclass',
          component: () => import('../views/bank/manage/OutClass.vue')
        }]
      }, {
        // 新建题组
        path: 'create',
        name: 'create',
        component: () => import('../views/bank/CreatePage.vue'),
        children: [{
          // 阅读题目
          path: '',
          name: 'reading',
          component: () => import('../views/bank/create/ReadingPage.vue')
        }, {
          // 预习题目
          path: 'preview',
          name: 'preview',
          component: () => import('../views/bank/create/PreviewPage.vue')
        }]
      }
    ]
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