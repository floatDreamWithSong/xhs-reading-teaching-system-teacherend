<script setup lang="ts">
import Label from './Label.vue'

interface Option {
  value: string | number | boolean
  label: string
  disabled?: boolean
}

interface Props {
  label?: string
  modelValue?: string | number | boolean
  options?: Option[]
  disabled?: boolean
  required?: boolean
  direction?: 'horizontal' | 'vertical'
}

interface Emits {
  (e: 'update:modelValue', value: string | number | boolean): void
  (e: 'change', value: string | number | boolean): void
}

const props = withDefaults(defineProps<Props>(), {
  options: () => [],
  disabled: false,
  required: false,
  direction: 'horizontal'
})

const emit = defineEmits<Emits>()

const handleChange = (value: string | number | boolean) => {
  if (!props.disabled) {
    emit('update:modelValue', value)
    emit('change', value)
  }
}
</script>

<template>
  <div class="radio-group-container">
    <Label v-if="label" :label="label" :required="required">
      <template #prefix>
        <slot name="prefix"></slot>
      </template>
    </Label>
    
    <div class="radio-options" :class="`direction-${direction}`">
      <label 
        v-for="option in options" 
        :key="String(option.value)"
        class="radio-option" 
        :class="{ 
          'is-disabled': disabled || option.disabled,
          'is-checked': modelValue === option.value 
        }"
      >
        <input
          type="radio"
          :value="option.value"
          :checked="modelValue === option.value"
          :disabled="disabled || option.disabled"
          @change="handleChange(option.value)"
          class="radio-input"
        />
        <span class="radio-custom"></span>
        <span class="radio-text">{{ option.label }}</span>
      </label>
    </div>
  </div>
</template>

<style scoped>
.radio-group-container {
  display: flex;
  align-items: flex-start;
  gap: 20px;
  width: 100%;
}

.radio-options {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}

.radio-options.direction-horizontal {
  flex-direction: row;
  gap: 24px;
}

.radio-options.direction-vertical {
  flex-direction: column;
  gap: 12px;
  align-items: flex-start;
}

.radio-option {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  user-select: none;
  transition: opacity 0.2s ease;
  position: relative;
  min-height: 20px;
}

.radio-option.is-disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.radio-input {
  position: absolute;
  opacity: 0;
  pointer-events: none;
}

.radio-custom {
  --radion-size: 14px;
  width: var(--radion-size);
  height: var(--radion-size);
  border: 1.5px solid #d1d5db;
  border-radius: 50%;
  background: #fff;
  transition: all 0.2s ease;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.radio-custom::after {
  content: '';
  --center-size: 50%;
  width: var(--center-size);
  height: var(--center-size);
  border-radius: 50%;
  background: var(--primary-color);
  transform: scale(0);
  transition: transform 0.2s ease;
}

.radio-input:checked + .radio-custom {
  border-color: var(--primary-color);
}

.radio-input:checked + .radio-custom::after {
  transform: scale(1);
}

.radio-option:hover:not(.is-disabled) .radio-custom {
  border-color: var(--primary-color-300);
}

.radio-text {
  font-size: 14px;
  color: #333;
  font-weight: 400;
  line-height: 1.4;
}

.radio-option.is-disabled .radio-text {
  color: #9ca3af;
}

.direction-vertical .radio-option {
  width: 100%;
}

.direction-vertical .radio-text {
  flex: 1;
}
</style> 