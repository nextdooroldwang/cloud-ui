<template>
  <div class="clearfix">
    <a-upload :fileList="fileList" :remove="handleRemove" :beforeUpload="beforeUpload" directory>
      <a-button>
        <a-icon type="upload"/>选择文件
      </a-button>
    </a-upload>
    <div class="btns">
      <!-- <a-input v-model="dir" placeholder="请输入目标文件夹名"/> -->
      <a-select
        showSearch
        placeholder="目标文件夹名"
        optionFilterProp="children"
        @change="handleChange"
        :filterOption="filterOption"
      >
        <a-select-option v-for="item in userList" :key="item.name" :value="item.name">{{item.name}}</a-select-option>
      </a-select>
      <a-button
        type="primary"
        @click="handleUpload"
        :disabled="fileList.length === 0 || !dir"
        :loading="uploading"
      >{{uploading ? '上传中...' : '开始上传' }}</a-button>

      <a-button @click="$emit('close')">取消</a-button>
    </div>
  </div>
</template>

<script>
import { upload } from '@/utils/oss'

export default {
  data () {
    return {
      fileList: [],
      dir: '',
      uploading: false,
    }
  },
  props: ['userList'],
  methods: {
    handleRemove (file) {
      const index = this.fileList.indexOf(file);
      const newFileList = this.fileList.slice();
      newFileList.splice(index, 1);
      this.fileList = newFileList
    },
    beforeUpload (file) {
      this.fileList = [...this.fileList, file]
      return false;
    },
    handleUpload () {
      const { fileList, dir } = this;
      let project = this.$store.getters.project
      let path = project.id + '/' + dir + '/'
      this.uploading = true
      upload(fileList, path, (file) => {
        this.handleRemove(file)
        if (this.fileList.length === 0) {
          this.uploading = false
          this.$emit('done')
        }
      })

    },
    handleChange (value) {
      this.dir = value
    },
    filterOption (input, option) {
      return option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0
    }
  },
}
</script>

<style>
.ant-upload-list-item-info {
  padding: 0 24px 0 4px;
}
.ant-form-item {
  display: flex;
  align-items: center;
  margin: 0;
}
.btns {
  display: grid;
  grid-template-columns: 160px 100px 100px;
  grid-gap: 12px;
  align-items: center;
  margin-top: 12px;
}
/* .ant-form-item-control-wrapper {
  flex: 1;
} */
</style>