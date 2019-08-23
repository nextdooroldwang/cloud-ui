<template>
  <div class="pagination">
    <template v-if="active">
      <span class="icon">
        <svg-icon icon-class="left"/>
      </span>
      <span>{{active}}</span>
      <span class="icon">
        <svg-icon icon-class="right"/>
      </span>
    </template>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'Pagination',
  computed: {
    ...mapState({
      active: state => state.image.active,
      images: state => state.image.images,
    })
  },
}
</script>

<style scoped>
.pagination {
  background: #242424;
  border-top: 1px solid #121212;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
}
.pagination span {
  margin: 0 24px;
}
.svg-icon {
  width: 1.3vw;
  height: 1.3vw;
}
</style>