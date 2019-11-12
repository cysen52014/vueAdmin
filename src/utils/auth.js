/* eslint-disable no-cond-assign */
// import Cookies from "js-cookie"

const TokenKey = "token";

export function getToken() {
  return getCookie(TokenKey);
}

export function setToken(token) {
  return setCookie(TokenKey, token, 1);
}

export function removeToken() {
  return delCookie(TokenKey);
}

const setCookie = (name, value, Days) => {
  var exp = new Date();
  exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
  document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString() + ";path=/";
};

// 读取cookies
const getCookie = (name) => {
  var arr; var reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");

  if (arr = document.cookie.match(reg)) { return unescape(arr[2]); } else { return null; }
};

// 删除cookies
const delCookie = (name) => {
  var exp = new Date();
  exp.setTime(exp.getTime() - 1);
  var cval = getCookie(name);
  if (cval != null) { document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString() + ";path=/"; }
};
