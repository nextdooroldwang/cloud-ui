<template>
  <div ref="main" class="main">
    <canvas
      v-if="active"
      :width="width"
      :height="height"
      ref="canvas"
      @mousemove="onmove"
      @mousedown="ondown"
      @mouseup="onup"
    ></canvas>
    <img hidden="hidden" ref="img">
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

let ctx = null
export default {
  name: 'Editer',
  data () {
    return {
      width: 0,
      height: 0,
      point: {},
    }
  },
  computed: {
    ...mapState({
      images: state => state.image.images,
      points: state => state.image.points,
      scale: state => state.image.scale,
      tag: state => state.image.tag,
      active: state => state.image.active,
      drawing: state => state.image.drawing,
    })
  },
  watch: {
    active () {
      this.width = 0
      this.height = 0
      let _this = this
      let img = this.$refs.img
      img.src = this.images[this.active].data
      img.onload = function () {
        _this.countScale(img)
      }
    },
    scale (v) {
      this.setCanvas(v)
    },
    points () {
      ctx && this.draw()
    }
  },
  methods: {
    ...mapActions(['setScale', 'setDrawing', 'setPoint', 'finishedDraw']),
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
      this.width = this.$refs.img.width * s
      this.height = this.$refs.img.height * s
      this.$nextTick().then(() => {
        ctx = this.$refs.canvas.getContext('2d')
        ctx.lineWidth = 4;        //边框宽度
        this.draw()
      })

    },
    draw () {
      let { width, height, points, active } = this
      let img = this.$refs.img
      ctx.clearRect(0, 0, width, height)
      ctx.drawImage(img, 0, 0, width, height)
      for (let key in points) {
        if (key != active) {
          let { startX, startY, endX, endY, color } = points[key]
          ctx.strokeStyle = color; //边框颜色
          ctx.strokeRect(startX, startY, endX - startX, endY - startY)
        }
      }
    },
    onmove (e) {
      if (this.drawing) {
        let { point, tag } = this
        let endX = e.offsetX
        let endY = e.offsetY
        let x = point.startX
        let y = point.startY

        this.draw()
        ctx.strokeStyle = tag.tagColor; //边框颜色
        ctx.strokeRect(x, y, endX - x, endY - y);
      }

    },
    onup (e) {
      let { point, tag } = this
      let endX = e.offsetX
      let endY = e.offsetY
      let x = point.startX
      let y = point.startY
      let parms = {
        startX: x,
        startY: y,
        endX,
        endY,
        color: tag.tagColor,
        type: tag.tagName
      }

      this.setPoint({ key: this.drawing, value: parms })
      this.finishedDraw()
    },
    ondown (e) {
      let startX = e.offsetX
      let startY = e.offsetY
      let uuid = new Date().getTime() + ''
      let parms = {
        startX,
        startY,
        endX: startX,
        endY: startY,
        color: this.tag.tagColor,
        type: this.tag.tagName
      }

      this.point = parms
      this.setDrawing(uuid)
    },

  }
}
</script>

<style scoped>
.main {
  width: 100%;
  height: 100%;
  background: #434343;
  overflow: auto;
  padding: 24px;
  position: relative;
  text-align: center;
}
</style>