<template>
  <div class="admin-container">
    <div class="groups">
      <div class="form-group">
        <a-tabs type="card" animated>
          <a-tab-pane tab="项目" key="1">
            <projects @onActive="onActive"/>
          </a-tab-pane>
          <a-tab-pane tab="品类" key="2">
            <labels/>
          </a-tab-pane>
          <a-tab-pane tab="图片" key="3">
            <images/>
          </a-tab-pane>
        </a-tabs>
      </div>
    </div>
    <div class="groups">
      <div class="form-group">
        <link-component v-if="active" :active="active"/>
      </div>
    </div>
  </div>
</template>

<script>
import Projects from './components/projects'
import Labels from './components/labels'
import Images from './components/images'
import LinkComponent from './components/link'
export default {
  name: 'Admin',
  data () {
    return {
      active: null
    }
  },
  components: {
    Projects, Labels, Images, LinkComponent
  },
  methods: {
    onActive (id) {
      this.active = null
      this.$nextTick().then(() => {
        this.active = id
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
$dark_gray: #889aa4;
$light_gray: rgba(245, 248, 251, 1);
.admin-container {
  width: 100vw;
  height: 100vh;
  padding: 24px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 12px;
  .line {
    width: 100%;
    border-top: 3px dashed #ddd;
    margin: 24px 0;
  }
  .groups {
    width: 100%;
    height: calc(100vh - 48px);
    display: grid;
    grid-template-rows: repeat(1fr, 3);
    grid-gap: 12px;
  }
  .form-group {
    padding: 32px 32px;
    width: 100%;
    height: 100%;
    overflow-y: auto;
    background: #fff;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 5px 20px -5px rgba(57, 78, 255, 0.3);
    border-radius: 12px;
    // &::-webkit-scrollbar {
    //   width: 0;
    // }
    .btn-group {
      button {
        margin: 0 12px;
      }
    }
  }
}
</style>