<script setup lang="ts">
import { ref, nextTick } from 'vue'

interface Props {
  placeholder?: string
  minHeight?: number
  maxHeight?: number
  autoResize?: boolean
  modelValue?: string
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: '请在此粘贴或输入文章内容......',
  minHeight: 200,
  maxHeight: 500,
  autoResize: true,
  modelValue: '',
  disabled: false
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
  paste: [event: ClipboardEvent]
  focus: []
  blur: []
}>()

const textareaRef = ref<HTMLTextAreaElement>()
const isFocused = ref(false)

const handleInput = (event: Event) => {
  const target = event.target as HTMLTextAreaElement
  emit('update:modelValue', target.value)

  if (props.autoResize) {
    adjustHeight()
  }
}

const handleFocus = () => {
  isFocused.value = true
  emit('focus')
}

const handleBlur = () => {
  isFocused.value = false
  emit('blur')
}

const handlePaste = (event: ClipboardEvent) => {
  emit('paste', event)

  // 延迟调整高度，确保内容已经粘贴
  if (props.autoResize) {
    nextTick(() => {
      adjustHeight()
    })
  }
}

const adjustHeight = () => {
  if (!textareaRef.value) return

  const textarea = textareaRef.value
  textarea.style.height = 'auto'

  const scrollHeight = textarea.scrollHeight
  const newHeight = Math.max(
    props.minHeight,
    Math.min(scrollHeight, props.maxHeight)
  )

  textarea.style.height = `${newHeight}px`
}

defineExpose({
  focus: () => textareaRef.value?.focus(),
  blur: () => textareaRef.value?.blur(),
  adjustHeight
})
</script>

<template>
  <div class="textarea-container" :class="{
    'textarea-container--focused': isFocused,
    'textarea-container--disabled': disabled
  }">
    <textarea ref="textareaRef" class="textarea" :value="modelValue" :placeholder="placeholder" :disabled="disabled"
      :style="{ minHeight: `${minHeight}px` }" @input="handleInput" @focus="handleFocus" @blur="handleBlur"
      @paste="handlePaste" />

    <!-- 粘贴提示 -->
    <!-- <div v-if="!modelValue && !isFocused" class="paste-hint">
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M5.5 2.5V1.5C5.5 1.22386 5.72386 1 6 1H10C10.2761 1 10.5 1.22386 10.5 1.5V2.5M5.5 2.5H3.5C3.22386 2.5 3 2.72386 3 3V13.5C3 13.7761 3.22386 14 3.5 14H12.5C12.7761 14 13 13.7761 13 13.5V3C13 2.72386 12.7761 2.5 12.5 2.5H10.5M5.5 2.5H10.5" stroke="#999" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M6.5 6.5H9.5M6.5 9H9.5" stroke="#999" stroke-width="1.2" stroke-linecap="round"/>
      </svg>
      <span>支持 Ctrl+V 粘贴文本</span>
    </div> -->
  </div>
</template>

<style scoped>
.textarea-container {
  position: relative;
  border: 2px solid #e1e5e9;
  padding: 9px 11px;
  border-radius: 8px;
  background-color: #fff;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

/* .textarea-container--focused {
  border-color: var(--primary-color-300, #4a90e2);
  box-shadow: 0 0 0 3px rgba(74, 144, 226, 0.1);
} */

.textarea-container--disabled {
  background-color: #f5f5f5;
  border-color: #d9d9d9;
  cursor: not-allowed;
}

.textarea {
  width: 100%;
  border: none;
  outline: none;
  padding: 8px;
  font-size: 14px;
  line-height: 1.6;
  color: #333;
  background: transparent;
  resize: none;
  font-family: inherit;
  box-sizing: border-box;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-thumb {
    background: linear-gradient(180deg, rgba(122, 145, 254, 0.8) 0%, rgba(40, 74, 249, 0.8) 100%);
    border-radius: 20px;
  }

  &::-webkit-scrollbar-track {
    border-radius: 20px;
    background: #cecece;
  }
}

.textarea:disabled {
  cursor: not-allowed;
  color: #999;
}

.textarea::placeholder {
  color: #999;
}

/* .paste-hint {
  position: absolute;
  bottom: 16px;
  right: 16px;
  display: flex;
  align-items: center;
  gap: 6px;
  color: #999;
  font-size: 12px;
  pointer-events: none;
  opacity: 0.7;
} */

/* .paste-hint svg {
  flex-shrink: 0;
} */

/* 当有内容或聚焦时隐藏粘贴提示 */
/* .textarea-container--focused .paste-hint {
  display: none;
} */
</style>