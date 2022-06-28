<template>
  <div class="navbar-wrapper">
    <navbarPC v-if="device == 'desktop'" />
    <navbarMobile v-else />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import navbarPC from "./pc";
import navbarMobile from "./mobile";
export default {
  components: { navbarPC, navbarMobile },
  computed:{
      ...mapGetters(["device"]),
  }
};
</script>

<style>
</style>