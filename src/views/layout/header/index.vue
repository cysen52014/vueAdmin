<template>
  <div class="app-header">
    <div class="header-logo">
      <img src="@/assets/images/logo.png" />
      <div class="version">ERP V1.3.3</div>
    </div>
    <div class="menu-btn__click" @click="showNav" v-if="showTopNavBtn">
      <i class="el-icon-menu"></i>
    </div>
    <div
      :class="isMobile && navVisble ? 'header-nav move__down' : 'header-nav'"
      v-if="(isMobile && navVisble) || !isMobile"
    >
      <ul>
        <li
          :class="currentRouterIndex * 1 === index ? 'is-active' : ''"
          @click="changeSiderBar(route, index)"
          :key="index"
          v-for="(route, index) in asyncRouter"
        >
          {{ route.name }}
        </li>
      </ul>
    </div>
    <el-dropdown class="avatar-container" trigger="click">
      <div class="avatar-wrapper">
        <div class="user-name">{{ user }}</div>
        <i class="el-icon-caret-bottom"></i>
      </div>
      <el-dropdown-menu class="user-dropdown" slot="dropdown">
        <el-dropdown-item>
          <span @click="logout" style="display:block;">退出登录</span>
        </el-dropdown-item>
        <el-dropdown-item>
          <span @click="shoWModifyPwd = true" style="display:block;"
            >修改密码</span
          >
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <updatepwd v-model="shoWModifyPwd" />
  </div>
</template>

<script>
import store from "@/store";
import { mapGetters, mapActions } from "vuex";
import Conf from "../../../../config/nav.conf";
import updatepwd from "@/components/updatepwd";

export default {
  name: "AppHeader",
  components: {
    updatepwd
  },
  computed: {
    ...mapGetters([
      "asyncRouter",
      "currentRouterIndex",
      "currentRouter",
      "sidebarActiveIndex",
      "isMobile"
    ]),
    showTopNavBtn() {
      return Conf.HAS_TOP_NAV;
    }
  },
  data() {
    return {
      user: "",
      navList: [],
      navVisble: false,
      shoWModifyPwd: false
    };
  },
  mounted() {
    this.user = store.state.user.name
      ? store.state.user.name
      : localStorage.getItem("username");
    document.addEventListener(
      "click",
      () => {
        this.navVisble = false;
      },
      false
    );
    if (this.$route.path === "/") {
      this.getActive();
    }
  },
  methods: {
    ...mapActions(["changeSidebarRouter", "changeSidebarActiveIndex"]),
    logout() {
      this.$store.dispatch("LogOut").then(() => {
        location.reload();
      });
    },
    showNav(evt) {
      evt.cancelBubble = true;
      this.navVisble = !this.navVisble;
    },
    getDefIndex(level) {
      let i = "";
      if (level.childrens && level.childrens.length > 0) {
        const child = level.childrens.filter(r => r.hidden === false);
        i = this.getDefIndex(child[0]);
        this.changPath(child[0]);
      } else {
        i = level.index;
        this.changPath(level);
      }
      return i;
    },
    changPath(obj) {
      window.___cashSearData__ = false;
      this.$router.push(obj.path);
    },
    getActive() {
      console.log("router.index", this.currentRoute);
      const router = this.currentRouter.filter(r => r.hidden === false)[0];
      let i = 0;
      if (router && router.childrens && !router.toJump) {
        const child = router.childrens.filter(r => r.hidden === false);
        if (child[0].toJump) {
          i = child[0].index;
          this.changPath(child[0]);
          this.changeSidebarActiveIndex(i);
        } else {
          i = this.getDefIndex(child[0]);
          this.changeSidebarActiveIndex(i);
        }
      } else {
        i = router.index;
        this.changPath(router);
        this.changeSidebarActiveIndex(i);
      }
    },
    changeSiderBar(route, index) {
      this.changeSidebarRouter(index);
      this.getActive();
    }
  }
};
</script>
