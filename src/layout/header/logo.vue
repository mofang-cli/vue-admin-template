<template>
  <div class="logo">
    <router-link to="/">
      <img @click="toHome" :src="logoSrc">
    </router-link>
  </div>
</template>

<script>
  import logoSrc from '@/assets/images/logo.png'
  export default {
    name: 'logo',
    data () {
      return {
        logoSrc
      }
    },
    created () {
      this.getLogo()
    },
    methods: {
      getLogo () {
      },
      toHome () {
        this.$emit('toHome')
      }
    }
  }
</script>
