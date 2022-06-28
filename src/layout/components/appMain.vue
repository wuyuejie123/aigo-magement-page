<template>
  <section class="app-main">
    <slot />
    <transition name="fadeInLeft" mode="out-in">
      <router-view :key="key" />
    </transition>
  </section>
</template>

<script>
export default {
  name: "appMain",
  computed: {
    key() {
      return this.$route.path;
    },
  },
};
</script>

<style scoped>
.app-main {
  width: 100%;
  position: relative;
  overflow: hidden;
  background-color: #eaf1f7;
  min-height: 100vh;
  padding-top: 72px;
}
</style>
