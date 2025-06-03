<script setup lang="ts">
import BigButton from '@/components/common/BigButton.vue'
import PageTable from '@/components/common/PageTable.vue'
import Select from '@/components/common/Select.vue'
import TextInput from '@/components/common/TextInput.vue'
import { Search, Star } from '@/components/icons'

const name = ['题型', '作业名称', '发布时间', '难度', '使用次数', '操作']

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
  <div class="content-header">
    题库管理
  </div>
  <div class="card-area filter-options">
    <Select label="题型:" placeholder="全部题型" />
    <Select label="难度:" placeholder="全部难度" />
    <TextInput label="搜索:" placeholder="题目关键词">
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

<style scoped>
.card-area.filter-options {
  padding: 18px 12px;
  margin-top: 12px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 25px;
}

.filter-result {
  margin-top: 21px;
  margin-bottom: 58px;
  --grid-style: 59px 4fr 2.5fr 2.5fr 2fr minmax(90px, 1fr);

  .header {
    display: grid;
    grid-template-columns: var(--grid-style);

    .header-item {
      padding: 10px 8px;
    }
  }

  .data-row {
    display: grid;
    grid-template-columns: var(--grid-style);
    border-bottom: 1px solid #eaeaea;
    min-height: 50px;
    align-items: center;

    .data-item {
      padding: 10px 8px;
      display: flex;
      align-items: center;

      &.type-tag {
        .tag {
          width: 100%;
          height: 20px;
          display: flex;
          justify-content: center;
          align-items: center;
          border-radius: 1000px;
          font-size: 10px;
          color: white;
          font-weight: 500;
        }

        .reading-tag {
          background-color: var(--primary-color);
        }

        .preview-tag {
          background-color: var(--primary-color-300);
        }
      }

      &.title {
        font-size: 14px;
        color: #333;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        position: relative;

        &::after {
          content: '';
          background-color: #333;
          width: 20%;
          height: 100%;
          position: absolute;
          right: 0;
          background: linear-gradient(to right, #ffffff00, #ffffff);
        }
      }

      &.time {
        font-size: 13px;
        color: #666;
      }

      &.count {
        font-size: 14px;
        color: #333;
        font-weight: 500;
      }

      &.actions {
        display: flex;
        gap: 15px;

        .action-btn {
          font-size: 14px;
          cursor: pointer;
          transition: all 0.2s;

          &.edit-btn {
            color: var(--primary-color);
          }

          &.delete-btn {
            color: var(--text-color);
          }
        }
      }
    }

    &:hover {
      background-color: #fafafa;
    }
  }
}

.create-question-button-container {
  margin-top: 58px;

  .create-question-button {
    display: block;
    margin: auto;
  }
}
</style>
