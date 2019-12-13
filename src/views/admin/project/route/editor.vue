<template>
  <div class="edit-container">
    <a-table :columns="columns" :dataSource="data" :pagination="false" />
  </div>
</template>

<script>
const columns = [
  {
    title: '分类',
    dataIndex: 'category',
    key: 'category'
  },
  {
    title: 'Title',
    dataIndex: 'title',
    key: 'title'
  },
  {
    title: 'Path',
    dataIndex: 'path',
    key: 'path',
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: 'Component',
    dataIndex: 'component',
    key: 'component'
  },
  {
    title: 'Redirect',
    dataIndex: 'redirect',
    key: 'redirect'
  },
  {
    title: 'Ipermission',
    dataIndex: 'ipermission',
    key: 'ipermission'
  },
  {
    title: 'Meta',
    dataIndex: 'meta',
    key: 'meta'
  },

];

const data = [
  {
    category: 'constant',
    key: 'constant',
    children: [
      {
        // title:'首页',
        path: '/',
        name: 'Home',
        key: 'Home',
        component: '@/components/layouts/BasicLayout',
        redirect: '/admin',
        meta: { title: '首页' },

      },
      {
        path: '/admin',
        name: 'Admin',
        key: 'Admin',
        redirect: '/admin/project',
        component: '@/views/admin',
        meta: { title: '管理平台', ipermission: ['admin'] },
        children: [
          {
            path: '/admin/project',
            name: 'Project',
            key: 'Project',
            component: '@/views/admin/project',
            meta: { title: '项目管理' }
          }
        ]
      },
      {
        path: '/user',
        name: 'User',
        key: 'User',
        component: '@/components/layouts/UserLayout',
        children: [
          {
            path: '/login',
            name: 'Login',
            key: 'Login',
            component: () => import('@/views/user/login'),
            meta: { title: '登录', keepAlive: true }
          }
        ]
      },
      {
        path: '*',
        name: '*',
        key: '*',
        meta: { title: '404' },
        component: '@/views/exception/404'
      }
    ]

  },
  {
    category: 'async',
    key: 'async',
    children: [
      {
        path: '/components',
        name: 'Components',
        key: 'Components',
        component: '@/components/layouts/BasicLayout',
        redirect: '/components/private',
        meta: { title: '物料', ipermission: ['components'] },
        children: [
          {
            path: '/components/private',
            name: 'Private',
            key: 'Private',
            component: '@/views/com',
            meta: { title: '我的物料' }
          }, {
            path: '/components/public',
            name: 'Public',
            key: 'Public',
            component: '@/views/com/public',
            meta: { title: '物料广场' }
          },
        ]
      },

    ]
  },
];
export default {
  name: 'RouteEditor',
  data () {
    return {
      data,
      columns,
    }
  },
}
</script>

<style lang="scss" scoped>
</style>