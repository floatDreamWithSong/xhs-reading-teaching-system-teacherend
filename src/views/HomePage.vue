<script setup lang="ts">
import { ref } from 'vue';
import ActionCard from '@/components/homepage/ActionCard.vue';

const teacherName = ref('林霁')

// 卡片数据
const cardData = [
  {
    imageSrc: '/homework.png',
    text: '布置作业'
  },
  {
    imageSrc: '/manage-class.png', 
    text: '班级管理'
  },
  {
    imageSrc: '/create-class.png',
    text: '创建班级'
  }
]
</script>

<template>
  <div class="home-container">
    <div class="home-header">
      {{ teacherName }}老师，欢迎使用小花狮阅读教学系统
    </div>
    <div class="card-list">
      <ActionCard
        v-for="(card, index) in cardData"
        :key="index"
        :image-src="card.imageSrc"
        :text="card.text"
      />
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

  .card-list {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    gap: 32px;
    margin: 2rem 0px;
  }

  .card-list :deep(.action-card) {
    flex: 1;
    min-width: 274px;
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
