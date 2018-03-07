/**
 * Created by Administrator on 2017/3/28.
 */
var htmlObj = {};
htmlObj.rootUrl = appHost + approot;
var validatorOfAddClient; //新增客户的validate对象
htmlObj.authorization = Utils.getValue('authorization'); //获取登录人的userId和Token
htmlObj.personClickfrom = "";

htmlObj.getLocationPara = function (name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (!isNullorEmpty(r)) {
      return unescape(r[2]);
    }
    return null;
};

isNullorEmpty = function (str) {
    if (str === undefined || str === "undefined" || str === "" || str === null || str === "null") {
      return true;
    } else {
      return false;
    }
};

/**
 * 获取当前登录人在客户管理里面能看到的按钮
 */
htmlObj.getMenuButton = function () {
	var resourceId = $("li.active").attr("data-id");
    $.ajax({
        url: htmlObj.rootUrl + '/authority/resource/user/resources?resourceId=' + resourceId,
        type: 'get',
        beforeSend: function (request) {
            request.setRequestHeader("authorization", htmlObj.authorization);
        },
        success: function (data) {
            if (data.code == "success") {
                var content = data.content;
                var options = '';
                for (var i = 0; i < content.length; i++) {
                    var theData = content[i];
                    options += '<button class="btn btn-turquoise" id="' + theData.url + '">' + theData.name + '</button>';
                }
                $('#btnsOfListContain').html(options);
                //点击新增客户
                $("#crm_add_client").click(function () {
                	$('#cCharge').val(Utils.getValue('realname')).attr('data-personid', Utils.getValue('u'));
                	$("#addClientModal").modal();
                });
            } else {
                //显示错误信息
                pageObj.showNotLoginErrorMsg(data.code, data.message);
            }
        }
    });
};

/**
 * 获取客户列表
 */
htmlObj.getProList = function (flag) {
    var cmd = new CommandAjax(htmlObj.rootUrl + "/crm/client/list", htmlObj.authorization);
    if (flag == 2) {
    	cmd.isMyKeeper = 1;
    }
    cmd = htmlObj.setParam(cmd);
    $("#prolist").datagrid({
        columns: [{
            display: "客户名称",
            name: "name",
            width: "120px",
            align: "center"
        }, {
            display: "片区",
            name:"regionName",
            width: "100px",
            align: "center"
        }, {
            display: "联系人姓名",
            name: "contactsName",
            width: "90px",
            align: "center"
        }, {
            display: "联系人电话",
            align: "center",
            width:"100px",
            name: "contactsPhone"
        }, {
            display: "负责人",
            name: "keeperName",
            width: "90px",
            align: "center"
        }, {
            display: "客户类型",
            name: "clientTypeName",
            width: "90px",
            align: "center"
        }, {
            display: "客户状态",
            name: "clientStatusName",
            width: "90px",
            align: "center",
        }, {
            display: "成交状态",
            name: "dealStatusName",
            width: "100px",
            align: "center",
        }, {
            display: "跟进记录",
            width: "80px",
            align: "center",
            name: "followCount",
        }, {
            display: "最后跟进时间",
            width: "120px",
            align: "center",
        	render: function (row) {
        		if(row.lastFlowTime == 0 || row.lastFlowTime == null ){
            		return "";
            	}
                return new Date(row.lastFlowTime).Format("yyyy-MM-dd hh:mm");
            }
        }, {
            display: "操作",
            width: "100px",
            render: function (row) {
                var id = row.id,
                    rowHtml = '';
                	rowHtml += "<a class='oprate' title='详情' target='_blank' href='project/clientDetail.html?id="+id+"'>详情</a>";
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
 * 获取选择的负责人，并显示到来源input
 * @param personId
 */
htmlObj.chooseLeader = function (personId, personName) {
    $('#' + htmlObj.personClickfrom).val(personName).attr('data-personid', personId).blur();
    $('#choosePersonModal').modal('hide');
    $('#queryKD').val('');
    htmlObj.getDepLeaderList();
    if($('#' + htmlObj.personClickfrom).val()!=''){
    	$('.input_clear').show();
    }
};

/**
 * 设置参数
 * @param {Object} cmd
 */
htmlObj.setParam = function (cmd) {
    var clientName = $("#cNameQ").val(), // 客户名称模糊查询
    	keeperName = $("#cChargeQ").val(), // 负责人
    	regionId = $("select[id='cAreaQ']").val(),//片区
    	clientStatusId = $("select[id='cTypeQ']").val(),// 客户类型
    	clientTypeId = $("select[id='cStatusQ']").val(),//客户状态
    	dealStatusId = $("select[id='cBargainStatusQ']").val(),//成交状态
    	clientLevelId = $("select[id='cRankQ']").val(),//客户级别
    	coAreaId = $("select[id='cTerritoryQ']").val()//合作领域
//      coModeId = $("input[id='leaderlist']").attr("data-personid"),
    if (!Utils.isNullorEmpty(clientName)) {
        cmd.clientName = clientName;
    }
    if (!Utils.isNullorEmpty(keeperName)) {
        cmd.keeperName = keeperName;
    }
    if (!Utils.isNullorEmpty(regionId)) {
        cmd.regionId = regionId;
    }
    if (!Utils.isNullorEmpty(clientTypeId)) {
        cmd.clientTypeId = clientTypeId;
    }
    if (!Utils.isNullorEmpty(clientStatusId)) {
        cmd.clientStatusId = clientStatusId;
    }
    if (!Utils.isNullorEmpty(dealStatusId)) {
        cmd.dealStatusId = dealStatusId;
    }
    if (!Utils.isNullorEmpty(clientLevelId)) {
        cmd.clientLevelId = clientLevelId;
    }
    if (!Utils.isNullorEmpty(coAreaId)) {
        cmd.coAreaId = coAreaId;
    }
    return cmd;
};

/**
 * 获取下拉框数据
 */
htmlObj.getSelect = function (e) {
	var flag = $(e).attr("flag");
	var url = htmlObj.rootUrl + "/crm/fields/list?belongCode=" + flag;
    $.ajax({
    	url:url,
        type: 'get',
        beforeSend: function (request) {
            request.setRequestHeader("authorization", htmlObj.authorization);
        },
        success: function (data) {
            if (data.code == "success") {
                var content = data.content;
                var options = '<option value="">--请选择--</option>';
                for (var i = 0; i < content.length; i++) {
                    options += '<option value="' + content[i].id + '">' + content[i].name + '</option>';
                }
                $(e).html(options);
            } else {
                //显示错误信息
                pageObj.showNotLoginErrorMsg(data.code, data.message);
            }
        }
    });
};

/**
 * 添加客户Modal弹框中需处理的事
 */
htmlObj.initAddClientHandle = function () {
    //添加用户的表单验证
    htmlObj.validateAddClient();
    var addClientModal = $('#addClientModal');
    addClientModal.on("hidden.bs.modal", function () {
        htmlObj.resetValide(validatorOfAddClient, addClientModal, 'addClientForm');
    });
};

/**
 * 新增客户
 */
htmlObj.addNewProject = function () {
	var name = $("#cName").val(), // 客户名称模糊查询
	keeperName = $("#cCharge").val(), // 负责人
	keeperId = $("#cCharge").attr("data-personid"), // 负责人
	regionId = $("select[id='cArea']").val(),//片区
	clientTypeId = $("select[id='cType']").val(),// 客户类型
	clientStatusId = $("select[id='cStatus']").val(),//客户状态
	dealStatusId = $("select[id='cBargainStatus']").val(),//成交状态
	clientLevelId = $("select[id='cRank']").val(),//客户级别
	coAreaId = $("select[id='cTerritory']").val();//合作领域
	address = $('#cAddress').val();
	comments = $("#cDesc").val();
	
    var obj = {};
    obj['name'] = name;
    obj['keeperName'] = keeperName;
    obj['keeperId'] = keeperId;
    obj['regionId'] = regionId;
    obj['address'] = address;
    obj['clientLevelId'] = clientLevelId;
    obj['clientStatusId'] = clientStatusId;
    obj['clientTypeId'] = clientTypeId;
    obj['dealStatusId'] = dealStatusId;
    obj['coAreaId'] = coAreaId;
    obj['comments'] = comments;
    var xx = [];
    $(".contact-item").each(function(index,e){
    	var cobj = {};
    	contactsName = $(e).find(".c-name").val();
    	contactsPhone = $(e).find(".c-tel").val();
    	contactsPost = $(e).find(".c-post").val();
    	contactsRemark = $(e).find(".c-remark").val();
    	cobj['name'] = contactsName;
	    cobj['phone'] = contactsPhone;
	    cobj['title'] = contactsPost;
	    cobj['comments'] = contactsRemark;
    	xx[index] = cobj;
    });
    
    //拼接参数
    var theJson = JSON.stringify({"crmClient": obj, "crmClientContactses": xx});
    //请求接口
    $.ajax({
        url: htmlObj.rootUrl + '/crm/client',
        type: 'post',
        data: theJson,
        beforeSend: function (request) {
            request.setRequestHeader("Content-Type", "application/json;charset=UTF-8;");
            request.setRequestHeader("authorization", htmlObj.authorization);
        },
        success: function (data) {
            if (data.code == "success") {
                document.getElementById("addClientForm").reset();
                $('#addClientModal').modal('hide');
                $('#btnAddClient').removeAttr('disabled');//解禁
                //刷新客户列表
                htmlObj.getProList();
            } else {
                //显示错误信息
                pageObj.showNotLoginErrorMsg(data.code, data.message);
            }
        }
    });
};

/**
 * 表单验证--添加客户
 */
htmlObj.validateAddClient = function () {
    //表单验证
    validatorOfAddClient = $("#addClientForm").validate({
        debug: true,
        onfocusout: function (element) {
            $(element).valid();
        },
        submitHandler: function () {
            $('#btnAddClient').attr('disabled', 'disabled');
            //添加客户
            htmlObj.addNewProject();
        },
        rules: {
            contractName:{
                required: true
            },
            contractTel: {
                required: true
            },
            cName: {
                required: true
            },cStatus: {
                required: true
            }, cType: {
                required: true
            }, cTerritory: {
                required: true
            }, cBargainStatus: {
                required: true
            }, cRank: {
                required: true
            }, cAddress: {
                required: true
            }, cArea: {
            	required: true
       		}, cCharge: {
       			required: true
       		}
        }, messages: {
            contractName:{
                required: "联系人姓名不能为空！"
            },
            contractTel: {
                required: "联系人电话不能为空！"
            },
        	cName: {
                required: "客户名称不能为空！"
            }, cStatus: {
                required: "请选择客户状态！",
            }, cType: {
                required: "请选择客户类型！",
            }, cTerritory: {
                required: "请选择合作领域！",
            }, cBargainStatus: {
                required: "请选择成交状态！",
            }, cRank: {
                required: "请选择客户级别！",
            }, cAddress: {
                required: "请输入详细地址！",
            }, cArea: {
            	required: "请选择片区！",
            }, cCharge: {
            	required: "请选择负责人！",
            }
        }, errorPlacement: function (error, element) {
            //修改提示信息出现的位置
            var eleName = $(element).attr("name");
            if (eleName == "provincelistadd") {
                error.insertAfter(element.parents(".area-block"));
            } else {
                error.appendTo(element.parent());
            }
        }
    });
};

/**
 * 获取负责人，列表形式展现且可模糊搜索
 */
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
            case 'addDep':
                $('#addDepModal').removeClass('z-index20');
                break;
            case 'editDep':
                $('#editDepModal').removeClass('z-index20');
                break;
            case 'addPer':
                $('#addPersonModal').removeClass('z-index20');
                break;
        }
    });
};
//模糊查询点击事件
$('#btnSearchDepLeader').on('click', function () {
    htmlObj.getDepLeaderList();
});
/**
 * 添加一行联系人layout
 */
htmlObj.addContactLayout=function () {
  var option='<div class="row form-inline contact-item">'+
        '<div class="form-group col-sm-2">'+
        '<input type="text" class="form-control c-name"/>'+
        '</div>'+
        '<div class="form-group col-sm-2">'+
        '<input type="text" class="form-control c-tel"/>'+
        '</div>'+
        '<div class="form-group col-sm-2">'+
        '<input type="text" class="form-control c-post"/>'+
        '</div>'+
        '<div class="form-group col-sm-4">'+
        '<input type="text" class="form-control c-remark"/>'+
        '</div>'+
        '<div class="form-group col-sm-2">'+
        '<img src="skins/img/shanchu@2x.png" alt="" class="icon-del">'+
        '</div>'+
        '</div>';
        $('.contact-contain').append(option);
};

/**
 * 重置表单validate插件验证信息和样式
 * @param validator
 * @param node
 * @param formId
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
 *
 * 快捷入口进入
 */
htmlObj.getEntryType = function () {
    var fastEntry = Utils.getValue('fastEntry');
    var type = fastEntry.split('|')[0];
    var id = fastEntry.split('|')[1];
    if(type == 'client'){   //发起审批
        $('#addClientModal').modal("show");
    }else if(type == 'business'){
        $('.main-menu li').each(function(a, b){
            if($(b).attr('data-id') == id){
                $(b).find('a').trigger('click');
                setTimeout(function(){
                    $('#addBusinessModal').modal('show');
                }, 800)
            }
        })
    }
    Utils.setValue('fastEntry', 'null');
};

/**
 * 初始化
 */
htmlObj.init = function () {
   
     htmlObj.getMenuButton();

     //获取客户列表
    htmlObj.getProList();
    $(".button-position").on("click", ".btn-search", function () {
    	 htmlObj.getProList($(this).parents('.complaimOrder').find('.active').attr("data-state"));
    });
    htmlObj.initAddClientHandle();//初始化添加客户Modal处理事项
    $('.form-group').find('select').each(function(index){
    	htmlObj.getSelect(this);
    })
    //添加一行联系人layout
    $('#btnIconAdd').on('click',function () {
        htmlObj.addContactLayout();
    });
    //删除一行联系人layout
    $('.contact-contain').on('click', ".icon-del", function () {
        $(this).parents(".contact-item").remove();
    });
    // $('#cChargeQ').on('click',function(event){
    // 	$('#choosePersonModal').modal('show');
    // 	htmlObj.personClickfrom = "cChargeQ";
    // 	htmlObj.getDepLeaderList();
    // });
    $('#cCharge').on('click',function(event){
    	$('#choosePersonModal').modal('show');
    	htmlObj.personClickfrom = "cCharge";
    	htmlObj.getDepLeaderList();
    });
    $(".ul li").on('click',function(event){
    	$(".ul li").attr("class","");
    	$(this).attr("class","active");
    	$(this).parents(".complaimOrder").find("option[value='']").attr("selected","true");
    	htmlObj.getProList($(this).attr("data-state"));
    });
    // $("#cChargeQ").focus(function(){
    // 	if($(this).val()=='') {
    // 		$(this).parent().children(".input_clear").show();
    // 	}
    // });
    // $("#cChargeQ").blur(function(){
    //     if($(this).val()=='')
    //     {
    //         $(this).parent().children(".input_clear").hide();
    //     }
    // });
    $(".input_clear").click(function(){  
        $(this).parent().find('input').val('');  
        $(this).parent().find('input').attr('data-personid','');  
        $(this).hide();  
    });
    $('#choosePersonModal').on('hidden.bs.modal', function (e) {
    	$("#queryKD").val("");
    });
    htmlObj.getEntryType();
};


Date.prototype.Format = function (fmt) { //author: meizz 
    var o = {
        "M+": this.getMonth() + 1, //月份 
        "d+": this.getDate(), //日 
        "h+": this.getHours(), //小时 
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}
$(function () {
    htmlObj.init();
});