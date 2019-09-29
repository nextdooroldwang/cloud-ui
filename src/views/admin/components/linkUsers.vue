<template>
  <div>
    <div class="btn-box">
      <a-form-item :label="`用户名：`">
        <a-input placeholder="请输入用户名"/>
      </a-form-item>
      <div>
        <a-button type="primary" :style="{margin:'0 16px'}">搜索</a-button>
        <a-button type="primary" @click="onlink" :disabled="!hasSelected" :loading="loading">关联已选用户</a-button>
        <span style="margin-left: 8px">
          <template v-if="hasSelected">{{`已选 ${selectedRowKeys.length} 项`}}</template>
        </span>
      </div>
    </div>
    <a-table
      :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
      :columns="columns"
      :rowKey="record => record.id"
      :dataSource="list"
      :loading="loading"
      :pagination="{total,current,pageSize}"
      @change="onchange"
    ></a-table>
  </div>
</template>

<script>
import { getUsers } from '@/api/project'
export default {
  name: 'Projects',
  data () {
    return {
      loading: false,
      selectedRowKeys: [],
      list: [],
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
      this.loading = true
      await getUsers({ page }).then(res => {
        this.list = res.data
        this.total = res.total
        this.current = res.current_page
      })
      this.loading = false
    },
    onSelectChange (selectedRowKeys) {
      // console.log('selectedRowKeys changed: ', selectedRowKeys);
      this.selectedRowKeys = selectedRowKeys
    },
    onlink () {
      console.log(this.selectedRowKeys);
    },
    onchange (e) {
      this.getList(e.current)
    },
  },
}
</script>

<style scoped>
.btn-box {
  display: flex;
  align-items: center;
  padding: 12px;
}
.ant-form-item {
  display: flex;
  align-items: center;
  margin: 0;
}
</style>