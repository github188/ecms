/**
 * Created by Administrator on 2017/4/12.
 */
function CommandAjax(url) {
    this.url = url;
}

Utils.fff = [];
CommandAjax.prototype.executeAsync = function () {
    var cmdObj = this;
    var xhttp = {};
    var type = "/imspmo";
    try {
        var arr = [];
        for (var pro in cmdObj) {
            var obj = cmdObj[pro];
            var value = obj;
            if (obj instanceof Array) {
                value = obj.join(",");
            }
            if (obj && obj.type == "date") {
                value = obj.toString();
            }
            if (obj.constructor === Object || Object.prototype.toString.call(obj) === '[object Function]' || pro == "type" || pro == "url") {
                continue;
            }
            arr.push(pro + "=" + encodeURIComponent(value));
        }
        if (window.XMLHttpRequest) {
            xhttp = new XMLHttpRequest()
        } else {
            xhttp = new ActiveXObject("Microsoft.XMLHTTP")
        }
        if (cmdObj.beforeSend)
            cmdObj.beforeSend(xhttp);
        // var url = appHost_imspmo + approot_imspmo + this.url;
        // var url = appHost + approot + this.url;
        var url = this.url;
        var content = arr.join('&');
        content = arr.length > 0 ? "?" + content : "";
        xhttp.open('get', url + content, true);// 异步方式请求
        if (!Utils.isNullorEmpty(Utils.getValue('authorization'))) {
            xhttp.setRequestHeader('authorization', Utils.getValue('authorization'));
        } else {
            xhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        }
        xhttp.send();
        xhttp.onreadystatechange = function () {
            if (xhttp.readyState == 4 && xhttp.status == 200) {
                if (cmdObj.success) {
                    try {
                        var dataStr = xhttp.responseText;
                        var dataObj = Utils.parse(dataStr);
                        cmdObj.success(dataObj, dataStr);
                    } catch (e) {
                    }
                }
            }
        }
    } catch (ex) {
        if (cmdObj.error) {
            var textStatus = "";
            var errorThrown = "";
            cmdObj.error(xhttp, textStatus, errorThrown);
        }
    } finally {
        if (cmdObj.complete) {
            cmdObj.complete(xhttp);
        }
    }
}

CommandAjax.prototype.execute = function () {
    var cmdObj = this;
    var xhttp = {};
    var type = "/imspmo";
    try {
        var arr = [];
        for (var pro in cmdObj) {
            var obj = cmdObj[pro];
            var value = obj;
            if (obj instanceof Array) {
                value = obj.join(",");
            }
            if (obj && obj.type == "date") {
                value = obj.toString();
            }
            if (obj.constructor === Object || Object.prototype.toString.call(obj) === '[object Function]' || pro == "type" || pro == "url") {
                continue;
            }
            arr.push(pro + "=" + encodeURIComponent(value));
        }
        if (window.XMLHttpRequest) {
            xhttp = new XMLHttpRequest()
        } else {
            xhttp = new ActiveXObject("Microsoft.XMLHTTP")
        }
        if (cmdObj.beforeSend)
            cmdObj.beforeSend(xhttp);
        // var url = appHost_imspmo + approot_imspmo + this.url;
        // var url = appHost + approot + this.url;
        var url = this.url;
        var content = arr.join('&');
        content = arr.length > 0 ? "?" + content : "";
        switch (type) {
            case "/data":
                xhttp.open('get', url, false);// 同步方式请求
                if (!Utils.isNullorEmpty(Utils.getValue('authorization'))) {
                    xhttp.setRequestHeader('authorization', Utils.getValue('authorization'));
                } else {
                    xhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
                }
                xhttp.send(content);
                break;
            case "/downClient":
                url += '?' + content;
                window.open(url);
                break;
        }
    } catch (ex) {
        if (cmdObj.error) {
            var textStatus = "";
            var errorThrown = "";
            cmdObj.error(xhttp, textStatus, errorThrown);
        }
    } finally {
        if (cmdObj.complete) {
            cmdObj.complete(xhttp);
        }
    }
}