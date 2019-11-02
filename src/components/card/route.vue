<template>
  <card title="路由管理" tips="根据规则设置项目路由，自动生成页面">
    <a-tree :treeData="treeData" showIcon class="tree">
      <svg-icon icon-class="constant" class="icon" slot="constant" />
      <svg-icon icon-class="async" class="icon" slot="async" />
      <svg-icon icon-class="folder" class="icon" slot="folder" />
    </a-tree>
  </card>
</template>

<script>
import Card from './index'
export default {
  name: 'RouteCard',
  components: { Card },
  data () {
    return {
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
}
</script>

<style lang="scss" scoped>
.tree {
  font-size: 18px;
}
.icon {
  font-size: 24px;
}
</style>