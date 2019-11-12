import request from "@/utils/request";

export function login(username, password) {
  const data = {
    username: username,
    password: password,
    identifier: "advSystem"
  };
  return request({
    proxy: "uaa",
    url: "/account/login",
    method: "post",
    data
  });
}

export function getInfo() {
  const params = {
    identifier: "advSystem"
  };
  return request({
    proxy: "uaa",
    url: "/resource/getMenuForToken",
    params,
    method: "get"
  });
}

export function logout() {
  return new Promise((resolve, reject) => {
    resolve({
      code: "0000",
      data: null,
      msg: "success"
    });
  });
}
