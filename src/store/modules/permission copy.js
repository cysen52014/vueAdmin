import { constantRouterMap } from "@/router/index";
import Tool from "@/utils/Tool";
import Conf from "../../../config/nav.conf";
import Layout from "@/views/layout";

const _import = require("@/router/_import_component");

const getChildRoute = (routes, fpath, index) => {
  const childrenRoute = [];
  const routreChild = Tool.compare(routes, "sort");
  for (let i = 0; i < routreChild.length; i++) {
    const userRoutesItem = {};
    // userRoutesItem.path = routreChild[i].href;
    var path = routreChild[i].href;
    userRoutesItem.name = routreChild[i].title;
    userRoutesItem.icon = routreChild[i].icon;
    userRoutesItem.hidden = !routreChild[i].showFlag;
    userRoutesItem.index = index + "-" + i;
    userRoutesItem.meta = {};
    userRoutesItem.meta.index = index + "-" + i;
    childrenRoute.push(userRoutesItem);

    var fpt = fpath.replace(/\/(index|list)/, "");
    if (routreChild[i].children) {
      userRoutesItem.childrens = getChildRoute(
        routreChild[i].children,
        fpt + path,
        userRoutesItem.index
      );
    } else {
      if (Conf.HAS_TOP_NAV && userRoutesItem.index.split("-").length === 2) {
        userRoutesItem.toJump = true;
      }
      var url = path.split(",");
      if (url.length > 1) {
        const p2 = url[0].split(":")[1];
        const component = url[1].split(":")[1];
        userRoutesItem.path = fpt + p2;
        userRoutesItem.component = _import(component);
      } else {
        // console.log("====222", path);
        userRoutesItem.path = fpt + path;
        userRoutesItem.component = _import(fpt + path);
      }
      // userRoutesItem.component = (resolve) =>
      //   require(["@/views" + routreChild[i].href + ".vue"], resolve) || "";
      permission.state.cachRouter.push(userRoutesItem);
    }
  }
  return childrenRoute;
};

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
      return new Promise((resolve) => {
        var accessedRouters = [];
        if (data.rowrouter.length > 1) {
          var userRoutes = Tool.toTreeData(data.rowrouter, {
            parentId: "parentId",
            id: "resourceId"
          });
          userRoutes = Tool.compare(userRoutes, "sort");
          for (var i = 0; i < userRoutes.length; i++) {
            var userRoutesItem = {};
            const path = userRoutes[i].href;
            var url = userRoutes[i].href.split(",");
            userRoutesItem.name = userRoutes[i].title;
            userRoutesItem.icon = userRoutes[i].icon;
            userRoutesItem.hidden = !userRoutes[i].showFlag;
            userRoutesItem.index = "" + i;
            userRoutesItem.meta = {};
            userRoutesItem.meta.index = "" + i;
            userRoutesItem.path = path;
            if (userRoutes[i].children) {
              userRoutesItem.childrens = getChildRoute(
                userRoutes[i].children,
                path,
                userRoutesItem.index
              );
            } else {
              if (url.length > 1) {
                const p2 = url[0].split(":")[1];
                const component = url[1].split(":")[1];
                userRoutesItem.path = p2;
                userRoutesItem.component = _import(component);
              } else {
                userRoutesItem.component = _import(path);
              }
              // userRoutesItem.path = path;
              // userRoutesItem.component = (resolve) =>
              //   require(["@/views" + path + "/index.vue"], resolve);
              userRoutesItem.toJump = true;
              permission.state.cachRouter.push(userRoutesItem);
            }
            accessedRouters.push(userRoutesItem);
          }
        }
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
