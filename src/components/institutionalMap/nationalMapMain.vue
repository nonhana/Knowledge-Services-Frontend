<template>
  <div name="nationalMapMain" class="nationalMapMain-wrap">
    <mainHeader title="国家法律地图" update="2020-04-21 10:31" />

    <el-row style="width: 100%; margin: 30px 0 0 0">
      <div class="filter-title-list" style="width: 110px">
        <div>
          <span>类别</span>
        </div>
        <div>
          <span>发文单位</span>
        </div>
        <div>
          <span>时间</span>
        </div>
        <div>
          <span>更多</span>
        </div>
      </div>
      <div class="filter-line-list">
        <el-row class="filter-line">
          <span
            @click="addFilter(0, item, index)"
            v-for="(item, index) in filterItems.type"
            :key="index"
            :class="{ active: selectedIndex[0] === index }"
            >{{ item }}</span
          >
        </el-row>

        <el-row class="filter-line">
          <span
            @click="addFilter(1, item, index)"
            v-for="(item, index) in filterItems.issuingAgency"
            :key="index"
            :class="{ active: selectedIndex[1] === index }"
            >{{ item }}</span
          >
        </el-row>

        <el-row class="filter-line">
          <span
            @click="addFilter(2, item, index)"
            v-for="(item, index) in filterItems.time"
            :key="index"
            :class="{ active: selectedIndex[2] === index }"
            >{{ item }}</span
          >
        </el-row>

        <el-row class="filter-line" justify="start">
          <div style="margin: 0 0 0 40px">
            <el-select v-model="choosedVersion" placeholder="请选择省份">
              <el-option
                v-for="item in versionChoices"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </div>
          <div>
            <el-select
              v-model="choosedPublish"
              style="margin: 0 0 0 30px"
              placeholder="请选择发布状态"
            >
              <el-option
                v-for="item in publishChoices"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </div>
          <div>
            <el-input
              style="margin: 0 0 0 30px"
              v-model="keyword"
              placeholder="关键字"
            />
          </div>
          <div>
            <el-button
              type="primary"
              style="margin: 0 0 0 60px"
              @click="search()"
              >搜索</el-button
            >
          </div>
        </el-row>
      </div>
    </el-row>

    <el-row style="width: 100%; padding: 30px">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="id" label="编号" width="120" />
        <el-table-column prop="level" label="法律级别" width="100" />
        <el-table-column prop="title" label="名称" width="210" />
        <el-table-column prop="issuingAuthority" label="发文单位" width="150" />
        <el-table-column prop="type" label="业务类别" width="150" />
        <el-table-column prop="status" label="状态" width="150" />
        <el-table-column prop="publishedDate" label="发布时间" />
        <el-table-column>
          <span class="details">查看详情</span>
        </el-table-column>
      </el-table>
    </el-row>

    <el-row style="width: 100%; display: flex; justify-content: end">
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[4, 8, 12]"
        :small="small"
        :disabled="disabled"
        :background="background"
        :pager-count="9"
        layout=" prev, pager, next, sizes, jumper"
        :total="400"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </el-row>

    <el-row>
      <institutionalMapDetails :item-info="detailsInfo" />
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import institutionalMapDetails from "../../little/institutionalMapDetails.vue";
const filterItems = ref({
  type: [
    "不限",
    "综合类",
    "预算管理",
    "收入管理",
    "支出业务",
    "政府采购资产管理",
    "建设项目",
    "合同管理",
    "财务与会计",
    "其他",
  ],
  issuingAgency: [
    "不限",
    "全国人大常委会国务院",
    "国卫办",
    "中国人民银行",
    "其他",
  ],
  time: ["不限", "一年内", "二年内", "十年内", "十年以上"],
});
// 筛选的参数对象
interface filterParams {
  type: string;
  issuingAgency: string;
  time: string;
  version: string;
  publish: number;
  keyword: string;
}
let paramsList: filterParams = {
  type: filterItems.value.type[0],
  issuingAgency: filterItems.value.issuingAgency[0],
  time: filterItems.value.time[0],
  version: "",
  publish: 0,
  keyword: "",
};
const versionChoices = [
  {
    value: "浙江省",
    label: "浙江省",
  },
  {
    value: "北京市",
    label: "北京市",
  },
  {
    value: "上海市",
    label: "上海市",
  },
  {
    value: "广东省",
    label: "广东省",
  },
  {
    value: "天津市",
    label: "天津市",
  },
  {
    value: "重庆市",
    label: "重庆市",
  },
  {
    value: "辽宁省",
    label: "辽宁省",
  },
  {
    value: "江苏省",
    label: "江苏省",
  },
  {
    value: "湖北省",
    label: "湖北省",
  },
  {
    value: "四川省",
    label: "四川省",
  },
  {
    value: "陕西省",
    label: "陕西省",
  },
  {
    value: "河北省",
    label: "河北省",
  },
  {
    value: "河南省",
    label: "河南省",
  },
  {
    value: "山东省",
    label: "山东省",
  },
  {
    value: "山西省",
    label: "山西省",
  },
  {
    value: "福建省",
    label: "福建省",
  },
  {
    value: "湖南省",
    label: "湖南省",
  },
  {
    value: "安徽省",
    label: "安徽省",
  },
  {
    value: "江西省",
    label: "江西省",
  },
  {
    value: "黑龙江省",
    label: "黑龙江省",
  },
  {
    value: "吉林省",
    label: "吉林省",
  },
  {
    value: "云南省",
    label: "云南省",
  },
  {
    value: "贵州省",
    label: "贵州省",
  },
  {
    value: "广西壮族自治区",
    label: "广西壮族自治区",
  },
  {
    value: "西藏自治区",
    label: "西藏自治区",
  },
  {
    value: "新疆维吾尔自治区",
    label: "新疆维吾尔自治区",
  },
  {
    value: "甘肃省",
    label: "甘肃省",
  },
  {
    value: "青海省",
    label: "青海省",
  },
  {
    value: "宁夏回族自治区",
    label: "宁夏回族自治区",
  },
  {
    value: "内蒙古自治区",
    label: "内蒙古自治区",
  },
  {
    value: "海南省",
    label: "海南省",
  },
];
let choosedVersion = ref<string>("");
const publishChoices = [
  {
    label: "已发布",
    value: "已发布",
  },
  {
    label: "未发布",
    value: "未发布",
  },
];
let choosedPublish = ref<string>("");
let keyword = ref<string>("");
let selectedIndex = ref<number[]>([0, 0, 0]);
// 点击某筛选标签，进行筛选条件的赋值
const addFilter = (choice: number, item: string, index: number) => {
  switch (choice) {
    case 0:
      selectedIndex.value[0] = index;
      paramsList.type = item;
      break;
    case 1:
      selectedIndex.value[1] = index;
      paramsList.issuingAgency = item;
      break;
    case 2:
      selectedIndex.value[2] = index;
      paramsList.time = item;
      break;
  }
};
// 根据筛选条件+搜索关键字，来搜索某制度
const search = () => {
  paramsList.publish = publishChoices.findIndex((item) => {
    return item.value === choosedPublish.value;
  });
  console.log(paramsList);
};
// 筛选出的法律信息表格
const tableData = [
  {
    id: "F1",
    level: "国家",
    title: "中华人民共和国会计法",
    issuingAuthority: "国家财政部",
    type: "综合管理",
    status: "已发布",
    publishedDate: "2020-04-21 10:31:00",
  },
  {
    id: "F1",
    level: "国家",
    title: "中华人民共和国预算法",
    issuingAuthority: "国家财政部",
    type: "综合管理",
    status: "已发布",
    publishedDate: "2020-04-21 10:31:00",
  },
  {
    id: "F1",
    level: "国家",
    title: "中华人民共和国合同法",
    issuingAuthority: "国家财政部",
    type: "综合管理",
    status: "已发布",
    publishedDate: "2020-04-21 10:31:00",
  },
  {
    id: "F1",
    level: "国家",
    title: "中华人民共和国公司法",
    issuingAuthority: "国家财政部",
    type: "综合管理",
    status: "已发布",
    publishedDate: "2020-04-21 10:31:00",
  },
];

// 分页器参数
const currentPage = ref(4);
const pageSize = ref(4);
const small = ref(false);
const background = ref(true);
const disabled = ref(false);
const handleSizeChange = (val: number) => {
  console.log(`${val} items per page`);
};
const handleCurrentChange = (val: number) => {
  console.log(`current page: ${val}`);
};

// 传给institutionalMapDetails的参数
const detailsInfo = {
  institution_id: 0,
  institution_title: "中华人民共和国会计法",
  institution_details: [
    {
      details_title: "一、总则",
      details_content:
        "为了规范会计行为，保证会计信息的真实、准确、完整，维护社会经济秩序，促进社会主义市场经济的健康发展，制定本法。",
      details_child: [],
    },
    {
      details_title: "二、条款",
      details_content:
        "法律内容法律内容法律内容法律内容法律内容法律内容法律内容法律内容法律内容法律内容法律内容法律内容法律内容法律内容法律内容法律内容法律内容法律内容法律内容法律内容",
      details_child: [
        {
          child_title: "规定1",
          child_content:
            "法律内容法律内容法律内容法律内容法律内容法律内容法律内容法律内容法律内容法律内容法律内容法律内容法律内容法律内容法律内容法律内容法律内容法律内容法律内容法律内容",
        },
      ],
    },
  ],
};
</script>

<style scoped lang="less">
.nationalMapMain-wrap {
  position: relative;
  width: 1300px;
}
.filter-title-list {
  position: relative;
  width: 110px;
  height: 220px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  div {
    height: 30px;
    display: flex;
    align-items: center;
    span {
      color: rgba(0, 0, 0, 1);
      font-size: 18px;
      font-family: SourceHanSansSC-regular;
      font-weight: bold;
    }
  }
}
.filter-line-list {
  position: relative;
  width: 85%;
  height: 220px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  .filter-line {
    width: 100%;
    height: 30px;
    display: flex;
    align-items: center;
    span {
      margin: 0 0 0 40px;
      cursor: pointer;
    }
    span:hover {
      color: #447ed9;
    }
  }
}
.active {
  color: #447ed9;
}
.details {
  color: #447ed9;
  cursor: pointer;
}
</style>
