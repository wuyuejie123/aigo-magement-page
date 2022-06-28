<template>
  <div :class="classObj" class="app-wrapper">
    <div v-if="device === 'mobile' && sidebar.opened" class="sidebar-mask" @click="closeSideBar" />
    <sidebar class="sidebar-container" />
    <div class="main-container">
      <navbar />
      <appMain>
        <breadcrumb />
      </appMain>
    </div>
  </div>
</template>

<script>
import { sidebar, navbar, appMain, breadcrumb } from "./components";
import { mapGetters } from "vuex";
import resizeMixin from "./mixin/resizeHandler";
export default {
  name: "Layout",
  components: {
    sidebar,
    navbar,
    appMain,
    breadcrumb,
  },
  mixins: [resizeMixin],
  computed: {
    ...mapGetters(["sidebar", "device"]),
    classObj() {
      return {
        closeSidebar: !this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === "mobile",
      };
    },
  },
  methods: {
    closeSideBar() {
      this.$store.dispatch("app/closeSideBar", { withoutAnimation: false });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/variables.scss";
.app-wrapper {
  width: 100%;
  height: 100%;
  position: relative;

  .sidebar-mask {
    background: #000;
    opacity: 0.3;
    width: 100%;
    top: 0;
    height: 100%;
    position: absolute;
    z-index: 999;
  }

  .main-container {
    min-height: 100%;
    transition: margin-left 0.3s;
    margin-left: $sideBarWidth;
    position: relative;
  }
}
</style>