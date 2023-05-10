<script setup lang="ts">
import commonHeader from './commonHeader.vue';
</script>

<template>
  <el-row style="width: 100%;">
    <commonHeader />
  </el-row>
  <el-row style="width: 100%;">
    <router-view></router-view>
  </el-row>
</template>

<style scoped></style>
