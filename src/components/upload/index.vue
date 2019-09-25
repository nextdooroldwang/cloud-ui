<template>
  <div class="clearfix">
    <a-upload :fileList="fileList" :remove="handleRemove" :beforeUpload="beforeUpload" directory>
      <a-button>
        <a-icon type="upload"/>选择文件
      </a-button>
    </a-upload>
    <a-button
      type="primary"
      @click="handleUpload"
      :disabled="fileList.length === 0"
      :loading="uploading"
      style="margin-top: 16px"
    >{{uploading ? '上传中...' : '开始上传' }}</a-button>
    <a-button @click="$emit('close')" style="margin-left: 16px">取消</a-button>
  </div>
</template>

<script>
import { createImage } from '@/api/project'
let OSS = require('ali-oss')
let client = new OSS({
  region: 'oss-cn-beijing',
  accessKeyId: 'LTAI4FpPenCf8sMSAyZyHRr1',
  accessKeySecret: '6s4IhGogiEzf9Y73R2DqZzx2ZgA53L',
  bucket: 'ai-mark'
})
export default {
  data () {
    return {
      fileList: [],
      uploading: false,
    }
  },
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
      const { fileList } = this;
      this.uploading = true
      fileList.forEach(async (file) => {
        try {
          let result = await client.put(file.name, file)
          createImage({ path: result.url }).then(() => {
            console.log(file.name + '上传成功');
          }).catch(() => {
            console.log(file.name + '上传失败');
          })
          this.handleRemove(file)
          if (this.fileList.length === 0) {
            this.uploading = false
            this.$emit('done')
          }
        } catch (e) {
          console.log(e)
        }
      });



      // You can use any AJAX library you like
      // success: () => {
      //   this.fileList = []
      //   this.uploading = false
      //   this.$message.success('upload successfully.');
      // },
      // error: () => {
      //   this.uploading = false
      //   this.$message.error('upload failed.');
      // },
    },
    // async putBlob () {
    //   try {
    //     let result = await client.put('object-key', new Blob(['content'], { type: 'text/plain' }))
    //     console.log(result)
    //   } catch (e) {
    //     console.log(e)
    //   }
    // }
  },
}
</script>

<style>
.ant-upload-list-item-info {
  padding: 0 24px 0 4px;
}
</style>