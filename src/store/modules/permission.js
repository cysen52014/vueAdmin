import { constantRouterMap } from "@/router/index";
import Tool from "@/utils/Tool";
import Conf from "../../../config/nav.conf";
import Layout from "@/views/layout";

const getChildRoute = (children, index) => {
  const childrenRoute = [];
  const routreChild = Tool.compare(children, "sort");
  for (let i = 0; i < routreChild.length; i++) {
    const userRoutesItem = {};
    userRoutesItem.path = routreChild[i].href;
    userRoutesItem.name = routreChild[i].title;
    userRoutesItem.icon = routreChild[i].icon;
    userRoutesItem.hidden = !routreChild[i].showFlag;
    userRoutesItem.index = index + "-" + i;

    childrenRoute.push(userRoutesItem);
    if (routreChild[i].children) {
      userRoutesItem.childrens = getChildRoute(routreChild[i].children, index + "-" + i);
    } else {
      if (Conf.HAS_TOP_NAV && userRoutesItem.index.split("-").length === 2) {
        userRoutesItem.toJump = true;
      }
      userRoutesItem.component = resolve => require(["@/views" + routreChild[i].href + ".vue"], resolve) || "";
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
      state.currentRouter = Conf.HAS_TOP_NAV ? routers[state.currentRouterIndex].childrens : routers;
      const LayoutComp = [{
        path: "/",
        component: Layout,
        name: "主页",
        hidden: true,
        children: state.cachRouter
      }];

      state.addRouters = LayoutComp;
      state.routers = constantRouterMap.concat(LayoutComp);
      console.log("state.asyncRouter", state.asyncRouter);
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
      return new Promise(resolve => {
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
            userRoutesItem.path = userRoutes[i].href;
            userRoutesItem.name = userRoutes[i].title;
            userRoutesItem.icon = userRoutes[i].icon;
            userRoutesItem.hidden = !userRoutes[i].showFlag;
            userRoutesItem.index = "" + i;
            if (userRoutes[i].children) {
              userRoutesItem.childrens = getChildRoute(userRoutes[i].children, i);
            } else {
              userRoutesItem.path = path;
              userRoutesItem.component = resolve =>
                require(["@/views" + path + "/index.vue"], resolve);
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
