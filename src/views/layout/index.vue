<template>
  <div class="app-wrapper">
    <app-header></app-header>
    <div class="app-body">
      <sidebar class="sidebar-container"></sidebar>
      <div class="main-container">
        <section class="app-main">
          <el-breadcrumb class="breadcrumb" separator="/">
            <el-breadcrumb-item
              v-for="(item, index) in breadcrumbList"
              :key="index"
              ><a
                v-if="
                  index > 0 && index < breadcrumbList.length - 1 && item.toJump
                "
                @click="gopath(item)"
                >{{ item.name }}</a
              ><span v-else-if="index === 0">{{ item.name }}</span
              ><span v-else>{{ item.name }}</span></el-breadcrumb-item
            >
          </el-breadcrumb>
          <AppMains />
        </section>
      </div>
    </div>
  </div>
</template>

<script>
import AppMains from "@/views/layout/main/index.vue";
import appHeader from "@/views/layout/header/index.vue";
import Sidebar from "@/views/layout/sidebar/index.vue";
import { mapActions } from "vuex";
export default {
  name: "layout",
  data() {
    return {
      breadcrumbList: []
    };
  },
  components: {
    appHeader,
    Sidebar,
    AppMains
  },
  watch: {
    $route: {
      handler(newName, oldName) {
        if (newName) {
          this.breadcrumbList = [];
          this.getBreadcrumbs(this.$route);
        }
      },
      immediate: true,
      deep: true
    }
  },
  methods: {
    logout() {
      this.$store.dispatch("LogOut").then(() => {
        location.reload();
      });
    },
    getBreadcrumbs(route) {
      this.breadcrumbList.unshift(route);
      if (route.meta._parent) {
        this.getBreadcrumbs(route.meta._parent[0]);
      }
    },
    gopath(item) {
      this.$router.push(item.path);
    }
  }
};
</script>
<style lang="scss" scoped>
.breadcrumb {
  margin: 0px 0 20px 5px;
}
</style>
