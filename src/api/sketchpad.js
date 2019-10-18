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

export function getAILabels(url, type) {
	return axios({
		url: 'http://47.94.92.176:8089/predict',
		method: 'post',
		data: {
			service: 'xuehua_service',
			parameters: {
				output: {
					bbox: true,
					best: 1,
					confidence_threshold: 0.7
				}
			},
			model_type: type,
			data: [url]
		}
	})
}
