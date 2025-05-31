<script setup lang="ts">
import { computed } from 'vue'
import RadioGroup from './RadioGroup.vue'

interface Props {
  label?: string
  modelValue?: boolean
  disabled?: boolean
  required?: boolean
  yesText?: string
  noText?: string
}

interface Emits {
  (e: 'update:modelValue', value: boolean): void
  (e: 'change', value: boolean): void
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
  required: false,
  yesText: '是',
  noText: '否'
})

const emit = defineEmits<Emits>()

const options = computed(() => [
  { value: true, label: props.yesText },
  { value: false, label: props.noText }
])

const handleChange = (value: string | number | boolean) => {
  const boolValue = value as boolean
  emit('update:modelValue', boolValue)
  emit('change', boolValue)
}
</script>

<template>
  <RadioGroup
    :label="label"
    :modelValue="modelValue"
    :options="options"
    :disabled="disabled"
    :required="required"
    @update:modelValue="handleChange"
    @change="handleChange"
  >
    <template #prefix>
      <slot name="prefix"></slot>
    </template>
  </RadioGroup>
</template> 