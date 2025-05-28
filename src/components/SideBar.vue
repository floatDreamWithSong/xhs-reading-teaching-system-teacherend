<script setup lang="ts">
import { useRoute } from 'vue-router'
import { Data, Exit, Folder, Home, Homework, People, Setting } from './icons'

const route = useRoute()

// 侧边栏菜单项配置
const menuItems = [
  { name: 'Home', path: '/', icon: Home, label: '首页' },
  { name: 'Bank', path: '/bank', icon: Folder, label: '题库管理' },
  { name: 'Homework', path: '/homework', icon: Homework, label: '作业管理' },
  { name: 'Class', path: '/class', icon: People, label: '班级管理' },
  { name: 'Data', path: '/data', icon: Data, label: '数据分析' },
  { name: 'Settings', path: '/settings', icon: Setting, label: '系统设置' },
]

// 判断是否为当前路由
function isActive(path: string) {
  return route.path === path
}

// 处理退出登录
function handleLogout() {
  // 这里可以添加退出登录的逻辑
  console.log('退出登录')
}
</script>

<template>
  <div class="sidebar-container">
    <div class="sidebar-list-container">
      <router-link
        v-for="item in menuItems" :key="item.name" :to="item.path" class="sidebar-list-item"
        :class="{ 'selected-item': isActive(item.path) }"
      >
        <component :is="item.icon" />
        <span>{{ item.label }}</span>
      </router-link>
    </div>
    <div class="sidebar-bottom-container">
      <button @click="handleLogout">
        <Exit />
        <span>
          退出登录
        </span>
      </button>
    </div>
  </div>
</template>

<style scoped>
.sidebar-container {
  width: 100%;
  height: 100%;
  background: linear-gradient(to top, #8fa2ff4d, #f3f5fa4d);
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .sidebar-list-container {
    width: 100%;

    .sidebar-list-item {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 5px;
      span {
        width: 4rem;
      }
      text-decoration: none;
      height: 57px;
      transition: all 0.3s ease;
      border: none;
      cursor: pointer;
      gap: 10px;
    }

    .selected-item {
      svg {
        stroke: white;
      }

      background: linear-gradient(112.53deg, #8fa2ff -7.6%, var(--primary-color) 136%);
      color: white;
    }

    .sidebar-list-item:not(.selected-item) {
      svg {
        stroke: var(--primary-color);
      }

      background: none;
      color: var(--text-color);
    }

    .sidebar-list-item:not(.selected-item):hover {
      background: rgba(143, 162, 255, 0.1);
    }
  }
}

.sidebar-bottom-container {
  margin: auto;
  margin-bottom: 50px;

  button {
    display: flex;
    align-items: center;
    gap: 5px;
    width: 147px;
    height: 41px;
    border-radius: 10px;
    background: var(--primary-color-100);
    border: none;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  button:hover {
    background: var(--primary-color);
    color: white;
  }

  button:hover svg {
    stroke: white;
  }
}
</style>
