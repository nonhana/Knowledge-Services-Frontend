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
            v-for="(item, index) in cityListFilter"
            :key="index"
            :label="item"
          />
        </el-radio-group>
        <el-row class="listWindow">
          <ul>
            <li
              v-for="(item, index) in governPolicies.filter(
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
          @click="filterClick(0)"
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
          @click="filterClick(1)"
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
          @click="filterClick(2)"
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
          @click="filterClick(3)"
          v-for="item in forthChoices"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </el-row>

    <el-row type="flex" style="width: 100%; margin: 10px 0 0 0">
      <span
        @click="finalChoosing(item)"
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
import { ref, onBeforeMount } from "vue";
import institutionalMapItem from "../../little/institutionalMapItem.vue";
import {
  getProvinceCityFilterListAPI,
  getNationalMapListAPI,
  getGovPolicyMapListAPI,
  getIndustryRegulationsMapListAPI,
  getOrgSystemFilterListAPI,
  getOrgSystemMapListAPI,
} from "../../api/institutionMap";
import { ElMessage } from "element-plus";

// 预定义好所有的请求参数
let nationalMapParams = {
  page: 1,
  pageSize: 5,
  status: 0,
};
let govPolicyMapParams = {
  page: 1,
  pageSize: 5,
  positionCode: "0-0",
};
let industryRegulationsMapParams = {
  page: 1,
  pageSize: 5,
  type: 0,
};
let orgSystemFilterParams = {
  type: 0,
  choice: 0,
};
let orgSystemMapParams = {
  page: 1,
  pageSize: 8,
  type: "0-0-0-0-0",
};

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
>([]);
// 政府政策
// 菜单栏
var GovernPoliciesSelect = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
  console.log(province, city);
  province.value = provinceList.value[Number(key)];
  cityListFilter.value = cityList.value.filter(
    (obj) => obj.province === province.value
  )[0].city_list;
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
var province = ref("");
var city = ref("");
var provinceList = ref<string[]>([]);
var cityList = ref<any[]>([]);
var cityListFilter = ref<any[]>([]);
var governPolicies = ref<
  {
    title: string;
    province: string;
    city: string;
  }[]
>([]);
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
>([]);

// 单位、企业制度
let choosedProvince = ref("");
let choosedProvinceId = ref(0);
let provincesChoices = ref<any[]>([]);
let choosedSecond = ref("");
let choosedSecondId = ref(0);
let secondChoices = ref<any[]>([]);
let choosedThird = ref("");
let choosedThirdId = ref(0);
let thirdChoices = ref<any[]>([]);
let choosedForth = ref("");
let choosedForthId = ref(0);
let forthChoices = ref<any[]>([]);
let choosedFifth = ref("");
let choosedFifthId = ref(0);
let fifthChoices = ref<any[]>([]);
let institutionItemList = ref<
  {
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
  }[]
>([]);

const filterClick = (type: number) => {
  orgSystemFilterParams.type = type;
  switch (type) {
    case 0:
      orgSystemFilterParams.choice = provincesChoices.value.findIndex(
        (item: any) => item.value === choosedProvince.value
      );
      choosedProvinceId.value =
        provincesChoices.value[orgSystemFilterParams.choice].id;
      break;
    case 1:
      orgSystemFilterParams.choice = secondChoices.value.findIndex(
        (item: any) => item.value === choosedSecond.value
      );
      choosedSecondId.value =
        secondChoices.value[orgSystemFilterParams.choice].id;
      break;
    case 2:
      orgSystemFilterParams.choice = thirdChoices.value.findIndex(
        (item: any) => item.value === choosedThird.value
      );
      choosedThirdId.value =
        thirdChoices.value[orgSystemFilterParams.choice].id;
      break;
    case 3:
      orgSystemFilterParams.choice = forthChoices.value.findIndex(
        (item: any) => item.value === choosedForth.value
      );
      choosedForthId.value =
        forthChoices.value[orgSystemFilterParams.choice].id;
      break;
  }
  getOrgSystemFilterListAPI(orgSystemFilterParams).then((res: any) => {
    if (res.data.result_code === 0) {
      if (res.data.choices_list.length > 0) {
        switch (orgSystemFilterParams.type) {
          case 0:
            secondChoices.value = res.data.choices_list;
            break;
          case 1:
            thirdChoices.value = res.data.choices_list;
            break;
          case 2:
            forthChoices.value = res.data.choices_list;
            break;
          case 3:
            fifthChoices.value = res.data.choices_list;
            break;
        }
      }
    } else {
      ElMessage.error("获取单位/企业制度筛选列表失败");
    }
  });
};

const finalChoosing = (item: any) => {
  choosedFifth.value = item.value;
  choosedFifthId.value = item.id;
  orgSystemMapParams.type = `${choosedProvinceId.value}-${choosedSecondId.value}-${choosedThirdId.value}-${choosedForthId.value}-${choosedFifthId.value}`;
  getOrgSystemMapListAPI(orgSystemMapParams).then((res: any) => {
    if (res.data.result_code === 0) {
      if (res.data.org_system_laws_list.length > 0) {
        institutionItemList.value = res.data.org_system_laws_list;
      }
    } else {
      ElMessage.error("获取单位/企业制度列表失败");
    }
  });
};
// 在onBeforeMount钩子内部，获取并处理好所有的数据
onBeforeMount(() => {
  getProvinceCityFilterListAPI().then((res: any) => {
    if (res.data.result_code === 0) {
      if (res.data.province_city_list.length > 0) {
        cityList.value = res.data.province_city_list;
        provinceList.value = res.data.province_city_list.map(
          (item: any) => item.province
        );
        provincesChoices.value = res.data.province_city_list.map(
          (item: any) => {
            return {
              id: item.id,
              value: item.province,
              label: item.province,
            };
          }
        );
        city.value = cityList.value[0].city_list[0];
        cityListFilter.value = cityList.value[0].city_list;
      }
    } else {
      ElMessage.error("获取省份城市列表失败");
    }
  });

  getNationalMapListAPI(nationalMapParams).then((res: any) => {
    if (res.data.result_code === 0) {
      if (res.data.national_laws_list.length > 0) {
        nationalLaws.value = res.data.national_laws_list;
      }
    } else {
      ElMessage.error("获取国家法律列表失败");
    }
  });
  getGovPolicyMapListAPI(govPolicyMapParams).then((res: any) => {
    if (res.data.result_code === 0) {
      if (res.data.gov_policy_laws_list.length > 0) {
        governPolicies.value = res.data.gov_policy_laws_list;
      }
    } else {
      ElMessage.error("获取政府政策列表失败");
    }
  });
  getIndustryRegulationsMapListAPI(industryRegulationsMapParams).then(
    (res: any) => {
      if (res.data.result_code === 0) {
        if (res.data.industry_regulations_laws_list.length > 0) {
          industryReg.value = res.data.industry_regulations_laws_list;
        }
      } else {
        ElMessage.error("获取行业规章列表失败");
      }
    }
  );
});
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
