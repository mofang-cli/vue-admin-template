<template>
  <div class="theme-picker-dialog" v-show="visible">
    <div class="title">
      <span>换肤</span>
      <i class="iconfont icon-ic-delete1" @click="beforeClose"></i>
    </div>
    <div class="colors">
        <span
          v-for="color in themeArr"
          :style="`background: ${color}`"
          class=""
          @click="checkColor(color)"
        >
          <i v-if="color === theme" class="iconfont icon-ic-correct"></i>
        </span>
    </div>
  </div>
</template>

<script>
  const ORIGINAL_THEME = '#409EFF'
  import themeChalk from './themeElementUi'
  export default {
    props: {
      visible: Boolean,
      beforeClose: Function
    },
    mounted () {
      let theme = localStorage.getItem('cvf_theme')
      if (theme && theme.indexOf('#') > -1) {
        this.theme = theme
        this.changeSkin(this.theme)
      } else {
        this.requests.user.GET_THEME_COLOR()
          .then(res => {
            if (res.result && res.result.themeColor) {
              this.theme = res.result.themeColor
              this.changeSkin(this.theme)
            } else {
              this.theme = this.themeArr[0]
              this.changeSkin(this.theme)
            }
          })
      }
    },
    data () {
      return {
        chalk: themeChalk,
        theme: '',
        themeArr: ['#2D74E7', '#FF8706', '#768AF5', '#01C5ED', '#222222']
      }
    },
    methods: {
      checkColor (color) {
        this.theme = color
        this.requests.user.SET_THEME_COLOR({themeColor: this.theme})
          .then(res => {
            if (res.result && res.result.length > 0) {
              this.theme = color
              this.changeSkin(this.theme)
              this.beforeClose()
            } else {
              this.$message.warning('主题色切换失败')
              this.beforeClose()
            }
          })
          .catch(() => {
            this.$message.warning('主题色切换失败')
            this.beforeClose()
          })
      },
      changeSkin (theme) {
        localStorage.setItem('cvf_theme', theme)
        this.changeElementUiTheme(theme)
        this.changeCustomCss(theme)
        this.changeKMediaTheme(theme)
      },
      // element-ui样式覆盖
      changeElementUiTheme (theme) {
        if (theme === '#222222') {
          theme = '#FCA802'
        }
        const oldVal = this.chalk ? theme : ORIGINAL_THEME
        if (typeof theme !== 'string') return
        const themeCluster = this.getThemeCluster(theme.replace('#', ''))

        const getHandler = (variable, id) => {
          return () => {
            const originalCluster = this.getThemeCluster(ORIGINAL_THEME.replace('#', ''))
            const newStyle = this.updateStyle(this[variable], originalCluster, themeCluster)

            let styleTag = document.getElementById(id)
            if (!styleTag) {
              styleTag = document.createElement('style')
              styleTag.setAttribute('id', id)
              document.head.appendChild(styleTag)
            }
            styleTag.innerText = newStyle
          }
        }

        const chalkHandler = getHandler('chalk', 'chalk-style')
        // chalk-style添加、修改完成
        chalkHandler()
        // 将已经引入的element variables style中的颜色变量修改
        const styles = [].slice.call(document.querySelectorAll('style'))
          .filter(style => {
            const text = style.innerText
            return new RegExp(oldVal, 'i').test(text) && !/Chalk Variables/.test(text)
          })
        const originalCluster = this.getThemeCluster(oldVal.replace('#', ''))
        styles.forEach(style => {
          const { innerText } = style
          if (typeof innerText !== 'string') return
          style.innerText = this.updateStyle(innerText, originalCluster, themeCluster)
        })
      },
      // 自定义样式主题覆盖
      changeCustomCss (theme) {
        if (theme === '#222222') {
          theme = '#FCA802'
        }
        document.body.classList = []
        document.body.classList.add(`theme-${theme.split('#')[1]}`)
      },
      // 流媒体播放器主题覆盖
      changeKMediaTheme (theme) {
        if (theme === '#222222') {
          theme = '#FCA802'
        }
        let styleTag = document.getElementById('player-style')
        if (!styleTag) {
          styleTag = document.createElement('style')
          styleTag.setAttribute('id', 'player-style')
          document.head.appendChild(styleTag)
        }
        styleTag.innerText = `
          .km-app-container {
            --km-themeColor: ${theme} !important;
          }`
      },
      updateStyle (style, oldCluster, newCluster) {
        let newStyle = style
        oldCluster.forEach((color, index) => {
          newStyle = newStyle.replace(new RegExp(color, 'ig'), newCluster[index])
        })
        return newStyle
      },
      getThemeCluster (theme) {
        const tintColor = (color, tint) => {
          let red = parseInt(color.slice(0, 2), 16)
          let green = parseInt(color.slice(2, 4), 16)
          let blue = parseInt(color.slice(4, 6), 16)

          if (tint === 0) { // when primary color is in its rgb space
            return [red, green, blue].join(',')
          } else {
            red += Math.round(tint * (255 - red))
            green += Math.round(tint * (255 - green))
            blue += Math.round(tint * (255 - blue))

            red = red.toString(16)
            green = green.toString(16)
            blue = blue.toString(16)

            return `#${red}${green}${blue}`
          }
        }

        const shadeColor = (color, shade) => {
          let red = parseInt(color.slice(0, 2), 16)
          let green = parseInt(color.slice(2, 4), 16)
          let blue = parseInt(color.slice(4, 6), 16)

          red = Math.round((1 - shade) * red)
          green = Math.round((1 - shade) * green)
          blue = Math.round((1 - shade) * blue)

          red = red.toString(16)
          green = green.toString(16)
          blue = blue.toString(16)

          return `#${red}${green}${blue}`
        }

        const clusters = [theme]
        for (let i = 0; i <= 9; i++) {
          clusters.push(tintColor(theme, Number((i / 10).toFixed(2))))
        }
        clusters.push(shadeColor(theme, 0.1))
        return clusters
      }
    }
  }
</script>

<style scoped lang="scss">
  .theme-picker-dialog {
    position: absolute;
    width: 342px;
    height: 112px;
    z-index: 10;
    right: 0;
    top: 75px;
    margin-left: -50px;
    background: #fff;
    box-shadow: 0 2px 4px 0 rgba(0,0,0,0.20);
    border-radius: 4px;
    &:after{
      content: " ";
      display: block;
      position: absolute;
      width: 0;
      height: 0;
      border: 8px solid #0000;
      border-bottom: 8px solid #fff;
      top: -16px;
      left: 90%;
      transform: translate(-50%);
    }
    .title {
      height: 40px;
      width: calc(100% - 35px);
      background: #FBFBFB;
      border-bottom: 1px solid #E7EAF2;
      border-top-left-radius: 4px;
      border-top-right-radius: 4px;
      padding: 0 15px 0 20px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      span {
        font-family: PingFangSC-Medium;
        font-size: 14px;
        color: #333333;
        letter-spacing: 0;
        text-align: center;
      }
      .iconfont {
        color: #979797;
      }
    }
    .colors {
      height: 70px;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      span {
        height: 20px;
        width: 20px;
        border-radius: 2px;
        margin-left: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        .iconfont {
          font-size: 16px;
          color: #FFF;
        }
      }
    }
  }
</style>
