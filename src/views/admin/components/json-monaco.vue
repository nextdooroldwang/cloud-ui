<template>
  <monaco-editor :opts="opts" @change="onChange" />
</template>

<script>
import MonacoEditor from '@/components/editor'
export default {
  data () {
    return {
      opts: {
        value: `
        { 
          "aaaa": 123
        }
           `,
        readOnly: false, // 是否可编辑
        language: 'javascript', // 语言类型
        theme: 'vs-dark', // 编辑器主题
        fontSize: '16px'
      }
    }
  },
  components: { MonacoEditor },
  methods: {
    onChange (val) {
      console.log(val)
      // this.$refs.monaco.getVal()
    }
  },
}
</script>

<style lang="scss" scoped>
</style>