<template>
  <div class="login-router-container">
    <a-steps direction="vertical" :current="current">
      <a-step title="用户登录" description="用户登录匹配自己的任务"/>
      <a-step title="选择任务" description="选择项目和图片."/>
      <a-step title="开始任务" description="打标签."/>
    </a-steps>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'UserLayout',
  data () {
    return {
      current: 0
    }
  },
  watch: {
    $route: {
      handler: function (route) {
        this.current = route.name === 'Login' ? 0 : 1
      },
      immediate: true
    }
  },
}
</script>

<style lang="less">
.login-router-container {
  min-width: 100%;
  min-height: 100%;
  display: grid;
  grid-template-columns: 25vw 40vw;
  align-items: center;
  justify-content: center;
  background: #fff;
  // .ant-steps-item-finish > .ant-steps-item-content > .ant-steps-item-title {
  //   color: #fff;
  // }
  // .ant-steps-item-process > .ant-steps-item-content > .ant-steps-item-title {
  //   color: rgba(255, 255, 255);
  //   font-weight: 700;
  // }
  // .ant-steps-item-wait > .ant-steps-item-content > .ant-steps-item-title {
  //   color: rgba(255, 255, 255, 0.45);
  // }
  // .ant-steps-item-finish
  //   > .ant-steps-item-content
  //   > .ant-steps-item-description {
  //   color: rgba(255, 255, 255, 0.45);
  // }
  // .ant-steps-item-process
  //   > .ant-steps-item-content
  //   > .ant-steps-item-description {
  //   color: rgba(255, 255, 255);
  // }
  // .ant-steps-item-wait > .ant-steps-item-content > .ant-steps-item-description {
  //   color: rgba(255, 255, 255, 0.45);
  // }
}
</style>
