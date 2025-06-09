<script setup lang="ts">
import BigButton from '@/components/common/BigButton.vue'
import PageTable from '@/components/common/PageTable.vue'
import Select from '@/components/common/Select.vue'
import TextInput from '@/components/common/TextInput.vue'
import { Search, Star } from '@/components/icons'

const name = ['教材类型', '篇目名称', '对应年级', '难度', '使用次数', '操作']

// 模拟题库数据
const questionData = [
  {
    type: '阅读',
    title: '分析《红楼梦》第一回中贾宝玉的形象特点',
    publishTime: '2025-5-21 17:03',
    difficulty: 3,
    useCount: 25,
  },
  {
    type: '预习',
    title: '预习《荷塘月色》，整理文中描写月亮的句子',
    publishTime: '2025-5-21 17:03',
    difficulty: 2,
    useCount: 30,
  },
  {
    type: '阅读',
    title: '分析《论语》中"仁"的含义及其现代意义',
    publishTime: '2025-5-21 17:03',
    difficulty: 4,
    useCount: 21,
  },
  {
    type: '预习',
    title: '预习《背影》，了解作者朱自清的生平',
    publishTime: '2025-5-20 17:03',
    difficulty: 2,
    useCount: 55,
  },
]

// 渲染星级难度
function renderStars(ind: number, difficulty: number) {
  if (ind > difficulty) {
    return '#e4e4e4'
  }
  if (difficulty < 3) {
    return 'var(--primary-color-300)'
  }
  return 'var(--primary-color)'
}
</script>
<template>
  <div class="card-area filter-options">
    <Select label="教材:" placeholder="全部类型" />
    <Select label="年级:" placeholder="全部年级" />
    <TextInput label="搜索:" placeholder="文章关键词">
      <template #suffix>
        <Search />
      </template>
    </TextInput>
  </div>
  <div class="filter-result">
    <PageTable :page="2" :page-size="4" :total="20">
      <template #header>
        <div class="header">
          <div v-for="i in name" :key="i" class="header-item">
            {{ i }}
          </div>
        </div>
      </template>
      <template #default>
        <div v-for="(item, index) in questionData" :key="index" class="data-row">
          <div class="data-item type-tag">
            <span class="tag" :class="item.type === '阅读' ? 'reading-tag' : 'preview-tag'">
              {{ item.type }}
            </span>
          </div>
          <div class="data-item title">
            {{ item.title }}
          </div>
          <div class="data-item time">
            {{ item.publishTime }}
          </div>
          <div class="data-item">
            <Star v-for="i in 5" :stroke="renderStars(i, item.difficulty)" />
          </div>
          <div class="data-item count">
            {{ item.useCount }}
          </div>
          <div class="data-item actions">
            <span class="action-btn edit-btn">编辑</span>
            <span class="action-btn delete-btn">删除</span>
          </div>
        </div>
      </template>
    </PageTable>
  </div>
  <BigButton text="新建题目" />
</template>
<style src="../../../styles/bank-manage.css" scoped>
</style>