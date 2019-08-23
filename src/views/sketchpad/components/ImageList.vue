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
      <span @click="$refs.fileInput.click()">添加图片</span>
      <!-- <span>文件夹</span> -->
    </div>
    <div class="imgs">
      <div
        class="img-box"
        :class="{'img-box-active':active === key}"
        v-for="(item, key) in images"
        :key="key"
        @click="onactive(key)"
      >
        <img :src="item" :title="key">
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'ImageList',
  data () {
    return {

    }
  },
  computed: {
    ...mapState({
      images: state => state.image.images,
      active: state => state.image.active,
    })
  },
  methods: {
    ...mapActions(['addImage', 'activeImage']),
    handleFiles () {
      let files = this.$refs.fileInput.files
      for (let i = 0; i < files.length; i++) {
        let file = files[i];
        let imagePath = file.name
        let parms = {}
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          parms[imagePath] = reader.result
          this.addImage(parms)
        }
      }
    },
    onactive (key) {
      this.activeImage(key)
    },
  }
}
</script>

<style lang="less" scoped>
.img-list {
  background: #242424;
  border-right: 1px solid #121212;
  height: calc(100vh - 64px);
  overflow-y: auto;
  .file-controller {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 42px;
    border-bottom: 1px solid #121212;
    span {
      margin: 0 10px;
      cursor: pointer;
    }
  }
  .imgs {
    width: 100%;
    padding: 1vw;

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
      img {
        width: auto;
        height: auto;
        max-width: 100%;
        max-height: 100%;
      }
      &:hover {
        box-shadow: 0px 0px 5px #559cf8;
      }
    }
    .img-box-active {
      box-shadow: 0px 0px 5px #559cf8;
    }
  }
}
</style>