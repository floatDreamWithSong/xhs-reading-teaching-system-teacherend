<script setup lang="ts">
import BigButton from '@/components/common/BigButton.vue'

const data = [
  {
    title: '班级总数',
    number: 6,
    desc: '较上月增长20%↑',
    img: '/total-class-num.png',
  },
  {
    title: '学生总数',
    number: 265,
    desc: '较上月增长15%↑',
    img: '/total-stu-num.png',
  },
  {
    title: '作业完成率',
    number: '98%',
    desc: '较上月下降20%↓',
    img: '/homework-complete-ratio.png',
  },
  {
    title: '平均成绩',
    number: 89.7,
    desc: '较上月增长20%↑',
    img: '/avg-score.png',
  },
]
</script>

<template>
  <div class="data-wrapper">
    <div class="content-header">
      数据分析
    </div>
    <div class="card-container">
      <div v-for="item in data" :key="item.title" class="card-area">
        <div class="card-left">
          <div class="card-title">
            {{ item.title }}
          </div>
          <div class="card-number">
            {{ item.number }}
          </div>
          <div class="card-desc" :class="item.desc.endsWith('↓') ? 'decrease' : ''">
            {{ item.desc }}
          </div>
        </div>
        <div class="card-right">
          <img :src="item.img" alt="">
        </div>
      </div>
    </div>
    <div class="width-w">
      <div class="stat-graph-container">
        <div v-for="_ in 4" class="stat-graph-item card-area">
          <div class="stat-title">
            统计图
          </div>
        </div>
      </div>
      <BigButton text="导出报告" />
    </div>
  </div>
</template>

<style scoped>
.data-wrapper {
  width: 100%;
}

.card-container {
  margin-top: 15px;
  margin-bottom: 29px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--data-card-gap);

  .card-area {
    display: flex;
    padding: var(--data-card-padding);
    min-width: var(--data-card-width);
    gap: 25px;

    .card-left {
      display: flex;
      flex-direction: column;
      justify-content: center;
      flex: 1;

      .card-title {
        color: #292929;
      }

      .card-number {
        font-weight: 500;
        font-size: 28px;
        letter-spacing: -0.06em;
        background: linear-gradient(360deg, #2447f9 26.92%, #8fa2ff 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
      }

      .card-desc {
        --color: #189114;
        font-size: 11px;
        line-height: 30px;
        color: var(--color);
      }

      .card-desc.decrease {
        --color: #db0000;
      }
    }

    .card-right {
      width: fit-content;

      img {
        width: 80px;
      }
    }
  }
}

.width-w {
  width: 100%;
  min-width: fit-content;
}

.stat-graph-container {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--data-card-gap);
  margin-bottom: 59px;
  width: 100%;

  .stat-graph-item {
    --graph-padding: 17px;
    min-width: calc(
      var(--data-card-width) * 2 + var(--data-card-padding) * 4 + var(--data-card-gap) - var(--graph-padding) * 2
    );
    padding: var(--graph-padding);
    height: fit-content;

    .stat-title {
      font-style: normal;
      font-weight: 500;
      font-size: 15px;
      line-height: 22px;
      letter-spacing: -0.06em;
    }
  }
}
</style>
