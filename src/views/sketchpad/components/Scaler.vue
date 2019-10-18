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
      <span class="ai" @click="getAILabels(0)">AI自动识别</span>
      <!-- <span class="ai" @click="getAILabels(1)">地堆</span> -->
    </template>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { getAILabels } from '@/api/sketchpad'
import notification from 'ant-design-vue/es/notification'
export default {
  name: 'Scaler',
  computed: {
    ...mapState({
      images: state => state.image.images,
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
    ...mapActions(['setScale', 'showLoading', 'setPoint', 'addAI']),
    onBig () {
      // this.scale <= .9 ? this.setScale(this.scale + .1) : this.setScale(1)
      this.setScale(this.scale + .1)
    },
    onSmall () {
      let best = this.bestScale
      this.scale >= .1 + best ? this.setScale(this.scale - .1) : this.setScale(best)
    },
    getAILabels (type) {
      this.showLoading(true)
      this.images.map(async (item) => {
        if (item.key === this.active) {
          await getAILabels(item.data, type).then(res => {
            if (res.status.code === '200') {
              res.body.label.map((item, index) => {
                let k = new Date().getTime() + index + ''
                let parms = {
                  startX: item.xmin,
                  startY: item.ymin,
                  endX: item.xmax,
                  endY: item.ymax,
                  type: item.category
                }
                this.setPoint({ key: k, value: parms })
              })

            }
            this.showLoading(false)
          }).catch(err => {
            console.log(err);
            notification.warning({ message: '自动识别超时，请重新尝试' })
            this.showLoading(false)
          })
          console.log('finished');
          this.addAI()
        }
      })

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
.ai {
  border: 1px solid #fff;
  border-radius: 4px;
  padding: 2px 6px;
}
</style>