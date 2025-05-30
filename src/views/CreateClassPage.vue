<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

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
  if (!grade.value || !className.value) return ''
  const gradeLabel = gradeOptions.find(option => option.value === grade.value)?.label || ''
  return `${gradeLabel}(${className.value})班 (${schoolName.value})`
})

const handleBack = () => {
  router.push('/')
}

const handleCreateClass = () => {
  console.log('创建班级:', {
    schoolName: schoolName.value,
    schoolStage: schoolStage.value,
    grade: grade.value,
    studentCount: studentCount.value,
    className: className.value,
    enableMiniProgram: enableMiniProgram.value,
    enableAssistant: enableAssistant.value
  })
}
</script>

<template>
  <div class="create-class-container">
    <div class="back-button" @click="handleBack">
      < 返回
    </div>

    <div class="form-card">
      <h2 class="form-title">班级信息登记</h2>
      
      <div class="form-row">
        <div class="form-item">
          <label>学校:</label>
          <input v-model="schoolName" type="text" class="form-input" />
        </div>
        <div class="form-item">
          <label>学段:</label>
          <input v-model="schoolStage" type="text" class="form-input" />
        </div>
      </div>

      <div class="notice-text">
        *所创建班级对应学段及学段信息须与教师个人信息一致
      </div>

      <div class="form-row">
        <div class="form-item">
          <label><span class="required">*</span>年级:</label>
          <select v-model="grade" class="form-select">
            <option value="">请选择班级所在年级</option>
            <option v-for="option in gradeOptions" :key="option.value" :value="option.value">
              {{ option.label }}
            </option>
          </select>
        </div>
        <div class="form-item">
          <label><span class="required">*</span>人数:</label>
          <input v-model="studentCount" type="number" placeholder="请输入人班级人数" class="form-input" />
        </div>
      </div>

      <div class="form-item full-width">
        <label><span class="required">*</span>名称:</label>
        <input v-model="className" type="text" placeholder="请输入班级名称" class="form-input" />
      </div>

      <div class="name-preview">
        <span class="preview-label">名称预览：</span>
        <span class="preview-text">{{ classNamePreview }}</span>
      </div>
    </div>

    <!-- 附加服务选择 -->
    <div class="service-section">
      <h3 class="service-title">附加服务选择</h3>
      
      <div class="service-item">
        <div class="service-label">
          <span class="service-icon">📱</span>
          开通班级小程序:
        </div>
        <div class="radio-group">
          <label class="radio-label">
            <input v-model="enableMiniProgram" type="radio" :value="true" />
            是
          </label>
          <label class="radio-label">
            <input v-model="enableMiniProgram" type="radio" :value="false" />
            否
          </label>
        </div>
      </div>

      <div class="service-item">
        <div class="service-label">
          <span class="service-icon">👥</span>
          添加小花狮助教:
        </div>
        <div class="radio-group">
          <label class="radio-label">
            <input v-model="enableAssistant" type="radio" :value="true" />
            是
          </label>
          <label class="radio-label">
            <input v-model="enableAssistant" type="radio" :value="false" />
            否
          </label>
        </div>
      </div>

      <div class="assistant-notice">
        *小花狮助教为系统管理员角色，可以帮助您更好地进行班级管理
      </div>
    </div>

    <!-- 创建按钮 -->
    <div class="button-container">
      <button @click="handleCreateClass" class="create-button">
        创建班级
      </button>
    </div>
  </div>
</template>

<style scoped>

</style> 