import apifun from "@/api/index";
import { Message } from "element-ui";

const global = {
  state: {
    tableData: [],
    tableConf: {}
  },
  mutations: {
    TOGGLE_TABEL_CALLBACK: state => {
    },
    SET_PAGE_TABLE_DATA: (state, data) => {
      state.tableData = data;
    },
    SET_PAGE_TABLE_CONF: (state, data) => {
      state.tableConf = data;
    }
  },
  actions: {
    CallApiMethod: async({ commit }, conf) => {
      if (!conf.action) return;
      const data = await apifun[conf.action](conf.params);
      if (conf.excel) {
        conf.cb(data);
      } else {
        if (data.errorCode === "0") {
          if (conf.cb) {
            conf.cb(data);
          }
          if (conf.prompt) {
            const message = conf.prompt.message ? conf.prompt.message : "";
            if (message) Message.success(message);
          } else {
            conf.popsuc ? "" : Message.success(data.message);
          }
        } else {
          if (conf.prompt) {
            const message = conf.prompt.message ? conf.prompt.message : "";
            if (message) Message.error(message);
            if (conf.errorFilter) {
              conf.errorFilter.cb(data);
            }
          } else {
            Message.error(data.message);
          }
        }
      }
    },
    GetTableData: async({ commit }, conf) => {
      if (!conf.fn) return;
      const data = await apifun[conf.fn](conf.params);
      if (data.errorCode === "0") {
        conf.cb(data);
        commit("SET_PAGE_TABLE_DATA", data);
      } else {
        Message.error(data.message);
      }
    },
    TablePageChange({ commit }, conf) {
      commit("SET_PAGE_TABLE_CONF", conf);
    },
    filterParams(params) {
      const p = {};
      for (const key in params) {
        if (params.hasOwnProperty(key)) {
          const el = params[key];
          if (el !== "") {
            p[key] = el;
          }
        }
      }
      return p;
    }
  }
};

export default global;
