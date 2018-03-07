/**
 * Created by Administrator on 2017/3/28.
 */
var htmlObj = {};
htmlObj.rootUrl = appHost + approot;
var validatorOfAddBusiness; //新增商机的validate对象
htmlObj.authorization = Utils.getValue('authorization'); //获取登录人的userId和Token

/**
 * 获取当前登录人在商机管理里面能看到的按钮
 */
htmlObj.getMenuButton = function () {
	var resourceId = $("li.active").attr("data-id");
    $.ajax({
        url: htmlObj.rootUrl + '/authority/resource/user/resources?resourceId=' + resourceId,        type: 'get',
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
                //点击新增商机
                $("#pmo_add_project").click(function () {
                    //重置表单数据
                    document.getElementById("addproForm").reset();
                    //重置表单验证信息
                    htmlObj.resetValide(validatorOfAddBusiness, $("#addpro"));
                    $("#addpro").modal();
                });
            } else {
                //显示错误信息
                pageObj.showNotLoginErrorMsg(data.code, data.message);
            }
        }
    });
};

/**
 * 获取商机列表
 */
htmlObj.getOppList = function (flag) {
    var cmd = new CommandAjax(htmlObj.rootUrl + "/crm/opp/list", htmlObj.authorization);
    if (flag == 2) {
    	cmd.isMyKeeper = 1;
    }
    cmd = htmlObj.setParam(cmd);
    $("#opplist").datagrid({
        columns: [{
            display: "商机名称",
            name: "name",
            width: "100px",
            align: "center"
        	}, {
	            display: "客户名称",
	            name: "clientName",
	            width: "100px",
	            align: "center"
	        }, {
	            display: "跟进人",
	            name: "keeperName",
	            width: "80px",
	            align: "center"
	        }, {
	            display: "销售阶段",
	            width: "90px",
	            name: "saleStageName",
	            align: "center"
	        }, {
	            display: "片区",
	            width: "90px",
	            align: "center",
	            name: "regionName"
	        }, {
	            display: "意向项目",
	            name: "intItemsName",
	            width: "90px",
	            align: "center"
	        }, {
	            display: "合作模式",
	            name: "coModeName",
	            width: "90px",
	            align: "center"
	        }, {
	            display: "预计销售金额",
	            width: "100px",
	            align: "center",
	            render: function (row) {
	                return  row.advanceSales + " 万元";
	            }
	        }, {
	            display : "预计成交日期",
				width : "100px",
				align : "center",
				render : function(row) {
					if (row.dealDate == 0
							|| row.dealDate == null) {
						return "";
					}
					return new Date(row.dealDate).Format("yyyy-MM-dd");
	            }
	        }, {
	            display: "跟进记录",
	            width: "80px",
	            align: "center",
	            name: "followCount"
	        }, {
	            display: "最后跟进时间",
	            width: "120px",
	            align: "center",
	            render: function (row) {
	            	if(row.lastFlowTime == 0 || row.lastFlowTime == null){
	            		return "";
	            	}
	            	return new Date(row.lastFlowTime).Format("yyyy-MM-dd hh:mm");
	            }
	        }, {
            display: "操作",
            width: "60px",
            render: function (row) {
                var id = row.id,
                    rowHtml = '';
                rowHtml += '<a class="oprate" title="详情" target="_blank" href="project/businessDetail.html?id='+id+'" >详情</a>';
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
                pageObj.showNotLoginErrorMsg(data.code, data.message);
            }
        }
    });
};

/**
 * 设置参数
 */
htmlObj.setParam = function (cmd) {
	 var name = $("#bNameQ").val(), // 商机名称模糊查询
	 	 clientName = $("bClientNameQ").val(); //客户名称
	 	 keeperName = $("#bFollowQ").val(), // 负责人
	 	 keeperId = $("#bFollowQ").attr("data-personid"), // 负责人id
	 	 regionId = $("select[id='bAreaQ']").val(),//片区
	 	 intItemsId = $("select[id='bWantProQ']").val(),// 意向项目
	 	 coModeId = $("select[id='bCollaborateModeQ']").val(),//合作模式
	 	 saleStageId = $("select[id='bSalesStageQ']").val(),//销售状态
	 	 lastFlowTime = new Date($("#bLastFollowTimeQ").val()).getTime();
    if (!Utils.isNullorEmpty(name)) {
        cmd.name = name;
    }
    if (!Utils.isNullorEmpty(clientName)) {
        cmd.clientName = clientName;
    }
    if (!Utils.isNullorEmpty(keeperName)) {
        cmd.keeperName = keeperName;
    }
    if (!Utils.isNullorEmpty(keeperId)) {
        cmd.keeperId = keeperId;
    }
    if (!Utils.isNullorEmpty(regionId)) {
        cmd.regionId = regionId;
    }
    if (!Utils.isNullorEmpty(intItemsId)) {
        cmd.intItemsId = intItemsId;
    }
    if (!Utils.isNullorEmpty(coModeId)) {
        cmd.coModeId = coModeId;
    }
    if (!Utils.isNullorEmpty(saleStageId)) {
        cmd.saleStageId = saleStageId;
    }
    if (lastFlowTime > 0) {
    	cmd.lastFlowTime = lastFlowTime;
    }
    return cmd;
};

/**
 * 获取营销中心
 */
htmlObj.getMarketCenter = function () {
    $.ajax({
        url: htmlObj.rootUrl + '/pmo/common/markets',
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
                $('#marketlist').html(options);
                //同时显示到添加商机modal、商机详情modal的下拉框
                $('#marketlistadd').html(options);
                $('#dmarket2').html(options);
            } else {
                //显示错误信息
                pageObj.showNotLoginErrorMsg(data.code, data.message);
            }
        }
    });
};

/**
 * 新增商机
 */
htmlObj.addNewProject = function () {
    var bName = $('#bName').val();
    var bFollow = $('#bFollow').val();
    var bFollowId = $('#bFollow').attr("data-personid");
    var bClientName = $('#bClientName').val();
    var bClientId = $('#bClientName').attr("data-personid");
    var bArea = $("select[id='bArea']").val()
    var bPredictSaleAmount = $('#bPredictSaleAmount').val();
    var bPredictBargainDate = $('#bPredictBargainDate').val();
    var bWantPro = $("select[id='bWantPro']").val()
    var bCollaborateMode = $("select[id='bCollaborateMode']").val()
    var bSalesStage = $("select[id='bSalesStage']").val()
    var bContact = $('#bContact').val();
    var bContactId = $('#bContact').attr("data");
    var bDesc = $('#bDesc').val();
    var obj = {};
    obj['name'] = bName;
    obj['keeperName'] = bFollow;
    obj['keeperId'] = bFollowId;
    obj['clientName'] = bClientName;
    obj['clientId'] = bClientId;
    obj['regionId'] = bArea;
    obj['advanceSales'] = bPredictSaleAmount;
    obj['dealDate'] =new Date(bPredictBargainDate).getTime();
    obj['intItemsId'] = bWantPro;
    obj['coModeId'] = bCollaborateMode;
    obj['saleStageId'] = bSalesStage;
    obj['comments'] = bDesc;
    var nameary = [];
    var cname = bContact.split(",");
    var cid = bContactId.split(",");
    for(var i = 0;i < cname.length;i++){
    	var a = {};
    	a['name'] = cname[i];
    	a['personId'] = cid[i];
    	nameary[i] = a;
    }
    var objj = {};
    objj['crmOpp'] = obj;
    objj['crmOppContactsList'] = nameary;
    var theJson = JSON.stringify(objj);
    console.log(theJson);
    //请求接口
    $.ajax({
        url: htmlObj.rootUrl + '/crm/opp/insert',
        type: 'post',
        data: theJson,
        beforeSend: function (request) {
            request.setRequestHeader("Content-Type", "application/json;charset=UTF-8;");
            request.setRequestHeader("authorization", htmlObj.authorization);
        },
        success: function (data) {
            if (data.code == "success") {
                layer.msg("保存成功！");
            	$("#addBusinessModal").modal("hide");
                htmlObj.getOppList();
            } else {
                //显示错误信息
                layer.msg(data.message);
            }
        }
    });
};

/**
 * 表单验证--添加商机
 */
htmlObj.validateAddBusiness = function() {
	// 表单验证
	validatorOfAddBusiness = $("#addBusinessForm").validate({
		debug : true,
		onfocusout : function(element) {
			$(element).valid();
		},
		submitHandler : function() {
			$('#btnAddPro').attr('disabled', 'disabled');
			// 添加商机
			htmlObj.addNewProject();
		},
		rules : {
			bName : {
				required : true
			},
			bFollow : {
				required : true
			},
			bClientName : {
				required : true
			},
			bArea : {
				required : true
			},
			bPredictSaleAmount : {
				required : true
			},
			bPredictBargainDate : {
				required : true
			},
			bWantPro : {
				required : true
			},
			bCollaborateMode : {
				required : true
			},
			bSalesStage : {
				required : true
			},
			bContact : {
				required : true
			},
			bDesc : {
				required : true
			}
		},
		messages : {
			bName : {
				required : "商机名称不能为空！"
			},
			bFollow : {
				required : "负责人不能为空！",
			},
			bClientName : {
				required : "客户名称不能为空！",
			},
			bArea : {
				required : "请选择片区！",
			},
			bPredictSaleAmount : {
				required : "预计销售金额不能为空！",
			},
			bPredictBargainDate : {
				required : "预计成交日期不能为空！",
			},
			bWantPro : {
				required : "请选择意向项目！",
			},
			bCollaborateMode : {
				required : "请选择合作模式！",
			},
			bSalesStage : {
				required : "请选择销售阶段！",
			},
			bContact : {
				required : "联系人不能为空！",
			},
			bDesc : {
				required : "商机说明不能为空！",
			},
			errorPlacement : function(error, element) {
				var eleName = $(element).attr("name");
				if (eleName == "provincelistadd") {
					error.insertAfter(element.parents(".area-block"));
				} else {
					error.appendTo(element.parent());
				}
			}
		}
	});
}

/*
 * 获取部门负责人,列表形式展现且可模糊搜索
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
}

/**
 * 获取客户列表
 */
htmlObj.getProCList = function (flag) {
    var cmd = new CommandAjax(htmlObj.rootUrl + "/crm/client/list", htmlObj.authorization);
    if (flag == 2) {
    	cmd.isMyKeeper = 1;
    }
    cmd.clientName = $("#queryKDCus").val(); // 客户名称模糊查询
    $("#depCusList").datagrid({
        columns: [{
            display: "客户名称",
            name: "name",
            width: "160px",
            align: "center"
        }, {
            display: "片区",
            name:"regionName",
            width: "200px",
            align: "center"
        }, {
            display: "联系人姓名",
            name: "contactsName",
            width: "100px",
            align: "center"
        }, {
            display: "联系人电话",
            width: "200px",
            align: "center",
            name: "contactsPhone"
        }, {
            display: "操作",
            width: "100px",
            render: function (row) {
            	var id = row.id,
                name = row.name,
                rowHtml = '';
            	rowHtml += '<a class="oprate" title="选定" href="javascript:void(0);" onclick="htmlObj.chooseLeader(\'' + id + '\',\'' + name + '\')">选定</a>';
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
    
/*
 * 获取选择的负责人,并显示到来源input
 */
htmlObj.chooseLeader = function (personId, personName) {
    $('#' + htmlObj.personClickfrom).val(personName).attr('data-personid', personId).blur();
    $('#choosePersonModal').modal('hide');
    $('#chooseCusModal').modal('hide');
    if($('#' + htmlObj.personClickfrom).val()!=''){
    	$('.input_clear').show();
    }
    $('#bContact').val("");
    $('#queryKD').val('');
    //重新初始化所有人员分页list
    htmlObj.getDepLeaderList();
};

// 添加客户Modal弹框中需处理的事
htmlObj.initAddBusinessHandle = function () {
    htmlObj.validateAddBusiness();
    var addBusinessModal = $('#addBusinessModal');
    addBusinessModal.on("hidden.bs.modal", function () {
        htmlObj.resetValide(validatorOfAddBusiness, addBusinessModal, 'addBusinessForm');
    });
};

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

/**
 * 重置表单validate插件验证信息和样式
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
htmlObj.getContactList = function() {
	 var cmd = new CommandAjax(htmlObj.rootUrl + "/crm/client/contacts/list", htmlObj.authorization);
	 cmd.clientId = $('#bClientName').attr("data-personid");
	    $("#contactList").datagrid({
	        columns: [{
	            display: "姓名",
	            name: "name",
	            width: "80px",
	            align: "center"
	        }, {
	            display: "职务",
	            name: "title",
	            width: "130px",
	            align: "center"
	        }, {
	            display: "手机",
	            name: "phone",
	            width: "120px",
	            align: "center"
	        }, {
	            display: "联系人说明",
	            name: "comments",
	            width: "160px",
	            align: "center"
	        }, {
	            display: "操作",
	            width: "80px",
	            align: "center",
	            render: function (row) {
	                var id = row.id,
	                    name = row.name,
	                    rowHtml = '';
	                rowHtml += '<a class="oprate" title="选定" href="javascript:void(0);" onclick="htmlObj.addContanct(\'' + id + '\',\'' + name + '\')">选定</a>';
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
	                pageObj.showNotLoginErrorMsg(data.code, data.message);
	            }
	        }
	    });
}

htmlObj.adContact = function() {
	var a = new Array();
	var flag = false;
	$('.contact-contain').find('.contact-item').each(function(index,e){
		var obj = {};
		var name = $(e).find('.c-name').val().trimAll();
		var phone = $(e).find('.c-tel').val().trimAll();
		var title = $(e).find('.c-tel').val().trimAll();
		var comments = $(e).find('.c-remark').val().trimAll();
		if(name == '' || phone == '' || title == '' || comments == ''){
		    layer.msg('每一项都必填！');
        }else{
            flag = true;
            obj['name'] = name;
            obj['phone'] = phone;
            obj['title'] = title;
            obj['comments'] = comments;
            a[index] = obj;
        }

	});
    if(!flag){
        return;
    }
	var clientId = $('#bClientName').attr("data-personid");
	var theJson = JSON.stringify({"clientId":clientId,"contactsList":a});
	 //请求接口
    $.ajax({
        url: htmlObj.rootUrl + '/crm/client/add/batch',
        data:theJson,
        type:'POST',
        beforeSend: function (request) {
            request.setRequestHeader("Content-Type", "application/json;charset=UTF-8;");
            request.setRequestHeader("authorization", htmlObj.authorization);
        },
        success: function (data) {
            if (data.code == "success") {
               $("#addConModal").modal("hide");
               $('.contact-item').find('input').val('');
            } else {
                //显示错误信息
                pageObj.showNotLoginErrorMsg(data.code, data.message);
            }
        }
    });
}

htmlObj.addContanct = function(id,name){
	var name1  = $('#' + htmlObj.personClickfrom).val();
	var id1  = $('#' + htmlObj.personClickfrom).attr("data");
	if(Utils.isNullorEmpty(id1)){
		name1 = Utils.isNullorEmpty(name1) ? name : name1 + "," + name;
		id1 = Utils.isNullorEmpty(id1) ? id : id1 + "," + id;
	}
	else if(id1.indexOf(id) == -1){
		name1 = Utils.isNullorEmpty(name1) ? name : name1 + "," + name;
		id1 = Utils.isNullorEmpty(id1) ? id : id1 + "," + id;
	}
	$('#' + htmlObj.personClickfrom).val(name1).attr('data', id1).blur();
    $('#chooseConModal').modal('hide');
    //重新初始化所有人员分页list
    htmlObj.getContactList();
}
/**
 * 初始化时间控件
 */
htmlObj.initLaydate = function () {
    $("#bLastFollowTimeQ").focus(function () {
        laydate({
            elem: "#bLastFollowTimeQ",
            format: "YYYY-MM-DD",
            festival: true,
            istime: false,
            choose: function () {
                $("#bLastFollowTimeQ").focusout();
            }
        });
    });
};

/**
 * 初始化时间控件
 */
htmlObj.initLaydate1 = function () {
	$("#bPredictBargainDate").focus(function () {
		laydate({
			elem: "#bPredictBargainDate",
			format: "YYYY-MM-DD",
			festival: true,
			istime: false,
			choose: function () {
				$("#bPredictBargainDate").focusout();
			}
		});
	});
};

/**
 * 添加一行联系人layout
 */
htmlObj.addContactLayout=function () {
    var option='<div class="row form-inline contact-item new-item">'+
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
 * 初始化
 */
htmlObj.init = function () {
	
    //初始化日期控件
	htmlObj.initLaydate1(); 
	htmlObj.initLaydate(); 
    // 初始化下拉框
    $('.form-group').find('select').each(function(index){
    	htmlObj.getSelect(this);
    })
    //查询商机列表
    htmlObj.getOppList();
    $("#searchlist").on("click", function () {
    	htmlObj.getOppList($(this).parents('.complaimOrder').find('.active').attr("data-state"));
    });
    // 初始化跟进人选择事件
    // $('#bFollowQ').on('click',function(event){
    // 	$('#choosePersonModal').modal('show');
    // 	htmlObj.personClickfrom = "bFollowQ";
    // 	htmlObj.getDepLeaderList();
    // })
    
    // 初始化跟进人选择事件
    $('#bFollow').on('click',function(event){
    	$('#choosePersonModal').modal('show');
    	htmlObj.personClickfrom = "bFollow";
    	htmlObj.getDepLeaderList();
    })
    // 初始化跟进人选择事件
    $('#bClientName').on('click',function(event){
    	$('#chooseCusModal').modal('show');
    	htmlObj.personClickfrom = "bClientName";
    	htmlObj.getProCList();
    })
    // 初始化联系人选择事件
    $('#bContact').on('click',function(event){
    	if (Utils.isNullorEmpty($('#bClientName').val())) {
            layer.msg("请先选择客户！");
   	        return;
        }
    	$('#chooseConModal').modal('show');
    	htmlObj.personClickfrom = "bContact";
    	htmlObj.getContactList();
    })
    // 添加联系人按钮
    $('#btnAddContact').on('click',function(event){
        $('.new-item').remove();
    	$('#addConModal').modal('show');
    	$('#conhead').html("新增联系人-"+$('#bClientName').val());
    })
    
    //跟进人搜索点击事件
    $('#btnSearchDepLeader').on('click', function () {
    	htmlObj.getDepLeaderList();
    });
    $(".ul li").on('click',function(event){
    	$(".ul li").attr("class","");
    	$(this).attr("class","active");
    	$(this).parents(".complaimOrder").find("option[value='']").attr("selected","true");
    	htmlObj.getOppList($(this).attr("data-state"));
    });
    //跟进人搜索点击事件
    $('#btnSearchCus').on('click', function () {
    	htmlObj.getProCList();
    });
    
    //点击新增客户
    $(".btn-add").click(function () {
        var addBusinessModal = $("#addBusinessModal");
        $('#bFollow').val(Utils.getValue('realname')).attr('data-personid', Utils.getValue('u'));
        addBusinessModal.modal();
    });
    
    //添加一行联系人layout
    $('#btnIconAdd').on('click',function () {
        htmlObj.addContactLayout();
    });
    //删除一行联系人layout
    $('.contact-contain').on('click', ".icon-del", function () {
        $(this).parents(".contact-item").remove();
    });
    $('#btnAddClient').on('click', function () {
    	htmlObj.adContact();
    });
    //初始化添加商机Modal处理事项
    htmlObj.initAddBusinessHandle();
    $("#cChargeQ").focus(function(){  
    	if($(this).val()=='') {
    		$(this).parent().children(".input_clear").show();  
    	}
    });  
    $("#cChargeQ").blur(function(){  
        if($(this).val()=='')  
        {  
            $(this).parent().children(".input_clear").hide();  
        }  
    });  
    $(".input_clear").click(function(){  
        $(this).parent().find('input').val('');  
        $(this).parent().find('input').attr('data-personid','');  
        $(this).hide();  
    });
   
};

$(function () {
    htmlObj.init();
});

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