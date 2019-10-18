const ACCESS_TOKEN_KEY = 'XUEHUA-ACCESS-TOKEN'
const REFRESH_TOKEN_KEY = 'XUEHUA-REFRESH_TOKEN_KEY'
const TOKEN_EXPIRE_TIME_KEY = 'XUEHUA-TOKEN-EXPIRES'

export function getToken() {
	return localStorage.getItem(ACCESS_TOKEN_KEY)
}

export function setToken(token, expires) {
	localStorage.setItem(ACCESS_TOKEN_KEY, token)
	localStorage.setItem(TOKEN_EXPIRE_TIME_KEY, new Date().getTime() + expires * 1000)
}

export function removeToken() {
	localStorage.clear()
	// localStorage.removeItem(ACCESS_TOKEN_KEY)
	// localStorage.removeItem(REFRESH_TOKEN_KEY)
	// localStorage.removeItem(TOKEN_EXPIRE_TIME_KEY)
}

export function setRefreshToken(token) {
	localStorage.setItem(REFRESH_TOKEN_KEY, token)
}

export function getRefreshToken() {
	return localStorage.getItem(REFRESH_TOKEN_KEY)
}

export function isLogin() {
	return getRefreshToken()
}

export function isRefreshToken() {
	const expires = localStorage.getItem(TOKEN_EXPIRE_TIME_KEY)
	// Refresh 10 seconds in advance
	return new Date().getTime() < expires - 1000
}

// -------------------------------------------------------------
export function getValidToken(func) {
	const token = getToken()
	const refreshToken = getRefreshToken()
	const expires = localStorage.getItem(TOKEN_EXPIRE_TIME_KEY)
	if (token && refreshToken && expires) {
		// 如果有token
		if (new Date().getTime() + 10000 < expires) {
			// 没过期
			return token
		} else {
			// 过期，需要刷新token
			return { refreshToken }
		}
	} else {
		return undefined
	}
}
