<script setup lang="ts">
interface Props {
  required?: boolean,
  label?: string
}
defineProps<Props>()
</script>

<template>
  <span class="label">
    <span v-if="$slots.prefix" class="prefix-icon">
      <slot name="prefix"></slot>
    </span>
    <span v-if="required" class="required">*</span>
    <span class="label-text">{{ label }}</span>
  </span>
</template>

<style scoped>
.label {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #333;
  font-size: 14px;
  font-weight: 500;
  white-space: nowrap;
  min-width: fit-content;
  position: relative;

  .prefix-icon {
    display: flex;
    align-items: center;
    font-size: 16px;
  }

  .required {
    position: absolute;
    transform: translateX(-8px);
    color: #f56565;
  }

  .label-text {
    flex: 1;
  }
}
</style>