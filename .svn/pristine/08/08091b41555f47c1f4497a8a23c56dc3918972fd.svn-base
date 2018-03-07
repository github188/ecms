$$ = function (str) {
    var eleId = str;
    if (str.indexOf("#") == 0) {
        eleId = str.substr(1);
    }
    return document.getElementById(eleId);
};

// --------------------------------------------
// 将JSON字符串格式为对象
// --------------------------------------------
String.prototype.toObject = function () {
    var obj = eval("(" + this + ")");
    return obj;
};


/**************************************** 金额相关-属性 ****************************************/

// --------------------------------------------
// 将金额转换成汉字大写
// --------------------------------------------
Number.prototype.toUpcase = function () {
    var num = Math.abs(this);
    var strOutput = "";
    var strUnit = "仟佰拾亿仟佰拾万仟佰拾元角分";
    num += "00";
    var intPos = num.indexOf(".");
    if (intPos >= 0) {
        num = num.substring(0, intPos) + num.substr(intPos + 1, 2);
    }
    strUnit = strUnit.substr(strUnit.length - num.length);
    for (var i = 0; i < num.length; i++) {
        strOutput += "零壹贰叁肆伍陆柒捌玖".substr(num.substr(i, 1), 1)
            + strUnit.substr(i, 1);
    }
    return strOutput.replace(/零角零分$/, "整").replace(/零[仟佰拾]/g, "零").replace(
        /零{2,}/g, "零").replace(/零([亿|万])/g, "$1").replace(/零+元/, "元")
        .replace(/亿零{0,3}万/, "亿").replace(/^元/, "零元");
};

// --------------------------------------------
// 金额按进制格式化
// --------------------------------------------
Number.prototype.format = function (decimal) {
    var number = this;
    return number / Math.pow(10, bidInfo.decimal);
};

// --------------------------------------------
// 金额按进制格式化，并添加千分符
// --------------------------------------------
Number.prototype.formatStr = function (decimal) {
    var number = this;
    var s1 = number / Math.pow(10, bidInfo.decimal);
    return s1.addComma();
};

// --------------------------------------------
// 金额添加千分点
// --------------------------------------------
Number.prototype.addComma = function () {
    var number = this;
    if (number == 0 || Utils.isNullorEmpty(this)) {
        return "0.00";
    }
    var num = number + "";
    num = num.replace(new RegExp(",", "g"), "");
    // 正负号处理
    var symble = "";
    if (/^([-+]).*$/.test(num)) {
        symble = num.replace(/^([-+]).*$/, "$1");
        num = num.replace(/^([-+])(.*)$/, "$2");
    }
    if (/^[0-9]+(\.[0-9]+)?$/.test(num)) {
        var num = num.replace(new RegExp("^[0]+", "g"), "");
        if (/^\./.test(num)) {
            num = "0" + num;
        }
        var decimal = num.replace(/^[0-9]+(\.[0-9]+)?$/, "$1");
        var integer = num.replace(/^([0-9]+)(\.[0-9]+)?$/, "$1");
        decimal = Utils.isNullorEmpty(decimal) ? ".00" : decimal;
        var re = /(\d+)(\d{3})/;
        while (re.test(integer)) {
            integer = integer.replace(re, "$1,$2");
        }
        return symble + integer + decimal;
    } else {
        return number;
    }
};

// --------------------------------------------
// 删除千分点
// --------------------------------------------
String.prototype.removeComma = function () {
    var num = this.replace(new RegExp(",", "g"), "");
    return num;
};

/**************************************** 时间相关-属性 ****************************************/

// --------------------------------------------
// 剩余时间（判断天时分秒，并对应显示天时分秒）
// --------------------------------------------
Number.prototype.restTime = function () {
    var leave = this;
    var day = Math.floor(leave / (1000 * 60 * 60 * 24));
    var hour = Math.floor(leave / (1000 * 3600)) - (day * 24);
    var minute = Math.floor(leave / (1000 * 60)) - (day * 24 * 60)
        - (hour * 60);
    var second = Math.floor(leave / (1000)) - (day * 24 * 60 * 60)
        - (hour * 60 * 60) - (minute * 60);
    var s1 = '';
    if (day > 0)
        s1 += day + '天';
    if (hour > 0)
        s1 += hour + '小时';
    if (minute > 0)
        s1 += minute + '分';
    if (second > 0)
        s1 += second + '秒';
    return s1;
};

// --------------------------------------------
// 剩余时间（判断天时分，并对应显示天时分，只有当天小于0时，判断是否显示秒）
// --------------------------------------------
Number.prototype.restTimeNotSecond = function () {
    var leave = this;
    var day = Math.floor(leave / (1000 * 60 * 60 * 24));
    var hour = Math.floor(leave / (1000 * 3600)) - (day * 24);
    var minute = Math.floor(leave / (1000 * 60)) - (day * 24 * 60)
        - (hour * 60);
    var second = Math.floor(leave / (1000)) - (day * 24 * 60 * 60)
        - (hour * 60 * 60) - (minute * 60);
    var s1 = '';
    if (day > 0)
        s1 += day + '天';
    if (hour >= 0)
        s1 += hour + '小时';
    if (minute >= 0)
        s1 += minute + '分';
    if (day <= 0) {
        if (second > 0)
            s1 += second + '秒';
    }
    return s1;
};

//数字添加千分点不带小数
Number.prototype.addCommaNum = function () {
    var number = this;
    if (number == 0 || Utils.isNullorEmpty(this)) {
        return "0";
    }
    var num = number + "";
    num = num.replace(new RegExp(",", "g"), "");
    // 正负号处理
    var symble = "";
    if (/^([-+]).*$/.test(num)) {
        symble = num.replace(/^([-+]).*$/, "$1");
        num = num.replace(/^([-+])(.*)$/, "$2");
    }
    if (/^[0-9]+(\.[0-9]+)?$/.test(num)) {
        var num = num.replace(new RegExp("^[0]+", "g"), "");
        if (/^\./.test(num)) {
            num = "0" + num;
        }
        var decimal = num.replace(/^[0-9]+(\.[0-9]+)?$/, "$1");
        var integer = num.replace(/^([0-9]+)(\.[0-9]+)?$/, "$1");
        decimal = Utils.isNullorEmpty(decimal) ? "" : decimal;
        var re = /(\d+)(\d{3})/;
        while (re.test(integer)) {
            integer = integer.replace(re, "$1,$2");
        }
        return symble + integer + decimal;
    } else {
        return number;
    }
};

// --------------------------------------------
// 持续时间
// --------------------------------------------
Number.prototype.durationTime = function () {
    var leave = this;
    var s1 = '';
    if (leave * 1 < 0) {
        leave = leave * -1;
        s1 += '-';
    }
    var hour = Math.floor(leave / (1000 * 3600));
    var minute = Math.floor(leave / (1000 * 60)) - (hour * 60);
    var second = Math.floor(leave / (1000)) - (hour * 60 * 60) - (minute * 60);

    if (hour >= 10) {
        s1 += hour + ':';
    } else if (hour > 0) {
        s1 += "0" + hour + ':';
    } else {
        s1 += "00:"
    }
    if (minute >= 10) {
        s1 += minute + ':';
    } else if (minute > 0) {
        s1 += "0" + minute + ':';
    } else {
        s1 += "00:"
    }
    if (second >= 10) {
        s1 += second;
    } else if (second > 0) {
        s1 += "0" + second;
    } else {
        s1 += "00";
    }
    return s1;
};

// --------------------------------------------
// 格式化字符串为时间格式
// --------------------------------------------
String.prototype.toDate = function () {
    var arr1 = this.split(" ")[0].split("-");
    var arr2 = this.split(" ")[1].split(":");
    var year = parseFloat(arr1[0]);
    var month = parseFloat(arr1[1]);
    var date = parseFloat(arr1[2]);
    var hours = parseFloat(arr2[0]);
    var minutes = parseFloat(arr2[1]);
    var seconds = parseFloat(arr2[2]);
    var myDate = new Date(year, month - 1, date, hours, minutes, seconds);
    return myDate;
};

// --------------------------------------------
// 字符串的时间转换为日期（不含时分秒）
// --------------------------------------------
String.prototype.toTime = function () {
    var arr1 = this.split("-");
    var year = parseFloat(arr1[0]);
    var month = parseFloat(arr1[1]);
    var date = parseFloat(arr1[2]);
    var myDate = new Date(year, month - 1, date);
    return myDate.getTime();
};

// --------------------------------------------
// 标准时间格式转换为时间戳（含时分秒）
// --------------------------------------------
String.prototype.toSecTime = function () {
    var arr = this.split(" ");
    var arr1 = arr[0].split("-");
    var arr2 = arr[1].split(":");
    var year = parseFloat(arr1[0]);
    var month = parseFloat(arr1[1]);
    var date = parseFloat(arr1[2]);
    var hour = parseFloat(arr2[0]);
    var min = parseFloat(arr2[1]);
    var sec = parseFloat(arr2[2]);
    var myDate = new Date(year, month - 1, date, hour, min, sec);
    return myDate.getTime();
};

// --------------------------------------------
// 原时间增加月数
// --------------------------------------------
String.prototype.addMonth = function (aM) {
    var arr = this.split("-");
    var year = parseFloat(arr[0]);
    var month = parseFloat(arr[1]) - 1 + parseFloat(aM);
    var date = parseFloat(arr[2]);
    var newDate = new Date(year, month);
    newDate.setDay(date);
    return newDate.toDay();
};

// --------------------------------------------
// 原时间增加天数
// --------------------------------------------
String.prototype.addDays = function (days) {
    var d1 = this.toDate().getTime();
    var v = d1 + days * 1000 * 60 * 60 * 24;
    var d2 = new Date(v);
    return d2.toString();
};

// --------------------------------------------
// 比较两个时间相差的天数
// --------------------------------------------
String.prototype.diffDay = function (smallDay) {
    var largeTime = this.toTime();
    var smallTime = smallDay.toTime();
    var diffDay = (largeTime - smallTime) / 1000 / 24 / 3600;
    return diffDay;
};

// --------------------------------------------
// 格式化时间戳为时间格式（yyyy-MM-dd HH:mm:ss）
// --------------------------------------------
Date.prototype.type = 'date';
Date.prototype.toString = function () {
    var s = "";
    s += this.getFullYear();
    if (this.getMonth() < 9) {
        s += "-0" + (this.getMonth() + 1);
    } else {
        s += "-" + (this.getMonth() + 1);
    }
    if (this.getDate() < 10) {
        s += "-0" + this.getDate();
    } else {
        s += "-" + this.getDate();
    }
    if (this.getHours() < 10) {
        s += " 0" + this.getHours();
    } else {
        s += " " + this.getHours();
    }
    if (this.getMinutes() < 10) {
        s += ":0" + this.getMinutes();
    } else {
        s += ":" + this.getMinutes();
    }
    if (this.getSeconds() < 10) {
        s += ":0" + this.getSeconds();
    } else {
        s += ":" + this.getSeconds();
    }
    return s;
};

// --------------------------------------------
// 格式化时间戳为日期格式（yyyy-MM-dd）
// --------------------------------------------
Date.prototype.toDay = function () {
    var s = '';
    var year = this.getFullYear();
    var month = this.getMonth();
    var date = this.getDate();
    s += year;
    s += month < 9 ? '-0' + (month + 1) : '-' + (month + 1);
    s += date < 10 ? '-0' + date : '-' + date;
    return s;
};

// --------------------------------------------
// 设置日期（尚不明确具体作用）
// --------------------------------------------
Date.prototype.setDay = function (newDate) {
    var year = this.getFullYear();
    var month = this.getMonth();
    var dateArr = [[31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
        [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]];
    var leap = ((year % 4 == 0 && year % 100 !== 0) || year % 400);
    var date = dateArr[!leap - 0][month];
    this.setDate(date > newDate ? newDate : date);
};

// --------------------------------------------
// 格式化日期格式为中文（yyyy年mm月dd日）
// --------------------------------------------
Date.prototype.toZnDay = function () {
    var s = '';
    var year = this.getFullYear();
    var month = this.getMonth();
    var date = this.getDate();
    s += year + '年';
    s += (month + 1) + '月';
    s += date + '日';
    return s;
};

// --------------------------------------------
// 格式化日期格式为中文,并根据时间区分早中晚
// --------------------------------------------
Date.prototype.toDayTime = function () {
    var s = this.toZnDay();
    var h = this.getHours();
    var m = this.getMinutes();
    if (h >= 2 && h < 5) {
        s += "凌晨";
    } else if (h >= 5 && h < 8) {
        s += "早晨";
    } else if (h >= 8 && h < 12) {
        s += "上午";
    } else if (h >= 12 && h < 14) {
        s += "中午";
    } else if (h >= 14 && h < 17) {
        s += "下午";
    } else if (h >= 17 && h < 19) {
        s += "傍晚";
    } else if (h >= 19 && h < 23) {
        s += "晚上";
    } else {
        s += "深夜";
    }
    if (h > 12) {
        h = h - 12;
    }
    s += "  " + h + ":" + m;
    return s;
};

// --------------------------------------------
// 获取当前时间所在月份的第一天
// --------------------------------------------
Date.prototype.toFirstTime = function () {
    var d = this;
    return new Date(d.setDate(1)).toDay();
};

// --------------------------------------------
// 获取当前时间所在月份的最后一天
// --------------------------------------------
Date.prototype.toLastTime = function () {
    var d = this;
    var c_month = d.getMonth();//当前月
    var n_month = ++c_month;
    var n_month_firstday = new Date(d.getFullYear(), n_month, 1);
    var f_day = 1000 * 60 * 60 * 24;
    var l_day = new Date(n_month_firstday - f_day);
    return new Date(n_month_firstday - f_day).toDay();
};

/**************************************** 数字相关-属性 ****************************************/

// --------------------------------------------
// 判断是否为数字
// --------------------------------------------
String.prototype.isNumber = function () {
    if (this.trim().length == 0)
        return false;
    return !isNaN(this);
};

// --------------------------------------------
// 检测保留n位小数
// --------------------------------------------
Number.prototype.nDigits = function (n) {
    var b = this.toFixed(n);
    var bn = parseFloat(b);
    if (this == bn)
        return true;
    else
        return false;
};

// --------------------------------------------
// 加法
// --------------------------------------------
Number.prototype.add = function (value) {
    var arg1 = this;
    var arg2 = value;
    var r1, r2, m;
    try {
        r1 = arg1.toString().split(".")[1].length;
    } catch (e) {
        r1 = 0;
    }
    try {
        r2 = arg2.toString().split(".")[1].length;
    } catch (e) {
        r2 = 0;
    }
    m = Math.pow(10, Math.max(r1, r2));
    return (arg1.mul(m) + arg2.mul(m)).div(m);
};

// --------------------------------------------
// 减法
// --------------------------------------------
Number.prototype.sub = function (value) {
    return this.add(-value);
};

// --------------------------------------------
// 除法
// --------------------------------------------
Number.prototype.div = function (value) {
    var arg1 = this;
    var arg2 = value;
    var t1 = 0, t2 = 0, r1, r2;
    try {
        t1 = arg1.toString().split(".")[1].length;
    } catch (e) {
    }
    try {
        t2 = arg2.toString().split(".")[1].length;
    } catch (e) {
    }
    with (Math) {
        r1 = Number(arg1.toString().replace(".", ""));
        r2 = Number(arg2.toString().replace(".", ""));
        return (r1 / r2) * pow(10, t2 - t1);
    }
};

// --------------------------------------------
// 乘法
// --------------------------------------------
Number.prototype.mul = function (value) {
    var arg1 = this;
    var arg2 = value;
    var m = 0, s1 = arg1.toString(), s2 = arg2.toString();
    try {
        m += s1.split(".")[1].length;
    } catch (e) {
    }
    try {
        m += s2.split(".")[1].length;
    } catch (e) {
    }
    return Number(s1.replace(".", "")) * Number(s2.replace(".", ""))
        / Math.pow(10, m);
};

/**************************************** 字符串相关-属性 ****************************************/

// 验证字符串是否只能包含数字和英文字母
String.prototype.isNumOrABC = function () {
    var reg = new RegExp("^[0-9a-zA-Z]+$");
    return reg.test(this);
};

// --------------------------------------------
// 子字符串出现位置（可忽略大小写），如："abcdefg".indexOfIgnoreCase("cd", 1, true)
// --------------------------------------------
String.prototype.indexOfIgnoreCase = function () {
    if (typeof (arguments[arguments.length - 1]) != 'boolean')
        return this.indexOf.apply(this, arguments);
    else {
        var bi = arguments[arguments.length - 1];
        var thisObj = this;
        var idx = 0;
        if (typeof (arguments[arguments.length - 2]) == 'number') {
            idx = arguments[arguments.length - 2];
            thisObj = this.substr(idx);
        }
        var re = new RegExp(arguments[0], bi ? 'i' : '');
        var r = thisObj.match(re);
        return r == null ? -1 : r.index + idx;
    }
};

// --------------------------------------------
// 格式化字符串，如"abcd{0}efg{1}hijk{2}".format("111", "222",
// "333")-->"abcd111efg222hijk333"
// --------------------------------------------
String.prototype.format = function () {
    if (arguments.length == 0)
        return this;
    for (var s = this, i = 0; i < arguments.length; i++)
        s = s.replace(new RegExp("\\{" + i + "\\}", "g"), arguments[i]);
    return s;
};

// --------------------------------------------
// 字符串替换全部
// --------------------------------------------
String.prototype.replaceAll = function (s1, s2) {
    // return this.replace(new RegExp(s1, "gm"), s2); //特殊字符失败
    var r = new RegExp(s1.replace(/([\(\)\[\]\{\}\^\$\+\-\*\?\.\"\'\|\/\\])/g,
        "\\$1"), "ig");
    return this.replace(r, s2);
};

// --------------------------------------------
// 去除左右空格
// --------------------------------------------
String.prototype.trim = function () {
    return this.replace(/(^\s*)|(\s*$)/g, "");
};

// --------------------------------------------
// 去除左空格
// --------------------------------------------
String.prototype.ltrim = function () {
    return this.replace(/^\s*/g, "");
};

// --------------------------------------------
// 去除右空格
// --------------------------------------------
String.prototype.rtrim = function () {
    return this.replace(/\s*$/g, "");
};

// --------------------------------------------
// 去除所有空格
// --------------------------------------------
String.prototype.trimAll = function () {
    return this.replace(/\s*/g, "");
};

// --------------------------------------------
// 将HTML转义为实体
// --------------------------------------------
String.prototype.escapeHtml = function () {
    var s = "";
    if (this.length == 0) return "";
    s = this.replace(/&/g, "&amp;");
    s = s.replace(/</g, "&lt;");
    s = s.replace(/>/g, "&gt;");
    s = s.replace(/ /g, "&nbsp;");
    s = s.replace(/\'/g, "&#39;");
    s = s.replace(/\"/g, "&quot;");
    s = s.replace(/\n/g, "<br>");
    return s;
};

// --------------------------------------------
// 将实体转回为HTML
// --------------------------------------------
String.prototype.unescapeHtml = function () {
    var s = "";
    if (this.length == 0) return "";
    s = this.replace(/&amp;/g, "&");
    s = s.replace(/&lt;/g, "<");
    s = s.replace(/&gt;/g, ">");
    s = s.replace(/&nbsp;/g, " ");
    s = s.replace(/&#39;/g, "\'");
    s = s.replace(/&quot;/g, "\"");
    s = s.replace(/<br>/g, "\n");
    return s;
};

/**************************************** 字符串转换-函数 ****************************************/

var Utils = {};
// --------------------------------------------
// 将字符串转换为javascript对象
// --------------------------------------------
Utils.parse = function (str) {
    var obj = null;
    if (str) {
        obj = eval("(" + str + ")");
    }
    return obj;
};

/**
 * 金额转换保留小数点
 * @param s 数据值
 * @param n 保留小数位
 * @returns {string}
 */
Utils.fmoney = function(s,n){
    if(s<0){
        s*=-1;
        n = n > 0 && n <= 20 ? n : 2;
        s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";
        var l = s.split(".")[0].split("").reverse(), r = s.split(".")[1];
        t = "";
        for (i = 0; i < l.length; i++) {
            t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");
        }
        var result=t.split("").reverse().join("") + "." + r;
        return '-'+result;
    }else {
        n = n > 0 && n <= 20 ? n : 2;
        s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";
        var l = s.split(".")[0].split("").reverse(), r = s.split(".")[1];
        t = "";
        for (i = 0; i < l.length; i++) {
            t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");
        }
        return t.split("").reverse().join("") + "." + r;
    }
};

// --------------------------------------------
// 将HTML转义为实体
// --------------------------------------------
Utils.escapeHtml = function (htmlStr) {
    var s = "";
    if (htmlStr.length == 0) return "";
    s = htmlStr.replace(/&/g, "&amp;");
    s = s.replace(/</g, "&lt;");
    s = s.replace(/>/g, "&gt;");
    s = s.replace(/ /g, "&nbsp;");
    s = s.replace(/\'/g, "&#39;");
    s = s.replace(/\"/g, "&quot;");
    s = s.replace(/\n/g, "<br>");
    return s;
};

// --------------------------------------------
// 将实体转回为HTML
// --------------------------------------------
Utils.unescapeHtml = function (str) {
    var s = "";
    if (str.length == 0) return "";
    s = str.replace(/&amp;/g, "&");
    s = s.replace(/&lt;/g, "<");
    s = s.replace(/&gt;/g, ">");
    s = s.replace(/&nbsp;/g, " ");
    s = s.replace(/&#39;/g, "\'");
    s = s.replace(/&quot;/g, "\"");
    s = s.replace(/<br>/g, "\n");
    return s;
};

// --------------------------------------------
// 处理参数中单/双引号问题
// --------------------------------------------
Utils.EscapeChar = function (str) {
    if ($.inArray("'", str) != -1) {
        //转换半角单引号
        str = str.replace(/\'/g, "&acute;");
    }
    if ($.inArray('"', str) != -1) {
        //转换半角双引号
        str = str.replace(/\"/g, "&quot;");
    }
    return str;
};

// --------------------------------------------
// 车牌加入空格
// --------------------------------------------
Utils.valueSpace = function (outputStr) {
    if (outputStr != "" && outputStr.length > 2) {
        outputStr = outputStr.substring(0, 2) + ' '
            + outputStr.substring(2, outputStr.length)
    }
    return outputStr;
};

// --------------------------------------------
// 判断字符是否为空
// --------------------------------------------
Utils.isNullorEmpty = function (str) {
    if ((str == null || str == "null" || str == "" || str == " " || str == undefined || str == "undefined") && (str != 0 || str != "0"))
        return true;
    else
        return false;
};

// --------------------------------------------
// 数组去重
// --------------------------------------------
Utils.arrayUnique = function (array) {
    var res = [];
    var json = {};
    for (var i = 0; i < array.length; i++) {
        if (!json[array[i]]) {
            res.push(array[i]);
            json[array[i]] = 1;
        }
    }
    return res;
};

/**************************************** 页面公共方法-函数 ****************************************/

// --------------------------------------------
// 参数下拉框绑定
// --------------------------------------------
Utils.getParameterList = function (str) {
    var apphtml = "<option value=''>--请选择--</option>";
    var cmd = new Command('rsys', 'Parameter', 'getParameterList');
    cmd.comid = Utils.getValue("comid");
    cmd.paratype = str;
    cmd.success = function (data) {
        Utils.renderFs(data);
        for (var i = 0; i < data.rs.length; i++) {
            var row = data.rs[i];
            var id = Utils.getRowValue(row, 'paravalue');
            var name = Utils.getRowValue(row, 'paraname');
            apphtml += "<option value='" + id + "'>" + name + "</option>";
        }
    };
    cmd.execute();
    return apphtml;
};

// --------------------------------------------
// textArea换行符转<br/>
// --------------------------------------------
Utils.encodeTextAreaString = function (str) {
    var reg = new RegExp("\n", "g");
    str = str.replace(reg, "<br/>");
    return str;
};

// --------------------------------------------
// <br/> 转 textArea换行符
// --------------------------------------------
Utils.decodeTextAreaString = function (str) {
    var reg = new RegExp("<br/>", "g");
    str = str.replace(reg, "\n");
    return str;
};

// --------------------------------------------
// 退出
// --------------------------------------------
Utils.logout = function (v, h, f) {
    window.parent.jBox.close();//关闭所有的弹出窗口

    if (v) {
        Utils.clearValue();
        //location.href = "login.html";
        var url = location.protocol + "//";
        if (appHost) {
            url += appHost;
        }
        else {
            url += location.host;
        }
        if (appPort) {// 端口号
            url += ":" + appPort;
        }
        if (approot != '/system') {
            url += approot;
        }
        if (location.pathname.indexOf("/man/") >= 0) {
            url += "/man";
        }
        if (location.pathname.indexOf("/pcoupon/") >= 0) {
            url += "/pcoupon";
        }
        url += "/index.html";
        window.parent.location.href = url;
        window.parent.window.jBox.close();
        location.href = url;
    }
};

// --------------------------------------------
// 输入框placeHolder兼容
// --------------------------------------------
Utils.placeHolder = function ($input, classname) {
    var supportPlaceholder = 'placeholder' in document.createElement('input');
    if (!supportPlaceholder) {
        var msg = $input.attr("placeholder");
        if (msg != "undefine") {
            var $tip = $('<span class="' + classname + '">' + msg + '</span>');
            $input.after($tip);
            $.data($input[0], 'tip', $tip);
            if ($input.val() != '') {
                $tip.hide();
            }
            $tip.click(function () {
                $input.focus();
            });
            $tip.mousedown(function (e) {
                if (3 == e.which) {
                    $tip.hide();
                }
                $tip.focus();
            });
            $input.on('keyup paste mouseup', function (e) {
                if (e.which != 13) {
                    clearTimeout(timeout);
                    var timeout = setTimeout(function () {
                        var val = $input.val();
                        if (val == '') {
                            $tip.show();
                        } else {
                            $tip.hide();
                        }
                    }, 0);
                } else {
                    $("#btnsearch").click();
                }
            });
        }
    } else {
        $input.on('keyup', function (e) {
            if (e.which == 13) {
                $("#btnsearch").click();
            }
        });
    }
};

// --------------------------------------------
// 打开页面权限验证
// --------------------------------------------
Utils.permissionVerify = function (pageUrl) {
    var cmd = new Command('comp', 'User', 'getPermission');
    cmd.userid = Utils.getValue("u");
    cmd.username = Utils.getValue("username");
    cmd.comid = Utils.getValue("comid");
    cmd.pageurl = pageUrl;
    cmd.success = function (data) {
        if (data.permission == 0) {
            // 没有权限时
            Utils.clearValue();
            var url = location.protocol + "//";
            if (appHost)
                url += appHost;
            else
                url += location.host;
            if (appPort)
                url += ":" + appPort;
            if (approot != '/system') {
                url += approot;
            }
            url += "/index.html";
            location.href = url;
        }
    };
    cmd.execute();
};
/**
 * 过滤HTML标签
 * @returns {String}
 */
Utils.filterHtmlTag = function (str) {
    str = typeof str == 'string' ? str.replace(/<\/?[^>]*>/g, '') : str;
    return str.trimAll();
};
// --------------------------------------------
// 页面回车事件
// --------------------------------------------
Utils.enterClick = function (inputclass, btnclass) {
    // 键盘回车
    $(inputclass).keyup(function (e) {
        var code;
        if (!e) {
            var e = window.event;
        }
        if (e.keyCode) {
            code = e.keyCode;
        }
        else if (e.which) {
            code = e.which;
        }
        if (code == 13) {
            $(btnclass).click();
        }
    });
};

// --------------------------------------------
// 列表checkBox全选传参(obj：点击的jquery对象;arr：一个存ID的数组)
// --------------------------------------------
Utils.checkThead = function (obj, arr) {
    var btr = $(obj).parents("table").find("tbody tr");
    var $this = $(obj).find(".ace");
    arr = arr ? arr : [];
    arr = Utils.arrayUnique(arr);
    if ($this.prop('checked')) {
        $this.prop('checked', false);
        btr.parents("tbody").find(".ace").prop('checked', false);
        for (var i = 0; i < btr.length; i++) {
            var id = $(btr).eq(i).find(".hidden").val();
            arr.splice($.inArray(id, arr), 1); //如果数据存在，删除数据
        }
    } else {
        $this.prop('checked', true);
        btr.parents("tbody").find(".ace").prop('checked', true);
        for (var i = 0; i < btr.length; i++) {
            arr.push($(btr).eq(i).find(".hidden").val());
        }
    }
    arr = Utils.arrayUnique(arr);
    return arr;
};

// --------------------------------------------
// 列表checkBox单选选传参(obj：点击的jquery对象;arr：一个存ID的数组)
// --------------------------------------------
Utils.checkTbody = function (obj, arr) {
    arr = arr ? arr : [];
    arr = Utils.arrayUnique(arr);
    var $tr = $(obj).parents("tr").length > 0 ? $(obj).parents("tr") : $(obj);
    var $this = $tr.find(".ace");
    if ($this.prop('checked')) {
        $this.prop('checked', false);
        var id = $tr.find(".hidden").val();
        arr.splice($.inArray(id, arr), 1);
    } else {
        $this.prop('checked', true);
        arr.push($tr.find(".hidden").val());
    }
    var a = $(obj).parents("tbody").find("tr .ace").length;
    if ($(obj).parents("tbody").find(".ace:checked").length == a) {
        $(obj).parents("table").find("thead").find(".ace").prop('checked', true);
    } else {
        $(obj).parents("table").find("thead").find(".ace").prop('checked', false);
    }
    arr = Utils.arrayUnique(arr);
    return arr;
};

/**************************************** 数据取值-函数 ****************************************/

// --------------------------------------------
// 获取地址栏参数值
// --------------------------------------------
Utils.getLocationPara = function (name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null)
        return unescape(r[2]);
    return null;
};

// --------------------------------------------
// 获取记录字段值
// --------------------------------------------
Utils.getRecordValue = function (data, recordNo, fieldName) {
    if (data.fs && data.rs) {
        var index = $.inArray(fieldName, data.fs);
        if (index > -1 && recordNo < data.rs.length) {
            return data.rs[recordNo][index];
        }
    }
    return null;
};

// --------------------------------------------
// 获取当前时间
// --------------------------------------------
Utils.now = function () {
    return (new Date()).getTime();
};

// --------------------------------------------
// 获取GUID，secure值为true则返回值中不包含“-”，不传同true
// --------------------------------------------
Utils.newGUID = function (secure) {
    var guid = "";
    var splitChar = "";
    if (secure != undefined && secure == false)
        splitChar = "-";
    for (var i = 0; i < 8; i++) {
        var randomValue = (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
        guid += randomValue;
        if (i == 1 || i == 2 || i == 3 || i == 4)
            guid += splitChar;
    }
    return guid.toUpperCase();
};

// --------------------------------------------
// 获取服务器当前时间（含时分秒）
// --------------------------------------------
Utils.serverTime = function () {
    var cmd = new Command("sys", "Time", "getTime");
    var sTime = 0;
    cmd.success = function (data) {
        sTime = data.time;
    };
    cmd.execute();
    return sTime;
};

// --------------------------------------------
// 获取服务器当前日期（不含时分秒）
// --------------------------------------------
Utils.serverDate = function () {
    var cmd = new Command("sys", "Time", "getDate");
    var sTime = "";
    cmd.success = function (data) {
        sTime = data.time;
    };
    cmd.execute();
    return sTime;
};

// --------------------------------------------
/**cookie相关设置*/
Utils.cookiesfalg = 'carServ'; //cookies标识

Utils.setTimeValue = function (name, value, time) {
    if (!(document.cookie || navigator.cookieEnabled)) {
        return;
    }
    if (!name || !value) {
        return;
    }
    var str = (this.cookiesfalg ? (this.cookiesfalg + '_' + name) : name ) + "=" + escape(value);
    if (time != null) {
        var d = new Date();
        d.setHours(d.getHours() + time);
        str = str + ";expires=" + d.toGMTString() + ";path=/";
    }
    document.cookie = str;

};
/**
 * 设置cookies值
 * @param name
 * @param value
 */
Utils.setValue = function (name, value) {
    if (!(document.cookie || navigator.cookieEnabled)) {
        alert('cookie已禁用');
    }
    if (!name || !value) {
        return;
    }
    document.cookie = (this.cookiesfalg ? (this.cookiesfalg + '-' + name ) : name ) + "=" + escape(value) + ";path=/";
};
/**
 * 获取cookies值
 * @param name
 * @returns {string}
 */
Utils.getValue = function (name) {
    if (!(document.cookie || navigator.cookieEnabled)) {
        alert('cookie已禁用');
    }
    var arrStr = document.cookie.split("; ");
    name = this.cookiesfalg ? (this.cookiesfalg + '-' + name) : name;
    for (var i = 0; i < arrStr.length; i++) {
        var temp = arrStr[i].split("=");
        if (temp[0] == name) {
            if (temp[1] == "undefined" || temp[1] == "null") {
                return "";
            }
            return unescape(temp[1]);
        }
    }
    return ""

};
/**
 * 清除cookies
 * @returns {string}
 */
Utils.clearValue = function () {
    if (!(document.cookie || navigator.cookieEnabled)) {
        alert('cookie已禁用');
    }
    var arrStr = document.cookie.split("; ");
    for (var i = 0; i < arrStr.length; i++) {
        var temp = arrStr[i].split("=");
        if(temp[0] != 'carServ-email') {
            var bf = this.cookiesfalg ? (temp[0].indexOf(this.cookiesfalg) != -1) : true;
            if (bf) {
                document.cookie = temp[0] + "=0" + ";expires="
                    + new Date(0).toGMTString() + ";path=/";
            }
        }
    }
    return ""

};

/**
 * 清除某一项cookie
 */
Utils.delCookie = function(name) {
    document.cookie = 'carServ-' + name + "=0" + ";expires="
        + new Date(0).toGMTString() + ";path=/";
};

/**************************************** 请求与响应-函数 ****************************************/

// --------------------------------------------
// request参数加密
// --------------------------------------------
Utils.sign = function (cmdObj) {
    var content = Utils.sortUrl(cmdObj);
    var newArr = [];
    var intArr = Utils.getArray();
    for (var i = 0; i < intArr.length; i++) {
        newArr.push(String.fromCharCode(intArr[i]));
    }
    content += newArr.join("");
    var sign = $.md5(content);
    return sign;
};

// --------------------------------------------
// 获取request服务器地址
// --------------------------------------------
Utils.getHomeUrl = function (root, type) {
    var url = location.protocol + "//";
    if (appHost)
        url += appHost;
    else
        url += location.host;
    if (appPort)
        url += ":" + appPort;
    url += root + type;
    return url;
};

Utils.setTimeValue = function (name, value, time) {
    if (!(document.cookie || navigator.cookieEnabled)) {
        return;
    }
    if (!name || !value) {
        return;
    }
    var str = name + "=" + escape(value);
    if (time != null) {
        var d = new Date();
        d.setHours(d.getHours() + time);
        str = str + ";expires=" + d.toGMTString() + ";path=/";
    }
    document.cookie = str;
};

// --------------------------------------------
// 拼接请求地址
// --------------------------------------------
Utils.sortUrl = function (cmdObj) {
    var arr1 = [];
    for (var pro in cmdObj) {
        arr1.push(pro);
    }
    arr1.sort(function (a, b) {
        return a.split("=")[0] > b.split("=")[0] ? 1 : -1;
    });
    var arr2 = [];
    for (var i = 0; i < arr1.length; i++) {
        var key = arr1[i];
        var value = cmdObj[key];
        if (typeof (value) != 'function')
            arr2.push(key + "=" + value);
    }
    return arr2.join("&");
};

Utils.getArray = function () {
    var spiltStr = [];
    spiltStr.push(38, 114, 101, 113, 117, 101, 115, 116, 75, 101, 121, 61);
    spiltStr.push(68, 51, 48, 50, 57, 67, 55, 51, 52, 48, 54, 50);
    spiltStr.push(50, 49, 66, 48, 50, 48, 50, 54, 66, 54, 56);
    spiltStr.push(52, 66, 66, 48, 48, 53, 55, 57, 67);
    return spiltStr;
};

// --------------------------------------------
// 获取request各项参数值（同步方法调用）
// --------------------------------------------
Utils.syncCmdObj = function (cmdObj) {
    cmdObj.ve = 2;
    cmdObj['ms'] = Utils.now();
    cmdObj['clientType'] = 'html';
    if (typeof (cmdObj['u']) == "undefined")
        cmdObj['u'] = Utils.getValue("u");
    if (typeof (cmdObj['t']) == "undefined")
        cmdObj['t'] = Utils.getValue("t");
    if (typeof (cmdObj['v']) == "undefined")
        cmdObj['v'] = Utils.getValue("v");
    if (typeof (cmdObj['comid']) == "undefined")
        cmdObj['comid'] = Utils.getValue("comid");
};

// --------------------------------------------
// 获取request各项参数值（异步方法调用）
// --------------------------------------------
Utils.asynCmdObj = function (cmdObj) {
    cmdObj.ve = 2;
    cmdObj['ms'] = Utils.now();
    cmdObj['clientType'] = 'html';
    if (typeof (cmdObj['u']) == "undefined")
        cmdObj['u'] = Utils.getValue("u");
    if (typeof (cmdObj['v']) == "undefined")
        cmdObj['v'] = Utils.getValue("v");
    if (typeof (cmdObj['comid']) == "undefined")
        cmdObj['comid'] = Utils.getValue("comid");
};

/**
 * 功能：调用公用参数下拉框
 * @param opts object
 * @selector string 容器
 * @explain string 下拉框说明
 * @method string 请求方法
 * @reqParam obj 请求参数
 * @调用 Utils.getListParameter({
        selector : "#express",
        explain : "请选择快递公司",
        reqParam : {
            paracode : "express"
        }
    });
 * */
Utils.getListParameter = function (opts) {
    var selector = opts.selector,
        explain = opts.explain,
        method = opts.method,
        dataParam = opts.reqParam;
    $(selector).empty();
    var cmd,
        arr=[];
    if (method){
        arr = method.split(".");
        cmd = new Command(arr[0], arr[1], arr[2]);
    }else{
        cmd = new Command("sys", "Parameter", "getListParameter");
    }
    for(var value in dataParam){
        cmd[value] = dataParam[value];
    }
    cmd.success = function (data) {
        Utils.renderFs(data);
        var rs = data.rs,
            ohtml = '<option value="">' + explain + '</option>';
        for (var i = 0, len = rs.length; i < len; i++) {
            var row = rs[i],
                paracnname = Utils.getRowValue(row, "paracnname"),
                paravalue = Utils.getRowValue(row, "paravalue");
            ohtml += '<option value="' + paravalue + '">' + paracnname + '</option>';
        }
        $(selector).append(ohtml);
    };
    cmd.execute();
};

// --------------------------------------------
// 向后端获取数据
// --------------------------------------------
function Command(module, service, method) {
    this.module = module;
    this.service = service;
    this.method = method;
}

// --------------------------------------------
// 同步方法
// --------------------------------------------
Command.prototype.execute = function () {
    var cmdObj = this;
    var type = "/data";
    if (cmdObj.stype) {
        type = cmdObj.stype;
        delete cmdObj.stype;
    }
    var xhttp;
    try {
        Utils.syncCmdObj(cmdObj);
        var arr = [];
        for (var pro in cmdObj) {
            var obj = cmdObj[pro];
            var value = obj;
            if ($.isArray(obj)) {
                value = obj.join(",");
            }
            if (obj && obj.type == "date") {
                value = obj.toString();
            }
            if ($.isPlainObject(obj) || $.isFunction(obj) || pro == "type") {
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
        var root = approot;
        if ('root' in cmdObj)
            root = cmdObj.root;
        var url = Utils.getHomeUrl(root, type);
        var sign = Utils.sign(cmdObj);
        var content = arr.join('&');
        content += '&sign=' + sign;
        switch (type) {
            case "/data":
                xhttp.open('post', url, false);// 同步方式请求
                xhttp.setRequestHeader('Content-type',
                    'application/x-www-form-urlencoded');
                xhttp.send(content);
                break;
            case "/downClient":
                url += '?' + content;
                window.open(url);
                break;
        }
        if (cmdObj.success) {
            var res = xhttp.responseText;
            if (res.indexOf("0x04") != -1 || res.indexOf("0x02") != -1) {
                if ($("#modalout").length > 0) {
                    $("#modalout").modal();
                    $(".logout-sure").off().on("click", function () {
                        Utils.clearValue();
                        location.href = "index.html";
                    });
                }
                else {
                    Utils.jBoxConfirm();//您的账号在别处上线，请重新登录
                }
            }

            var data = Utils.parse(xhttp.responseText);
            if ('u' in data)
                Utils.setValue("u", data.u);
            if ('t' in data)
                Utils.setValue("t", data.t);
            cmdObj.success(data);
        }
    } catch (ex) {
        if (cmdObj.error) {
            var textStatus = "";
            var errorThrown = "";
            cmdObj.error(xhttp, textStatus, errorThrown)
        }
    } finally {
        if (cmdObj.complete) {
            cmdObj.complete(xhttp);
        }
    }
};

// --------------------------------------------
// 异步方法
// --------------------------------------------
Utils.fff = {};
Command.prototype.executeAsync = function ($box) {
    var cmdObj = this;
    var xhttp;
    if ($box) {
        var apphtml = $box.html();
        $box.html("<i class='fa fa-spin fa-spinner asyDiv'></i>");
    }
    try {
        Utils.asynCmdObj(cmdObj);
        var arr = [];
        for (var pro in cmdObj) {
            var obj = cmdObj[pro];
            var value = obj;
            if ($.isArray(obj)) {
                value = obj.join(",");
            }
            if (obj && obj.type == "date") {
                value = obj.toString();
            }
            if ($.isPlainObject(obj) || $.isFunction(obj) || pro == "type") {
                continue;
            }
            arr.push(encodeURIComponent(pro) + "=" + encodeURIComponent(value));
        }
        if (window.XMLHttpRequest) {
            xhttp = new XMLHttpRequest()
        } else {
            xhttp = new ActiveXObject("Microsoft.XMLHTTP")
        }
        if (cmdObj.beforeSend)
            cmdObj.beforeSend(xhttp);
        var url = Utils.getHomeUrl(approot, '/data');
        var content = arr.join('&');
        var sign = Utils.sign(cmdObj);
        content += '&sign=' + sign;
        xhttp.open('post', url, true);// 异步方法
        xhttp.setRequestHeader('Content-type',
            'application/x-www-form-urlencoded');
        xhttp.send(content);
        xhttp.onreadystatechange = function () {
            if (xhttp.readyState == 4 && xhttp.status == 200) {
                if (cmdObj.success) {
                    try {
                        if ($box)
                            $box.html(apphtml);

                        var dataStr = xhttp.responseText;
                        if (dataStr.indexOf("0x04") != -1
                            || dataStr.indexOf("0x02") != -1) {
                            Utils.jBoxConfirm();//您的账号在别处上线，请重新登录
                        }

                        var dataObj = Utils.parse(dataStr);
                        var key = cmdObj.module + "." + cmdObj.service + "."
                            + cmdObj.method;
                        if (!Utils.fff[key])
                            Utils.fff[key] = -1;
                        if (!(dataObj.st && dataObj.st < Utils.fff[key])) {
                            cmdObj.success(dataObj, dataStr);
                            Utils.fff[key] = data.st;
                        }
                        if ('u' in dataObj)
                            Utils.setValue("u", dataObj.u);
                        if ('t' in dataObj)
                            Utils.setValue("t", dataObj.t);
                    } catch (e) {
                    }
                }
            }
        };
        if (cmdObj.complete) {
            cmdObj.complete(xhttp);
        }
    } catch (ex) {
        if (cmdObj.error) {
            cmdObj.error(xhttp);
        }
    }
};

// --------------------------------------------
// 渲染FS
// --------------------------------------------
Utils.renderFs = function (data) {
    this.fs = new Object();
    var fs = data['fs'];
    for (var i = 0; i < fs.length; i++) {
        this.fs[fs[i]['name']] = i;
    }
};

// --------------------------------------------
// 根据属性获取标识
// --------------------------------------------
Utils.getFsIndex = function (name) {
    return this.fs[name];
};

// --------------------------------------------
// 获取属性对应值
// --------------------------------------------
Utils.getRowValue = function (row, name) {
    var value = '';
    if (row != '' && row != null && row != undefined) {
        value = row[this.getFsIndex(name)];
    }
    return value;
};

//账号同时登录时提示
Utils.jBoxConfirm = function () {
    var ohtml = '<div class="modal fade" id="jBoxConfirm" data-backdrop="static" style="z-index: 99999">' +
        '<div class="modal-dialog w350">' +
        '<div class="modal-content">' +
        '<div class="modal-header">' +
        '<button class="close" data-dismiss="modal"><span>&times;</span></button>' +
        '<h4 class="modal-title">温馨提示</h4>' +
        '<input type="hidden" class="actid"></div>' +
        '<div class="modal-body">' +
        '<div class="data-messege"><p class="msg-info">您的账号在别处上线，请重新登录。</p></div></div>' +
        '<div class="modal-footer">' +
        '<input type="button" class="but but-save" style="background: #01cd78;" name="submit" onclick="Utils.againLogin()" value="确 认">' +
        '</div></div></div></div>';

    $("body").append(ohtml);
    $("#jBoxConfirm").modal('show');
};

//确认重新登录
Utils.againLogin = function () {
    $("#loginModal").modal("hide");
    Utils.clearValue();
    location.href = "index.html";
};

// --------------------------------------------
// 获取当前pageId
// --------------------------------------------
$("#main-menu").on("click", "a", function () {
    var url = $(this).attr("url"),
        pageId = $(this).parent("li").attr("data-id");
    if (Utils.isNullorEmpty(url))
        return false;
    Utils.setValue("pageId", pageId);
});

Utils.getNowPower = function () {
    var pageId = Utils.getValue("pageId");
    //获取当前页面权限ID
    var cmd = new Command('rcomp', 'User', 'getUserOpResByMenuId');
    cmd.pageid = pageId;
    cmd.success = function (data) {
        Utils.renderFs(data);
        var power = [], check = 0;
        data.rs.forEach(function (row) {
            var content = Utils.getRowValue(row, "content");
            power.push(content);
        });
    };
    //cmd.execute();
};
/**接口错误信息提出框*/
Utils.AlertCallBack= function (remsg) {
    if(remsg=='身份验证失败!'){
        Utils.clearValue();
        window.location.href='../../index.html';
    }
    $("#error-remind").modal('hide');
};
Utils.Alert= function (msg,title) {
    var title=title||'提示';
    var html='<div id="error-remind" class="modal fade bs-example-modal-sm" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel">'+
        '<div class="modal-dialog modal-sm" role="document"><div class="modal-content">'+
        '<div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>'+
        '<h4 class="modal-title" id="mySmallModalLabel">'+title+'</h4></div>'+
        '<div class="modal-body">'+msg+
        '<div><button style="outline: none;border: none;background: #01cd78;color: #fff;display: block;width: 100%;line-height: 30px;border-radius: 6px;margin-top: 10px"'+
        ' onclick="Utils.AlertCallBack(\'' + msg + '\')">确定</button></div>'+'</div></div></div></div>';
    $("body").append(html);
    $("#error-remind").modal('show');
};
/**
 * 获取用户头像
 */
Utils.getAvatar = function(user, w, h){
    var sex, headPic;
    if(typeof user == 'object'){
        sex = user.sex;
        headPic = user.headPic;
    }else {
        sex = Utils.getValue('sex');
        headPic = Utils.getValue('headPic');
    }
    var url = appHost + approot + "/authority/user/picture/head/" + headPic+ "/download";
    if(w && h){
        url += '?width='+ w +'&height=' + h;
    }
    if(headPic.split('.')[1] !== 'png' && headPic != ''){
        return url;
    }
    if (sex == 2) {
        return 'skins/img/male-default.png';
    }
    if (sex == 1) {
        return 'skins/img/man-default.png';
    }
    return 'skins/img/man-default.png';
};
Utils.getFile = function (obj) {
    var xhr = new XMLHttpRequest();
    xhr.open("get", appHost + approot + obj.url, true);
    xhr.setRequestHeader("authorization", Utils.getValue('authorization'));
    xhr.responseType = "blob";
    xhr.onload = function() {
        var name = '';
        if(obj.export){
            name = decodeURI(xhr.getResponseHeader('Content-disposition').split('"')[1]);
        }else{
            name = obj.name;
        }
        if (this.status == 200) {
            // var blob = new Blob([ this.response], {type: type[file]}),
            var link = document.createElement('a');
            var blob = new Blob([ this.response]);
            function downFile(fileName) {
                link.download = fileName;
                link.style.display = 'none';
                link.href = URL.createObjectURL(blob);
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }
            downFile(name);
        }
    };
    xhr.send();
};

Utils.getImage = function (url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open("get", appHost + approot +  url, true);
    xhr.setRequestHeader("authorization", Utils.getValue('authorization'));
    xhr.responseType = "blob";
    xhr.onload = function() {
        if (this.status == 200) {
            var blob = new Blob([ this.response]);
            var img = document.createElement("img");
            img.onload = function(e) {
                callback(window.URL.createObjectURL(blob));
                window.URL.revokeObjectURL(img.src);
            };
            img.src = window.URL.createObjectURL(blob);
        }
    };
    xhr.send();
};