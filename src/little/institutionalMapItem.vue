<template>
  <div name="institutionalMapItem" class="institutionalMapItem-wrap">
    <el-row type="flex">
      <div class="item-img">
        <img :src="props.itemInfo.institution_img" />
      </div>
    </el-row>
    <el-row style="margin: 21px 0 0 25px" type="flex">
      <span class="title">{{ props.itemInfo.institution_title }}</span>
    </el-row>
    <el-row style="margin: 5px 0 0 25px" type="flex">
      <span class="info">{{ props.itemInfo.institution_info }}</span>
    </el-row>
    <el-row
      style="margin: 15px 0 0 25px; width: 80%"
      type="flex"
      justify="space-between"
    >
      <span class="date">{{ formatTime(props.itemInfo.created_date) }}</span>
      <div class="user-img">
        <img :src="props.itemInfo.poster_info.user_img" />
      </div>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from "vue";
// 接收法律item
const props = defineProps<{
  itemInfo: {
    id: number;
    institution_title: string;
    institution_img: string;
    institution_info: string;
    created_date: string;
    poster_info: {
      user_id: number;
      user_name: string;
      user_img: string;
    };
  };
}>();
// 根据提交时间，显示时间差
function formatTime(createDate: any) {
  const currentTime = new Date();
  const diffTime = currentTime.getTime() - new Date(createDate).getTime();
  const seconds = Math.floor(diffTime / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  if (days > 0) {
    return `${days}天前`;
  } else if (hours > 0) {
    return `${hours}小时前`;
  } else if (minutes > 0) {
    return `${minutes}分钟前`;
  } else {
    return "刚刚";
  }
}
</script>

<style scoped>
.institutionalMapItem-wrap {
  position: relative;
  margin: 20px;
  width: 265px;
  height: 235px;
  border-radius: 3px;
  background-color: #fff;
  cursor: pointer;
  transition: all 0.3s ease;
  overflow: hidden;
  border: 1px solid #9e9e9e;
}

.institutionalMapItem-wrap:hover {
  box-shadow: 0px 3px 8px 0px rgba(0, 0, 0, 0.16);
}

.item-img {
  width: 265px;
  height: 113px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}

.item-img img {
  width: 265px;
}

.title {
  color: rgba(16, 16, 16, 100);
  font-size: 16px;
  font-family: SourceHanSansSC-regular;
}

.info {
  color: rgba(146, 146, 146, 100);
  font-size: 14px;
  font-family: SourceHanSansSC-regular;
}

.date {
  color: rgba(146, 146, 146, 100);
  font-size: 12px;
  font-family: SourceHanSansSC-regular;
}

.user-img {
  width: 24px;
  height: 24px;
  border-radius: 11px;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

.user-img img {
  width: 24px;
}
</style>
