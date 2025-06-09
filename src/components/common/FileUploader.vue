<script setup lang="ts">
import { ref } from 'vue'

interface Props {
  acceptedTypes?: string[]
  maxSize?: number // MB
  multiple?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  acceptedTypes: () => ['.doc', '.docx', '.pdf', '.txt'],
  maxSize: 10,
  multiple: false
})

const emit = defineEmits<{
  upload: [files: File[]]
  error: [message: string]
}>()

const isDragOver = ref(false)
const fileInputRef = ref<HTMLInputElement>()

const handleDragOver = (e: DragEvent) => {
  e.preventDefault()
  isDragOver.value = true
}

const handleDragLeave = (e: DragEvent) => {
  e.preventDefault()
  isDragOver.value = false
}

const handleDrop = (e: DragEvent) => {
  e.preventDefault()
  isDragOver.value = false

  const files = Array.from(e.dataTransfer?.files || [])
  handleFiles(files)
}

const handleFileSelect = (e: Event) => {
  const target = e.target as HTMLInputElement
  const files = Array.from(target.files || [])
  handleFiles(files)
}

const handleFiles = (files: File[]) => {
  // 验证文件类型
  const validFiles = files.filter(file => {
    const extension = '.' + file.name.split('.').pop()?.toLowerCase()
    return props.acceptedTypes.includes(extension)
  })

  if (validFiles.length !== files.length) {
    emit('error', '不支持的文件类型')
    return
  }

  // 验证文件大小
  const oversizedFiles = validFiles.filter(file => file.size > props.maxSize * 1024 * 1024)
  if (oversizedFiles.length > 0) {
    emit('error', `文件大小不能超过 ${props.maxSize}MB`)
    return
  }

  emit('upload', validFiles)
}

const triggerFileSelect = () => {
  fileInputRef.value?.click()
}
</script>

<template>
  <div class="file-uploader" :class="{ 'file-uploader--drag-over': isDragOver }" @dragover="handleDragOver"
    @dragleave="handleDragLeave" @drop="handleDrop" @click="triggerFileSelect">
    
    <div class="file-uploader__content">
      <svg width="68" height="47" viewBox="0 0 68 47" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M12.9643 38.9218C7.46116 38.9218 3 35.478 3 30.4286C3 25.3791 7.46116 21.2857 12.9643 21.2857C13.3385 21.2857 13.7079 21.3047 14.0714 21.3415V21.2857H14.2085C14.118 20.6201 14.0714 19.942 14.0714 19.254C14.0714 10.2771 22.0024 3 31.7857 3C38.4107 3 44.1863 6.33702 47.2249 11.2791C47.9674 11.1789 48.7271 11.127 49.5 11.127C58.0604 11.127 65 17.4945 65 25.3492C65 31.8151 60.2975 36.7442 53.8594 38.3689M33.5108 44V41.5V28.5M33.5108 28.5L23.3437 37.5118M33.5108 28.5L43.6875 37.5118"
          stroke="url(#paint0_linear_2775_4606)" stroke-width="4.46502" stroke-linecap="round" stroke-linejoin="round" />
        <defs>
          <linearGradient id="paint0_linear_2775_4606" x1="34" y1="3" x2="34" y2="51.2222" gradientUnits="userSpaceOnUse">
            <stop stop-color="#284AF9" />
            <stop offset="1" stop-color="#7A91FE" />
          </linearGradient>
        </defs>
      </svg>
      <div class="file-uploader__text">
        拖拽文件到此处或点击上传
      </div>
      <div class="file-uploader__types">
        支持{{ acceptedTypes.join('、') }}
      </div>
    </div>

    <input ref="fileInputRef" type="file" class="file-uploader__input" :accept="acceptedTypes.join(',')"
      :multiple="multiple" @change="handleFileSelect" />
  </div>
</template>

<style scoped>
.file-uploader {
  /* border: 2px dashed #e1e5e9; */
  border: 2px solid #d0d0d0;
  border-radius: 8px;
  padding: 40px 20px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  background-color: #fafbfc;
  min-height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.file-uploader:hover {
  border-color: var(--primary-color-300);
  background-color: #f8fafe;
}

.file-uploader--drag-over {
  border-color: var(--primary-color-300);
  background-color: #f0f7ff;
}

.file-uploader__content {
  pointer-events: none;
}

.file-uploader__text {
  font-size: 16px;
  color: #333;
  margin-bottom: 8px;
  font-weight: 500;
}

.file-uploader__types {
  font-size: 14px;
  color: #666;
}

.file-uploader__input {
  display: none;
}
</style>