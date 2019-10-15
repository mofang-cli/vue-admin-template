import Layout from '@/layout/index'
import permission from './permission'
const routes = [
  {
    path: '/a',
    name: 'A',
    component: Layout,
    meta: { permission: 'A', showMenu: true, breadcrumb: true, icon: '' },
    children: [
      {
        path: '/',
        name: 'A',
        component: () => import(/* webpackChunkName: "a" */ '@/page/a'),
        meta: { permission: 'A' },
      },
      {
        path: 'b',
        name: 'B',
        component: () => import(/* webpackChunkName: "a" */ '@/page/b'),
        meta: { permission: 'B' },
      },
    ],
  },
]

export default permission(routes)
