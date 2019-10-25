<template>
  <div class="login-content">
    <div class="login-form">
      <div class="login-lang">
        <change-lang/>
      </div>
      <div class="login-logo">登录</div>
      <a-form>
        <a-form-item
          :validate-status="loginRules.username.status"
          :has-feedback="loginRules.username.status==='success'"
          :help="loginRules.username.help"
          :style="{marginBottom:'24px'}"
        >
          <a-input
            @change="validate"
            v-model="loginForm.username"
            type="text"
            placeholder="username"
            size="large"
          >
            <svg-icon slot="prefix" icon-class="user" :class-name="userStyle"/>
          </a-input>
        </a-form-item>
        <a-form-item
          :validate-status="loginRules.password.status"
          :has-feedback="loginRules.password.status==='success'"
          :help="loginRules.password.help"
        >
          <a-input
            :type="pwdType"
            v-model="loginForm.password"
            placeholder="password"
            @pressEnter="handleLogin"
            @change="validate"
            size="large"
          >
            <svg-icon slot="prefix" icon-class="pwd" :class-name="pwdStyle"/>
          </a-input>
        </a-form-item>
        <!-- <a-form-item> -->
        <a-button
          :loading="loading"
          type="primary"
          class="login-button"
          style="width:100%;"
          @click="handleLogin"
        >{{$t('login.login')}}</a-button>
        <!-- </a-form-item> -->
      </a-form>
    </div>
  </div>
</template>

<script>
import {
  isvalidUsername
} from '@/utils/validate'
import ChangeLang from '@/components/i18n/ChangeLang'
export default {
  name: 'Login',
  components: {
    ChangeLang
  },
  data () {
    return {
      loginForm: {
        username: 'wangmeng',
        password: '123456'
      },
      loginRules: {
        username: {
          status: '',
          help: ''
        },
        password: {
          status: '',
          help: ''
        }
      },
      loading: false,
      pwdType: 'password',
      redirect: undefined,
      userStyle: 'default',
      pwdStyle: 'default',
    }
  },
  watch: {
    $route: {
      handler: function (route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  methods: {
    showPwd () {
      if (this.pwdType === 'password') {
        this.pwdType = ''
      } else {
        this.pwdType = 'password'
      }
    },
    async handleLogin () {
      if (this.validate()) {

        this.loading = true
        await this.$store.dispatch('Login', this.loginForm).then(() => {
          this.$router.push({
            path: this.redirect || '/'
          })
        })
        this.loading = false
      } else {
        console.log('error submit!!')
        return false
      }
    },
    validate () {
      let a = 0
      if (!isvalidUsername(this.loginForm.username)) {
        a++
        this.loginRules.username = {
          status: 'error',
          help: this.$t('login.validatauser')
        }
      } else {
        this.loginRules.username = {
          status: 'success',
          help: ''
        }
      }
      if (this.loginForm.password.length < 5) {
        a++
        this.loginRules.password = {
          status: 'error',
          help: this.$t('login.validatapsw')
        }
      } else {
        this.loginRules.password = {
          status: 'success',
          help: ''
        }
      }
      return a > 0 ? false : true
    },
    handleChangeLang () {
      this.validate()
    },

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
    height: 540px;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 5px 20px -5px rgba(57, 78, 255, 0.3);
    border-radius: 36px;
    .login-lang {
      height: 90px;
      display: flex;
      justify-content: flex-end;
      align-items: center;
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