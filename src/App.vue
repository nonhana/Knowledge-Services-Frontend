<script setup lang="ts">
import commonHeader from './commonHeader.vue';
import commonSideBar from './commonSideBar.vue';
</script>

<template>
  <!-- el-container页面基础布局 -->
  <el-container class="el-container">
    <el-header>
      <commonHeader />
    </el-header>
    <el-container>
      <el-aside width="240px">
        <commonSideBar />
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<style scoped>
html,
body {
  width: 100%;
  margin: 0 auto;
  padding: 0;
}

.el-container .el-header {
  position: relative;
  margin: 0;
  padding: 0;
  height: auto;
}

.el-container .el-aside {
  margin: 0;
  padding: 0;
}

.el-container .el-main {
  padding: 10px;
}
</style>
