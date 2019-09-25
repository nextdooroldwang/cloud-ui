<template>
  <div class="login-content">
    <div class="login-form">
      <div class="login-lang">
        <div class="out-log" @click="logOut">退出登录</div>
        <div
          class="out-log"
          v-if="$store.getters.name === 'Cheng Zhi'"
          @click="$router.push({path:'/admin'})"
        >管理项目</div>
      </div>
      <div class="login-logo">项目设置</div>
      <a-form>
        <a-button
          :loading="loading"
          type="primary"
          class="login-button"
          style="width:100%;"
          @click="handleGo"
        >开始任务</a-button>
      </a-form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Project',

  data () {
    return {
      loading: false,
    }
  },
  methods: {
    logOut () {
      this.$store.dispatch('Logout').then(() => {
        this.$router.push({ path: '/login' })
      })
    },
    handleGo () {

    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
$dark_gray: #889aa4;
$light_gray: rgba(245, 248, 251, 1);

.login-content {
  .login-img {
    width: 618px;
    height: 540px;
    border-radius: 36px;
    overflow: hidden;
    float: left;
  }
  .login-form {
    float: left;
    padding: 0 32px;
    width: 365px;
    background: #fff;
    height: 540px;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 5px 20px -5px rgba(57, 78, 255, 0.3);
    border-radius: 36px;
    .login-lang {
      height: 90px;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      .out-log {
        cursor: pointer;
        width: 85px;
        height: 28px;
        background: rgba(245, 248, 251, 1);
        font-family: PingFangSC-Regular;
        font-weight: 400;
        font-size: 12px;
        color: rgba(104, 116, 142, 1);
        border-radius: 5px;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0 8px;
        margin-left: 8px;
      }
    }
    .login-logo {
      position: relative;
      margin-bottom: 58px;
      font-size: 24px;
      img {
        width: 230px;
        height: 69px;
      }
      span {
        background: #394eff;
        padding: 2px 4px;

        color: #fff;
        border-radius: 5px;
        position: absolute;
        right: -16px;
        bottom: 6px;
      }
    }
  }
  .go-register {
    height: 22px;
    font-size: 16px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(57, 78, 255, 1);
    line-height: 22px;
    text-align: center;
    margin-top: 27px;
  }

  .show-pwd {
    position: absolute;
    right: 48px;
    top: 2px;
    font-size: 14px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }

  .login-button {
    margin-top: 23px;
    width: 300px;
    height: 42px;
    border-radius: 10px;
    font-size: 16px;
    font-weight: 400;
    text-align: center;
  }

  .el-input {
    width: 300px;
    height: 42px;
    margin-left: 32px;
    border-radius: 10px;
  }
}

.red {
  color: red;
  font-size: 14px;
  margin-top: -15px;
}
</style>