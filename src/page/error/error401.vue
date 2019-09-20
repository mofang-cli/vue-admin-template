<template>
  <div class="box">
  <div class="error-wrapper">
    <img :src="imgSrc"/>
    <h3>{{copywriter}}</h3>
    <p>{{ $t('TO_LOGIN_PAGE',[time]) }}</p>
  </div>
  </div>
</template>
<script>
  import imgSrc401 from '@/assets/images/error/pic_01_401.png'

  export default {
    name: 'error401',
    data () {
      return {
        time: 3,
        id: '',
        imgSrc: imgSrc401,
        copywriter: this.$t('SESSION_TIMEOUT')
      }
    },
    created () {
      this.id = this.$route.params.id
    },
    mounted () {
      this.timer = setInterval(this.countDown.bind(this), 1000)
    },
    methods: {
      countDown () {
        if (this.time === 0) {
          clearInterval(this.timer)
          sessionStorage.clear()
          localStorage.clear()
          window.location.href = this.g_Config.AJAX_BASE_URL + '/auth/logout'
        } else {
          this.time -= 1
        }
      }
    }
  }
</script>
<style scoped lang="scss">
  .error-wrapper{
    padding: 50px 0 50px;
    display: block;
    text-align: center;
    img{
      padding-left: 50px;
      width: 1039px;
      height: 303px;
    }
    h3{
      margin: 14px auto 50px;
      font-size: 18px;
      color: #467BB7;
    }
  }
</style>
