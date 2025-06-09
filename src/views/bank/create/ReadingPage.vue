<script setup lang="ts">
defineOptions({
  name: 'ReadingPage'
})
import TextInput from '@/components/common/TextInput.vue';
import TextArea from '@/components/common/TextArea.vue';
import FileUploader from '@/components/common/FileUploader.vue';
import { KeyBoard, Upload, Eye, AIWrite, Plus } from '@/components/icons';
import { ref } from 'vue';
const isUploadFile = ref(true)
const articleTitle = ref('')
const articleContent = ref('')

const handleFileUpload = (files: File[]) => {
  console.log('上传的文件:', files)
  // 这里处理文件上传逻辑
}

const handleUploadError = (message: string) => {
  console.error('上传错误:', message)
  // 这里处理上传错误
}

const handlePaste = (event: ClipboardEvent) => {
  console.log('粘贴事件:', event)
  // 可以在这里处理特殊的粘贴逻辑
}

const handlePreview = () => {
  console.log('预览文章')
}
</script>
<template>
  <div class="card-area">
    <div class="card-header">
      <div class="card-title">阅读文本</div>
      <div class="card-opr-container">
        <button @click="isUploadFile = true" class="input-type-button" :class="{
          'active-button': isUploadFile
        }">
          <Upload color="white" />
          上传文件
        </button>
        <button @click="isUploadFile = false" class="input-type-button" :class="{
          'active-button': !isUploadFile
        }">
          <KeyBoard />
          输入文本
        </button>
      </div>
    </div>

    <FileUploader v-show="isUploadFile" @upload="handleFileUpload" @error="handleUploadError" />

    <div v-show="!isUploadFile" class="text-input-area">
      <TextInput v-model="articleTitle" class="title-input" label="文章题目:" placeholder="请输入文章题目" />
      <TextArea v-model="articleContent" placeholder="请在此粘贴或输入文章内容......" :min-height="200" :max-height="200"
        @paste="handlePaste" />
      <div class="preview-container">
        <button class="preview-button" @click="handlePreview">
          <Eye />
          预览文章
        </button>
      </div>
    </div>
  </div>
  <div class="card-area">
    <div class="card-header">
      <div class="card-title">题目列表</div>
      <div class="card-opr-container">
        <button class="preview-button">
          <Plus />
          新建题目
        </button>
        <button class="preview-button">
          <AIWrite />
          <span style="width: 4rem;">AI生题</span>
        </button>
      </div>
    </div>
  </div>
</template>
<style scoped>
.card-area {
  padding: 12px 19px 20px 19px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 18px;

  .card-header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    .card-opr-container {
      display: flex;
      gap: 8px;

      button {
        padding: 6px 19px;
        border-radius: 5px;
        display: flex;
        align-items: center;
        gap: 4px;
        letter-spacing: 0.01em;

        svg {
          transform: scale(1.2);
          width: 1rem;
          stroke: white;
        }
      }

      .input-type-button:not(.active-button) {
        color: black;
        background: transparent;

        svg {
          stroke: black;
        }
      }
    }
  }
}

.text-input-area {
  display: flex;
  flex-direction: column;
  gap: 12px;

  .title-input {
    width: 40%;
  }
}

.preview-container {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  margin-top: 12px;

  .preview-button {
    padding: 6px 19px;
    color: #696969;
    border-radius: 5px;
    box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.2);
    background: transparent;

    svg {
      stroke: #696969;
    }
  }
}
</style>