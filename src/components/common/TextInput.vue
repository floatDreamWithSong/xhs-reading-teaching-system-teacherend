<script setup lang="ts">
import Label from './Label.vue'

interface Props {
  label?: string
  placeholder?: string
  modelValue?: string
  disabled?: boolean
  required?: boolean
  type?: string
}

interface Emits {
  (e: 'update:modelValue', value: string): void
  (e: 'blur'): void
  (e: 'focus'): void
  (e: 'input', value: string): void
}

const props = withDefaults(defineProps<Props>(), {
  type: 'text',
})

const emit = defineEmits<Emits>()

function handleInput(event: Event) {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', target.value)
  emit('input', target.value)
}

function handleBlur() {
  emit('blur')
}

function handleFocus() {
  emit('focus')
}
</script>

<template>
  <div class="text-input-container">
    <Label v-if="label" :label="label" :required="required" />
    <div class="input-wrapper">
      <input
        :value="modelValue" :placeholder="placeholder" :disabled="disabled" :type="type" class="input-field"
        :class="{ 'has-suffix': $slots.suffix }" @input="handleInput" @blur="handleBlur" @focus="handleFocus"
      >
      <div v-if="$slots.suffix" class="suffix-slot">
        <slot name="suffix" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.text-input-container {
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;

  .input-wrapper {
    position: relative;
    flex: 1;
    display: flex;
    align-items: center;
  }

  .input-field {
    width: 100%;
    height: 40px;
    padding: 0 1rem;
    border: 1.5px solid transparent;
    border-radius: 7px;
    font-size: 1rem;
    color: #333;
    background: var(--form-item-linear-gradient);
    transition: all 0.2s ease;
    outline: none;
    position: relative;

    &.has-suffix {
      padding-right: 48px;
    }

    &::placeholder {
      color: #a0aec0;
    }

    &:disabled {
      background:
        linear-gradient(#f7fafc, #f7fafc) padding-box,
        linear-gradient(135deg, #e2e8f0 0%, #cbd5e0 100%) border-box;
      color: #a0aec0;
      cursor: not-allowed;
    }
  }

  .suffix-slot {
    position: absolute;
    right: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }
}
</style>
