import { axios } from '@/utils/request'
import { baseURL } from '@/config'

export function submitLabels(parameter) {
	return axios({
		url: baseURL + '/images/label',
		method: 'put',
		data: parameter
	})
}

export function getProjects(id) {
	return axios({
		url: baseURL + '/projects',
		method: 'get',
		headers: {
			userId: 2
		}
	})
}

export function getLabels(id) {
	return axios({
		url: baseURL + '/projects/' + id + '/label-categories',
		method: 'get',
		header: {
			UserId: 'wangm'
		}
	})
}
