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
      </a-table>
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
      </a-table>
    </a-tab-pane>
    <div slot="tabBarExtraContent">
      <a-button type="primary" @click="onlink" :disabled="!hasSelected" :loading="loading">保存</a-button>
      <span style="margin-left: 8px">
        <template v-if="hasSelected">{{`已选 ${selectedRowKeys.length} 项`}}</template>
      </span>
    </div>
  </a-tabs>
</template>

<script>
import { getAssignedImages, getUnassignedImages, linkImage } from '@/api/project'
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
      ],
      loading2: false,
      selectedRowKeys2: [],
      list2: [],
      total2: 0,
      current2: 0,
      pageSize2: 15,
      columns2: [
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
      ],
    }
  },
  props: ['active'],
  computed: {
    hasSelected () {
      return this.selectedRowKeys.length > 0
    }
  },
  mounted () {
    this.getList()
    this.getList2()
  },
  methods: {
    async getList (page = 1) {
      this.loading = true
      await getAssignedImages({ page, project_id: this.active }).then(res => {
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
      await getUnassignedImages({ page, project_id: this.active }).then(res => {
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
    onlink () {
      linkImage({ project_id: this.active, user_id: 1, image_ids: this.selectedRowKeys }).then(() => {
        this.$message.success('关联成功')
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