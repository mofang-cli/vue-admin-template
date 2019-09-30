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
  state: {},
  mutations: {},
  actions: {},
  getters: {},
  modules: {
    common,
  },
  plugins,
})
export default store
