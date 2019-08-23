import { getStore, setStore } from '@/utils/storage'
const app = {
	state: {
		images: {},
		active: '',
		tag: {},
		drawing: '',
		scale: 1,
		points: {}
	},
	mutations: {
		ADD_IMAGE: (state, image) => {
			let images = { ...state.images, ...image }
			state.images = images
		},
		DEL_IMAGE: (state, key) => {
			delete state.images[key]
		},
		ACTIVE_IMAGE: (state, key) => {
			state.active = key
		},
		SET_SCALe: (state, scale) => {
			state.scale = scale
		},
		SET_POINTS: state => {
			state.points = getStore(state.active) || {}
		},
		SET_POINT: (state, point) => {
			let points = { ...state.points }
			points[point.key] = point.value
			state.points = points
			setStore(state.active, state.points)
		},
		DEL_POINT: (state, key) => {
			let points = { ...state.points }
			delete points[key]
			state.points = points
			setStore(state.active, state.points)
		},
		SET_TAG: (state, tag) => {
			state.tag = tag
		},
		SET_DRAWING: (state, key) => {
			state.drawing = key
		}
	},
	actions: {
		addImage({ commit }, image) {
			commit('ADD_IMAGE', image)
		},
		delImage({ commit }, key) {
			commit('DEL_IMAGE', key)
		},
		activeImage({ commit }, key) {
			commit('ACTIVE_IMAGE', key)
			commit('SET_POINTS')
		},
		setScale({ commit }, scale) {
			commit('SET_SCALe', scale)
		},
		// setPoints({ commit }) {
		// 	commit('SET_POINTS')
		// },
		setPoint({ commit }, point) {
			commit('SET_POINT', point)
		},
		delPonit({ commit }, key) {
			commit('DEL_POINT', key)
		},
		setTag({ commit }, tag) {
			commit('SET_TAG', tag)
		},
		setDrawing({ commit }, key) {
			commit('SET_DRAWING', key)
		},
		finishedDraw({ commit }) {
			commit('SET_DRAWING', '')
		}
	}
}

export default app
