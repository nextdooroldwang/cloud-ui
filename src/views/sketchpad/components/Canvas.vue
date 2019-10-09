<template>
  <div class="canvas-box" ref="cbox">
    <canvas id="c" ref="canvas" :width="width" :height="height"></canvas>
  </div>
</template>

<script>
import { fabric } from 'fabric'
import { mapState, mapActions } from 'vuex'
const PRIMARY = '#559cf8'
const DEFAULT = '#fff'
export default {
  name: 'Canvas',
  data () {
    return {
      canvas: null,
      ll: null,
      lr: null,
      lt: null,
      lb: null,
      point: {},
      rects: {}
    }
  },
  props: ['width', 'height', 'img'],
  computed: {
    ...mapState({
      points: state => state.image.points,
      scale: state => state.image.scale,
      tag: state => state.image.tag,
      active: state => state.image.active,
      drawing: state => state.image.drawing,
      editting: state => state.image.editting,
      focus: state => state.image.focus,
      allowEditing: state => state.image.allowEditing,
      keyboard: state => state.image.keyboard,
      bestScale: state => state.image.bestScale
    })
  },
  watch: {
    points (newpoints) {
      this.canvas && this.isMinusPoint(newpoints, this.rects) && this.drawRemove()
    },
    tag (newtag, oldtag) {
      newtag.tagName != oldtag.tagName && this.drawReset({ t: newtag.tagName })
    },
    focus (newfocus, oldfocus) {
      newfocus && (newfocus != oldfocus) && this.drawReset({ k: newfocus })
    },
    allowEditing (a) {
      this.allowAll(a)
    },
    keyboard (code) {
      this.onKeyup(code.split(',')[0])
    }
  },
  mounted () {
    this.canvas = new fabric.Canvas(this.$refs.canvas.id);
    this.canvas.on('mouse:down', this.ondown)
    this.canvas.on('mouse:up', this.onup)
    this.canvas.on('mouse:move', this.onmove)
    this.canvas.on('mouse:out', this.onout)
    this.canvas.add(this.drawImage(this.img, this.scale))

    this.ll = this.drawRuler(0, 0, 0, 0)
    this.lr = this.drawRuler(0, 0, 0, 0)
    this.lt = this.drawRuler(0, 0, 0, 0)
    this.lb = this.drawRuler(0, 0, 0, 0)
    this.canvas.add(this.ll)
    this.canvas.add(this.lr)
    this.canvas.add(this.lt)
    this.canvas.add(this.lb)
    this.drawAll()
  },
  methods: {
    ...mapActions(['setDrawing', 'setEditting', 'setFocus', 'setPoint', 'delPonit', 'finishedDraw']),
    drawImage (img, s) {
      let imgInstance = new fabric.Image(img, {  //设置图片位置和样子
        left: 0,
        top: 0,
        evented: false,
        selectable: false,
        hasRotatingPoint: false,
        hasControls: false
      });
      imgInstance.scale(s)
      return imgInstance
    },
    drawRuler (startX, startY, endX, endY) {
      return new fabric.Line([startX, startY, endX, endY], {
        stroke: '#fff',
        hasBorders: false,
        hasControls: false,
        selectable: false,
        evented: false,
        hasRotatingPoint: false,
      });
    },
    drawRect (left, top, width, height, activated) {
      return new fabric.Rect({
        left,
        top,
        width,
        height,
        fill: null,
        strokeWidth: 4,
        stroke: activated ? PRIMARY : DEFAULT,
        hasBorders: false,
        hasControls: false,
        cornerColor: '#ffffff',
        transparentCorners: false,
        cornerSize: 8,

        selectable: false,
        evented: this.allowEditing,
        hoverCursor: 'default',
        hasRotatingPoint: false,

        // noScaleCache: false
      });
    },
    drawAll () {
      let { points, active, canvas, tag, scale } = this
      for (let key in points) {
        if (key != active) {
          let { startX, startY, endX, endY, type } = points[key]
          this.newRectObj(key, canvas, startX * scale, startY * scale, (endX - startX) * scale, (endY - startY) * scale, type === tag.tagName)
        }
      }

    },
    drawRemove () {
      for (let key in this.rects) {
        if (!this.points[key]) {
          this.canvas.remove(this.rects[key])
          this.$delete(this.rects, key)
        }
      }
    },
    drawReset ({ t, k }) {
      if (t) {
        for (let key in this.rects) {
          if (this.points[key].type === t) {
            this.rects[key].set({ stroke: PRIMARY })
          } else {
            this.rects[key].set({ stroke: DEFAULT })
          }
        }
      } else {
        for (let key in this.rects) {
          this.rects[key].set({ stroke: DEFAULT, selectable: false, hasControls: false, hoverCursor: 'default' })
        }
        k && this.rects[k].set({ stroke: PRIMARY, selectable: this.allowEditing, hasControls: this.allowEditing, evented: this.allowEditing, hoverCursor: this.allowEditing ? 'move' : 'default' })
      }
      this.canvas.renderAll();
    },
    resetRluer (x, y) {
      const BLANK = 20
      let { width, height } = this
      this.ll.set({ y1: y, x2: x > BLANK ? x - BLANK : 0, y2: y })
      this.lr.set({ x1: width - x > BLANK ? x + BLANK : width, y1: y, x2: width, y2: y })
      this.lt.set({ x1: x, x2: x, y2: y > BLANK ? y - BLANK : 0 })
      this.lb.set({ x1: x, y1: height - y > BLANK ? y + BLANK : height, x2: x, y2: height })
      this.canvas.renderAll();
    },
    allowAll (a) {
      for (let key in this.rects) {
        this.rects[key].set({ stroke: DEFAULT, selectable: a, hasControls: a, evented: a, hoverCursor: a ? 'move' : 'default' })
      }
      this.canvas.renderAll();
    },
    newRectObj (key, canvas, x, y, w, h, a) {
      this.rects[key] = this.drawRect(x, y, w, h, a)
      // this.rects[key].on('mousedown:before', (e) => this.rectdown(e, key))
      this.rects[key].on('mouseover', (e) => this.rectover(e, key))
      this.rects[key].on('mouseout', (e) => this.rectout(e, key))
      this.rects[key].on('scaled', (e) => this.resetPointFactory(key, e.target.aCoords))
      this.rects[key].on('moved', (e) => this.resetPointFactory(key, e.target.aCoords))

      this.rects[key].setCoords()
      canvas.add(this.rects[key])
    },
    pointFactory (k, startX, startY, endX, endY, type) {
      let parms = {
        startX,
        startY,
        endX,
        endY,
        type
      }
      this.setPoint({ key: k, value: parms })
    },
    resetPointFactory (k, aCoords) {
      let { br, tl } = aCoords
      let scale = this.scale
      this.pointFactory(k, tl.x / scale, tl.y / scale, br.x / scale, br.y / scale, this.points[k].type)
    },
    ondown (options) {
      if (!this.editting) {
        let scale = this.scale
        let startX = options.e.offsetX / scale
        let startY = options.e.offsetY / scale
        let uuid = new Date().getTime() + ''
        let parms = {
          startX,
          startY,
          endX: startX,
          endY: startY,
          type: this.tag.tagName
        }

        this.point = parms
        this.setDrawing(uuid)
        this.setEditting(uuid)
        this.setFocus(uuid)
        this.newRectObj(uuid, this.canvas, startX * scale, startY * scale, 4, 4, true)
      }

    },
    onup (options) {
      if (this.drawing) {
        let { point, scale } = this
        let endX = options.e.offsetX / scale
        let endY = options.e.offsetY / scale
        let x = point.startX
        let y = point.startY
        let sx = endX > x ? x : endX
        let sy = endY > y ? y : endY
        let ex = endX > x ? endX : x
        let ey = endY > y ? endY : y
        let w = Math.abs(endX - x)
        let h = Math.abs(endY - y)

        if (w > 20 && h > 20) {
          this.pointFactory(this.drawing, sx, sy, ex, ey, point.type)
        } else {
          this.canvas.remove(this.rects[this.drawing])
          this.$delete(this.rects, this.drawing)
        }
        this.finishedDraw()
      }
      this.setEditting('')
    },
    onmove (options) {
      this.resetRluer(options.e.offsetX, options.e.offsetY)
      if (this.drawing) {
        let { point, scale } = this
        let endX = options.e.offsetX / scale
        let endY = options.e.offsetY / scale
        let x = point.startX
        let y = point.startY
        let left = endX > x ? x * scale : endX * scale
        let top = endY > y ? y * scale : endY * scale
        let w = Math.abs(endX - x)
        let h = Math.abs(endY - y)
        if (w > 4 && h > 4) {
          this.rects[this.drawing].set({ left, top, width: w * scale, height: h * scale })
          this.rects[this.drawing].setCoords()
          this.canvas.renderAll();
        }
      }
    },
    onout () {
      this.ll.set({ x1: 0, x2: 0, y1: 0, y2: 0 })
      this.lr.set({ x1: 0, x2: 0, y1: 0, y2: 0 })
      this.lt.set({ x1: 0, x2: 0, y1: 0, y2: 0 })
      this.lb.set({ x1: 0, x2: 0, y1: 0, y2: 0 })
      this.canvas.renderAll();
    },
    onKeyup (code) {
      if (code === '82') {
        this.delPonit(this.editting)
      }
    },
    rectover (e, k) {
      this.setEditting(k)
      this.setFocus(k)
    },
    rectout () {
      this.setEditting('')
      this.setFocus('')
    },
    isPlusPoint (points, finishedDraw) {
      return Object.keys(points).length > Object.keys(finishedDraw).length
    },
    isMinusPoint (points, finishedDraw) {
      return Object.keys(points).length < Object.keys(finishedDraw).length
    }
  },
}
</script>

<style >
.canvas-box {
  width: 100%;
  height: 100%;
  background: #434343;
  overflow: auto;
  padding: 24px;
  display: flex;
  justify-content: center;
}
</style>