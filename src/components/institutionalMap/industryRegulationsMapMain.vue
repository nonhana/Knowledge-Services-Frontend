<template>
  <div
    name="industryRegulationsMapMain"
    class="industryRegulationsMapMain-wrap"
  >
    <mainHeader title="行业规章地图" update="2020-04-21 10:31" />

    <el-row style="width: 100%; margin: 30px 0 0 0">
      <div class="filter-title-list" style="width: 110px">
        <div>
          <span>类别</span>
        </div>
        <div>
          <span>行业</span>
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
            v-for="(item, index) in filterItems.industry"
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
        <el-table-column prop="level" label="政策级别" width="100" />
        <el-table-column prop="title" label="名称" width="210" />
        <el-table-column prop="agency" label="部门" width="150" />
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
    "综合管理",
    "预算管理",
    "收入管理",
    "支出管理",
    "政府采购",
    "资产管理",
    "建设管理",
    "合同管理",
  ],
  industry: ["不限", "医疗", "教育", "其他"],
  time: ["不限", "一年内", "三年内", "十年内", "十年以上"],
});
// 筛选的参数对象
interface filterParams {
  type: string;
  industry: string;
  time: string;
  version: string;
  publish: number;
  keyword: string;
}
let paramsList: filterParams = {
  type: filterItems.value.type[0],
  industry: filterItems.value.industry[0],
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
      paramsList.industry = item;
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
    level: "行业",
    title: "浙江省医院财务制度实施办法",
    agency: "卫健委",
    type: "综合管理",
    status: "已发布",
    publishedDate: "2020-04-21 10:31:00",
  },
  {
    id: "F2",
    level: "行业",
    title: "财政厅行政事业单位会计工作的意见",
    agency: "财政厅",
    type: "综合管理",
    status: "已发布",
    publishedDate: "2020-04-21 10:31:00",
  },
  {
    id: "F3",
    level: "行业",
    title: "省级医疗单位医疗服务价格管理责任追究制度",
    agency: "财政厅",
    type: "预算管理",
    status: "已发布",
    publishedDate: "2020-04-21 10:31:00",
  },
  {
    id: "F4",
    level: "行业",
    title: "浙江省省级医疗机构医疗费用管理若干规定",
    agency: "卫健委",
    type: "预算管理",
    status: "已发布",
    publishedDate: "2020-04-21 10:31:00",
  },
];

// 分页器参数
const currentPage = ref(1);
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
  institution_title: "浙江省医院财务制度实施办法",
  institution_details: [
    {
      details_title: "一、总则",
      details_content:
        "第一章   总  则    第一条  为规范医疗收费电子票据管理，根据《中华人民共和国电子签名法》、《财政票据管理办法》（财政部令第70号）、《会计档案管理办法》（财政部 国家档案局令第79号）等有关法律法规规章规定，结合我省实际，制定本办法。    第二条  本办法所称的医疗收费电子票据（以下简称“电子票据”）是指财政部门监管的，非营利性医疗卫生机构（以下简称“医疗机构”）为患者提供门诊、急诊、急救、住院、体检等医疗服务取得医疗收入时，运用计算机和信息网络技术开具、存储、传输和接收的数字电文形式的电子凭证。    第三条  电子票据基本特征是以数字信息代替纸质文件、以电子签名代替手工签章，通过网络手段进行传输流转，通过计算机等电子载体进行存储保管。    第四条  符合相关法规、制度要求，生成开具的电子票据是单位财务收支和会计核算的电子原始凭证，是财政、卫生健康、医保、审计、纪检监察等部门进行监督检查的重要依据,是按照国家有关规定申请医疗费用报销的有效凭证，与纸质财政票据有同等效力。    第五条  在全面施行财政票据无纸化前，医疗机构应提供电子票据换开纸质票据的服务，实行按需取票（包括窗口取票、自助取票）。    第六条  各级财政部门是电子票据的主管部门，按照职责分工和管理权限负责电子票据的制样、赋码、监制签章、存储、查验、核销、归档等工作。各医疗机构的财务部门是单位内部电子票据管理的职能部门，统一负责本单位电子票据各项工作。         第二章  医疗收费电子票据的要素和样式    第七条  电子票据名称为《浙江省医疗收费票据（电子）》，列入浙江省财政票据票种目录，其可视化样式分为门诊和住院两种（附件1、附件2）    第八条  电子票据的基本要素包括票据名称、票据代码、票据号码、收款类别、交款人、收款项目、收款金额、收款单位(开票单位)、收款人(开票人)、开票日期、收款（开票）单位电子签名、财政部门电子签名等。         第三章   医疗收费电子票据管理系统    第九条  医疗收费电子票据管理系统（以下简称“电子票据管理系统”），由省本级和设区市为单位负责统一建设，电子票据管理系统设财政端和用户服务端。各相关单位要协同做好系统开发和服务器、网络等硬件建设，协调做好与医疗机构业务系统融合对接。按照财政票据管理职责分工，建立省、市、县（市）三级管理体系。    省级负责全省电子票据制样管理；负责全省年度电子票据号段分配管理；负责全省电子票据归档备份和提供跨区域电子票据真伪查验服务;负责省本级医疗机构电子票据领用情况的实时动态监控和票据流转各环节的日常管理。    市级按照省分配的电子票据号段，负责本行政区域内县（市、区）和市本级医疗机构电子票据号段分配管理；负责编制市本级和所辖县（市、区）医疗机构电子票据赋码、核销表归档并上传省级备份；负责本行政区域内电子票据真伪查验服务；负责本级医疗机构收费电子票据领用情况的实时动态监控和票据流转各环节的日常管理。    县（市、区）按照市级分配号段，负责本县（市、区）医疗机构收费电子票据号段分发管理；负责编制本县（市、区）医疗机构收费电子票据核销表归档并上传市级平台；负责本级医疗机构收费电子票据领用情况的实时动态监控和票据流转各环节的日常管理。    第十条  强化技术标准规范，电子票据传输、存储、归档等采用的技术标准应符合《中华人民共和国电子签名法》的规定和财政部关于电子票据签名的相关要求。    第十一条  按照财政部编制的《财政电子票据公共服务接口规范》，建立浙江省电子票据数据接口标准和信息共享，确保财政、卫生健康、医保、医疗机构、交款人（报销单位）之间在线互联互认。预留与浙江省政务服务网和上级电子票据管理系统融合接口。    第十二条  各设区市在电子票据管理系统建设基本完成后，及时向省财政票据主管部门提出申请，省财政票据主管部门组织专家组进行评估验证，对符合要求的，予以同意系统上线运行。各市、县（市、区）财政部门和卫生健康部门也应组织对本级医疗机构电子票据使用情况进行评估验收。         第四章  医疗收费电子票据管理流程    第十三条  电子票据基于电子票据管理系统并融合医疗机构收费管理系统进行管理。财政部门通过电子票据管理系统财政端制作电子票据可视化模板文件；医疗机构通过电子票据管理系统用户服务端开具生成电子票据；医疗机构、交款人（报销单位）使用真实有效的电子票据进行入帐处理。     第十四条  制样。省级电子票据管理系统财政端按照电子票据的可视化样式，制作形成电子票据模板文件，下发设区市电子票据管理系统财政端。    第十五条  编码规则和号段分配。全省电子票据编码由票据代码和票据号码两部分组成。票据代码设计为8位，由财政票据监管机构行政区划编码、财政票据种类编码、票据使用年度编码3部分组成。票据号码设计为10位，采用顺序号，用于反映电子票据赋码顺序。    第十六条  赋码。由财政部门向医疗机构发放电子票据号码，确保唯一性。财政部门向医疗机构可以预发电子票据号码段；或者医疗机构生成电子票据时按照财政部门设定规则自动分配电子票据号码。    第十七条  生成。医疗机构为患者提供医疗服务，办理医疗收费结算后，同步制作包含医疗机构电子签名的电子票据信息，上传到财政端。财政端验证电子票据号码唯一性、医疗机构电子签名有效性后，追加财政监制电子签名，生成完整的电子票据。    第十八条  传输。医疗机构将电子票据信息通过短信、微信、电子邮件等多种方式发送给交款人，交款人（报销单位）可以通过电子票据管理系统获取电子票据版式文件。    第十九条  查验。交款人（报销单位）可通过电子票据管理系统查验票据真伪。    第二十条  入账。医疗机构和交款人（报销单位）可凭据电子票据入账处理。财政部门可提供支持电子票据入账接口，方便相关单位获取、查验电子票据，以及生成记账凭证。    第二十一条  作废。医疗机构发生填写错误等情形，对电子票据须做作废操作，操作后电子票据可视化样式票面应有“已作废”字样标识，严禁私自删除；已换开纸质票据的电子票据作废操作前，必须先将已换开的纸质票据收回作废。    第二十二条  核销。医疗机构应按照票据管理规定定期对已使用的电子票据进行核销申请，上传财政管理端审核。        第二十三条  归档。经核销后的电子票据，由财政部门和医疗机构各自按照要求归档备查。         第五章  医疗收费电子票据安全保障    第二十四条  制度建设。按照国家信息系统安全等级保护基本要求和浙江省电子政务安全保障标准，建设符合第三等级要求的电子票据管理体系和安全保障制度。从系统、数据、管理等多个维度构建安全体系，消除安全漏洞，杜绝安全隐患，确保电子票据在生成、传输、储存等过程中，始终保持真实、完整、唯一、未被更改。    第二十五条  系统建设。做好身份鉴别、访问控制、安全审计、通信完整和保密性等方面安全防护，确保系统安全。    第二十六条  数据管理。通过电子签名技术增强电子票据防伪功能，使用多点备份、异地备份等多种技术手段，保障电子票据数据信息存储安全。    第二十七条  操作管理。财政部门和用票据单位要切实加强对数字证书的发放、保管、使用等方面监管，防范人为数据泄漏风险。         第六章  换开纸质票据    第二十八条  医疗机构为交款人提供换开的纸质票据名称为《浙江省医疗收费票据》，设置为单联票（收据联）列入浙江省财政票据票种目录，由省财政部门统一印（监）制（具体样式详见附件3-5，医疗机构可根据实际情况选择）。    第二十九条  换开的纸质票据打印信息必须与电子票据内容保持一致。换开纸质票据后，电子票据应标注“已换开”标识，确保票据唯一性。        第三十条  因卡纸毁损、模糊不清等原因需要补开的，医疗机构应收回原票据作废，并规范办理补开手续。纸质票据的印制、申领、使用、保管、作废、核销等，按照财政部、原卫生部印发的《医疗收费票据使用管理办法》和本办法相关规定办理。         第七章  监督检查与法律责任    第三十一条  各级财政、卫生健康部门可根据实际情况和工作需要，对医疗收费票据领用及管理情况，进行实时动态监控和检查。    第三十二条  医疗机构应当自觉接受财政、卫生健康、医保、审计、纪检监察等部门对医疗收费票据使用管理的监督检查，如实反映情况，提供资料，不得隐瞒情况、弄虚作假或者拒绝、阻碍监督检查。    第三十三条  违反本办法规定领用、管理医疗收费票据的，财政部门应责令医疗机构限期整改。    第三十四条  单位和个人有违反本办法行为的，依据国家有关财政票据管理的规定追究法律责任。         第八章  附则    第三十五条  各市、县（市、区）财政、卫生健康部门可根据本办法，结合本地区实际情况，制定具体实施办法。    第三十六条  本办法自2019年1月10日起施行。  ",
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
        {
          child_title: "规定2",
          child_content:
            "法律内容法律内容法律内容法律内容法律内容法律内容法律内容法律内容法律内容法律内容法律内容法律内容法律内容法律内容法律内容法律内容法律内容法律内容法律内容法律内容",
        },
      ],
    },
    {
      details_title: "三、范围",
      details_content:
        "法律内容法律内容法律内容法律内容法律内容法律内容法律内容法律内容法律内容法律内容法律内容法律内容法律内容法律内容法律内容法律内容法律内容法律内容法律内容法律内容",
      details_child: [],
    },
  ],
};
</script>

<style scoped lang="less">
.industryRegulationsMapMain-wrap {
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
