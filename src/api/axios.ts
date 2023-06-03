import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

function myAxios(axiosConfig: AxiosRequestConfig): Promise<AxiosResponse> {
  const service = axios.create({
    baseURL: "https://mock.apifox.cn/m1/2704003-0-default", // mock数据环境
    // baseURL: "http://127.0.0.1:4000", // 本地服务器环境(api-server)
    // baseURL: 'http://116.62.174.166:4000', // 部署正式环境(阿里云ECS服务器)
    timeout: 10000, // 10秒内无响应则报错
    // 配置请求头token
    headers: {
      Authorization: localStorage.getItem("token") ?? "",
    },
  });
  return service(axiosConfig);
}

export default myAxios;
