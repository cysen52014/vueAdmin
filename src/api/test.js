import request from "@/utils/request";

export const getList = params => {
  return request({
    method: "get",
    url: "/article/list",
    params
  });
};
