<template>
  <div class="tag-place">
    <div class="tag-control">
      <div class="selectTag">标注产品：雪花</div>
      <div class="export" @click="exportJson" v-if="!loading">
        <span class="icon">
          <svg-icon icon-class="export"/>
        </span>
      </div>
      <div class="loading" v-else>
        <span class="icon">
          <svg-icon icon-class="loading"/>
        </span>
      </div>
    </div>

    <div class="tagList">
      <div class="title">
        <span>标注品类</span>
        <span class="icon" @mouseover="showEx(true)" @mouseout="showEx(false)">
          <svg-icon icon-class="target"/>
        </span>
      </div>
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
            :style="{color:key === tag.tagName || key === tagFocus ? item.color : item.number ? '#fff' : '#4c4c4c'}"
          >已标注（{{item.number}}）</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import FileSaver from 'file-saver'
import JSZip from 'jszip'
import { mapActions, mapState } from 'vuex'
import { getStore } from '@/utils/storage'
import tagOptions from '../../../../public/tagOptions.json'
export default {
  name: 'TagPlace',
  data () {
    return {
      tagFocus: '',
      loading: false
    }
  },
  computed: {
    ...mapState({
      images: state => state.image.images,
      points: state => state.image.points,
      tag: state => state.image.tag,
      keyboard: state => state.image.keyboard,
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
  watch: {
    keyboard (code) {
      this.onKeyup(code.split(',')[0])
    }
  },
  methods: {
    ...mapActions(['setTag', 'setEditting', 'showEx']),
    exportJson () {
      this.loading = true
      this.manyJson()

    },
    async manyJson () {
      let zip = new JSZip()
      let targetFilter = zip.folder("成果物")
      let targetBackup = zip.folder("标签备份")
      let backup = {}
      this.images.map(item => {
        if (item.hadtags) {
          let name = item.key.substring(0, item.key.indexOf("."));
          let data = this.buildJson(item)
          backup[item.key] = getStore(item.key)
          let blobData = new Blob([JSON.stringify(data)]);
          targetFilter.file(name + '.json', blobData);
        }
      })
      let blobBackup = new Blob([JSON.stringify(backup)]);
      targetBackup.file('标签备份.json', blobBackup);
      await zip.generateAsync({ type: "blob" })
        .then(function (content) {
          // see FileSaver.js
          FileSaver.saveAs(content, "成果物.zip");
        });
      this.loading = false
    },
    buildJson (item) {
      let shapes = []
      let p = getStore(item.key)
      for (let k in p) {
        shapes.push({
          "shape_type": "rectangle",
          "line_color": null,
          "fill_color": null,
          "label": p[k].type,
          "points": [
            [p[k].startX, p[k].startY],
            [p[k].endX, p[k].endY]
          ]
        })
      }
      let data = {
        imagePath: item.key,
        imageData: null,
        // imageData: item.data.replace(/^data:image\/\w+;base64,/, ""),
        imageWidth: item.width,
        imageHeight: item.height,
        version: "3.8.1",
        flags: {},
        fillColor: null,
        lineColor: null,
        shapes
      }
      return data
    },
    // downloadJson (data) {
    //   let name = data.imagePath.substring(0, data.imagePath.indexOf("."));
    //   var blob = new Blob([JSON.stringify(data)], { type: "" });
    //   FileSaver.saveAs(blob, name + ".json");

    // },
    onActiveTag (k) {
      this.setTag({ tagName: k, tagColor: this.tagOptions[k].color })
      this.setEditting('')
    },
    onKeyup (code) {
      let k = ''
      for (let i = 49; i < 58; i++) {
        if (code === i + '') {
          if (Object.keys(tagOptions).length > i - 49) {
            k = Object.keys(tagOptions)[i - 49]
          }
        }
      }
      k && this.onActiveTag(k)
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

      .icon {
        margin: 0 12px;
        cursor: pointer;
        .svg-icon {
          font-size: 1vw;
          fill: #fff;
        }
        &:hover {
          .svg-icon {
            fill: greenyellow;
          }
        }
      }
    }
    .loading {
      display: flex;
      align-items: center;

      .icon {
        margin: 0 12px;

        .svg-icon {
          font-size: 1vw;
        }
      }
    }
  }
  .tagList {
    border-top: 6px solid #121212;
    .title {
      padding: 6px 12px;
      font-weight: 700;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .icon {
        font-size: 1vw;
        cursor: pointer;
        .svg-icon {
          fill: #fff;
        }
        &:hover {
          .svg-icon {
            fill: greenyellow;
          }
        }
      }
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
        padding-left: 12px;
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