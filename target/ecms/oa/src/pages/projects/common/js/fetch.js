/**
 * @Author: wangqibiao
 * @Date:   2017/7/20
 * @依赖jQuery-ajax方法
 * @功能：网络请求
 */
import Md5 from './md5'
import config from './config'

/**
 * @主函数
 * @export
 * @param {any} module //模块
 * @param {any} service //服务
 * @param {any} method //方法
 * @param {any} loginFlag //是否是登录请求标识
 */
export default function Fetch(module, service, method) {
  this.module = module || 'pm'
  this.service = service || 'ProjectManager'
  this.method = method || 'access'
  // this.ve = 2 //ve
  this.ms = new Date().getTime()
  // this.comid = config.comid || ''
  this.clientType = 'html'

  this.u = localStorage.getItem('u') //用户
  this.v = localStorage.getItem('v')
  this.t = localStorage.getItem('t')
}

/**
 * @默认参数设置
 * @export
 */
Fetch.prototype._configParam = function() {
  var defConfig = {}
  defConfig.appHost = config.appHost //服务器地址
  defConfig.approot = config.appRoot //平台
  defConfig.protocol = 'https://' //协议 默认http
  defConfig.stype = '/data' //方法,导出导入数据请求，默认数据请求
  defConfig.type = 'POST' //请求方式,默认post请求
  return defConfig
}

/**
 * @请求数据
 * @param {any} obj //请求类型
 * @export
 */
Fetch.prototype._dataRender = function(obj) {
  var cmdObj = this
  var dataObj = {}
  for (var key in cmdObj) {
    let keyType = typeof cmdObj[key]
    //值为是函数？跳过
    if (keyType === 'function') {
      continue
    }
    //值为undefined默认为空
    if (keyType === 'undefined') {
      dataObj[key] = ''
      continue
    }
    if (key === 't' && obj.async) {
      //异步不传t，只传v
      continue
    }
    if (key === 'v' && !obj.async) {
      //同步不传v，只传t
      continue
    }
    dataObj[key] = cmdObj[key]
  }
  dataObj['sign'] = this._sign(obj)
  return dataObj
}

/**
 * @加密数组
 * @export
 */
Fetch.prototype._getArray = function() {
  var spiltStr = []
  spiltStr.push(38, 114, 101, 113, 117, 101, 115, 116, 75, 101, 121, 61)
  spiltStr.push(68, 51, 48, 50, 57, 67, 55, 51, 52, 48, 54, 50)
  spiltStr.push(50, 49, 66, 48, 50, 48, 50, 54, 66, 54, 56)
  spiltStr.push(52, 66, 66, 48, 48, 53, 55, 57, 67)
  return spiltStr
}

/**
 * @拼接请求地址
 * @export
 * @param {any} obj //请求类型
 */
Fetch.prototype._sortUrl = function(obj) {
  var cmdObj = this
  var arr1 = []
  for (var pro in cmdObj) {
    arr1.push(pro)
  }
  arr1.sort(function(a, b) {
    return a.split('=')[0] > b.split('=')[0] ? 1 : -1
  })
  var arr2 = []
  for (var i = 0; i < arr1.length; i++) {
    var key = arr1[i]
    var value = cmdObj[key]
    if (typeof value === 'undefined') {
      arr2.push(key + '=' + '')
      continue
    }
    if (key === 't' && obj.async) {
      //异步不传t，只传v
      continue
    }
    if (key === 'v' && !obj.async) {
      //异步不传v，只传t
      continue
    }
    if (typeof value != 'function') {
      arr2.push(key + '=' + encodeURIComponent(value)) //加密前一定要先编码
    }
  }
  return arr2.join('&')
}

/**
 * @参数加密
 * @export
 * @param {any} obj //请求类型
 */
Fetch.prototype._sign = function(obj) {
  var content = this._sortUrl(obj)
  var newArr = []
  var intArr = this._getArray()
  for (var i = 0; i < intArr.length; i++) {
    newArr.push(String.fromCharCode(intArr[i]))
  }
  content += newArr.join('')
  var sign = Md5(content)
  return sign
}

/**
 * @成功回调
 * @export
 * @param {any} res //返回数据
 */
Fetch.prototype._success = function(res) {
  var cmdObj = this
  // 没有登录状态，需要强制登录
  if (res.indexOf('0x04') !== -1 || res.indexOf('0x02') !== -1) {
    //去登陆
    this._goLogin()
  } else {
    if (typeof res === 'string') {
      res = JSON.parse(res)
    }
    // // 请求成功
    if (1 == res.state) {
      if (res.u) {
        // sessionStorage.setItem("u", res.u);
        localStorage.setItem('u', res.u)
      }
      if (res.t) {
        // sessionStorage.setItem("t", res.t);
        localStorage.setItem('t', res.t)
      }
      if (res.v) {
        // sessionStorage.setItem("v", res.v);
        localStorage.setItem('v', res.v)
      }
      if (typeof cmdObj.success === 'function') {
        cmdObj.success(res)
      }
    } else {
      this._error(res)
    }
  }
}

/**
 * @去登陆
 */
Fetch.prototype._goLogin = function() {
  var r = confirm('您的账号在别处登录？')
  if (r == true) {
    window.location.href = '/#login'
  }
}

/**
 * @失败
 * @param {any} res //返回数据
 */
Fetch.prototype._error = function(res) {
  var cmdObj = this
  if (typeof cmdObj.error === 'function') {
    cmdObj.error(res)
  }
  throw res.message //抛出错误
}

/**
 * @获取url
 */
Fetch.prototype._getUrl = function(obj) {
  var defConfig = this._configParam()
  var url = defConfig.protocol + defConfig.appHost + defConfig.approot + (obj.stype || defConfig.stype)
  return url
}

/**
 * @网络请求
 */
Fetch.prototype._request = function(obj) {
  var _this = this
  var defConfig = _this._configParam()
  var dataObj = _this._dataRender(obj)
  var url = this._getUrl(obj)
  var type = obj.type || defConfig.type
  $.ajax({
    url: url,
    type: type,
    async: obj.async, //同步异步请求
    data: dataObj, //请求参数
    success: function(res) {
      _this._success(res)
    },
    error: function(res) {
      //失败
      _this._error(res)
    },
  })
}

/**
 * @同步请求
 */
Fetch.prototype.execute = function() {
  this._request({
    async: false,
  })
}

/**
 * @异步请求
 */
Fetch.prototype.executeAsync = function() {
  this._request({
    async: true,
  })
}

/**
 * @导出导入
 */
Fetch.prototype.downClient = function() {
  this._request({
    async: false,
    stype: '/downClient',
  })
}
