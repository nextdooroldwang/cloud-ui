<template>
  <div class="sketchpad">
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
          :class="{'img-box-active':active.imagePath === key}"
          v-for="(item, key) in imgs"
          :key="key"
          @click="onactive(key,item.imageData)"
        >
          <img :src="item.imageData" :title="key">
        </div>
      </div>
    </div>
    <div class="workplace">
      <div class="size-controller">
        <div>
          <template v-if="active.imagePath">
            <span>放大</span>
            <!-- <span>{{Math.round(point*100)+'%'}}</span> -->
            <span>缩小</span>
          </template>
        </div>
      </div>
      <div ref="main" class="main">
        <!-- <div class="canvas"></div> -->
        <!-- <div class="point" :style="{'left':pointX+'px','top':pointY+'px'}" v-show="incanvas"></div> -->
        <canvas ref="canvas" @mousemove="onmove" @mousedown="ondown" @mouseup="onup"></canvas>
      </div>
      <div class="img-controller">
        <template v-if="active.imagePath">
          <span>上一张</span>
          <span>{{active.imagePath}}</span>
          <span>下一张</span>
        </template>
      </div>
    </div>
    <div class="tools">
      <div class="tag">
        <!-- <div class="colorBoard" :style="{background:tagColor}"></div> -->
        <div class="selectTag">
          <a-select v-model="tagName" style="width:100%" @change="handleChange">
            <a-select-option v-for="(item,key) in tagOptions" :key="key" :value="key">{{key}}</a-select-option>
          </a-select>
        </div>
        <div class="export" @click="exportJson">导出</div>
      </div>

      <div class="historyList">
        <div class="history" v-for="(item,key) in points" :key="key">
          <div class="light"></div>
          <div class="name">{{item.type}}</div>
          <div class="delete" @click="onDelete(key)">删除</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
let ctx = null
let newImg = null
let point = 1

// function randomColor () {
//   return `rgb(${Math.floor(Math.random() * 256)},${Math.floor(Math.random() * 256)},${Math.floor(Math.random() * 256)})`
// }

import { setStore, getStore } from '@/utils/storage'
import FileSaver from 'file-saver'
import tagOptions from '../../../public/tagOptions.json'
export default {
  name: 'Sketchpad',
  data () {
    return {
      imgs: {},
      active: {
        imagePath: '',
        imageData: '',
      },
      points: {},
      tagColor: tagOptions[Object.keys(tagOptions)[0]],
      tagName: Object.keys(tagOptions)[0],
      tagActive: '',
      tagOptions,

      // incanvas: false,
      // pointX: 0,
      // pointY: 0
    }
  },
  computed: {


  },
  methods: {
    // pointStyle (item) {
    //   let { color, startX, startY, endX, endY } = item
    //   return {
    //     border: '2px solid ' + color,
    //     left: startX,
    //     top: startY,
    //     width: endX - startX,
    //     height: endY - startY
    //   }
    // },
    init (key, data) {
      this.active = {
        imagePath: key,
        imageData: data,
      },
        this.points = getStore(key) || {}
      this.tagColor = tagOptions[Object.keys(tagOptions)[0]]
      this.tagName = Object.keys(tagOptions)[0]
      this.tagActive = ''
    },
    handleFiles () {
      let files = this.$refs.fileInput.files
      for (let i = 0; i < files.length; i++) {
        let file = files[i];
        let imagePath = file.name
        let parms = {}

        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          parms.imageData = reader.result
          this.$set(this.imgs, imagePath, parms)
        }

      }

    },
    handleChange (k) {
      this.tagColor = this.tagOptions[k]
    },
    onactive (key, data) {
      this.$refs.canvas.style = ''
      this.init(key, data)
      let img = new Image()
      img.src = this.active.imageData
      let _this = this
      img.onload = function () {
        newImg = img
        _this.setCanvas()
      }
    },
    setCanvas () {
      if (newImg) {

        let w = this.$refs.main.clientWidth - 54
        let h = this.$refs.main.clientHeight - 54

        if ((newImg.height < newImg.width) && (newImg.width < w)) {
          point = w / newImg.width
        } else {
          point = h / newImg.height
        }
        this.$refs.canvas.width = newImg.width * point
        this.$refs.canvas.height = newImg.height * point
        ctx = this.$refs.canvas.getContext('2d')
        ctx.lineWidth = 4;        //边框宽度
        this.draw()

      }


    },
    onmove (e) {
      if (this.tagActive) {
        let { points, tagActive, tagColor } = this
        let endX = e.offsetX
        let endY = e.offsetY
        let x = points[tagActive].startX
        let y = points[tagActive].startY
        this.$set(points, tagActive, { ...points[tagActive], endX, endY })

        // ctx.save()
        // ctx.scale(10, 10);
        // ctx.strokeRect(x, y, endX - x, endY - y)
        // ctx.restore()
        this.draw()
        ctx.strokeStyle = tagColor; //边框颜色
        ctx.strokeRect(x, y, endX - x, endY - y);
      }

    },
    onup () {

      setStore(this.active.imagePath, this.points)

      this.tagActive = ''


    },
    onDelete (key) {
      console.log('delete!!!')
      this.$delete(this.points, key);
      this.draw()
      setStore(this.active.imagePath, this.points)
    },
    exportJson () {
      this.downloadJson(this.buildJson())
    },
    ondown (e) {
      let startX = e.offsetX
      let startY = e.offsetY
      let uuid = new Date().getTime() + ''
      let parms = {}
      parms = {
        startX,
        startY,
        endX: startX,
        endY: startY,
        color: this.tagColor,
        type: this.tagName
      }
      this.tagActive = uuid
      this.$set(this.points, uuid, parms)
    },
    draw () {
      let img = newImg
      let width = newImg.width * point
      let height = newImg.height * point
      ctx.clearRect(0, 0, width, height)
      ctx.drawImage(img, 0, 0, width, height)
      for (let key in this.points) {
        if (key != this.tagActive) {
          let { startX, startY, endX, endY, color } = this.points[key]
          ctx.strokeStyle = color; //边框颜色
          ctx.strokeRect(startX, startY, endX - startX, endY - startY)
        }

      }
    },
    buildJson () {
      let shapes = []
      let p = this.points
      for (let k in p) {
        shapes.push({
          "shape_type": "rectangle",
          "line_color": null,
          // "line_color": p[k].color,
          "fill_color": null,
          "label": p[k].type,
          "points": [
            [p[k].startX / point, p[k].startY / point],
            [p[k].endX / point, p[k].endY / point]
          ]
        })
      }
      let data = {
        imagePath: this.active.imagePath,
        imageData: this.active.imageData.replace(/^data:image\/\w+;base64,/, ""),
        imageWidth: newImg.width,
        imageHeight: newImg.height,
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

    }
  }
}
</script>

<style lang="less" scoped>
.sketchpad {
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 12vw 1fr 12vw;
  color: #fff;
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
  .workplace {
    width: 100%;
    height: calc(100vh - 64px);
    display: grid;
    grid-template-rows: 42px 1fr 42px;
    .size-controller {
      background: #242424;
      height: 100%;
      border-bottom: 1px solid #121212;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #fff;
      span {
        margin: 0 24px;
        cursor: pointer;
      }
    }
    .main {
      width: 100%;
      height: 100%;
      background: #434343;
      overflow: auto;
      padding: 24px;
      position: relative;
      text-align: center;
      // cursor: none;
      // .point {
      //   position: fixed;
      //   width: 0.2vw;
      //   height: 0.2vw;
      //   border: 0.2vw solid #fff;
      //   border-radius: 50%;
      // }
      .canvas {
        position: relative;
        .points {
          position: absolute;
          z-index: 999;
        }
      }
    }
    .img-controller {
      background: #242424;
      height: 100%;
      border-top: 1px solid #121212;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #fff;
      span {
        margin: 0 24px;
      }
    }
  }
  .tools {
    height: calc(100vh - 64px);
    overflow-y: auto;
    background: #242424;
    border-left: 1px solid #121212;
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
        padding: 0 8px;
        cursor: pointer;
        &:hover {
          color: greenyellow;
        }
      }
    }
    .history {
      display: flex;
      width: 100%;
      height: 40px;
      padding: 0 12px;
      margin: 4px 0;
      cursor: pointer;
      .light {
        width: 5px;
        height: 100%;
        background-color: #4c4c4c;
      }
      &:hover {
        .light {
          background-color: #009efd;
        }
      }
      .name {
        flex: 1;
        padding: 0 12px;
        margin: 0 12px;
        border-bottom: 1px solid #4c4c4c;
        display: flex;
        align-items: center;
        &:hover {
          border-bottom: 1px solid #009efd;
        }
      }
      .delete {
        &:hover {
          color: red;
        }
      }
    }
  }
}
</style>