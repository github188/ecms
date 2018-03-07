import store from '@/vuex/'
import {getStore, setStore, removeStore} from '@/utils/localStorage'

window.Utils = {
  /**
   * 登出
   */
  logOut() {
    store.commit({
      type: 'LOG_OUT',
    })
  },
  /**
   * 获取session值
   */
  getValue(name) {
    return getStore(name)
  },
  setValue(name, content) {
    return setStore(name, content)
  },
  removeValue(name) {
    removeStore(name)
  },
  /**
   * 数组合并
   */
  arrayMerge() {
    return Array.prototype.concat.apply([], arguments)
  },
  /**
   * 数组去重
   * @param  {[type]} array [description]
   * @return {[type]} array [description]
   */
  arrayUnique(array) {
    var res = []
    var json = {}
    for (var i = 0; i < array.length; i++) {
      if (!json[array[i]]) {
        res.push(array[i])
        json[array[i]] = 1
      }
    }
    return res
  },
  /**
   * 过滤值为空||undefined||null的对象
   * @param  {[type]} object [description]
   * @return {[type]} object [description]
   */
  filterObjectNull(object) {
    let temp = {}
    for (let i in object) {
      if (object[i] !== '' && object[i] !== null && object[i] !== undefined) {
        temp[i] = object[i]
      }
    }
    return temp
  },

  /**
 * 将HTML转义为实体
 * @return {[String]}
 */
  escapeHtml(htmlStr) {
    var s = ''
    if (htmlStr.length == 0) return ''
    s = htmlStr.replace(/&/g, '&amp;')
    s = s.replace(/</g, '&lt;')
    s = s.replace(/>/g, '&gt;')
    s = s.replace(/ /g, '&nbsp;')
    s = s.replace(/\'/g, '&#39;')
    s = s.replace(/\"/g, '&quot;')
    s = s.replace(/\n/g, '<br>')
    return s
  },
  /**
   * 将实体转回为HTML
   * @return {[String]}
   */
  unescapeHtml(str) {
    var s = ''
    if (str.length == 0) return ''
    s = str.replace(/&amp;/g, '&')
    s = s.replace(/&lt;/g, '<')
    s = s.replace(/&gt;/g, '>')
    s = s.replace(/&nbsp;/g, ' ')
    s = s.replace(/&#39;/g, "'")
    s = s.replace(/&quot;/g, '"')
    s = s.replace(/<br>/g, '\n')
    return s
  },
  /**
   *
   * @param {过滤html标签} str
   */
  filterHtmlTag(str) {
    str = typeof str == 'string' ? str.replace(/<\/?[^>]*>/g, '') : str
    return str.trimAll()
  },

  /**
   * 判断字符串是否为空
   */
  isNullorEmpty(str) {
    if ((str == null || str == 'null' || str == '' || str == ' ' || str == undefined || str == 'undefined') && (str != 0 || str != '0')) return true
    else {
      return false
    }
  },
  /**
   * @timestamp时间戳
   * 时间精确到分
   */
  timeToMinute(timestamp) {
    if (!timestamp) {
      return '-'
    }
    let time = new Date(timestamp).toStr()
    return time.slice(0, 16)
  },
  renderFs(data) {
    //渲染FS
    this.fs = new Object()
    var fs = data['fs']
    for (var i = 0; i < fs.length; i++) {
      this.fs[fs[i]['name']] = i
    }
  },
  getFsIndex(name) {
    //根据属性获取标识
    return this.fs[name]
  },
  getRowValue(row, name) {
    //获取属性对应值
    var value = ''
    if (row != '' && row != null && row != undefined) {
      value = row[this.getFsIndex(name)]
      if (this.isNullorEmpty(value)) {
        value = ''
      }
    }
    return value
  },
  formatTen(num) {
    //日期小于10的加0
    return num > 9 ? num + '' : '0' + num
  },
  formatDate(date) {
    //将中国标准时间转换成yyyy-mm-dd
    if (!this.isNullorEmpty(date)) {
      date = new Date(date)
      var year = date.getFullYear()
      var month = date.getMonth() + 1
      var day = date.getDate()
      var hour = date.getHours()
      var minute = date.getMinutes()
      var second = date.getSeconds()
      return year + '-' + this.formatTen(month) + '-' + this.formatTen(day)
    }
  },
  //对象根据key排序
  toSort(prop) {
    return function(obj1, obj2) {
      var val1 = obj1[prop]
      var val2 = obj2[prop]
      if (!isNaN(Number(val1)) && !isNaN(Number(val2))) {
        val1 = Number(val1)
        val2 = Number(val2)
      }
      if (val1 > val2) {
        //降序排列
        return 1
      } else if (val1 < val2) {
        return -1
      } else {
        return 0
      }
    }
  },
  // 请求
  http(params, json = {sync: false, error: false}) {
    return new Promise((resolve, reject) => {
      let fetch = new Fetch()
      Object.assign(cmd, params)
      fetch.success = res => resolve(res)
      fetch.error = err => (json.error ? Message.error(err) : reject(err))
      if (json.sync) {
        fetch.execute()
      } else {
        fetch.executeAsync()
      }
    })
  },
  // 将返回结果fs,rs转化为json数组的形式,传入一个含有fs和rs属性的对象
  dataFormat({rs, fs}) {
    return rs.map(item => {
      let temp = {}
      fs.forEach((v, index) => {
        temp[v.name] = item[index]
      })
      return temp
    })
  },
}
/**
 * 日期对象转为年与日格式
 */
Date.prototype.toDay = function() {
  let s = ''
  let year = this.getFullYear()
  let month = this.getMonth()
  let date = this.getDate()
  s += year
  s += month < 9 ? '-0' + (month + 1) : '-' + (month + 1)
  s += date < 10 ? '-0' + date : '-' + date
  return s
}
/**
 * 获取星期
 * @return String
 */
Date.prototype.toWeekDay = function() {
  const arr = ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日']
  return arr[new Date().getDay() - 1]
}
/**
 * 时间戳转为日期格式
 */
Date.prototype.toStr = function(standard) {
  var s = ''
  s += this.getFullYear()
  if (this.getMonth() < 9) {
    s += '-0' + (this.getMonth() + 1)
  } else {
    s += '-' + (this.getMonth() + 1)
  }
  if (this.getDate() < 10) {
    s += '-0' + this.getDate()
  } else {
    s += '-' + this.getDate()
  }
  if (this.getHours() < 10) {
    s += ' 0' + this.getHours()
  } else {
    s += ' ' + this.getHours()
  }
  if (this.getMinutes() < 10) {
    s += ':0' + this.getMinutes()
  } else {
    s += ':' + this.getMinutes()
  }
  if (this.getSeconds() < 10) {
    s += ':0' + this.getSeconds()
  } else {
    s += ':' + this.getSeconds()
  }
  return standard ? s.replace(new RegExp(/-/gm), '/') : s
}
Date.prototype.Format = function(fmt) {
  //author: meizz
  var o = {
    'M+': this.getMonth() + 1, //月份
    'd+': this.getDate(), //日
    'h+': this.getHours(), //小时
    'm+': this.getMinutes(), //分
    's+': this.getSeconds(), //秒
    'q+': Math.floor((this.getMonth() + 3) / 3), //季度
    S: this.getMilliseconds(), //毫秒
  }
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length))
  for (var k in o)
    if (new RegExp('(' + k + ')').test(fmt)) fmt = fmt.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length))
  return fmt
}
// --------------------------------------------
// 字符串的时间转换为日期（不含时分秒）
// --------------------------------------------
String.prototype.toTime = function() {
  var arr1 = this.split('-')
  var year = parseFloat(arr1[0])
  var month = parseFloat(arr1[1])
  var date = parseFloat(arr1[2])
  var myDate = new Date(year, month - 1, date)
  return myDate.getTime()
}
// --------------------------------------------
// 去除所有空格
// --------------------------------------------
String.prototype.trimAll = function() {
  return this.replace(/\s*/g, '')
}
// --------------------------------------------
// 标准时间格式转换为时间戳（含时分秒）
// --------------------------------------------
String.prototype.toSecTime = function() {
  var arr = this.split(' ')
  var arr1 = arr[0].split('-')
  var arr2 = arr[1].split(':')
  var year = parseFloat(arr1[0])
  var month = parseFloat(arr1[1])
  var date = parseFloat(arr1[2])
  var hour = parseFloat(arr2[0])
  var min = parseFloat(arr2[1])
  var sec = parseFloat(arr2[2])
  var myDate = new Date(year, month - 1, date, hour, min, sec)
  return myDate.getTime()
}

/**
 * 过滤html标签
 * @return String
 */
String.prototype.filterHtml = function() {
  var str = this
  typeof str == 'string' ? str.replace(/<\/?[^>]*>/g, '') : str
  return str.trim()
}

// --------------------------------------------
// 金额添加千分点
// --------------------------------------------
Number.prototype.addComma = function() {
  var number = this
  if (number == 0 || Utils.isNullorEmpty(this)) {
    return '0.00'
  }
  var num = number + ''
  num = num.replace(new RegExp(',', 'g'), '')
  // 正负号处理
  var symble = ''
  if (/^([-+]).*$/.test(num)) {
    symble = num.replace(/^([-+]).*$/, '$1')
    num = num.replace(/^([-+])(.*)$/, '$2')
  }
  if (/^[0-9]+(\.[0-9]+)?$/.test(num)) {
    var num = num.replace(new RegExp('^[0]+', 'g'), '')
    if (/^\./.test(num)) {
      num = '0' + num
    }
    var decimal = num.replace(/^[0-9]+(\.[0-9]+)?$/, '$1')
    var integer = num.replace(/^([0-9]+)(\.[0-9]+)?$/, '$1')
    decimal = Utils.isNullorEmpty(decimal) ? '.00' : decimal
    var re = /(\d+)(\d{3})/
    while (re.test(integer)) {
      integer = integer.replace(re, '$1,$2')
    }
    return symble + integer + decimal
  } else {
    return number
  }
}

// --------------------------------------------
// 删除千分点
// --------------------------------------------
String.prototype.removeComma = function() {
  var num = this.replace(new RegExp(',', 'g'), '')
  return num
}
