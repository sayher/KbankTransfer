<template>
  <div id="app">
    <!-- {{isIdle}}
    <modal v-if="isIdle" /> -->

    <router-view></router-view>
  </div>
</template>
<script>
/* eslint-disable */
// import modal from "_c/modal/modal";
export default {
  components: {
    // modal
  },
  computed: {
    isIdle() {
      // return this.$store.state.idleVue.isIdle;
    }
  }
};
</script>
<style>
@import "./assets/css/main.css";
@import "./assets/css/color-dark.css"; /*深色主题*/
/*  @import "./assets/css/theme-green/color-green.css";   /*浅绿色主题*/
</style>
