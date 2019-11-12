<template>
  <div class="app-header">
    <div class="header-logo">
      <img src="@/assets/images/logo.png" />
    </div>
    <div class="menu-btn__click">
      <i class="el-icon-menu"></i>
    </div>
    <div class="header-nav">
      <ul>
        <li
          :class="currentRouterIndex*1 === index ? 'is-active' : ''"
          @click="changeSiderBar(index)"
          :key="index"
          v-for="(route,index) in asyncRouter"
        >{{route.name}}</li>
      </ul>
    </div>
    <el-dropdown class="avatar-container" trigger="click">
      <div class="avatar-wrapper">
        <div class="user-name">{{user}}</div>
        <i class="el-icon-caret-bottom"></i>
      </div>
      <el-dropdown-menu class="user-dropdown" slot="dropdown">
        <el-dropdown-item>
          <span @click="logout" style="display:block;">退出登录</span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
import store from "@/store";
import { mapGetters, mapActions } from "vuex";
// import Conf from "../../../../config/nav.conf";
export default {
  name: "AppHeader",
  computed: {
    ...mapGetters([
      "asyncRouter",
      "currentRouterIndex",
      "currentRouter",
      "sidebarActiveIndex"
    ])
  },
  data() {
    return {
      user: "",
      navList: []
    };
  },
  created() {
    this.user = store.state.user.name
      ? store.state.user.name
      : localStorage.getItem("username");
  },
  methods: {
    ...mapActions(["changeSidebarRouter", "changeSidebarActiveIndex"]),
    logout() {
      this.$store.dispatch("LogOut").then(() => {
        location.reload();
      });
    },
    getDefIndex(level) {
      let i = "";
      if (level.childrens) {
        const child = level.childrens.filter(r => r.hidden === false);
        i = this.getDefIndex(child[0]);
      } else {
        i = level.index;
      }
      return i;
    },
    changPath(obj) {
      this.$router.push(obj.path);
    },
    getActive() {
      const router = this.currentRouter.filter(r => r.hidden === false)[0];
      let i = 0;
      console.log("router", router);
      if (router && router.childrens) {
        const child = router.childrens.filter(r => r.hidden === false);
        i = this.getDefIndex(child[0]);
        this.changeSidebarActiveIndex(i);
      } else {
        i = router.index;
        this.changeSidebarActiveIndex(i);
      }
    },
    changeSiderBar(index) {
      this.changeSidebarRouter(index);
      this.getActive();
    }
  }
};
</script>
