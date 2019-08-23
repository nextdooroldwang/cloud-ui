<template>
  <div class="sketchpad">
    <image-list/>
    <work-place/>
    <div class="tools">
      <tag-place/>
      <history/>
    </div>
  </div>
</template>

<script>
import ImageList from './components/ImageList'
import WorkPlace from './components/WorkPlace'
import TagPlace from './components/TagPlace'
import History from './components/History'
export default {
  name: 'Sketchpad',
  components: {
    ImageList, WorkPlace, TagPlace, History
  },
}
</script>

<style lang="less" scoped>
.sketchpad {
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 12vw 1fr 12vw;
  color: #fff;

  .tools {
    height: calc(100vh - 64px);
    overflow-y: auto;
    background: #242424;
    border-left: 1px solid #121212;
  }
}
</style>