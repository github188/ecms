/*var Utils = {};
// --------------------------------------------
// 判断字符是否为空
// --------------------------------------------
Utils.isNullorEmpty=function(str){
  if((str==null||str=="null"||str==""||str==" "||str==undefined||str=="undefined")&&(str!=0||str!="0"))
    return true;
  else
    return false;
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
    if (Utils.isNullorEmpty(value)) {
      value = "";
    }
  }
  return value;
};*/

/*
 //下面三个方法，是用导出函数的方式向外暴露，调用时就直接 函数名(参数) 这样调用。比如：renderFs(data)
 export default function renderFs(data) {
 this.fs = new Object();
 var fs = data['fs'];
 for (var i = 0; i < fs.length; i++) {
 this.fs[fs[i]['name']] = i;
 }
 };
 export default function getFsIndex(name) {
 return this.fs[name];
 };
 export default function getRowValue(row, name) {
 var value = '';
 if (row != '' && row != null && row != undefined) {
 value = row[this.getFsIndex(name)];
 if (Utils.isNullorEmpty(value)) {
 value = "";
 }
 }
 return value;
 };
 */

//用导出一个对象的方式向外暴露，调用时就直接 Utils.函数名(参数) 这样调用。
// import Utils from '@/utils/utils'; Utils.renderFs(data)
import Fetch from "./fetch";
import { Message } from "element-ui";
export default {
  isNullorEmpty: function(str) {
    if ((str == null || str == "null" || str == "" || str == " " || str == undefined || str == "undefined") && (str != 0 || str != "0")) return true;
    else return false;
  },
  renderFs: function(data) {
    //渲染FS
    this.fs = new Object();
    var fs = data["fs"];
    for (var i = 0; i < fs.length; i++) {
      this.fs[fs[i]["name"]] = i;
    }
  },
  getFsIndex: function(name) {
    //根据属性获取标识
    return this.fs[name];
  },
  getRowValue: function(row, name) {
    //获取属性对应值
    var value = "";
    if (row != "" && row != null && row != undefined) {
      value = row[this.getFsIndex(name)];
      if (this.isNullorEmpty(value)) {
        value = "";
      }
    }
    return value;
  },
  // 请求
  http: function(params, json = { sync: false, error: false, down: false }) {
    return new Promise((resolve, reject) => {
      let fetch = new Fetch();
      Object.assign(cmd, params);
      fetch.success = res => resolve(res);
      fetch.error = err => (json.error ? Message.error(err) : reject(err));
      if (json.sync) {
        fetch.execute();
      } else {
        fetch.executeAsync();
      }
    });
  },
  // 将返回结果fs,rs转化为json数组的形式
  dataFormat: function({ rs, fs }) {
    return rs.map(item => {
      let temp = {};
      obj.fs.forEach((v, index) => {
        temp[v.name] = item[index];
      });
      return temp;
    });
  },
};
