<template>
  <div>
    <div class="btn-box">
      <a-form-item :Image="`文件夹名：`">
        <a-input placeholder="请输入文件夹名"/>
      </a-form-item>
      <div>
        <a-button type="primary" style="margin:0 16px">搜索</a-button>
        <a-button @click="createState = true" style="margin-right:16px" :disabled="createState">新增</a-button>
        <a-popconfirm title="确定销毁所有文件夹?" @confirm="deleteAll">
          <a-button @click="createState = false" type="danger" :disabled="list.length===0">删除已选文件夹</a-button>
        </a-popconfirm>
      </div>
    </div>
    <div class="create-box" v-if="createState">
      <a-input v-model="name" placeholder="请输入新增文件夹名称"/>
      <a-button type="primary" @click="onCreate" :disabled="!name">保存</a-button>
      <a-button @click="createState = false">取消</a-button>
    </div>

    <a-table
      :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
      :columns="columns"
      :rowKey="record => record.id"
      :dataSource="list"
      :loading="loading"
      :pagination="{total,current,pageSize}"
      @change="onchange"
    >
      <span
        slot="name"
        slot-scope="text, record"
      >{{record.path.split('/')[record.path.split('/').length-1]}}</span>
      <span slot="action" slot-scope="text, record">
        <a-popconfirm title="确定删除此文件夹?" @confirm="ondelete(record.id)">
          <a href="javascript:;">删除</a>
        </a-popconfirm>
      </span>
    </a-table>
  </div>
</template>

<script>
let OSS = require('ali-oss')
let client = new OSS({
  region: 'oss-cn-beijing',
  accessKeyId: 'LTAI4FpPenCf8sMSAyZyHRr1',
  accessKeySecret: '6s4IhGogiEzf9Y73R2DqZzx2ZgA53L',
  bucket: 'ai-mark'
})
export default {
  name: 'Files',
  data () {
    return {
      loading: false,
      createState: false,
      selectedRowKeys: [],
      name: '',
      list: [],
      total: 0,
      current: 0,
      pageSize: 15,
      columns: [
        {
          dataIndex: 'name',
          key: 'name',
          title: '文件夹',
          scopedSlots: { customRender: 'name' },
        },
        {
          title: '操作',
          key: 'action',
          scopedSlots: { customRender: 'action' },
        }
      ],
    }
  },
  computed: {
    hasSelected () {
      return this.selectedRowKeys.length > 0
    }
  },
  mounted () {
    this.getList()
  },
  methods: {
    async getList (page = 1) {
      this.listDir('/')
    },
    async listDir (dir) {
      this.loading = true
      try {
        let result = await client.list({
          prefix: dir,
          delimiter: '/'
        });
        console.log(result);
        result.prefixes.forEach(function (subDir) {
          console.log('SubDir: %s', subDir);
        });
        result.objects.forEach(function (obj) {
          console.log(obj.name);
        });
      } catch (e) {
        console.log(e);
      }
      this.loading = false
    },
    clear () {
      this.name = ''
      this.createState = false
    },
    onCreate () {
      let { name } = this
      createImage({ name }).then(() => {
        this.$message.success('添加成功')
        this.clear()
        this.getList()
      })
    },

    ondelete (id) {
      delImage(id).then(() => {
        this.$message.error('删除成功')
        this.clear()
        this.getList()
      })
    },
    deleteAll () {
      delImageAll({ ids: this.selectedRowKeys }).then(() => {
        this.$message.error('删除成功')
        this.clear()
        this.getList()
      })
    },
    onSelectChange (selectedRowKeys) {
      // console.log('selectedRowKeys changed: ', selectedRowKeys);
      this.selectedRowKeys = selectedRowKeys
    },
    onchange (e) {
      this.getList(e.current)
    }
  },
}
</script>

<style scoped>
.btn-box {
  display: flex;
  align-items: center;
  padding: 12px;
}
.create-box {
  width: 100%;
  padding: 24px 12px;
  background: #f9f9f9;
  margin: 12px 0;
  border: 2px dashed #ddd;
  display: grid;
  grid-template-columns: 1fr 90px 90px;
  grid-gap: 12px;
  align-items: center;
}
.ant-form-item {
  display: flex;
  align-items: center;
  margin: 0;
}

.ant-form-item-control-wrapper {
  flex: 1;
}
</style>