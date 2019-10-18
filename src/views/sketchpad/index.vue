<template>
  <div class="sketchpad">
    <image-list/>
    <work-place/>
    <div class="tools">
      <tag-place/>
      <history/>
    </div>
    <div class="modal" v-show="showEx"></div>
    <div class="loading" v-show="loading">
      <span class="icon">
        <svg-icon icon-class="loading"/>
      </span>
    </div>
  </div>
</template>

<script>
import ImageList from './components/ImageList'
import WorkPlace from './components/WorkPlace'
import TagPlace from './components/TagPlace'
import History from './components/History'
import { mapState, mapActions } from 'vuex'
export default {
  name: 'Sketchpad',
  components: {
    ImageList, WorkPlace, TagPlace, History
  },
  computed: {
    ...mapState({
      showEx: state => state.image.showEx,
      loading: state => state.image.imageLoading,
    }),
  },
  mounted () {
    document.onkeydown = e => {
      let k = e.keyCode
      if (k > 47 && k < 58) {
        e.ctrlKey && this.setKeyboard(e.keyCode)
      } else {
        this.setKeyboard(e.keyCode)
      }

    }
  },
  methods: {
    ...mapActions(['setKeyboard']),
  },
}
</script>

<style lang="less" scoped>
.sketchpad {
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 12vw 1fr 200px;
  color: #fff;
  position: relative;
  .tools {
    height: calc(100vh - 64px);
    overflow-y: auto;
    background: #242424;
    border-left: 1px solid #121212;
  }
  .modal {
    width: 80vw;
    height: 80vh;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    background-color: #000;
    background-image: url("../../../public/target.png");
    background-repeat: no-repeat;
    background-position: center;
    background-size: auto 98%;
    box-shadow: 0px 0px 5px #559cf8;
  }
  .loading {
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    background-color: rgba(0, 0, 0, 0.6);
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 60px;
  }
}
</style>