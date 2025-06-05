<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  page: number
  total: number
  pageSize: number
}
const props = defineProps<Props>()

const emit = defineEmits<Emits>()
interface Emits {
  (e: 'update:page', value: number): void
}
const isValidPage = (i: number) => i > 0 && i <= Math.ceil(props.total / props.pageSize)
function handlePageChange(value: number) {
  if (!isValidPage(value)) {
    return
  }
  emit('update:page', value)
}
const pages = computed(() => {
  const page = [props.page]
  if (isValidPage(props.page - 1)) {
    page.unshift(props.page - 1)
  }
  if (isValidPage(props.page + 1)) {
    page.push(props.page + 1)
  }
  if (page.length === 3) {
    return page
  }
  if (isValidPage(props.page - 2)) {
    page.unshift(props.page - 2)
    return page
  }
  if (isValidPage(props.page + 2)) {
    page.push(props.page + 2)
    return page
  }
  return page
})
</script>

<template>
  <div class="pagination-controller">
    <div class="pre-page" @click="handlePageChange(page - 1)">
      <svg width="10" height="15" viewBox="0 0 10 15" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8.64435 14.1797L1 7.38471L8.64435 0.589729" stroke="#BDBDBD" stroke-width="1.27406" />
      </svg>
    </div>
    <div v-if="total" class="page-wrapper">
      <div
        v-for="i in pages" :key="i" class="page-number" :class="{ 'page-active': i === page }"
        @click="handlePageChange(i)"
      >
        {{ i }}
      </div>
    </div>
    <div class="next-page" @click="handlePageChange(page + 1)">
      <svg width="10" height="15" viewBox="0 0 10 15" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1.35565 0.589844L9 7.38482L1.35565 14.1798" stroke="#BDBDBD" stroke-width="1.27406" />
      </svg>
    </div>
  </div>
</template>

<style scoped>
.pagination-controller {
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;

  .pre-page {
    cursor: pointer;
  }

  .next-page {
    cursor: pointer;
  }

  .page-wrapper {
    display: flex;
    align-items: center;
    gap: 20px;
    margin: 0px 20px;

    .page-number {
      --size: 35px;
      width: var(--size);
      height: var(--size);
      border-radius: 1000px;
      background-color: #f0f0f0;
      color: #bdbdbd;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 15px;
      transition: all ease 0.2s;

      &:not(.page-active):hover {
        cursor: pointer;
        transform: scale(1.05);
      }

      &.page-active {
        background-color: var(--primary-color-300);
        font-size: 17px;
        color: #fff;
        --size: 40px;
      }
    }
  }
}
</style>
