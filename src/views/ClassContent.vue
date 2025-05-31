<script setup lang="ts">
import BigButton from '@/components/common/BigButton.vue';
import PageController from '@/components/common/PageController.vue';
import Select from '@/components/common/Select.vue';
import TextInput from '@/components/common/TextInput.vue';
import { Delete, Edit, Search, Student } from '@/components/icons';
import router from '@/router';


const handleCreateClass = () => {
  router.push('/class/create-class')
}
</script>

<template>
  <div class="content-header">
    班级管理
  </div>
  <div class="card-area filter-options">
    <Select label="年级:" placeholder="全部年级" />
    <TextInput label="搜索:" placeholder="搜索关键词">
      <template #suffix>
        <Search />
      </template>
    </TextInput>
  </div>
  <div class="filter-result">
    <div class="class-group">
      <div v-for="_ in 6" class="class-card card-area">
        <div class="header-info">
          <img src="/classroom.png" alt="">
          <div class="mask">
            <div class="school-info">
              小花狮实验学校
            </div>
            <div class="class-info">
              高一(1)班
            </div>
          </div>
        </div>
        <div class="info">
          <div class="student">
            <Student />
            <span class="student-number">45</span>
            <span>名学生</span>
          </div>
          <div class="actions">
            <Edit />
            <Delete />
          </div>
        </div>
      </div>
    </div>
    <PageController :page="2" :total="12" :page-size="4" />
  </div>
  <BigButton text="新增班级" @click="handleCreateClass" />
</template>
<style scoped>
.card-area.filter-options {
  padding: 18px 12px;
  margin-top: 12px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 25px;
}

.filter-result {
  margin-top: 24px;
  margin-bottom: 44px;

  .class-group {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    /* display: flex;
    justify-content: space-around;
    flex-wrap: wrap; */
    gap: 24px;

    .class-card {
      overflow: hidden;

      .header-info {
        position: relative;

        img {
          width: 100%;
        }

        .mask {
          position: absolute;
          width: 100%;
          height: 100%;
          bottom: 0;
          background: linear-gradient(to right, rgba(40, 74, 249, 0.75) 0%, rgba(81, 110, 252, 0.8) 46.15%, rgba(122, 145, 254, 0.6) 92.31%);
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;

          .school-info {
            font-size: 10px;
            color: #FFFFFF;
          }

          .class-info {
            font-size: 20px;
            color: #FFFFFF;
            text-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
          }
        }
      }

      .info {
        display: flex;
        background-color: white;
        justify-content: space-between;
        padding: 15px;

        .student {
          display: flex;
          align-items: center;

          .student-number {
            margin-left: 3px;
            letter-spacing: -0.06em;
            font-weight: 700;
            font-size: 15px;
            background: linear-gradient(360deg, #2447F9 41.62%, #7A91FE 71.67%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
          }
        }

        .actions {
          display: flex;
          align-items: center;
          gap: 8px;
        }
      }
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
