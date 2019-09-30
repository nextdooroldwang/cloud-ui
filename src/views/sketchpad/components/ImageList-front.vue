<template>
  <div class="img-list">
    <div class="file-controller">
      <input
        ref="fileInput"
        type="file"
        id="fileElem"
        multiple
        accept="image/*"
        style="display:none"
        @change="handleFiles"
      >
      <div @click="$refs.fileInput.click()">
        <span class="icon">
          <svg-icon icon-class="open"/>
        </span>
        <span>添加图片</span>
      </div>
    </div>
    <div class="imgs">
      <div
        class="img-box"
        :class="{'img-box-active':active === item.key}"
        v-for="item in images"
        :key="item.key"
        @click="onactive(item.key)"
      >
        <img :src="item.thum" :title="item.key">
        <span class="icon" v-if="item.hadtags">
          <svg-icon icon-class="hadtag"/>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'ImageList',
  computed: {
    ...mapState({
      images: state => state.image.images,
      active: state => state.image.active,
    }),
  },
  methods: {
    ...mapActions(['addImage', 'activeImage']),
    handleFiles () {
      let files = this.$refs.fileInput.files
      let _this = this
      for (let i = 0; i < files.length; i++) {
        let file = files[i];
        let imagePath = file.name
        let parms = {}
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (e) => {
          parms = {
            key: imagePath,
            data: e.target.result,
            thum: e.target.result
          }
          _this.addImage(parms)
          //压缩
          // _this.compressPictures(e.target.result, (thum) => {
          //   parms = {
          //     key: imagePath,
          //     data: e.target.result,
          //     thum
          //   }
          //   _this.addImage(parms)
          // })
        }
      }
    },
    onactive (key) {
      this.activeImage(key)
    },
    compressPictures (target, fn) {
      let image = new Image() //新建一个img标签（还没嵌入DOM节点)
      image.src = target
      image.onload = function () {
        let canvas = document.createElement('canvas'),
          SCALE = 0.2,
          context = canvas.getContext('2d'),
          imageWidth = image.width * SCALE,    //压缩后图片的大小
          imageHeight = image.height * SCALE,
          thum = ''

        canvas.width = imageWidth
        canvas.height = imageHeight

        context.drawImage(image, 0, 0, imageWidth, imageHeight)
        thum = canvas.toDataURL('image/jpeg')
        fn(thum)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.img-list {
  background: #242424;
  border-right: 1px solid #121212;
  height: calc(100vh - 64px);
  .file-controller {
    width: 100%;
    height: 42px;
    border-bottom: 1px solid #121212;
    div {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
    }
    .icon {
      margin: 0 6px;
      .svg-icon {
        width: 1.3vw;
        height: 1.3vw;
      }
    }
  }
  .imgs {
    width: 100%;
    height: calc(100vh - 106px);
    overflow-y: auto;
    padding: 1vw;
    &::-webkit-scrollbar {
      width: 6px;
      background-color: #999;
    }
    /*定义滚动条轨道
 内阴影+圆角*/
    &::-webkit-scrollbar-track {
      -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
      border-radius: 10px;
      background-color: #999;
    }
    /*定义滑块
 内阴影+圆角*/
    &::-webkit-scrollbar-thumb {
      border-radius: 10px;
      -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
      background-color: #666;
    }
    .img-box {
      width: 100%;
      height: 10vw;
      text-align: center;
      padding: 8px;
      border: 1px solid #121212;
      border-radius: 8px;
      margin: 14px 0;
      cursor: pointer;
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      img {
        width: auto;
        height: auto;
        max-width: 100%;
        max-height: 100%;
      }
      &:hover {
        box-shadow: 0px 0px 5px #559cf8;
      }
      .icon {
        position: absolute;
        right: 10px;
        bottom: 10px;
        .svg-icon {
          width: 1.5625vw;
          height: 1.5625vw;
        }
      }
    }
    .img-box-active {
      box-shadow: 0px 0px 5px #559cf8;
    }
  }
}
</style>