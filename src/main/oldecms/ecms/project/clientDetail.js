/**
 * Created by 何凡凡 on 2017/05/15.
 */
var htmlObj = {};
htmlObj.rootUrl = appHost + approot;
htmlObj.authorization = Utils.getValue('authorization'); //获取登录人的userId和Token
htmlObj.personClickfrom = "";
htmlObj.clientId="";

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
   * 获取选择的负责人，并显示到来源input
   * @param personId
   */
htmlObj.chooseLeader = function (personId, personName) {
      $('#' + htmlObj.personClickfrom).val(personName).attr('data-personid', personId).blur();
	  $('#choosePersonModal').modal('hide');
	  $('#queryKD').val('');
  //重新初始化所有人员分页list
      htmlObj.getDepLeaderList();
};
  
htmlObj.getClientDetlis = function(id){
	$.ajax({
        url: htmlObj.rootUrl + '/crm/client/'+id+'/detail',
        type: 'get',
        beforeSend: function (request) {
            request.setRequestHeader("Content-Type", "application/json;charset=UTF-8;");
            request.setRequestHeader("authorization", htmlObj.authorization);
        },
        success: function (data) {
            if (data.code == "success") {
            	$("#clientName").html(data.content.name);
            	$("#cdName").html(data.content.name);
            	$("#cdRank").html(data.content.clientLevelName);
            	$("#cdStatus").html(data.content.clientStatusName);
            	$("#cdType").html(data.content.clientTypeName);
            	$("#cdTerritory").html(data.content.coAreaName);
            	$("#cdBargainStatus").html(data.content.dealStatusName);
            	$("#cdCharge").html(data.content.keeperName);
            	$("#cdArea").html(data.content.regionName);
            	$("#cdAddress").html(data.content.address);
            	$("#cdDesc").html(data.content.comments);
            	
            	$("#cName").val(data.content.name);
            	$("#cCharge").val(data.content.keeperName);
            	$("#cCharge").attr("data-personid",data.content.keeperId);
            	$("#cArea").val(data.content.regionId);
            	$("#cType").val(data.content.clientTypeId);
            	$("#cStatus").val(data.content.clientStatusId);
            	$("#cBargainStatus").val(data.content.dealStatusId);
            	$("#cdBargainStatus").val(data.content.dealStatusName);
            	$("#cRank").val(data.content.clientLevelId);
            	$("#cTerritory").val(data.content.coAreaId);
            	$("#cAddress").val(data.content.address);
            	$("#cDesc").html(data.content.comments);
            	
            	$("#er a").html('联系人('+data.content.contactsCount+')');
            	$("#san a").html('商机('+data.content.oppCount+')');
            	$("#si a").html('跟进记录('+data.content.followCount+')');
            } else {
                pageObj.showNotLoginErrorMsg(data.code, data.message);
            }
        }
    });
}

htmlObj.getOppList = function(id){
	$.ajax({
        url: htmlObj.rootUrl + '/crm/opp/list?clientId=' + id,
        type: 'get',
        beforeSend: function (request) {
            request.setRequestHeader("Content-Type", "application/json;charset=UTF-8;");
            request.setRequestHeader("authorization", htmlObj.authorization);
        },
        success: function (data) {
            if (data.code == "success") {
            	var obj=data.con
            	var str = "";
            	for(var i=0;i<data.content.length;i++){
            		var a = data.content;
            		var obj = a[i];
            		str +=('<div class="row form-inline the-option"><p class="handle-block"><span class="handle-text-lt business-name">'+obj.name+'</span><a href="javascript:void(0);" data="'+obj.id+'" class="handle-btn btn-edit edit-opp">编辑</a></p>');
            		str +=('<div class="form-group col-md-4"><label class="control-label">意向项目：</label><input type="text" class="on-border" value="'+obj.intItemsName+'" readonly/></div>');
            		str +=('<div class="form-group col-md-4"><label class="control-label">所属区域：</label><input type="text" class="on-border" value="'+obj.regionName+'" readonly/></div>');
            		str +=('<div class="form-group col-md-4"><label class="control-label">预计销售金额：</label><input type="text" class="on-border" value="'+obj.advanceSales+'&nbsp;万元" readonly/></div>');
            		str +=('<div class="form-group col-sm-12"><span class="remark-business">备注：'+obj.comments+'</span></div></div>');
            	}
            	$("#opplist").html(str);
            } else {
                pageObj.showNotLoginErrorMsg(data.code, data.message);
            }
        }
    });
}


htmlObj.getFollowList = function(id){
	$.ajax({
		url: htmlObj.rootUrl + '/crm/client/follow/list?clientId='+id,
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
					str = item.replace("followdate",obj.addTime ==0 ?"":new Date(obj.addTime).Format("yyyy-MM-dd hh:mm"));
					str = str.replace(/followId/g,obj.id);
					str = str.replace("personName",obj.personName);
					str = str.replace("followMode",obj.followModeName);
					str = str.replace("followTime",obj.followTime == null ? "" :new Date(obj.followTime).Format("yyyy-MM-dd"));
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
    //点击单个记录里的评论
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
    //点击一级评论里的“共多少人回复”
    options.on('click', '.comment-subcount', function () {
        $(this).siblings('.comment-sub-list').toggle();
        $(this).hide();
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
    $(document).on('focus',".cmt-r-input",function(event){
    	$(this).val("");
    });
    $(document).on('click',".cmt-r-btn",function(event){
    	var followId = $(this).parents('.the-option').attr("data");
    	var content = $(this).parent().prev().find('.cmt-r-input').val();
    	var parentId = $(this).attr("parentId") == null ? "" :$(this).attr("parentId");
    	var belongId = $(this).attr("belongId") == null ? 0 :$(this).attr("belongId");
    	$(this).parent().prev().find('.cmt-r-input').val("");
    	if(content ==""){
            layer.msg('评论不能为空!')
    		return false;
    	}
    	htmlObj.addFollowComment(parentId, belongId, followId, content,$(this).parents('.the-option').find('.comment-checked'));
    })
	
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
	
htmlObj.addFollowComment = function(parentId,belongId,followId,content,e){
	var obj = {};
	obj['parentId'] = parentId;
	obj['belongId'] = belongId;
	obj['followId'] = followId;
	obj['content'] = content;
	obj['clientId'] = htmlObj.clientId;
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
                layer.msg('评论成功!')
				var num = $(e).parents(".the-option").find(".comment-entry a");
				num.html(Number(num.html())+1);
				htmlObj.showComment(e);
			}else {
                layer.msg('评论失败!');
			}
		}
	});
}

htmlObj.getContacts = function(id){
	$.ajax({
        url: htmlObj.rootUrl + '/crm/client/contacts/list?clientId='+ id,
        type: 'get',
        beforeSend: function (request) {
            request.setRequestHeader("Content-Type", "application/json;charset=UTF-8;");
            request.setRequestHeader("authorization", htmlObj.authorization);
        },
        success: function (data) {
            if (data.code == "success") {
            	var str = "";
            	for(var i = 0;i < data.content.length;i++) {
            		var a =  data.content;
            		var obj = a[i];
            		str +='<div class="row form-inline the-option"><p class="handle-block"><a href="javascript:void(0);" class="handle-btn btn-edit editCon" data="'+obj.id+'">编辑</a></p>';
            		str +='<div class="form-group col-md-3"><label class="control-label">姓名：</label><input type="text" class=" on-border" value="'+obj.name+'" readonly/></div>';
					str +='<div class="form-group col-md-4"><label class="control-label">电话：</label><input type="text" class=" on-border" value="'+obj.phone+'" readonly/></div>';
					str +='<div class="form-group col-md-5"><label class="control-label">职位：</label><input type="text" class=" on-border" value="'+obj.title+'" readonly/></div>';
					str +='<div class="form-group col-sm-12"><label class="control-label pro-desc-label">备注：</label><span class="remark-contact">'+obj.comments+'</span></div></div>';
            	}
            	$("#xsrow").html(str);
            } else {
                pageObj.showNotLoginErrorMsg(data.code, data.message);
            }
        }
    });
}

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
 * 表单验证--编辑客户
 */
htmlObj.validateEditClient = function (id) {
    validatorOfAddClient = $("#editClientForm").validate({
        debug: true,
        onfocusout: function (element) {
            $(element).valid();
        },
        submitHandler: function () {
            debugger;
            $('#btnAddClient').attr('disabled', 'disabled');
            //添加客户
            htmlObj.editClient(id);
        },
        rules: {
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
        }
        }, messages: {
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
htmlObj.initEditClientHandle = function (id) {
    //添加用户的表单验证
    htmlObj.validateEditClient(id);
    var editClientModal = $('#editClientModal');
    editClientModal.on("hidden.bs.modal", function () {
        htmlObj.resetValide(validatorOfAddClient, editClientModal, 'addClientForm');
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
    document.getElementById(formId).reset();
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
htmlObj.editClient = function(id){
	var name = $("#cName").val(), // 客户名称模糊查询
	keeperName = $("#cCharge").val(), // 负责人
	keeperId = $("#cCharge").attr("data-personid"), // 负责人
	regionId = $("select[id='cArea']").val(),//片区
	clientTypeId = $("select[id='cType']").val(),// 客户类型
	clientStatusId = $("select[id='cStatus']").val(),//客户状态
	dealStatusId = $("select[id='cBargainStatus']").val(),//成交状态
	clientLevelId = $("select[id='cRank']").val(),//客户级别
	coAreaId = $("select[id='cTerritory']").val(),//合作领域
	address = $('#cAddress').val(),
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
    obj['id'] = id;
	
	var url = htmlObj.rootUrl + "/crm/client";
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
                layer.msg('保存成功!');
            	$("#editClientModal").modal('hide');
            	$('#btnAddClient').removeAttr('disabled');//解禁
                //刷新客户列表
                htmlObj.getClientDetlis(id);
            } else {
                //显示错误信息
                pageObj.showNotLoginErrorMsg(data.code, data.message);
            }
        }
    });
}

htmlObj.editClick = function(id){
	$.ajax({
        url: htmlObj.rootUrl + '/crm/client/'+id+'/detail',
        type: 'get',
        beforeSend: function (request) {
            request.setRequestHeader("Content-Type", "application/json;charset=UTF-8;");
            request.setRequestHeader("authorization", htmlObj.authorization);
        },
        success: function (data) {
            if (data.code == "success") {
            	$("#cName").val(data.content.name);
            	$("#cCharge").val(data.content.keeperName);
            	$("#cCharge").attr("data-personid",data.content.keeperId);
            	$("#cArea").val(data.content.regionId);
            	$("#cType").val(data.content.clientTypeId);
            	$("#cStatus").val(data.content.clientStatusId);
            	$("#cBargainStatus").val(data.content.dealStatusId);
            	$("#cdBargainStatus").val(data.content.dealStatusName);
            	$("#cRank").val(data.content.clientLevelId);
            	$("#cTerritory").val(data.content.coAreaId);
            	$("#cAddress").val(data.content.address);
            	$("#cDesc").html(data.content.comments);
            } else {
                pageObj.showNotLoginErrorMsg(data.code, data.message);
            }
        }
    });
}

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

htmlObj.adContact = function(id) {
	var a = new Array();
	var obj = {};
	obj['name'] = $('#xs_name1').val();
	obj['phone'] = $('#xs_tel1').val();
	obj['title'] = $('#xs_title1').val();
	obj['comments'] = $('#xs_remark1').val();
	a[0] = obj;
	var clientId = id;
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
               document.getElementById("addContactForm").reset();
               htmlObj.getClientDetlis(id);
               $("#er").trigger("click");
            } else {
                //显示错误信息
                pageObj.showNotLoginErrorMsg(data.code, data.message);
            }
        }
    });
}

htmlObj.initEditConXS = function(){
		$(document).on("click",'.editCon',function(event){
			event.stopPropagation();
			$("#editContactModal").modal();
			var id = $(this).attr("data");
			$.ajax({
		    	url:htmlObj.rootUrl + '/crm/client/contacts/info?conId='+id,
		        type: 'get',
		        beforeSend: function (request) {
		            request.setRequestHeader("authorization", htmlObj.authorization);
		        },
		        success: function (data) {
		            if (data.code == "success") {
		            	$("#xs_name").val(data.content.name);
		            	$("#xs_name").attr("data",data.content.id);
		            	$("#xs_tel").val(data.content.phone);
		            	$("#xs_title").val(data.content.title);
		            	$("#xs_remark").val(data.content.comments);
		            	$("#bArea").val();
		            } else {
		                pageObj.showNotLoginErrorMsg(data.code, data.message);
		            }
		        }
		    });
		})
}

htmlObj.initEditOppXS = function(){
	$(document).on("click",'.edit-opp',function(event){
		event.stopPropagation();
		$("#editBusinessModal").modal();
		var id = $(this).attr("data");
		$.ajax({
	    	url:htmlObj.rootUrl + '/crm/opp/info?oppId='+id,
	        type: 'get',
	        beforeSend: function (request) {
	            request.setRequestHeader("authorization", htmlObj.authorization);
	        },
	        success: function (data) {
	            if (data.code == "success") {
	            	$("#edtiOppModal").find(".modal-title").html(data.content.name);
	            	$("#aoppName").val(data.content.name);
	            	$("#aoppName").attr("data",data.content.id);
	            	$("#aregion").val(data.content.regionId);
	            	$("#abPredictSaleAmount").val(data.content.advanceSales);
	            	$("#aint_items").val(data.content.intItemsId);
	            	$("#aremark").val(data.content.comments);
	            } else {
	                pageObj.showNotLoginErrorMsg(data.code, data.message);
	            }
	        }
	    });
	})
}

htmlObj.editConBtnClick = function(id){
	var obj = {};
	obj['id'] = $("#xs_name").attr("data");
	obj['name'] = $("#xs_name").val();
	obj['phone'] = $("#xs_tel").val();
	obj['title'] = $("#xs_title").val();
	obj['comments'] = $("#xs_remark").val();
	var thejson = JSON.stringify(obj);
  	 //请求接口
      $.ajax({
          url: htmlObj.rootUrl + '/crm/client/contacts',
          data:thejson,
          type:'put',
          beforeSend: function (request) {
              request.setRequestHeader("Content-Type", "application/json;charset=UTF-8;");
              request.setRequestHeader("authorization", htmlObj.authorization);
          },
          success: function (data) {
              if (data.code == "success") {
                 $("#editContactModal").modal("hide");
                 htmlObj.getClientDetlis(htmlObj.clientId);
                 $("#er").trigger("click");
              } else {
                  //显示错误信息
                  pageObj.showNotLoginErrorMsg(data.code, data.message);
              }
          }
   })
}
/*
 * 获取选择的负责人，并显示到来源input
 */
htmlObj.chooseLeader = function (personId, personName) {
    $('#' + htmlObj.personClickfrom).val(personName).attr('data-personid', personId).blur();
    $('#choosePersonModal').modal('hide');
    $('#chooseCusModal').modal('hide');
    if($('#' + htmlObj.personClickfrom).val()!=''){
    	$('.input_clear').show();
    }
    $('#queryKD').val('');
    //重新初始化所有人员分页list
    htmlObj.getDepLeaderList();
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

htmlObj.editOppClick = function(e){
	var bName = $('#aoppName').val();
    var bArea = $("select[id='aregion']").val()
    var bPredictSaleAmount = $('#abPredictSaleAmount').val();
    var bWantPro = $("#aint_items").val()
    var bDesc = $('#aremark').val();
    var obj = {};
    obj['name'] = bName;
    obj['regionId'] = bArea;
    obj['advanceSales'] = bPredictSaleAmount;
    obj['intItemsId'] = bWantPro;
    obj['comments'] = bDesc;
    obj['id'] = $('#aoppName').attr("data");
    var thejson = JSON.stringify(obj);
    //请求接口
    $.ajax({
        url: htmlObj.rootUrl + '/crm/opp',
        data:thejson,
        type:'put',
        beforeSend: function (request) {
            request.setRequestHeader("Content-Type", "application/json;charset=UTF-8;");
            request.setRequestHeader("authorization", htmlObj.authorization);
        },
        success: function (data) {
            if (data.code == "success") {
               $("#editBusinessModal").modal("hide");
               htmlObj.getClientDetlis(htmlObj.clientId);
               $("#san").trigger("click");
            } else {
                //显示错误信息
                pageObj.showNotLoginErrorMsg(data.code, data.message);
            }
        }
    })
}

/**
 * 编辑商机信息Modal弹框中需处理的事
 */
htmlObj.initEditBusinessHandle = function () {
    //编辑商机的表单验证
    htmlObj.validateEditBusiness();
    var editBusinessModal = $('#editBusinessModal');
    editBusinessModal.on("hidden.bs.modal", function () {
        htmlObj.resetValide(validatorOfEditBusiness, editBusinessModal, 'editBusinessForm');
    });
    //点击单个商机详情的编辑
    $('#businessTab').find('.the-options').on('click', '.btn-edit', function () {
        editBusinessModal.modal();
    });
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

/**
 * 修改跟进记录
 */
htmlObj.editFollow = function () {
    var obj = {};
    obj['id'] = $("#followperson1").attr("followId");
    obj['clientId'] = htmlObj.clientId;
    obj['personId'] = $("#followperson1").attr("data");
    obj['personName'] = $("#followperson1").val();
    obj['followModeId'] = $("#commstyle1").val();
    obj['comments'] = $("#followdesc1").val();
    obj['nextPlan'] = $("#nextplan1").val();
    obj['followTime'] = new Date($("#follow_time").val()).getTime();
    
    //拼接参数
    var theJson = JSON.stringify(obj);
    //请求接口
    $.ajax({
        url: htmlObj.rootUrl + '/crm/client/follow',
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
                htmlObj.getFollowList(htmlObj.clientId);
            } else {
                //显示错误信息
                pageObj.showNotLoginErrorMsg(data.code, data.message);
            }
        }
    });
};

/**
 * 表单验证--编辑商机信息
 */
htmlObj.validateEditBusiness = function () {
    //表单验证
    validatorOfEditBusiness = $("#editBusinessForm").validate({
        debug: true,
        onfocusout: function (element) {
            $(element).valid();
        },
        submitHandler: function () {
            $('#btnAddClient').attr('disabled', 'disabled');
            //修改联系人信息
            htmlObj.editBusinessDetail();
        },
        rules: {
            cName: {
                required: true
            }, cRank: {
                required: true
            }, cStatus: {
                required: true
            }, cType: {
                required: true
            }, cTerritory: {
                required: true
            }, cBargainStatus: {
                required: true
            }, cCharge: {
                required: true
            }, cArea: {
                required: true
            }, cAddress: {
                required: true
            }
        }, messages: {
            cName: {
                required: "客户名称不能为空！"
            }, cRank: {
                required: "请选择客户级别！",
            }, cStatus: {
                required: "请选择客户状态！",
            }, cType: {
                required: "请选择客户类型！",
            }, cTerritory: {
                required: "请选择合作领域！",
            }, cBargainStatus: {
                required: "请选择成交状态！",
            }, cCharge: {
                required: "请选择负责人！",
            }, cArea: {
                required: "请选择片区！",
            }, cAddress: {
                required: "请输入详细地址！",
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
 * 表单验证--编辑跟进记录
 */
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

htmlObj.addFollow = function(){
	var obj = {};
	obj['personName'] = $("#followperson").val();
	obj['followModeId'] = $("#commstyle").val();
	obj['comments'] = $("#followdesc").val();
	obj['nextPlan'] = $("#nextplan").val();
	obj['followTime'] = new Date($("#add_follow_time").val()).getTime();
	obj['clientId'] = htmlObj.clientId;
	var thejson = JSON.stringify(obj);
	$.ajax({
        url: htmlObj.rootUrl + '/crm/client/follow',
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
               $('#addFollow').removeAttr("disabled");
               htmlObj.getClientDetlis(htmlObj.clientId);
               $("#si").trigger("click");
            } else {
                //显示错误信息
                pageObj.showNotLoginErrorMsg(data.code, data.message);
            }
        }
    })
}

/**
 * 初始化时间控件
 */
htmlObj.initLaydate1 = function () {
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

//添加客户Modal弹框中需处理的事
htmlObj.initAddBusinessHandle = function () {
    htmlObj.validateAddBusiness();
    var addBusinessModal = $('#addBusinessModal');
    addBusinessModal.on("hidden.bs.modal", function () {
        htmlObj.resetValide(validatorOfAddBusiness, addBusinessModal, 'addBusinessForm');
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

            	layer.msg('保存成功');
            	$("#addBusinessModal").modal("hide");
            	htmlObj.getClientDetlis(htmlObj.clientId);
            	$("#san").trigger("click");
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

htmlObj.adContact2 = function() {
	var a = new Array();
	$('.contact-contain').find('.contact-item').each(function(index,e){
		var obj = {};
		obj['name'] = $(e).find('.c-name').val();
		obj['phone'] = $(e).find('.c-tel').val();
		obj['title'] = $(e).find('.c-post').val();
		obj['comments'] = $(e).find('.c-remark').val();
		a[index] = obj;
	})
	console.log(a);
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
var item = "";

/**
 * 初始化
 */
htmlObj.init = function () {
	htmlObj.initLaydate1();
	htmlObj.initLaydate2();
	htmlObj.initLaydatexs();
	item = $("#followList").html();
	htmlObj.twocom = $(".comment-sub-list").html();
	htmlObj.onecom = $(".comment-list").html();
	htmlObj.onecom = htmlObj.onecom.replace(htmlObj.twocom,"");
	var clientId = htmlObj.getLocationPara("id");
	htmlObj.clientId = clientId;
	htmlObj.getClientDetlis(clientId);
	$("#frist").trigger("click");
	$("#er").on("click",function(){
		htmlObj.getContacts(clientId);
		htmlObj.initEditConXS(clientId);
	})
	$("#san").on("click",function(){
		htmlObj.getOppList(clientId);
		htmlObj.initEditOppXS(clientId);
	})
	$("#si").on("click",function(){
		htmlObj.getFollowList(clientId);
	})
	$('select').each(function(index){
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
	htmlObj.initAddBusinessHandle();
	htmlObj.initAddFollowHandle();
	htmlObj.initEditFollowHandle();
	htmlObj.initEditClientHandle(clientId);//初始化添加客户Modal处理事项
	$("#editClient").on("click",function(){
		htmlObj.editClick(clientId);
    	$("#editClientModal").modal();
	})
	$("#btnAddContact").on("click",function(){
		$("#addConModal").modal();
	})
	$('#cCharge').on('click',function(event){
    	$('#choosePersonModal').modal('show');
    	htmlObj.personClickfrom = "cCharge";
    	htmlObj.getDepLeaderList();
    }); 
  
    $("#editConBtn").on("click",function(event){
    	event.preventDefault();
    	var name = $('#xs_name').val();
    	var tel = $('#xs_tel').val();
    	if(name == "" || tel == "") {
            layer.msg('新增联系人姓名或联系方式不能为空');
    		return false;
    	}
    	htmlObj.editConBtnClick();
    });
    $("#addConBtn").on("click",function(event){
    	event.preventDefault();
    	var name = $('#xs_name1').val();
    	var tel = $('#xs_tel1').val();
    	if(name == "" || tel == "") {
            layer.msg('新增联系人姓名或联系方式不能为空');
    		return false;
    	}
    	htmlObj.adContact(htmlObj.clientId);
    });
	$("#btnAddBusiness").on("click",function(){
        $("#bClientName").val($("#clientName").text()).attr("data-personid",clientId);
		$("#addBusinessModal").modal();
	})
    $("#abtnEditOpp").on('click',function(event){
    	event.preventDefault();
    	htmlObj.editOppClick(this);
    })
    $("#btnAddFollowNote").on('click',function(){
    	$("#addFollowModal").modal();
    })
	
    // 新增商机-负责人选择
    $('#bFollow').on('click',function(event){
    	$('#choosePersonModal').modal('show');
    	htmlObj.personClickfrom = "bFollow";
    	htmlObj.getDepLeaderList();
    })
    // 新增商机-客户名称选择
   /* $('#bClientName').on('click',function(event){
    	$('#chooseCusModal').modal('show');
    	htmlObj.personClickfrom = "bClientName";
    	htmlObj.getProCList();
    })*/
    // 初始化联系人选择事件
    $('#bContact').on('click',function(event){
    	if (Utils.isNullorEmpty($('#bClientName').val())) {
            layer.msg('请先选择客户!');
   	        return;
        }
    	$('#chooseConModal').modal();
    	htmlObj.personClickfrom = "bContact";
    	htmlObj.getContactList();
    })
     $('#btnAddContent').on('click', function () {
    	htmlObj.adContact2();
    });
    // 添加联系人按钮
    $('#btnAddContact1').on('click',function(event){
    	if (Utils.isNullorEmpty($('#bClientName').val())) {
   		 	layer.msg('请先选择客户!')
   	        return;
        }
    	$('#addConModal').modal('show');
    	$('#conhead').append("-"+$('#bClientName').val());
    })
    
    //跟进人搜索点击事件
    $('#btnSearchDepLeader').on('click', function () {
    	htmlObj.getDepLeaderList();
    });

    htmlObj.relatedContract();
    //关闭当前页面
    $('.btn-closeit').on('click', function () {
        window.close();
    });
};
htmlObj.relatedContract = function(){ //获取客户相关合同
    $.ajax({
        url:  htmlObj.rootUrl  + "/ctm/contract/list",
        data: {
            customerId: Utils.getLocationPara('id'),
            pageNum:1,
            pageSize:100
        },
        type:'get',
        beforeSend: function (request) {
            request.setRequestHeader("Content-Type", "application/json;charset=UTF-8;");
            request.setRequestHeader("authorization", htmlObj.authorization);
        },
        success: function (data) {
            if (data.code == "success") {
                var content = data.content;
                $('#relatedTabLink').text('相关合同('+content.length+')');
                var str  = '';
                for(var i = 0; i < content.length; i++){
                    str += '<div class="row form-inline the-option"><p class="handle-block"><span class="handle-text-lt follow-date">'+content[i].contractName+'</span></p><div class="form-group col-md-12 remark-block" ><label class="control-label pro-desc-label">开始日期：</label>'+
                        '<span class="remark-follow">'+ new Date(content[i].startTime).toDay() +'</span></div><div class="form-group col-md-12 remark-block"><label class="control-label pro-desc-label">结束日期：</label><span class="remark-follow">'+ new Date(content[i].endTime).toDay() +'</span></div><div class="form-group col-md-12 remark-block">'+
                        '<label class="control-label pro-desc-label">业 务 员：</label><span class="remark-follow">'+ content[i].salesmanName +'</span></div><div class="form-group col-sm-12 remark-block"><label class="control-label pro-desc-label">合同概要：</label><span class="remark-follow">'+ content[i].remark +'</span></div></div>'
                }
                $('#relatedList').append(str);


            } else {
                //显示错误信息
                layer.msg(data.message)
            }
        }
    });

};

/**
 * 初始化时间控件
 */
htmlObj.initLaydatexs = function () {
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
