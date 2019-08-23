<template>
  <div class="workplace">
    <scaler/>
    <editer/>
    <pagination/>
  </div>
</template>

<script>
import Scaler from './Scaler'
import Pagination from './Pagination'
import Editer from './Editer'

export default {
  name: 'WorkPlace',
  components: {
    Scaler, Pagination, Editer
  },
}
</script>


<style lang="less" scoped>
.workplace {
  width: 100%;
  height: calc(100vh - 64px);
  display: grid;
  grid-template-rows: 42px 1fr 42px;
}
</style>