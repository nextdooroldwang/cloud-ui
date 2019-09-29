<template>
  <a-tabs type="card" animated>
    <a-tab-pane tab="关联品类" key="1">
      <link-labels :active="project.id"/>
    </a-tab-pane>
    <a-tab-pane tab="关联图片" key="2">
      <link-images/>
    </a-tab-pane>
    <!-- <a-tab-pane tab="关联用户" key="3">
      <link-users :active="project.id"/>
    </a-tab-pane>-->
  </a-tabs>
</template>

<script>
import linkLabels from './linkLabels'
// import linkImages from './linkImages'
import linkImages from './images'
import linkUsers from './linkUsers'
import { mapState } from 'vuex'
export default {
  name: 'Link',
  components: {
    linkUsers, linkImages, linkLabels
  },
  computed: {
    ...mapState({
      project: state => state.project.project,

    })
  },
}
</script>

<style scoped>
</style>