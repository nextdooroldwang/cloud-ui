<template>
  <div class="project-container">
    <menu-list />
    <div class="content">
      <card />
    </div>
  </div>
</template>

<script>
import MenuList from './components/project/menulist'
import Card from './components/project/card'
export default {
  name: 'Project',
  components: { MenuList, Card },
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
          name: 'project3',
        },
      ]
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
  .content {
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: repeat(auto-fill, 50%);
  }
}
</style>