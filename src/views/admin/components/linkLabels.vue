<template>
  <a-tabs>
    <a-tab-pane key="1">
      <span slot="tab">
        <a-icon type="check"/>已关联
      </span>
      <a-table
        :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
        :columns="columns"
        :rowKey="record => record.id"
        :dataSource="list"
        :loading="loading"
        :pagination="{total,current,pageSize}"
        @change="onchange"
      ></a-table>
    </a-tab-pane>
    <a-tab-pane key="2">
      <span slot="tab">
        <a-icon type="close"/>未关联
      </span>
      <a-table
        :rowSelection="{selectedRowKeys: selectedRowKeys2, onChange: onSelectChange2}"
        :columns="columns2"
        :rowKey="record => record.id"
        :dataSource="list2"
        :loading="loading2"
        :pagination="{total2,current2,pageSize2}"
        @change="onchange2"
      ></a-table>
    </a-tab-pane>
    <div slot="tabBarExtraContent">
      <a-button type="primary" @click="savelink" :disabled="!hasSelected" :loading="loading">保存</a-button>
      <!-- <span style="margin-left: 8px">
        <template v-if="hasSelected">{{`已选 ${selectedRowKeys.length} 项`}}</template>
      </span>-->
    </div>
  </a-tabs>
</template>

<script>
import { getAssignedLabels, getUnassignedLabels, linkLabel, unlinkLabel } from '@/api/project'
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
          dataIndex: 'index',
          key: 'index',
          title: '品类ID',
          scopedSlots: { customRender: 'index' },
        },
        {
          title: '品类名',
          dataIndex: 'name',
        },
      ],
      loading2: false,
      selectedRowKeys2: [],
      list2: [],
      total2: 0,
      current2: 0,
      pageSize2: 15,
      columns2: [
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
      ],
    }
  },
  props: ['active'],
  computed: {
    hasSelected () {
      return this.selectedRowKeys.length + this.selectedRowKeys2.length > 0
    }
  },
  mounted () {
    this.getList()
    this.getList2()
  },
  methods: {
    async getList (page = 1) {
      this.loading = true
      await getAssignedLabels({ page, project_id: this.active }).then(res => {
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
    onchange (e) {
      this.getList(e.current)
    },
    async getList2 (page = 1) {
      this.loading2 = true
      await getUnassignedLabels({ page, project_id: this.active }).then(res => {
        this.list2 = res.data
        this.total2 = res.total
        this.current2 = res.current_page
      })
      this.loading2 = false
    },
    onSelectChange2 (selectedRowKeys) {
      // console.log('selectedRowKeys changed: ', selectedRowKeys);
      this.selectedRowKeys2 = selectedRowKeys
    },
    onchange2 (e) {
      this.getList2(e.current)
    },
    savelink () {
      this.selectedRowKeys2.length > 0 && this.onlink()
      this.selectedRowKeys.length > 0 && this.oncancellink()
      this.selectedRowKeys2 = []
      this.selectedRowKeys = []

    },
    onlink () {
      linkLabel({ project_id: this.active, ids: this.selectedRowKeys2 }).then(() => {
        this.$message.success('关联成功')
        this.getList()
        this.getList2()
      })
    },
    oncancellink () {
      unlinkLabel({ project_id: this.active, ids: this.selectedRowKeys }).then(() => {
        this.$message.success('取消关联成功')
        this.getList()
        this.getList2()
      })
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