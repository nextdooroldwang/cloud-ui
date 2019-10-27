<template>
  <div class="card-container">
    <div class="header"></div>
    <div class="content"></div>
  </div>
</template>

<script>
export default {

}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "@/assets/style/global.scss";
.card-container {
  width: 100%;
  height: 320px;
  overflow-y: auto;
  border-radius: 4px;
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
  }
}
</style>