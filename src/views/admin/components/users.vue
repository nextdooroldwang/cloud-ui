<template>
  <div>
    <div class="btn-box">
      <a-form-item :label="`用户名：`">
        <a-input placeholder="请输入用户名"/>
      </a-form-item>
      <div>
        <a-button type="primary" :style="{margin:'0 16px'}">搜索</a-button>
        <a-button @click="createState = true" :disabled="createState">新增</a-button>
      </div>
    </div>
    <div class="create-box" v-if="createState">
      <a-input v-model="name" placeholder="请输入用户名"/>
      <a-input v-model="password" placeholder="请输入密码"/>
      <a-button type="primary" @click="onCreate" :disabled="!name||!password">保存</a-button>
      <a-button @click="createState = false">取消</a-button>
    </div>
    <div class="create-box" v-if="editId">
      <a-input v-model="nameEdit" placeholder="请输入用户名"/>
      <a-input v-model="passwordEdit" placeholder="请输入用户密码"/>
      <a-button type="primary" @click="onEdit" :disabled="!nameEdit||!passwordEdit">保存</a-button>
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
        <a-divider type="vertical"/>
        <a-popconfirm title="确定删除此用户?" @confirm="ondelete(record.id)">
          <a href="javascript:;">删除</a>
        </a-popconfirm>
      </span>
    </a-table>
  </div>
</template>

<script>
import { getUsers, createUser, setUser, delUser } from '@/api/project'
export default {
  name: 'Projects',
  data () {
    return {
      loading: false,
      createState: false,
      name: '',
      password: '',
      nameEdit: '',
      passwordEdit: '',
      editId: '',
      list: [],
      pageList: [],
      total: 0,
      current: 0,
      pageSize: 15,
      columns: [
        {
          dataIndex: 'name',
          key: 'name',
          title: '用户名',
          scopedSlots: { customRender: 'name' },
        },
        // {
        //   title: '用户密码',
        //   dataIndex: 'password',
        // },
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
      await getUsers({ page }).then(res => {
        console.log(res);
        this.list = res
        // this.list = res.data
        this.total = res.length
        this.current = page
        this.pageList = this.getPageList(page)
      })
      this.loading = false
    },
    getPageList (current) {
      let l = [...this.list]
      return l.slice((current - 1) * this.pageSize, current * this.pageSize)
    },
    clear () {
      this.name = ''
      this.password = ''
      this.nameEdit = ''
      this.passwordEdit = ''
      this.editId = ''
      this.createState = false
    },
    onCreate () {
      let { name, password } = this
      createUser({ name, password }).then(() => {
        this.$message.success('添加成功')
        this.clear()
        this.getList()
      })
    },
    onEdit () {
      let { nameEdit, passwordEdit, editId } = this
      setUser({ name: nameEdit, password: passwordEdit, id: editId }).then(() => {
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
          this.passwordEdit = item.password
        }
      })
    },
    ondelete (id) {
      delUser(id).then(() => {
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