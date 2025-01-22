<script setup lang="ts">
// 无需额外的逻辑
</script>

<template>
  <router-view></router-view>
</template>

<style lang="less">
/* 全局样式覆盖 */
.header_box {
  background-color: var(--primary-bg) !important;
  border-bottom: 1px solid var(--border-color) !important;
}

/* Element Plus 主题覆盖 */
:root {
  /* 主要颜色 */
  --el-color-primary: var(--text-primary) !important;
  
  /* 按钮样式 */
  --el-button-bg-color: var(--primary-bg) !important;
  --el-button-border-color: var(--border-color) !important;
  --el-button-hover-bg-color: var(--hover-bg) !important;
  --el-button-hover-border-color: var(--border-dark) !important;
  --el-button-active-bg-color: var(--active-bg) !important;
  --el-button-active-border-color: var(--border-dark) !important;
}
</style>
