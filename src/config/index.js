let env = 'local'
if (process.env.NODE_ENV === 'production') {
	env = process.env.VUE_APP_TITLE
}

export const baseURL = {
	prod: '/api',
	qa: '/api',
	dev: '/api',
	local: '/api'
}[env]

export const loginURL = {
	prod: '/api',
	qa: '/api',
	dev: '/oauth/token',
	local: '/token'
}[env]
