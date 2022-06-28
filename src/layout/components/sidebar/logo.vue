<template>
  <div class="logo-wrap" :class="{ collapse: !sidebar.opened }">
    <transition name="logoFade">
      <router-link v-if="sidebar.opened" class="logo-link" to="/">
        <img v-if="settings.logo" :src="settings.logo" class="logo" />
        <h1 class="title">{{ settings.title }}</h1>
      </router-link>
    </transition>
    <hamburger :is-active="!sidebar.opened" @toggleClick="toggleSideBar" />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import hamburger from "../hamburger";
import settings from "@/settings";
export default {
  name: "logo",
  components: { hamburger },
  computed: {
    ...mapGetters(["sidebar"]),
  },
  data() {
    return {
      settings,
    };
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch("app/toggleSideBar");
    },
  },
};
</script>

<style lang="scss" scoped>
.logoFade-enter-active {
  transition: opacity 1s;
}

.logoFade-enter,
.logoFade-leave-to {
  opacity: 0;
}

.logo-wrap {
  position: relative;
  width: 100%;
  height: 72px;
  padding: 0 20px;
  overflow: hidden;
  display: flex;
  align-items: center;
  &.collapse {
    padding: 0 12px;
  }
  .logo-link {
    flex: 1;
    overflow: hidden;
    height: 100%;
    display: flex;
    align-items: center;
  }
  .logo {
    width: 32px;
    height: 32px;
    margin-right: 12px;
  }
  .title {
    margin: 0;
    color: #ffffff;
    font-weight: 600;
    font-size: 14px;
    vertical-align: middle;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap !important;
    outline: 0 !important;
  }
}
</style>
