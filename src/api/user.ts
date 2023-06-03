/* eslint-disable prettier/prettier */
import myAxios from "./axios";

// 用户登录
export const userLoginAPI = (paramsList: {
  email?: string;
  account?: string;
  password: string;
}) => {
  return myAxios({
    url: "/user/login",
    method: "GET",
    data: paramsList,
  });
};

// 用户注册
export const userRegisterAPI = (paramsList: {
  email?: string;
  account: string;
  username: string;
  password: string;
}) => {
  return myAxios({
    url: "/user/register",
    method: "POST",
    data: paramsList,
  });
};
