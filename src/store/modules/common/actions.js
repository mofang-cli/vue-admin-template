import Apis from '@/api'
import fetch from '@/common/fetch'

export default {
  getDictionaryItems ({state, commit}, params) {
    return fetch(Apis.login, 'get', params)
      .then(res => {
        if (res && res.code === '0' && res.result && res.result.data) {
          return res.result.data
        }
      })
  }
}
