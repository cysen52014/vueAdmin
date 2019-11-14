
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
    TOGGLE_MOBILE: (state, val) => {
      state.isMobile = val;
    }
  },
  actions: {
    toggleSodebar: ({ commit }) => {
      commit("TOGGLE_SIDEBAR");
    },
    toggleMobile: ({ commit }, val) => {
      commit("TOGGLE_MOBILE", val);
    }
  }
};

export default app;
