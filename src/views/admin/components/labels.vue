<template>
  <div>
    <div class="btn-box">
      <a-form-item :label="`品类名：`">
        <a-input placeholder="请输入品类名"/>
      </a-form-item>
      <div>
        <a-button type="primary" :style="{margin:'0 16px'}">搜索</a-button>
        <a-button @click="createState = true" :disabled="createState">新增</a-button>
      </div>
    </div>
    <div class="create-box" v-if="createState">
      <a-input v-model="index" placeholder="请输入品类ID"/>
      <a-input v-model="name" placeholder="请输入品类名"/>
      <a-button type="primary" @click="onCreate" :disabled="!index||!name">保存</a-button>
      <a-button @click="createState = false">取消</a-button>
    </div>
    <div class="create-box" v-if="editId">
      <a-input v-model="indexEdit" placeholder="请输入品类ID"/>
      <a-input v-model="nameEdit" placeholder="请输入品类名"/>
      <a-button type="primary" @click="onEdit" :disabled="!indexEdit||!nameEdit">保存</a-button>
      <a-button @click="clear">取消</a-button>
    </div>
    <a-table
      :columns="columns"
      :rowKey="record => record.id"
      :dataSource="list"
      :loading="loading"
      :pagination="{total,current,pageSize}"
      @change="onchange"
    >
      <span slot="action" slot-scope="text, record">
        <a href="javascript:;" @click="edit(record.id)">编辑</a>
        <!-- <a-divider type="vertical"/>
        <a-popconfirm title="确定删除此项目?" @confirm="ondelete(record.id)">
          <a href="javascript:;">删除</a>
        </a-popconfirm>-->
      </span>
    </a-table>
  </div>
</template>

<script>
import { getLabels, createLabel, setLabel, delLabel } from '@/api/project'
export default {
  name: 'Projects',
  data () {
    return {
      loading: false,
      createState: false,
      index: '',
      name: '',
      indexEdit: '',
      nameEdit: '',
      editId: '',
      list: [],
      total: 0,
      current: 0,
      pageSize: 15,
      columns: [
        {
          dataIndex: 'index',
          key: 'index',
          title: '品类ID',
          scopedSlots: { customRender: 'index' },
        },
        {
          title: '品类名',
          dataIndex: 'name',
        },
        {
          title: '操作',
          key: 'action',
          scopedSlots: { customRender: 'action' },
        }
      ],
    }
  },
  mounted () {
    this.getList()
  },
  methods: {
    async getList (page = 1) {
      this.loading = true
      await getLabels({ page }).then(res => {
        this.list = res.data
        this.total = res.total
        this.current = res.current_page
      })
      this.loading = false
    },
    clear () {
      this.index = ''
      this.name = ''
      this.indexEdit = ''
      this.nameEdit = ''
      this.editId = ''
      this.createState = false
    },
    onCreate () {
      let { index, name } = this
      createLabel({ index, name }).then(() => {
        this.$message.success('添加成功')
        this.clear()
        this.getList()
      })
    },
    onEdit () {
      let { indexEdit, nameEdit, editId } = this
      setLabel({ index: indexEdit, name: nameEdit, id: editId }).then(() => {
        this.$message.info('修改成功')
        this.clear()
        this.getList()
      })
    },
    edit (id) {
      this.editId = id
      this.list.map(item => {
        if (item.id === id) {
          this.indexEdit = item.index
          this.nameEdit = item.name
        }
      })
    },
    ondelete (id) {
      delLabel(id).then(() => {
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
  grid-template-columns: 1fr 1fr 90px 90px;
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