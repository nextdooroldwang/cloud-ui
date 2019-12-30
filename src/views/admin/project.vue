<template>
  <div class="project-container">
    <menu-list />
    <div class="content">
      <draggable v-model="cards" handle=".header">
        <transition-group class="cards" type="transition" name="flip-list">
          <component v-for="item in cards" :key="item.key" v-bind:is="item.component"></component>
        </transition-group>
      </draggable>
    </div>
  </div>
</template>

<script>
import MenuList from './project/menulist'
import RouteCard from './project/route/card'
import draggable from 'vuedraggable'
export default {
  name: 'Project',
  components: { draggable, MenuList, RouteCard },
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
      cards: [
        {
          key: 'route',
          component: 'RouteCard'
        }
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
  > .content {
    width: 100%;
    height: calc(100vh - 40px);
    overflow-y: auto;
    padding: 20px;
    background: #eee;
    .cards {
      width: 100%;
      display: grid;
      grid-template-columns: repeat(auto-fill, 50%);
      .flip-list-move {
        transition: transform 0.5s;
      }
    }
  }
}
</style>