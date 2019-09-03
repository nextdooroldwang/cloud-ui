<template>
  <a-layout id="components-layout-demo-custom-trigger">
    <a-layout>
      <a-layout-header style="background: #fff; padding: 0">
        <global-header/>
      </a-layout-header>

      <a-layout-content :style="{  height: 'calc(100vh - 64px)' }">
        <transition name="page-transition">
          <router-view/>
        </transition>
      </a-layout-content>
    </a-layout>
    <div class="instructions" v-if="false">
      <div></div>
      <div>
        <div>
          <div></div>
          <div></div>
        </div>
        <div>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  </a-layout>
</template>
<script>
import GlobalHeader from '@/components/page/Header'
export default {
  data () {
    return {
    }
  },
  components: {
    GlobalHeader
  },
}
</script>
<style>
.ant-layout-sider-children {
  background: #fff;
  box-shadow: 2px 0 6px rgba(0, 21, 41, 0.35);
}
.breadcrumb {
  width: 100%;
  height: 44px;
  display: flex;
  align-items: center;
  padding-left: 32px;
  background: #fff;
  margin-top: 4px;
}
#components-layout-demo-custom-trigger .trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}

#components-layout-demo-custom-trigger .trigger:hover {
  color: #394eff;
}

.page-transition-enter {
  opacity: 0;
}

.page-transition-leave-active {
  opacity: 0;
}

.page-transition-enter .page-transition-container,
.page-transition-leave-active .page-transition-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
.instructions {
  position: absolute;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.4);
  display: grid;
  grid-template-rows: 42px 1fr 42px;
}
</style>