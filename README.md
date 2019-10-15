# vue-admin-template

## 安装步骤 ##

  npm install

## 本地开发 ##

  npm run dev

## 构建生产 ##

  npm run build


## 技术栈

vue2 + vuex + vue-router + axios + webpack + ES5/6/7 + scss

## 目录结构

```
.
├── build                                       // webpack配置文件
├── config                                      // 项目打包路径
├── src                                         // 源码目录
│   ├── assets                                  // 项目所需公共静态资源，如图片，css等
│   │   ├── images                              // 项目公共图片资源
│   │   └── styles                              // 项目公共样式资源
│   │       └── index.scss                      // 样式入口
│   ├── common                                  // 项目公共js资源
│   │   └── ajax                                // ajax组件
│   │       ├── ajax.js                         // 根据axios封装出来的Ajax
│   │       └── ajax-config.js                  // axios的默认配置项
│   ├── components                              // 组件
│   │   ├── common                              // 公共组件
│   │   │   └── shoplist.vue                    // msite和shop页面的餐馆列表公共组件
│   │   ├── footer
│   │   │   └── footer.vue                      // 底部公共组件
│   │   └── header
│   │       └── header.vue                      // 头部公共组件
│   ├── page
│   │   ├── error
│   │   │   └── error.vue                       // 错误页面
│   │   ├── login
│   │   │   └── login.vue                       // 登录页
│   │   └── home.vue                            // 项目页面总布局
│   ├── router
│   │   └── index.js                            // 基础路由配置
│   │   └── routes.js                           // 业务路由配置
│   │   └── permission.js                       // 路由权限控制
│   ├── store                                   // vuex的状态管理
│   │   ├── action.js                           // 配置actions
│   │   ├── getters.js                          // 配置getters
│   │   ├── modules                             // store模块
│   │   ├── mutation-types.js                   // 定义常量muations名
│   │   ├── mutations.js                        // 配置mutations
│   │   └── store.js                            // 引用vuex，创建store
│   ├── App.vue                                 // 页面入口文件
│   └── main.js                                 // 程序入口文件，加载各种公共组件
├── static                                      // 项目公共静态资源，如图片等
│   └──images                                   // 项目公共图片资源
├── index.html                                  // 入口html文件


```
## 权限控制

* 页面级权限

  Menu、面包屑都是根据路由产生，只需修改router/permission.js，根据角色和资源对路由进行过滤即可
  
## 父子路由

```javascript

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
```

## prettier 格式化代码

webstorm 配置如下：
https://prettier.io/docs/en/webstorm.html
