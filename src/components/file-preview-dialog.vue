<template>
  <el-dialog
    custom-class="file-preview-dialog"
    :before-close="closeThisDialog"
    @open="dialogOpen"
    @close="dialogClose"
    :visible.sync="visible"
    :fullscreen="isFullScreen"
    width="800px"
  >
    <div slot="title" class="file-preview-title">
      <span>{{ $t('PREVIEW_FILE') }}</span>
      <span>
        <i v-if="isFullScreen" class="icon iconfont icon-ic-smallscreen" @click="changeFullScreen"></i>
        <i v-else class="icon iconfont icon-ic-fullscreen" @click="changeFullScreen"></i>
        <i class="icon iconfont icon-ic-delete1" @click="closeThisDialog"></i>
      </span>
    </div>
    <div style="height: 100%">
      <el-carousel
        arrow="always"
        indicator-position="none"
        :autoplay="false"
        :loop="false"
        :initial-index="defaultIndex"
        v-if="visible"
        :height="carouselHeight"
        @change="fileChange"
      >
        <el-carousel-item v-for="(file, index) in files" :key="index">
          <codemirror ref="cm" v-model="fileStrs[index]" :options="cmOption"></codemirror>
        </el-carousel-item>
      </el-carousel>
    </div>
  </el-dialog>
</template>

<script>
  import axios from 'axios'
  import {codemirror} from 'vue-codemirror'
  import 'codemirror/lib/codemirror.css'
  import 'codemirror/mode/xml/xml.js'
  import 'codemirror/addon/selection/active-line.js'
  import 'codemirror/addon/edit/closetag.js'

  export default {
    components: {
      codemirror
    },
    props: {
      defaultIndex: 0,
      visible: {
        type: Boolean,
        default: false
      },
      title: String,
      beforeClose: Function,
      files: Array
    },
    data () {
      return {
        isFullScreen: false,
        carouselHeight: '500px',
        fileStrs: [],
        cmOption: {
          tabSize: 4,
          readOnly: true,
          styleActiveLine: true,
          lineNumbers: true,
          autoCloseTags: true,
          line: true,
          mode: 'text/yaml',
          width: '100%',
          height: '100%'
        },
        fileName: ''
      }
    },
    watch: {
      files (newValue, oldValue) {
        this.fileName = this.utils().getFileNameFromUrl(newValue[this.defaultIndex].title)
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
          this.files.forEach((file, index) => {
            document.getElementsByClassName('CodeMirror')[index].style.height = this.carouselHeight
          })
        } else {
          this.carouselHeight = '500px'
        }
      },
      dialogOpen () {
        this.files.forEach((file, index) => {
          axios.get(file.url)
            .then(res => {
              if (res.data) {
                this.$set(this.fileStrs, index, res.data)
                document.getElementsByClassName('CodeMirror')[index].style.height = '500px'
              } else {
                this.$set(this.fileStrs, index, '')
              }
            })
            .catch(error => {
              console.log(error)
              this.$set(this.fileStrs, index, '')
              document.getElementsByClassName('CodeMirror')[index].style.height = '500px'
            })
        })
      },
      dialogClose () {
        this.fileStrs = []
      },
      fileChange (index) {
        this.fileName = this.utils().getFileNameFromUrl(this.files[index].title)
      }
    }
  }
</script>
<style lang="scss">
  .file-preview-dialog .el-dialog__header .el-dialog__headerbtn {
    display: none;
  }

  .file-preview-dialog, .file-preview-dialog-full-screen {
    .file-preview-title {
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
        padding-right: 20px;
        cursor: pointer;
      }
    }

    .el-carousel__container {
      position: relative;
      /*height: -webkit-fill-available;*/
    }
  }

  .file-preview-dialog-full-screen {
    width: 100%;
  }

  .CodeMirror-linenumber {
    font-size: 16px;
  }

  .CodeMirror pre {
    line-height: 16px;
    font-size: 16px;
    span {
      font-size: 16px;
    }
  }
</style>
