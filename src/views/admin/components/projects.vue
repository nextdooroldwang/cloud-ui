<template>
  <div>
    <div class="btn-box">
      <a-form-item :label="`项目名：`">
        <a-input placeholder="请输入项目名"/>
      </a-form-item>
      <div>
        <a-button type="primary" :style="{margin:'0 16px'}">搜索</a-button>
        <a-button @click="createState = true" :disabled="createState">新增</a-button>
      </div>
    </div>
    <div class="create-box" v-if="createState">
      <a-input v-model="name" placeholder="请输入项目名"/>
      <a-input v-model="desc" placeholder="请输入项目描述"/>
      <a-button type="primary" @click="onCreate" :disabled="!name||!desc">保存</a-button>
      <a-button @click="createState = false">取消</a-button>
    </div>
    <div class="create-box" v-if="editId">
      <a-input v-model="nameEdit" placeholder="请输入项目名"/>
      <a-input v-model="descEdit" placeholder="请输入项目描述"/>
      <a-button type="primary" @click="onEdit" :disabled="!nameEdit||!descEdit">保存</a-button>
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
      <a
        slot="name"
        slot-scope="text, record"
        href="javascript:;"
        @click="$emit('onActive',record.id)"
      >{{text}}</a>

      <span slot="action" slot-scope="text, record">
        <a href="javascript:;" @click="edit(record.id)">编辑</a>
        <a-divider type="vertical"/>
        <a-popconfirm title="确定删除此项目?" @confirm="ondelete(record.id)">
          <a href="javascript:;">删除</a>
        </a-popconfirm>
      </span>
    </a-table>
  </div>
</template>

<script>
import { getProjects, getProject, createProject, setProject, delProject } from '@/api/project'
export default {
  name: 'Projects',
  data () {
    return {
      loading: false,
      createState: false,
      name: '',
      desc: '',
      nameEdit: '',
      descEdit: '',
      editId: '',
      list: [],
      total: 0,
      current: 0,
      pageSize: 15,
      columns: [
        {
          dataIndex: 'name',
          key: 'name',
          title: '项目名',
          scopedSlots: { customRender: 'name' },
        },
        {
          title: '项目描述',
          dataIndex: 'desc',
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
      await getProjects({ page }).then(res => {
        this.list = res.data
        this.total = res.total
        this.current = res.current_page
        res.data.length > 0 && this.$emit('onActive', res.data[0].id)
      })
      this.loading = false
      getProject(7).then()
    },
    clear () {
      this.name = ''
      this.desc = ''
      this.nameEdit = ''
      this.descEdit = ''
      this.editId = ''
      this.createState = false
    },
    onCreate () {
      let { name, desc } = this
      createProject({ name, desc }).then(() => {
        this.$message.success('添加成功')
        this.clear()
        this.getList()
      })
    },
    onEdit () {
      let { nameEdit, descEdit, editId } = this
      setProject({ name: nameEdit, desc: descEdit, id: editId }).then(() => {
        this.$message.info('修改成功')
        this.clear()
        this.getList()
      })
    },
    edit (id) {
      this.editId = id
      this.list.map(item => {
        if (item.id === id) {
          this.nameEdit = item.name
          this.descEdit = item.desc
        }
      })
    },
    ondelete (id) {
      delProject(id).then(() => {
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