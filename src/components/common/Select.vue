<script setup lang="ts">
import { Down } from '../icons'
import Label from './Label.vue'
import { ref, computed } from 'vue'

interface Option {
  value: string | number
  label: string
}

interface Props {
  label?: string
  placeholder?: string
  modelValue?: string | number
  options?: Option[]
  disabled?: boolean
  required?: boolean
}

interface Emits {
  (e: 'update:modelValue', value: string | number): void
  (e: 'change', value: string | number): void
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: '请选择',
  options: () => [],
  disabled: false,
  required: false
})

const emit = defineEmits<Emits>()

const isOpen = ref(false)
const selectRef = ref<HTMLDivElement>()

// 显示的文本
const displayText = computed(() => {
  if (props.modelValue) {
    const option = props.options.find(opt => opt.value === props.modelValue)
    return option?.label || ''
  }
  return props.placeholder
})

// 切换下拉状态
const toggleDropdown = () => {
  if (!props.disabled) {
    isOpen.value = !isOpen.value
  }
}

// 选择选项
const selectOption = (option: Option) => {
  emit('update:modelValue', option.value)
  emit('change', option.value)
  isOpen.value = false
}

// 点击外部关闭下拉
const handleClickOutside = (event: Event) => {
  if (selectRef.value && !selectRef.value.contains(event.target as Node)) {
    isOpen.value = false
  }
}

// 监听外部点击
if (typeof window !== 'undefined') {
  document.addEventListener('click', handleClickOutside)
}
</script>

<template>
  <div class="select-container">
    <Label v-if="label" :label="label" :required="required" />

    <div ref="selectRef" class="select-wrapper" :class="{ 'is-open': isOpen, 'is-disabled': disabled }">

      <div class="select-trigger" @click="toggleDropdown">
        <span class="select-text" :class="{ 'is-placeholder': !modelValue }">
          {{ displayText }}
        </span>
        <Down class="select-arrow" :class="{ 'is-open': isOpen }" />
      </div>

      <transition name="dropdown">
        <div v-if="isOpen" class="select-dropdown">
          <div v-for="option in options" :key="option.value" class="select-option"
            :class="{ 'is-selected': option.value === modelValue }" @click="selectOption(option)">
            {{ option.label }}
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<style scoped>
.select-container {
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
}

.select-wrapper {
  position: relative;
  flex: 1;
}

.select-trigger {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 40px;
  padding: 0 1rem;
  border: 1.5px solid transparent;
  border-radius: 7px;
  font-size: 1rem;
  color: #333;
  background: var(--form-item-linear-gradient);
  cursor: pointer;
  transition: all 0.2s ease;
  outline: none;
}

.select-text {
  flex: 1;
  text-align: left;
  color: #333;
}

.select-text.is-placeholder {
  color: #a0aec0;
}

.select-arrow {
  color: #a0aec0;
  transition: transform 0.2s ease;
  flex-shrink: 0;
  stroke: #6e6e6e;
}

.select-arrow.is-open {
  transform: rotate(180deg);
}

.select-wrapper:hover:not(.is-disabled) .select-trigger {
  background: var(--form-item-linear-gradient)
}

.select-wrapper.is-open .select-trigger {
  background:
    linear-gradient(#fff, #fff) padding-box,
    linear-gradient(to left, #4299e1 0%, #7A91FE 100%) border-box;
  box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.1);
}

.select-wrapper.is-disabled .select-trigger {
  background:
    linear-gradient(#f7fafc, #f7fafc) padding-box,
    linear-gradient(135deg, #e2e8f0 0%, #cbd5e0 100%) border-box;
  color: #a0aec0;
  cursor: not-allowed;
}

.select-dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  z-index: 1000;
  margin-top: 4px;
  background: #fff;
  border: 1px solid #e2e8f0;
  border-radius: 7px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  max-height: 200px;
  overflow-y: auto;
}

.select-option {
  padding: 12px 16px;
  cursor: pointer;
  transition: background-color 0.2s ease;
  border-bottom: 1px solid #f7fafc;
}

.select-option:hover {
  background-color: #f7fafc;
}

.select-option.is-selected {
  background-color: #e6f3ff;
  color: var(--primary-color);
  font-weight: 500;
}

.select-option:last-child {
  border-bottom: none;
}

/* 下拉动画 */
.dropdown-enter-active,
.dropdown-leave-active {
  transition: all 0.2s ease;
}

.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>