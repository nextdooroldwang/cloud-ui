<template>
  <div class="tag-place">
    <div class="tag-control">
      <div class="selectTag">
        <!-- <a-select v-model="tagName" style="width:100%" @change="handleChange">
          <a-select-option v-for="(item,key) in tagOptions" :key="key" :value="key">{{key}}</a-select-option>
        </a-select>-->
      </div>
      <div class="export" @click="exportJson">
        <span class="icon">
          <svg-icon icon-class="export"/>
        </span>
      </div>
    </div>

    <div class="tagList">
      <div class="title">标注品类</div>
      <div
        class="classify"
        v-for="(item,key) in tagOptions"
        :key="key"
        @mouseover="tagFocus = key"
        @mouseout="tagFocus = ''"
        @click="onActiveTag(key)"
        :title="item.name"
      >
        <div
          class="light"
          :style="{background:key === tag.tagName || key === tagFocus ? item.color : '#4c4c4c'}"
        ></div>
        <div
          class="type"
          :style="{borderBottom:'1px solid ' + (key === tag.tagName || key === tagFocus ? item.color : '#4c4c4c')}"
        >
          {{key}}
          <span
            class="number"
            :style="{color:key === tag.tagName || key === tagFocus ? item.color : '#4c4c4c'}"
          >已标注（{{item.number}}）</span>
        </div>
      </div>
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
      tagFocus: ''
    }
  },
  computed: {
    ...mapState({
      points: state => state.image.points,
      scale: state => state.image.scale,
      tag: state => state.image.tag,
    }),
    tagOptions () {
      for (let key in tagOptions) {
        let num = 0
        for (let k in this.points) {
          this.points[k].type === key && num++
        }
        tagOptions[key].number = num
      }
      return tagOptions
    }
  },
  methods: {
    ...mapActions(['setTag', 'setDrawing']),
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
    onActiveTag (k) {
      this.setTag({ tagName: k, tagColor: this.tagOptions[k].color })
      this.setDrawing('')
    },
    handleChange (k) {

    },
  }
}
</script>

<style lang="less" scoped>
.tag-place {
  height: calc(50vh - 32px);
  overflow-y: auto;
  .tag-control {
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
  .tagList {
    .title {
      padding: 6px 12px;
      font-weight: 700;
    }
    .classify {
      display: flex;
      width: 100%;
      height: 40px;
      padding: 0 12px;
      margin: 4px 0;
      cursor: pointer;
      .svg-icon {
        fill: #fff;
        width: 1.3vw;
        height: 1.3vw;
      }
      .light {
        width: 5px;
        height: 100%;
      }
      &:hover {
        .light {
          background-color: #009efd;
        }
      }
      .type {
        flex: 1;
        padding: 0 12px;
        margin: 0 12px;
        border-bottom: 1px solid #4c4c4c;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
      .delete {
        display: flex;
        align-items: center;
        &:hover {
          .svg-icon {
            fill: red;
          }
        }
      }
    }
  }
}
</style>