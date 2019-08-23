<template>
  <div class="pagination">
    <template v-if="active">
      <span>上一张</span>
      <span>{{active}}</span>
      <span>下一张</span>
    </template>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'Pagination',
  computed: {
    ...mapState({
      active: state => state.image.active
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
</style>