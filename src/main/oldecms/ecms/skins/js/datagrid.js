/*
 *   亿车列表控件 1.0
 *   createtime：2015-4-30
 */
var chmDataDrid = {};
chmDataDrid.globalParamer = {};
chmDataDrid.gindex = 1;
chmDataDrid.method = "";
jQuery.fn.extend({
  datagrid: function (par) {
    if ($(this).length == 0 || $(this)[0].id == undefined) {
      return false;
    }
    if (par.reqdata.method != chmDataDrid.method) {
      chmDataDrid.gindex = 1;
    }
    //赋值
    par.targetID = $(this)[0].id;
    chmDataDrid.globalParamer[par.targetID] = $(this).tableHandler.requestParam(par);
    chmDataDrid.method = par.reqdata.method;
    return $(this).tableHandler.tableCreation(par.targetID);
  },
  reload: function () {
    if ($(this).length == 0 || $(this)[0].id == undefined) {
      return false;
    }
    return $(this).tableHandler.tableCreation($(this)[0].id);
  }

});
//表格处理类
jQuery.fn.tableHandler = {
  //id
  getId: '',
  //请求参数
  requestParam: function (param) {
    param = jQuery.extend({
      targetID: "", //绑定目标容器ID
      columns: [],  // 列头显示
      width: undefined,  // 表格宽度
      height: undefined,   //表格高度
      type: "get", //请求类型，默认get请求
      url: "",    //参数url 请求地址
      async: true, //请求是否同步 (默认: true) 默认设置下，所有请求均为异步请求。如果需要发送同步请求，请将此选项设置为 false。注意，同步请求将锁住浏览器，用户其它操作必须等待请求完成才可以执行。
      reqdata: {},//请求参数
      resultData: null, //结果数据，于url互斥，有resultData,url 无效,
      isPage: true, //默认分页
      pageNum: chmDataDrid.gindex, //第几页  默认为第1页
      pageSize: 10,  //页码大小 默认为10
      rowNumber: true,  //默认加行号
      isShowHeadEnd: true,  //默认加入首尾页
      isShowCheckBox: true,//是否显示多选，默认显示
      isShowRadio: false,
      nodatasType: {
        height: '70px',
        width: 'auto',
        lineheight: '70px',
        spanweight: '400',
        spansize: '14px',
        textalign: 'center'
      }, //没数据显示样式
      settingsPageSize: true,  //默认带设置分页规格控件
      inputPageNumber: true,   //输入页码跳转控件
      displayPageSummary: true, //默认带分页信息概要
      viewPageNumber: true,    //是否显示页面
      showLoading: true,       //显示加载载入图片
      showNoData: true,       //显示没有数据提示
      overflow: 'visible',		//显示内容不会被修剪，会呈现在元素框之外                  [visible] 默认值。内容不会被修剪，会呈现在元素框之外。 [hidden] 内容会被修剪，并且其余内容是不可见的。 [scroll] 内容会被修剪，但是浏览器会显示滚动条以便查看其余的内容。 [auto] 如果内容被修剪，则浏览器会显示滚动条以便查看其余的内容。[inherit] 规定应该从父元素继承 overflow 属性的值。
      textOverflow: 'clip',      // 属性规定当文本溢出包含元素时发生的事情  clip|ellipsis|string; 修剪文本|显示省略符号来代表被修剪的文本|使用给定的字符串来代表被修剪的文

      //-----------------------------------事件
      onResponse: null,//回调处理
      onComplete: null, //请求完成后处理
    }, param || {});

    return param;
  },
  //表头拼接
  headerJoin: function (par) {
    var atrrList = [];
    atrrList.push('<table class="dataTable" cellspacing="0" width="100%" ');
    if (par.width != undefined)
      atrrList.push('style="width:' + par.width + ';');
    if (par.height != undefined)
      atrrList.push('height:' + par.height + ';"');
    atrrList.push('><thead><tr>');
    var columns = par.columns;
    if (columns.length > 0) {
      if (par.isShowCheckBox)
        atrrList.push('<th style="text-align:center; width: 40px;"><div class="checkbox"><label><input id="checkall" name="form-field-checkbox" type="checkbox" class="ace checkall"><span class="lbl"></span></label></div></th>');
      if (par.isShowRadio)
        atrrList.push('<th style="text-align:center; width: 40px;"></th>');
      if (par.rowNumber)
        atrrList.push('<th style="text-align: center; width: 65px;">序号</th>');
      for (var i = 0; i < columns.length; i++) {
        atrrList.push('<th style=" ');
        if (columns[i].align != undefined)
          atrrList.push('text-align: ' + columns[i].align + ';');
        if (columns[i].width != undefined)
          atrrList.push('width: ' + columns[i].width + ';');
        if (columns[i].maxWidth != undefined)
          atrrList.push('max-width: ' + columns[i].maxWidth + ';');
        if (columns[i].minWidth != undefined)
          atrrList.push('min-width: ' + columns[i].minWidth + ';');
        if (columns[i].overflow != undefined)
          atrrList.push('overflow: ' + columns[i].overflow + ';');
        if (columns[i].textOverflow != undefined)
          atrrList.push('text-overflow: ' + columns[i].textOverflow + ';');
        atrrList.push('"> ');
        if (columns[i].display != undefined)
          atrrList.push(columns[i].display);

        atrrList.push('</th> ');
      }
      atrrList.push('</tr></thead>');
    }
    return atrrList.join('');
  },
  //内容拼接
  tbodyJoin: function (par, datas) {
    var atrrList = [];
    var columns = par.columns;
    if (columns.length > 0 && !$.isEmptyObject(datas)) {
      if (datas.content != undefined && datas.content.length > 0) {
        atrrList.push('<tbody>');
        for (var r = 0; r < datas.content.length; r++) {
          //判断是否是租金，如果是租金 则这一行会隐藏
          if (columns[0].render != undefined) {
            var colRow = columns[0].render(datas.content[r]);
            if (colRow.indexOf("test rent") != -1) {
              atrrList.push('<tr style="display: none;">');
            } else {
              atrrList.push('<tr>');
            }
          } else {
            atrrList.push('<tr>');
          }
          if (par.isShowCheckBox)
            atrrList.push('<td style="text-align: center;"><div class="checkbox"><label><input name="form-field-checkbox" type="checkbox" class="ace checkone"><span class="lbl"></span></label></td> ');
          if (par.isShowRadio)
            atrrList.push('<td style="text-align: center;"><div class="radio"><label><input name="form-field-radia" type="radio" class="ace"><span class="lbl"></span></label></td> ');
          if (par.rowNumber)
            atrrList.push('<td style="text-align: center;">' + (r + 1) + '</td> ');
          for (var i = 0; i < columns.length; i++) {
            atrrList.push('<td style=" ');
            if (columns[i].align != undefined)
              atrrList.push('text-align: ' + columns[i].align + ';');
            if (columns[i].width != undefined)
              atrrList.push('width: ' + columns[i].width + ';');
            if (columns[i].maxWidth != undefined)
              atrrList.push('max-width: ' + columns[i].maxWidth + ';');
            if (columns[i].minWidth != undefined)
              atrrList.push('min-width: ' + columns[i].minWidth + ';');
            if (columns[i].overflow != undefined)
              atrrList.push('overflow: ' + columns[i].overflow + ';');
            if (columns[i].textOverflow != undefined)
              atrrList.push('text-overflow: ' + columns[i].textOverflow + ';');
            atrrList.push('"> ');
            if (columns[i].render != undefined) {
              atrrList.push(columns[i].render(datas.content[r]))
            } else {
              var v=datas.content[r][columns[i].name];
              if(!Utils.isNullorEmpty(v)){
                atrrList.push(v)
              }
            }
          }
          atrrList.push('</tr>');
        }
      }
    }
    atrrList.push('</tbody></table>');
    return atrrList.join('');
  },
  //动态生成tables
  tableCreation: function (targeid) {
    this.getId = targeid;
    var par = chmDataDrid.globalParamer[targeid];
    //请求处理数据
    this.urlRequest(par);
  },
  //url请求数据
  urlRequest: function (par) {
    par.reqdata.pageNum = par.pageNum;
    par.reqdata.pageSize = par.pageSize;
    if (par.resultData == undefined) {
      var cmd = new CommandAjax(par.reqdata.url);
      cmd.pageNum = par.pageNum;
      cmd.pageSize = par.pageSize;
      //处理其他请求参数
      for (var oth in par.reqdata) {
        if (oth == "url") {
          continue;
        }
        cmd[oth] = par.reqdata[oth];
      }
      cmd.success = function (result) {
        $("#" + par.targetID).tableHandler.filldatas(par, result);
        if (!Utils.isNullorEmpty(chmDataDrid.method) && par.reqdata.method == chmDataDrid.method)
          chmDataDrid.gindex = par.pageNum;
        else
          chmDataDrid.method = 1;
        Utils.getNowPower();
      }
      cmd.executeAsync();
    } else {
      if (typeof (par.resultData) != "object") {
        par.resultData = eval('(' + par.resultData + ')');
      }
      this.filldatas(par, par.resultData);
    }
  },
  //填充拼接数据
  filldatas: function (par, result) {
    var arrlist = [];
    //表头
    arrlist.push(this.headerJoin(par));
    //判断数据类型
    if (typeof (result) != "object")
      result = eval('(' + result + ')');
    if (result == null || $.isEmptyObject(result) || result.content == undefined || result.content.length <= 0) {
      //没有结果显示
      $("#" + par.targetID).parent().next(".page").hide();
      arrlist.push(this.nodataView(par));
      //页面输出
      document.getElementById(par.targetID).innerHTML = arrlist.join("");
      if (par.onComplete != undefined && typeof (par.onComplete) == "function")
        par.onComplete(result);

    } else {
      //预先处理
      if (par.onResponse != undefined && typeof (par.onResponse) == "function")
        result = par.onResponse(result);
      //拼接内容
      arrlist.push(this.tbodyJoin(par, result));
      //页面输出
      document.getElementById(par.targetID).innerHTML = arrlist.join("");
      //完成处理
      if (par.onComplete != undefined && typeof (par.onComplete) == "function")
        par.onComplete(result);
      //处理分页信息
      if (par.isPage) {
        this.pageInfo(par, result.pageIndex, result.totals)
      }
    }
  },
  //没有数据显示
  nodataView: function (par) {
    var con = par.columns.length;
    if (par.rowNumber)
      con++;
    if (par.isShowCheckBox)
      con++;
    if (par.isShowRadio)
      con++;
    var trStr = '<tr><th class="nodata" colspan="' + con + '" style="background:#fff;height:' + par.nodatasType.height + ';width:' + par.nodatasType.width + ';span-weight:' + par.nodatasType.spanweight + ';span-size:' + par.nodatasType.spansize + ';text-align:' + par.nodatasType.textalign + ';line-height:' + par.nodatasType.lineheight;
    trStr += '">没有查询到相关数据</th></tr>';
    return trStr;
  },
  //分页信息
  pageInfo: function (par, currentPage, totalCount) {
    //最初分页位置
    //$("#" + par.targetID).append('<div id="page" class="page"><div id="' + par.targetID + 'pagecontrol" class="clearfix"></div></div>'); //自动添加分页信息
    $("#" + par.targetID).parent().next().remove();
    $("#" + par.targetID).parent().after('<div id="page" class="page"><div id="' + par.targetID + 'pagecontrol" class="clearfix"></div></div>'); //自动添加分页信息

    $("#" + par.targetID + "pagecontrol").pagination(totalCount,
      {
        items_per_page: par.pageSize,
        current_page: currentPage - 1,
        callback: $("#" + par.targetID).tableHandler.pageCallBack,
        target: par.targetID,
        settingsPageSize: par.settingsPageSize, //默认有带设置分页规格控件
        displayPageSummary: par.displayPageSummary, //默认带分页信息概要
        viewPageNumber: par.viewPageNumber   //是否显示页面
      });
  },
  //分页回调函数
  pageCallBack: function (pageNum) {
    var indexs = parseInt(pageNum);
    if (indexs >= 0) {
      chmDataDrid.globalParamer[this.target].pageNum = pageNum + 1;
      $("#" + this.target).tableHandler.tableCreation(this.target)
    }
  }
}
//设置一页显示多少信息
function setpageSize(bt, targetid, isNumber) {
  var size = $(bt).val();
  if (isNumber) {
    chmDataDrid.globalParamer[targetid].pageNum = size;
  } else {
    chmDataDrid.globalParamer[targetid].pageSize = size;
    chmDataDrid.globalParamer[targetid].pageNum = 1;
  }
  $("#" + targetid).tableHandler.tableCreation(targetid);
  var contentheight = $("#divmaicontent").outerHeight();
  if (contentheight > 630) {
    $(".main").css("height", contentheight + 80);
    $(".content").css("height", contentheight + 80);
    $(".lefttop").css("height", contentheight + 80);
  } else {
    $(".main").css("height", "670px");
    $(".content").css("height", "670px");
    $(".lefttop").css("height", "670px");
  }
}

//输入页码后点击按钮进行跳转
function setPgIndex(bt) {
  var abled = $(bt).attr("disabled");
  var size = $(bt).prev(".ipages").val().trim();
  if (abled || Utils.isNullorEmpty(size)) {
    return false;
  }
  var targetid = $(bt).parents("span").attr("data-target");
  chmDataDrid.globalParamer[targetid].pageNum = size;
  $("#" + targetid).tableHandler.tableCreation(targetid);
  var contentheight = $("#divmaicontent").outerHeight();
  if (contentheight > 630) {
    $(".main").css("height", contentheight + 80);
    $(".content").css("height", contentheight + 80);
    $(".lefttop").css("height", contentheight + 80);
  } else {
    $(".main").css("height", "670px");
    $(".content").css("height", "670px");
    $(".lefttop").css("height", "670px");
  }
}

function resetPage() {
  window.scrollTo(0, 0);
  var windowheight = $(window).height();
  var pagetop = $("#page").offset().top;
  var pageheight = $("#page").outerHeight();
  if ((windowheight + 0) <= (pagetop + pageheight)) {
    $("#page").removeClass("page").addClass("pagefixed");
  }
  else {
    $("#page").removeClass("pagefixed").addClass("page");
  }
}
//获取cookie里的页码信息，如果为空的话
var items_pagesize = getCookie("pagesize|http//" + location.host);
function getCookie(NameOfCookie) {
  if (document.cookie.length > 0) {
    var begin = document.cookie.indexOf(NameOfCookie + "=");
    if (begin != -1) {
      begin += NameOfCookie.length + 1;
      var end = document.cookie.indexOf(";", begin);
      if (end == -1) {
        end = document.cookie.length
      }
      return unescape(document.cookie.substring(begin, end))
    }
  }
  return 10
}
jQuery.fn.pagination = function (maxentries, opts) { //分页扩展方法
  opts = jQuery.extend(
    {
      target: "",
      settingsPageSize: true, //默认有带设置分页规格控件
      displayPageSummary: true, //默认带分页信息概要
      viewPageNumber: true,    //是否显示页码
      isShowHeadEnd: false,    //是否显示首尾页
      items_per_page: items_pagesize,
      num_display_entries: 5, //页码省略号步长
      inputPageNumber: true,   //输入页码跳转控件
      current_page: 0,
      num_edge_entries: 2, //页码省略号前后显示多少位
      link_to: "javascript:void(0);",
      index_page: "首页", tail_page: "尾页",
      prev_text: "上一页", next_text: "下一页",
      ellipse_text: "···",
      prev_show_always: true,
      next_show_always: true,
      callback: function () {
        return false
      }
    }, opts || {});
  return this.each(function () {
    function numPages() {
      var maths = Math.ceil(maxentries / opts.items_per_page);
      return maths <= 0 ? 1 : maths;
    }

    function getInterval() {
      var ne_half = Math.floor(opts.num_display_entries / 2);
      var np = numPages();
      var upper_limit = np - opts.num_display_entries;
      var start = current_page > ne_half ? Math.max(Math.min(current_page - ne_half, upper_limit), 0) : 0;
      var end = current_page > ne_half ? Math.min(current_page + ne_half, np) : Math.min(opts.num_display_entries, np);
      return [start, end]
    }

    function pageSelected(page_id, evt) {
      current_page = page_id;
      drawLinks();
      var continuePropagation = opts.callback(page_id, panel);
      if (!continuePropagation) {
        if (evt.stopPropagation) {
          evt.stopPropagation()
        }
        else {
          evt.cancelBubble = true
        }
      }
      return continuePropagation
    }

    function drawLinks() {
      panel.empty();
      var interval = getInterval();
      var np = numPages();
      var getClickHandler = function (page_id) {
        return function (evt) {
          return pageSelected(page_id, evt)
        }
      };
      var appendItem = function (page_id, appendopts) {
        page_id = page_id < 0 ? 0 : (page_id < np ? page_id : np - 1);
        appendopts = jQuery.extend({text: page_id + 1, classes: ""}, appendopts || {});
        if (page_id == current_page) {
          var cla = "current pagenum";
          if (!appendopts.classes) {
            cla = "current pagenum active"
          }
          var lnk = jQuery("<span class='" + cla + "'>" + (appendopts.text) + "</span>");
        }
        else {
          var lnk = jQuery("<a class='pagenum'>" + (appendopts.text) + "</a>").bind("click", getClickHandler(page_id)).attr("href", opts.link_to.replace(/__id__/, page_id))
        }
        if (appendopts.classes) {
          lnk.addClass(appendopts.classes);
        }
        penelItem.append(lnk)
      };
      var penelItem = jQuery("<div class='col-sm-8 pageBtnWrap'></div>");
      var penelTotal = jQuery("<div class='col-sm-4 pageTotal'></div>");
      if (opts.displayPageSummary) {
        jQuery("<span>共&nbsp;<span id='" + opts.target + "total'>" + (maxentries) + "&nbsp;条记录&nbsp;,&nbsp;</span>").appendTo(penelTotal);
        //jQuery("<div class='col-sm-4 pageTotal'><span>共&nbsp;<span id='" + opts.target + "total'>" + (maxentries) + "</span>&nbsp;条记录，第<span>" + ((current_page) <= 0 ? 1 : (current_page + 1)) + "-</span><span>" + (np) + "</span>页</span></div>").appendTo(panel);
      } else {
        jQuery("<div><span'>总记录数：<span id='" + opts.target + "total'>" + (maxentries) + "</span>&nbsp;&nbsp;&nbsp;当前页：<span>" + ((current_page) <= 0 ? 1 : (current_page + 1)) + "</span> /<span color='#ff7500'> " + (np) + "</span> </span></div>").appendTo(panel);
      }
      var option = "";
      if (opts.settingsPageSize) {
        //for (var i = 1; i <= ((opts.items_per_page / 10) < ins ? ins : (opts.items_per_page / 10)) ; i++) {
        //    if (i * 10 == opts.items_per_page) {
        //        option += "<option value='" + (i * 10) + "' selected='selected'>" + (i * 10) + "</option>"
        //    }
        //    else {
        //        option += "<option value='" + (i * 10) + "' >" + (i * 10) + "</option>"
        //    }
        //}
        var arr = [10, 20, 50, 100, 200, 500];
        $.each(arr, function (i, item) {
          if (item == opts.items_per_page) {
            option += "<option value='" + item + "' selected='selected'>" + item + "</option>"
          } else {
            option += "<option value='" + item + "' >" + item + "</option>"
          }
        })
        if (maxentries > 0) {
          jQuery("<span>每页 <select onchange='javascript:setpageSize(this,\"" + opts.target + "\")'>" + option + "</select> 条</span>").appendTo(penelTotal);
        } else {
          jQuery("<span>每页 <select disabled='true' onchange='javascript:setpageSize(this,\"" + opts.target + "\")'>" + option + "</select> 条</span>").appendTo(penelTotal);
        }
      }
      panel.append(penelTotal);
      panel.append(penelItem);
      if (opts.prev_text && (current_page > 0 || opts.prev_show_always)) {// 上一页
        if (opts.isShowHeadEnd) {
          appendItem(0, {text: opts.index_page, classes: "index"});
        }
        //appendItem(current_page - 1, {text: opts.prev_text, classes: "prev"});
        appendItem(current_page - 1, {
          text: "<span class='pageBtn'><i class='fa fa-angle-left'></i></span>",
          classes: "prev"
        });
        //resetPage();
      }
      if (opts.viewPageNumber) { //显示页码
        if (interval[0] > 0 && opts.num_edge_entries > 0) {
          var end = Math.min(opts.num_edge_entries, interval[0]);
          for (var i = 0; i < end; i++) {
            appendItem(i);
          }
          if (opts.num_edge_entries < interval[0] && opts.ellipse_text) {
            jQuery("<span>" + opts.ellipse_text + "</span>").appendTo(penelItem);
          }
        }
        for (var i = interval[0]; i < interval[1]; i++) {
          appendItem(i);
        }
        if (interval[1] < np && opts.num_edge_entries > 0) {
          if (np - opts.num_edge_entries > interval[1] && opts.ellipse_text) {
            jQuery("<span>" + opts.ellipse_text + "</span>").appendTo(penelItem);
          }
          var begin = Math.max(np - opts.num_edge_entries, interval[1]);
          for (var i = begin; i < np; i++) {
            appendItem(i);
          }
        }
      }
      if (opts.next_text && (current_page < np - 1 || opts.next_show_always)) { // 下一页
        appendItem(current_page + 1, {
          text: "<span class='pageBtn'><i class='fa fa-angle-right'></i></span>",
          classes: "next"
        });
        if (opts.isShowHeadEnd) {
          appendItem(np, {text: opts.tail_page, classes: "tail"});
        }
        //resetPage();
      }
      if (opts.inputPageNumber) {
        var apphtml = "<span data-target='" + opts.target + "'>&nbsp;&nbsp;&nbsp;&nbsp;到&nbsp;第&nbsp;";
        apphtml += "<input type='text' class='ipages' maxlength='6'/>&nbsp;页&nbsp;&nbsp;&nbsp;<button class='btn btn-page' onclick='setPgIndex(this)' disabled>确定</button></span>";
        jQuery(apphtml).appendTo(penelItem);

        //输入页码矫正
        $(".ipages").keyup(function (e) {
          var v = $(this).val().trim();
          if (!Utils.isNullorEmpty(v)) {
            v = v.replace(/\D|^0/g, '');
            v = parseInt(v) > np ? np : v;
            $(this).next(".btn-page").attr("disabled", false).addClass("btnPage");
          } else {
            $(this).next(".btn-page").removeClass("btnPage");
          }
          $(this).val(v);
          if (e.keyCode == 13) {
            //回车键查询列表
            $(this).parent().find(".btnPage").click();
          }
        })
      }
    }

    var current_page = opts.current_page;
    maxentries = (!maxentries || maxentries < 0) ? 0 : maxentries;
    opts.items_per_page = (!opts.items_per_page || opts.items_per_page < 0) ? 1 : opts.items_per_page;
    var panel = jQuery(this);
    this.selectPage = function (page_id) {
      pageSelected(page_id)
    };
    this.prevPage = function () {
      if (current_page > 0) {
        pageSelected(current_page - 1);
        return true
      }
      else {
        return false
      }
    };
    this.nextPage = function () {
      if (current_page < numPages() - 1) {
        pageSelected(current_page + 1);
        return true
      }
      else {
        return false
      }
    };
    drawLinks()
  })
};

//列表tip
$("body").on("mouseover", ".dataTable tbody td,.dataTable th", function (e) {
  if ($(this).find("a.oprate").length > 0)
    return false;
  var text = $(this).text();
  if (this.offsetWidth < this.scrollWidth) {
    $(".tipDiv").hide();
    $(this).parents("body").append('<div class="tipDiv">' + text.escapeHtml() + '</div>');
    var left, top;
    var e = e || window.e;
    //加上鼠标在视窗中的位置
    left = e.clientX;
    top = e.clientY;
    left += "px"
    top += "px"
    $(this).parents("body").find(".tipDiv").css({top: top, left: left}).slideToggle();
    return false;
  }
}).on("mouseout", ".dataTable tbody td,.dataTable th", function () {
  if ($(this).find("a.oprate").length > 0)
    return false;
  $(this).parents("body").find(".tipDiv").remove();
  return false;
})







