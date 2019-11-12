import Vue from "vue";
import Router from "vue-router";
Vue.use(Router);

import NotFound from "@/views/404";

export const constantRouterMap = [
  {
    path: "/login",
    component: () => import("@/views/login"),
    hidden: true
  },
  {
    path: "/404",
    name: "404",
    component: NotFound,
    hidden: true
  }
  // {
  //   path: "/",
  //   component: mainLayout,
  //   name: "主页",
  //   hidden: true,
  //   children: [{
  //     hidden: false,
  //     icon: "",
  //     index: "0-0-0",
  //     name: "3333",
  //     path: "/level1/level2/level3",
  //     component: () => import("@/views/login")
  //   }]
  // }
];

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
});
