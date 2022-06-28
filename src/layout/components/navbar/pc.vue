<template>
  <div class="navbar-pc">
    <div class="left-menu"></div>
    <div class="right-menu">
      <dropdown>
        <div class="avatar-wrap">
          <img class="avatar" src="https://moyv.top/images/default_head_img.jpg" alt="" />
        </div>
      </dropdown>
    </div>
  </div>
</template>

<script>
import dropdown from "./dropdown";
export default {
  name: "navbarPC",
  components: { dropdown },
  data() {
    return {};
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
@import "@/styles/variables.scss";
.navbar-pc {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 980;
  width: calc(100% - #{$sideBarWidth});
  height: 72px;
  overflow: hidden;
  background: #ffffff;
  box-shadow: 0px 0px 40px 0px rgb(82 63 105 / 10%);
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: width 0.3s;
  padding: 0 30px;

  .avatar-wrap {
    overflow: hidden;
    cursor: pointer;
    .avatar {
      width: 40px;
      height: 40px;
      border-radius: 6px;
      display: block;
    }
  }
}
</style>