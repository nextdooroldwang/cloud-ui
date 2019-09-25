import Vue from 'vue'
import Vuex from 'vuex'

import app from './modules/app'
import user from './modules/user'
import image from './modules/image'
import getters from './getters'

Vue.use(Vuex)

export default new Vuex.Store({
	modules: { app, user, image },
	state: {},
	mutations: {},
	actions: {},
	getters
})
