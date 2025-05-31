<script setup lang="ts">
import PageController from './PageController.vue';

interface Props {
  page: number,
  total: number,
  pageSize: number,
}
defineProps<Props>()

</script>
<template>
  <div class="header">
    <slot name="header"></slot>
  </div>
  <div class="card-area">
    <slot></slot>
    <div class="page-status">
      显示第{{ (page - 1) * pageSize + 1 }}至{{ page * pageSize }}条，共{{ total }}条记录
    </div>
  </div>
  <PageController :page="page" :page-size="pageSize" :total="total" />
</template>
<style scoped>
.header{
  color: #6e6e6e;
  font-size: 12px;
  padding: 0px 30px;
}
.card-area {
  padding: 0px 30px;

  .page-status {
    text-align: center;
    padding: 20px 0;
    font-weight: 400;
    font-size: 12px;
    color: #888888;
  }
}

</style>