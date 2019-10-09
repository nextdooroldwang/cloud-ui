import { axios } from '@/utils/request'
import store from '@/store'
const token_info = {
	client_id: '2',
	// client_secret: '4R7X3R0Qfftw5kE5QUroV9LUSI2948dJI22twRUb',
	client_secret: 'KGSCUVtFXSbcn88GJXapb1B4RsuCxh6ZGWZwKLkQ',
	scope: '*'
}

// 登录相关
export function loginByUsername(d) {
	const data = {
		grant_type: 'password',
		client_id: token_info.client_id,
		client_secret: token_info.client_secret,
		scope: token_info.scope,
		username: d.username,
		password: d.password,
		provider: store.getters.role
	}
	return axios({
		url: '/api/oauth/token',
		method: 'post',
		data
	})
}

// 刷新token
export function refreshToken(refresh_token) {
	const data = {
		grant_type: 'refresh_token',
		refresh_token: refresh_token,
		client_id: token_info.client_id,
		client_secret: token_info.client_secret,
		scope: token_info.scope
	}
	return axios({
		url: '/api/oauth/token',
		method: 'post',
		data
	})
}

export function logout() {
	return axios({
		url: '/api/admin/logout',
		method: 'post'
	})
}

export function createdSetting(d) {
	const data = d
	return axios({
		url: '/api/admin/user',
		method: 'put',
		data
	})
}

export function updatedSetting() {
	return axios({
		url: '/api/admin/user',
		method: 'get'
	})
}

export function getHomepageData() {
	return axios({
		url: '/api/admin/home',
		method: 'get'
	})
}

export function getUserInfo() {
	return axios({
		url: 'api/admin/user',
		method: 'get'
	})
}
