<template>
  <div>
    <div class="btn-box">
      <a-form-item :Image="`图片名：`">
        <a-input placeholder="请输入图片名"/>
      </a-form-item>
      <div>
        <a-button type="primary" :style="{margin:'0 16px'}">搜索</a-button>
        <a-button @click="createState = true" :disabled="createState">新增</a-button>
      </div>
    </div>
    <div class="create-box" v-if="createState">
      <upload @done="done" @close="createState = false"/>
    </div>

    <a-table
      :columns="columns"
      :rowKey="record => record.id"
      :dataSource="list"
      :loading="loading"
      :pagination="{total,current,pageSize}"
      @change="onchange"
    >
      <img
        slot="path"
        slot-scope="text, record"
        width="100"
        :src="record.path+'?x-oss-process=style/list-thumb'"
      >
      <span
        slot="name"
        slot-scope="text, record"
      >{{record.path.split('/')[record.path.split('/').length-1]}}</span>
      <span slot="action" slot-scope="text, record">
        <a-popconfirm title="确定删除此图片?" @confirm="ondelete(record.id)">
          <a href="javascript:;">删除</a>
        </a-popconfirm>
      </span>
    </a-table>
  </div>
</template>

<script>
import { getImages, createImage, delImage } from '@/api/project'
import Upload from '@/components/upload'
export default {
  name: 'Projects',
  data () {
    return {
      loading: false,
      createState: false,
      index: '',
      name: '',
      list: [],
      total: 0,
      current: 0,
      pageSize: 15,
      columns: [
        {
          dataIndex: 'path',
          key: 'path',
          title: '图片',
          scopedSlots: { customRender: 'path' },
        },
        {
          dataIndex: 'name',
          key: 'name',
          title: '图片名称',
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
  components: { Upload },
  mounted () {
    this.getList()
  },
  methods: {
    async getList (page = 1) {
      this.loading = true
      await getImages({ page }).then(res => {
        this.list = res.data
        this.total = res.total
        this.current = res.current_page
      })
      this.loading = false
    },
    done () {
      this.$message.success('所有图片都传完啦.');
      this.clear()
      this.getList()
    },
    clear () {
      this.index = ''
      this.name = ''
      this.createState = false
    },
    onCreate () {
      let { index, name } = this
      createImage({ index, name }).then(() => {
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
  grid-template-columns: 1fr;
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