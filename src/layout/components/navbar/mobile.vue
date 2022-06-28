<template>
  <div class="navbar-mobile">
    <router-link v-if="settings" class="logo-link" to="/">
      <img v-if="settings.logo" :src="settings.logo" class="logo" />
    </router-link>
    <button class="btn-hamburger" :class="{ active: sidebar.opened }" @click="toggleSideBar">
      <span></span>
    </button>
    <dropdown>
      <div class="avatar-wrap">
        <img class="avatar" src="https://moyv.top/images/default_head_img.jpg" alt="" />
      </div>
    </dropdown>
  </div>
</template>

<script>
import dropdown from "./dropdown";
import { mapGetters } from "vuex";
import settings from "@/settings";
export default {
  name: "navbarMobile",
  components: { dropdown },
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
.navbar-mobile {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  width: 100%;
  height: 55px;
  overflow: hidden;
  background: #242939;
  box-shadow: 0px 1px 9px -3px rgb(0 0 0 / 10%);
  padding: 0 15px;
  display: flex;
  align-items: center;

  .logo-link {
    margin-right: auto;
  }
  .logo {
    width: 30px;
    height: 30px;
    display: block;
  }

  .btn-hamburger {
    width: 24px;
    height: 24px;

    @mixin spanLine() {
      display: block;
      position: absolute;
      border-radius: 3px;
      height: 3px;
      min-height: 3px;
    }
    > span {
      background-color: #484f66;
      top: 10px;
      width: 100%;
      transition: all 0.3s;
      @include spanLine();

      &::before {
        content: "";
        top: -8px;
        left: auto;
        right: 0px;
        width: 50%;
        background-color: inherit;
        @include spanLine();
      }
      &::after {
        content: "";
        left: auto;
        right: 0px;
        bottom: -8px;
        width: 75%;
        background-color: inherit;
        @include spanLine();
      }
    }
    &.active > span {
      background-color: #3699ff;
    }
  }

  .avatar-wrap {
    margin-left: 10px;
    .avatar {
      width: 30px;
      height: 30px;
      border-radius: 6px;
      display: block;
    }
  }
}
</style>