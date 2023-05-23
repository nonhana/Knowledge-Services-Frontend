<template>
  <el-row class="header">
    <span class="title">{{ props.title }}</span>
    <div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="64 64 896 896"
        width="13"
        height="13"
        style="fill: rgba(24, 144, 255, 1); margin: 0 8px 0 0"
      >
        <path
          d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm32 664c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V456c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v272zm-32-344a48.01 48.01 0 0 1 0-96 48.01 48.01 0 0 1 0 96z"
        />
      </svg>
      <span style="margin: 5px">更新时间：{{ props.update }}</span>
      <span @click="refresh" class="refresh">刷新</span>
    </div>
  </el-row>
</template>

<script setup lang="ts">
import { defineProps } from "vue";
const props = defineProps<{
  title: string;
  update: string;
}>();
// 刷新页面按钮
const refresh = () => {
  window.location.reload();
};
</script>

<style scoped>
.header {
  position: relative;
  height: 42px;
  border-radius: 5px;
  background-color: #e6f7ff;
  border: 1px solid #bae7ff;
  display: flex;
  align-items: center;
}

.title {
  color: #3d3d3d;
  font-size: 24px;
  font-family: SourceHanSansSC-regular;
  margin: 0 68px 0 13px;
}

.refresh {
  color: #1890ff;
  cursor: pointer;
}
</style>
