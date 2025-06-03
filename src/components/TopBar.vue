<script setup lang="ts">
import { Avatar, Down, Xhs } from './icons'
</script>

<template>
  <div class="topbar-container">
    <div class="topbar-safe-area-container">
      <div class="topbar-left-container">
        <Xhs />
        <span>小花狮阅读教学系统</span>
      </div>
      <div class="topbar-right-container">
        <button class="topbar-language-button">
          <span class="topbar-language-button-text">
            中文简体
          </span>
        </button>
        <div class="topbar-right-container-item">
          <Avatar />
          <span>用户名</span>
          <div class="dropdown-wrapper">
            <button class="option" aria-haspopup="true" aria-expanded="false">
              <Down style="stroke: white;" />
            </button>
            <div class="dropdown-menu" role="menu">
              <a href="#" role="menuitem">个人中心</a>
              <a href="#" role="menuitem">设置</a>
              <a href="#" role="menuitem">退出登录</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.topbar-container {
  width: 100%;
  height: 100%;
  background: linear-gradient(90.2deg, #8fa2ff -25.12%, var(--primary-color) 104.2%);
}

.topbar-safe-area-container {
  --safe-x-width: 42px;
  width: 100%;
  padding: 0 var(--safe-x-width);
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
}

.topbar-left-container {
  display: flex;
  align-items: center;
  gap: 10px;
}

.topbar-left-container span {
  font-family: 'Source Han Sans CN';
  font-style: normal;
  font-weight: 700;
  letter-spacing: 0.05em;
  font-size: 19px;
  color: white;
}

.topbar-right-container {
  display: flex;
  align-items: center;
  gap: 50px;
}

.topbar-language-button {
  background: white;
  border: none;
  padding: 6px 1.5rem;
  border-radius: 100px;
  box-shadow:
    0px 2px 3px rgba(0, 0, 0, 0.05),
    inset 0px 4px 4px rgba(255, 255, 255, 0.5);
  cursor: pointer;
  font-size: 14px;

  .topbar-language-button-text {
    font-weight: 500;
    background: linear-gradient(360deg, #2447f9 18.27%, #7289fe 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
}

.topbar-right-container-item {
  display: flex;
  align-items: center;
  gap: 10px;
  position: relative;
  /* 关键：提供绝对定位上下文 */
  color: white;
}

.topbar-right-container-item span {
  font-size: 15px;
  height: 100%;
}

.option {
  background: none;
  padding: 2px;
  border-radius: 4px;
  cursor: pointer;
  align-self: stretch;
  display: flex;
  align-items: center;
  border: none;
}

/* 下拉菜单相关 */

.dropdown-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.dropdown-menu {
  display: none;
  position: absolute;
  top: 100%;
  right: 0;
  background-color: white;
  color: #333;
  border-radius: 6px;
  padding: 8px 0;
  min-width: 140px;
  z-index: 100;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border: 1px solid #e0e0e0;
  user-select: none;
}

.dropdown-menu a {
  display: block;
  padding: 8px 16px;
  text-decoration: none;
  color: #333;
  font-size: 14px;
}

.dropdown-menu a:hover {
  background-color: #f2f6ff;
  color: var(--primary-color);
  transition: background-color 0.2s ease;
}

/* 悬停显示下拉菜单 */

.dropdown-wrapper:hover .dropdown-menu {
  display: block;
}
</style>
