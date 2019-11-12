import request from "@/utils/request";
// 查找用户列表
export const queryUserList = params => {
  return request({
    method: "get",
    url: "/parkUser/queryUserList",
    params
  });
};

// 查找用户关联车场
export const queryUserPark = params => {
  return request({
    method: "get",
    url: "/parkUser/queryUserPark",
    params
  });
};

//  用户关联车场
export const relationUserPark = params => {
  return request({
    method: "post",
    url: "/parkUser/relationUserPark",
    params
  });
};

//  保存用户
export const saveUser = data => {
  return request({
    method: "post",
    url: "/parkUser/saveUser",
    data
  });
};

//  更新用户
export const updateUser = data => {
  return request({
    method: "post",
    url: "/parkUser/updateUser",
    data
  });
};
