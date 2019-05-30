import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from '@/store'
import '@/core/lazy_lib/antd_component'
import { Timeline } from 'ant-design-vue'
import '@/core/use'
import 'ant-design-vue/dist/antd.css'
import i18n from '@/lang'
import './permission'

Vue.config.productionTip = false
Vue.use(Timeline)

new Vue({
	router,
	store,
	i18n,
	render: h => h(App)
}).$mount('#app')
