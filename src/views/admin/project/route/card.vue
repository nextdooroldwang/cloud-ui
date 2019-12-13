<template>
  <div>
    <card title="路由管理" tips="根据规则设置项目路由，自动生成页面" :handlers="{edit:true}" @handleEdit="handleEdit">
      <a-tree :treeData="treeData" showIcon class="tree">
        <svg-icon icon-class="constant" class="icon" slot="constant" />
        <svg-icon icon-class="async" class="icon" slot="async" />
        <svg-icon icon-class="folder" class="icon" slot="folder" />
      </a-tree>
    </card>
    <a-modal title="编辑路由" v-model="visible" :footer="null">
      <a-tabs defaultActiveKey="1" @change="callback">
        <a-tab-pane tab="视图" key="1">
          <a-button icon="plus" @click="addRoute">新增路由</a-button>
          <div class="tab1-box">
            <forms @handleOk="handleOk" @handleCancel="stateForm=false" v-if="stateForm" />
            <editor />
          </div>
        </a-tab-pane>
        <a-tab-pane tab="JSON" key="2">
          <div class="tab2-box">
            <monaco-editor />
          </div>
        </a-tab-pane>
      </a-tabs>
    </a-modal>
  </div>
</template>

<script>
import Card from '@/components/card'
import Editor from './editor'
import Forms from './forms'
import MonacoEditor from '../../components/json-monaco'
export default {
  name: 'RouteCard',
  components: { Card, Editor, Forms, MonacoEditor },
  data () {
    return {
      visible: false,
      stateForm: false,
      treeData: [
        {
          title: '基础路由',
          key: 'constant',
          slots: {
            icon: 'constant',
          },
          children: [
            { title: '登陆', key: 'constant/login' },
            { title: '注册', key: 'constant/register' },
            { title: '404', key: 'constant/404' },
          ],
        },
        {
          title: '动态路由1',
          key: 'async',
          slots: {
            icon: 'async',
          },
          children: [
            {
              title: '列表页',
              key: 'async/list',
              slots: {
                icon: 'folder',
              },
              children: [
                {
                  title: '内容',
                  key: 'async/list/main'
                }
              ]
            },
            { title: '详情页', key: 'async/detail' },
          ],
        },
      ]
    }
  },
  mounted () {

  },
  methods: {
    handleEdit () {
      this.visible = true
    },
    handleOk () {
      this.stateForm = !this.stateForm
    },
    addRoute () {
      this.stateForm = !this.stateForm
    },
    callback () {

    }
  },
}
</script>

<style lang="scss" scope>
.tree {
  font-size: 18px;
}
.icon {
  font-size: 24px;
}
.ant-modal {
  width: 80vw !important;
}
.tab1-box {
  width: 100%;
  max-height: 70vh;
  margin-top: 8px;
  overflow-y: auto;
  overflow-x: hidden;
}
.tab2-box {
  width: 100%;
  height: 70vh;
}
</style>