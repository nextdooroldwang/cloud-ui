<template>
  <div>
    <div class="btn-box">
      <div>
        <a-button
          type="primary"
          @click="createState = true"
          style="margin-right:16px"
          :disabled="createState"
        >新增</a-button>
        <a-popconfirm title="确定销毁所有图片?" @confirm="deleteAll">
          <a-button @click="createState = false" type="danger" :disabled="list.length===0">删除已选文件夹</a-button>
        </a-popconfirm>
      </div>
    </div>
    <div class="create-box" v-if="createState">
      <upload @done="done" @close="createState = false" :userList="userList"/>
    </div>

    <a-table
      :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
      :columns="columns"
      :rowKey="record => record.dir"
      :dataSource="pageList"
      :loading="loading"
      :pagination="{total,current,pageSize}"
      @change="onchange"
    >
      <!-- <img
        slot="path"
        slot-scope="text, record"
        width="100"
        :src="record.path+'?x-oss-process=style/list-thumb'"
      >-->
      <span slot="dir" slot-scope="text, record">
        {{
        text
        }}
      </span>
      <span slot="action" slot-scope="text, record">
        <a-popconfirm title="确定删除此文件夹?" @confirm="ondelete(record.dir)">
          <a href="javascript:;">删除</a>
        </a-popconfirm>
      </span>
    </a-table>
  </div>
</template>

<script>
import { getUsers } from '@/api/project'
import Upload from '@/components/upload'
import { getDir, deletefiles, getImages } from '@/utils/oss'

export default {
  name: 'Images',
  data () {
    return {
      loading: false,
      createState: false,
      selectedRowKeys: [],
      list: [],
      userList: [],
      pageList: [],
      total: 0,
      current: 0,
      pageSize: 15,
      columns: [
        {
          dataIndex: 'dir',
          key: 'dir',
          title: '文件夹',
          scopedSlots: { customRender: 'dir' },
        },
        // {
        //   dataIndex: 'path',
        //   key: 'path',
        //   title: '图片',
        //   scopedSlots: { customRender: 'path' },
        // },
        // {
        //   dataIndex: 'name',
        //   key: 'name',
        //   title: '图片名称',
        //   scopedSlots: { customRender: 'name' },
        // },
        {
          title: '操作',
          key: 'action',
          scopedSlots: { customRender: 'action' },
        }
      ],
    }
  },
  components: { Upload },
  computed: {
    hasSelected () {
      return this.selectedRowKeys.length > 0
    },

  },
  mounted () {
    this.getList()
    this.getUsers()
  },
  methods: {
    getUsers () {
      getUsers().then(res => {
        this.userList = res
      })
    },
    async getList (page = 1) {
      let project = this.$store.getters.project
      let path = project.id + '/'
      this.loading = true
      this.list = await getDir(path)
      this.total = this.list.length
      this.current = page
      this.pageList = this.getPageList(page)
      this.loading = false
    },

    done () {
      this.$message.success('所有图片都传完啦.');
      this.clear()
      this.getList()
    },
    clear () {
      this.createState = false
    },
    ondelete (dir) {
      let project = this.$store.getters.project
      let path = project.id + '/' + dir + '/'
      getImages(path).then(res => {
        let images = res.map(item => {
          return item.name
        })
        deletefiles(images, (d) => {
          console.log(d);
          this.clear()
          this.getList()
        })
      });
    },
    deleteAll () {
      console.log(this.selectedRowKeys);
      this.selectedRowKeys.map(dir => {
        this.ondelete(dir)
      })
    },
    onSelectChange (selectedRowKeys) {
      // console.log('selectedRowKeys changed: ', selectedRowKeys);
      this.selectedRowKeys = selectedRowKeys
    },
    getPageList (current) {
      let l = [...this.list]
      return l.slice((current - 1) * this.pageSize, current * this.pageSize)
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