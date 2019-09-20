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
        menuList: []
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
