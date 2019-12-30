<template>
  <div class="project-menu-list">
    <div class="title">项目管理</div>
    <div class="menus">
      <div class="menu" v-for="item in projects" :key="item.id">
        <span>{{item.name}}</span>
        <svg-icon icon-class="delete" class="icon" />
      </div>
    </div>
    <div class="btn-group">
      <a-button>
        <a-icon type="plus" />创建项目
      </a-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProjectMenuList',
  data () {
    return {
      projects: [
        {
          id: 1,
          name: '我的组件',
        },
        {
          id: 2,
          name: '云组件',
        },

      ]
    }
  },

}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "@/assets/style/global.scss";

.project-menu-list {
  width: 100%;
  height: 100%;
  background: #fff;
  display: grid;
  grid-template-rows: auto 1fr auto;
  .title {
    font-size: 20px;
    font-weight: 500;
    padding: 15px;
  }
  .menu {
    font-size: 16px;
    font-weight: 400;
    padding: 15px 24px;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;

    &:hover {
      background: $hover;
      .icon {
        fill: red;
      }
    }
    .icon {
      fill: #fff;
    }
  }
  .btn-group {
    width: 100%;
    padding: 24px 0;
    text-align: center;
  }
}
</style>