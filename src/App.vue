<script setup lang="ts">
import { ref, onMounted } from "vue";
import commonHeader from "./commonHeader.vue";
import commonSideBar from "./commonSideBar.vue";
import index from "./pages/login/index.vue";
let isLogin = ref<boolean>(
  window.location.pathname === "/login" || window.location.pathname === "/"
);

const routeChange = (arg: any) => {
  isLogin.value = !arg;
};

onMounted(() => {
  console.log(isLogin);
});
</script>

<template>
  <el-container v-if="!isLogin" class="el-container">
    <el-header>
      <commonHeader />
    </el-header>
    <el-container>
      <el-aside width="240px">
        <commonSideBar />
      </el-aside>
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </el-container>
  <div v-else class="login-wrap">
    <index @route-change="routeChange" />
  </div>
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
  margin: 0 0 30px 0;
}

.login-wrap {
  position: absolute;
  width: 100%;
  height: 100%;
  background-image: linear-gradient(to right, lightgray 1px, transparent 1px),
    linear-gradient(to bottom, lightgray 1px, transparent 1px);
  background-size: 60px 60px; /* 调整这个值可以改变网格的大小 */
  background-position: center;
  background-color: #f5f5f5;
}
</style>
