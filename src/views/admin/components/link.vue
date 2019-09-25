<template>
  <a-tabs type="card" animated>
    <a-tab-pane tab="关联品类" key="1">
      <link-labels :active="active"/>
    </a-tab-pane>
    <a-tab-pane tab="关联图片" key="2">
      <link-images :active="active"/>
    </a-tab-pane>
    <a-tab-pane tab="关联用户" key="3">
      <link-users :active="active"/>
    </a-tab-pane>
  </a-tabs>
</template>

<script>
import linkLabels from './linkLabels'
import linkImages from './linkImages'
import linkUsers from './linkUsers'
export default {
  name: 'Link',
  props: ['active'],
  components: {
    linkUsers, linkImages, linkLabels
  },
}
</script>

<style scoped>
</style>