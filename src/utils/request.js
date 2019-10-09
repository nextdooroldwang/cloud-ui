// import Vue from 'vue'
import axios from 'axios'
import { getValidToken, removeToken, setToken, setRefreshToken } from '@/utils/auth'
import { refreshToken as refreshAccessToken } from '@/api/login'
import notification from 'ant-design-vue/es/notification'
import router from '@/router'
// 创建 axios 实例
const service = axios.create({
	baseURL: '/',
	// baseURL: process.env.BASE_API,
	timeout: 60000
})

const AUTH_WHITE_LIST = [/\/api\/oauth\/token/]

let requestList = []

function testAuthWhiteList(url) {
	for (let i = 0, length = AUTH_WHITE_LIST.length; i < length; i++) {
		if (AUTH_WHITE_LIST[i].test(url)) return true
	}
	return false
}

service.interceptors.request.use(
	function(config) {
		// 设置请求取消配置
		const CancelToken = axios.CancelToken
		const source = CancelToken.source()
		config.cancelToken = source.token
		// 设置access_token
		if (!testAuthWhiteList(config.url)) {
			// 不在白名单内，需要认证字段
			const token = getValidToken()
			if (typeof token === 'string') {
				// 有合法token
				config.headers['Authorization'] = 'Bearer ' + token
				return config
			} else if (typeof token === 'object') {
				// 需要刷新token，此时token为对象，{ refreshToken: 'xxx' }
				if (!window.isTokenRefreshing) {
					window.isTokenRefreshing = true
					refreshAccessToken(token.refreshToken).then(
						res => {
							setToken(res.data.access_token, res.data.expires_in)
							setRefreshToken(res.data.refresh_token)
							config.headers['Authorization'] = 'Bearer ' + res.data.access_token
							window.isTokenRefreshing = false
							requestList.map(callback => callback(res.data.access_token))
							requestList = []
							return config
						},
						() => {
							// 刷新失败
							window.isTokenRefreshing = false
							removeToken()
						}
					)
				}
				const requestPromise = new Promise((resolve, reject) => {
					requestList.push(token => {
						config.headers['Authorization'] = 'Bearer ' + token
						resolve(config)
					})
				})
				return requestPromise
			} else {
				// 没有合法token，也不能refresh，需重新登录
				source.cancel()
				// console.log('跳转至登录页')
				router.push({ name: 'Login' })
				return config
			}
		} else {
			console.log(config)
			return config
		}
	},
	function(error) {
		console.log(error)
		return Promise.reject(error)
	}
)

service.interceptors.response.use(
	response => {
		return response.data
	},
	error => {
		console.log(error)
		if (error.response) {
			if (error.response.status === 401) {
				removeToken()
				notification.error({ message: '异常警告', description: '认证失败，即将跳转到登录页！' })
				setTimeout(() => {
					location.reload() // 修复401后，前进后退失效问题
				}, 2000)
			} else if (error.response.status === 500) {
				console.log(error.response)
				notification.error({ message: '异常警告', description: '很抱歉，操作发生错误，请重试！' })
			} else if (error.response.status === 502 || error.response.status === 504) {
				notification.error({ message: '异常警告', description: '很抱歉，服务器异常，请稍后重试！' })
			} else if (error.response.status === 403) {
				notification.error({ message: '异常警告', description: '很抱歉，您没有这项操作的权限！' })
			} else if (error.response.status === 406) {
				notification.error({ message: '异常警告', description: error.response.data.message })
			} else if (error.response.status === 422) {
				const message = error.response.data.message || '很抱歉，操作发生错误，请重试！'
				notification.error({ message: '异常警告', description: message })
			}
		}
		return Promise.reject(error)
	}
)

export { service as axios }
