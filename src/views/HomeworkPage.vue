<script setup lang="ts">
import BigButton from '@/components/common/BigButton.vue';
import PageTable from '@/components/common/PageTable.vue';
import Select from '@/components/common/Select.vue';
import TextInput from '@/components/common/TextInput.vue';
import { Search } from '@/components/icons';

const name = ['状态', '作业名称', '班级', '发布时间', '截止时间', '完成情况', '操作']

// 作业数据
const homeworkData = [
  {
    status: '进行中',
    title: '《红楼梦》第一回预习作业',
    class: '高一(1)班',
    publishTime: '2025-5-21 17:03',
    endTime: '2025-5-22 17:03',
    completion: {
      percentage: 85,
      completed: 34,
      total: 40
    }
  },
  {
    status: '进行中',
    title: '《荷塘月色》阅读理解',
    class: '高一(1)班',
    publishTime: '2025-5-21 17:03',
    endTime: '2025-5-22 17:03',
    completion: {
      percentage: 85,
      completed: 34,
      total: 40
    }
  },
  {
    status: '进行中',
    title: '《论语》选读预习作业',
    class: '高一(1)班',
    publishTime: '2025-5-21 17:03',
    endTime: '2025-5-22 17:03',
    completion: {
      percentage: 85,
      completed: 34,
      total: 40
    }
  },
  {
    status: '已停止',
    title: '《背影》文本细读',
    class: '高一(1)班',
    publishTime: '2025-5-20 17:03',
    endTime: '2025-5-21 17:03',
    completion: {
      percentage: 85,
      completed: 34,
      total: 40
    }
  }
]
</script>

<template>
  <div class="min-width-wrapper">
    <div class="content-header">
      作业管理
    </div>
    <div class="card-area filter-options">
      <Select label="班级:" placeholder="全部班级" />
      <Select label="状态:" placeholder="全部状态" />
      <TextInput label="搜索:" placeholder="作业名称关键词">
        <template #suffix>
          <Search />
        </template>
      </TextInput>
    </div>
    <div class="filter-result">
      <PageTable :page="2" :page-size="4" :total="20">
        <template #header>
          <div class="header">
            <div v-for="i in name" :key="i" class="header-item">{{ i }}</div>
          </div>
        </template>
        <template #default>
          <div v-for="(item, index) in homeworkData" :key="index" class="data-row">
            <div class="data-item status-tag">
              <span class="tag" :class="item.status === '进行中' ? 'active-tag' : 'stopped-tag'">
                {{ item.status }}
              </span>
            </div>
            <div class="data-item title">{{ item.title }}</div>
            <div class="data-item class">{{ item.class }}</div>
            <div class="data-item time">{{ item.publishTime }}</div>
            <div class="data-item time">{{ item.endTime }}</div>
            <div class="data-item completion">
              <div class="progress-container">
                <div class="progress-bar">
                  <div class="progress-fill" :style="{ width: item.completion.percentage + '%' }"></div>
                </div>
                <span class="progress-text">{{ item.completion.percentage }}%({{ item.completion.completed }}/{{
                  item.completion.total }})</span>
              </div>
            </div>
            <div class="data-item actions">
              <span class="action-btn edit-btn">编辑</span>
              <span class="action-btn delete-btn">删除</span>
            </div>
          </div>
        </template>
      </PageTable>
    </div>
    <BigButton text="新建作业" />
  </div>
</template>
<style scoped>
.min-width-wrapper{
  min-width: 860px;
}
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
  --grid-style: 70px 3fr 1.5fr 2fr 2fr 128px minmax(90px, 1fr);

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
    border-bottom: 1px solid #EAEAEA;
    min-height: 50px;
    align-items: center;

    .data-item {
      padding: 10px 8px;
      display: flex;
      align-items: center;

      &.status-tag {
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

        .active-tag {
          background: linear-gradient(90deg, #284AF9 0%, #7A91FE 100%);
        }

        .stopped-tag {
          background-color: #b4b4b4;
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

      &.class {
        font-size: 14px;
        color: #333;
      }

      &.time {
        font-size: 13px;
        color: #666;
      }

      &.completion {
        .progress-container {
          margin-top: 4px;
          width: 100%;
          display: flex;
          align-items: flex-start;
          flex-direction: column;
          gap: 4px;

          .progress-bar {
            width: 90%;
            height: 11px;
            background-color: #E5E7EB;
            border-radius: 30px;
            overflow: hidden;

            .progress-fill {
              height: 100%;
              border-radius: 30px;
              background: linear-gradient(90deg, var(--primary-color) 0%, var(--primary-color-300) 100%);;
              transition: width 0.3s ease;
            }
          }

          .progress-text {
            font-size: 10px;
            color: #6e6e6e;
            text-align: center;
          }
        }
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
      background-color: #FAFAFA;
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
