<template>
  <div ref="main" class="main">
    <canvas-component v-if="clear" :width="width" :height="height" :img="img" ref="canvasDom"/>
    <img hidden="hidden" ref="img">
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import CanvasComponent from './Canvas'

export default {
  name: 'Editer',
  data () {
    return {
      width: 0,
      height: 0,
      clear: false,
      img: null
    }
  },
  components: { CanvasComponent },
  computed: {
    ...mapState({
      images: state => state.image.images,
      scale: state => state.image.scale,
      active: state => state.image.active,
    })
  },
  watch: {
    active () {
      this.clear = false
      let _this = this
      let img = this.$refs.img
      let index = null
      this.images.map((item, i) => {
        if (item.key === this.active) {
          img.src = item.data
          index = i
        }
      })
      img.onload = function () {
        _this.countScale(img)
        _this.setImage({ index, width: img.width, height: img.height })
      }
    },
    scale (v) {
      this.setCanvas(v)
    },
  },
  methods: {
    ...mapActions(['setScale', 'setPoint', 'setImage', 'finishedDraw']),
    countScale (dom) {
      let w = this.$refs.main.clientWidth - 54
      let h = this.$refs.main.clientHeight - 54
      let scale = 1

      if ((dom.height < dom.width) && (dom.width < w)) {
        scale = w / dom.width
      } else {
        scale = h / dom.height
      }
      this.scale === scale ? this.setCanvas(scale) : this.setScale(scale)
    },
    setCanvas (s) {
      this.img = this.$refs.img
      this.width = this.$refs.img.width * s
      this.height = this.$refs.img.height * s
      this.$nextTick().then(() => {
        this.clear = true
      })
    },
  }
}
</script>

<style scoped>
.main {
  width: 100%;
  height: 100%;
  background: #434343;
}
</style>