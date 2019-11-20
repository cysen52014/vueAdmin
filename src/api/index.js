import request from "@/utils/request";

// 广告主列表
export const getAdvertiser = params => {
  return request({
    method: "get",
    url: "/adv/advertiser/",
    params
  });
};

// 创建广告主
export const addAdvertiser = data => {
  return request({
    noLoading: true,
    method: "post",
    url: "/adv/advertiser/",
    data
  });
};

// 编辑广告主
export const editAdvertiser = data => {
  return request({
    noLoading: true,
    method: "patch",
    url: "/adv/advertiser/",
    data
  });
};

// 有车场的城市
export const getParkcitys = params => {
  return request({
    noLoading: true,
    method: "get",
    url: "/adv/delivery/parkcitys",
    params
  });
};

// 获取允许投放车场
export const getAllowParks = params => {
  return request({
    noLoading: true,
    method: "get",
    url: "/adv/delivery/allowParks",
    params
  });
};

// 创建广告
export const addAD = data => {
  return request({
    noLoading: true,
    method: "post",
    url: "/adv/delivery/",
    data
  });
};

// 广告列表
export const getAdverts = params => {
  return request({
    method: "get",
    url: "/adv/delivery/adverts",
    params
  });
};

// 编辑广告状态 1,：待投放，2：投放中，3：投放结束  4:下线
export const eidtADStatus = data => {
  return request({
    noLoading: true,
    method: "patch",
    url: "/adv/delivery/",
    data
  });
};

// 编辑翻倍系数
export const updateCoefficient = data => {
  return request({
    noLoading: true,
    method: "patch",
    url: "/adv/delivery/updateCoefficient",
    data
  });
};

// 获取支付后
export const getAfterPay = params => {
  return request({
    noLoading: true,
    method: "get",
    url: "/adv/delivery/afterPay",
    params
  });
};

// 创建支付后广告
export const addAfterPay = data => {
  return request({
    noLoading: true,
    method: "post",
    url: "/adv/delivery/afterPay",
    data
  });
};

// 广告数据详情统计
export const advertDataDetailStatistics = params => {
  return request({
    noLoading: true,
    method: "get",
    url: "/adv/delivery/advertDataDetailStatistics",
    params
  });
};

// 删除广告数据
export const deleteAdvert = params => {
  return request({
    noLoading: true,
    method: "delete",
    url: "/adv/delivery/deleteAdvert",
    params
  });
};

// 导出广告数据
export const exportAdvertDataDetail = params => {
  return request({
    noLoading: true,
    method: "get",
    url: "/adv/delivery/exportAdvertDataDetail",
    params
  });
};

// 广告数据详情
export const queryAdvertDataDetail = params => {
  return request({
    noLoading: true,
    method: "get",
    url: "/adv/delivery/queryAdvertDataDetail",
    params
  });
};

