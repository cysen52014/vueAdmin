import { constantRouterMap } from "@/router/index";
import GetRoutes from "@/utils/getRoutes";
import Conf from "../../../config/nav.conf";
import Layout from "@/views/layout";

const permission = {
  state: {
    cachRouter: [],
    routers: constantRouterMap,
    asyncRouter: [],
    addRouters: [],
    currentRouter: [],
    currentRouterIndex: localStorage.getItem("topnav-active-key") || 0,
    sidebarActiveIndex: localStorage.getItem("sideber-active-key") || "1"
  },
  mutations: {
    // SET_ROUTERS: (state, routers) => {
    //   state.authRouters = routers;
    // },
    SET_ROUTERS: (state, routers) => {
      state.asyncRouter = Conf.HAS_TOP_NAV ? routers : [];
      state.currentRouter = Conf.HAS_TOP_NAV
        ? routers[state.currentRouterIndex].childrens
        : routers;
      const LayoutComp = [
        {
          path: "/",
          component: Layout,
          name: "主页",
          hidden: true,
          children: state.cachRouter
        },
        {
          path: "*",
          name: "404",
          component: () => import("@/views/404"),
          hidden: true
        }
      ];

      state.addRouters = LayoutComp;
      state.routers = constantRouterMap.concat(LayoutComp);
    },
    GET_SIDBAR_ROUTERS: (state, index) => {
      localStorage.setItem("topnav-active-key", index);
      state.currentRouterIndex = index;
      state.currentRouter = state.asyncRouter[index].childrens;
    },
    GET_SIDBAR_ACTIVE_INDEX: (state, index) => {
      localStorage.setItem("sideber-active-key", index);
      state.sidebarActiveIndex = index;
    }
  },
  actions: {
    GenerateRoutes({ commit }, data) {
      if (data.rowrouter.length < 1) return;
      return new Promise(resolve => {
        const GR = GetRoutes(data.rowrouter);
        const accessedRouters = GR.tree;
        permission.state.cachRouter = GR.route;
        console.log("accessedRouters", accessedRouters);
        commit("SET_ROUTERS", accessedRouters);
        resolve();
      });
    },
    changeSidebarActiveIndex({ commit }, index) {
      commit("GET_SIDBAR_ACTIVE_INDEX", index);
    },
    changeSidebarRouter({ commit }, index) {
      if (Conf.HAS_TOP_NAV) {
        commit("GET_SIDBAR_ROUTERS", index);
      }
    }
    // GenerateRoutes({ commit }, data) {
    //   return new Promise(resolve => {
    //     const { roles } = data; console.log("rolesrolesroles", roles);
    //     if (roles) {
    //       const accessedRouters = asyncRouterMap;
    //       commit("SET_ROUTERS", accessedRouters);
    //       resolve();
    //     }
    //   });
    // }
  }
};

export default permission;
