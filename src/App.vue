<template>
  <div id="app">
    <top-navbar> </top-navbar>
    <transition name="fade" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>
<script>
import("sweetalert2/dist/sweetalert2.css");
import TopNavbar from "@/layouts/TopNavbar";
export default {
  name: "app",
  components: {
    topNavbar: TopNavbar,
  },
  data() {
    return {
      title: "Lefo.net",
      fullPage: true,
    };
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
