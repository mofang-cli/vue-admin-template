import actions from './actions'
import mutations from './mutations'
import getters from './getters'

const state = {
  cancelAxios: [], // 存放需要请求的cancelToken
}
export default {
  state,
  actions,
  mutations,
  getters,
}
