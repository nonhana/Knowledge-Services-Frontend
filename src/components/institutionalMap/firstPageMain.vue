<template>
  <div name="firstPageMain" class="firstPageMain-wrap">
    <el-row class="header">
      <span class="title">制度地图</span>
      <div>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="64 64 896 896" width="13" height="13"
          style="fill: rgba(24, 144, 255, 1);margin: 0 8px 0 0;">
          <path
            d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm32 664c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V456c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v272zm-32-344a48.01 48.01 0 0 1 0-96 48.01 48.01 0 0 1 0 96z">
          </path>
        </svg>
        <span style="margin: 5px">更新时间：2020-04-21 10:34</span>
        <span class="refresh">刷新</span>
      </div>
    </el-row>

    <el-row>
      <div>
        <el-row>
          <span class="s-title">国家法律</span>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="24" height="24"
            style="fill: rgba(222, 83, 70, 1);transform:scaleY(-1)">
            <path d="M16.058 6.4l10.609 18.624h-21.333z"></path>
          </svg>
        </el-row>
        <el-menu :ellipsis="false" :default-active="activeIndex" class="el-menu-demo" mode="horizontal"
          @select="handleSelect">
          <el-menu-item index="1">已发布</el-menu-item>
          <el-menu-item index="2">待发布</el-menu-item>
          <el-menu-item index="3">讨论稿</el-menu-item>
        </el-menu>
        <el-row>

        </el-row>
        <el-pagination :pager-count="4" :page-size="5" background layout="prev, pager, next" :total="1000" />
      </div>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const activeIndex = ref('1')
const handleSelect = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
</script>

<style scoped>
.firstPageMain-wrap {
  position: relative;
  width: 100%;
}

span {
  color: #3d3d3d;
  font-size: 14px;
  font-family: SourceHanSansSC-regular;
}

.header {
  position: relative;
  height: 42px;
  border-radius: 5px;
  background-color: #E6F7FF;
  border: 1px solid #BAE7FF;
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
  color: #1890FF;
  cursor: pointer;
}
</style>