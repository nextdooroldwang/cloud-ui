<template>
  <div class="scaler">
    <template v-if="active">
      <span>缩放比例： {{Math.round(scale*100)+'%'}}</span>

      <span @click="setScale(1)">原图</span>
      <span @click="setScale(bestScale)">最佳</span>
      <span class="icon" :class="{'disabled':big}" @click="onBig">
        <svg-icon icon-class="big"/>
      </span>
      <span class="icon" :class="{'disabled':small}" @click="onSmall">
        <svg-icon icon-class="small"/>
      </span>
    </template>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'Scaler',
  computed: {
    ...mapState({
      scale: state => state.image.scale,
      active: state => state.image.active,
      bestScale: state => state.image.bestScale
    }),
    big () {
      return false
      // return this.scale === 1
    },
    small () {
      return this.scale === this.bestScale
    }
  },
  methods: {
    ...mapActions(['setScale']),
    onBig () {
      // this.scale <= .9 ? this.setScale(this.scale + .1) : this.setScale(1)
      this.setScale(this.scale + .1)
    },
    onSmall () {
      let best = this.bestScale
      this.scale >= .1 + best ? this.setScale(this.scale - .1) : this.setScale(best)
    }
  }
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
  fill: #fff;
  width: 1.3vw;
  height: 1.3vw;
}
.disabled .svg-icon {
  fill: #666;
  cursor: default;
}
</style>