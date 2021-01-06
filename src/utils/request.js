import axios from "axios";
// import { Message } from "element-ui";
import store from "../store";
import { getToken } from "@/utils/auth";
import Tool from "@/utils/Tool";

const service = axios.create({
  baseURL: process.env.XHR_URL,
  timeout: 15000
});

const directedUrl = (config) => {
  const uaaBaseUrl = {
    dev: "http://uaa1.api1.cheweiguanjia.com/uaa",
    pre: "http://uaa.apitest.cheweiguanjia.com/uaa/",
    prod: "http://uaa.api.cheweiguanjia.com/uaa/"
  };
  config.url = uaaBaseUrl[process.env.NODE_ENV] + config.url;
  return config;
};

service.interceptors.request.use(
  config => {
    if (config.proxy) {
      config = directedUrl(config);
    }
    if (store.getters.token) {
      config.headers["Authorization"] = getToken();
    }
    if (config.method === "post") {
      config.headers["Content-Type"] = "application/json;charset=UTF-8";
    }
    if (config.params) {
      config.params = Tool.filterParams(config.params);
    }
    if (config.data) {
      config.data = Tool.filterParams(config.data);
    }

    return config;
  },
  error => {
    Promise.reject(error);
  }
);

service.interceptors.response.use(
  response => {
    if (response.data.errorCode !== "0") {
      switch (response.data.errorCode) {
        case "401":
        case "403":
          // MessageBox.confirm("你已被登出，可以取消继续留在该页面，或者重新登录", "确定登出", {
          //   confirmButtonText: "重新登录",
          //   cancelButtonText: "取消",
          //   type: "warning"
          // }).then(() => {
          //   store.dispatch("FedLogOut").then(() => {
          //     location.reload()
          //   })
          // })
          store.dispatch("FedLogOut").then(() => {
            // location.reload()
          });
          break;
        default:
          break;
      }
    }
    return response.data;
  },
  error => {
    if (error && error.response) {
      switch (error.response.status) {
        case 500:
          // Message.error("服务器错误，请重新刷新");
          break;
        default:
          break;
      }
    }
    return Promise.reject(error);
  }
);

export default service;
