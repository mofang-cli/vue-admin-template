<template>
  <div class="form-wrap" :id="searchBarId">
    <el-form :inline="true" :model="listQuery" size="small" class="clearfix">
      <template v-for="(v, i) in searchOptions">
        <slot :name="'prefix' + (i + 1)"></slot>
        <!--日期搜索框-->
        <el-form-item v-if="v.type === 'date' && v.show" :key="i" :label="v.label">
          <el-date-picker
            v-model="listQuery[v.value]"
            :clearable="v.clearable"
            range-separator="-"
            type="datetimerange"
            :editable="false"
            :value-format="v.format || 'yyyy-MM-dd HH:mm:ss'"
            :format="v.showFormat || 'yyyy-MM-dd HH:mm:ss'"
            :picker-options="utils().pickerOptions(v.format || 'yyyy-MM-dd HH:mm:ss')"
            :start-placeholder="$t('SELECT_START_TIME')"
            :end-placeholder="$t('SELECT_END_TIME')"
            :default-time="v.defaultTime || defaultTime"
            :disabled="v.disabled"
            @change="timeCheck(listQuery[v.value], v.value, v.change)"
          ></el-date-picker>
        </el-form-item>
        <!--单一的日期搜索框-->
        <el-form-item v-if="v.type === 'dateOne' && v.show" :key="i" :label="v.label">
          <el-date-picker
            v-model="listQuery[v.value]"
            :clearable="v.clearable"
            type="datetime"
            :editable="false"
            :value-format="v.format || 'yyyy-MM-dd HH:mm:ss'"
            :format="v.showFormat || 'yyyy-MM-dd HH:mm:ss'"
            :placeholder="v.placeHoder || $t('PLEASE_SELECT') + v.label"
            :picker-options="pickerOptions"
            :disabled="v.disabled"
            @change="handleChange()">
          </el-date-picker>
        </el-form-item>
        <!--日期搜索框-->
        <el-form-item v-if="v.type === 'daterange' && v.show" :key="i" :label="v.label">
          <el-date-picker
            v-model="listQuery[v.value]"
            :clearable="v.clearable"
            type="daterange"
            range-separator="-"
            :start-placeholder="$t('SELECT_START_TIME')"
            :end-placeholder="$t('SELECT_END_TIME')"
            :picker-options="utils().pickerOptions('yyyy-MM-dd')">
          </el-date-picker>
        </el-form-item>
        <!--输入框-->
        <el-form-item v-if="v.type === 'input' && v.show" :key="i" :label="v.label">
          <el-input
            v-model="listQuery[v.value]"
            :placeholder="v.placeHoder || $t('PLEASE_INPUT') + v.label"
            @change="handleChange()"
            @keydown.space.native='disabledSpace($event)'
            :clearable="v.clearable"
            :disabled="v.disabled"
          ></el-input>
        </el-form-item>
        <!--下拉框-->
        <el-form-item v-if="v.type === 'select' && v.show" :key="i" :label="v.label">
          <el-select
            v-model="listQuery[v.value]"
            :placeholder="v.placeHoder || $t('PLEASE_SELECT') + v.label"
            @change="handleChange()"
            :filterable="v.filter"
            :disabled="v.disabled"
            :clearable="v.clearable">
            <el-option
              v-for="(item,index) in v.option"
              :key="index"
              :label="item[v.name || 'name']"
              :value="item[v.code || 'code']">
            </el-option>
          </el-select>
        </el-form-item>
        <!--可搜索下拉框-->
        <el-form-item v-if="v.type === 'remote' && v.show" :key="i" :label="v.label">
          <el-select
            v-model="listQuery[v.value]"
            :placeholder="v.placeHoder || $t('PLEASE_INPUT') + v.label"
            @change="handleChange()"
            filterable
            remote
            :remote-method="v.method"
            :clearable="v.clearable"
            :disabled="v.disabled"
            :loading="v.loading">
            <el-option
              v-for="(item,index) in v.option"
              :key="index"
              :label="item[v.name || 'name']"
              :value="item[v.code || 'code']">
            </el-option>
          </el-select>
        </el-form-item>
        <slot :name="'suffix' + (i + 1)"></slot>
      </template>
      <el-form-item style="float: right" class="last">
        <div style="float: right;">
          <el-button type="primary"  @click="search()">
            <i class="icon iconfont icon-ic-search"></i>
            {{$t('SEARCH')}}
          </el-button>
          <el-button @click="reset" >{{$t('RESET')}}</el-button>
          <slot name="button"></slot>
          <el-button @click="showSeniorSearch" class="senior-search" v-show="searchOptions.length + slots > key">
            {{$t('SENIORSEARCH')}}
            <i class="el-icon-arrow-down" :class="{up: seniorSearch, down: !seniorSearch}"></i>
          </el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>


<script>
  /**
   *  searchOptions说明：
   *  type 搜索框类型 input 输入框  date 日期  select 下拉框 remote 远程搜索 dept 部门搜索组件 dateOne 单一的日期选择
   *  label 搜索框名称
   *  value 搜索的字段名
   *  placeHoder 无输入时的默认值, 不传的话，选择框的默认值为 请选择 + label值 输入框的默认值为 请输入 + label值
   *  defaultValue 搜索框和重置的默认值，不传默认空字符串
   *    ****可选配置****
   *  name 下拉框绑定的label字段名 默认 name（type 为 remote 或者select  必须配置）
   *  code 下拉框绑定的value字段名 默认 code（type 为 remote 或者select  必须配置）
   *  option 下拉框选项 如果配置了 就不回去通过字典 或 接口 去请求下拉框数据
   *  param 下拉框搜索的参数 如果参数对象 需要配置valKey valKey为搜索参数的key值 （type 为 remote 或者select  必须配置） 如果不需要传参 把param设置为空对象, param 为空或不传值 必须把下拉内容传入option字段里
   *  filter 下拉框是否可以搜索 （type 为 select 配置有效）
   *  api 远程搜索 api 接口名称  因为用dispatch触发 所以必须配置在store的actions里  （type 为 remote 配置有效）
   *  format type 为date 或 dateOne时 绑定的日期格式 默认为 yyyy-MM-dd HH:mm:ss
   *  showFormat  type 为date 或 dateOne时 显示的日期格式 默认为 yyyy-MM-dd HH:mm:ss
   *  clearable 是否可以清空 （type 为 date dept 配置无效）
   *  needAll 不配置和配置false以外的任何值为添加全部属性 如果不需要设置为false
   *  handleData 是个方法 处理远程获得的数据 必须有返回值
   *  path 如果部门需要path 值 把path 值对应的字段传进来
   *  defaultTime type 为 dept的时候配置有效 日期的默认时间
   *  reset 重置的时候 对外的方法事件
   *  show 该搜索项显示, 默认为true，可不传
   * */
  /**
   *  可以用v-model 绑定个对象来对里面的搜索参数实现双向绑定
   * */
  /**
   *    示例
   *    searchOptions: [
   *      { type: 'dept', label: '部门', value: 'carcode', clearable: true, placeHoder: '请输入部门', defaultValue: '' },
   *      { type: 'police', value: 'personCode', label: '部门' },
   *      { type: 'date', label: '日期', value: 'carcode0', placeHoder: '请输入a', defaultValue: [] },
   *      { type: 'input', label: '输入框', value: 'carcode1', clearable: true, placeHoder: '请输入a', defaultValue: '', change: true },
   *      { type: 'select', label: '下拉框', value: 'carcode2', clearable: false, placeHoder: '请输入s', defaultValue: '', param: 'vehicle_nvr_type' },
   *      { type: 'remote', label: '远程搜索下拉框', value: 'carcode3', clearable: false, placeHoder: '请输入d', defaultValue: '', api: 'getCarNvrList', param: {valKey: 'f_like_carCode'}, name: 'carCode', code: 'carCode', handleData: this.handleData }
   *   ],
   * */
  /**
   *  slot： prefix + ‘i’ 插到第几个前面， suffix + ‘i’ 插到第几个后面， button 插入按钮
   * */
  export default {
    name: 'searchBar',
    components: {
    },
    props: {
      searchOptions: {
        type: Array,
        default: () => []
      },
      path: {
        default: ''
      },
      value: {
        type: Object,
        default: () => { return {} }
      }
    },
    created () {
      this.getSelectOptions()
    },
    mounted () {
      if (this.clientWidth < 1440) this.key = 2
      this.handleShowHide()
      window.addEventListener('resize', this.handleResize)
    },
    beforeDestroy () {
      if (this.resizeTimer) clearTimeout(this.resizeTimer)
      window.removeEventListener('resize', this.handleResize)
    },
    watch: {
      /**
       *  计算 如果搜索框 数据变了 重新计算并渲染
       *  因为 loading 赋值 methods options 等方法都会触发watch 所以 用type和value 值对比 来确定 搜索框 是否变化
       * */
      searchOptions (New, Old) {
        let NewType = New.map(v => v.type).toString()
        let NewValue = New.map(v => v.value).toString()
        let OldType = Old.map(v => v.type).toString()
        let OldValue = Old.map(v => v.value).toString()
        if ((NewType + NewValue) !== (OldType + OldValue)) {
          this.getSelectOptions(New)
        }
      },
      value: {
        handler (val) {
          this.handleModel(val)
        },
        deep: true
      },
      bigClient (val) {
        if (val) {
          this.key = this.key + 1
        } else {
          this.key = this.key - 1
        }
        if (!this.seniorSearch) this.handleShowHide()
      }
    },
    computed: {
      bigClient () {
        return this.clientWidth > 1439
      },
      slots () {
        return Object.keys(this.$slots).length
      }
    },
    data () {
      return {
        listQuery: {},
        defaultTime: ['00:00:00', '23:59:59'],
        dictionarys: [], // 存放需要请求的字段值
        seniorSearch: false, // 是否高级搜索
        key: 3, // 缩起的时候显示的个数
        clientWidth: document.documentElement.clientWidth, // 屏幕宽度
        resizeTimer: undefined,
        searchBarId: this.utils().randomString(),
        pickerOptions: {
          disabledDate (date) {
            return date.getTime() > Date.now()
          }
        },
        // 缓存数据字典请求值，供外部list解析使用
        dictionaryList: {},
        inputDefaultOptions: {
          clearable: true
        },
        remoteDefaultOptions: {
          clearable: true
        },
        selectDefaultOptions: {
          clearable: false
        },
        dateDefaultOptions: {
          clearable: false
        },
        daterangeDefaultOptions: {
          clearable: false
        }
      }
    },
    methods: {
      // 显示隐藏高级搜索
      showSeniorSearch () {
        this.seniorSearch = !this.seniorSearch
        this.handleShowHide()
      },
      // 处理显示隐藏高级搜索
      handleShowHide () {
        let arr = Array.from(this.$el.querySelectorAll('.el-form-item'))
        arr.pop()
        arr.forEach((el, index) => {
          el.style.display = ''
          if (index > (this.key - 1) && !this.seniorSearch) {
            el.style.display = 'none'
          }
        })
      },
      // 监听屏幕大小
      handleResize () {
        if (this.resizeTimer) clearTimeout(this.resizeTimer)
        this.resizeTimer = setTimeout(() => {
          this.clientWidth = document.documentElement.clientWidth
        }, 50)
      },
      // 获取搜索的下拉框内容 远程搜索methods 整理
      getSelectOptions (searchOptions) {
        this.dictionarys = []
        let obj = {}
        let self = this
        searchOptions = searchOptions || self.searchOptions
        // searchOptions = this.mergeDefaultOption(searchOptions)
        let key = 'option'
        this.mergeDefaultOption(searchOptions)
          .forEach(item => {
            if (item.show === undefined) {
              self.$set(item, 'show', true)
            } else if (item.show && typeof item.show === 'function') {
              self.$set(item, 'show', item.show())
            }
            if ((item.type === 'select' || item.type === 'remote') && item.param) {
              self.$set(item, key, [])
              if (item.type === 'select') {
                this.dictionarys.push(item.param)
              }
              if (item.type === 'remote') {
                item.method = function (val) {
                  this.$set(item, 'loading', true)
                  let param = self.handleParma(item.param, val)
                  self.$store.dispatch(item.api, param).then(res => {
                    item.loading = false
                    if (!res.data) return
                    let data = res.data
                    if (typeof item.handleData === 'function') {
                      let fn = item.handleData
                      data = fn(data) || data
                    }
                    self.$set(item, key, data)
                  }).catch(err => {
                    item.loading = false
                    console.error(err)
                    self.$set(item, key, [])
                  })
                }
              }
            }
          })
        this.requestDic(searchOptions, key)
        // 不这么写会有诡异BUG
        self.listQuery = {...obj}
        this.handlePath()
        this.handleModel(this.value)
      },
      mergeDefaultOption (searchOptions) {
        let self = this
        return searchOptions.map(optionItem => {
          if (optionItem.type === 'date') {
            return Object.assign(optionItem, self.dateDefaultOptions)
          } else if (optionItem.type === 'daterange') {
            return Object.assign(optionItem, self.daterangeDefaultOptions)
          } else if (optionItem.type === 'select') {
            return Object.assign(optionItem, self.selectDefaultOptions)
          } else if (optionItem.type === 'remote') {
            return Object.assign(optionItem, self.remoteDefaultOptions)
          } else if (optionItem.type === 'input') {
            return Object.assign(optionItem, self.inputDefaultOptions)
          } else {
            return optionItem
          }
        })
      },
      // 处理watch model 绑定数据
      handleModel (val) {
        this.listQuery = {}
        Object.keys(val).forEach(key => {
          this.$set(this.listQuery, key, val[key])
        })
      },
      // 请求字典值
      requestDic (options, key) {
        if (!this.dictionarys.length) return
        this.requests.GET_DICTIONARIES_LIST(this.dictionarys.toString())
          .then(res => {
            if (!res.message) {
              this.dictionaryList = res
              options.forEach(item => {
                if (this.dictionarys.includes(item.param)) {
                  let options = res[item.param]
                  // 默认全部添加全部属性 如果不需要设置为false
                  if (item.needAll !== false) {
                    this.utils().addDefaultSelectVal(options, item.name, item.code)
                  }
                  this.$set(item, key, options)
                }
              })
            }
          })
      },
      // 恢复默认值 (弹窗之类的组件需要主动调用一下)
      recover () {
        let obj = {}
        this.searchOptions.forEach(v => { obj[v.value] = v.defaultValue || '' })
        this.listQuery = {...obj}
        this.handlePath()
      },
      reset () {
        this.handlePath()
        this.$emit('reset')
      },
      handlePath () {
        if (this.path) this.listQuery[this.path] = '' // 处理部门path
      },
      search () {
        this.$emit('search', this.listQuery)
      },
      handleChange () {
        this.handleInput()
      },
      // 远程搜索不是用的字典接口 参数不为字符串 需要处理
      handleParma (obj, val) {
        let param = {...obj}
        if (typeof param === 'object') {
          let key = param.valKey
          param[key] = val
          delete param.valKey
        }
        let defaultParams = {
          paging: false,
          pageSize: 999,
          pageNo: 0
        }
        return {...defaultParams, ...param}
      },
      timeCheck (param, filedName, status) {
        this.handleInput()
        if (param) {
          let startDate = param[0]
          let endDate = param[1]
          let startStamp = new Date(startDate).getTime()
          let endStamp = new Date(endDate).getTime()
          let paramTime = endStamp - startStamp
          if (paramTime > 24 * 3600 * 1000 * 92) {
            this.$message.error({
              message: this.$t('DATE_INTERVAL_NOT_NINTY_DAYS'),
              duration: '1000'
            })
            // this.listQuery[filedName] = []
            return false
          } else {
            if (status === true) {
              this.search()
            }
            return true
          }
        }
      },
      getPath (path, status) {
        this.handleInput()
        if (!this.path) return
        this.listQuery[this.path] = path
      },
      handleInput () {
        this.$emit('input', this.listQuery)
      },
      /**
       * @description 表单禁用空格
       */
      disabledSpace (ev) {
        ev.preventDefault()
      }
    }
  }
</script>
