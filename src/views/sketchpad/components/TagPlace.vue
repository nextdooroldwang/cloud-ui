<template>
  <div class="tag">
    <!-- <div class="colorBoard" :style="{background:tagColor}"></div> -->
    <div class="selectTag">
      <a-select v-model="tagName" style="width:100%" @change="handleChange">
        <a-select-option v-for="(item,key) in tagOptions" :key="key" :value="key">{{key}}</a-select-option>
      </a-select>
    </div>
    <div class="export" @click="exportJson">
      <span class="icon">
        <svg-icon icon-class="export"/>
      </span>
    </div>
  </div>
</template>

<script>
import FileSaver from 'file-saver'
import { mapActions, mapState } from 'vuex'
import tagOptions from '../../../../public/tagOptions.json'
export default {
  name: 'TagPlace',
  data () {
    return {
      tagOptions,
      tagColor: tagOptions[Object.keys(tagOptions)[0]],
      tagName: Object.keys(tagOptions)[0],
    }
  },
  computed: {
    ...mapState({
      points: state => state.image.points,
      scale: state => state.image.scale,
    })
  },
  mounted () {
    let { tagName, tagColor } = this
    this.setTag({ tagName, tagColor })
  },
  methods: {
    ...mapActions(['setTag']),
    exportJson () {
      this.downloadJson(this.buildJson())
    },
    buildJson () {
      let shapes = []
      let p = this.points
      let scale = this.scale
      for (let k in p) {
        shapes.push({
          "shape_type": "rectangle",
          "line_color": null,
          // "line_color": p[k].color,
          "fill_color": null,
          "label": p[k].type,
          "points": [
            [p[k].startX / scale, p[k].startY / scale],
            [p[k].endX / scale, p[k].endY / scale]
          ]
        })
      }
      let data = {
        // imagePath: this.active.imagePath,
        // imageData: this.active.imageData.replace(/^data:image\/\w+;base64,/, ""),
        // imageWidth: newImg.width,
        // imageHeight: newImg.height,
        version: "3.8.1",
        flags: {},
        fillColor: null,
        lineColor: null,
        shapes
      }
      return data
    },
    downloadJson (data) {
      let name = data.imagePath.substring(0, data.imagePath.indexOf("."));
      var blob = new Blob([JSON.stringify(data)], { type: "" });
      FileSaver.saveAs(blob, name + ".json");

    },
    handleChange (k) {
      this.tagName = k
      this.tagColor = this.tagOptions[k]
      this.setTag({ tagName: k, tagColor: this.tagOptions[k] })
    },
  }
}
</script>

<style lang="less" scoped>
.tag {
  display: flex;
  padding: 8px 0;
  .colorBoard {
    width: 32px;
    height: 32px;
    border: 2px solid #fff;
    border-radius: 4px;
    margin: 0 6px;
  }
  .selectTag {
    padding: 0 8px;
    flex: 1;
  }
  .export {
    display: flex;
    align-items: center;
    cursor: pointer;
    &:hover {
      color: greenyellow;
    }
    .icon {
      margin: 0 6px;
      .svg-icon {
        width: 1.3vw;
        height: 1.3vw;
      }
    }
  }
}
</style>