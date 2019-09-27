import Vue from 'vue'
import App from './App'
import getRouter from './router/router'
import store from './store/store'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'element-ui/lib/theme-chalk/icon.css'
import '@/assets/iconfont/iconfont.css'
import '@/assets/styles/index.scss'
import axios from 'axios'
import moment from 'moment'
import i18n from './lang'
import { sync } from 'vuex-router-sync'
import searchBar from '@/components/searchBar/index'
import { global } from '@/mixin/global'

if (process.env.NODE_ENV === 'development') {
  // require('./mock/index')
}

Vue.use(Element, {i18n: (key, value) => i18n.t(key, value)})

Object.defineProperty(Vue.prototype, '$moment', { value: moment })

// 全局注册搜索组件
Vue.component('searchBar', searchBar)

// 全局混入通用
Vue.mixin(global)

let globalConfigFile = 'static/global.json'
if (process.devCondition) {
  globalConfigFile = `static/global-${process.devCondition}.json`
}

axios.get(globalConfigFile).then((res) => {
  Vue.prototype.g_Config = res
  window.ajaxBaseUrl = res['AJAX_BASE_URL']
  let router = getRouter()
  sync(store, router)
	return new Vue({ // eslint-disable-line
		el: '#app',
		router,
		store,
		i18n,
		template: '<App/>',
		components: { App }
	})
})
