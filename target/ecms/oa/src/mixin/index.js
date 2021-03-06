const domain = require('static/js/config')
module.exports = {
    data() {
        return {
            appRoot: domain.appRoot,
            domain: domain.appHost + domain.appRoot, //获取接口地址，其他页面就不用引入config了
            domain2: domain._appHost + domain._appRoot,
            avatar: '/authority/user/picture/head/',
            disable: false, //按钮禁止使用，发起请求之后的等待时间不可用
        }
    },
    methods: {
        /**
         * @description递归删除json返回的空children
         * @params Array
         * @return Array
         */
        delTree(data) {
            for (var i = 0; i < data.length; i++) {
                if (data[i].children.length > 0) {
                    this.delTree(data[i].children)
                } else {
                    delete data[i].children
                }
            }
            return data
        },
        /**
         * @description 返回tree结构对应key value的 父级key的数组
         * @param {Object} json 需要递归的json
         * @param {string} key  对应的key
         * @param {any} value 对应的value
         * @returns {array} 数组
         */
        parentTree(json, key, value) {
            let arr = []
            for (let index = 0; index < json.length; index++) {
                let element = json[index]
                if (element[key] == value) {
                    arr.push(value)
                } else if (element.children) {
                    let temp = this.parentTree(element.children, key, value)
                    temp.length ? arr.push(element[key]) : null
                    arr = arr.concat(temp)
                    if (arr.length) break
                }
            }
            return arr
        },
        /**
         * @description 重置表单数据
         * @param {string} name form的ref属性
         */
        resetForm(name) {
            this.$refs[name] && this.$refs[name].resetFields()
        },
        /**
         *  @description 请求处理成功后的消息提示
         *  @param {string} name  提示的文字
         */
        successTips(name) {
            this.$message({
                type: 'success',
                message: name || '操作成功!',
            })
        },
        /**
         *  @description 请求处理失败后的消息提示
         *  @param {string} name  提示的文字
         */
        errorTips(name) {
            this.$message({
                message: name || '操作失败!',
                type: 'warning',
            })
        },
        /**
         *  @description 确认框
         *  @param {string} name  提示的文字
         */
        confirmTips({ title = '提示', customClass = '', btn = ['确定', '取消'], content, submit, cancel, beforeClose } = {}) {
            this.$confirm(content, title, {
                confirmButtonText: btn[0],
                cancelButtonText: btn[1],
                customClass: customClass + ' common-confirm',
                type: 'warning',
                beforeClose(action, instance, done) {
                    if (beforeClose) {
                        beforeClose()
                    }
                    done()
                },
            })
                .then(() => {
                    submit()
                })
                .catch(() => {
                    if (cancel) {
                        cancel()
                    }
                })
        },
        /**
         *  @description 获取用户头像
         *  @param {Object} data 用户个人信息
         * @param {normal} data 是否原图
         */
        getAvatar(data, { width = 200, height = 200, normal = true } = {}) {
            //normal-原图
            let { headPic, sex } = data
            if (headPic != undefined) {
                if (headPic.indexOf('default') != -1 || headPic == '') {
                    if (sex == 1) {
                        return this.domain + '/static/img/man-default.png'
                    } else {
                        return this.domain + '/static/img/male-default.png'
                    }
                } else {
                    return normal ?
                        this.domain + this.avatar + headPic + '/download' :
                        this.domain + this.avatar + headPic + '/download?width=' + width + '&height=' + height + ''
                }
            }
        },

        /**
         *  @description 获取当前用户所拥有的操作权限
         *  @param {Function} 回调函数
         */
        getButton(call) {
            let { query } = this.$route
            this.ajax({
                url: '/authority/resource/user/resources',
                data: {
                    resourceId: query.id,
                },
                success(data, $this) {
                    if (data.code == 'success') {
                        let content = data.content.filter(item => {
                            return item.status == 0
                        })
                        call(content)
                    }
                },
            })
        },
        /**
         *  @description 格式化时间，不带秒
         *  @param {time} 时间戳
         *  @return {str} 格式化时间，不带秒
         */
        getTimeNoSecond(time) {
            if (time) {
                return new Date(time).toStr(true).slice(0, 16)
            } else {
                return false
            }
        },
        /**
         *  @description 格式化时间
         *  @param {time} 时间戳
         *  @return {str} 小时和分钟
         */
        getTimeMinutes(time) {
            if (time) {
                return new Date(time).toStr(true).slice(10, 16)
            } else {
                return false
            }
        },
        /**
         *  @description 获取附件，导出excel表等...例如合同附件等，需要权限才能下载的
         *  @param {url} 地址
         *  @param {name} 文件名称、包括后缀名（如果是导出则不需要name）
         */
        downFile(url, name, call) {
            const xhr = new XMLHttpRequest()
            xhr.open('get', this.domain + url, true)
            xhr.setRequestHeader('authorization', Utils.getValue('authorization'))
            xhr.responseType = 'blob'
            xhr.onload = function () {
                if (this.status == 200) {
                    let blob = new Blob([this.response])
                    let fileName = name || decodeURI(xhr.getResponseHeader('Content-disposition').split('"')[1])
                    if ('msSaveOrOpenBlob' in navigator) {
                        let url = window.navigator.msSaveOrOpenBlob(blob, fileName)
                    } else {
                        let link = document.createElement('a')
                        link.download = fileName
                        link.style.display = 'none'
                        link.href = URL.createObjectURL(blob)
                        document.body.appendChild(link)
                        link.click()
                        document.body.removeChild(link)
                    }
                    call && call()
                }
            }
            xhr.send()
        },
        /**
         *  @description 获取附件上传文件或下载文件地址
         *  @param  module, service, method,fileName为true表示下载
         *  @return {url} 地址
         */
        getUploadUrl(module, service, method, fileName) {
            let type = ''
            let params = {
                module,
                service,
                method,
                t: Utils.getValue('t'),
                u: Utils.getValue('u'),
                v: Utils.getValue('v'),
            }
            if (fileName) {
                type = 'downClient'
                params['fileName'] = fileName
            } else {
                type = 'upClient'
            }
            let url = `${domain._appHost + domain._appRoot}/${type}${this.getParams(params)}`
            return url
        },
        /**
         *  @description 三级部门位置反转
         *  @param {Stringn} 三级部门
         *  @return {String}
         */
        reverseDepart(depart) {
            return (
                depart &&
                depart.split('-').reverse().join('-')
            )
        },
        /**
         * @description 将对象转换成查询条件的形式 ?name="name"&age="age"
         * @param {*查询的参数条件} object
         */
        getParams(object) {
            let params = '?'
            for (let i in object) {
                if (object[i] !== '' && object[i] !== null) {
                    params += i + '=' + object[i] + '&'
                }
            }
            return params.substring(0, params.length - 1)
        },
        dealVideo(){},
        /**
         *@param 处理图片的缩略图
         */
        dealImg(content) {
            let loadingImg = this.appRoot + '/static/img/loading.gif'
            let reg = /<img(.*?)>/g
            return content.replace(reg, function (match, capture) {
                let img = $(match.replace('src', 'data-src'))
                let src = img.attr('data-src').replace(/oa.ecaray.com/g, function () {
                    return 'eap.ecaray.com'
                })
                let klass = img.attr('class')
                let width = img.attr('data-width')
                let height = img.attr('data-height')
                let style = img.attr('style')
                let size = img.attr('data-size')
                let scale = width / 680
                let ws = parseInt(width / scale)
                let hs = parseInt(height / scale)
                if(!size){  //动画图片
                    return match
                }
                if (size / 1024 >= 500 && (width >= 800 || height >= 800)) {
                    //大于150kb的做缩略图处理
                    return `<img class="thumb-img ${klass}" style="${style}" src="${loadingImg}" data-original="${src}" data-src="${src}?width=${ws}&height=${hs}"/>`
                } else {
                    return `<img src="${loadingImg}" class="thumb-img ${klass}" style="${style}" data-original="${src}" data-src="${src}"/>`
                }
            })
        },
    },
}