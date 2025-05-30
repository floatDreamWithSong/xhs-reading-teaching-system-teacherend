<script setup lang="ts">
import { ref } from 'vue';
import ActionCard from '@/components/homepage/ActionCard.vue';
import LatestHomework from '@/components/homepage/LatestHomework.vue';

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

// 最新作业数据
const latestHomeworkList = ref([
  {
    id: '1',
    className: '七年级-1班(2025级)',
    title: '《荷塘月色》阅读理解',
    publishTime: '2025-5-21 17:03',
    deadline: '2025-5-22 17:03',
    status: '进行中' as const,
    totalStudents: 40,
    completedStudents: 34,
    uncompletedStudents: 6
  },
  {
    id: '2', 
    className: '七年级-2班(2025级)',
    title: '《朝花夕拾》读后感',
    publishTime: '2025-5-20 14:30',
    deadline: '2025-5-23 14:30', 
    status: '进行中' as const,
    totalStudents: 38,
    completedStudents: 20,
    uncompletedStudents: 18
  },
  {
    id: '3',
    className: '八年级-1班(2024级)', 
    title: '《钢铁是怎样炼成的》阅读测试',
    publishTime: '2025-5-19 16:00',
    deadline: '2025-5-21 16:00',
    status: '已结束' as const,
    totalStudents: 42,
    completedStudents: 42, 
    uncompletedStudents: 0
  }
])

const handleViewHomeworkDetails = (id: string) => {
  // 处理查看作业详情
  console.log('查看作业详情:', id)
}
</script>

<template>
  <div class="home-container">
    <div class="home-header">
      {{ teacherName }}老师，欢迎使用小花狮阅读教学系统
    </div>
    <div class="card-list">
      <ActionCard v-for="(card, index) in cardData" :key="index" :image-src="card.imageSrc" :text="card.text" />
    </div>
    <div class="latest-homework-list-container">
      <div class="latest-homework-list-header">
        <span class="latest-homework-list-title">最新作业列表</span>
        <router-link class="latest-homework-list-more" to="/homework">查看更多></router-link>
      </div>
      <div class="latest-homework-list-content">
        <LatestHomework 
          v-for="homework in latestHomeworkList" 
          :key="homework.id"
          :homework="homework" 
          @view-details="handleViewHomeworkDetails" 
        />
      </div>
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
  position: relative;
  z-index: 1;
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

    &:deep(.action-card) {
      flex: 1;
      min-width: 274px;
    }
  }

  .latest-homework-list-container {
    width: 100%;
    height: fit-content;

    .latest-homework-list-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 2rem 0px;

      .latest-homework-list-title {
        font-weight: 500;
        font-size: 18px;
        line-height: 26px;
        letter-spacing: -0.06em;
      }

      .latest-homework-list-more {
        text-decoration: none;
        text-align: right;
        letter-spacing: 0.01em;
        color: var(--primary-color);
      }
    }

    .latest-homework-list-content {
      width: 100%;
      height: fit-content;
    }

  }

}

#background {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 55%;
  height: auto;
  z-index: 0;
}
</style>
