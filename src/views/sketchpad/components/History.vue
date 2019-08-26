<template>
  <div class="historyList">
    <div class="title">标注记录</div>
    <div
      class="history"
      v-for="(item,key) in points"
      :key="key"
      @mouseover="pointFocus = key"
      @mouseout="pointFocus = ''"
    >
      <div
        class="light"
        :style="{background:item.type === tag.tagName || key === pointFocus ? item.color : '#4c4c4c'}"
      ></div>
      <div
        class="name"
        :style="{borderBottom:'1px solid ' + (key === drawing || key === pointFocus ? item.color : '#4c4c4c')}"
        @click="onActivePoint(key,item.type,item.color)"
      >{{item.type}}</div>
      <div class="delete" @click="onDelete(key)">
        <span class="icon">
          <svg-icon icon-class="delete"/>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'History',
  data () {
    return {
      pointFocus: ''
    }
  },
  computed: {
    ...mapState({
      points: state => state.image.points,
      tag: state => state.image.tag,
      drawing: state => state.image.drawing
    }),
  },
  methods: {
    ...mapActions(['delPonit', 'setTag', 'setDrawing']),
    onDelete (key) {
      console.log('delete!!!')
      this.delPonit(key)
    },
    onActivePoint (key, tagName, tagColor) {
      this.pointFocus = key
      this.setDrawing(key)
      this.setTag({ tagName, tagColor })
    }
  }

}
</script>

<style lang="less" scoped>
.historyList {
  border-top: 6px solid #121212;
  height: calc(50vh - 32px);
  overflow-y: auto;
  .title {
    padding: 6px 12px;
    font-weight: 700;
  }
  .history {
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
</style>