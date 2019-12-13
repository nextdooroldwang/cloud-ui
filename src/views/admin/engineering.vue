<template>
  <div class="project-container">
    <menu-list />
    <div class="content"></div>
  </div>
</template>

<script>
import MenuList from './engineering/menulist'
export default {
  name: 'Project',
  components: { MenuList },
  data () {
    return {
      projects: [
        {
          id: 1,
          name: 'project1',
        },
        {
          id: 2,
          name: 'project2',
        },
        {
          id: 3,
          name: 'project33',
        },
      ],

    }
  },

}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.project-container {
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 240px 1fr;
  > .content {
    width: 100%;
    height: calc(100vh - 40px);
    overflow-y: auto;
    padding: 20px;
  }
}
</style>