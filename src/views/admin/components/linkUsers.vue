<template>
  <div>
    <div class="btn-box">
      <a-form-item :label="`品类名：`">
        <a-input placeholder="请输入品类名"/>
      </a-form-item>
      <div>
        <a-button type="primary" :style="{margin:'0 16px'}">搜索</a-button>
        <a-button type="primary" @click="onlink" :disabled="!hasSelected" :loading="loading">关联已选品类</a-button>
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
    ></a-table>
  </div>
</template>

<script>
import { getLabels } from '@/api/project'
export default {
  name: 'Projects',
  data () {
    return {
      loading: false,
      selectedRowKeys: [],
      list: [],
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
    async getList () {
      this.loading = true
      await getLabels().then(res => {
        this.list = res.data
      })
      this.loading = false
    },
    onSelectChange (selectedRowKeys) {
      // console.log('selectedRowKeys changed: ', selectedRowKeys);
      this.selectedRowKeys = selectedRowKeys
    },
    onlink () {
      console.log(this.selectedRowKeys);
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