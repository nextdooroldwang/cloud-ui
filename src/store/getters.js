const getters = {
	lang: state => state.app.lang,
	token: state => state.user.token,
	avatar: state => state.user.avatar,
	name: state => state.user.name,
	// welcome: state => state.user.welcome,
	roles: state => state.user.roles,
	role: state => state.user.role,
	userInfo: state => state.user.info,
	project: state => state.project.project
}

export default getters
