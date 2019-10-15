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
          <el-menu-item v-for="(menu2,i) in menu.children" :index="menu.url + '/' + menu2.url" :key="i">{{menu2.name}}</el-menu-item>
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
  export default {
    name: 'menuList',
    created () {
      this.init()
    },
    data () {
      return {
        menuList: [],
        // routes
      }
    },
    computed: {
    },
    mounted () {
    },
    watch: {
    },
    methods: {
      // 判断是否存在子集
      hasChild (obj, key = 'children') {
        return obj[key] && Array.isArray(obj[key]) && obj[key].length
      },
      init () {
        this.menuList = this.getMenu(this.$router.options.routes)
      },
      getMenu (routes) {
        let newRoutes = this.utils.arrDeepCopy(routes)
        return newRoutes.filter(route => {
          if (route.meta && route.meta.showMenu && route.meta.showMenu === true) {
            return route
          }
        })
          .map(route => {
            let menu = {
              name: route.name,
              url: route.path,
              icon: route.meta.icon
            }
            if (route.children && route.children.length > 0) {
              menu.children = this.getMenu(route.children)
            }
            return menu
          })
      },
      reset () {
        console.log('重置主页为active')
      }
    }
  }
</script>

<style lang="scss" scoped>
  .menu{
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
