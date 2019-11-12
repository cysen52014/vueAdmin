<template>
  <div id="app">
    <transition name="fade-transform" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import "vue-transition.css";
export default {
  name: "App",
  data() {
    return {};
  }
};
</script>
<style rel="stylesheet/scss" lang="scss">
html,
body {
  width: 100%;
  height: 100%;
  font-family: "微软雅黑";
  background: #f1f3f6;
}
#app {
  width: 100%;
  height: 100%;
  .app-wrapper {
    width: 100%;
    height: 100%;
  }
}
</style>
