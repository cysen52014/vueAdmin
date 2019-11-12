<template>
  <div>
    <el-menu
      mode="vertical"
      :default-active="sidebarActiveIndex"
      :collapse="isCollapse"
      :default-openeds="openeds"
      @open="menuOpen"
      background-color="rgba(255, 255, 255, 1)"
      text-color="#303133"
      active-text-color="rgb(67, 111, 237)"
      @changeActive="getSideBarActiveKey"
    >
      <sidebar-item
        v-for="(route,index) in currentRouter"
        :key="route.name"
        :item="route"
        :index="index"
        :base-path="route.path"
      ></sidebar-item>
    </el-menu>
    <div class="menu-bar" @click="changeSidebar()">
      <i :class="sidebar.opened ? 'el-icon-caret-right' : 'el-icon-caret-left'"></i>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import SidebarItem from "./sidebarItem";

export default {
  components: { SidebarItem },
  data() {
    return {
      active: "",
      openeds: ["/examples"]
    };
  },
  computed: {
    ...mapGetters(["currentRouter", "sidebar", "sidebarActiveIndex"]),
    isCollapse() {
      console.log("this.sidebar.opened", this.sidebar.opened);
      return this.sidebar.opened;
    },
    getSideBarActiveKey() {
      const key = localStorage.getItem("sideber-active-key");
      this.active = key ? (this.active = key) : this.active;
      return this.active;
    }
  },
  methods: {
    ...mapActions(["toggleSodebar"]),
    menuOpen(idx) {
      if (this.openeds.indexOf(idx) < 0) {
        this.openeds.push(idx);
      }
    },
    changeActive(val) {
      this.active = val;
      localStorage.setItem("sideber-active-key", val);
    },
    changeSidebar() {
      this.toggleSodebar(!this.sidebar.opened);
      const wd = document.documentElement.clientWidth;
      if (wd < 720) {
        if (this.sidebar.opened) {
          document.body.className = "isMobile Collapse";
        } else {
          document.body.className = "isMobile";
        }
      } else {
        if (this.sidebar.opened) {
          document.body.className = "isPc";
        } else {
          document.body.className = "";
        }
      }
    },
    isMoblieDevice() {
      const wd = document.documentElement.clientWidth;
      if (wd > 720) {
        document.body.className = "";
      } else {
        this.toggleSodebar(!this.sidebar.opened);
        document.body.className = "isMobile Collapse";
      }
    }
  },
  mounted() {
    window.addEventListener(
      "resize",
      () => {
        this.isMoblieDevice();
      },
      false
    );
    this.isMoblieDevice();
  }
};
</script>