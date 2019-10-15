import { Message } from 'element-ui'
import axios from 'axios'
import store from '@/store/store'

// axios.defaults.baseURL = baseUrl
axios.defaults.withCredentials = true
// 请求头注入 用户信息等
axios.interceptors.request.use(
  config => {
    config.headers = {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
    }
    if (config.method === 'delete' || config.method === 'get') {
      config.params = config.data
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

axios.interceptors.response.use(
  function(response) {
    return response.data
  },
  function(error) {
    if (error.toString().startsWith('Error: Network Error')) {
      Message.error('网络异常，请检查当前互联网状态')
    } else if (error.toString().startsWith('Error: Request failed')) {
      Message.error('接口异常')
    } else if (error.toString() === 'Cancel') {
      // 取消请求不做处理
    } else {
      console.log(error.toString())
    }
    return Promise.reject(error)
  }
)

let CancelToken = axios.CancelToken
export default function fetch(url, method, params) {
  return new Promise((resolve, reject) => {
    axios({
      url: url,
      method: method,
      data: params,
      cancelToken: new CancelToken(c => {
        store.commit('setCancelAxios', c)
      }),
    })
      .then(response => {
        // 异常请求 status !== 200, 统一弹窗提醒，业务代码无需处理
        if (response.status && response.status !== 200) {
          if (response.message) {
            Message.error(response.message)
          }
        } else {
          resolve(response)
        }
      })
      .catch(error => {
        console.log(error)
        reject(error)
      })
  })
}
