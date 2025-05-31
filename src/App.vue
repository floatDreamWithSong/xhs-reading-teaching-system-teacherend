<script setup lang="ts">
import { RouterView } from 'vue-router'
import SideBar from '@/components/SideBar.vue'
import TopBar from '@/components/TopBar.vue'
</script>

<template>
  <div class="app-container">
    <div class="top-bar-container">
      <TopBar />
    </div>
    <div class="main-container">
      <div class="side-bar-container">
        <SideBar />
      </div>
      <div class="content-container">
        <div class="content-safe-area-wrapper">
          <RouterView />
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.app-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
}
.top-bar-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80px;
  flex-shrink: 0;
}

.main-container {
  display: flex;
  flex: 1;
  overflow: hidden;
}

.side-bar-container {
  display: flex;
  flex-direction: column;
  width: 200px;
  flex-shrink: 0;
}

.content-container {
  flex: 1;
  overflow-y: auto;
  height: 100%;
  scrollbar-width: none;
  min-width: var(--content-min-width);
  position: relative;
}

.content-safe-area-wrapper {
  padding: 35px 50px 35px 50px;
  min-height: 100%;
  box-sizing: border-box;
}
</style>
