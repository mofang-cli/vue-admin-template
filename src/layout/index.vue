<template>
    <div class="page-wrapper">
      <v-header></v-header>
      <v-body>
        <router-view></router-view>
      </v-body>
      <v-footer></v-footer>
      <component></component>
    </div>
</template>

<script>
  import header from './header'
  import content from './content'
  import footer from './footer'
  export default {
    name: 'index',
    components: {
      vHeader: header,
      vBody: content,
      vFooter: footer
    },
    created () {
    }
  }
</script>

<style lang="scss" scoped>
  #template {
      font-size: 14px;
  }
</style>
