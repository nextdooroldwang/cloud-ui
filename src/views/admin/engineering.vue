<template>
  <div class="engineering-container">
    <menu-list />
    <div class="content"></div>
  </div>
</template>

<script>
import MenuList from './engineering/menulist'
export default {
  name: 'engineering',
  components: { MenuList },
  data () {
    return {


    }
  },

}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.engineering-container {
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