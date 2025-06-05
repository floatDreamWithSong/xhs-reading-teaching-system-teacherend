<script setup lang="ts">
import { useRoute } from 'vue-router';

const route = useRoute()
function isActive(path: string) {
  return route.path === path
}
const subRoute = [{
  label: '课内题库',
  path: '/bank',
}, {
  label: '课外题库',
  path: '/bank/outofclass'
}]
</script>

<template>
  <div class="content-header">
    题库管理
  </div>
  <div class="sub-router-container">
    <router-link v-for="i in subRoute" :key="i.path" class="sub-router" :class="isActive(i.path) ? 'is-active' : ''"
      :to="i.path">
      {{ i.label }}
    </router-link>
  </div>
  <router-view>

  </router-view>
</template>

<style scoped>
.sub-router-container {
  .sub-router {
    margin: 28px 9px 28px 0px;
    text-decoration: none;
    display: inline-block;
    padding: 8px 26px;
    border-radius: 5px;
    font-size: 17px;
    letter-spacing: -0.06em;
    color: black;
  }
  .is-active{
    background: linear-gradient(112.53deg, #8FA2FF -7.6%, #2447F9 136%);
    box-shadow: 0px 2px 3.6px rgba(0, 0, 0, 0.05);
    color: white;
  }
}
</style>
