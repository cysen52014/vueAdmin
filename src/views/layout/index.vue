<template>
  <div class="app-wrapper">
    <app-header></app-header>
    <div class="app-body">
      <sidebar class="sidebar-container"></sidebar>
      <div class="main-container">
        <section class="app-main">
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

export default {
  name: "layout",
  data() {
    return {};
  },
  components: {
    appHeader,
    Sidebar,
    AppMains
  },
  methods: {
    logout() {
      this.$store.dispatch("LogOut").then(() => {
        location.reload();
      });
    }
  }
};
</script>
