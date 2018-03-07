import axios from 'axios'
import { getStore } from '@/utils/localStorage'
import Fetch from './fetch'
const appConfig = require('static/js/config')
const rootUrl = appConfig.appHost + appConfig.appRoot
let extremely = true
export function ajax({
    type = 'get',
    url = '',
    data = {},
    responseType = 'json',
    header = { authorization: getStore('authorization') },
    success = null,
    error = null,
} = {}) {
    data.ts = new Date().getTime()
    const params = type.toLowerCase() == 'get' ? 'params' : 'data'
    const config = {
        [params]: data,
        baseURL: rootUrl,
        url: url,
        headers: header,
        method: type,
        timeout: 20000,
    }
    axios(config)
        .then(response => {
            if (response.data.code == '401' || response.data.message == '身份验证失败!') {
                Utils.logOut()
                return
            }
            // if (response.data.code == 'failed') {
            //   this.errorTips(response.data.message)
            // }
            if (response.data.code == '500') {
                if (error) {
                    error(this)
                } else {
                    this.disable = false
                    this.errorTips('服务运行异常!')
                    return
                }
            }
            success(response.data, this, response)
            this.disable = false
        })
        .catch(error => {
            if (error.response) {} else if (error.request) {
                if (extremely) {
                    this.errorTips('服务运行异常')
                }
                extremely = false
            } else {
                // this.errorTips("服务器异常!");
                console.error('Error', error.message)
            }
            this.disable = false
                // console.error("Config", error.config);
        })
}

export function command(module, service, method, params = {}, json = { sync: false, error: false, down: false, type: 'POST' }) {
    Fetch.prototype._configParam = function() {
        var defConfig = {}
        defConfig.appHost = appConfig._appHost //服务器地址
        defConfig.approot = appConfig._appRoot //平台
        defConfig.stype = '/data' //方法,导出导入数据请求，默认数据请求
        defConfig.type = json.type //请求方式,默认post请求
        return defConfig
    }
    Fetch.prototype._getUrl = function(obj) {
        var defConfig = this._configParam()
        var url = defConfig.appHost + defConfig.approot + (obj.stype || defConfig.stype)
        return url
    }
    return new Promise((resolve, reject) => {
        let cmd = new Fetch(module, service, method)
        Object.assign(cmd, params)
        cmd.success = res => resolve(res)
        cmd.error = err => {
            reject(err)
        }
        if (json.down) {
            cmd.downClient()
        } else if (json.sync) {
            cmd.execute()
        } else {
            cmd.executeAsync()
        }
    })
}