<template>
  <div>
    <div class="btn-box">
      <a-form-item :label="`图片名：`">
        <a-input placeholder="请输入图片名"/>
      </a-form-item>
      <div>
        <a-button type="primary" :style="{margin:'0 16px'}">搜索</a-button>
        <a-button type="primary" @click="onlink" :disabled="!hasSelected" :loading="loading">关联已选图片</a-button>
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
  </div>
</template>

<script>
import { getImages } from '@/api/project'
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
      await getImages({ page }).then(res => {
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
.ant-form-item {
  display: flex;
  align-items: center;
  margin: 0;
}
</style>