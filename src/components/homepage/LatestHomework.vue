<script setup lang="ts">
import { computed } from 'vue'

interface HomeworkItem {
  id: string
  className: string
  title: string
  publishTime: string
  deadline: string
  status: '进行中' | '已结束' | '未开始'
  totalStudents: number
  completedStudents: number
  uncompletedStudents: number
}

const props = defineProps<{
  homework: HomeworkItem
}>()

const emit = defineEmits<{
  viewDetails: [id: string]
}>()

const handleViewDetails = (id: string) => {
  emit('viewDetails', id)
}

const numberItemList = computed(() => {
  const primaryColor = 'var(--text-background-primary)'
  const dangerColor = 'var(--text-background-danger)'
  const infoColor = 'var(--text-background-info)'
  return [
    {
      name: '人数',
      value: props.homework.totalStudents,
      color: primaryColor
    },
    {
      name: '已完成',
      value: props.homework.completedStudents,
      color: primaryColor
    },
    {
      name: '未完成',
      value: props.homework.uncompletedStudents,
      color: props.homework.uncompletedStudents > 0 ? dangerColor : infoColor
    }
  ]
})

const statusClass = computed(() => {
  const statusMap = {
    '进行中': 'ongoing',
    '已结束': 'ended',
    '未开始': 'not-started'
  }
  return statusMap[props.homework.status]
})
</script>

<template>
  <div class="homework-item">
    <div class="left-container">
      <div class="class-name">
        <span>{{ homework.className }}</span>
      </div>
      <div class="homework-name">
        <span>{{ homework.title }}</span>
      </div>
      <div class="homework-time-info">
        <span>发布时间：{{ homework.publishTime }}</span>
        <span>截止时间：{{ homework.deadline }}</span>
        <span :class="['status', statusClass]">{{ homework.status }}</span>
      </div>
    </div>
    <div class="mid-container">
      <div class="number-item" v-for="(item, index) in numberItemList" :key="index">
        <div class="item-name">{{ item.name }}</div>
        <div class="item-number" :style="{
          background: item.color,
          backgroundClip: 'text'
        }">{{ item.value }}</div>
      </div>
    </div>
    <div class="right-container">
      <button class="view-details-btn" @click="handleViewDetails(homework.id)">
        查看详情
      </button>
    </div>
  </div>
</template>

<style scoped>
.homework-item {
  background-color: var(--background-color-light);
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.09);
  border-radius: 8px;
  padding: 16px 28px;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 20px;
  min-height: 100px;
  margin-bottom: 20px;

  .left-container {
    flex: 1;

    .class-name {
      font-weight: 500;
      font-size: 13px;
      line-height: 19px;
      background: linear-gradient(0deg, var(--primary-color) 31.25%, var(--primary-color-200) 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      margin-bottom: 4px;
    }

    .homework-name {
      font-weight: 700;
      font-size: 16px;
      line-height: 23px;
      margin-bottom: 8px;
      color: var(--text-color-primary);
    }

    .homework-time-info {
      font-size: 12px;
      line-height: 17px;
      color: var(--text-color-secondary);
      display: flex;
      flex-wrap: wrap;
      gap: 16px;
      align-items: center;

      .status {

        &.ongoing {
          color: #52C41A;
        }

        &.ended {
          color: #8C8C8C;
        }

        &.not-started {
          color: #1890FF;
        }
      }
    }
  }

  .mid-container {
    display: flex;
    gap: 32px;
    align-items: center;
    flex-shrink: 0;
    padding: 0 20px;
  }

  .right-container {
    flex-shrink: 0;

    .view-details-btn {
      background: linear-gradient(135deg, var(--primary-color) 0%, var(--primary-color-200) 100%);
      border: none;
      border-radius: 20px;
      color: white;
      padding: 8px 20px;
      font-size: 14px;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.3s ease;
      white-space: nowrap;

      &:hover {
        transform: translateY(-1px);
        box-shadow: 0 4px 12px rgba(var(--primary-color-rgb), 0.3);
      }

      &:active {
        transform: translateY(0);
      }
    }
  }
}

.number-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;

  .item-name {
    font-size: 12px;
    color: var(--text-color-secondary);
    font-weight: 400;
  }

  .item-number {
    --text-background-primary: linear-gradient(360deg, var(--primary-color) 26.92%, var(--primary-color-200) 100%);
    --text-background-danger: linear-gradient(360deg, #DB0000 26.92%, #F43636 100%);
    --text-background-info: linear-gradient(360deg, #A7A7A7 26.92%, #DCDCDC 100%);
    font-weight: 500;
    font-size: 30px;
    line-height: 43px;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
}
</style>