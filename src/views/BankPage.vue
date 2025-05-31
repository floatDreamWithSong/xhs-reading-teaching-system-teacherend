<script setup lang="ts">
import BigButton from '@/components/common/BigButton.vue';
import Select from '@/components/common/Select.vue';
import TextInput from '@/components/common/TextInput.vue';
import { Search } from '@/components/icons';

</script>

<template>
  <div class="content-header">
    题库管理
  </div>
  <div class="card-area filter-options">
    <Select label="题型:" placeholder="全部题型" />
    <Select label="难度:" placeholder="全部难度" />
    <TextInput label="搜索:" placeholder="题目关键词">
      <template #suffix>
        <Search />
      </template>
    </TextInput>
  </div>
  <div class="card-area filter-result">
    <div class="card-header">
      <div class="card-header-title">

      </div>
    </div>
  </div>
  <BigButton text="新建题目" />
</template>
<style scoped>
.card-area {
  padding: 18px 12px;

  &.filter-options {
    margin-top: 12px;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 25px;
  }

  &.filter-result {
    margin-bottom: 58px;
  }
}

.create-question-button-container {
  margin-top: 58px;

  .create-question-button {
    display: block;
    margin: auto;
  }
}
</style>
