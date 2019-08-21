<template>
  <a-layout-header class="layout-header">
    <div class="avatar-box">
      <div class="setter">
        <div class="user-name">预留全局设置</div>
        <a-dropdown class="user-setting">
          <a href="#">
            Settings
            <a-icon type="down"/>
          </a>
          <a-menu slot="overlay" @click="onClick">
            <a-menu-item key="1">清除缓存</a-menu-item>
          </a-menu>
        </a-dropdown>
      </div>
    </div>
  </a-layout-header>
</template>

<script>
import { clearAll } from '@/utils/storage'
export default {
  name: 'GlobalHeader',

  methods: {
    onClick ({ key }) {

      if (key == "1") {
        console.log(key)
        clearAll()

      }

    },

  },
}
</script>

<style lang="less" scoped>
.layout-header {
  display: flex;
  justify-content: flex-end;
  padding-right: 48px;
  height: 64px;
  line-height: 64px;
  background: #171617;
  color: #fff;
  .avatar-box {
    display: flex;
    align-items: center;
    .setter {
      .user-name {
        width: 101px;
        height: 19px;
        font-size: 14px;
        font-family: OpenSans-Semibold;
        font-weight: 600;
        color: rgba(225, 225, 225, 1);
      }
      .user-setting {
        width: 93px;
        height: 17px;
        font-size: 12px;
        font-family: OpenSans-Regular;
        font-weight: 400;
        color: rgba(225, 225, 225, 0.75);
      }
    }
  }
}
</style>