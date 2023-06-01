<template>
  <div class="container">
    <div
      class="circle"
      :style="{ top: circle1.y + 'px', left: circle1.x + 'px' }"
      @mousedown="startDrag($event, 'circle1')"
      @mousemove="drag($event, 'circle1')"
      @mouseup="endDrag"
    ></div>
    <div
      class="circle"
      :style="{ top: circle2.y + 'px', left: circle2.x + 'px' }"
      @mousedown="startDrag($event, 'circle2')"
      @mousemove="drag($event, 'circle2')"
      @mouseup="endDrag"
    ></div>
    <div class="line" :style="lineStyle"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";

const isDragging = ref(false);
const dragCircle = ref(null);
const circle1 = ref({ x: 100, y: 100 });
const circle2 = ref({ x: 300, y: 100 });

function startDrag(event, circle) {
  isDragging.value = true;
  dragCircle.value = circle;
}

function drag(event) {
  if (isDragging.value) {
    const containerRect = $el.getBoundingClientRect();
    const x = event.clientX - containerRect.left;
    const y = event.clientY - containerRect.top;

    if (dragCircle.value === "circle1") {
      circle1.value.x = x;
      circle1.value.y = y;
    } else if (dragCircle.value === "circle2") {
      circle2.value.x = x;
      circle2.value.y = y;
    }
  }
}

function endDrag() {
  isDragging.value = false;
  dragCircle.value = null;
}

const lineStyle = computed(() => {
  return {
    top: circle1.value.y + "px",
    left: circle1.value.x + "px",
    width: calculateDistance() + "px",
    transform: `rotate(${calculateAngle()}deg)`,
  };
});

function calculateDistance() {
  const dx = circle2.value.x - circle1.value.x;
  const dy = circle2.value.y - circle1.value.y;
  return Math.sqrt(dx * dx + dy * dy);
}

function calculateAngle() {
  const dx = circle2.value.x - circle1.value.x;
  const dy = circle2.value.y - circle1.value.y;
  return Math.atan2(dy, dx) * (180 / Math.PI);
}

onMounted(() => {
  const handleMouseUp = () => {
    if (isDragging.value) {
      endDrag();
    }
  };

  window.addEventListener("mouseup", handleMouseUp);

  // 清理事件监听器
  return () => {
    window.removeEventListener("mouseup", handleMouseUp);
  };
});
</script>

<style>
.container {
  position: relative;
  width: 400px;
  height: 200px;
  border: 1px solid #ccc;
}

.circle {
  position: absolute;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #ff0000;
  cursor: move;
}

.line {
  position: absolute;
  height: 2px;
  background-color: #000;
  transform-origin: left center;
  pointer-events: none;
}
</style>
