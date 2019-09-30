<template>
  <div class="box">

    <div class="error-wrapper">
      <img :src="imgSrc"/>
      <h3>{{copywriter}}</h3>
      <el-button type="primary" @click="toPrevPage">{{buttonText}}</el-button>
    </div>
  </div>
</template>
<script>
  import imgSrc404 from '@/assets/images/error/pic_01_404.png'
  // import { Message } from 'element-ui'

  export default {
    name: 'error404',
    data () {
      return {
        id: '',
        imgSrc: imgSrc404,
        copywriter: this.$t('NO_PAGE'),
        buttonText: this.$t('RETURN_INDEX')
      }
    },
    created () {
      this.id = this.$route.params.id
    },
    mounted () {
      let auths = sessionStorage.getItem('cvf_auth')
      if (auths.length === 0) {
        this.buttonText = this.$t('LOG_OUT_SYSTEM')
      }
    },
    methods: {
      toPrevPage () {
        if (this.buttonText === this.$t('LOG_OUT_SYSTEM')) {
          sessionStorage.clear()
          localStorage.clear()
          window.location.href = this.g_Config.AJAX_BASE_URL + '/auth/logout'
        } else {
          this.$router.push({path: sessionStorage.getItem('cvf_defaultRouter')})
        }
      }
    }
  }
</script>
<style scoped lang="scss">
  .error-wrapper {
    padding: 50px 0 50px;
    display: block;
    text-align: center;
    img {
      padding-left: 50px;
      width: 1039px;
      height: 303px;
    }
    h3 {
      margin: 14px auto 50px;
      font-size: 18px;
      color: #467BB7;
    }
  }
</style>
