<template>
  <div class="scaler">
    <template v-if="active">
      <span>放大</span>
      <span>{{Math.round(scale*100)+'%'}}</span>
      <span>缩小</span>
    </template>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'Scaler',
  computed: {
    ...mapState({
      scale: state => state.image.scale,
      active: state => state.image.active
    })
  },
}
</script>

<style scoped>
.scaler {
  background: #242424;
  height: 100%;
  border-bottom: 1px solid #121212;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
}
.scaler span {
  margin: 0 24px;
  cursor: pointer;
}
</style>