<template>
  <div class="menu">
    <el-menu
      ref="menu"
      mode="horizontal"
      :default-active="$route.path"
      text-color="#fff"
      active-text-color="#fff"
      router
      unique-opened
    >
      <template v-for="(menu, index) in menuList">
        <el-submenu v-if="hasChild(menu)" :index="index + ''">
          <template slot="title">
            <i :class="`iconfont ${menu.icon}`"></i>
            {{menu.name}}
          </template>
          <el-menu-item v-for="(menu2,i) in menu.children" :index="menu2.url" :key="i">{{menu2.name}}</el-menu-item>
        </el-submenu>
        <el-menu-item v-else :index="menu.url">
          <i :class="`iconfont ${menu.icon}`"></i>
          {{menu.name}}
        </el-menu-item>
      </template>
    </el-menu>
  </div>
</template>

<script>
  import {mapState} from 'vuex'

  export default {
    name: 'menuList',
    created () {
      this.init()
    },
    data () {
      return {
        test: {haha: ''},
        menuList: [
          {
            'name': 'Module1',
            'sign': 'Module1',
            'url': '/module1',
            'icon': ''
          },
          {
            'children': [
              {
                'name': 'page1',
                'sign': 'page1',
                'url': '/module2/page1'
              },
              {
                'name': 'page2',
                'sign': 'page2',
                'url': '/module2/page1'
              }
            ],
            'name': 'Module2',
            'sign': 'Module2',
            'url': '',
            'icon': ''
          }
        ]
      }
    },
    computed: {
      ...mapState({
        route: state => state.route
      })
    },
    mounted () {
    },
    watch: {},
    methods: {
      // 判断是否存在子集
      hasChild (obj, key = 'children') {
        return obj[key] && Array.isArray(obj[key]) && obj[key].length
      },
      init () {
        let menuList = sessionStorage.getItem('resource') ? JSON.parse(sessionStorage.getItem('resource')) : []
        // 若对接rbac权限，使用权限定义的menu
        if (menuList.length > 0) {
          this.menuList = this.renderMenu([], menuList)
        }
      },
      // 过滤下菜单，只有10的才是菜单
      renderMenu (arr, resources) {
        resources.forEach((t) => {
          let obj = {}
          if (t.type + '' === 10 + '') {
            if (t.url.indexOf('/#') > -1) {
              t.url = t.url.replace('/#', '')
            }
            obj.name = t.name
            obj.url = t.url
            obj.sign = t.sign
            obj.icon = t.icon || ''
            arr.push(obj)
          }
          if (t.children && t.children.length > 0) {
            obj.children = []
            this.renderMenu(obj.children, t.children)
          }
        })
        return arr
      }
    }
  }
</script>

<style lang="scss" scoped>
  .menu {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    padding-left: 50px;
    min-width: 1000px;
    @media (max-width: 1440px) {
      min-width: 840px;
    }
  }
</style>
