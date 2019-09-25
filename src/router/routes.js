import { BasicLayout, UserLayout } from '@/components/layouts'

/**
 * 基础路由
 * @type { *[] }
 */
export const constantRouterMap = [
	{
		path: '/',
		name: 'home',
		component: BasicLayout,
		meta: { title: '首页' },
		redirect: '/sketchpad',
		children: [
			{
				path: '/sketchpad',
				name: 'sketchpad',
				component: () => import('@/views/sketchpad'),
				meta: { title: '画板', keepAlive: true, ipermission: ['sketchpad'] }
			}
		]
	},
	{
		path: '/user',
		name: 'User',
		component: UserLayout,
		children: [
			{
				path: '/login',
				name: 'Login',
				component: () => import('@/views/user/login'),
				meta: { title: '登录', keepAlive: true }
			},
			{
				path: '/project',
				name: 'Project',
				component: () => import('@/views/user/project'),
				meta: { title: '项目设置', keepAlive: true }
			}
		]
	},
	{
		path: '/admin',
		name: 'Admin',
		component: () => import('@/views/admin/index'),
		meta: { title: '管理员', keepAlive: true }
	},
	{
		path: '*',
		component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/404')
	}
]
