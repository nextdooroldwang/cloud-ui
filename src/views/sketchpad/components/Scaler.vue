<template>
  <div class="scaler">
    <template v-if="active">
      <span>缩放比例： {{Math.round(scale*100)+'%'}}</span>

      <span>原图</span>
      <span>最佳</span>
      <span class="icon">
        <svg-icon icon-class="big"/>
      </span>
      <span class="icon">
        <svg-icon icon-class="small"/>
      </span>
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
.svg-icon {
  width: 1.3vw;
  height: 1.3vw;
}
</style>