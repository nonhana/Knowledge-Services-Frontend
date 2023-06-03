<template>
  <div class="index">
    <loginWindow @login-success="loginSuccess" />
  </div>
</template>

<script setup lang="ts">
import { defineEmits } from "vue";
import loginWindow from "../../components/login/loginWindow.vue";
const emits = defineEmits(["routeChange"]);
const loginSuccess = (arg: any) => {
  emits("routeChange", arg);
};
</script>

<style scoped>
.index {
  width: 100%;
}
</style>
