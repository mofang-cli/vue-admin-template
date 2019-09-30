<template>
  <div class="image-upload-wrapper">
    <input type="file" ref="filesSelect" @change="filesSelected" style="display:none"
           accept="image/png, image/jpg, image/jpeg"/>
    <div v-if="fileList.length > 0" class="el-upload-list el-upload-list--picture-card">
      <div v-for="(file, index) in fileList" :tabindex="index" class="el-upload-list__item is-success">
        <img :src="file.url" alt="" class="el-upload-list__item-thumbnail">
        <a class="el-upload-list__item-name">
          <i class="el-icon-document"></i>
        </a>
        <label class="el-upload-list__item-status-label">
          <i class="el-icon-upload-success el-icon-check"></i>
        </label>
        <i class="el-icon-close"></i>
        <i class="el-icon-close-tip">{{$t('TAP_DELETEBTN_CAN_DELETE')}}</i><!---->
        <span class="el-upload-list__item-actions">
          <span class="el-upload-list__item-preview">
            <i class="el-icon-zoom-in" @click="onPreview(file)"></i>
          </span>
          <span class="el-upload-list__item-delete">
            <i class="el-icon-delete" @click="onRemove(file)"></i>
          </span>
        </span>
      </div>
    </div>
    <div :id="label" v-if="fileList.length < limit" class="el-upload-list el-upload-list--picture-card">
      <div class="el-upload-list__item upload-btn" @click="handleClickUploadBtn">
        <div class="add">
          <i class="el-icon-plus avatar-uploader-icon" style="margin-left: 4px"></i>
          <span>{{$t('UPLOAD')}}</span>
        </div>
      </div>
    </div>
    <!--<div v-if="fileList.length < limit" class="upload-btn" @click="handleClickUploadBtn">-->
    <!--<i class="el-icon-plus avatar-uploader-icon"></i>-->
    <!--<span>上传</span>-->
    <!--</div>-->
    <span class="label" v-if="label">{{label}}</span>
  </div>
</template>

<script>
  import axios from 'axios'
  import utils from '@/common/lib/utils'

  export default {
    data () {
      return {
        image: ''
      }
    },
    props: {
      action: String,
      limit: Number,
      fileList: {
        type: Array
      },
      label: String,
      data: Object,
      beforeUpload: Function,
      onPreview: {
        type: Function
      },
      onRemove: {
        type: Function
      },
      onSuccess: {
        type: Function
      },
      onError: {
        type: Function
      },
      cropSize: {
        type: Object
      }
    },
    methods: {
      filesSelected () {
        let file = this.$refs.filesSelect.files[0]
        if (this.beforeUpload(file)) {
          this.upload(file)
        }
        this.$refs.filesSelect.value = null
      },
      handleClickUploadBtn () {
        this.$refs.filesSelect.click()
      },
      upload (file) {
        let formData = new FormData()
        if (this.data) {
          Object.keys(this.data).forEach(key => {
            formData.append(key, this.data[key])
          })
        }
        formData.append('file', file, 'img-' + utils.getUid() + '.png')
        let config = {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
        axios.post(this.action, formData, config)
          .then(res => {
            if (res.data && res.data.code == '0') {
              this.onSuccess(res.data, file)
            } else {
              this.onError(res.data.message)
            }
          }).catch(error => {
          this.onError(error)
        })
      }
    }
  }
</script>
<style lang="scss">
  .image-upload-wrapper {
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    margin-right: 20px;
    .el-upload-list {
      width: auto;
    }
    .el-upload-list__item {
      margin: 0
    }
    .upload-btn {
      background: #F0F4F8;
      border: 1px dashed #D9D9D9;
      border-radius: 6px;
      cursor: pointer;
      .add {
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-around;
        &:hover, &:focus {
          border-color: #409EFF;
          color: #409EFF;
        }
        .el-icon-plus {
          font-size: 23px;
          color: #999999;
        }
        span {
          font-size: 14px;
          color: #555555;
          text-align: center;
        }
      }
    }
    .label {
      font-size: 12px;
      color: #606266;
      letter-spacing: 0;
      text-align: center;
    }
  }
</style>
