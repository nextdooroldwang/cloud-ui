<template>
  <a-locale-provider :locale="locale">
    <div id="app">
      <router-view/>
    </div>
  </a-locale-provider>
</template>
<script>
//antd-vue语言包 不用antd可删除
import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN'
import enUS from 'ant-design-vue/lib/locale-provider/en_US'
import jaJP from 'ant-design-vue/lib/locale-provider/ja_JP'

export default {
  computed: {
    locale () {
      switch (this.$store.getters.lang) {
        case 'en':
          return enUS
        case 'zh':
          return zhCN
        case 'ja':
          return jaJP
        default:
          return enUS
      }
    }
  },

}
</script>
<style lang="less">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  height: 100%;
}
#nav {
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
