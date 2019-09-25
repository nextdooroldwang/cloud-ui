let env = 'local'
if (process.env.NODE_ENV === 'production') {
	env = process.env.VUE_APP_TITLE
}

export const baseURL = {
	prod: 'http://47.102.97.134:31562',
	qa: 'http://47.102.97.134:31562',
	dev: '/api',
	local: '/api'
}[env]

export const loginURL = {
	prod: 'http://47.102.97.134:31562',
	qa: 'http://47.102.97.134:31562',
	dev: '/oauth/token',
	local: '/token'
}[env]
