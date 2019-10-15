<template>
  <el-breadcrumb class="app-breadcrumb" separator="/">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item v-for="(item,index)  in levelList" :key="item.path" v-if='item.name'>
        <span
          v-if='index === levelList.length - 1 || item.meta.breadcrumb === false'
          class="no-redirect"
        >
          {{item.name}}
        </span>
        <router-link
          v-else
          :to="item.redirect || item.path"
          class="redirect"
        >
          {{item.name}}
        </router-link>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script>
  export default {
    created () {
      this.getBreadcrumb()
    },
    data () {
      return {
        levelList: null
      }
    },
    watch: {
      $route () {
        this.getBreadcrumb()
      }
    },
    methods: {
      getBreadcrumb () {
        let matched = this.$route.matched.filter(item => item.name)
        this.levelList = matched
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
  .app-breadcrumb{
    height: 36px;
    display: flex;
    align-items: center;
    margin-left: 20px;
  }
</style>
