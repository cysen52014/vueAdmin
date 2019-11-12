
const app = {
  state: {
    sidebar: {
      opened: false
    },
    isMobile: false
  },
  mutations: {
    TOGGLE_SIDEBAR: state => {
      state.sidebar.opened = !state.sidebar.opened;
    },
    TOGGLE_MOBILE: state => {
      state.isMobile = !state.isMobile;
    }
  },
  actions: {
    toggleSodebar: ({ commit }) => {
      commit("TOGGLE_SIDEBAR");
    },
    toggleMobile: ({ commit }) => {
      commit("TOGGLE_MOBILE");
    }
  }
};

export default app;
