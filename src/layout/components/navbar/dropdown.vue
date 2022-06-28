<template>
  <div ref="dropdown">
    <div @click="toggleHandler">
      <slot />
    </div>
    <transition name="fadeInUp">
      <div v-if="visible" class="navbar-dropdown">
        <div class="menu-header">
          <img
            class="avatar"
            src="https://moyv.top/images/default_head_img.jpg"
            alt=""
          />
          <div class="info">
            <div class="name">管理员</div>
            <div class="desc">@qq.com</div>
          </div>
        </div>
        <div class="app-separator"></div>
        <div class="menu-item">
          <div class="menu-link">主页</div>
        </div>
        <div class="menu-item">
          <div class="menu-link">退出登录</div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      visible: false,
    };
  },
  created() {
    window.addEventListener("click", this.closeHandler);
  },
  beforeDestroy() {
    window.removeEventListener("click", this.closeHandler);
  },
  methods: {
    toggleHandler() {
      this.visible = !this.visible;
    },
    closeHandler(e) {
      if (this.visible == true) {
        let tree = this.$refs.dropdown;
        if (tree) {
          if (!tree.contains(e.target)) {
            this.visible = false;
          }
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.navbar-dropdown {
  position: fixed;
  right: 30px;
  top: 72px;
  border-radius: 4px;
  background-color: #fff;
  box-shadow: 0 0 50px 0 rgb(82 63 105 / 20%);
  padding: 13px 0;
  width: 275px;
  z-index: 900;
  .menu-item {
    padding: 0 10px;
  }
  .menu-header {
    padding: 10px 20px;
    display: flex;
    align-items: center;
    .avatar {
      width: 50px;
      height: 50px;
      display: block;
      border-radius: 6px;
    }
    .info {
      display: flex;
      flex-direction: column;
      margin-left: 10px;
    }
    .name {
      font-weight: bold;
      font-size: 14.5px;
      color: #181c32;
    }
    .desc {
      font-size: 12px;
      font-weight: bold;
      color: #a1a5b7;
    }
  }
  .app-separator {
    margin: 6.5px 0;
  }
  .menu-item {
    padding: 0 20px;
    .menu-link {
      color: #7e8299;
      border-radius: 6.5px;
      font-size: 13px;
      font-weight: bold;
      padding: 8.5px 15px;
      cursor: pointer;
      transition: all 0.2s;
      &:hover {
        background-color: #f1faff;
        color: #00b2ff;
      }
    }
  }
}
</style>