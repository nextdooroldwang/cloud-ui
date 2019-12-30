<template>
  <textarea
    ref="text"
    cols="30"
    :rows="rows"
    placeholder="请输入聊天内容"
    v-model="text"
    @input="oninput"
    @compositionstart="onCompositionstart"
    @compositionend="onCompositionend"
  ></textarea>
</template>

<script>
export default {
  data () {
    return {
      inputting: false,
      text: '',
      rows: 1
    }
  },
  methods: {
    oninput (e) {
      this.inputting || this.resize(this.computeLength(e.target.value))
    },
    onCompositionstart () {
      this.inputting = true
    },
    onCompositionend (e) {
      this.resize(this.computeLength(e.target.value))
      this.inputting = false
    },
    resize (len) {
      this.rows = parseInt(len / 15) + 1 < 6 ? parseInt(len / 15) + 1 : 6
    },
    computeLength (str) {
      let cnReg = /([\u4e00-\u9fa5]|[\u3000-\u303F]|[\uFF00-\uFF60])/g;
      let mat = str.match(cnReg);
      if (mat) {
        return mat.length + (str.length - mat.length) * 0.5;
      }
      return str.length * 0.5;
    }
  },
}
</script>

<style lang="scss" scoped>
textarea {
  border: none;
  resize: none;
  outline: none;
  &::-webkit-scrollbar {
    display: none;
  }
}
</style>