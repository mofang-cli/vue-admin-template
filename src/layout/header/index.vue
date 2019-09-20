<template>
  <div class="header-wrapper">
    <div class="header">
      <logo @toHome="toHome" />
      <menuList ref="menuList"></menuList>
    </div>
    <theme-picker
      :visible="visibleChangeSkin"
      :before-close="closeChangeSkinDialog"
      width="500px"
    >
    </theme-picker>
  </div>
</template>

<script>
  import ThemePicker from '@/components/theme-picker'
  import menuList from './menuList'
  import logo from './logo'
  export default {
    name: 'headerdiv',
    components: {
      ThemePicker,
      logo,
      menuList
    },
    data () {
      return {
        visibleChangeSkin: false,
        user: {}
      }
    },
    created () {
      this.user = sessionStorage.getItem('cvf_user') ? JSON.parse(sessionStorage.getItem('cvf_user')) : {}
      // this.user.photo = '/login_page/queryPic/username/image/img-100a7009-2083-b5ba-56be-4a65905ec1d4.png'
    },
    methods: {
      openChangeSkinDialog () {
        this.visibleChangeSkin = true
      },
      closeChangeSkinDialog () {
        this.visibleChangeSkin = false
      },
      toHome () {
        this.$refs.menuList.reset()
      }
    }
  }
</script>
<style lang="scss">
  .header{
    min-width: 1280px;
    height: 64px;
    background-color: #0e4aaa;
    padding: 0 10px 0 0;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    z-index: 2001;
    .logo{
      a{
        color: #fff;
        font-size: 16px;
        img{
          height: 34px;
          margin-left: 24px;
        }
      }
    }
  }
</style>
