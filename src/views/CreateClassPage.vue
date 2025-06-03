<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import BigButton from '@/components/common/BigButton.vue'
import Label from '@/components/common/Label.vue'
import Select from '@/components/common/Select.vue'
import TextInput from '@/components/common/TextInput.vue'
import YesNoRadio from '@/components/common/YesNoRadio.vue'
import { AddPeople, Phone } from '@/components/icons'

const router = useRouter()

// 表单数据
const schoolName = ref('小花狮实验学校')
const schoolStage = ref('高中（3年制）')
const grade = ref('')
const studentCount = ref('')
const className = ref('')

// 附加服务选择
const enableMiniProgram = ref(true)
const enableAssistant = ref(true)

// 年级选项
const gradeOptions = [
  { value: 'grade1', label: '高一' },
  { value: 'grade2', label: '高二' },
  { value: 'grade3', label: '高三' },
]

// 名称预览
const classNamePreview = computed(() => {
  if (!grade.value || !className.value)
    return ''
  const gradeLabel = gradeOptions.find(option => option.value === grade.value)?.label || ''
  return `${gradeLabel}(${className.value})班 (${schoolName.value})`
})

function handleBack() {
  router.back()
}

function handleCreateClass() {
  console.log('创建班级:', {
    schoolName: schoolName.value,
    schoolStage: schoolStage.value,
    grade: grade.value,
    studentCount: studentCount.value,
    className: className.value,
    enableMiniProgram: enableMiniProgram.value,
    enableAssistant: enableAssistant.value,
  })
}
</script>

<template>
  <div class="create-class-container">
    <div class="back-button" @click="handleBack">
      < 返回
    </div>
    <div class="class-info-section card-area">
      <h3 class="form-title">
        班级信息登记
      </h3>

      <div class="form-item">
        <TextInput v-model="schoolName" label="学校:" class="form-input" />
      </div>
      <div class="form-item">
        <TextInput v-model="schoolStage" label="学段:" class="form-input" />
      </div>

      <Label class="notice-label" label="所创建班级对应学段及学段信息须与教师个人信息一致" required />

      <div class="form-item">
        <Select label="年级:" required :options="gradeOptions" />
      </div>
      <div class="form-item">
        <TextInput v-model="studentCount" label="人数:" required placeholder="请输入人班级人数" class="form-input" />
      </div>

      <div class="form-item">
        <TextInput v-model="className" label="名称:" required type="text" placeholder="请输入班级名称" class="form-input" />
      </div>

      <div class="name-preview">
        <span class="name-preview-label">名称预览:</span>
        <span class="preview-text"> <!-- {{ classNamePreview }} --> 高一(1)班（小花狮实验学校）
        </span>
      </div>
    </div>

    <!-- 附加服务选择 -->
    <div class="service-section card-area">
      <h3 class="service-title">
        附加服务选择
      </h3>
      <YesNoRadio v-model="enableMiniProgram" label="开通班级小程序:">
        <template #prefix>
          <Phone />
        </template>
      </YesNoRadio>

      <YesNoRadio v-model="enableAssistant" label="添加小花狮助教:">
        <template #prefix>
          <AddPeople />
        </template>
      </YesNoRadio>

      <Label class="notice-label" label="小花狮助教为系统管理员角色，可以帮助您更好地进行班级管理" required />
    </div>

    <!-- 创建按钮 -->
    <BigButton text="创建班级" @click="handleCreateClass" />
  </div>
</template>

<style scoped>
.notice-label {
  color: var(--primary-color);
}

.create-class-container {
  .back-button {
    width: fit-content;
    margin-bottom: 15px;
    font-size: 17px;
    cursor: pointer;
    line-height: 26px;
    text-align: right;
    letter-spacing: 0.01em;
    color: var(--primary-color);
  }
}

.card-area {
  padding: 20px 60px;
}

.service-section {
  margin-top: 25px;

  .service-title {
    margin-bottom: 9px;
  }

  margin-bottom: 44px;
}

.class-info-section {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-areas:
    'title title'
    'school stage'
    'notice notice'
    'grade student-count'
    'class-name class-name'
    'preview preview';
  gap: 16px;
  align-items: start;
}

.form-title {
  grid-area: title;
  letter-spacing: -0.06em;
  margin-bottom: 5px;
}

.form-item:nth-child(2) {
  grid-area: school;
}

.form-item:nth-child(3) {
  grid-area: stage;
}

.form-item:nth-child(4) {
  grid-area: notice;
}

.form-item:nth-child(5) {
  grid-area: grade;
}

.form-item:nth-child(6) {
  grid-area: student-count;
}

.form-item:nth-child(7) {
  grid-area: class-name;
}

.name-preview {
  grid-area: preview;

  .name-preview-label {
    color: #333;
    font-size: 14px;
    font-weight: 500;
  }

  .preview-text {
    padding-left: 16px;
    font-weight: 500;
    font-size: 15px;
    line-height: 22px;
    letter-spacing: -0.06em;
    background: linear-gradient(0deg, var(--primary-color) 32.69%, var(--primary-color-300) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
}

.service-section {
  display: grid;
  grid-template-columns: 1fr;
  gap: 10px;
  align-items: start;
}

h3 {
  margin: 0;
}
</style>
