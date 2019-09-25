<template>
  <div class="historyList">
    <div class="title">
      <span>标注记录</span>
      <span class="icon" :class="{allow:allowEditing}" @click="setAllowEditing()">
        <svg-icon icon-class="edit"/>
      </span>
    </div>
    <div class="history-box">
      <div
        class="history"
        v-for="(item,key) in points"
        :key="key"
        @mouseenter="pointFocus = key"
        @mouseout="pointFocus = ''"
      >
        <div
          class="light"
          :style="{background:item.type === tag.tagName || key === pointFocus||key === focus ? item.color : '#4c4c4c'}"
        ></div>
        <div
          class="name"
          :style="{borderBottom:'1px solid ' + (key === focus || key === pointFocus ? item.color : '#4c4c4c')}"
          @click="onActivePoint(key,item.type,item.color)"
        >{{item.type}}</div>
        <div class="delete" @click="onDelete(key)">
          <span class="icon">
            <svg-icon icon-class="delete"/>
          </span>
        </div>
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
      focus: state => state.image.focus,
      allowEditing: state => state.image.allowEditing,
    }),
  },
  methods: {
    ...mapActions(['delPonit', 'setTag', 'setEditting', 'setFocus', 'setAllowEditing']),
    onDelete (key) {
      console.log('delete!!!')
      this.delPonit(key)
    },
    onActivePoint (key, tagName, tagColor) {
      this.pointFocus = key
      this.setEditting(key)
      this.setFocus(key)
      this.setTag({ tagName, tagColor })
    }
  }

}
</script>

<style lang="less" scoped>
.historyList {
  border-top: 6px solid #121212;
  height: calc(50vh - 32px);
  .title {
    padding: 12px 12px;
    font-weight: 700;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .icon {
      cursor: pointer;
      .svg-icon {
        fill: #fff;
        font-size: 1vw;
        &:hover {
          fill: greenyellow;
        }
      }
    }
    .allow {
      .svg-icon {
        fill: greenyellow;
      }
    }
  }
  .history-box {
    height: calc(50vh - 100px);
    overflow: auto;
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
    .history {
      display: flex;
      width: 100%;
      height: 40px;
      padding: 0 12px;
      margin: 4px 0;
      cursor: pointer;
      .svg-icon {
        fill: #fff;
        width: 1vw;
        height: 1vw;
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
}
</style>