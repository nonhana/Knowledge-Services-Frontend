<template>
  <!-- 编辑规则弹窗 -->
  <div @click="cancelStep">
    <el-dialog
      v-model="editDialogVisible"
      :before-close="editHandleClose"
      class="editDialog"
    >
      <el-row type="flex">
        <div>
          <span class="editTitle">业务规则</span>
        </div>
        <div style="margin: 0 0 0 10px">
          <el-input
            style="width: 800px"
            v-model="rule_content"
            :autosize="{ minRows: 5, maxRows: 5 }"
            type="textarea"
            placeholder="请输入相应的规则内容"
          />
        </div>
      </el-row>

      <el-row type="flex" style="margin: 20px 0 0 0">
        <div>
          <span class="editTitle">业务流程</span>
        </div>
        <div style="margin: 0 0 0 10px; width: 800px">
          <el-row>
            <el-button>导入/更新流程图</el-button>
          </el-row>
          <el-row style="margin: 40px 0 0 0">
            <div
              style="
                width: 100px;
                height: 100px;
                padding: 10px 0;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                align-items: center;
              "
            >
              <span class="editSecondTitle">采购人</span>
              <span class="editSecondTitle">审核人</span>
            </div>
            <div style="margin: 0 0 0 20px" class="stepVisable">
              <div>
                <div
                  @dblclick="editStep(index)"
                  @mouseenter="stepHovering = true"
                  @mouseleave="stepHovering = false"
                  @click="choosed_step = index"
                  v-for="(item, index) in stepList"
                  :key="index"
                  :class="{
                    'step-active': choosed_step === index,
                    'top-step': item.type === 0,
                    'bottom-step': item.type === 1,
                  }"
                >
                  <input
                    style="width: 100%"
                    v-if="stepInput === index"
                    type="text"
                    v-model="item.name"
                  />
                  <span v-else>{{ item.name }}</span>
                </div>
              </div>
            </div>
            <div
              style="
                width: 100px;
                height: 100px;
                padding: 10px 0;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                align-items: center;
              "
            >
              <div style="display: flex">
                <div
                  @click="stepActions(0, 0)"
                  style="background-color: #5677fc"
                  class="circle-button"
                >
                  <span>+</span>
                </div>
                <div
                  @click="stepActions(1, choosed_step)"
                  style="background-color: #000"
                  class="circle-button"
                >
                  <span>-</span>
                </div>
              </div>
              <div style="display: flex">
                <div
                  @click="stepActions(0, 1)"
                  style="background-color: #5677fc"
                  class="circle-button"
                >
                  <span>+</span>
                </div>
                <div
                  @click="stepActions(1, choosed_step)"
                  style="background-color: #000"
                  class="circle-button"
                >
                  <span>-</span>
                </div>
              </div>
            </div>
          </el-row>
        </div>
      </el-row>

      <el-row type="flex" style="margin: 20px 0 0 0; align-items: center">
        <div>
          <span class="editTitle">节点规则</span>
        </div>
        <div style="display: flex">
          <div
            @click="nodeRuleActions(0)"
            style="background-color: #5677fc"
            class="circle-button"
          >
            <span>+</span>
          </div>
          <div
            @click="nodeRuleActions(1)"
            style="background-color: #000"
            class="circle-button"
          >
            <span>-</span>
          </div>
        </div>
        <div class="stepRules">
          <div>
            <el-popover
              v-for="(item, index) in stepRulesList"
              :key="index"
              placement="bottom"
              :title="`第${index}节点相关规则`"
              :width="200"
              trigger="click"
            >
              <template #reference>
                <div class="stepRules-item">
                  <span>节点{{ index }}规</span>
                </div>
              </template>
              <!-- <input
                v-if="targetRule === index"
                type="text"
                v-model="item.content"
                @focusout="targetRule = -1"
              /> -->
              <el-input
                v-if="targetRule === index"
                v-model="item.content"
                :autosize="{ minRows: 1, maxRows: 4 }"
                type="textarea"
                placeholder="请输入相关的规则"
                @focusout="targetRule = -1"
              />
              <span v-else @click="editRule(index)">{{ item.content }}</span>
            </el-popover>
          </div>
        </div>
      </el-row>

      <el-row type="flex" style="margin: 20px 0 0 0; align-items: center">
        <div>
          <span class="editTitle">单据规则</span>
        </div>
        <div style="display: flex">
          <div
            @click="receiptRuleActions(0)"
            style="background-color: #5677fc"
            class="circle-button"
          >
            <span>+</span>
          </div>
          <div
            @click="receiptRuleActions(1)"
            style="background-color: #000"
            class="circle-button"
          >
            <span>-</span>
          </div>
        </div>
        <div class="receiptRules">
          <div>
            <el-popover
              v-for="(item, index) in receiptRulesList"
              :key="String(index)"
              placement="bottom"
              :width="200"
              trigger="click"
            >
              <template #reference>
                <div class="receiptRules-item">
                  <span>{{ item.title }}</span>
                </div>
              </template>
              <div class="receiptRules-details">
                <el-popover
                  v-for="(detailItem, detailIndex) in item.content"
                  :key="`${index}-${detailIndex}`"
                  placement="right"
                  title="规则内容"
                  :width="200"
                  trigger="click"
                >
                  <template #reference>
                    <div class="receiptRules-details-item">
                      <input
                        style="width: 120px"
                        v-if="targetDetails === `${index}-${detailIndex}`"
                        type="text"
                        v-model="detailItem.details"
                        @focusout="targetDetails = ''"
                      />
                      <span
                        @dblclick="editDetails(`${index}-${detailIndex}`)"
                        v-else
                        >{{ detailItem.details }}</span
                      >
                      <el-switch v-model="detailItem.status" />
                    </div>
                  </template>
                  <input
                    style="width: 120px"
                    v-if="targetMessage === `${index}-${detailIndex}`"
                    type="text"
                    v-model="detailItem.message"
                    @focusout="targetMessage = ''"
                  />
                  <span
                    @dblclick="editMessage(`${index}-${detailIndex}`)"
                    v-else
                    >{{ detailItem.message }}</span
                  >
                </el-popover>
                <div
                  style="
                    margin: 5px 0 0 0;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                  "
                >
                  <div>
                    <span>备注</span>
                  </div>
                  <div style="display: flex">
                    <div
                      @click="detailsActions(0, index)"
                      style="background-color: #5677fc"
                      class="circle-button"
                    >
                      <span>+</span>
                    </div>
                    <div
                      @click="detailsActions(1, index)"
                      style="background-color: #000"
                      class="circle-button"
                    >
                      <span>-</span>
                    </div>
                  </div>
                </div>
              </div>
            </el-popover>
          </div>
        </div>
      </el-row>

      <template #footer>
        <span class="dialog-footer">
          <el-button round @click="editDialogActions(0)">取消</el-button>
          <el-button round type="primary" @click="editDialogActions(1)">
            确定
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps, watch, defineEmits } from "vue";
import { ElMessageBox } from "element-plus";
// 编辑规则弹窗相关
const props = defineProps<{
  visable: boolean;
}>();
const emit = defineEmits(["update:changeVisable"]);
const editDialogVisible = ref<boolean>(false);
// 监听prop的变化
watch(
  () => props.visable,
  (newValue) => {
    editDialogVisible.value = newValue;
  }
);
// 当editDialogVisible变化时触发事件
watch(editDialogVisible, (newValue) => {
  // 发送事件通知父组件变化
  emit("update:changeVisable", newValue);
});
let rule_content = ref<string>(
  " 第一条 为了规范会计行为，保证会计资料真实、完整，加强经济管理和财务管理，提高经济效益，维护社会主义市场经济秩序，制定本法。    第二条 国家机关、社会团体、公司、企业、事业单位和其他组织（以下统称单位）必须依照本法办理会计事务。    第三条 各单位必须依法设置会计账簿，并保证其真实、完整。    第四条 单位负责人对本单位的会计工作和会计资料的真实性、完整性负责。    第五条 会计机构、会计人员依照本法规定进行会计核算，"
);
const editHandleClose = (done: () => void) => {
  ElMessageBox.confirm("您的规则暂未添加，确认关闭？")
    .then(() => {
      done();
    })
    .catch(() => {});
};
const editDialogActions = (num: number) => {
  switch (num) {
    case 0:
      editDialogVisible.value = false;
      break;
    case 1:
      editDialogVisible.value = false;
      break;
  }
};
let stepList = ref<
  {
    name: string;
    type: number;
  }[]
>([
  {
    name: "采购申请",
    type: 0,
  },
  {
    name: "采购审核",
    type: 1,
  },
  {
    name: "填写采购单",
    type: 0,
  },
]);
let choosed_step = ref<number>(-1);
let stepHovering = ref<boolean>(false);
const cancelStep = () => {
  if (!stepHovering.value) {
    choosed_step.value = -1;
    stepInput.value = -1;
  }
};
const stepActions = (type: number, index: number) => {
  switch (type) {
    case 0:
      stepInput.value = stepList.value.length;
      stepList.value.push({
        name: "新建步骤",
        type: index,
      });
      break;
    case 1:
      if (choosed_step.value === -1) {
        ElMessageBox.alert("请先选择要删除的步骤");
        return;
      } else {
        ElMessageBox.confirm("确定要删除该步骤吗？")
          .then(() => {
            console.log("确定删除");
            stepList.value.splice(index, 1);
          })
          .catch(() => {
            console.log("取消删除");
          });
      }
      break;
  }
};
let stepInput = ref<number>(-1);
const editStep = (index: number) => {
  stepInput.value = index;
};

// 节点规则相关数据
let stepRulesList = ref<
  {
    content: string;
    type: number;
  }[]
>([
  {
    content: "节点规则内容",
    type: 0,
  },
  {
    content: "节点规则内容",
    type: 1,
  },
  {
    content: "节点规则内容",
    type: 0,
  },
]);
const nodeRuleActions = (type: number) => {
  switch (type) {
    case 0:
      stepRulesList.value.push({
        content: "新建规则内容",
        type: 0,
      });
      break;
    case 1:
      ElMessageBox.confirm("确定要删除掉最后一个节点规则？").then(() => {
        stepRulesList.value.splice(stepRulesList.value.length - 1, 1);
      });
  }
};
let targetRule = ref<number>(-1);
const editRule = (index: number) => {
  targetRule.value = index;
};

// 单据规则相关数据
const receiptRulesList = ref<
  {
    title: string;
    content: {
      details: string;
      message: string;
      status: boolean;
    }[];
    type: number;
  }[]
>([
  {
    title: "采购申请单",
    content: [
      {
        details: "采购申请单内容",
        message: "规则内容规则内容规则内容规则内容",
        status: false,
      },
      {
        details: "采购申请单内容",
        message: "规则内容规则内容规则内容规则内容",
        status: false,
      },
      {
        details: "采购申请单内容",
        message: "规则内容规则内容规则内容规则内容",
        status: false,
      },
      {
        details: "采购申请单内容",
        message: "规则内容规则内容规则内容规则内容",
        status: false,
      },
    ],
    type: 0,
  },
  {
    title: "采购审核内容",
    content: [
      {
        details: "采购审核内容",
        message: "规则内容规则内容规则内容规则内容",
        status: false,
      },
    ],
    type: 1,
  },
  {
    title: "采购单内容",
    content: [
      {
        details: "采购单内容",
        message: "规则内容规则内容规则内容规则内容",
        status: false,
      },
    ],
    type: 0,
  },
]);
let targetDetails = ref<string>("");
const receiptRuleActions = (type: number) => {
  switch (type) {
    case 0:
      receiptRulesList.value.push({
        title: "新建规则",
        content: [
          {
            details: "新建规则内容",
            message: "新建规则内容",
            status: false,
          },
        ],
        type: 0,
      });
      break;
    case 1:
      ElMessageBox.confirm("确定要删除掉最后一个节点规则？").then(() => {
        receiptRulesList.value.splice(receiptRulesList.value.length - 1, 1);
      });
  }
};
const editDetails = (index: string) => {
  targetDetails.value = index;
};
const detailsActions = (type: number, index: number) => {
  switch (type) {
    case 0:
      receiptRulesList.value[index].content.push({
        details: "新建规则内容",
        message: "新建规则内容",
        status: false,
      });
      break;
    case 1:
      ElMessageBox.confirm("确定要删除掉最后一个节点规则？").then(() => {
        receiptRulesList.value[index].content.splice(
          receiptRulesList.value[index].content.length - 1,
          1
        );
      });
  }
};
let targetMessage = ref<string>("");
const editMessage = (index: string) => {
  targetMessage.value = index;
};
</script>

<style scoped lang="less">
.circle-button {
  width: 20px;
  height: 20px;
  margin: 0 0 0 5px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  span {
    color: #fff;
    font-size: 16px;
    margin: -2px 0 0 0; /* 微调 */
  }
}
:deep(.editDialog.el-dialog) {
  width: 971px;
  padding: 0 0 50px 0;
  border-radius: 10px;
  background-color: rgba(235, 240, 236, 100);
  border: 1px solid rgba(15, 0, 0, 100);
}
:deep(.editDialog .el-dialog__body) {
  color: rgba(96, 98, 102, 100);
  line-height: 24px;
  font-size: 14px;
  font-family: Helvetica-regular;
}
:deep(.editDialog .el-dialog__header) {
  margin: 0;
  padding: 10px 20px;
  height: 25px;
  line-height: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: move;
}
:deep(.editDialog .el-dialog__title) {
  color: rgba(48, 49, 51, 100);
  font-size: 18px;
  font-family: Helvetica-regular;
}
:deep(.editDialog .el-dialog__headerbtn .el-dialog__close) {
  color: rgba(48, 49, 51, 100);
}
:deep(.editDialog .el-dialog__headerbtn:hover .el-dialog__close) {
  color: rgba(48, 49, 51, 100);
}
:deep(.editDialog .el-dialog__headerbtn) {
  top: 0px;
}
:deep(.editDialog .el-dialog__footer) {
  position: absolute;
  bottom: 0px;
  left: 80%;
}

.editTitle {
  color: rgba(16, 16, 16, 100);
  font-size: 20px;
  font-family: SourceHanSansSC-bold;
  font-weight: bold;
}

.editSecondTitle {
  color: rgba(16, 16, 16, 100);
  font-size: 20px;
  font-family: Roboto;
}

.stepVisable {
  position: relative;
  top: -20px;
  width: 578px;
  overflow-x: scroll;
  height: 118px;
  padding: 20px 0;
  border: 1px solid #9e9e9e;
  border-radius: 10px;
  display: flex;
  justify-content: start;
  align-items: center;
  div {
    display: flex;
    justify-content: start;
    align-items: center;
    div {
      cursor: pointer;
      width: 60px;
      height: 60px;
      padding: 10px;
      border-radius: 50%;
      border: 3px solid rgba(161, 174, 164, 100);
      background-color: rgba(255, 255, 255, 100);
      display: flex;
      justify-content: center;
      align-items: center;
      span {
        color: rgba(15, 1, 1, 100);
        text-align: center;
        font-size: 20px;
        font-family: Roboto;
      }
    }
    .top-step {
      margin: -60px 0 0 0;
    }
    .bottom-step {
      margin: 60px 0 0 0;
    }
    .step-active {
      background-color: beige;
    }
  }
}

.stepRules {
  margin: 0 0 0 60px;
  width: 700px;
  overflow-x: scroll;
  display: flex;
  div {
    display: flex;
    justify-content: start;
    align-items: center;
    .stepRules-item {
      cursor: pointer;
      margin: 0 0 0 20px;
      width: 70px;
      height: 40px;
      border-radius: 5px;
      background-color: rgba(23, 148, 21, 100);
      border: 1px solid rgba(5, 5, 5, 8);
      display: flex;
      justify-content: center;
      align-items: center;
      span {
        color: rgba(255, 255, 255, 100);
        font-size: 14px;
        font-family: PingFangSC-regular;
      }
    }
  }
}

.receiptRules {
  margin: 0 0 0 60px;
  width: 700px;
  overflow-x: scroll;
  display: flex;
  div {
    display: flex;
    justify-content: start;
    align-items: center;
    .receiptRules-item {
      margin: 0 0 0 20px;
      cursor: pointer;
      width: max-content;
      padding: 10px;
      background-color: #fff;
      border: 1px solid rgba(187, 187, 187, 100);
      span {
        color: rgba(16, 16, 16, 100);
        font-size: 20px;
        font-family: Roboto;
      }
    }
  }
}
.receiptRules-details {
  display: flex;
  flex-direction: column;
  .receiptRules-details-item {
    transition: all 0.3s ease;
    cursor: pointer;
    margin: 0 0 5px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    span {
      cursor: pointer;
      color: rgba(90, 94, 102, 100);
      font-size: 16px;
      font-family: Helvetica-regular;
    }
  }
  .receiptRules-details-item:hover {
    background-color: rgb(164, 255, 255);
  }
}
</style>
