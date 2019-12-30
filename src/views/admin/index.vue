<template>
  <div class="admin-container">
    <div class="content">
      <div class="menu-box">
        <div
          class="menu"
          :class="{'active':active === key}"
          @click="onClick(key)"
          v-for="(item,key) in menuList"
          :key="key"
        >
          <svg-icon :icon-class="item.icon" class="icon" />
          <span>{{item.name}}</span>
        </div>
      </div>
      <router-view />
    </div>
    <div class="footer"></div>
  </div>
</template>

<script>
const menuList = {
  '1': {
    name: '项目',
    icon: 'project',
    route: 'Project'
  },
  '2': {
    name: '工程',
    icon: 'engineering',
    route: 'Engineering'
  },
  '3': {
    name: '物料',
    icon: 'components',
    route: 'Element'
  }
}
export default {
  name: 'Admin',
  data () {
    return {
      active: this.activeRouter() || '1',
      menuList
    }
  },
  methods: {
    activeRouter () {
      let name = this.$route.name
      let key = ''
      for (let i in menuList) {
        menuList[i].route === name && (key = i)
      }
      return key
    },
    onClick (key) {
      this.active = key
      this.$router.push({ name: menuList[key].route })
    }
  },
}
</script>

<style rel="stylesheet/scss" lang="scss">
@import "@/assets/style/global.scss";

.admin-container {
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-rows: 1fr 40px;
  > .content {
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: 80px 1fr;
    .menu-box {
      width: 100%;
      height: 100%;
      background: $primary;
      color: #fff;
      .menu {
        width: 100%;
        height: 50px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        font-size: 1vw;
        margin-top: 32px;
        border-left: 3px solid $primary;
        cursor: pointer;
        .icon {
          font-size: 24px;
        }
      }
      .active {
        border-left: 3px solid #fff;
      }
    }
  }
  .footer {
    width: 100%;
    height: 100%;
    background: $primary;
    color: #fff;
    box-shadow: 0 -3px 5px 0 rgba(0, 0, 0, 0.12);
  }
}
</style>