<template>
  <div class="container">
    <div class="content-wrapper">
      <div class="breadcrumb">
        面包屑
      </div>
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
export default {
  name: 'contentdiv',
  data () {
    return {
    }
  },
  created () {
  },
  mounted () {
  },
  watch: {
  },
  computed: {
  },
  methods: {
  }
}
</script>
