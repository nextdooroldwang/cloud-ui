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
		redirect: '/admin',
		children: [
			{
				path: '/admin',
				name: 'Admin',
				redirect: '/admin/project',
				component: () => import('@/views/admin'),
				meta: { title: '管理平台', ipermission: ['admin'] },
				children: [
					{
						path: '/admin/project',
						name: 'Project',
						component: () => import('@/views/admin/project'),
						meta: { title: '项目管理' }
					}
				]
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
			}
		]
	},
	{
		path: '*',
		component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/404')
	}
]
