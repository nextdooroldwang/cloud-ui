const app = {
	state: {
		project: {}
	},
	mutations: {
		SET_PROJECT: (state, project) => {
			state.project = project
		}
	},
	actions: {
		setProject({ commit }, project) {
			commit('SET_PROJECT', project)
		}
	}
}

export default app
