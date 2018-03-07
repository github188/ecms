// 请求
import Fetch from "./fetch";
import config from "./config";
import { Message } from "element-ui";
export const $http = (params, json = { sync: false, error: false }) => {
  return new Promise((resolve, reject) => {
    let fetch = new Fetch("pm", "ProjectManager");
    Object.assign(fetch, params);
    fetch.success = res => resolve(res);
    fetch.error = err => (json.error ? Message.error(err) : reject(err));
    if (json.sync) {
      fetch.execute();
    } else {
      fetch.executeAsync();
    }
  });
};
// 将返回结果fs,rs转化为json数组的形式,传入一个含有fs和rs属性的对象
export const $dataFormat = ({ rs, fs }) => {
  return rs.map(item => {
    let temp = {};
    fs.forEach((v, index) => {
      temp[v.name] = item[index];
    });
    return temp;
  });
};
//日期小于10的加0
const formatTen = function(num) {
  return num > 9 ? num + "" : "0" + num;
};

//将中国标准时间转换成yyyy-mm-dd
export const $formatDate = function(date) {
  if (date) {
    if(!isNaN(Number(date))){
      date = Number(date);
    }
    date = new Date(date);
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var hour = date.getHours();
    var minute = date.getMinutes();
    var second = date.getSeconds();
    return year + "-" + formatTen(month) + "-" + formatTen(day);
  } else {
    return date;
  }
};

// 获取图片的地址；
export const $getImageURL = function(picurl) {
  if (!picurl) {
    return "";
  }
  let appHost = config.appHost;
  let appRoot = config.appRoot;
  let temp = picurl.split(".");
  if (temp.length === 1) {
    picurl += ".jpg";
  }
  return `http://${appHost}${appRoot}/image?module=common&service=File&method=view&type=UserImg&fileName=${picurl}`;
};

// 图片上传地址
export const $getUploadURL = function() {
  let appHost = config.appHost;
  let appRoot = config.appRoot;
  return `http://${appHost}${appRoot}/data?module=common&service=File&method=upLoadImg&type=UserImg`;
};
