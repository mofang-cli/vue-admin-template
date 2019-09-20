import Vue from 'vue'
import Vuex from 'vuex'
import common from './modules/common'
import createLogger from 'vuex/dist/logger'

Vue.use(Vuex)

let plugins = []
if (process.env.NODE_ENV === 'development') {
  plugins.push(createLogger())
}

const store = new Vuex.Store({
  state: {
    cancelAxios: [] // 存放需要请求的cancelToken
  },
  mutations: {
    setCancelAxios (state, func) {
      state.cancelAxios.push(func)
    },
    initCancelAxios (state) {
      state.cancelAxios = []
    }
  },
  actions: {
  },
  getters: {
    getCancelAxios: state => {
      return state.cancelAxios
    }
  },
  modules: {
    common
  },
  plugins
})
export default store
