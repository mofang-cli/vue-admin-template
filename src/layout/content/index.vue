<template>
  <div class="container">
    <div class="content-wrapper">
      <Breadcrumb></Breadcrumb>
      <div class="contentdiv">
        <router-view></router-view>
      </div>
      <div class="footer-view">
        <span>底部</span>
      </div>
    </div>
  </div>
</template>
<script>
  import Breadcrumb from '@/components/Breadcrumb'
  export default {
    name: 'contentdiv',
    components: {
      Breadcrumb,
    },
    data () {
      return {}
    },
    created () {
    },
    mounted () {
    },
    watch: {},
    computed: {},
    methods: {}
  }
</script>
