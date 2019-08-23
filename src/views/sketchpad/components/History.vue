<template>
  <div class="historyList">
    <div class="history" v-for="(item,key) in points" :key="key">
      <div class="light"></div>
      <div class="name">{{item.type}}</div>
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
  computed: {
    ...mapState({
      points: state => state.image.points
    })
  },
  methods: {
    ...mapActions(['delPonit']),
    onDelete (key) {
      console.log('delete!!!')
      this.delPonit(key)
    },
  }

}
</script>

<style lang="less" scoped>
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
    display: flex;
    align-items: center;
    &:hover {
      .svg-icon {
        fill: red;
      }
    }
  }
}
</style>