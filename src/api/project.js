import { axios } from '@/utils/request'
import { baseURL } from '@/config'

export function createProject(parameter) {
	return axios({
		url: baseURL + '/admin/projects',
		method: 'post',
		data: parameter
	})
}

export function getProjects(params) {
	return axios({
		url: baseURL + '/admin/projects?page=' + params.page,
		method: 'get'
	})
}

export function getProject(id) {
	return axios({
		url: baseURL + '/admin/projects/' + id,
		method: 'get'
	})
}

export function setProject(params) {
	return axios({
		url: baseURL + '/admin/projects/' + params.id,
		method: 'put',
		data: params
	})
}

export function delProject(id) {
	return axios({
		url: baseURL + '/admin/projects/' + id,
		method: 'delete'
	})
}

export function createLabel(parameter) {
	return axios({
		url: baseURL + '/admin/label-categories',
		method: 'post',
		data: parameter
	})
}

export function getLabels(params) {
	return axios({
		url: baseURL + '/admin/label-categories?page=' + params.page,
		method: 'get'
	})
}
export function getAssignedLabels(params) {
	return axios({
		url: baseURL + '/admin/label-categories/assigned?project_id=' + params.project_id + '&page=' + params.page,
		method: 'get'
	})
}
export function getUnassignedLabels(params) {
	return axios({
		url: baseURL + '/admin/label-categories/unassigned?project_id=' + params.project_id + '&page=' + params.page,
		method: 'get'
	})
}

export function getLabel(id) {
	return axios({
		url: baseURL + '/admin/label-categories/' + id,
		method: 'get'
	})
}

export function setLabel(params) {
	return axios({
		url: baseURL + '/admin/label-categories/' + params.id,
		method: 'put',
		data: params
	})
}

export function delLabel(id) {
	return axios({
		url: baseURL + '/admin/label-categories/' + id,
		method: 'delete'
	})
}

export function linkLabel(parameter) {
	return axios({
		url: baseURL + '/admin/label-categories/assign-to-project',
		method: 'post',
		data: parameter
	})
}
export function unlinkLabel(parameter) {
	return axios({
		url: baseURL + '/admin/label-categories/cancel-to-project',
		method: 'post',
		data: parameter
	})
}

export function createUser(parameter) {
	return axios({
		url: baseURL + '/admin/users',
		method: 'post',
		data: parameter
	})
}

export function getUsers(params) {
	return axios({
		url: baseURL + '/admin/users',
		method: 'get'
	})
}

export function getUser(id) {
	return axios({
		url: baseURL + '/admin/users/' + id,
		method: 'get'
	})
}

export function setUser(params) {
	return axios({
		url: baseURL + '/admin/users/' + params.id,
		method: 'put',
		data: params
	})
}

export function delUser(id) {
	return axios({
		url: baseURL + '/admin/users/' + id,
		method: 'delete'
	})
}

export function createImage(parameter) {
	return axios({
		url: baseURL + '/admin/images',
		method: 'post',
		data: parameter
	})
}

export function getImages(params) {
	return axios({
		url: baseURL + '/admin/images?page=' + params.page,
		method: 'get'
	})
}
export function getAssignedImages(params) {
	return axios({
		url: baseURL + '/admin/images/assigned?project_id=' + params.project_id + '&page=' + params.page,
		method: 'get'
	})
}
export function getUnassignedImages(params) {
	return axios({
		url: baseURL + '/admin/images/unassigned?project_id=' + params.project_id + '&page=' + params.page,
		method: 'get'
	})
}

export function getImage(id) {
	return axios({
		url: baseURL + '/admin/images/' + id,
		method: 'get'
	})
}

export function setImage(params) {
	return axios({
		url: baseURL + '/admin/images/' + params.id,
		method: 'put',
		data: params
	})
}

export function delImage(id) {
	return axios({
		url: baseURL + '/admin/images/' + id,
		method: 'delete'
	})
}
export function delImageAll(params) {
	return axios({
		url: baseURL + '/admin/images/batch-destroy',
		method: 'post',
		data: params
	})
}

export function linkImage(parameter) {
	return axios({
		url: baseURL + '/admin/images/assign-to-user',
		method: 'post',
		data: parameter
	})
}
