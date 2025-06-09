<script setup lang="ts">
import { Plus } from '@/components/icons';
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
    <router-link class="sub-router is-active create" to="/bank/create" >
      <Plus />
      新建题组
    </router-link>
  </div>
  <router-view>

  </router-view>
</template>
<style src="../../styles/bank.css" scoped></style>
<style scoped>
.create{
  position: absolute;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  svg{
    transform: scale(1.1) translateY(1px);
  }
}
</style>