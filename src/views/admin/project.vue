<template>
  <div class="project-container">
    <menu-list />
    <div class="content">
      <draggable v-model="arr">
        <transition-group>
          <!-- <div class="cards"> -->
          <card v-for="item in arr" :key="item" />
          <!-- </div> -->
        </transition-group>
      </draggable>
    </div>
  </div>
</template>

<script>
import MenuList from './components/project/menulist'
import Card from './components/project/card'
import draggable from 'vuedraggable'
export default {
  name: 'Project',
  components: { draggable, MenuList, Card },
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
      arr: [1, 2, 3, 4, 5, 6, 7, 8, 9]
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
    .cards {
      width: 100%;
      display: grid;
      grid-template-columns: repeat(auto-fill, 50%);
    }
  }
}
</style>