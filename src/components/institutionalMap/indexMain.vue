<template>
  <div name="firstPageMain" class="firstPageMain-wrap">
    <mainHeader title="制度地图" update="2020-04-21 10:34" />

    <el-row style="width: 100%" type="flex" justify="space-between">
      <div style="width: 316px">
        <el-row style="padding: 10px 0 0 10px">
          <span class="s-title">国家法律</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 32 32"
            width="24"
            height="24"
            style="fill: rgba(222, 83, 70, 1); transform: scaleY(-1)"
          >
            <path d="M16.058 6.4l10.609 18.624h-21.333z" />
          </svg>
        </el-row>
        <el-menu
          :ellipsis="false"
          :default-active="'1'"
          class="el-menu-demo"
          mode="horizontal"
          @select="nationalLawsSelect"
        >
          <el-menu-item index="1">已发布</el-menu-item>
          <el-menu-item index="2">待发布</el-menu-item>
          <el-menu-item index="3">讨论稿</el-menu-item>
        </el-menu>
        <el-row class="listWindow">
          <ul>
            <li
              v-for="(item, index) in nationalLaws.filter(
                (obj) => obj.type === showNationalLaws
              )"
              :key="index"
            >
              <span>{{ item.title }}</span>
            </li>
          </ul>
        </el-row>
        <el-pagination
          v-model:current-page="nationalLawscurrentPage"
          v-model:page-size="nationalLawspageSize"
          :page-sizes="[100, 200, 300, 400]"
          :background="true"
          :pager-count="4"
          layout=" prev, pager, next"
          :total="800"
          @size-change="nationalLawsSizeChange"
          @current-change="nationalLawsCurrentChange"
        />
      </div>
      <div style="width: 316px">
        <el-row style="padding: 10px 0 0 10px">
          <span class="s-title">政府政策</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 32 32"
            width="24"
            height="24"
            style="fill: rgba(222, 83, 70, 1); transform: scaleY(-1)"
          >
            <path d="M16.058 6.4l10.609 18.624h-21.333z" />
          </svg>
        </el-row>
        <el-menu
          :ellipsis="true"
          :default-active="'0'"
          class="el-menu-demo"
          mode="horizontal"
          @select="GovernPoliciesSelect"
        >
          <el-menu-item
            v-for="(item, index) in provinceList"
            :index="String(index)"
            :key="index"
            >{{ item }}</el-menu-item
          >
        </el-menu>
        <el-radio-group size="small" v-model="city" @change="cityChange">
          <el-radio-button
            v-for="(item, index) in cityList.filter(
              (obj) => obj.province === province
            )[0].list"
            :key="index"
            :label="item"
          />
        </el-radio-group>
        <el-row class="listWindow">
          <ul>
            <li
              v-for="(item, index) in GovernPolicies.filter(
                (obj) => obj.province === province && obj.city === city
              )"
              :key="index"
            >
              <span>{{ item.title }}</span>
            </li>
          </ul>
        </el-row>
        <el-pagination
          v-model:current-page="GovernPoliciescurrentPage"
          v-model:page-size="GovernPoliciespageSize"
          :page-sizes="[100, 200, 300, 400]"
          :background="true"
          :pager-count="4"
          layout=" prev, pager, next"
          :total="800"
          @size-change="GovernPoliciesSizeChange"
          @current-change="GovernPoliciesCurrentChange"
        />
      </div>
      <div style="width: 316px">
        <el-row style="padding: 10px 0 0 10px">
          <span class="s-title">行业规章</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 32 32"
            width="24"
            height="24"
            style="fill: rgba(222, 83, 70, 1); transform: scaleY(-1)"
          >
            <path d="M16.058 6.4l10.609 18.624h-21.333z" />
          </svg>
        </el-row>
        <el-menu
          :ellipsis="true"
          :default-active="'1'"
          class="el-menu-demo"
          mode="horizontal"
          @select="industryRegSelect"
        >
          <el-menu-item index="1">医疗行业</el-menu-item>
          <el-menu-item index="2">行政行业</el-menu-item>
          <el-menu-item index="3">教育行业</el-menu-item>
          <el-menu-item index="4">其他行业</el-menu-item>
        </el-menu>
        <el-row class="listWindow">
          <ul>
            <li
              v-for="(item, index) in industryReg.filter(
                (obj) => obj.type === showIndustryReg
              )"
              :key="index"
            >
              <span>{{ item.title }}</span>
            </li>
          </ul>
        </el-row>
        <el-pagination
          v-model:current-page="industryRegcurrentPage"
          v-model:page-size="industryRegpageSize"
          :page-sizes="[100, 200, 300, 400]"
          :background="true"
          :pager-count="4"
          layout=" prev, pager, next"
          :total="800"
          @size-change="industryRegSizeChange"
          @current-change="industryRegCurrentChange"
        />
      </div>
    </el-row>

    <el-row
      type="flex"
      style="width: 100%; align-items: center; margin: 58px 0 22px 0"
    >
      <span style="margin: 0 0 0 25px" class="t-title">单位/企业制度</span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 32 32"
        width="24"
        height="24"
        style="fill: rgba(222, 83, 70, 1); transform: scaleY(-1)"
      >
        <path d="M16.058 6.4l10.609 18.624h-21.333z" />
      </svg>
    </el-row>

    <el-row type="flex" style="width: 100%">
      <el-select
        v-model="choosedProvince"
        style="margin: 0 30px"
        placeholder="请选择省份"
      >
        <el-option
          v-for="item in provincesChoices"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
      <el-select
        v-model="choosedSecond"
        style="margin: 0 30px"
        placeholder="请选择二级筛选条件"
      >
        <el-option
          v-for="item in secondChoices"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
      <el-select
        v-model="choosedThird"
        style="margin: 0 30px"
        placeholder="请选择三级筛选条件"
      >
        <el-option
          v-for="item in thirdChoices"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
      <el-select
        v-model="choosedForth"
        style="margin: 0 30px"
        placeholder="请选择四级筛选条件"
      >
        <el-option
          v-for="item in forthChoices"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </el-row>

    <el-row type="flex" style="width: 100%; margin: 10px 0 0 0">
      <span
        @click="choosedFifth = item.value"
        :class="{ active: choosedFifth === item.value }"
        class="fifth-choices"
        v-for="(item, index) in fifthChoices"
        :key="index"
        >{{ item.value }}</span
      >
    </el-row>

    <el-row type="flex" style="width: 100%">
      <institutionalMapItem
        v-for="(item, index) in institutionItemList"
        :key="index"
        :item-info="item"
      />
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import institutionalMapItem from "../../little/institutionalMapItem.vue";
// 国家法律
// 菜单栏
var nationalLawsSelect = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
  showNationalLaws.value = Number(key) - 1;
};
// 分页器
var nationalLawscurrentPage = ref(1);
var nationalLawspageSize = ref(100);
var nationalLawsSizeChange = (val: number) => {
  console.log(`${val} items per page`);
};
var nationalLawsCurrentChange = (val: number) => {
  console.log(`current page: ${val}`);
};
var showNationalLaws = ref<number>(0);
var nationalLaws = ref<
  {
    title: string;
    type: number;
  }[]
>([
  {
    title: "中华人民共和国会计法（2017年）",
    type: 0,
  },
  {
    title: "中华人民共和国预算法（2014年）",
    type: 0,
  },
  {
    title: "中华人民共和国合同法（1999年）",
    type: 0,
  },
  {
    title: "中华人民共和国公司法",
    type: 0,
  },
  {
    title: "中华人民共和国银行法",
    type: 0,
  },
  {
    title: "中华人民共和国会计法（2017年）",
    type: 1,
  },
  {
    title: "中华人民共和国预算法（2014年）",
    type: 1,
  },
  {
    title: "中华人民共和国合同法（1999年）",
    type: 1,
  },
  {
    title: "中华人民共和国公司法",
    type: 1,
  },
  {
    title: "中华人民共和国银行法",
    type: 1,
  },
  {
    title: "中华人民共和国会计法（2017年）",
    type: 2,
  },
  {
    title: "中华人民共和国预算法（2014年）",
    type: 2,
  },
  {
    title: "中华人民共和国合同法（1999年）",
    type: 2,
  },
  {
    title: "中华人民共和国公司法",
    type: 2,
  },
  {
    title: "中华人民共和国银行法",
    type: 2,
  },
]);
// 政府政策
// 菜单栏
var GovernPoliciesSelect = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
  console.log(province, city);
  province.value = provinceList.value[Number(key)];
};
// 分页器
var GovernPoliciescurrentPage = ref(1);
var GovernPoliciespageSize = ref(100);
var GovernPoliciesSizeChange = (val: number) => {
  console.log(`${val} items per page`);
};
var GovernPoliciesCurrentChange = (val: number) => {
  console.log(`current page: ${val}`);
};
var province = ref("浙江省");
var city = ref("杭州");
const provinceList = ref<string[]>([
  "浙江省",
  "福建省",
  "广东省",
  "四川省",
  "江苏省",
  "河北省",
]);
const cityList = ref<any[]>([
  {
    province: "浙江省",
    list: [
      "杭州",
      "宁波",
      "温州",
      "绍兴",
      "湖州",
      "嘉兴",
      "金华",
      "衢州",
      "台州",
      "丽水",
      "舟山",
    ],
  },
  {
    province: "福建省",
    list: [
      "福州",
      "厦门",
      "莆田",
      "三明",
      "泉州",
      "漳州",
      "南平",
      "龙岩",
      "宁德",
    ],
  },
  {
    province: "广东省",
    list: [
      "广州",
      "深圳",
      "珠海",
      "汕头",
      "韶关",
      "佛山",
      "江门",
      "湛江",
      "茂名",
      "肇庆",
      "惠州",
      "梅州",
      "汕尾",
      "河源",
      "阳江",
      "清远",
      "东莞",
      "中山",
      "潮州",
      "揭阳",
      "云浮",
    ],
  },
  {
    province: "四川省",
    list: [
      "成都",
      "自贡",
      "攀枝花",
      "泸州",
      "德阳",
      "绵阳",
      "广元",
      "遂宁",
      "内江",
      "乐山",
      "南充",
      "眉山",
      "宜宾",
      "广安",
      "达州",
      "雅安",
      "巴中",
      "资阳",
      "阿坝藏族羌族自治州",
      "甘孜藏族自治州",
      "凉山彝族自治州",
    ],
  },
  {
    province: "江苏省",
    list: [
      "南京",
      "无锡",
      "徐州",
      "常州",
      "苏州",
      "南通",
      "连云港",
      "淮安",
      "盐城",
      "扬州",
      "镇江",
      "泰州",
      "宿迁",
    ],
  },
  {
    province: "河北省",
    list: [
      "石家庄",
      "唐山",
      "秦皇岛",
      "邯郸",
      "邢台",
      "保定",
      "张家口",
      "承德",
      "沧州",
      "廊坊",
      "衡水",
    ],
  },
]);
var GovernPolicies = ref<
  {
    title: string;
    province: string;
    city: string;
  }[]
>([
  {
    title: "中华人民共和国会计法（2017年）",
    province: "浙江省",
    city: "杭州",
  },
  {
    title: "中华人民共和国会计法（2017年）",
    province: "浙江省",
    city: "杭州",
  },
  {
    title: "中华人民共和国会计法（2017年）",
    province: "浙江省",
    city: "杭州",
  },
  {
    title: "中华人民共和国会计法（2017年）",
    province: "浙江省",
    city: "宁波",
  },
  {
    title: "中华人民共和国会计法（2017年）",
    province: "浙江省",
    city: "宁波",
  },
  {
    title: "中华人民共和国会计法（2017年）",
    province: "浙江省",
    city: "宁波",
  },
  {
    title: "中华人民共和国会计法（2017年）",
    province: "福建省",
    city: "福州",
  },
  {
    title: "中华人民共和国会计法（2017年）",
    province: "福建省",
    city: "福州",
  },
  {
    title: "中华人民共和国会计法（2017年）",
    province: "福建省",
    city: "福州",
  },
]);
function cityChange(city: string) {
  console.log(city);
}
// 行业规章
// 菜单栏
var industryRegSelect = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
  showIndustryReg.value = Number(key) - 1;
};
// 分页器
var industryRegcurrentPage = ref(1);
var industryRegpageSize = ref(100);
var industryRegSizeChange = (val: number) => {
  console.log(`${val} items per page`);
};
var industryRegCurrentChange = (val: number) => {
  console.log(`current page: ${val}`);
};
var showIndustryReg = ref<number>(0);
var industryReg = ref<
  {
    title: string;
    type: number;
  }[]
>([
  {
    title: "中华人民共和国会计法（2017年）",
    type: 0,
  },
  {
    title: "中华人民共和国预算法（2014年）",
    type: 0,
  },
  {
    title: "中华人民共和国合同法（1999年）",
    type: 0,
  },
  {
    title: "中华人民共和国公司法",
    type: 0,
  },
  {
    title: "中华人民共和国银行法",
    type: 0,
  },
  {
    title: "中华人民共和国会计法（2017年）",
    type: 1,
  },
  {
    title: "中华人民共和国预算法（2014年）",
    type: 1,
  },
  {
    title: "中华人民共和国合同法（1999年）",
    type: 1,
  },
  {
    title: "中华人民共和国公司法",
    type: 1,
  },
  {
    title: "中华人民共和国银行法",
    type: 1,
  },
  {
    title: "中华人民共和国会计法（2017年）",
    type: 2,
  },
  {
    title: "中华人民共和国预算法（2014年）",
    type: 2,
  },
  {
    title: "中华人民共和国合同法（1999年）",
    type: 2,
  },
  {
    title: "中华人民共和国公司法",
    type: 2,
  },
  {
    title: "中华人民共和国银行法",
    type: 2,
  },
  {
    title: "中华人民共和国会计法（2017年）",
    type: 3,
  },
  {
    title: "中华人民共和国预算法（2014年）",
    type: 3,
  },
  {
    title: "中华人民共和国合同法（1999年）",
    type: 3,
  },
  {
    title: "中华人民共和国公司法",
    type: 3,
  },
  {
    title: "中华人民共和国银行法",
    type: 3,
  },
]);

// 单位、企业制度
const choosedProvince = ref("");
const provincesChoices = [
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
const choosedSecond = ref("");
const secondChoices = [
  {
    value: "事业单位",
    label: "事业单位",
  },
  {
    value: "政府部门",
    label: "政府部门",
  },
  {
    value: "教育机构",
    label: "教育机构",
  },
  {
    value: "企业",
    label: "企业",
  },
];
const choosedThird = ref("");
const thirdChoices = [
  {
    value: "浙江省卫健委",
    label: "浙江省卫健委",
  },
  {
    value: "浙江省财务局",
    label: "浙江省财务局",
  },
  {
    value: "浙江省林业局",
    label: "浙江省林业局",
  },
];
const choosedForth = ref("");
const forthChoices = [
  {
    value: "浙江大学第一附属医院",
    label: "浙江大学第一附属医院",
  },
  {
    value: "浙江省邵逸夫医院",
    label: "浙江省邵逸夫医院",
  },
  {
    value: "浙江省同德医院",
    label: "浙江省同德医院",
  },
  {
    value: "浙江省人民医院",
    label: "浙江省人民医院",
  },
];
const choosedFifth = ref("");
const fifthChoices = [
  {
    value: "浙江大学附属一院",
    label: "浙江大学附属一院",
  },
  {
    value: "浙江省人民医院",
    label: "浙江省人民医院",
  },
  {
    value: "浙江大学附属二院",
    label: "浙江大学附属二院",
  },
  {
    value: "浙江省邵逸夫医院",
    label: "浙江省邵逸夫医院",
  },
  {
    value: "浙江省中医院",
    label: "浙江省中医院",
  },
  {
    value: "温州医科大学附属眼视光医院",
    label: "温州医科大学附属眼视光医院",
  },
  {
    value: "温州医科大学附属口腔医院",
    label: "温州医科大学附属口腔医院",
  },
  {
    value: "浙江省同德医院",
    label: "浙江省同德医院",
  },
  {
    value: "浙江中医药大学附属第二医院",
    label: "浙江中医药大学附属第二医院",
  },
  {
    value: "浙江中医药大学附属第三医院",
    label: "浙江中医药大学附属第三医院",
  },
  {
    value: "温州医科大学附属第二医院",
    label: "温州医科大学附属第二医院",
  },
];
const institutionItemList = ref<
  {
    institution_id: number;
    institution_title: string;
    institution_img: string;
    institution_info: string;
    created_date: string;
    poster_info: {
      user_id: number;
      user_name: string;
      user_img: string;
    };
  }[]
>([
  {
    institution_id: 1,
    institution_title: "制度标题",
    institution_img: "https://dummyimage.com/400X400",
    institution_info: "制度描述信息",
    created_date: "2023-05-16 16:03:22",
    poster_info: {
      user_id: 1,
      user_name: "用户名称",
      user_img: "https://dummyimage.com/400X400",
    },
  },
  {
    institution_id: 2,
    institution_title: "制度标题",
    institution_img: "https://dummyimage.com/400X400",
    institution_info: "制度描述信息",
    created_date: "2023-05-16 16:03:22",
    poster_info: {
      user_id: 2,
      user_name: "用户名称",
      user_img: "https://dummyimage.com/400X400",
    },
  },
  {
    institution_id: 0,
    institution_title: "制度标题",
    institution_img: "https://dummyimage.com/400X400",
    institution_info: "制度描述信息",
    created_date: "2023-05-16 16:03:22",
    poster_info: {
      user_id: 0,
      user_name: "用户名称",
      user_img: "https://dummyimage.com/400X400",
    },
  },
  {
    institution_id: 0,
    institution_title: "制度标题",
    institution_img: "https://dummyimage.com/400X400",
    institution_info: "制度描述信息",
    created_date: "2023-05-16 16:03:22",
    poster_info: {
      user_id: 0,
      user_name: "用户名称",
      user_img: "https://dummyimage.com/400X400",
    },
  },
  {
    institution_id: 0,
    institution_title: "制度标题",
    institution_img: "https://dummyimage.com/400X400",
    institution_info: "制度描述信息",
    created_date: "2023-05-16 16:03:22",
    poster_info: {
      user_id: 0,
      user_name: "用户名称",
      user_img: "https://dummyimage.com/400X400",
    },
  },
  {
    institution_id: 0,
    institution_title: "制度标题",
    institution_img: "https://dummyimage.com/400X400",
    institution_info: "制度描述信息",
    created_date: "2023-05-16 16:03:22",
    poster_info: {
      user_id: 0,
      user_name: "用户名称",
      user_img: "https://dummyimage.com/400X400",
    },
  },
  {
    institution_id: 0,
    institution_title: "制度标题",
    institution_img: "https://dummyimage.com/400X400",
    institution_info: "制度描述信息",
    created_date: "2023-05-16 16:03:22",
    poster_info: {
      user_id: 0,
      user_name: "用户名称",
      user_img: "https://dummyimage.com/400X400",
    },
  },
  {
    institution_id: 0,
    institution_title: "制度标题",
    institution_img: "https://dummyimage.com/400X400",
    institution_info: "制度描述信息",
    created_date: "2023-05-16 16:03:22",
    poster_info: {
      user_id: 0,
      user_name: "用户名称",
      user_img: "https://dummyimage.com/400X400",
    },
  },
]);
</script>

<style scoped>
.firstPageMain-wrap {
  position: relative;
  width: 1300px;
}

span {
  color: #3d3d3d;
  font-size: 14px;
  font-family: SourceHanSansSC-regular;
}

.s-title {
  color: rgba(46, 46, 46, 100);
  font-size: 20px;
  font-family: SourceHanSansSC-regular;
}

.listWindow li {
  cursor: pointer;
  margin-bottom: 13px;
  color: #3d3d3d;
  font-size: 14px;
  font-family: SourceHanSansSC-regular;
  font-weight: bold;
  transition: all 0.3s ease;
}

.listWindow li:hover span {
  color: #447ed9;
}

.t-title {
  color: rgba(0, 0, 0, 1);
  font-size: 24px;
  font-family: SourceHanSansSC-regular;
}

.fifth-choices {
  margin: 5px 20px;
  cursor: pointer;
}

.fifth-choices:hover {
  color: #447ed9;
}

.active {
  color: #447ed9;
}
</style>
