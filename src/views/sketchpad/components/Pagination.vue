<template>
  <div class="pagination">
    <template v-if="active">
      <span class="icon" :class="{'disabled':left}" @click="onprop">
        <svg-icon icon-class="left"/>
      </span>
      <span>{{active}}</span>
      <span class="icon" :class="{'disabled':right}" @click="onnext">
        <svg-icon icon-class="right"/>
      </span>
    </template>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'Pagination',

  computed: {
    ...mapState({
      active: state => state.image.active,
      images: state => state.image.images,
      keyboard: state => state.image.keyboard,
    }),
    left () {
      return this.images[0].key === this.active
    },
    right () {
      return this.images[this.images.length - 1].key === this.active
    }
  },
  watch: {
    keyboard (code) {
      this.onKeyup(code.split(',')[0])
    }
  },
  methods: {
    ...mapActions(['activeImage']),
    onprop () {
      let k = null
      this.images.map((item, key) => {
        if (item.key === this.active && key > 0) {
          k = key
        }
      })
      k && this.activeImage(this.images[k - 1].key)
    },
    onnext () {
      let k = null
      this.images.map((item, key) => {
        if ((item.key === this.active) && (key < this.images.length - 1)) {
          k = key + 1
        }
      })
      k && this.activeImage(this.images[k].key)
    },
    onKeyup (code) {
      if (code === '39') {
        this.onnext()
      }
      if (code === '37') {
        this.onprop()
      }
    },
  }
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
  fill: #fff;
  cursor: pointer;
}
.disabled .svg-icon {
  fill: #666;
  cursor: default;
}
</style>