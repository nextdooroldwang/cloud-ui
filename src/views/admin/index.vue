<template>
  <div class="admin-container">
    <div class="groups">
      <div class="form-group">
        <a-button @click="logout" style="margin-bottom:24px">
          <a-icon type="left"/>退出
        </a-button>
        <a-tabs type="card" animated>
          <a-tab-pane tab="项目" key="1">
            <projects/>
          </a-tab-pane>
          <a-tab-pane tab="品类" key="2">
            <labels/>
          </a-tab-pane>
          <!-- <a-tab-pane tab="文件夹" key="3">
            <files/>
          </a-tab-pane>-->
          <!-- <a-tab-pane tab="图片" key="4">
            <images/>
          </a-tab-pane>-->
          <a-tab-pane tab="用户" key="5">
            <users/>
          </a-tab-pane>
          <B slot="tabBarExtraContent" v-if="active">选择项目：{{project.name}}</B>
        </a-tabs>
      </div>
    </div>
    <div class="groups">
      <div class="form-group">
        <link-component v-if="active"/>
      </div>
    </div>
  </div>
</template>

<script>
import Projects from './components/projects'
import Labels from './components/labels'
import Images from './components/images'
import Users from './components/users'
// import Files from './components/files'
import LinkComponent from './components/link'
import { mapState } from 'vuex'
export default {
  name: 'Admin',
  data () {
    return {
      active: false
    }
  },
  components: {
    Projects, Labels, Images, Users, LinkComponent
  },
  computed: {
    ...mapState({
      project: state => state.project.project,
    })
  },
  watch: {
    project () {
      this.active = false
      this.$nextTick().then(() => {
        this.active = true
      })
    }
  },
  methods: {
    logout () {
      this.$store.dispatch('Logout').then(() => {
        this.$router.push({ path: '/login' })
      })
    }
  },
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