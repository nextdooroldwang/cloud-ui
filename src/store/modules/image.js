import { getStore, setStore, clearStore } from '@/utils/storage'
import tagOptions from '../../../public/tagOptions.json'
const app = {
	state: {
		images: [],
		active: '',
		tag: {
			tagName: Object.keys(tagOptions)[0],
			tagColor: tagOptions[Object.keys(tagOptions)[0]].color
		},
		drawing: '',
		scale: 1,
		points: {}
	},
	mutations: {
		ADD_IMAGE: (state, image) => {
			let images = [...state.images]
			images.push(image)
			images = images.map(item => {
				item.hadtags = getStore(item.key) ? true : false
				return item
			})

			state.images = images
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
			let images = [...state.images]
			images = images.map(item => {
				item.key === state.active && (item.hadtags = true)
				return item
			})
			state.images = images
			points[point.key] = point.value
			state.points = points
			setStore(state.active, state.points)
		},
		DEL_POINT: (state, key) => {
			let points = { ...state.points }
			let images = [...state.images]

			delete points[key]
			state.points = points
			if (Object.keys(state.points).length > 0) {
				setStore(state.active, state.points)
			} else {
				images = images.map(item => {
					item.key === state.active && (item.hadtags = false)
					return item
				})
				state.images = images
				clearStore(state.active)
			}
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
		delPonit({ commit, state }, key) {
			state.drawing === key && commit('SET_DRAWING', '')
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
