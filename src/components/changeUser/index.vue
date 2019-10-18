<template>
  <a-dropdown>
    <a-menu slot="overlay" @click="handleChangeLang">
      <a-menu-item key="users">用户登录</a-menu-item>
      <a-menu-item key="admins">管理员</a-menu-item>
    </a-menu>
    <span class="svg-container">
      {{this.langValue}}
      <svg-icon icon-class="dropdown"/>
    </span>
  </a-dropdown>
</template>

<script>

export default {
  name: 'ChangeRole',
  data () {
    return {
      lang: this.$store.getters.role || 'users'
    }
  },
  computed: {
    langValue () {
      switch (this.lang) {
        case 'users':
          return '用户登录'
        case 'admins':
          return '管理员'
        default:
          return '用户登录'
      }
    }
  },
  methods: {
    handleChangeLang ({ key }) {
      this.lang = key
      this.$store.dispatch('changeRole', key)
      this.$message.success(key === 'admins' ? '管理员登录' : '用户登录')
    },
  }
}
</script>

<style scoped>
.svg-container {
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
  justify-content: space-between;
  align-items: center;
  padding: 0 8px;
  margin-left: 8px;
}
</style>