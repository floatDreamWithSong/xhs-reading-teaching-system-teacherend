<script setup lang="ts">
interface Props {
  text: string
}
interface Emits {
  (e: 'click'): void
}

defineProps<Props>()

const emit = defineEmits<Emits>()
function handleClick() {
  emit('click')
}
</script>

<template>
  <div class="button-container">
    <button class="button" @click="handleClick">
      {{ text }}
    </button>
  </div>
</template>

<style scoped>
.button-container {
  width: 100%;

  .button {
    display: block;
    margin: auto;
    box-shadow: 0px 2px 3.6px rgba(0, 0, 0, 0.05);
    border-radius: 10px;
    width: 240px;
    height: 45px;
    font-size: 16px;
    letter-spacing: 0.3em;
    text-align: center;
  }
}
</style>
