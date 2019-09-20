<template>
  <div class="errorBg">
    <div class="error-wrapper">
      <img :src="imgSrc"/>
      <h3>{{copywriter}}</h3>
    </div>
  </div>
</template>
<script>
  import imgSrc500 from '@/assets/pic_01_500.png'

  export default {
    name: 'error500',
    data () {
      return {
        id: '',
        imgSrc: imgSrc500,
        copywriter: this.$t('SERVER_500')
      }
    },
    created () {
      this.id = this.$route.params.id
    }
  }
</script>
<style scoped lang="scss">
  .errorBg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #fff;
    z-index: 100;
  }

  .error-wrapper {
    padding: 126px 0 50px;
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
    .el-button {
      background: #467BB7;
    }
  }
</style>
