<template>
  <div class="login-page">
    <div class="login-form">
      <el-form :model="loginForm" :rules="rules" ref="loginForm" class="demo-ruleForm">
        <el-form-item prop="username" class="login-input">
          <el-input v-model="loginForm.username" autocomplete="off" placeholder="账号"></el-input>
        </el-form-item>
        <el-form-item prop="password" class="login-input">
          <el-input type="password" v-model="loginForm.password" autocomplete="off" placeholder="密码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="login-btn__submit" type="primary" @click="handleLogin">登陆</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      loginForm: {
        username: "admin",
        password: "123456"
      },
      rules: {
        username: [{ message: "请输入活动名称", trigger: "blur" }],
        password: [{ validator: this.validatePassword, trigger: "blur" }]
      }
    };
  },
  methods: {
    validatePassword(rule, value, callback) {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        callback();
      }
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true;
          this.$store
            .dispatch("Login", this.loginForm)
            .then(() => {
              console.log("1111111222");
              this.loading = false;
              this.$router.push({ path: "/" });
            })
            .catch(() => {
              this.loading = false;
            });
        } else {
          console.log("请输入正确的用户名和密码！");
          return false;
        }
      });
    }
  }
};
</script>

<style lang="scss">
.login-page {
  background: blueviolet;
}
.login-form {
  padding: 35px 35px 25px;
  width: 288px;
  background: hsla(0, 0%, 100%, 0.91);
  border-radius: 5px;
  position: absolute;
  left: 50%;
  top: 50%;
  margin-top: -110px;
  margin-left: -179px;
  .login-input .el-input__inner {
    height: 40px;
    line-height: 40px;
  }
}
.login-btn__submit {
  width: 100%;
  height: 40px;
}

.isMoblie {
  .login-form {
    width: 258px;
  }
}
</style>