import i18n from '../../lang'
import { Message } from 'element-ui'

export default {
  DEBUG_TOGGLE: true,
  /**
   * 扩展(继承)
   * extends(oriObj, newObj, newObj ...) or extends({}, obj, obj ...)
   * extends(obj, obj...)扩展到自身
   * 第一个参数是布尔值 默认不填写为:false 当值为true则使用深拷贝
   * @return new Object gather
   */
  extends() {
    let options
    let name
    let src
    let copy
    let copyIsArray
    let clone
    let target = arguments[0] || {}
    let i = 1
    let length = arguments.length
    let deep = false
    if (typeof target === 'boolean') {
      deep = target
      target = arguments[1] || {}
    }
    if (typeof target !== 'object' && !this.isFunction(target)) {
      target = {}
    }
    if (length === i) {
      target = this
      --i
    }
    for (; i < length; i++) {
      if ((options = arguments[i]) != null) {
        for (name in options) {
          src = target[name]
          copy = options[name]
          if (target === copy) {
            continue
          }
          if (
            deep &&
            copy &&
            (this.isPlainObject(copy) || (copyIsArray = this.isArray(copy)))
          ) {
            if (copyIsArray) {
              copyIsArray = false
              clone = src && this.isArray(src) ? src : []
            } else {
              clone = src && this.isPlainObject(src) ? src : {}
            }
            target[name] = this.extends(deep, clone, copy)
          } else if (copy !== undefined) {
            target[name] = copy
          }
        }
      }
    }
    return target
  },
  /**
   * 测试对象是否是纯粹的对象（通过 "{}" 或者 "new Object" 创建的）
   * @param  {[type]}  obj
   * @return {Boolean}
   */
  isPlainObject(obj) {
    if (this.type(obj) !== 'object' || obj.nodeType || this.isWindow(obj)) {
      return false
    }
    try {
      if (
        obj.constructor &&
        !Object.prototype.hasOwnProperty.call(
          obj.constructor.prototype,
          'isPrototypeOf'
        )
      ) {
        return false
      }
    } catch (e) {
      return false
    }
    return true
  },
  /**
   * 判断数据类型
   * @param  obj
   * @return 返回的是由Object toString返回的格式 如 [Object String] [Object Object]
   */
  type(obj) {
    if (obj == null) {
      return String(obj)
    }
    return typeof obj === 'object' || typeof obj === 'function'
      ? Object.prototype[Object.prototype.toString.call(obj)] || 'object'
      : typeof obj
  },
  /**
   * 判断是否window对象
   * @param  {[type]}  obj
   * @return {Boolean}
   */
  isWindow(obj) {
    return obj != null && obj === obj.window
  },
  /**
   * 判断值是否存在数组中
   * @param  {[type]} elem 搜索内容
   * @param  {[type]} arr  被搜索数组
   * @param  {[type]} i    用来搜索数组队列，默认值为0。
   * @return {[type]} 未找到返回-1，否则返回位置下标
   */
  inArray(elem, arr, i) {
    return arr == null ? -1 : Array.prototype.indexOf.call(arr, elem, i)
  },
  /**
   * 判断是否数组
   * @type {Boolean}
   */
  isArray: Array.isArray,
  /**
   * 判断是否函数
   * @param  obj
   * @return {Boolean}
   */
  isFunction(obj) {
    return this.type(obj) === 'function'
  },
  /**
   * 判断是否数值类型
   * @param  {[type]} obj
   * @return {[Boolean]}
   */
  isNumeric: function(obj) {
    return !isNaN(parseFloat(obj)) && isFinite(obj)
  },
  /**
   * 日期(时间)格式化
   * @param  arguments[0] 可被new Date()识别的日期或时间戳或时间差
   * @param  arguments[1] 可选's' 传入时间格式以秒为单位  默认为'ms'
   * date('时间戳').getTime() 获取时间戳

   * date('String' or number).format('string') 格式化日期
   date('1978-01-01').format('Y-m') //1978-01

   * date('时间差').timeset() 获取计算后的时间
   date(301,'s').timeset() //{year:0,month:0,day:0,hour:0,minute:6,second:1}

   * date('时间差').state() 获取当前时间状态
   date('301','s').state //{minute:6}=>6分钟前

   * date(number)._year|_month|_day|_hour|_minute|_second() 将数字转化为若干年|月|日........

   *** 继承自 new Date() 可使用于原生date方法 : date('xxxx').getFullYear()...
   */
  date() {
    console.argu
    // 格式化目标
    let target = arguments[0] || new Date().getTime()
    // 时间戳为ms/s 默认为ms
    let second = arguments[1] === 's' ? 1 : 1000
    target = this.isNumeric(target) ? +target : '' + target

    return this.extends(true, new Date(target), {
      /**
       * 初始化
       @param target 日期/时间戳/时间差
       */
      init(target) {
        this.target = target / second
        return this
      },
      /**
       * 日期时间参数
       */
      data() {
        let second = 1
        let minute = 60 * second
        let hour = minute * 60
        let day = hour * 24
        let halfamonth = day * 15
        let month = halfamonth * 2
        let year = month * 12
        return {
          // 基本时间条件转换(毫秒)
          basicUnit: {
            second: 1,
            minute: minute,
            hour: hour,
            day: day,
            halfamonth: halfamonth,
            month: month,
            year: year,
          },
          // 转义列表
          trope: {
            Y: this.getFullYear(),
            y: this.getFullYear(),
            M: this.getMonth() + 1,
            m:
              this.getMonth() + 1 < 10
                ? '0' + (this.getMonth() + 1)
                : this.getMonth() + 1,
            D: this.getDate(),
            d: this.getDate() < 10 ? '0' + this.getDate() : this.getDate(),
            H: this.getHours() < 10 ? '0' + this.getHours() : this.getHours(),
            h:
              this.getHours() % 12 === 0
                ? 12
                : this.getHours() % 12 < 10
                ? '0' + (this.getHours() % 12)
                : this.getHours() % 12,
            I: this.getMinutes(),
            i:
              this.getMinutes() < 10
                ? '0' + this.getMinutes()
                : this.getMinutes(),
            S: this.getSeconds(),
            s:
              this.getSeconds() < 10
                ? '0' + this.getSeconds()
                : this.getSeconds(),
          },
          // 数字化列表
          timeset: {
            year: this.count(year),
            month: this.count(month),
            day: this.count(day),
            hour: this.count(hour),
            minute: this.count(minute),
            second: this.count(1),
          },
        }
      },
      /**
       * 时间计算
       * @param  {[type]} u [description]
       * @return {[type]}   [description]
       */
      count(time) {
        return Math.floor(Math.abs(this.target / time))
      },
      /**
       * 按照format转义格式转换时间
       * @param  {[String]} order 带有转义意义的字符串 如 "Y-m-d H:i:s" "M-D"
       * @return {[String or Object Date]}  返回转义后的时间或本对象
       */
      format(order) {
        try {
          let fm = '' + order
          for (let per in this.data().trope) {
            fm =
              per && new RegExp(per).test(fm)
                ? fm.replace(per, this.data().trope[per])
                : fm
          }
          return fm
        } catch (e) {
          return this
        }
      },
      /**
       * 返回日期对象
       */
      timeset() {
        let bs = this.data().basicUnit
        let ts = this.data().timeset
        for (let per in ts) {
          ts[per] = this.count(bs[per])
          let diff = this.target - ts[per] * bs[per]
          this.target = diff >= 0 ? diff : 0
        }
        return ts
      },
      /**
       * 获取时间状态  例：3分钟/小时/天前 返回对象格式数据
       * {minute:3} / {hour:3} / {day:3}
       * @return {[object]}
       */
      state() {
        let bs = this.data().basicUnit
        if (this.target > bs.year) {
          return { year: this.count(bs.year) }
        }
        if (this.target > bs.month) {
          return { month: this.count(bs.month) }
        }
        if (this.target > bs.day) {
          return { day: this.count(bs.day) }
        }
        if (this.target > bs.hour) {
          return { hour: this.count(bs.hour) }
        }
        if (this.target > bs.minute) {
          return { minute: this.count(bs.minute) }
        }
        return { second: this.target }
      },
      _year() {
        return this.data().timeset.year
      },
      _month() {
        return this.data().timeset.month
      },
      _day() {
        return this.data().timeset.day
      },
      _hour() {
        return this.data().timeset.hour
      },
      _minute() {
        return this.data().timeset.minute
      },
      _second() {
        return this.data().timeset.second
      },
      /**
       * 是否在格林威治时间段
       * @return {Boolean} [description]
       */
      isGreenwichTime(number) {
        return (
          number > this.getTime('1970-01-01 00:00:00') &&
          number < this.getTime('2038-01-19 11:14:07')
        )
      },
      /**
       * 返回时间戳
       * @return {[number]}
       */
      toNumber() {
        return this.getTime()
      },
      end() {
        return this
      },
    }).init(target)
  },
  /**
   * 调试工具
   * @param  {[type]} toggle 全局开关
   * @return {[empty function or console]}
   */
  debug(toggle) {
    let emptyFunc = {}
    for (let per in console) {
      emptyFunc[per] = function() {
        return
      }
    }
    this.DEBUG_TOGGLE = typeof toggle === undefined ? toggle : this.DEBUG_TOGGLE
    return !this.DEBUG_TOGGLE ? emptyFunc : console
  },
  /**
   * 去除字符串所有的空格
   * @argument {[string]}
   * @return {[string]}
   */
  trim(str) {
    return str.replace(/\s|\xA0/g, '')
  },
  /**
   * 数组去重
   * @argument {[string]}
   * @return {[string]}
   */
  arrunique(arr) {
    let res = []
    let json = {}
    for (let i = 0; i < arr.length; i++) {
      if (!json[arr[i]]) {
        res.push(arr[i])
        json[arr[i]] = 1
      }
    }
    return res
  },
  objarrunique(arr) {
    let hash = {}
    arr = arr.reduce(function(item, next) {
      hash[next.key] ? '' : (hash[next.key] = true && item.push(next))
      return item
    }, [])
    return arr
  },
  /**
   * 处理系统提示语的文本
   * @param {type} words
   * @returns {undefined}
   */
  getLangTipsText({ langType, localText, InternationalText }) {
    if (langType === 'local') {
      return localText
    } else {
      return InternationalText
    }
  },
  /**
   * @description 添加ajax请求参数
   * @param formObj from表单和接口参数的键值对
   * @param param ajax参数键值对
   */
  handleGetAjaxParams(formObj, param) {
    let resParam = param
    for (let key in formObj) {
      if (formObj[key] !== '' && formObj[key] !== i18n.t('SELECT_ALL')) {
        if (typeof formObj[key] === 'object' && formObj[key] !== null) {
          let keys = formObj[key]['keys']
          let date = formObj[key]['val']
          let temp = null
          if (date !== temp) {
            if (date.length !== 0) {
              let startTimeKey = keys[0]
              let endtTimeKey = keys[1]
              let startTimeVal = new Date(date[0]).getTime()
              let endTimeVal = new Date(date[1]).getTime()
              resParam[startTimeKey] = startTimeVal
              resParam[endtTimeKey] = endTimeVal
            }
          }
        } else {
          resParam[key] = formObj[key]
        }
      }
    }
    return resParam
  },
  /**
   * @description 模糊查询通用函数
   */
  commonRemote(queryStr, ajaxFn, resetState) {
    if (queryStr !== '') {
      this.loading = true
      setTimeout(() => {
        this.loading = false
        ajaxFn()
      }, 200)
    } else {
      resetState()
    }
  },
  /**
   * 页面是否全屏显示
   * @param {boolean} fullScreen
   */
  pageFullScreen(fullScreen) {
    let wrap = document.querySelector('.content-wrapper')
    /**
     * .content-wrapper 的DOM未渲染完成时不执行改变style的过程
     */
    let temp = null
    if (wrap === temp) {
      return
    }
    if (fullScreen === true) {
      wrap.style = 'margin:0;'
      return
    }
    wrap.style = 'margin-left:14px;margin-right:14px;'
  },
  /**
   * 表单下拉框添加默认值“全部”
   * @returns {array}
   */
  addDefaultSelectVal(array) {
    if (array) {
      array.unshift({
        text: i18n.t('SELECT_ALL'),
        name: i18n.t('SELECT_ALL'),
        code: '',
        id: '',
      })
    }
    return [
      {
        text: i18n.t('SELECT_ALL'),
        name: i18n.t('SELECT_ALL'),
        code: '',
        id: '',
      },
    ]
  },
  /**
   * 日志打印
   * @param {Boolean} showLogger
   * @param {Function} callback
   */
  logger(showLogger, callback) {
    if (showLogger === true) {
      callback()
    }
  },
  // 视频下载转
  downloadFile(fileName, content) {
    let $a = document.createElement('a')
    $a.setAttribute('href', fileName)
    $a.setAttribute('download', content)
    let evObj = document.createEvent('MouseEvents')
    evObj.initMouseEvent(
      'click',
      false,
      false,
      window,
      0,
      0,
      0,
      0,
      0,
      true,
      false,
      true,
      false,
      0,
      null
    )
    $a.dispatchEvent(evObj)
  },

  /* 日期格式化 */
  dateFormatter(timeStamp, formatStr = 'Y-m-d H:i:s') {
    if (timeStamp) {
      return !timeStamp || this.date(timeStamp).format(formatStr)
    } else {
      return '-'
    }
  },
  dateFormat(timeStamp, formatStr = 'Y-m-d H:i:s') {
    if (timeStamp) {
      return this.date(timeStamp).format(formatStr)
    }
  },
  /* 根据code获取数据字典name */
  getDictionaryNameByCode(dictionaryList, code) {
    if (code === '') {
      return ''
    } else if (dictionaryList) {
      let matchedDictionary = dictionaryList.filter(
        item => item.code === code.toString()
      )
      if (matchedDictionary.length > 0) {
        return matchedDictionary[0].name
      }
      return code
    } else {
      return code
    }
  },

  // 用于生成uid随机值
  random() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
  },
  // 生成随机字符串"a2aed19f-e962-4a7f-ba7a-8cc74bb6900e"
  randomString() {
    let len = 36
    let str = 'abcdefghijkmnopqrstuwxyz23456789'
    let maxPos = str.length
    let pwd = ''
    for (let i = 0; i < len; i++) {
      if (i === 8 || i === 13 || i === 18 || i === 23) {
        pwd += '-'
      } else {
        pwd += str.charAt(Math.floor(Math.random() * maxPos))
      }
    }
    return pwd
  },
  // 获取uid
  getUid() {
    return (
      this.random() +
      this.random() +
      '-' +
      this.random() +
      '-' +
      this.random() +
      '-' +
      this.random() +
      '-' +
      this.random() +
      this.random() +
      this.random()
    )
  },
  getFileNameFromUrl(url) {
    if (url) {
      return url
        .split('/')
        .splice(-1)
        .join('')
    }
    return ''
  },
  getFileExtFromFileName(fileName) {
    if (fileName) {
      return fileName
        .split('.')
        .splice(-1)
        .join('')
        .toLowerCase()
    }
    return ''
  },
  // 判断是否是连续递增递减数字，或者连续相同数字
  isContinuityNum(num) {
    // 连续相同数字
    if ([...new Set(Array.from(num))].length === 1) {
      return true
      // 数字都不相同，递增或者递减
    } else if (
      [...new Set(Array.from(num))].length === Array.from(num).length
    ) {
      let arr = Array.from(num)
      let arr1 = [...arr]
      arr.reverse()
      let arr2 = arr1.map((n, i) => {
        return parseInt(n) + parseInt(arr[i])
      })
      return [...new Set(arr2)].length === 1
    }
    return false
  },
  // 文件大小单位显示处理
  handleSize(size) {
    size = parseFloat(size)
    if (isNaN(size)) return
    let str = ''
    if (size < 1024) {
      str = size + 'MB'
    } else {
      str = (size / 1024).toFixed(2) + 'G'
    }
    return str
  },
  // 时间选择框控制时间间隔不能超过固定天数
  timeCheck(param, filedName, days) {
    if (param) {
      let startDate = param[0]
      let endDate = param[1]
      let startStamp = new Date(startDate).getTime()
      let endStamp = new Date(endDate).getTime()
      let paramTime = endStamp - startStamp
      if (paramTime > 24 * 3600 * 1000 * days) {
        Message.error({
          message: i18n.t('DATE_INTERVAL_NOT_N_DAYS', [days]),
          duration: '1000',
        })
        let arr = filedName.split('.')
        this[arr[0]][arr[1]] = []
        return false
      } else {
        return true
      }
    }
  },
  pickerOptions(format) {
    let status = format === 'yyyy-MM-dd HH:mm:ss' // true 为时间选择 false 为日期选择
    return {
      disabledDate: time => {
        if (status) {
          return time.getTime() > Date.now()
        } else {
          let yesterday =
            this.date(new Date(new Date().getTime() - 86400000)).format(
              'y-m-d'
            ) +
            ' ' +
            '23:59:59'
          return time.getTime() > new Date(yesterday).getTime()
        }
      },
      shortcuts: [
        {
          text: i18n.t('CLOUDVIDEOINDEX.finalWeek'),
          onClick(picker) {
            let day = status ? 6 : 7
            const end = new Date()
            if (!status) {
              end.setDate(end.getDate() - 1)
              end.setHours(23)
              end.setMinutes(59)
              end.setSeconds(59)
            }
            const start = new Date()
            start.setDate(start.getDate())
            start.setHours(0)
            start.setMinutes(0)
            start.setSeconds(0)
            start.setTime(start.getTime() - 3600 * 1000 * 24 * day)
            picker.$emit('pick', [start, end])
          },
        },
        {
          text: i18n.t('CLOUDVIDEOINDEX.finalMonth'),
          onClick(picker) {
            let day = status ? 29 : 30
            const end = new Date()
            if (!status) {
              end.setDate(end.getDate() - 1)
              end.setHours(23)
              end.setMinutes(59)
              end.setSeconds(59)
            }
            const start = new Date()
            start.setDate(start.getDate())
            start.setHours(0)
            start.setMinutes(0)
            start.setSeconds(0)
            start.setTime(start.getTime() - 3600 * 1000 * 24 * day)
            picker.$emit('pick', [start, end])
          },
        },
        {
          text: i18n.t('CLOUDVIDEOINDEX.finalThreeMonth'),
          onClick(picker) {
            let day = status ? 90 : 91
            const end = new Date()
            if (!status) {
              end.setDate(end.getDate() - 1)
              end.setHours(23)
              end.setMinutes(59)
              end.setSeconds(59)
            }
            const start = new Date()
            start.setDate(start.getDate())
            start.setHours(0)
            start.setMinutes(0)
            start.setSeconds(0)
            start.setTime(start.getTime() - 3600 * 1000 * 24 * day)
            picker.$emit('pick', [start, end])
          },
        },
      ],
    }
  },
  treeDataToList(data, key) {
    let list = []
    key = key || 'children'

    function analysis(data) {
      if (Object.prototype.toString.call(data) !== '[object Array]') return
      data.forEach(val => {
        let obj = {}
        for (let o in val) {
          if (
            o === key &&
            Object.prototype.toString.call(val[o]) === '[object Array]' &&
            JSON.stringify(val[o]) !== '[]'
          ) {
            analysis(val[o])
          } else {
            if (o !== key) {
              obj[o] = val[o]
            }
          }
        }
        list.push(obj)
      })
    }

    analysis(data)
    return list
  },
  // filterKeyArr 需要过滤出来的key的集合  filterKey 根据哪个key来过滤 默认id
  filterTreeDataToList(data, filterKeyArr, key = 'children', filterKey = 'id') {
    let list = []

    function analysis(data) {
      if (Object.prototype.toString.call(data) !== '[object Array]') return
      data.forEach(val => {
        let obj = {}
        for (let o in val) {
          if (
            o === key &&
            Object.prototype.toString.call(val[o]) === '[object Array]' &&
            JSON.stringify(val[o]) !== '[]'
          ) {
            analysis(val[o])
          } else {
            if (o !== key) {
              obj[o] = val[o]
            }
          }
        }
        if (filterKeyArr.some(v => v === obj[filterKey])) list.push(obj)
      })
    }

    analysis(data)
    return list
  },
  // 处理字典 code 转 name
  codeToName(key, selectList, name, code) {
    name = name || 'name'
    code = code || 'code'
    let str = ''
    if (!key && key !== 0) return str
    let obj = selectList.find(v => v[code] === key)
    if (obj) str = obj[name]
    return str
  },
  // 获取元素到窗口左边界距离
  getElementLeft(element) {
    let actualLeft = element.offsetLeft
    let current = element.offsetParent

    while (current !== null) {
      actualLeft += current.offsetLeft
      current = current.offsetParent
    }
    return actualLeft
  },
  // 获取元素到窗口右 边界距离
  getElementRight(element) {
    let actualLeft = element.offsetLeft
    let current = element.offsetParent

    while (current !== null) {
      actualLeft += current.offsetLeft
      current = current.offsetParent
    }
    return document.documentElement.clientWidth - actualLeft
  },
  // 滚动条回顶 参数 传id
  scrollToTop(id) {
    let el = document.getElementById(id)
    if (el) el.scrollTop = 0
  },
  // 树形图 查找某一项
  deepQuery(tree, key, id) {
    let stark = []
    stark = stark.concat(tree)
    while (stark.length) {
      let temp = stark.shift()
      if (temp.children) {
        stark = temp.children.concat(stark)
      }
      if (id === temp[key]) {
        return temp
      }
    }
  },
  // list某个字段去重
  listNoRepeat(list, key) {
    let originArr = list.map(val => val[key])
    let arr = Array.from(new Set(originArr))
    let result = []
    arr.forEach(val => {
      let r = list.find(v => v[key] === val)
      result.push(r)
    })
    return result
  },
  // 返回某个时间间隔的两个时间戳
  getRangTimeStamp(day) {
    let now =
      this.date(new Date(new Date().getTime() - day * 86400000)).format(
        'y-m-d'
      ) +
      ' ' +
      '00:00:00'
    return [new Date(now).getTime(), new Date().getTime()]
  },
  // 返回某个时间间隔的两个时间字符串， 第二个参数为true的话不需要时分秒
  getRangTime(day, noTime) {
    let dayOfMs = 86400000
    let format = noTime ? 'y-m-d' : 'y-m-d H:i:s'
    let now =
      this.date(new Date(new Date().getTime() - day * dayOfMs)).format(
        'y-m-d'
      ) +
      ' ' +
      '00:00:00'
    let end = this.date(new Date()).format(format)
    return [now, end]
  },
  // 返回当天时间前面一天的某个时间间隔的两个时间字符串， 第二个参数为true的话需要时分秒
  getYesterdayRangTime(day, time) {
    let dayOfMs = 86400000
    let timeNow = ''
    let timeEnd = ''
    if (time) {
      timeNow = ' ' + '00:00:00'
      timeEnd = ' ' + '23:59:59'
    }
    let now =
      this.date(new Date(new Date().getTime() - day * dayOfMs)).format(
        'y-m-d'
      ) + timeNow
    let end =
      this.date(new Date(new Date().getTime() - dayOfMs)).format('y-m-d') +
      timeEnd
    return [now, end]
  },
  getFirstMenu() {
    const menuList = JSON.parse(sessionStorage.getItem('cvf_menuList'))
    if (menuList && menuList.length > 0) {
      let firstMenu = ''
      menuList.some(menu => {
        if (menu.type === '10') {
          if (menu.url && menu.url.length > 0) {
            firstMenu = menu.url.substr(2, menu.url.length)
            return true
          } else if (menu.children && menu.children.length > 0) {
            let childrenMenu = menu.children.filter(
              child => child.url && child.url.length > 0
            )
            if (childrenMenu && childrenMenu.length > 0) {
              firstMenu = childrenMenu[0].url.substr(
                2,
                childrenMenu[0].url.length
              )
              return true
            }
          }
        }
      })
      return firstMenu
    }
  },
  arrDeepCopy(source) {
    let sourceCopy = []
    for (let item in source) {
      sourceCopy[item] =
        typeof source[item] === 'object'
          ? this.arrDeepCopy(source[item])
          : source[item]
    }
    return sourceCopy
  },
}
