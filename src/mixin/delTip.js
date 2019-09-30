// 删除提示通用方法
export const delTip = {
  data() {
    return {}
  },
  methods: {
    /**
     *  fn 删除的方法 必须是一个promise 必填
     *  param 删除的参数 必填
     *  title 删除框的标题 非必填 默认 删除
     *  message 提示信息 非必填 默认 你确定要将此设备立即删除吗？
     * */
    commonDel(fn, param, title, message) {
      if (!fn) return
      title = title || this.$t('DELETE')
      message = message || this.$t('SURE_DELETE')
      this.$confirm(message, title, {
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: this.$t('CONTINUE'),
        // cancelButtonText: this.$t('CANCEL'),
        beforeClose: (action, instance, done) => {
          if (action === 'confirm') {
            instance.confirmButtonLoading = true
            instance.confirmButtonText = this.$t('EXECUTEING')
            fn(param)
              .then(() => {
                instance.confirmButtonLoading = false
                instance.confirmButtonText = this.$t('CONTINUE')
                done()
              })
              .catch(err => {
                console.error(err)
                instance.confirmButtonLoading = false
                instance.confirmButtonText = this.$t('CONTINUE')
              })
          } else {
            done()
          }
        },
      })
        .then(() => {})
        .catch(() => {})
    },
  },
}
