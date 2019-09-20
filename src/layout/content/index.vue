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

<style lang="scss" scoped>
  .container {
    display:flex;
    width:100%;
    height: 100%;
    /*height:calc(100% - 64px);*/
    font-size:0.8rem;
    .sidebar {
      width:150px;
      height:700px;
      background-color:#3F3F3F;
      background-size:100%;
      display: none;
    }
    .content-wrapper {
      width: 100%;
      /*margin:0 14px;*/
      height:100%;
      .contentdiv {
        margin: 0 15px 0;
        background:#ffffff;
        box-shadow:0 0 2px 2px rgba(0,0,0,0.05);
        border-radius:4px;
        overflow: hidden;
        /*height:100%;*/
        min-height:calc(100% - 144px);
      }
      .breadcrumb {
        height: 20px;
        font-family: PingFangSC-Medium;
        padding:8px 0px 8px 20px;
        color:#999;
        li {
          float:left
        }
        .el-breadcrumb /deep/ .el-breadcrumb__item:last-child .el-breadcrumb__separator {
          display:none
        }
        .icon {
          color: #b9b9b9;
          font-size: 14px;
          margin-right: 6px;
        }
        .breadcrumb-list {
          .breadcrumb-item {
            font-size: 12px;
            color:  #9DA5A9;
            letter-spacing: -0.15px;
            line-height: 17px;
            cursor:pointer;
          }
          .breadcrumb-active {
            color: #1D66DC;
            cursor: default;
            pointer-events: none;
          }
          .bread-active {
            color: #151515;
          }
          .split {
            color:  #9DA5A9;
            font-size: 12px;
            padding: 0 5px;
          }
        }
        .breadcrumb-list:first-child {
          cursor:default;
          pointer-events:none;
        }
      }
      .footer-view {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 40px;
        span{
          font-family: PingFangSC-Medium;
          font-size: 12px;
          color: #AAAAAA;
          letter-spacing: -0.15px;
        }
      }
    }
  }
</style>
