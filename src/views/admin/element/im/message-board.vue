<template>
  <div class="message-board">
    <div class="message-item" v-for="i in 5" :key="i">{{i}}</div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.message-board {
  width: 100%;
  // position: absolute;
  // left: 0;
  // bottom: 0;
  padding: 10px;

  .message-item {
    margin: 20px 0;
  }
}
</style>