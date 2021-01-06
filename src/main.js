import Vue from "vue";

import "normalize.css/normalize.css";
import filters from "@/filters";
import "@/assets/style/common.scss";

import App from "./App";
import router from "./router";
import store from "./store";
// import "./mock";
import "./permission"; // permission control
import "./debug"; // 错误日志收集

import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";

import "cys-ui/static/css/cysui.css";

import broadcast from "@/mixins/broadcast";
Vue.prototype.$espread = broadcast;

import CysUi from "cys-ui";
CysUi.install(Vue);

Vue.use(ElementUI, {
  size: "small" // default: medium
});

window.__storevueappdate__state_formData = {};
window.__storevueappdate__state_queue = {};

Vue.config.productionTip = false;
Vue.use(filters);

new Vue({
  el: "#app",
  router,
  store,
  template: "<App/>",
  components: { App }
});
