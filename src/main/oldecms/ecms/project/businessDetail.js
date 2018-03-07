/**
 * Created by 何凡凡 on 2017/05/15.
 */
var htmlObj = {};
htmlObj.rootUrl = appHost + approot;
var validatorOfEditContact; //编辑联系人的validate对象
var validatorOfEditFollow; //编辑跟进记录的validate对象
var validatorOfAddFollow; //编辑跟进记录的validate对象
htmlObj.authorization = Utils.getValue('authorization'); //获取登录人的userId和Token


/**
 * 获取商机详情
 */
htmlObj.getBusinessDetail = function(id){
    $.ajax({
        url: htmlObj.rootUrl + '/crm/opp/'+id+'/detail',
        type: 'get',
        beforeSend: function (request) {
            request.setRequestHeader("Content-Type", "application/json;charset=UTF-8;");
            request.setRequestHeader("authorization", htmlObj.authorization);
        },
        success: function (data) {
            if (data.code == "success") {
                $("#oppName").val(data.content.name);
                $(".pull-left").html(data.content.name);
                $("#cdCharge").val(data.content.keeperName);
                $("#cdName").val(data.content.clientName);
                $("#cdArea").val(data.content.regionName);
                $("#adSales").val(data.content.advanceSales);
                $("#adDealDate").val(new Date(data.content.dealDate).toDay());
                $("#saleStage").val(data.content.saleStageName);
                $("#intItems").val(data.content.intItemsName);
                $("#coMode").val(data.content.coModeName);
                $("#oppDesc").html(data.content.comments);
                $("#er a").html('联系人('+data.content.contactsCount+')');
                $("#san a").html('跟进记录('+data.content.followCount+')');
            } else {
                pageObj.showNotLoginErrorMsg(data.code, data.message);
            }
        }
    });
}
/** 修改商机信息*/
htmlObj.editOppDetailClick = function(id){
    $.ajax({
        url: htmlObj.rootUrl + '/crm/opp/'+id+'/detail',
        type: 'get',
        beforeSend: function (request) {
            request.setRequestHeader("Content-Type", "application/json;charset=UTF-8;");
            request.setRequestHeader("authorization", htmlObj.authorization);
        },
        success: function (data) {
            if (data.code == "success") {
                $("#bName").val(data.content.name);
                $("#bFollow").val(data.content.keeperName);
                $("#bClientName").val(data.content.clientName);
                $("#bArea").val(data.content.regionId);
                $("#bPredictSaleAmount").val(data.content.advanceSales);
                $("#bPredictBargainDate").val(new Date(data.content.dealDate).toDay());
                $("#bSalesStage").val(data.content.saleStageId);
                $("#bWantPro").val(data.content.intItemsId);
                $("#bCollaborateMode").val(data.content.coModeId);
                $("#bDesc").html(data.content.comments);
            } else {
                pageObj.showNotLoginErrorMsg(data.code, data.message);
            }
        }
    });
}

/** 获取联系人列表*/
htmlObj.getOppContacts = function(id){
    $.ajax({
        url: htmlObj.rootUrl + '/crm/opp/contacts/list?oppId='+ id,
        type: 'get',
        beforeSend: function (request) {
            request.setRequestHeader("Content-Type", "application/json;charset=UTF-8;");
            request.setRequestHeader("authorization", htmlObj.authorization);
        },
        success: function (data) {
            if (data.code == "success") {
                $("#oppxsrow").html("");
                var a =  data.content;
                for(var i = 0;i < data.content.length;i++) {
                    var obj = a[i];
                    $("#oppxsrow").append('<div class="row form-inline the-option"><p class="handle-block"><a href="javascript:void(0);" class="handle-btn btn-edit" data="'+obj.id+'">编辑</a></p>');
                    $("#oppxsrow").append('<div class="form-group col-md-3"><label class="control-label">姓名：</label><input type="text" class=" on-border" value="'+obj.name+'" readonly/></div>');
                    $("#oppxsrow").append('<div class="form-group col-md-4"><label class="control-label">电话：</label><input type="text" class=" on-border" value="'+obj.phone+'" readonly/></div>');
                    $("#oppxsrow").append('<div class="form-group col-md-5"><label class="control-label">职位：</label><input type="text" class=" on-border" value="'+obj.title+'" readonly/></div>');
                    $("#oppxsrow").append('<div class="form-group col-sm-12"><label class="control-label pro-desc-label">备注：</label><span class="remark-contact">'+obj.comments+'</span></div></div>');
                    $("#oppxsrow").append('<hr style="filter: alpha(opacity=100, finishopacity=0, style=3)" width="100%" color=#9E9E9E SIZE=3>');
                }
            } else {
                pageObj.showNotLoginErrorMsg(data.code, data.message);
            }
        }
    });
}
/**获取商机的跟进记录**/
htmlObj.getOppFollowList = function(id){
    $.ajax({
        url: htmlObj.rootUrl + '/crm/opp/follow/list?oppId='+id,
        type: 'get',
        beforeSend: function (request) {
            request.setRequestHeader("Content-Type", "application/json;charset=UTF-8;");
            request.setRequestHeader("authorization", htmlObj.authorization);
        },
        success: function (data) {
            if (data.code == "success") {
                $("#followPerson").val(data.content.personName);
                $("#followModeName").val(data.content.followModeName);
                $("#followComments").html(data.content.comments);
                $("#followNextPlan").html(data.content.nextPlan);
            } else {
                pageObj.showNotLoginErrorMsg(data.code, data.message);
            }
        }
    });
}

/**
 * 获取客户状态
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
                $('#cStatusQ').html(options);
                //同时显示到添加客户modal的下拉框
                $('#cStatus').html(options);
            } else {
                //显示错误信息
                pageObj.showNotLoginErrorMsg(data.code, data.message);
            }
        }
    });
};

/**
 * 编辑客户信息Modal弹框中需处理的事
 */
htmlObj.initEditBusinessHandle = function (id) {
    //添加用户的表单验证
    htmlObj.validateEditBusiness(id);
    var addBusinessModal = $('#addBusinessModal');
    addBusinessModal.on("hidden.bs.modal", function () {
        htmlObj.resetValide(validatorOfAddBusiness, addBusinessModal, 'editBusinessForm');
    });
    //点击客户详情的编辑
    $('#detailTab').find('.btn-edit').on('click', function () {
        addBusinessModal.modal();
    });
};


/**修改商机信息 */
htmlObj.editBusiness = function(id){
    var name = $("#bName").val(), // 商机名称
        keeperName = $("#bFollow").val(), // 负责人
        keeperId = $("#bFollow").attr("data-personid"), // 负责人
        clientName = $("#bClientName").val(), // 客户名称
        clientId = $("#bClientName").attr("data-personid"), // 客户ID
        regionId = $("select[id='bArea']").val(),//片区
        bPredictSaleAmount = $("#bPredictSaleAmount").val();//预计销售额
        bPredictBargainDate = $("#bPredictBargainDate").val();//预计成交日期
        bWantPro = $("select[id='bWantPro']").val(),// 意向项目
        bCollaborateMode = $("select[id='bCollaborateMode']").val(),//合作模式
        bSalesStage = $("select[id='bSalesStage']").val(),//销售阶段
        comments = $("#bDesc").val(); //商机说明

    var obj = {};
    obj['name'] = name;
    obj['keeperName'] = keeperName;
    obj['keeperId'] = keeperId;
    obj['regionId'] = regionId;
    obj['clientId'] = clientId;
    obj['clientName'] = clientName;
    obj['intItemsId'] = bWantPro;
    obj['coModeId'] = bCollaborateMode;
    obj['saleStageId'] = bSalesStage;
    obj['advanceSales'] = bPredictSaleAmount;
    obj['dealDate'] = Date.parse(new Date(bPredictBargainDate));
    obj['comments'] = comments;
    obj['id'] = id;

    var url = htmlObj.rootUrl + "/crm/opp";
    $.ajax({
        url:url,
        type:'put',
        data:JSON.stringify(obj),
        beforeSend: function (request) {
            request.setRequestHeader("Content-Type", "application/json;charset=UTF-8;");
            request.setRequestHeader("authorization", htmlObj.authorization);
        },
        success: function (data) {
            if (data.code == "success") {
                layer.msg("保存成功！");
                $("#addBusinessModal").modal('hide');
                $('#btnAddBusiness').removeAttr('disabled');//解禁
                //刷新客户列表
                htmlObj.getBusinessDetail(id)
            } else {
                //显示错误信息
                // pageObj.showNotLoginErrorMsg(data.code, data.message);
                layer.msg(data.message);
                $('#btnAddBusiness').removeAttr('disabled');//解禁
            }
        }
    });
}

/**
 * 编辑联系人信息Modal弹框中需处理的事
 */
htmlObj.initEditContactHandle = function () {
    //点击单个联系人详情的编辑
    $('#contactTab').find('.the-options').on('click', '.btn-edit', function () {
        var conId = $(this).attr("data");
        $.ajax({
        	url:htmlObj.rootUrl + "/crm/client/contacts/info?conId=" + conId,
            type:'get',
            beforeSend: function (request) {
                request.setRequestHeader("Content-Type", "application/json;charset=UTF-8;");
                request.setRequestHeader("authorization", htmlObj.authorization);
            },
            success: function (data) {
                if (data.code == "success") {
                    $("#editContactModal").find(".c-name").val(data.content.name);
                    $("#editContactModal").attr("data",conId);
                    $("#editContactModal").find(".c-tel").val(data.content.phone);
                    $("#editContactModal").find(".c-post").val(data.content.title);
                    $("#editContactModal").find(".c-remark").val(data.content.comments);
                } else {
                    layer.msg(data.message);
                }
            }
        })
        $("#editContactModal").modal();
    });
};

/*新增联系人**/
htmlObj.adBusinessContact = function(id) {
    var a = new Array();
    $('.contact-contain').find('.contact-item').each(function(index,e){
        var obj = {};
        obj['name'] = $(e).find('.c-name').val();
        obj['phone'] = $(e).find('.c-tel').val();
        obj['title'] = $(e).find('.c-post').val();
        obj['comments'] = $(e).find('.c-remark').val();
        a[index] = obj;
    })
    var businessId = id;
    var theJson = JSON.stringify({"oppId":businessId,"contactsList":a});
    //请求接口
    $.ajax({
        url: htmlObj.rootUrl + '/crm/opp/add/batch',
        data:theJson,
        type:'POST',
        beforeSend: function (request) {
            request.setRequestHeader("Content-Type", "application/json;charset=UTF-8;");
            request.setRequestHeader("authorization", htmlObj.authorization);
        },
        success: function (data) {
            if (data.code == "success") {
                $("#addConModal").modal("hide");
                htmlObj.getBusinessDetail(businessId);
                $("#er").trigger("click");
            } else {
                //显示错误信息
                pageObj.showNotLoginErrorMsg(data.code, data.message);
            }
        }
    });
}
/**
 * 表单验证--编辑跟进记录
 */
htmlObj.validateEditFollow = function () {
    //表单验证
    validatorOfEditFollow = $("#editFollowForm").validate({
        debug: true,
        onfocusout: function (element) {
            $(element).valid();
        },
        submitHandler: function () {
            $('#editFollow').attr('disabled', 'disabled');
            htmlObj.editFollow();
        },
        rules: {
        	followperson: {
                required: true
            }, commstyle: {
                required: true
            }, followdesc: {
                required: true
            }, nextplan: {
                required: true
            }, followtime: {
            	required: true
            }
        }, messages: {
        	followperson: {
                required: "跟进人不能为空！"
            }, commstyle: {
            	required: "跟进形式不能为空！",
            }, followdesc: {
                required: "跟进描述不能为空！",
            }, nextplan: {
                required: "跟进计划不能为空！",
            }, followtime: {
            	required: "跟进时间不能为空！",
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
 * 修改联系人信息
 */
htmlObj.editContactDetail = function () {
    var conid = $('#editContactModal').attr("data");
    var name =$('#editContactModal').find('.c-name').val();
    var phone =$('#editContactModal').find('.c-tel').val();
    var title =$('#editContactModal').find('.c-post').val();
    var comments =$('#editContactModal').find('.c-remark').val();
    var obj = {};
    obj['name'] = name;
    obj['phone'] = phone;
    obj['title'] = title;
    obj['comments'] = comments;
    obj['id'] = conid;

    //拼接参数
    var theJson = JSON.stringify(obj);
    //请求接口
    $.ajax({
        url: htmlObj.rootUrl + '/crm/client/contacts',
        type: 'put',
        data: theJson,
        beforeSend: function (request) {
            request.setRequestHeader("Content-Type", "application/json;charset=UTF-8;");
            request.setRequestHeader("authorization", htmlObj.authorization);
        },
        success: function (data) {
            if (data.code == "success") {
                layer.msg("保存成功！")
                $('#editContactModal').modal('hide');
            	$("#er").trigger("click");
            } else {
                //显示错误信息
                pageObj.showNotLoginErrorMsg(data.code, data.message);
            }
        }
    });
};

/**
 * 修改跟进记录
 */
htmlObj.editFollow = function () {
    var obj = {};
    obj['id'] = $("#followperson1").attr("followId");
    obj['oppId'] = businessId;
    obj['personId'] = $("#followperson1").attr("data");
    obj['personName'] = $("#followperson1").val();
    obj['followModeId'] = $("#commstyle1").val();
    obj['comments'] = $("#followdesc1").val();
    obj['nextPlan'] = $("#nextplan1").val();
    obj['followTime'] = new Date($("#follow_time").val()).getTime()
    
    //拼接参数
    var theJson = JSON.stringify(obj);
    //请求接口
    $.ajax({
        url: htmlObj.rootUrl + '/crm/opp/follow',
        type: 'put',
        data: theJson,
        beforeSend: function (request) {
            request.setRequestHeader("Content-Type", "application/json;charset=UTF-8;");
            request.setRequestHeader("authorization", htmlObj.authorization);
        },
        success: function (data) {
            if (data.code == "success") {
                $('#editFollowModal').modal('hide');
                $('#editFollow').removeAttr('disabled');//解禁
                //刷新客户列表
                htmlObj.getBusinessList(businessId);
            } else {
                //显示错误信息
                pageObj.showNotLoginErrorMsg(data.code, data.message);
            }
        }
    });
};
htmlObj.showComment = function(e){
	var followId = $(e).attr("data");
	$.ajax({
		url: htmlObj.rootUrl + '/crm/opp/comment/list?followId='+followId,
		type: 'get',
		beforeSend: function (request) {
			request.setRequestHeader("Content-Type", "application/json;charset=UTF-8;");
			request.setRequestHeader("authorization", htmlObj.authorization);
		},
		success: function (data) {
			if (data.code == "success") {
				$(e).parents('.the-option').find(".comment-list").html("");
				$(e).parents('.the-option').find(".comment-sub-list").html("");
				var con = data.content;
				for(var i = 0;i < con.length;i++) {
					var str = "";
					var obj = con[i].crmFollowCom;
					str = htmlObj.onecom.replace("oneAddPersonName",obj.addPersonName);
					str = str.replace("xscontent",obj.content);
					str = str.replace("addTime",obj.addTime == 0 ? "" : new Date(obj.addTime).Format("yyyy-MM-dd hh:mm:ss"));
					str = str.replace("oneComId",obj.id);
					str = str.replace("comPersonName",con[i].comPersonName);
					str = str.replace("comCount",con[i].comCount);
					$(e).parents('.the-option').find(".comment-list").append(str);
					var count = con[i].crmFollowComs;
					if(count != null){
						for(var j = 0;j < count.length;j++) {
							var str1 = "";
							var objj = count[j];
							str1 = htmlObj.twocom.replace("addpersonName",objj.addPersonName);
							str1 = str1.replace("parentUserName",objj.parentUserName);
							str1 = str1.replace("xscontent",objj.content);
							str1 = str1.replace("addTime",objj.addTime == 0 ? "" : new Date(objj.addTime).Format("yyyy-MM-dd hh:mm:ss"));
							str1 = str1.replace("comId",objj.id);
							$(e).parents('.the-option').find(".comment-sub-list").eq(i).append(str1);
						}
					} else{
						$(e).parents('.the-option').find(".comment-option").eq(i).find('.comment-subcount').html("");
					}
				}
			} else {
				pageObj.showNotLoginErrorMsg(data.code, data.message);
			}
		}
	});
};


htmlObj.getFollowDetails= function(followId){
    $.ajax({
        url: htmlObj.rootUrl + '/crm/client/follow/detail?followId=' + followId,
        type: 'get',
        beforeSend: function (request) {
            request.setRequestHeader("Content-Type", "application/json;charset=UTF-8;");
            request.setRequestHeader("authorization", htmlObj.authorization);
        },
        success: function (data) {
            if (data.code == "success") {
            	var obj = data.content;
            	$("#followperson1").attr("data",obj.personId);
            	$("#followperson1").attr("followId",obj.id);
            	$("#followperson1").val(obj.personName);
            	$("#commstyle1").val(obj.followModeId);
            	$("#followdesc1").val(obj.comments);
            	$("#nextplan1").val(obj.nextPlan);
            	$("#follow_time").val(obj.followTime == null ? "" :new Date(obj.followTime).Format("yyyy-MM-dd"));
            } else {
                pageObj.showNotLoginErrorMsg(data.code, data.message);
            }
        }
    });
};
htmlObj.addFollow = function(){
	var obj = {};
	obj['personName'] = $("#followperson").val();
	obj['followModeId'] = $("#commstyle").val();
	obj['comments'] = $("#followdesc").val();
	obj['nextPlan'] = $("#nextplan").val();
	obj['followTime'] = new Date($("#add_follow_time").val()).getTime();
	obj['oppId'] = businessId;
	var thejson = JSON.stringify(obj);
	$.ajax({
        url: htmlObj.rootUrl + '/crm/opp/follow',
        data:thejson,
        type:'POST',
        beforeSend: function (request) {
            request.setRequestHeader("Content-Type", "application/json;charset=UTF-8;");
            request.setRequestHeader("authorization", htmlObj.authorization);
        },
        success: function (data) {
            if (data.code == "success") {
               $("#addFollowModal").modal("hide");
               $("#addFollowForm")[0].reset();
               $("#addFollow").removeAttr('disabled');
               htmlObj.getBusinessDetail(businessId);
               $("#san").trigger("click");
            } else {
                //显示错误信息
                pageObj.showNotLoginErrorMsg(data.code, data.message);
            }
        }
    })
}

/**
 * 表单验证--编辑商机信息
 */
htmlObj.validateEditBusiness = function (id) {
    //表单验证

    validatorOfAddBusiness = $("#editBusinessForm").validate({
        debug: true,
        onfocusout: function (element) {
                $(element).valid();
            },
            submitHandler: function () {
                $('#btnAddBusiness').attr('disabled', 'disabled');
                //修改联系人信息
                htmlObj.editBusiness(id);
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
};

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
            width: "150px",
            align: "center"
        }, {
            display: "联系人电话",
            align: "center",
            name: "contactsPhone"
        }, {
            display: "操作",
            width: "200px",
            align: "left",
            render: function (row) {
            	var id = row.id,
                name = row.name,
                rowHtml = '';
            	rowHtml += '<a class="oprate" title="选定" href="javascript:void(0);" onclick="htmlObj.chooseCus(\'' + id + '\',\'' + name + '\')">选定</a>';
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
                layer.msg(data.message)
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

    //模糊查询点击事件
    $('#btnSearchDepLeader').on('click', function () {
        htmlObj.getDepLeaderList();
    });
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
    console.log(document.getElementById(formId));
    document.getElementById(formId).reset();
};

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
        '<img src="../skins/img/shanchu@2x.png" alt="" class="icon-del">'+
        '</div>'+
        '</div>';
    $('.contact-contain').append(option);
};

/**
 * 新增跟进记录Modal弹框中需处理的事
 */
htmlObj.initAddFollowHandle = function () {
	htmlObj.validateAddFollow();
	var addFollowModal = $('#addFollowModal');
    addFollowModal.on("hidden.bs.modal", function () {
        htmlObj.resetValide(validatorOfAddFollow, addFollowModal, 'addFollowForm');
    });
}

htmlObj.initEditFollowHandle = function () {
	//编辑跟进记录的表单验证
    htmlObj.validateEditFollow();
    var editFollowModal = $('#editFollowModal');
    editFollowModal.on("hidden.bs.modal", function () {
    	htmlObj.resetValide(validatorOfEditFollow, editFollowModal, 'editFollowForm');
    });

}
/**
 * 初始化
 */
var businessId = "";
var item = "";
htmlObj.init = function () {
    businessId = htmlObj.getLocationPara("id");
    htmlObj.initLaydate(); 
    htmlObj.initLaydate1();
    htmlObj.initLaydate2();
    item = $("#followList").html();
    htmlObj.getBusinessDetail(businessId);
    htmlObj.twocom = $(".comment-sub-list").html();
	htmlObj.onecom = $(".comment-list").html();
	htmlObj.onecom = htmlObj.onecom.replace(htmlObj.twocom,"");
	$("#frist").trigger("click");
    $("#er").on("click",function(){
        htmlObj.getOppContacts(businessId);
    })
    $("#san").on("click",function(){
		htmlObj.getBusinessList(businessId);
	})
    $("#editBusiness").on("click",function(){
        htmlObj.editOppDetailClick(businessId);
        $("#editBusinessModal").modal();
    })
    $('#bClientName').on('click',function(event){
    	$('#chooseCusModal').modal('show');
    	htmlObj.personClickfrom = "bClientName";
    	htmlObj.getProCList();
    }); 
    $('#bFollow').on('click',function(event){
        $('#choosePersonModal').modal('show');
        htmlObj.personClickfrom = "bFollow";
        htmlObj.getDepLeaderList();
    });
    $('select').each(function(index){
        htmlObj.getSelect(this);
    })
    //新增联系人
    $("#btnAddContact").on("click",function(){
        $("#addConModal").modal();
    })
    //添加一行联系人layout
    $('#btnIconAdd').on('click',function () {
        htmlObj.addContactLayout();
    });
    //删除一行联系人layout
    $('.contact-contain').on('click', ".icon-del", function () {
        $(this).parents(".contact-item").remove();
    });
    //新增联系人保存
    $('#btnAddCon').on('click', function () {
    	var name = $("#addConModal").find('.c-name').val();
    	var tel = $("#addConModal").find('.c-tel').val();
    	if(name == "" || tel == "") {
            layer.msg("姓名和联系方式不能为空！");
    		return false;
    	}
        htmlObj.adBusinessContact(businessId);
    });
    $("#btnEditContact").on("click",function(){
		var name = $("#editContactModal").find(".c-name").val();
		var tel =  $("#editContactModal").find(".c-tel").val();
		if(name == "" || tel == ""){
            layer.msg("姓名和联系方式不能为空！");
			return false;
		}
		htmlObj.editContactDetail();
	})


	htmlObj.initAddFollowHandle();
	htmlObj.initEditFollowHandle();
    htmlObj.initEditBusinessHandle(businessId);//初始化添加客户Modal处理事项
    htmlObj.initEditContactHandle();//初始化编辑联系人信息Modal处理事项
    $("#btnAddFollowNote").on('click',function(){
    	$("#addFollowModal").modal();
    })
    //关闭当前页面
    $('.btn-closeit').on('click', function () {
        window.close();
    });

};
htmlObj.validateAddFollow = function () {
    //表单验证
    validatorOfAddFollow = $("#addFollowForm").validate({
        debug: true,
        onfocusout: function (element) {
            $(element).valid();
        },
        submitHandler: function () {
            $('#addFollow').attr('disabled', 'disabled');
            htmlObj.addFollow();
        },
        rules: {
        	followperson: {
                required: true
            }, commstyle: {
                required: true
            }, followdesc: {
                required: true
            }, nextplan: {
                required: true
            }, addfollowtime: {
            	required: true
            }
        }, messages: {
        	followperson: {
                required: "跟进人不能为空！"
            }, commstyle: {
            	required: "跟进形式不能为空！",
            }, followdesc: {
                required: "跟进描述不能为空！",
            }, nextplan: {
                required: "跟进计划不能为空！",
	        }, addfollowtime: {
	        	required: "跟进时间不能为空！",
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

htmlObj.addFollowComment = function(parentId,belongId,followId,content,e){
	var obj = {};
	obj['parentId'] = parentId;
	obj['belongId'] = belongId;
	obj['followId'] = followId;
	obj['content'] = content;
	obj['oppId'] = businessId;
	var thejson = JSON.stringify(obj);
	$.ajax({
		url: htmlObj.rootUrl + '/crm/opp/comment',
		type: 'post',
		data:thejson,
		beforeSend: function (request) {
			request.setRequestHeader("Content-Type", "application/json;charset=UTF-8;");
			request.setRequestHeader("authorization", htmlObj.authorization);
		},
		success: function (data) {
			if (data.code == "success") {
                layer.msg("评论成功！");
				var num = $(e).parents(".the-option").find(".comment-entry a");
				num.html(Number(num.html())+1);
				htmlObj.showComment(e);
			}else {
                layer.msg("评论失败！");
			}
		}
	});
}

/**
 * 初始化时间控件
 */
htmlObj.initLaydate = function () {
    $("#follow_time").focus(function () {
        laydate({
            elem: "#follow_time",
            format: "YYYY-MM-DD",
            festival: true,
            istime: false,
            choose: function () {
                $("#follow_time").focusout();
            }
        });
    });
};

htmlObj.getBusinessList = function(id){
	$.ajax({
		url: htmlObj.rootUrl + '/crm/opp/follow/list?oppId='+id,
		type: 'get',
		beforeSend: function (request) {
			request.setRequestHeader("Content-Type", "application/json;charset=UTF-8;");
			request.setRequestHeader("authorization", htmlObj.authorization);
		},
		success: function (data) {
			if (data.code == "success") {
				$("#followList").html("");
				var content = data.content;
				for(var i=0;i < content.length;i++){
					var obj = content[i];
					var str = "";
					str = item.replace("followdate",obj.addTime == 0 ? "" : new Date(obj.addTime).Format("yyyy-MM-dd hh:mm"));
					str = str.replace(/followId/g,obj.id);
					str = str.replace("personName",obj.personName);
					str = str.replace("follow_mode",obj.followModeName);
					str = str.replace("follow_time",new Date(obj.followTime).Format("yyyy-MM-dd"));
					str = str.replace("follow_desc",obj.comments);
					str = str.replace("next-plan",obj.nextPlan);
					str = str.replace("follownums",obj.comCount);
					$("#followList").append(str);
				}
				console.log(data);
			} else {
				pageObj.showNotLoginErrorMsg(data.code, data.message);
			}
		}
	});
	var followTab = $('#followTab');
    var options = followTab.find('.the-options');
    var editFollowModal = $("#editFollowModal");
    //点击单个跟进记录详情的编辑
    options.on('click', '.btn-edit', function () {
    	var followId = $(this).parents('.the-option').attr("data");
    	editFollowModal.modal();
    	htmlObj.getFollowDetails(followId);
    });
    options.on('click', '.comment-nocheck', function () {
        var commentContain = $(this).parent().siblings('.comment-contain');
        commentContain.toggle();
        if (commentContain.css('display') == 'block') {
            $(this).addClass('comment-checked');
        } else {
            $(this).removeClass('comment-checked');
        }
    });
    //点击二级评论里的“回复”
    $(document).on('click', '.comment-list .reply-span', function (event) {
    	event.stopPropagation();
    	$(this).parents('.comment-option').find('.cmt-r-btn').attr('parentId',$(this).parents('.comment-option').attr("data"));
    	$(this).parents('.comment-option').find('.cmt-r-btn').attr('belongId',$(this).parents('.comment-option').attr("data"));
    	$(this).parent().siblings('.comment-contain-two').toggle();
    });
    $(document).on('focus',".cmt-r-input",function(event){
    	$(this).val("");
    });
    //点击二级评论里的“回复”
    $(document).on('click', '.comment-sub-list .reply-span-sub', function (event) {
    	event.stopPropagation();
    	$(this).parents('.comment-option').find('.cmt-r-btn').attr('parentId',$(this).attr("data"));
    	$(this).parents('.comment-option').find('.cmt-r-btn').attr('belongId',$(this).parents('.comment-option').attr("data"));
    	var name = $(this).parents('.comment-option').find('.color-fc5f45').eq(0).html();
    	$(this).parents('.comment-option').find('input').attr("value",'回复 '+ name+':');
    	$(this).parents('.comment-sub-list').siblings('.comment-contain-two').toggle();
    });
    //点击一级评论里的“共多少人回复”
    options.on('click', '.comment-subcount', function () {
        $(this).siblings('.comment-sub-list').toggle();
        $(this).hide();
    });
    $(document).on('click',".cmt-r-btn",function(event){
    	var followId = $(this).parents('.the-option').attr("data");
    	var content = $(this).parent().prev().find('.cmt-r-input').val();
    	var parentId = $(this).attr("parentId") == null ? "" :$(this).attr("parentId");
    	var belongId = $(this).attr("belongId") == null ? 0 :$(this).attr("belongId");
    	$(this).parent().prev().find('.cmt-r-input').val("");
    	if(content ==""){
            layer.msg("评论不能为空！");
    		return false;
    	}
    	htmlObj.addFollowComment(parentId, belongId, followId, content,$(this).parents('.the-option').find('.comment-checked'));
    })
};

// 添加客户Modal弹框中需处理的事
htmlObj.initAddBusinessHandle = function () {
    htmlObj.validateAddBusiness();
    var addBusinessModal = $('#addBusinessModal');
    addBusinessModal.on("hidden.bs.modal", function () {
        htmlObj.resetValide(validatorOfAddBusiness, addBusinessModal, 'addBusinessForm');

    });
};
/**获取下拉框选取事项*/
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
        },{
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
                pageObj.showNotLoginErrorMsg(data.code, data.message);
            }
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


htmlObj.chooseLeader = function (personId, personName) {
    $('#' + htmlObj.personClickfrom).val(personName).attr('data-personid', personId).blur();
    $('#choosePersonModal').modal('hide');
    $('#queryKD').val('');
    //重新初始化所有人员分页list
    htmlObj.getDepLeaderList();
};
htmlObj.chooseCus = function (personId, personName) {
	$('#' + htmlObj.personClickfrom).val(personName).attr('data-personid', personId).blur();
	$('#chooseCusModal').modal('hide');
	$('#queryKD').val('');
	//重新初始化所有人员分页list
	htmlObj.getProCList();
};

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
 * 初始化时间控件
 */
htmlObj.initLaydate2 = function () {
	$("#add_follow_time").focus(function () {
		laydate({
			elem: "#add_follow_time",
			format: "YYYY-MM-DD",
			festival: true,
			istime: false,
			choose: function () {
				$("#add_follow_time").focusout();
			}
		});
	});
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




