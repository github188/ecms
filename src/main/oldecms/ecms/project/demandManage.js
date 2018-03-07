/**
 * 项目需求
 * @author：钟晓燕
 * @time：2017-04-11
 */

var htmlObj = {};
htmlObj.rootUrl = appHost + approot;
htmlObj.arr = []; //选择的项目相关成员
htmlObj.checkedNodesName = ''; //多选的成员名字（只作用于显示到文本框）
htmlObj.leaderInputSgl = ''; //区分人员单选点击的来源
var validatorOfAdtOne; //一审form的validate对象
var validatorOfAdtTwo; //二审form的validate对象
var validatorOfAssignTask; //分配任务form的validate对象
var validatorOfAddFeedBack; //任务待反馈form的validate对象
htmlObj.authorization = Utils.getValue('authorization'); //获取登录人的userId和Token
htmlObj.personClickfrom = "";

/**
 * 获取需求管理列表
 */
htmlObj.datalist = function () {
    var cmd = new CommandAjax(htmlObj.rootUrl + "/pmo/require/list", htmlObj.authorization);
    cmd = htmlObj.setParam(cmd);
    $("#datalist").datagrid({
        columns: [{
        	display: "所属项目",
            name: "proName",
            width: "150px",
            align: "center"
        }, {
        	display: "需求名称",
            name: "reqTitle",
            width: "160px",
            align: "center"
        }, {
        	display: "需求编号",
        	name: "reqCode",
        	width: "180px",
        	align: "center"
        }, {
            display: "发起人",
            name: "addPersonName",
            width: "100px",
            align: "center"
        }, {
            display: "发起时间",
            name: "startTime",
            width: "120px",
            align: "center",
            render: function (row) {
                var startTime = row.startTime;
                startTime = Utils.isNullorEmpty(startTime) ? "" : new Date(parseInt(startTime)).toString().substring(0, 10);
                return startTime;
            }
        }, {
            display: "需求接收人",
            name: "receivePersonName",
            width: "90px",
            align: "center"
        }, {
            display: "是否紧急",
            name: "reqEmergency",
            width: "90px",
            align: "center",
            render: function (row) {
                var reqEmergency = row.reqEmergency,
                    reqEmergencyname = reqEmergency == 1 ? "是" : "否";
                return reqEmergencyname;
            }
        }, {
            display: "需求状态",
            name: "actName",
            width: "100px",
            align: "center"
        }, {
            display: "操作",
            width: "70px",
            align: "center",
            render: function (row) {
                var requireId = row.requireId,
                    actId = row.actId,
                    projectId = row.projectId,
                    rowHtml = "<a class=\"oprate oprate-view\" title=\"详情\" href=\"javascript:void(0);\" onclick=\"htmlObj.openWhichModal('" + requireId + "','" + actId + "','" + projectId + "')\">详情</a>";
                rowHtml += "<input class=\"hide\" name=\"oprate_requireId\" type=\"hidden\" value=\"" + requireId + "\" >";
                return rowHtml;
            }
        }],
        reqdata: cmd,
        isShowCheckBox: false,
        rowNumber: false,
        onResponse: function (data) {
            return data;
        },
        onComplete: function (data) {
            if (data.code != 'success') {
                //显示错误信息
                pageObj.showNotLoginErrorMsg(data.code, data.message);
            }
        }
    });
};
/**
 * 获取待我处理的条数
 */
htmlObj.getHandelNumbers = function(){
  $.ajax({
        type: "get",
        url: htmlObj.rootUrl + "/pmo/require/list",
        data: {
            pageNum:1,
            pageSize:10,
            scope:3
        },
        beforeSend: function (request) {
            request.setRequestHeader("authorization", htmlObj.authorization);
        },
      success: function(data){
          if(data.code == 'success'){
                $('#handleNumbers').text('待我处理的('+ data.totals +')')
          }
      }

  })
};
/**
 * 获取多条件查询的值
 * @param cmd
 * @returns {*}
 */
htmlObj.setParam = function (cmd) {
    var ascription = $(".ascription li.active").attr("data-state"),
        //marketlist = $("select[name='marketlist']").val(),
        proname = $("input[name='proname']").val(),
        sponsor = $("input[name='sponsor']").val(),
        receiver = $("input[name='receiver']").val(),
        isurgent = $("select[name='isurgent']").val(),
        createtime = $("input[name='createtime']").val(),
        reqStatus = $("select[name='reqStatus']").val();
    if (!Utils.isNullorEmpty(ascription)) {
        cmd.scope = ascription;
    }
    /*if (!Utils.isNullorEmpty(marketlist)) {
        cmd.marktId = marketlist;
    }*/
    if (!Utils.isNullorEmpty(proname)) {
        cmd.proInfo = proname.trim();
    }
    if (!Utils.isNullorEmpty(sponsor)) {
        cmd.addPerson = sponsor.trim();
    }
    if (!Utils.isNullorEmpty(receiver)) {
        cmd.receivePerson = receiver.trim();
    }
    if (!Utils.isNullorEmpty(isurgent)) {
        cmd.reqEmergency = isurgent;
    }
    if (!Utils.isNullorEmpty(createtime)) {
        createtime += " 23:59:59";
        cmd.startTime = createtime.toSecTime() + 999;
    }
    if (!Utils.isNullorEmpty(reqStatus)) {
        cmd.actId = reqStatus;
    }
    return cmd;
};

/**
 * 新增需求
 */
htmlObj.editDemand = function () {
    var url = htmlObj.rootUrl + "/pmo/require/add_submit",
        proInfo = $("input[name='proInfo']").val(),
        proId = $("input[name='proInfo']").attr("data-id"),
        proCode = $("input[name='proInfo']").attr("data-code"),
        receivePersonName = $("input[name='receivePerson']").val(),
        receivePersonId = $("input[name='receivePerson']").attr("data-manageid"),
        reqEmergency = $("input[name='reqEmergency']:checked").val(),
        reqtitle = $("input[name='reqtitle']").val(),
        reqDetail = $("#reqDetail").html(),
        addPerson = Utils.getValue("u"),
        data = {};
    data.addPerson = addPerson;
    if (!Utils.isNullorEmpty(proId)) {
        data.proId = proId.trim();
    }
    if (!Utils.isNullorEmpty(proCode)) {
        data.proCode = proCode.trim();
    }
    if (!Utils.isNullorEmpty(receivePersonName)) {
        data.receivePersonName = receivePersonName.trim();
    }
    if (!Utils.isNullorEmpty(receivePersonId)) {
        data.receivePersonId = receivePersonId.trim();
    }
    if (!Utils.isNullorEmpty(reqEmergency)) {
        data.reqEmergency = reqEmergency;
    }
    if (!Utils.isNullorEmpty(reqtitle)) {
        data.reqTitle = reqtitle.trim().escapeHtml();
    }
    if (!Utils.isNullorEmpty(reqDetail)) {
        reqDetail = reqDetail.trim().escapeHtml();
        data.reqDetail = filterXSS(reqDetail);
    }
    $.ajax({
        type: "post",
        url: url,
        data: JSON.stringify(data),
        beforeSend: function (request) {
            request.setRequestHeader("Content-Type", "application/json;charset=UTF-8;");
            request.setRequestHeader("authorization", htmlObj.authorization);
        },
        success: function (data) {
            var code = data.code,
                message = data.message;
            if (code == "success") {
                $("#demandEditPanel").modal('hide');
                $('#btnToAddDMD').removeAttr('disabled');//解禁
                htmlObj.datalist();
            } else {
                message = Utils.isNullorEmpty(message) ? "新增需求失败！" : message;
                $("#demandEditPanel .modal-msg").empty().show.text(message);
            }
        }
    });
};

/**
 * 获取项目列表
 */
htmlObj.getProList = function () {
    var url = htmlObj.rootUrl + "/pmo/project/list",
        proInfo = $("input[name='proInfo']").val(),
        data = {
            "pageNum": 0,
            "pageSize": 0
        };
    if (!Utils.isNullorEmpty(proInfo)) {
        data.proInfo = proInfo.trim();
    }
    $.ajax({
        type: "get",
        url: url,
        data: data,
        beforeSend: function (request) {
            request.setRequestHeader("authorization", htmlObj.authorization);
        },
        success: function (data) {
            var code = data.code,
                noData = "<p class=\"nodata\">没有查询到项目记录</p>";
            if (code == "success") {
                var content = data.content,
                    content_len = content.length,
                    result_html = "";
                if (content_len > 0) {
                    for (var i = 0; i < content_len; i++) {
                        var items = data.content[i],
                            id = items.id,
                            proName = items.proName,
                            proCode = items.proCode,
                            managePersonId = items.managePersonId,
                            managePersonName = items.managePersonName;
                        result_html += "<p class=\"search-items\">";
                        result_html += "<span class=\"rsc-name\">" + proName + "</span>";
                        result_html += "<span class=\"rsc-proCode\" data-manageid=\"" + managePersonId + "\" data-managename=\"" + managePersonName + "\">（" + proCode + "）</span>";
                        result_html += "<input name=\"rsc-id\" type=\"hidden\" value=\"" + id + "\">";
                        result_html += "</p>";
                    }
                    $(".pro-search").show().find(".renew-search-border").empty().append(result_html);
                } else {
                    $(".pro-search").show().find(".renew-search-border").empty().append(noData);
                }
            } else {
                $(".pro-search").show().find(".renew-search-border").empty().append(noData);
            }
        }
    });
};

/**
 * 获取接收人列表
 */
/*
 htmlObj.getUsersList = function () {
 var id = $("input[name='proInfo']").attr("data-id");
 var url = htmlObj.rootUrl + "/pmo/project/" + id + "/users";
 $.ajax({
 type: "get",
 url: url,
 beforeSend: function (request) {
 request.setRequestHeader("authorization", htmlObj.authorization);
 },
 success: function (data) {
 var code = data.code,
 noData = "<p class=\"nodata\">没有查询到需求接收人列表，请重新选择项目名称</p>";
 if (code == "success") {
 var content = data.content,
 content_len = content.length,
 result_html = "";
 if (content_len > 0) {
 for (var i = 0; i < content_len; i++) {
 var items = data.content[i],
 personId = items.personId,
 personName = items.personName;
 result_html += "<p class=\"search-items\">";
 result_html += "<span class=\"rsc-name\">" + personName + "</span>";
 result_html += "<input name=\"rsc-id\" type=\"hidden\" value=\"" + personId + "\">";
 result_html += "</p>";
 }
 $(".user-search").show().find(".renew-search-border").empty().append(result_html);
 } else {
 $(".user-search").show().find(".renew-search-border").empty().append(noData);
 }
 } else {
 $(".user-search").show().find(".renew-search-border").empty().append(noData);
 }
 }
 });
 };
 */

/**
 * 获取营销中心列表
 */
htmlObj.getMarketCenter = function () {
    var url = htmlObj.rootUrl + "/pmo/common/markets";
    $.ajax({
        type: "get",
        url: url,
        beforeSend: function (request) {
            request.setRequestHeader("authorization", htmlObj.authorization);
        },
        success: function (data) {
            if (data.code == "success") {
                var content = data.content,
                    optionsHtml = "<option value=\"\">--请选择--</option>";
                for (var i = 0; i < content.length; i++) {
                    var items = content[i],
                        id = items.id,
                        name = items.name;
                    optionsHtml += "<option value=\"" + id + "\">" + name + "</option>";
                }
                //$("select[name='marketlist']").empty().append(optionsHtml);
            } else {
                //显示错误信息
                pageObj.showNotLoginErrorMsg(data.code, data.message);
            }
        }
    });
};

/**
 * 获取需求状态列表
 */
htmlObj.getPmoStatus = function () {
    var url = htmlObj.rootUrl + "/pmo/common/project/status/pmo_require_status";
    $.ajax({
        type: "get",
        url: url,
        beforeSend: function (request) {
            request.setRequestHeader("authorization", htmlObj.authorization);
        },
        success: function (data) {
            if (data.code == "success") {
                var content = data.content,
                    optionsHtml = "<option value=\"\">--请选择--</option>";
                for (var i = 0; i < content.length; i++) {
                    var items = content[i],
                        code = items.code,
                        name = items.name;
                    optionsHtml += "<option value=\"" + code + "\">" + name + "</option>";
                }
                $("select[name='reqStatus']").empty().append(optionsHtml);
            } else {
                //显示错误信息
                pageObj.showNotLoginErrorMsg(data.code, data.message);
            }
        }
    });
};

/**
 * 新增需求、导出需求弹窗
 */
htmlObj.addOrExportModal = function () {
    $(".button-power-position").on("click", ".btn-add", function () {
        $("#demandEditPanel").modal();
    }).on("click", ".btn-export", function () {
        $("#exportExclePanel").modal();
    });
    $("#exportExclePanel").on("click", "#export-sure", function () {
        var url = htmlObj.rootUrl + "/pmo/require/download/excel",
            data = {};
        data = htmlObj.setParam(data);
        var downloadurl = url + "?" + data;
        window.open(downloadurl);
        $("#exportExclePanel").modal("hide");
    });
};

/**
 * 初始化时间控件
 */
htmlObj.initLaydate = function () {
    $("#createtime").focus(function () {
        laydate({
            elem: "#createtime",
            format: "YYYY-MM-DD",
            festival: true,
            istime: false,
            choose: function () {
                $("#createtime").focusout();
            }
        });
    });
};

/**
 * 初始化wangEditor富文本编辑器
 */
htmlObj.wangEditorInit = function (whichEditorId) {
    var u = Utils.getValue("u"),
        v = Utils.getValue("v");
    var url = htmlObj.rootUrl + "/file/upload";
    wangEditor.config.printLog = false;
    var theEditor = new wangEditor(whichEditorId);
    theEditor.config.uploadImgUrl = url;
    wangEditor.config.uploadImgFns.onload = function (resultText, xhr) {
        var result = Utils.parse(resultText);
        if (result.code == "success") {
            var content = result.content;
            var imgurl = htmlObj.rootUrl + "/file/download?&fileName=" + content;
            var editContent = this.$parent.find(".wangeditor-container").attr("id"),
                imgHtml = "<img src=\"" + imgurl + "\" alt=\"图片\"  style='max-width:100%;'>";
            if (editContent == whichEditorId) {
                theEditor.command(null, "insertHtml", imgHtml);
            }
        } else {
            if (window.console) {
                console.log("上传失败！");
            }
        }
    };
    theEditor.create();
    theEditor.$txt.html("");
};

/**
 * 选择项目并显示接收人
 */
htmlObj.choseProOrUser = function () {
    $(".search-boxs").on("click", "input[name='proInfo']", function (event) {
        htmlObj.getProList();
    }).on("click", ".search-items", function () {
        var that = $(this);
        var proName = that.find('.rsc-name').text();
        var proCode = that.find('.rsc-proCode');
        var proId = that.find('input[name=rsc-id]').val();
        var manageId = proCode.attr('data-manageid');
        var manageName = proCode.attr('data-managename');
        $("input[name='proInfo']").val(proName).attr("data-code", proCode.text().replace(/（|）/g, '')).attr("data-id", proId).blur();
        $("input[name='receivePerson']").val(manageName).attr("data-manageid", manageId).blur();
    });

    $(":not('.renew-search-conten')").on("click", function () { /* 点击其他地方将查询的项目框隐藏 */
        $(".renew-search-content").hide();
    });

};

/**
 * 2017-07-24可以选择项目接收人
 */
htmlObj.chooseReceivePerson = function () {
    $("#choosePersonModal").modal("show");
    htmlObj.getDepLeaderList();
};

/**
 * 表单验证--新建需求
 */
htmlObj.formValidate = function () {
    var editorCheck = function (editid) {
        var editorEdit = $("#" + editid).html(),
            result = false;
        if (Utils.isNullorEmpty(editorEdit) || editorEdit == "<p><br></p>") {
            var error = "<label class=\"error\" for=\"editorExamine\">请输入需求详情</label>";
            if ($("#" + editid).parents(".wangEditor-container").find("label[for='editorExamine']").length <= 0) {
                $("#" + editid).parents(".wangEditor-container").append(error);
            } else {
                $("#" + editid).parents(".wangEditor-container").find("label[for='editorExamine']").text("请输入需求详情").show();
            }
            return false;
        } else {
            var reg = /<[^>]*>|/g,
                editorText = editorEdit.replace(/<[^>]*>|/g, "");
            if (editorEdit.length > 600) {
                var error = "<label class=\"error\" for=\"editorExamine\">需求详情内容最大输入长度为600</label>";
                if ($("#" + editid).parents(".wangEditor-container").find("label[for='editorExamine']").length <= 0) {
                    $("#" + editid).parents(".wangEditor-container").append(error);
                } else {
                    $("#" + editid).parents(".wangEditor-container").find("label[for='editorExamine']").text("需求详情内容最大输入长度为600").show();
                }
                return false;
            } else {
                $("#" + editid).parents(".wangEditor-container").find("label[for='editorExamine']").remove();
                result = true;
            }
        }
        return result;
    };

    $("#demandEditForm").validate({
        debug: true,
        onfocusout: function (element) {
            $(element).valid();
        },
        onsubmit: function (element) {
            $(element).valid();
        },
        errorPlacement: function (error, element) {
            var eleName = $(element).attr("name");
            if (eleName == "reqEmergency") {
                error.appendTo(element.parents(".errorPlacement"));
            } else {
                error.appendTo(element.parent());
            }
        },
        submitHandler: function () { //验证完成，保存数据
            var editcheck = editorCheck("reqDetail");
            if (editcheck == true || editcheck == "true") {
                $('#btnToAddDMD').attr('disabled', "disabled");
                htmlObj.editDemand(); //新增需求
            }
        },
        rules: {
            proInfo: {
                required: true
            },
            receivePerson: {
                required: true
            },
            reqEmergency: {
                required: true
            },
            reqtitle: {
                required: true,
                maxlength: 50
            }
        },
        messages: {
            proInfo: {
                required: "请选择项目名称"
            },
            receivePerson: {
                required: "请选择需求接收人"
            },
            reqEmergency: {
                required: "请选择是否紧急"
            },
            reqtitle: {
                required: "请输入需求标题",
                maxlength: "最多输入50个字符"
            }
        }
    });

    $("#reqDetail").on("keyup", function () {
        var editid = $(this).attr("id");
        editorCheck(editid);
    });
};

/**
 * 重置表单
 */
htmlObj.clearForm = function () {
    $("#demandEditPanel").on("hide.bs.modal", function () {
        var validator = $(".formvalidate").validate();
        validator.resetForm();
        $(".formvalidate")[0].reset();
        var $this = $(this),
            forms = $this.find(".formvalidate"),
            editro = forms.find(".wangEditor-container"),
            editroid = editro.find(".wangEditor-txt").attr("id"),
            editorlen = editro.length;
        if (editorlen > 0) {
            $("#" + editroid).text("").html("");
        }
        $(".formvalidate input[name]").removeAttr("data-id data-code");
    });
};

/**
 * 阻止事件冒泡
 * @param event  事件对象
 */
htmlObj.stopPropagation = function (event) {
    if (event.stopPropagation) { //支持W3C标准
        event.stopPropagation();
    } else { //IE8及以下浏览器
        event.cancelBubble = true;
    }
};

/**
 * 获取需求详情
 * @param id
 */
htmlObj.getDetail = function (id, callback) {
    var url = htmlObj.rootUrl + "/pmo/require/" + id + "/detail";
    $.ajax({
        type: "get",
        url: url,
        beforeSend: function (request) {
            request.setRequestHeader("authorization", htmlObj.authorization);
        },
        success: function (data) {
            if (data.code == "success") {
                var content = data.content;
                callback(content);
            } else {
                //显示错误信息
                pageObj.showNotLoginErrorMsg(data.code, data.message);
            }
        }
    });
};

/**
 * 根据项目id拿角色
 * @param proId
 */
htmlObj.getProRole = function (proId, callback) {
    var content;
    $.ajax({
        url: htmlObj.rootUrl + '/pmo/project/' + proId + '/role',
        type: 'get',
        beforeSend: function (request) {
            request.setRequestHeader("authorization", htmlObj.authorization);
        },
        success: function (data) {
            if (data.code == "success") {
                content = data.content;
                if (!Utils.isNullorEmpty(content)) {
                    callback(content);
                }
            } else {
                //显示错误信息
                pageObj.showNotLoginErrorMsg(data.code, data.message);
            }
        }
    });

};

/**
 *通过需求id和需求状态决定点击详情时打开对应Modal
 * @param demandId
 * @param demandStatus
 */
htmlObj.openWhichModal = function (demandId, demandStatus, proId) {
    switch (demandStatus) {
        case "pmo01":
            //提出需求，(有保存功能时)
            //。。。
            break;
        case "pmo02":
            //需求一审
            $('#auditOneModal').modal();
            //显示详情数据
            htmlObj.showDmdDetail(demandId, 'detailADTOne', proId);
            break;
        case "pmo03":
            //需求二审
            $('#auditTwoModal').modal();
            //显示详情数据
            htmlObj.showDmdDetail(demandId, 'detailADTTwo');
            break;
        case "pmo04":
            //任务派发，即待分配任务
            $('#beforeAssignModal').modal();
            //显示详情数据
            htmlObj.showDmdDetail(demandId, 'detailBA', proId);
            break;
        case "pmo05":
            //任务处理
            $('#pendingModal').modal();
            //显示详情数据
            htmlObj.showDmdDetail(demandId, 'detailPending');
            break;
        case "finish":
            //结束流程
            $('#feedBackedModal').modal();
            //显示详情数据
            htmlObj.showDmdDetail(demandId, 'detailFB');
            break;
        case "reject":
        	//驳回
        	$('#rejectModal').modal();
        	//显示详情数据
        	htmlObj.showDmdDetail(demandId, 'detailRJ');
        	break;
        default:
            break;
    }
};

/**
 * 显示需求详情
 */
htmlObj.showDmdDetail = function (demandId, fromDetailId, proId) {
    /* var proRoleObj = {};
     //通过项目id获取角色
     htmlObj.getProRole(proId, function (content) {
     proRoleObj = content;
     });*/

    //获取需求详情
    htmlObj.getDetail(demandId, function (content) {
        var pmoRequireDetail = content.pmoRequireDetail;
        var pmoRequireTaskList = content.pmoRequireTaskList;
        var theDetail = $('#' + fromDetailId);
        var proName = pmoRequireDetail.proName,
            addPersonName = pmoRequireDetail.addPersonName,
            receivePersonName = pmoRequireDetail.receivePersonName,
            reqEmergency = pmoRequireDetail.reqEmergency,
            reqEmergencyname = reqEmergency == 1 ? "是" : "否",
            startTime = pmoRequireDetail.startTime,
            actName = pmoRequireDetail.actName,
            reqDetail = pmoRequireDetail.reqDetail;
        theDetail.parents('.modal-content').find('.modal-title').html(actName);
        proName = Utils.isNullorEmpty(proName) ? "" : proName;
        addPersonName = Utils.isNullorEmpty(addPersonName) ? "" : addPersonName;
        receivePersonName = Utils.isNullorEmpty(receivePersonName) ? "" : receivePersonName;
        startTime = Utils.isNullorEmpty(startTime) ? "" : new Date(parseInt(startTime)).toString().substring(0, 10);
        actName = Utils.isNullorEmpty(actName) ? "" : actName;
        reqDetail = Utils.isNullorEmpty(reqDetail) ? "" : reqDetail.unescapeHtml();
        theDetail.find('.dmd-proname').text(proName).attr('data-demandid', demandId);
        theDetail.find('.dmd-promoter').text(addPersonName);
        theDetail.find('.dmd-receiver').text(receivePersonName);
        theDetail.find('.dmd-emergency').text(reqEmergencyname);
        theDetail.find('.dmd-promoterdate').text(startTime);
        theDetail.find('.dmd-status').text(actName);
        theDetail.find('.dmd-desc').html(reqDetail);
        //二审、待分配任务、任务已反馈
        if (fromDetailId == 'detailADTTwo' || fromDetailId == 'detailBA' || fromDetailId == 'detailPending' || fromDetailId == 'detailFB' || fromDetailId == 'detailRJ') {
            //显示审核人意见数据
            var adtOneDataBlock = theDetail.parent().find('.adtone-datablock');
            var firstInstancePersonName = pmoRequireDetail.firstInstancePersonName,
                firstInstancePersonId = pmoRequireDetail.firstInstancePersonId,
                secondInstancePersonId = pmoRequireDetail.secondInstancePersonId,
                secondInstancePersonName = pmoRequireDetail.secondInstancePersonName,
                updateTime = pmoRequireDetail.updateTime,
                firstInstanceContent = pmoRequireDetail.firstInstanceContent,
                firstInstanceOpinion = pmoRequireDetail.firstInstanceOpinion,
                firstInstanceOpinionname = firstInstanceOpinion == 1 ? "同意" : "驳回",
                secondInstanceContent = pmoRequireDetail.secondInstanceContent,
                secondInstanceOpinion = pmoRequireDetail.secondInstanceOpinion == 1 ? "同意" : "驳回",
                curProcessPersonId = pmoRequireDetail.curProcessPersonId;
            firstInstancePersonName = Utils.isNullorEmpty(firstInstancePersonName) ? "" : firstInstancePersonName;
            firstInstancePersonId = Utils.isNullorEmpty(firstInstancePersonId) ? "" : firstInstancePersonId;
            secondInstancePersonId = Utils.isNullorEmpty(secondInstancePersonId) ? "" : secondInstancePersonId;
            updateTime = Utils.isNullorEmpty(updateTime) ? "" : updateTime;
            firstInstanceContent = Utils.isNullorEmpty(firstInstanceContent) ? "暂无" : firstInstanceContent;
            secondInstanceContent = Utils.isNullorEmpty(secondInstanceContent) ? "暂无" : secondInstanceContent;
           console.log(adtOneDataBlock.html());
            adtOneDataBlock.find('.dm-isagree-txt').html(firstInstanceOpinionname);
            adtOneDataBlock.find('.dm-pername').html(firstInstancePersonName).attr('data-personid', firstInstancePersonId);
            adtOneDataBlock.find('.dm-time').html(updateTime);
            adtOneDataBlock.find('.dm-adtdesc').html(firstInstanceContent);
            //待分配任务、任务已反馈
            if (fromDetailId == 'detailBA' || fromDetailId == 'feedBackedModal' || fromDetailId == 'detailPending' || fromDetailId == 'detailFB'|| fromDetailId == 'detailRJ') {
                var adtTwoDataBlock = theDetail.siblings('.adttwo-datablock');
                if (!secondInstancePersonId == "") {
                	$('.adttwo-datablock').show();
                    adtTwoDataBlock.find('.dm-isagree-txt').text(secondInstanceOpinion);
                    adtTwoDataBlock.find('.dm-pername').text(secondInstancePersonName).attr('data-personid', secondInstancePersonId);
                    adtTwoDataBlock.find('.dm-time').text(pmoRequireDetail.updateTime);
                    adtTwoDataBlock.find('.dm-adtdesc').text(secondInstanceContent);
                } else {
                    $('.adttwo-datablock').hide();
                }
                //给待分配Modal里面的分配任务按钮附加项目id
                if (fromDetailId == 'detailBA') {
                    //此需求的处理人跟当前登录人进行匹配，如果不匹配，隐藏分配任务等按钮layout
                    if (curProcessPersonId != Utils.getValue('u')) {
                        $('#beforeAssignBtnsBlock').hide();
                    }
                    else {
                        $('#btnBeforeAssign').attr('data-proid', proId).attr('data-demandid', demandId);
                        $('#beforeAssignBtnsBlock').show();
                    }
                }
                //待反馈、结束流程
                if (fromDetailId == 'detailPending' || fromDetailId == 'detailFB') {
                    //显示反馈记录
                    var addTime = pmoRequireDetail.startTime,
                        endTime = pmoRequireDetail.endTime,
                        firstInstancePersonName = pmoRequireDetail.firstInstancePersonName,
                        taskSendDetail = pmoRequireDetail.taskSendDetail;
                    addTime = Utils.isNullorEmpty(addTime) ? "" : new Date(parseInt(addTime)).toString().substring(0, 10);
                    endTime = Utils.isNullorEmpty(endTime) ? "" : new Date(parseInt(endTime)).toString().substring(0, 10);
                    taskSendDetail = Utils.isNullorEmpty(taskSendDetail) ? "" : taskSendDetail.trim();
                    $(".dmd-taskstartdate").empty().text(addTime);
                    $(".dmd-taskenddate").empty().text(endTime);
                    $(".dmd-assignman").empty().text(firstInstancePersonName);
                    console.log(taskSendDetail)
                    $(".dmd-taskdesc").html(Utils.taskSendDetail);
                    htmlObj.showFBData(pmoRequireTaskList);
                    if (fromDetailId == 'detailPending') {
                        $('.btn-tofeedback').attr('data-proid', proId).attr('data-demandid', demandId);
                        var isCurProcessPerson = false;
                        //判断当前登录人是否是此需求的当前需求操作人，是则显示关闭需求按钮
                        if (curProcessPersonId != Utils.getValue('u')) {
                            isCurProcessPerson = false;
                            $('.btn-closedmd').addClass('display-none');
                        } else {
                            isCurProcessPerson = true;
                            $('.btn-closedmd').removeClass('display-none');
                        }
                        var isExist = false;
                        for (var i = 0; i < pmoRequireTaskList.length; i++) {
                            //判断当前登录人是否是这个需求的任务接收人
                            if (pmoRequireTaskList[i].taskPerson == Utils.getValue('u')) {
                                isExist = true;
                                $('.btn-tofeedback').attr('data-fbid', pmoRequireTaskList[i].id);
                            }
                        }
                        if (!isCurProcessPerson && !isExist) {
                            $('#pendingBtnsBlock').hide();
                        } else {
                            $('#pendingBtnsBlock').show();
                            if (isExist) {
                                $('.btn-tofeedback').show();
                            } else {
                                $('.btn-tofeedback').hide();
                            }
                        }
                    }
                }
            }
            else if (fromDetailId == 'detailADTTwo') {
                //如果当前登录人是这个需求的二审人，则显示二审意见及提交按钮组
                if (secondInstancePersonId == Utils.getValue('u')) {
                    var auditTwoModal = $('#auditTwoModal');
                    auditTwoModal.find('.modal-title').html('需求二审');
                    auditTwoModal.find('.modal-footer').removeClass('display-none');
                    auditTwoModal.find('#adtTwoPanel').removeClass('display-none');
                }
            }
        }
        else if (fromDetailId == 'detailADTOne') {
            var firstInstancePersonId = pmoRequireDetail.firstInstancePersonId;
            if (firstInstancePersonId == Utils.getValue('u')) {
                var auditOneModal = $('#auditOneModal');
                auditOneModal.find('.modal-title').html('需求一审');
                auditOneModal.find('.modal-footer').removeClass('display-none');
                auditOneModal.find('#auditPanel').removeClass('display-none');
            }
        }
    });
};

/**
 * 提交一审
 */
htmlObj.submitAuditOne = function () {
    var url = htmlObj.rootUrl + "/pmo/require/flow/verify1";
    var obj = {};
    obj.id = $('#auditOneForm').find('.dmd-proname').attr('data-demandid');
    obj.firstInstanceOpinion = $('#adtOneIsAgree').val(); //一审是否同意
    obj.firstInstanceContent = $('#adtOneDesc').val(); //一审批注
    var isNeedAdtTwo = $('#adtIsNeedTwoadt').val(); //是否需要二审
    obj.needSecondInstance = isNeedAdtTwo;
    //如果需要
    if (isNeedAdtTwo == 1) {
        //获取二审人员
        var twoAdtMeb = $('#twoAdtMeb');
        obj.secondInstancePersonId = twoAdtMeb.attr('data-personid');
        obj.secondInstancePersonName = twoAdtMeb.val();
    }
    $.ajax({
        url: url,
        type: "post",
        data: JSON.stringify(obj),
        beforeSend: function (request) {
            request.setRequestHeader("Content-Type", "application/json;charset=UTF-8;");
            request.setRequestHeader("authorization", htmlObj.authorization);
        },
        success: function (data) {
            if (data.code == "success") {
                var auditOneModal = $('#auditOneModal');
                auditOneModal.modal('hide');
                //重置一审modal
                htmlObj.resetAuditOneModal();
                //刷新需求列表
                htmlObj.datalist();
            } else {
                //显示错误信息
                pageObj.showNotLoginErrorMsg(data.code, data.message);
            }
        }
    });
};

/**
 * 重置一审modal--关闭一审modal以及一审提交成功之后共同要重置的部分
 */
htmlObj.resetAuditOneModal = function () {
    var auditOneModal = $('#auditOneModal');
    htmlObj.resetValide(validatorOfAdtOne, auditOneModal, 'auditOneForm');
    //清除二审的人员id
    $('#twoAdtMeb').attr('data-personid', '');
    $('#twoAdtContain').hide();
    auditOneModal.find('.modal-title').html('需求详情');
    auditOneModal.find('.modal-footer').addClass('display-none');
    auditOneModal.find('#auditPanel').addClass('display-none');
};

/**
 * 一审Modal弹框中需处理的事
 */
htmlObj.initAuditOneHandle = function () {
    //一审表单验证，点击确定就会自动验证，成功后即会请求提交一审接口
    htmlObj.validateAdtOne();
    $('#auditOneModal').on("hidden.bs.modal", function () {
        //重置一审modal
        htmlObj.resetAuditOneModal();
        $('#adtIsNeedTwoLayout').show();
    });
    //监听一审是否同意下拉框
    $('#adtOneIsAgree').on('change', function () {
        var theId = this.options[this.options.selectedIndex].value;
        //如果驳回
        if (theId == "2") {
            $('#adtIsNeedTwoLayout').hide();
        } else {
            $('#adtIsNeedTwoLayout').show();
        }
    });
    //初始化人员组织架构--单选
    htmlObj.initTreeSgl();
    //监听是否二审下拉框
    var adtIsNeedTwoadt = $('#adtIsNeedTwoadt');
    adtIsNeedTwoadt.on('change', function () {
        var theId = this.options[this.options.selectedIndex].value;
        //如果需要
        if (theId == "1") {
            $('#twoAdtContain').show();
        } else {
            $('#twoAdtContain').hide();
        }
    });
    //点击选择二审人员input，弹出组织架构Modal
    $('#twoAdtMeb').on('click', function () {
        //降低前一个modal的层级
        //$('#auditOneModal').addClass('z-index20');
        htmlObj.personClickfrom = "twoAdtMeb";
        $("#choosePersonModal").modal("show");
        htmlObj.getDepLeaderList();
    });
};


/**
 * 提交二审
 */
htmlObj.submitAuditTwo = function () {
    var url = htmlObj.rootUrl + "/pmo/require/flow/verify2";
    var obj = {};
    obj.id = $('#auditTwoForm').find('.dmd-proname').attr('data-demandid');
    obj.secondInstanceOpinion = $('#adtTwoIsAgree').val(); //二审是否同意
    obj.secondInstanceContent = $('#adtTwoDesc').val(); //二审批注
    $.ajax({
        url: url,
        type: "post",
        data: JSON.stringify(obj),
        beforeSend: function (request) {
            request.setRequestHeader("Content-Type", "application/json;charset=UTF-8;");
            request.setRequestHeader("authorization", htmlObj.authorization);
        },
        success: function (data) {
            if (data.code == "success") {
                $('#auditTwoModal').modal('hide');
                htmlObj.resetValide(validatorOfAdtTwo, $("#auditTwoModal"), 'auditTwoForm');
                //刷新需求列表
                htmlObj.datalist();
            } else {
                //显示错误信息
                pageObj.showNotLoginErrorMsg(data.code, data.message);
            }
        }
    });
};

/**
 * 二审Modal弹框中需处理的事
 */
htmlObj.initAuditTwoHandle = function () {
    //二审表单验证，点击确定就会自动验证，成功后即会请求提交二审接口
    htmlObj.validateAdtTwo();
    $('#auditTwoModal').on("hidden.bs.modal", function () {
        htmlObj.resetValide(validatorOfAdtTwo, $('#auditTwoModal'), 'auditTwoForm');
    });
};

/**
 * 待分配弹框中需处理的事
 */
htmlObj.initBeforeAssignHandle = function () {
    $('#btnBeforeAssign').on('click', function () {
        //关闭待分配Modal
        $('#beforeAssignModal').modal('hide');
        //打开任务分配Modal
        var assignTaskModal = $('#assignTaskModal');
        assignTaskModal.modal();
        assignTaskModal.find('#btnAssignTask').attr('data-proid', $(this).attr('data-proid'));
    });
};

/**
 * 提交任务分配
 */
htmlObj.submitAssignTask = function () {
    var url = htmlObj.rootUrl + "/pmo/require/flow/distribute";
    var obj = {};
    var startTime = $("#taskStartTime").val(),
        endTime = $("#taskEndTime").val();
    if (!Utils.isNullorEmpty(startTime)) {
        startTime += " 00:00:00";
        obj.startTime = startTime.toSecTime();
    }
    if (!Utils.isNullorEmpty(endTime)) {
        endTime += " 23:59:59";
        obj.endTime = endTime.toSecTime() + 999;
    }
    obj.id = $('#btnBeforeAssign').attr('data-demandid');
    obj.proId = $('#btnBeforeAssign').attr('data-proid');
    //任务详情
    var taskDesc = $("#taskDesc").html();
    obj.taskSendDetail = filterXSS(taskDesc.trim().escapeHtml());
    var theJSON = {
        "pmoRequireTaskList": htmlObj.arr,
        "pmoRequire": obj
    };
    $.ajax({
        url: url,
        type: "post",
        data: JSON.stringify(theJSON),
        beforeSend: function (request) {
            request.setRequestHeader("Content-Type", "application/json;charset=UTF-8;");
            request.setRequestHeader("authorization", htmlObj.authorization);
        },
        success: function (data) {
            if (data.code == "success") {
                $('#assignTaskModal').modal('hide');
                htmlObj.resetValide(validatorOfAssignTask, $("#assignTaskModal"), 'assignTaskForm');
                //刷新需求列表
                htmlObj.datalist();
            } else {
                //显示错误信息
                pageObj.showNotLoginErrorMsg(data.code, data.message);
            }
        }
    });
};

/**
 * 任务分配弹框中需处理的事
 */
htmlObj.initAssignTaskHandle = function () {
    //任务分配表单验证，点击确定就会自动验证，成功后即会请求提交任务分配接口
    htmlObj.validateAssignTask();
    $('#assignTaskModal').on("hidden.bs.modal", function () {
        htmlObj.resetValide(validatorOfAssignTask, $('#assignTaskModal'), 'assignTaskForm');
        //重置富文本
        $("#taskDesc").html('');
    });
    //初始化开始、结束日期
    var theStart = {
        elem: "#taskStartTime",
        format: "YYYY-MM-DD",
        min: laydate.now(), //设定最小日期为当前日期
        festival: true,
        istime: false,
        choose: function (datas) {
            $("#taskStartTime").focusout();
            theEnd.min = datas; //开始日选好后，重置结束日的最小日期
            theEnd.start = datas; //将结束日的初始值设定为开始日
        }
    };
    var theEnd = {
        elem: "#taskEndTime",
        format: "YYYY-MM-DD",
        min: laydate.now(),
        max: '2099-01-01',
        festival: true,
        istime: false,
        choose: function (datas) {
            $("#taskEndTime").focusout();
            theStart.max = datas; //结束日选好后，重置开始日的最大日期
        }
    };
    laydate(theStart);
    laydate(theEnd);

    //初始化“详情--任务分配”Modal的wangEditor富文本编辑器
    htmlObj.wangEditorInit('taskDesc');

    $('#taskOfMebs').on('click', function () {
        //初始化项目相关人员树--多选
        htmlObj.initTreeDbl($('#btnAssignTask').attr('data-proid'));
        $('#assignTaskModal').addClass('z-index20');
        $('#dblperchoose').modal();
        //显示已经选中的
        var treeObj = $.fn.zTree.getZTreeObj("treeDemodbl");
        for (var i = 0; i < htmlObj.arr.length; i++) {
            var theId = htmlObj.arr[i].taskPerson;
            var theNode = treeObj.getNodesByParam("id", theId, null);
            treeObj.checkNode(theNode[0], true, null, true);
            var theParentNode = theNode[0].getParentNode();
            treeObj.expandNode(theParentNode, true, true, true);
        }
    });

};

/**
 * 显示反馈情况
 * @param theArr
 */
htmlObj.showFBData = function (theArr) {
    var theOption = "";
    for (var i = 0; i < theArr.length; i++) {
        var items = theArr[i],
            taskPersonName = items.taskPersonName,
            startTime = items.startTime,
            endTime = items.endTime,
            fadebackInfo = items.fadebackInfo;
        taskPersonName = Utils.isNullorEmpty(taskPersonName) ? "" : taskPersonName;
        startTime = Utils.isNullorEmpty(startTime) ? "" : new Date(parseInt(startTime)).toString().substring(0, 10);
        endTime = Utils.isNullorEmpty(endTime) ? "" : new Date(parseInt(endTime)).toString().substring(0, 10);
        fadebackInfo = Utils.isNullorEmpty(fadebackInfo) ? "" : fadebackInfo;
        theOption += "<tr>";
        theOption += "<td>" + taskPersonName + "</td>";
        theOption += "<td>" + startTime + "</td>";
        theOption += "<td>" + endTime + "</td>";
        theOption += "<td>" + fadebackInfo + "</td>";
        theOption += "</tr>";
    }
    $(".dmd-fblist tbody").empty().append(theOption);
};

/**
 * 提交反馈
 */
htmlObj.submitFeedBack = function () {
    var url = htmlObj.rootUrl + "/pmo/require/flow/completeTask";
    var obj = {},
        startTime = $("#taskStartTime").val();
    if (!Utils.isNullorEmpty(startTime)) {
        startTime += " 00:00:00";
        obj.startTime = startTime.toSecTime();
    }
    obj.fadebackInfo = $('#feedBackInput').val();
    var demandId = $('.btn-tofeedback').attr('data-demandid');
    obj.id = $('.btn-tofeedback').attr('data-fbid');
    obj.requireId = demandId;
    obj.proId = $('.btn-tofeedback').attr('data-proid');
    obj.taskPerson = Utils.getValue('u');
    $.ajax({
        url: url,
        type: "post",
        data: JSON.stringify(obj),
        beforeSend: function (request) {
            request.setRequestHeader("Content-Type", "application/json;charset=UTF-8;");
            request.setRequestHeader("authorization", htmlObj.authorization);
        },
        success: function (data) {
            if (data.code == "success") {
                $('#addFeedBackModal').modal('hide');
                $('#pendingModal').removeClass('z-index20');
                htmlObj.resetValide(validatorOfAddFeedBack, $('#addFeedBackModal'), 'addFeedBackForm');
                //刷新需求列表
                htmlObj.datalist();
                //刷新详情数据
                htmlObj.showDmdDetail(demandId, 'detailPending');
            } else {
                //显示错误信息
                pageObj.showNotLoginErrorMsg(data.code, data.message);
            }
        }
    });
};

/**
 * 关闭需求
 */
htmlObj.closeDemand = function () {
    var requireId = $('.btn-tofeedback').attr('data-demandid');
    var url = htmlObj.rootUrl + "/pmo/require/flow/" + requireId + "/finish";
    $.ajax({
        url: url,
        type: "post",
        beforeSend: function (request) {
            request.setRequestHeader("Content-Type", "application/json;charset=UTF-8;");
            request.setRequestHeader("authorization", htmlObj.authorization);
        },
        success: function (data) {
            if (data.code == "success") {
                layer.closeAll('dialog');
                $('#pendingModal').modal('hide');
                //刷新需求列表
                htmlObj.datalist();
            } else {
                //显示错误信息
                pageObj.showNotLoginErrorMsg(data.code, data.message);
            }
        }
    });
};

/**
 * 任务待处理弹框中需处理的事
 */
htmlObj.initPendingHandle = function () {
    //任务待反馈表单验证，点击确定就会自动验证，成功后即会请求提交任务分配接口
    htmlObj.validatePending();
    $('#addFeedBackModal').on("hidden.bs.modal", function () {
        htmlObj.resetValide(validatorOfAddFeedBack, $('#addFeedBackModal'), 'addFeedBackForm');
        $('#pendingModal').removeClass('z-index20');
    });
    //点击待反馈Modal中的提交反馈按钮，显示填写反馈modal
    $('.btn-tofeedback').on('click', function () {
        $('#pendingModal').addClass('z-index20');
        $('#addFeedBackModal').modal();
    });
    //点击待反馈Modal中的关闭需求按钮
    $('.btn-closedmd').on('click', function () {
        layer.confirm('确定关闭需求', {
            btn: ['确定', '取消'] //按钮
        },function(){htmlObj.closeDemand()});
    });

};

/**
 * 获取组织架构--所有人-单选
 */
htmlObj.initTreeSgl = function () {
    //人员单选（市场负责人、项目经理用）
    $.ajax({
        url: htmlObj.rootUrl + '/pmo/common/users/check',
        type: 'get',
        beforeSend: function (request) {
            request.setRequestHeader("authorization", htmlObj.authorization);
        },
        success: function (data) {
            if (data.code == "success") {
                var zNodes = data.content;
                var setting = {
                    check: {
                        enable: true,
                        chkStyle: "radio",
                        radioType: "all"
                    },
                    data: {
                        simpleData: {
                            enable: true
                        }
                    },
                    view: {
                        dblClickExpand: false
                        // ,showLine: false
                    },
                    callback: {
                        onClick: htmlObj.onClickLeaderSgl
                        // ,onCheck: htmlObj.onCheckLeaderSgl
                    }
                };
                //初始化树
                $.fn.zTree.init($("#treeDemo"), setting, zNodes);
                // 点击确定
                $('#btnChoosePersgl').on('click', function () {
                    var treeObj = $.fn.zTree.getZTreeObj("treeDemo");
                    var nodes = treeObj.getCheckedNodes(true)[0];
                    if (!Utils.isNullorEmpty(nodes)) {
                        //来源--一审modal里选择二审人
                        if (htmlObj.leaderInputSgl == 'meb-twoadt') {
                            $('#twoAdtMeb').val(nodes.name).attr('data-personid', nodes.id).blur();
                            $('#auditOneModal').removeClass('z-index20');
                        }
                        //来源--需求管理页面的发起人
                        else if (htmlObj.leaderInputSgl == 'meb-sponsor') {
                            $('#sponsorKD').val(nodes.name).attr('data-personid', nodes.id);
                        }
                        //来源--需求管理页面的接收人
                        else if (htmlObj.leaderInputSgl == 'meb-receiver') {
                            $('#receiverKD').val(nodes.name).attr('data-personid', nodes.id);
                        }
                    } else {
                        if (htmlObj.leaderInputSgl == 'meb-twoadt') {
                            $('#twoAdtMeb').val('').attr('data-personid', '').blur();
                            $('#auditOneModal').removeClass('z-index20');
                        } else if (htmlObj.leaderInputSgl == 'meb-sponsor') {
                            $('#sponsorKD').val('').attr('data-personid', '');
                        }
                        else if (htmlObj.leaderInputSgl == 'meb-receiver') {
                            $('#receiverKD').val('').attr('data-personid', '');
                        }
                    }

                    $('#sglperchoose').modal('hide');
                    //重置树的状态,取消选中任何节点，且只展开根节点的第一层子节点
                    htmlObj.resetTreeToNoSelected('treeDemo');
                });
                // modal模式窗口的关闭事件（包括叉叉和取消按钮）回调
                $("#sglperchoose").on("hidden.bs.modal", function () {
                    if (htmlObj.leaderInputSgl == 'meb-twoadt') {
                        //显示一审modal
                        $('#auditOneModal').removeClass('z-index20');
                    }
                    //重置树的状态,取消选中任何节点，且只展开根节点的第一层子节点
                    htmlObj.resetTreeToNoSelected('treeDemo');
                });
            } else {
                //显示错误信息
                pageObj.showNotLoginErrorMsg(data.code, data.message);
            }
        }
    });
};

/**
 * 获取任务相关人员--多选
 */
htmlObj.initTreeDbl = function (proId) {
    //人员多选（项目成员用）
    $.ajax({
        url: htmlObj.rootUrl + '/pmo/project/' + proId + '/person_tree',
        type: 'get',
        beforeSend: function (request) {
            request.setRequestHeader("authorization", htmlObj.authorization);
        },
        success: function (data) {
            if (data.code == "success") {
                var zNodes = data.content;
                var setting = {
                    check: {
                        enable: true,
                        chkboxType: {
                            "Y": "ps",
                            "N": "ps"
                        } //勾选、取消勾选都关联父和子节点
                    },
                    data: {
                        simpleData: {
                            enable: true
                        }
                    },
                    view: {
                        dblClickExpand: false
                    },
                    callback: {
                        onClick: htmlObj.onClickLeaderDbl,
                        onCheck: htmlObj.onCheckLeaderDbl
                    }
                };
                //初始化树
                $.fn.zTree.init($("#treeDemodbl"), setting, zNodes);
                // 点击确定
                $('#btnChoosePerdbl').on('click', function () {
                    $('#taskOfMebs').val(htmlObj.checkedNodesName).blur();
                    $('#assignTaskModal').removeClass('z-index20');
                    $('#dblperchoose').modal('hide');
                    // //重新初始化树，达到不选中任何节点的效果，可行。
                    // $.fn.zTree.init($("#treeDemodbl"), setting, zNodes);
                });
                // modal模式窗口的关闭事件（包括叉叉和取消按钮）回调
                $("#dblperchoose").on("hidden.bs.modal", function () {
                    $('#assignTaskModal').removeClass('z-index20');
                });

            } else {
                //显示错误信息
                pageObj.showNotLoginErrorMsg(data.code, data.message);
            }
        }
    });
};

/**
 * 单选人员树的click事件
 * @param e
 * @param treeId
 * @param treeNode
 * @returns {boolean}
 */
htmlObj.onClickLeaderSgl = function (e, treeId, treeNode) {
    var zTree = $.fn.zTree.getZTreeObj("treeDemo");
    zTree.expandNode(treeNode);
    if (treeNode.children.length <= 0) {
        zTree.checkNode(treeNode, !treeNode.checked, null, true);
    }
    return false;
};

/**
 * 单选人员树的check事件
 * @param e
 * @param treeId
 * @param treeNode
 */
htmlObj.onCheckLeaderSgl = function (e, treeId, treeNode) {
    var zTree = $.fn.zTree.getZTreeObj("treeDemo"),
        nodes = zTree.getCheckedNodes(true),
        v = "";
    for (var i = 0, l = nodes.length; i < l; i++) {
        v += nodes[i].name + ",";
    }
    if (v.length > 0) v = v.substring(0, v.length - 1);
    console.log('选中：' + v);
};

/**
 * 多选人员树的click事件
 * @param e
 * @param treeId
 * @param treeNode
 * @returns {boolean}
 */
htmlObj.onClickLeaderDbl = function (e, treeId, treeNode) {
    var zTree = $.fn.zTree.getZTreeObj("treeDemodbl");
    zTree.expandNode(treeNode);
    /*var childs = treeNode.children;
     //如果选中了根节点，就选中其所有子节点
     if (treeNode.tId == "treeDemodbl_1") {
     for (var i = 0, l = childs.length; i < l; i++) {
     zTree.checkNode(childs[i], !childs[i].checked, null, true);
     }
     var rootNode = zTree.getNodeByTId('treeDemodbl_1');
     zTree.checkNode(rootNode, !treeNode.checked, null, true);
     } else {
     zTree.checkNode(treeNode, !treeNode.checked, null, true);
     }
     zTree.checkNode(treeNode, !treeNode.checked, null, true);*/
    return false;
};

/**
 * 多选人员树的check事件
 * @param e
 * @param treeId
 * @param treeNode
 */
htmlObj.onCheckLeaderDbl = function (e, treeId, treeNode) {
    var zTree = $.fn.zTree.getZTreeObj("treeDemodbl");
    //重置
    htmlObj.arr = [];
    htmlObj.checkedNodesName = '';
    var nodes = zTree.getCheckedNodes(true);
    for (var i = 0, l = nodes.length; i < l; i++) {
        if (nodes[i].tId != "treeDemodbl_1") {
            htmlObj.arr.push({
                'taskPerson': nodes[i].id,
                'taskPersonName': nodes[i].name,
                'personCategory': 3
            });
            htmlObj.checkedNodesName += nodes[i].name + "、";
        }
    }
    if (htmlObj.checkedNodesName.length > 0) {
        htmlObj.checkedNodesName = htmlObj.checkedNodesName.substring(0, htmlObj.checkedNodesName.length - 1);
    }
};

/**
 * 表单验证--一审
 */
htmlObj.validateAdtOne = function () {
    validatorOfAdtOne = $("#auditOneForm").validate({
        debug: true,
        onfocusout: function (element) {
            $(element).valid();
        },
        onsubmit: function (element) {
            $(element).valid();
        },
        errorPlacement: function (error, element) {
            //修改提示信息出现的位置
            var eleName = $(element).attr("name");
            if (eleName == "adtIsNeedTwoadt") {
                error.css({
                    'margin-left': '87px'
                });
            } else {
                error.css({
                    'margin-left': '75px'
                });
            }
            error.appendTo(element.parent());
        },
        submitHandler: function () { //验证完成，保存数据
            var adtIsNeedTwoadt = $("#adtIsNeedTwoadt").val();
            //如果需要二审
            if (adtIsNeedTwoadt == "1") {
                var twoAdtMeb = $('#twoAdtMeb');
                if (Utils.isNullorEmpty(twoAdtMeb.val())) {
                    var error = "<label class=\"error\" for=\"twoAdtMeb\">请选择二审人员</label>";
                    twoAdtMeb.parent().append(error);
                } else {
                    //提交一审
                    htmlObj.submitAuditOne();
                }
            } else {
                //只有一审，提交审核
                htmlObj.submitAuditOne();
            }
        },
        rules: {
            adtOneIsAgree: {
                required: true
            },
            adtIsNeedTwoadt: {
                required: true
            }
        },
        messages: {
            adtOneIsAgree: {
                required: "请选择审核人意见"
            },
            adtIsNeedTwoadt: {
                required: "请选择是否需要二审"
            }
        }
    });
};

/**
 * 表单验证--二审
 */
htmlObj.validateAdtTwo = function () {
    validatorOfAdtTwo = $("#auditTwoForm").validate({
        debug: true,
        onfocusout: function (element) {
            $(element).valid();
        },
        onsubmit: function (element) {
            $(element).valid();
        },
        errorPlacement: function (error, element) {
            //修改提示信息出现的位置
            var eleName = $(element).attr("name");
            error.css({
                'margin-left': '75px'
            });
            error.appendTo(element.parent());
        },
        submitHandler: function () {
            //提交二审
            htmlObj.submitAuditTwo();
        },
        rules: {
            adtTwoIsAgree: {
                required: true
            }
        },
        messages: {
            adtTwoIsAgree: {
                required: "请选择审核人意见"
            }
        }
    });
};

/**
 * 表单验证--任务分配
 */
htmlObj.validateAssignTask = function () {
    var editorCheck = function (editid) {
        var editorEdit = $("#" + editid).html(),
            result = false;
        if (Utils.isNullorEmpty(editorEdit) || editorEdit == "<p><br></p>") {
            var error = "<label class=\"error\" for=\"editorExamine\">请输入任务说明</label>";
            if ($("#" + editid).parents(".wangEditor-container").find("label[for='editorExamine']").length <= 0) {
                $("#" + editid).parents(".wangEditor-container").append(error);
            } else {
                $("#" + editid).parents(".wangEditor-container").find("label[for='editorExamine']").text("请输入任务说明").show();
            }
            return false;
        } else {
            var reg = /<[^>]*>|/g,
                editorText = editorEdit.replace(/<[^>]*>|/g, "");
            if (editorEdit.length > 600) {
                var error = "<label class=\"error\" for=\"editorExamine\">任务说明内容最大输入长度为600</label>";
                if ($("#" + editid).parents(".wangEditor-container").find("label[for='editorExamine']").length <= 0) {
                    $("#" + editid).parents(".wangEditor-container").append(error);
                } else {
                    $("#" + editid).parents(".wangEditor-container").find("label[for='editorExamine']").text("任务说明内容最大输入长度为600").show();
                }
                return false;
            } else {
                $("#" + editid).parents(".wangEditor-container").find("label[for='editorExamine']").remove();
                result = true;
            }
        }
        return result;
    };

    validatorOfAssignTask = $("#assignTaskForm").validate({
        debug: true,
        onfocusout: function (element) {
            $(element).valid();
        },
        onsubmit: function (element) {
            $(element).valid();
        },
        errorPlacement: function (error, element) {
            //修改提示信息出现的位置
            var eleName = $(element).attr("name");
            error.css({
                'margin-left': '97px'
            });
            error.appendTo(element.parent());
        },
        submitHandler: function () {
            var editcheck = editorCheck("taskDesc");
            if (editcheck == true || editcheck == "true") {
                //提交任务分配
                htmlObj.submitAssignTask();
            }
        },
        rules: {
            taskStartTime: {
                required: true
            },
            taskEndTime: {
                required: true
            },
            taskOfMebs: {
                required: true
            }
        },
        messages: {
            taskStartTime: {
                required: "请选择任务启动日期"
            },
            taskEndTime: {
                required: "请选择任务截止日期"
            },
            taskOfMebs: {
                required: "请选择相关人员"
            }
        }
    });

    $("#taskDesc").on("keyup", function () {
        var editid = $(this).attr("id");
        editorCheck(editid);
    });
};

/**
 * 表单验证--添加反馈
 */
htmlObj.validatePending = function () {
    validatorOfAddFeedBack = $("#addFeedBackForm").validate({
        debug: true,
        onfocusout: function (element) {
            $(element).valid();
        },
        onsubmit: function (element) {
            $(element).valid();
        },
        errorPlacement: function (error, element) {
            //修改提示信息出现的位置
            var eleName = $(element).attr("name");
            error.appendTo(element.parent());
        },
        submitHandler: function () { //验证完成，保存数据
            //提交反馈内容
            htmlObj.submitFeedBack();
        },
        rules: {
            feedBackInput: {
                required: true
            }
        },
        messages: {
            feedBackInput: {
                required: "请输入反馈内容"
            }
        }
    });
};

/**
 * 重置表单validate插件验证信息和样式
 * @param validator
 * @param node
 */
htmlObj.resetValide = function (validator, node, formId) {
    validator.resetForm();
    node.find('input,select,textarea').each(function () {
        if ($(this).hasClass('error')) {
            $(this).removeClass('error');
        }
    });
    document.getElementById(formId).reset();
};

/**
 * 重置树的状态,取消选中任何节点，且只展开根节点的第一层子节点
 * @param treeULId
 */
htmlObj.resetTreeToNoSelected = function (treeULId) {
    var theTreeObj = $.fn.zTree.getZTreeObj(treeULId);
    var nodesChecked = theTreeObj.getCheckedNodes();
    for (var i = 0; i < nodesChecked.length; i++) {
        theTreeObj.checkNode(nodesChecked[i], false, null, true);
    }
    /*var nodes = theTreeObj.getSelectedNodes();
     for (var i = 0; i < nodes.length; i++) {
     theTreeObj.cancelSelectedNode(nodes[i]);
     }*/
    theTreeObj.expandAll(false);
    var theRootNode = theTreeObj.getNodeByParam('id', 1, null);
    theTreeObj.expandNode(theRootNode);
};

htmlObj.getDepLeaderList = function () {
    var cmd = new CommandAjax(htmlObj.rootUrl + "/authority/user/query/list", htmlObj.authorization);
    if (!Utils.isNullorEmpty($('#queryKD').val())) {
        cmd.queryInfo = $('#queryKD').val();
    }
    $("#depLeaderList").datagrid({
        columns: [{
            display: "姓名",
            name: "realname",
            width: "80px",
            align: "center"
        }, {
            display: "所属部门",
            name: "depName",
            width: "130px",
            align: "center"
        }, {
            display: "邮箱",
            name: "email",
            width: "160px",
            align: "center"
        }, {
            display: "操作",
            width: "80px",
            align: "center",
            render: function (row) {
                var id = row.id,
                    name = row.realname,
                    rowHtml = '';
                rowHtml += '<a class="oprate" title="选定" href="javascript:void(0);" onclick="htmlObj.chooseLeader(\'' + id + '\',\'' + name + '\')">选定</a>';
                return rowHtml;
            }
        }],
        reqdata: cmd,
        isShowCheckBox: false,
        rowNumber: true,
        onResponse: function (data) {
        	
            return data;
        },
        onComplete: function (data) {
            if (data.code != 'success') {
                //显示错误信息
                layer.msg(data.message);
            }
            $('#'+ this.targetID).find('table tr').css({'user-select': 'none', 'cursor': 'pointer'}).on('dblclick', function(){
                $(this).find('.oprate').click();
            })
        }
    });

    //选择部门负责人modal的关闭事件
    $('#chooseDepLeaderModal').on("hidden.bs.modal", function () {
        switch (htmlObj.personClickfrom) {
            case 'leaderlist':
                $('#addDepModal').removeClass('z-index20');
                break;
            case 'leaderlist2add':
                $('#addpro').removeClass('z-index20');
                break;
            case 'leaderlist3add':
                $('#addpro').removeClass('z-index20');
                break;
        }
    });
};
//模糊查询点击事件
$('#btnSearchDepLeader').on('click', function () {
    htmlObj.getDepLeaderList();
});
htmlObj.chooseLeader = function (personId, personName) {
    $('#' + htmlObj.personClickfrom).val(personName).attr('data-personid', personId).blur();
    $('#choosePersonModal').modal('hide');
    $('#queryKD').val('');
    htmlObj.getDepLeaderList();
    if($('#' + htmlObj.personClickfrom).val()!=''){
    	$('#' + htmlObj.personClickfrom).parent().find('.input_clear').show();
    }
    $('#receivePerson').attr('data-manageid', personId).val(personName)
    $('#auditOneModal').removeClass('z-index20');
};

/**
 * 获取用户操作按钮权限
 */
htmlObj.getMenuButton = function () {
    var resourceId = $(".main-menu li.active").attr("data-id");
    $.ajax({
        url: htmlObj.rootUrl + '/authority/resource/user/resources?resourceId=' + resourceId,
        type: 'get',
        async: false,
        beforeSend: function (request) {
            request.setRequestHeader("authorization", htmlObj.authorization);
        },
        success: function (data) {
            if (data.code == "success") {
                var content = data.content;
                var options = '';
                for (var i = 0; i < content.length; i++) {
                    var theData = content[i];
                    if(theData.url == "pmo_add_demand"){
                        options += '<button class="btn btn-turquoise btn-add" id="' + theData.url + '">' + theData.name + '</button>';
                    }
                }
                $('.button-power-position').append(options);
            } else {
                //显示错误信息
                pageObj.showNotLoginErrorMsg(data.code, data.message);
            }
        }
    });
};
/**
 * 初始化
 */
htmlObj.init = function () {
    //从项目管理传过来的项目code
    var proCodeFromPM = Utils.getValue('proCodeFromPM');
    if (!Utils.isNullorEmpty(proCodeFromPM)) {
        $("input[name='proname']").val(proCodeFromPM);
        Utils.setTimeValue('proCodeFromPM', proCodeFromPM, -1); //设置这个cookie值过时
    }
    htmlObj.getMenuButton();
    htmlObj.getHandelNumbers();
    htmlObj.datalist(); //获取需求列表
    htmlObj.getMarketCenter(); //获取营销中心下拉列表
    htmlObj.getPmoStatus(); //获取需求状态列表
    htmlObj.initLaydate(); //初始化时间控件
    htmlObj.addOrExportModal(); //新增需求、导出需求弹窗
    htmlObj.wangEditorInit('reqDetail'); //初始化新建项目Modal的wangEditor富文本编辑器
    htmlObj.formValidate(); //表单验证
    htmlObj.clearForm(); //重置表单
    htmlObj.choseProOrUser();

    $('#receivePerson').on('click', function () {
        htmlObj.chooseReceivePerson();
    });
    $(".button-position").on("click", ".list-search", function () { //点击按钮查询需求列表
        htmlObj.datalist();
    });
    //项目归属点击查询列表
    $(".ascription").on("click", "li", function () {
        var $this = $(this);
        $this.addClass("active").siblings("li").removeClass("active");
        $(this).parents(".form-horizontal").find(".btn-search").click();
    });
    //点击多条件查询区的发起人
    /*$('#sponsorKD').on('click', function () {
    	htmlObj.personClickfrom = "sponsorKD";
        $("#choosePersonModal").modal("show");
        htmlObj.getDepLeaderList();
    });*/
    //点击多条件查询区的接收人
    /*$('#receiverKD').on('click', function () {
    	htmlObj.personClickfrom = "receiverKD";
        $("#choosePersonModal").modal("show");
        htmlObj.getDepLeaderList();
    });*/

    //初始化一审Modal处理事项
    htmlObj.initAuditOneHandle();
    //初始化二审Modal处理事项
    htmlObj.initAuditTwoHandle();
    //初始化待分配任务Modal处理事项
    htmlObj.initBeforeAssignHandle();
    //初始化任务分配Modal处理事项
    htmlObj.initAssignTaskHandle();
    //初始化任务待处理Modal处理事项
    htmlObj.initPendingHandle();
    
    $(".input_clear").parent().find("input").focus(function(event){  
    	if($(this).val()=='') {
    		$(this).parent().children(".input_clear").show();  
    	}
    });  
    $(".input_clear").parent().find("input").blur(function(event){  
        if($(this).val()=='')  
        {  
            $(this).parent().children(".input_clear").hide();  
        }  
    });  
    $(".input_clear").click(function(event){  
        $(this).parent().find('input').val('');  
        $(this).parent().find('input').attr('data-personid','');  
        $(this).hide();  
    });
    $('#choosePersonModal').on('hidden.bs.modal', function (e) {
    	$("#queryKD").val("");
    })
};

$(function () {
    htmlObj.init();
});