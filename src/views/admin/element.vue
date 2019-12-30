<template>
  <div class="element-container">
    <menu-list />
    <div class="content">
      <im />
    </div>
  </div>
</template>

<script>
import MenuList from './element/menulist'
import Im from './element/im'
export default {
  name: 'Element',
  components: { MenuList, Im },
  data () {
    return {


    }
  },

}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.element-container {
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
  }
}
</style>