/* eslint-disable prettier/prettier */
import myAxios from "./axios";

// 获取省份+城市的筛选条件列表
export const getProvinceCityFilterListAPI = () => {
  return myAxios({
    url: "/institution/provincecityfilter",
    method: "GET",
  });
};

// 分页获取国家法律列表
export const getNationalMapListAPI = (paramsList: {
  page: number;
  pageSize: number;
  status: number;
}) => {
  return myAxios({
    url: "/institution/national/list",
    method: "GET",
    params: paramsList,
  });
};

// 分页获取政府政策列表
export const getGovPolicyMapListAPI = (paramsList: {
  page: number;
  pageSize: number;
  positionCode: string;
}) => {
  return myAxios({
    url: "/institution/govpolicy/list",
    method: "GET",
    params: paramsList,
  });
};

// 分页获取行业规章列表
export const getIndustryRegulationsMapListAPI = (paramsList: {
  page: number;
  pageSize: number;
  type: number;
}) => {
  return myAxios({
    url: "/institution/industryregulations/list",
    method: "GET",
    params: paramsList,
  });
};

// 获取单位/企业制度的筛选条件列表
export const getOrgSystemFilterListAPI = (paramsList: {
  type: number; // 0:获取二级筛选条件 1:获取三级筛选条件 2:获取四级筛选条件
  choice: number;
}) => {
  return myAxios({
    url: "/institution/orgsystem/filter",
    method: "GET",
    params: paramsList,
  });
};

// 分页获取单位/企业制度列表
export const getOrgSystemMapListAPI = (paramsList: {
  page: number;
  pageSize: number;
  type: string;
}) => {
  return myAxios({
    url: "/institution/orgsystem/list",
    method: "GET",
    params: paramsList,
  });
};
