<script setup lang="ts">
import { ref } from 'vue';

const teacherName = ref('林霁')
</script>

<template>
  <div class="home-container">
    <div class="home-header">
      {{ teacherName }}老师，欢迎使用小花狮阅读教学系统
    </div>
    <Teleport to=".content-container">
      <img id="background" src="/background.png" />
    </Teleport>

  </div>
</template>

<style scoped>
.home-container {
  width: 100%;
  background-color: var(--background-color-primary);

  .home-header {
    width: 100%;
    height: fit-content;
    color: var(--text-color);
    font-weight: 500;
    font-size: 22px;
    line-height: 2rem;
    letter-spacing: -0.06em;
  }
}

#background {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 55%;
  height: auto;
  z-index: 1;
}
</style>
