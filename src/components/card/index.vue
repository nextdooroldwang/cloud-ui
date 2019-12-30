<template>
  <div class="card-container">
    <div class="header">
      <div class="title">
        {{title}}
        <a-tooltip placement="bottom" v-if="tips">
          <template slot="title">
            <span>{{tips}}</span>
          </template>
          <span class="info">
            <svg-icon icon-class="info" class="icon" />
          </span>
        </a-tooltip>
      </div>
      <div class="handlers">
        <span class="handler" v-if="handlers.edit" @click="$emit('handleEdit')">
          <svg-icon icon-class="edit" class="icon" />
        </span>
      </div>
    </div>
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    },
    tips: {
      type: String,
      default: ''
    },
    handlers: {
      type: Object,
      default: function () {
        return {}
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "@/assets/style/global.scss";
.card-container {
  width: 100%;
  border-radius: 8px;
  padding: 10px;
  .header {
    width: 100%;
    height: 48px;
    font-size: 16px;
    font-weight: 700;
    background: $hover;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 15px;
    cursor: move;
    .title {
      font-size: 16px;
      font-weight: 700;

      .info {
        margin-left: 4px;
        cursor: help;
        .icon {
          font-size: 14px;
          fill: $primary;
        }
      }
    }
    .handlers {
      display: flex;
      align-items: center;
      padding: 0 20px;
      .handler {
        cursor: pointer;
        &:hover {
          fill: $primary;
        }
      }
    }
  }
  .content {
    width: 100%;
    height: 270px;
    background: #fff;
    overflow-y: auto;
    padding: 8px;
  }
}
</style>