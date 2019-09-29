<template>
  <div class="menu">
    <el-menu
      ref="menu"
      mode="horizontal"
      :default-active="route.fullPath"
      text-color="#fff"
      active-text-color="#fff"
      router
      unique-opened
    >
      <template v-for="(menu, index) in menuList">
        <el-submenu v-if="hasChild(menu)" :index="index + ''">
          <template slot="title">
            <i :class="`iconfont link-icon-${menu.sign}`"></i>
            {{menu.name}}
          </template>
          <el-menu-item v-for="(menu2,i) in menu.children" :index="menu2.url" :key="i">{{menu2.name}}</el-menu-item>
        </el-submenu>
        <el-menu-item v-else :index="menu.url">
          <i :class="`iconfont link-icon-${menu.sign}`"></i>
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
    },
    data () {
      return {
        menuList: [
          {
            'children': [
              {
                'fields': [],
                'icon': '',
                'id': '2c94cea865470fac016556907cc7004c',
                'level': 2,
                'method': '',
                'name': 'Page1',
                'parent': null,
                'parentId': '2c94cebe651e999701653677a4ff0031',
                'path': 'mmji-ixkm',
                'sign': 'RM_VIEW_RESOURCE',
                'sortIndex': 2,
                'type': '10',
                'url': '/viewResource'
              }
            ],
            'fields': [

            ],
            'icon': '',
            'id': '2c94cebe651e999701653677a4ff0031',
            'level': 1,
            'method': '',
            'name': 'Module1',
            'parent': null,
            'parentId': '',
            'path': 'mmji',
            'sign': 'RESOURCE',
            'sortIndex': 4,
            'type': '10',
            'url': ''
          }
        ]
      }
    },
    computed: {
      ...mapState({
        route: state => state.route
      })
    },
    watch: {
    },
    methods: {
      // 判断是否存在子集
      hasChild (obj, key = 'children') {
        return obj[key] && Array.isArray(obj[key]) && obj[key].length
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
    /* icon */
    .link-icon-INDEX:before,.link-icon-HOME:before {
      content: "\e86e";
    }
    .link-icon-MONITOR_EXAMINE:before {
      content: "\e870";
    }
    .link-icon-RESOURCE:before {
      content: "\e875";
    }
    .link-icon-DEVICE_MANAGE:before {
      content: "\e872";
    }
    .link-icon-SAFTY_AUDIT:before {
      content: "\f00f";
    }
    .link-icon-STATISTIC_ANALYSIS:before {
      content: "\e877";
    }
    .link-icon-SYSTEM_Mangage:before {
      content: "\f00e";
    }
    .link-icon-DIRECT_MANAGE:before {
      content: "\e871";
    }
  }
</style>
