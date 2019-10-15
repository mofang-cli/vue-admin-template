import Vue from 'vue'
import Router from 'vue-router'
import store from '../store/store'
import Error401 from '@/page/error/error401'
import Error403 from '@/page/error/error403'
import Error404 from '@/page/error/error404'
import Layout from '@/layout/index'
import routes from './routes'

Vue.use(Router)

const getRouter = function(defaultRouter = '') {
  const router = new Router({
    mode: 'hash',
    routes: [
      {
        path: '/error401',
        name: 'error401',
        component: Error401,
      },
      {
        path: '/error403',
        name: 'error403',
        component: Error403,
      },
      {
        path: '/error404',
        name: 'error404',
        component: Error404,
      },
      {
        path: '*',
        component: Error404,
      },
      {
        path: '/',
        component: Layout,
        redirect: defaultRouter,
      },
      ...routes,
    ],
  })
  /* eslint-disable no-new */
  router.beforeEach((to, from, next) => {
    // 取消上一个界面未完成请求
    let cancelAxios = store.getters.getCancelAxios
    cancelAxios.forEach(cancel => {
      cancel()
    })
    store.commit('clearCancelAxios')
    // 根据路由修改页面title
    if (to.name) {
      document.title = to.name
    }
    next()
  })
  return router
}

export default getRouter
