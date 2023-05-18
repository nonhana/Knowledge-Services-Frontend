<template>
  <div name="commonHeader" class="commonHeader-wrap">
    <div class="flex ml-20px">
      <div class="bottomLine"></div>
      <div class="items">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 32 32"
          width="24"
          height="24"
          style="fill: rgba(255, 255, 255, 1)"
        >
          <path
            d="M29.714 24v2.286q0 0.464-0.339 0.804t-0.804 0.339h-25.143q-0.464 0-0.804-0.339t-0.339-0.804v-2.286q0-0.464 0.339-0.804t0.804-0.339h25.143q0.464 0 0.804 0.339t0.339 0.804zM29.714 14.857v2.286q0 0.464-0.339 0.804t-0.804 0.339h-25.143q-0.464 0-0.804-0.339t-0.339-0.804v-2.286q0-0.464 0.339-0.804t0.804-0.339h25.143q0.464 0 0.804 0.339t0.339 0.804zM29.714 5.714v2.286q0 0.464-0.339 0.804t-0.804 0.339h-25.143q-0.464 0-0.804-0.339t-0.339-0.804v-2.286q0-0.464 0.339-0.804t0.804-0.339h25.143q0.464 0 0.804 0.339t0.339 0.804z"
          />
        </svg>
      </div>
      <div class="ml-50px items">
        <span>你的项目名称</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 32 32"
          width="8"
          height="8"
          style="fill: rgba(255, 255, 255, 1)"
        >
          <path d="M15.942 25.6l-10.609-18.624h21.333z" />
        </svg>
      </div>
      <div
        class="ml-100px items"
        @click="moveLine(4)"
        @mouseenter="moveLine(0)"
        @mouseleave="moveLine(3)"
      >
        <span>应用概览</span>
      </div>
      <div
        class="ml-100px items"
        @click="moveLine(4)"
        @mouseenter="moveLine(1)"
        @mouseleave="moveLine(3)"
      >
        <span>关于我们</span>
      </div>
      <div
        class="ml-100px items"
        @click="moveLine(4)"
        @mouseenter="moveLine(2)"
        @mouseleave="moveLine(3)"
      >
        <span>帮助文档</span>
      </div>
    </div>
    <div class="flex flex-items-center user_info">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="64 64 896 896"
        width="20"
        height="20"
        style="fill: rgba(0, 0, 0, 1)"
      >
        <path
          d="M909.6 854.5L649.9 594.8C690.2 542.7 712 479 712 412c0-80.2-31.3-155.4-87.9-212.1-56.6-56.7-132-87.9-212.1-87.9s-155.5 31.3-212.1 87.9C143.2 256.5 112 331.8 112 412c0 80.1 31.3 155.5 87.9 212.1C256.5 680.8 331.8 712 412 712c67 0 130.6-21.8 182.7-62l259.7 259.6a8.2 8.2 0 0 0 11.6 0l43.6-43.5a8.2 8.2 0 0 0 0-11.6zM570.4 570.4C528 612.7 471.8 636 412 636s-116-23.3-158.4-65.6C211.3 528 188 471.8 188 412s23.3-116.1 65.6-158.4C296 211.3 352.2 188 412 188s116.1 23.2 158.4 65.6S636 352.2 636 412s-23.3 116.1-65.6 158.4z"
        />
      </svg>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="64 64 896 896"
        width="20"
        height="20"
        style="fill: rgba(0, 0, 0, 1)"
      >
        <path
          d="M816 768h-24V428c0-141.1-104.3-257.7-240-277.1V112c0-22.1-17.9-40-40-40s-40 17.9-40 40v38.9c-135.7 19.4-240 136-240 277.1v340h-24c-17.7 0-32 14.3-32 32v32c0 4.4 3.6 8 8 8h216c0 61.8 50.2 112 112 112s112-50.2 112-112h216c4.4 0 8-3.6 8-8v-32c0-17.7-14.3-32-32-32zM512 888c-26.5 0-48-21.5-48-48h96c0 26.5-21.5 48-48 48zM304 768V428c0-55.6 21.6-107.8 60.9-147.1S456.4 220 512 220c55.6 0 107.8 21.6 147.1 60.9S720 372.4 720 428v340H304z"
        />
      </svg>
      <div class="user_header">
        <img src="https://dummyimage.com/400X400" alt="" />
      </div>
      <span>用户名</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
const bottomLine = ref<number[]>([273, 273]);
const linePositionList = ref<number[]>([273, 430, 588]);
function moveLine(num: number) {
  if (num === 3) {
    bottomLine.value[0] = bottomLine.value[1];
  } else if (num === 4) {
    bottomLine.value[1] = bottomLine.value[0];
  } else {
    bottomLine.value[0] = linePositionList.value[num];
  }
}
</script>

<style scoped>
.commonHeader-wrap {
  position: relative;
  width: 100%;
  background-color: #447ed9;
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

span {
  line-height: 20px;
  color: #fff;
  font-size: 14px;
  font-family: Roboto;
}

.bottomLine {
  position: absolute;
  left: v-bind(bottomLine[0] + "px");
  top: 45px;
  width: 80px;
  height: 3px;
  background-color: #fff;
  transition: all 0.3s ease;
}

.items {
  height: 50px;
  display: flex;
  align-items: center;
  cursor: pointer;
}

.user_header {
  width: 24px;
  height: 24px;
  border-radius: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.user_header img {
  width: 24px;
  height: 24px;
  border-radius: 12px;
}

.user_info > * {
  margin: 0 20px 0 0;
  cursor: pointer;
}
</style>
