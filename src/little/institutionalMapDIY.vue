<template>
  <div name="institutionalMapDIY" class="institutionalMapDIY-wrap">
    <el-row type="flex" justify="center" style="margin: 20px 0 40px 0">
      <span class="title">{{ itemInfo.institution_title }}</span>
    </el-row>
    <el-row type="flex" justify="start">
      <div style="margin: 0 50px 0 0">
        <el-menu default-active="0" class="el-menu-vertical-demo">
          <template v-for="(item, index) in itemInfo.institution_details">
            <el-sub-menu
              v-if="item.details_child.length > 0"
              :key="`submenu${index}`"
              :index="String(index)"
            >
              <template #title>
                <span>{{ item.details_title }}</span>
              </template>
              <el-menu-item
                v-for="(child, child_index) in item.details_child"
                :key="child_index"
                :index="`${index}-${child_index}`"
                @click="content = child.child_content"
              >
                {{ child.child_title }}
              </el-menu-item>
            </el-sub-menu>
            <el-menu-item
              v-else
              :key="`menuitem${index}`"
              :index="String(index)"
              @click="content = item.details_content"
            >
              {{ item.details_title }}
            </el-menu-item>
          </template>
        </el-menu>
        <div style="margin: 26px 0 0 0; display: flex; align-items: center">
          <el-select
            style="width: 140px"
            v-model="choosedRule"
            placeholder="规则类型选择"
          >
            <el-option
              v-for="item in ruleChoices"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
          <div
            @click="dialogVisible = true"
            style="background-color: #5677fc"
            class="circle-button"
          >
            <span>+</span>
          </div>
          <div style="background-color: #000" class="circle-button">
            <span>-</span>
          </div>
        </div>
        <div style="margin: 26px 0 0 0" class="input">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            fill="none"
            version="1.1"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <defs>
              <clipPath id="master_svg0_124_1212">
                <rect x="0" y="0" width="24" height="24" rx="0" />
              </clipPath>
            </defs>
            <g clip-path="url(#master_svg0_124_1212)">
              <g>
                <path
                  d="M9,3C12.3,3,15,5.7,15,9C15,12.3,12.3,15,9,15C5.7,15,3,12.3,3,9C3,5.7,5.7,3,9,3ZM9,1.5C4.85625,1.5,1.5,4.85625,1.5,9C1.5,13.1437,4.85625,16.5,9,16.5C13.1438,16.5,16.5,13.1437,16.5,9C16.5,4.85625,13.1438,1.5,9,1.5ZM15.9,14.85L14.8313,15.9187L21.2063,22.2937L22.275,21.225L15.9,14.85Z"
                  fill="#3D3D3D"
                  fill-opacity="1"
                />
              </g>
            </g>
          </svg>
          <input placeholder="关键字搜索" v-model="keywords" type="text" />
        </div>
      </div>
      <div style="display: flex">
        <div class="content">
          <span>
            {{ content }}
          </span>
        </div>
        <table>
          <tr v-for="(item, index) in referenceData" :key="index">
            <td style="width: 50px">参考{{ index }}</td>
            <td>{{ item }}</td>
          </tr>
          <!-- 添加更多行和单元格，根据需要重复上述<tr>和<td>的结构 -->
        </table>
      </div>
    </el-row>
  </div>

  <!-- 新建规则弹窗，在el-dialog外层套一层div，便可以进行样式穿透 -->
  <div>
    <el-dialog
      v-model="dialogVisible"
      title="规则内容"
      :before-close="handleClose"
      class="aboutDialog"
    >
      <span>This is a message</span>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">Cancel</el-button>
          <el-button type="primary" @click="dialogVisible = false">
            Confirm
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps, onMounted } from "vue";
import ElMessageBox from "element-plus";
// 用props来接收父组件传递过来的数据
const props = defineProps<{
  itemInfo: {
    institution_id: number;
    institution_title: string;
    institution_details: {
      details_title: string;
      details_content: string;
      details_child: {
        child_title: string;
        child_content: string;
      }[];
    }[];
  };
}>();
let content = ref<string>(
  props.itemInfo.institution_details[0].details_content
);
// 选择规则类别进行添加/删除
const ruleChoices = [
  {
    label: "描述性规则",
    value: "描述性规则",
  },
  {
    label: "业务规则",
    value: "业务规则",
  },
];
let choosedRule = ref<string>("");
// 关键词搜索
let keywords = ref<string>("");
// 参考数据
const referenceData = [
  "中华人民共和国会计法",
  "中华人民共和国公司法",
  "中华人民共和国合同法",
  "中华人民共和国预算法",
  "中华人民共和国政府采购法实施条例",
  "中华人民共和国政府采购法实施条例",
  "中华人民共和国政府采购法实施条例",
  "公立医院预决算报告制度暂行规定",
  "电子文件管理暂行办法",
  "党政机关公务用车管理办法",
];
// 弹窗相关参数
const dialogVisible = ref<boolean>(false);
const handleClose = (done: () => void) => {
  ElMessageBox.confirm("确定要关闭当前页面吗？")
    .then(() => {
      done();
    })
    .catch(() => {
      // catch error
    });
};
// 生命周期钩子
onMounted(() => {
  console.log(props.itemInfo);
});
</script>

<style scoped lang="less">
.institutionalMapDIY-wrap {
  position: relative;
  width: 1300px;
}
.title {
  color: #000;
  font-size: 18px;
  font-family: SourceHanSansSC-regular;
  font-weight: bold;
}
.circle-button {
  width: 20px;
  height: 20px;
  margin: 0 0 0 5px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  cursor: pointer;
  span {
    font-size: 16px;
    margin: -2px 0 0 0; /* 微调 */
  }
}
.input {
  width: 180px;
  height: 40px;
  padding: 10px;
  border-radius: 2px;
  background-color: rgba(250, 250, 250, 100);
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0px 2px 2px 0px rgba(0, 0, 0, 0.24);
  input {
    width: 150px;
    height: 48px;
    border: none;
    outline: none;
    background-color: transparent;
    color: rgba(16, 16, 16, 100);
    font-size: 14px;
    text-align: center;
    font-family: Roboto;
  }
}
.content {
  width: 720px;
  height: 400px;
  padding: 10px;
  border: 1px solid rgba(187, 187, 187, 100);
  overflow-y: scroll;
  span {
    line-height: 20px;
    color: rgba(136, 136, 136, 100);
    font-size: 14px;
    text-align: left;
    font-family: Microsoft Yahei;
    word-break: break-all;
  }
}

table {
  border-collapse: collapse; /* 合并单元格边框 */
  width: 230px; /* 表格宽度 */
  height: 100%; /* 表格高度 */
  overflow-y: scroll; /* 垂直滚动条 */
}

td {
  border: 1px solid #9e9e9e; /* 单元格边框样式 */
  text-align: center; /* 水平居中 */
  vertical-align: middle; /* 垂直居中 */
  padding: 5px; /* 内间距5px */
  font-size: 14px; /* 字体大小 */
  font-family: Microsoft Yahei; /* 字体 */
}

.dialog-footer button:first-child {
  margin-right: 10px;
}

:deep(.el-dialog) {
  width: 580px;
  height: 300px;
  border-radius: 4px;
  background-color: rgba(255, 255, 255, 100);
  text-align: center;
}
</style>
