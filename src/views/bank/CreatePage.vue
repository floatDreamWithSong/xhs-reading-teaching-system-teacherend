<script setup lang="ts">
import { useRoute } from 'vue-router';

const route = useRoute()
function isActive(path: string) {
  return route.path === path
}
const subRoute = [{
  label: '阅读题目',
  path: '/bank/create',
}, {
  label: '预习题目',
  path: '/bank/create/preview'
}]
</script>
<template>
  <div class="headline">
    <div class="content-header">
      新建题组
    </div>
    <router-link class="back-to-bank" to="/bank">
      返回题库 &gt;
    </router-link>
  </div>
  <div class="sub-router-container">
    <router-link v-for="i in subRoute" :key="i.path" class="sub-router" :class="isActive(i.path) ? 'is-active' : ''"
      :to="i.path">
      {{ i.label }}
    </router-link>
  </div>
  <keep-alive :include="['ReadingPage', 'PreviewPage']">
    <router-view />
  </keep-alive>
</template>
<style src="../../styles/bank.css" scoped></style>
<style scoped>
.headline {
  position: relative;
  width: 100%;

  .content-header {
    display: inline;
  }

  .back-to-bank {
    display: inline;
    position: absolute;
    right: 0;
    text-decoration: none;
    vertical-align: top;
    text-align: right;
    letter-spacing: 0.01em;
    color: var(--primary-color);
    font-weight: 400;
  }
}
</style>