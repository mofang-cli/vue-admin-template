<template>
  <el-dialog :before-close="closeThisDialog" custom-class="image-preview-dialog" :visible.sync="visible"
             :fullscreen="isFullScreen" width="680px">
    <div slot="title" class="image-preview-title">
      <span>{{$t('PREVIEW_IMAGE')}}</span>
      <span>
        <i v-if="bindVideo" class="icon iconfont icon-ic-livevideo" @click="showVideo" :title="$t('RELATED_VIDEO')"></i>
        <i class="icon iconfont icon-ic-loading" @click="downImage" :title="$t('DOWN_IMAGE')"></i>
        <i v-if="isFullScreen" class="icon iconfont icon-ic-smallscreen" @click="changeFullScreen"></i>
        <i v-else class="icon iconfont icon-ic-fullscreen" @click="changeFullScreen"
           :title="$t('CLOUDVIDEOINDEX.full_screen')"></i>
        <i class="icon iconfont icon-ic-delete1" @click="closeThisDialog"></i>
      </span>
    </div>
    <div style="height: 100%">
      <el-carousel
        id="image-carousel"
        arrow="always"
        indicator-position="none"
        :autoplay="false"
        :loop="false"
        :initial-index="defaultIndex"
        v-if="visible"
        :height="carouselHeight"
        @change="imageChange"
      >
        <el-carousel-item v-for="(image, index) in images" :key="index">
          <img :src="image.url" class="image"/>
        </el-carousel-item>
      </el-carousel>
    </div>
  </el-dialog>
</template>

<script>
  export default {
    props: {
      defaultIndex: 0,
      visible: {
        type: Boolean,
        default: false
      },
      beforeClose: Function,
      images: Array,
      bindVideo: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        isFullScreen: false,
        carouselHeight: '350px',
        imageName: '',
        nowUrl: '',
        nowId: '' // 查看图片对应视频用
      }
    },
    watch: {
      images (newValue, oldValue) {
        this.nowId = this.images[this.defaultIndex].id
        this.nowUrl = this.images[this.defaultIndex].url
        this.imageName = this.utils().getFileNameFromUrl(newValue[this.defaultIndex].url)
      }
    },
    methods: {
      closeThisDialog () {
        this.beforeClose()
        if (this.isFullScreen) {
          this.changeFullScreen()
        }
      },
      changeFullScreen () {
        this.isFullScreen = !this.isFullScreen
        if (this.isFullScreen) {
          this.carouselHeight = window.screen.height - 196 + 'px'
        } else {
          this.carouselHeight = '350px'
        }
      },
      imageChange (index) {
        this.nowId = this.images[index].id
        this.nowUrl = this.images[index].url
        this.imageName = this.utils().getFileNameFromUrl(this.images[index].url)
      },
      downImage () {
        this.utils().downloadFile(this.nowUrl, this.nowUrl)
        this.requests.ADD_DOWNLOAD_LOG({
          url: this.nowUrl,
          module: this.$t('MENU_HOME'),
          action: this.$t('DOWN_IMAGE')
        })
      },
      showVideo () {
        this.$emit('carImgClickSearchVideo', {id: this.nowId})
      }
    }
  }
</script>
<style lang="scss">
  .image-preview-dialog .el-dialog__header .el-dialog__headerbtn {
    display: none;
  }

  .image-preview-dialog, .image-preview-dialog-full-screen {
    .image-preview-title {
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid #E9EAED;
      span {
        height: 44px;
        line-height: 44px;
        padding-left: 20px;
        font-family: PingFangSC-Medium;
        font-size: 16px;
        color: #333333;
      }
      .iconfont {
        font-size: 18px;
        color: #979797;
        margin-right: 10px;
        cursor: pointer;
        padding: 4px;
      }
      .icon-ic-delete1 {
        margin-right: 20px;
        &:hover {
          margin-right: 20px;
          color: #FFFFFF;
          background-color: #FB4747;
          padding: 4px;
          border-radius: 4px;
        }
      }
    }
    .image {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }

    .el-carousel__container {
      position: relative;
      /*height: -webkit-fill-available;*/
    }
  }

  .image-preview-dialog-full-screen {
    width: 100%;
  }
</style>
