/**
 * CRM--CRM底层配置
 * @author:何凡凡
 * @time:2017-05-10
 */

var htmlObj = {};
htmlObj.rootUrl = appHost + approot;
htmlObj.authorization = Utils.getValue('authorization'); //获取登录人的userId和Token

/**
 * 获取字段配置信息
 */
htmlObj.getFiles = function (belongCode) {
	var num = ["一","二","三","四","五","六","七","八","九","十","十一","十二"];
    var url = htmlObj.rootUrl + "/crm/fields/list?belongCode=" + belongCode;
    var theRequestMethod = "get";
    $.ajax({
        url: url,
        type: theRequestMethod,
        beforeSend: function (request) {
            request.setRequestHeader("Content-Type", "application/json;charset=UTF-8;");
            request.setRequestHeader("authorization", htmlObj.authorization);
        },
        success: function (data) {
        	 if (data.code == "success") {
                 var content = data.content;
                 var options = '';
                 for (var i = 0; i < content.length; i++) {
                     var theData = content[i];
                     options += '<div class="form-group inblock">';
                     options += '<label class="control-label col-sm-2">选项'+num[i]+'：</label>';
                     options += '<input type="text" class="form-control input-key noborder" value='+theData.name+' id='+theData.id+' code='+theData.code+' readonly ></div>';
                 }
                 options += '<div class="pull-right"><button class="btn btn-turquoise pull-right" onclick="htmlObj.addFiles(this)" style="display:none">新增选项</button></div>';
                 $('#'+belongCode).html(options);
            } else {
                //显示错误信息
                pageObj.showNotLoginErrorMsg(data.code, data.message);
            }
        }
    });
};

htmlObj.addFiles = function(e){
	var html = '';
	html += '<div class="form-group inblock">';
	html += '<label class="control-label col-sm-2">添加选项：</label>';
	html += '<input type="text" class="form-control input-key"></div>';
	$(e).parent().before(html);
}


htmlObj.save = function(e) {
	var ary = [];
	var j = 0;
	$(e).parents(".panel-body").find("input").each(function(index,ele){
    	var obj = {};
    	var id = $(ele).attr("id");
    	var code = $(ele).attr("code");
    	var name = $(ele).val();
    	var belongCode = $(ele).parents(".complaimOrder").attr("id");
    	
    	if (!Utils.isNullorEmpty(id)) {
    		obj['id'] = id;
        }
    	obj['code'] = code;
    	obj['name'] = name;
    	obj['belongCode'] = belongCode;
    	if(name != ""){
    		ary[j] = obj;
    		j++;
    	}
    });
	var thejson = JSON.stringify(ary);
	var url = htmlObj.rootUrl + "/crm/fields/batch";
	$.ajax({
        url: url,
        data:thejson,
        type: "POST",
        beforeSend: function (request) {
            request.setRequestHeader("Content-Type", "application/json;charset=UTF-8;");
            request.setRequestHeader("authorization", htmlObj.authorization);
        },
        success: function (data) {
        	 if (data.code == "success") {
        		 layer.msg("保存成功！");
        		 $(e).hide();
    			 $(e).parents(".panel-body").find(".edit-files").show();
    			 $(e).parents(".panel-body").find(".pull-right").hide();
    			 $(e).parents(".panel-body").find("input").attr("readonly","true");
    			 htmlObj.getFiles($(e).parents(".panel-body").find(".complaimOrder").attr("id"));
            } else {
                //显示错误信息
                pageObj.showNotLoginErrorMsg(data.code, data.message);
            }
        }
    });
}

/**
 * 初始化
 */
htmlObj.init = function () {
	htmlObj.getFiles("client_status");
	htmlObj.getFiles("co_area");
	htmlObj.getFiles("client_level");
	htmlObj.getFiles("region");
	htmlObj.getFiles("int_items");
	htmlObj.getFiles("co_mode");
	htmlObj.getFiles("deal_status");
	htmlObj.getFiles("client_type");
	htmlObj.getFiles("follow_mode");
	htmlObj.getFiles("sale_stage");
	$('.save-files').hide();
	$('.edit-files').on('click',function(event){
		$(this).parents(".panel-body").find("input").removeAttr("readonly");
		$(this).parents(".panel-body").find("input").removeClass("noborder");
		$(this).hide();
		$(this).parents(".panel-body").find(".save-files").show();
		$(this).parents(".panel-body").find(".pull-right").show();
		
	})
	$('.save-files').on('click',function(event){
		htmlObj.save(this);
		$(this).parents(".panel-body").find("input").addClass("noborder");
	})
};

$(function () {
    htmlObj.init();
});