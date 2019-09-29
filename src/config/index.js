let env = 'local'
if (process.env.NODE_ENV === 'production') {
	env = process.env.VUE_APP_TITLE
}

export const baseURL = {
	prod: 'http://mark-tools.test',
	qa: 'http://mark-tools.test',
	dev: '/api',
	local: '/api'
}[env]

export const loginURL = {
	prod: 'http://mark-tools.test',
	qa: 'http://mark-tools.test',
	dev: '/oauth/token',
	local: '/token'
}[env]
