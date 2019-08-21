import { BasicLayout } from '@/components/layouts'

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
		path: '*',
		component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/404')
	}
]
