<template>
  <div>
    <el-menu
      mode="vertical"
      :default-active="active"
      :collapse="isCollapse"
      background-color="#fff"
      text-color="#333333"
      active-text-color="#436fed"
      @changeActive="getSideBarActiveKey"
      unique-opened
    >
      <sidebar-item
        v-for="(route, index) in currentRouter"
        :key="route.name"
        :item="route"
        :index="index"
        :base-path="route.path"
      ></sidebar-item>
    </el-menu>
    <div class="menu-bar" @click="changeSidebar()">
      <i
        :class="sidebar.opened ? 'el-icon-caret-right' : 'el-icon-caret-left'"
      ></i>
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
      return this.sidebar.opened;
    },
    getSideBarActiveKey() {
      const key = localStorage.getItem("sideber-active-key");
      if (key) {
        let ii = "";
        if (this.$route.meta._parent && this.$route.meta._parent[0]._subIndex) {
          if (
            this.$route.meta._parent[0]._subIndex &&
            this.$route.meta._parent[0].meta._parent[0]._subIndex
          ) {
            ii = this.$route.meta._parent[0].meta._parent[0]._subIndex;
          } else {
            ii = this.$route.meta._parent[0]._subIndex;
          }
        } else {
          ii = key;
        }
        const val = ii;
        this.active = val;
      }
      return this.active;
    }
  },
  methods: {
    ...mapActions(["toggleSodebar", "toggleMobile"]),
    menuOpen(idx) {
      if (this.openeds.indexOf(idx) < 0) {
        this.openeds.push(idx);
      }
    },
    changeActive(val) {
      this.active = val;
      localStorage.setItem("sideber-active-key", this.active);
    },
    changeSidebar() {
      this.toggleSodebar(!this.sidebar.opened);
      const wd = document.documentElement.clientWidth;
      if (wd < 720) {
        this.toggleMobile(true);
        if (this.sidebar.opened) {
          document.body.className = "isMobile Collapse";
        } else {
          document.body.className = "isMobile";
        }
      } else {
        this.toggleMobile(false);
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
        this.toggleMobile(false);
        document.body.className = "";
      } else {
        this.toggleSodebar(!this.sidebar.opened);
        this.toggleMobile(true);
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
