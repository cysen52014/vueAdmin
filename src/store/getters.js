const getters = {
  sidebar: state => state.app.sidebar,
  isMobile: state => state.app.isMobile,
  // language: state => state.app.language,
  visitedViews: state => state.app.visitedViews,
  token: state => state.user.token,
  name: state => state.user.name,
  introduction: state => state.user.introduction,
  status: state => state.user.status,
  roles: state => state.user.roles,
  resource: state => state.user.resource,
  setting: state => state.user.setting,
  permission_routers: state => state.permission.routers,
  addRouters: state => state.permission.addRouters,
  currentRouter: state => state.permission.currentRouter,
  asyncRouter: state => state.permission.asyncRouter,
  currentRouterIndex: state => state.permission.currentRouterIndex,
  sidebarActiveIndex: state => state.permission.sidebarActiveIndex
};
export default getters;
