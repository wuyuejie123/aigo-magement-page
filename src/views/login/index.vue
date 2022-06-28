<template>
  <div class="login-container">
    <div class="login-body">
      <div class="login-pic"></div>
      <el-form class="login-form" label-position="top">
        <div class="form-title">欢迎访问</div>
        <el-form-item label="账号">
          <el-input v-model="loginForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="loginForm.password" type="password"></el-input>
        </el-form-item>
        <el-button type="primary" @click="login">登录</el-button>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      loginForm: {
        username: "admin",
        password: "111111",
      },
    };
  },
  methods: {
    login() {
      this.$message.success("登录成功");
      // setTimeout(() => this.$router.push({ path: "/" }), 800);
      this.$router.push(
          {
          path: "/index/index"
      }
      )
    },
  },
};
</script>

<style lang="scss">
/* reset element-ui css */
.login-form {
  .el-form-item__label {
    font-weight: bold;
    color: #181c32;
    line-height: 1.2;
    font-size: 15px;
    padding-bottom: 8px;
  }
  .el-input__inner {
    background-color: #f3f6f9;
    border-color: #f3f6f9;
    color: #3f4254;
    height: 50px;
    border-radius: 8px;
  }
}
</style>
<style lang="scss" scoped>
.login-container {
  min-height: 100%;
  width: 100%;
  background-color: #ffffff;
  overflow: hidden;
  .login-body {
    margin: auto;
    max-width: 1340px;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 28px;
  }
  .login-pic {
    height: 100%;
    flex: 1;
    background-image: url("./svg/1_01.svg");
    background-position: center;
    background-repeat: no-repeat;
    background-size: contain;
    margin: 20px;
  }
  .login-form {
    width: 550px;
    box-shadow: 0px 0px 80px 0px rgb(77 84 124 / 9%);
    padding: 70px 80px;
    border-radius: 10px;
    .form-title {
      font-size: 26px;
      font-weight: bold;
      margin-bottom: 46px;
    }
  }
}
</style>
