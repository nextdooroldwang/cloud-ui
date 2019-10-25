import { loginByUsername } from '@/api/login'
import { getToken, removeToken, setToken, setRefreshToken } from '@/utils/auth'

const user = {
	state: {
		token: getToken(),
		name: '',
		// welcome: '',
		avatar: '',
		roles: [],
		info: {},
		activeProject: null,
		role: 'users'
	},
	mutations: {
		SET_TOKEN: (state, token) => {
			state.token = token
		},
		SET_NAME: (state, { name, welcome }) => {
			state.name = name
			state.welcome = welcome
		},
		SET_AVATAR: (state, avatar) => {
			state.avatar = avatar
		},
		SET_ROLES: (state, roles) => {
			state.roles = roles
		},
		SET_INFO: (state, info) => {
			state.info = info
		},
		ACTIVE_PROJECT: (state, id) => {
			state.activeProject = id
		},
		CHANGE_ROLE: (state, role) => {
			state.role = role
		}
	},
	actions: {
		activeProject({ commit }, id) {
			commit('ACTIVE_PROJECT', id)
		},
		changeRole({ commit }, role) {
			commit('CHANGE_ROLE', role)
		},
		Login({ commit }, userInfo) {
			return new Promise(resolve => {
				setToken('123', '456')
				setRefreshToken('789')
				commit('SET_NAME', { name: userInfo.username })
				resolve()
			})
		},
		// 获取用户信息
		GetInfo({ commit }) {
			return new Promise(resolve => {
				if (getToken()) {
					let result = {
						// name: 'Cheng Zhi',
						// avatar: '',
						role: {
							permissionList: ['Project', 'Sketchpad']
						}
					}

					commit('SET_ROLES', result.role)
					// commit('SET_INFO', result)
					// commit('SET_NAME', { name: result.name })
					// commit('SET_AVATAR', result.avatar)

					resolve(result)
				}
				// getInfo().then(response => {
				//   const result = response.result

				//   if (result.role && result.role.permissions.length > 0) {
				//     const role = result.role
				//     role.permissions = result.role.permissions
				//     role.permissions.map(per => {
				//       if (per.actionEntitySet != null && per.actionEntitySet.length > 0) {
				//         const action = per.actionEntitySet.map(action => { return action.action })
				//         per.actionList = action
				//       }
				//     })
				//     role.permissionList = role.permissions.map(permission => { return permission.permissionId })
				//     commit('SET_ROLES', result.role)
				//     commit('SET_INFO', result)
				//   } else {
				//     reject(new Error('getInfo: roles must be a non-null array !'))
				//   }

				//   commit('SET_NAME', { name: result.name, welcome: welcome() })
				//   commit('SET_AVATAR', result.avatar)

				//   resolve(response)
				// }).catch(error => {
				//   reject(error)
				// })
			})
		},
		Logout({ commit }) {
			return new Promise(resolve => {
				commit('SET_TOKEN', '')
				removeToken()
				resolve()
				// logout(state.token)
				// 	.then(() => {
				// 		resolve()
				// 	})
				// 	.catch(() => {
				// 		resolve()
				// 	})
			})
		}
	}
}

export default user
