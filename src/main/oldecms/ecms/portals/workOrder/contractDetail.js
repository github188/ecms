/**
 * 工单详情
 * @author: xiongxiaojun
 * @time:2017-06-26
 */
var workOrder = {
    url: fsHost + approot
};
workOrder.authorization = Utils.getValue('authorization'); //获取登录人的userId和Token
workOrder.upload = [];
workOrder.contractId = '';
workOrder.processType = Utils.getLocationPara('type');
workOrder.getProcessInfo = function(){  //获取处理流程信息
    $('#processLine').empty();
    $('#ctr_File').empty();
    $.ajax({
            url: workOrder.url + '/sys/process/details',
        type: 'get',
        data: {
            processId: Utils.getLocationPara('processId'),
            type: Utils.getLocationPara('type')
        },
        beforeSend: function (request) {
            request.setRequestHeader("authorization", workOrder.authorization);
        },
        success: function (data) {
            if (data.code == "success") {
                var content = data.content;
                var user = content.user;  //用户信息
                var publicInfo = content.detailsObject;   //获取公告信息
                if( workOrder.processType == 4){ //展示合同信息
                    $('#contractDetail').show();
                    // $('#ctr_Name').text(publicInfo.ctmName);
                    $('#ctr_starTime').text(new Date(publicInfo.startTime).toDay());
                    $('#ctr_endTime').text(new Date(publicInfo.endTime).toDay());
                    $('#ctr_salesmanName').text(publicInfo.userName);
                    $('#ctr_customerName').text(publicInfo.cusName);
                    $('#ctr_projectName').text(publicInfo.projectName || '/');
                    $('#ctr_amount').html( publicInfo.amount && (publicInfo.amount).addComma() + '&nbsp;元' || '/');
                    $('#ctr_contractType').text(publicInfo.ctmAttrName);
                    $('#ctr_Remark').text(publicInfo.remark);
                    $('#ctr_department').text(publicInfo.depName.split('-').reverse().join('-'));
                    var list = content.list;   //合同附件
                    if(list){
                        if(list.length == 0){
                            $('#contractFile').text('暂无附件');
                        }else{
                            workOrder.showFileList(list, '#ctr_File');
                        }
                    }
                }

                //公共信息
                $('.order-time').text(new Date(publicInfo.addTime)); //时间
                $('.order-title').text(publicInfo.ctmName);
                $('.user-name').text(user.realname);
                $('.user-section').html(user.depName + '&nbsp;|&nbsp;' + user.post);

                if(publicInfo.status == 2 ){
                    $('#approveResult').addClass('approve-result approve-result-agree');
                }else if(publicInfo.status == 3){
                    $('#approveResult').addClass('approve-result approve-result-refuse');
                }
                // $('.user-avatar').attr('src', Utils.getAvatar(user));

                var doingList = content.doingList;
                var doneList = content.doneList;

                workOrder.doingList(doingList);
                workOrder.doneList(doneList, publicInfo);
            } else {
                layer.msg(data.message);
            }
        }
    })
};
workOrder.downFile = function (id, name) {
    Utils.getFile({
        url:  '/ctm/contract/files/download?fileId='+ id +'&name='+ name,
        id: id,
        name: name
    });
};

/**
 * 展示附件
 */
workOrder.showFileList = function (file, ele) {
    var returnName = function (type, id, name) {
        $(ele).append('<p class="file-temp-list"><img style=" margin-left: -5px; height: 32px; width: 32px; margin-right: 5px" src="../../skins/img/file/'+ type +'.png" ><a onclick="workOrder.downFile(\''+ id + '\', \''+ name + '\')" title="下载附件" href="javascript:;">'+ name +'</a><em class="file-remove" data-id="'+ id +'" title="删除">X</em></p>')
    };
    for(var i = 0; i < file.length; i++){
        var name = file[i].name;
        var id = file[i].id;
        var postfix = name.split('.')[name.split('.').length-1];
        var type = Utils.getFileType(postfix);
        returnName(type, id, name);
    }
};

workOrder.doneList = function(doneList, contract){ // 已处理的业务审批
    var str = ['驳回', '同意','重新发起审批', '结束流程'];
   var ask =  '<li class="approve-record-end"><p class="approve-name">发起申请<span class="approve-time">'+new Date(contract.addTime)+'</span></p><p class="approve-process">'+ (contract.userName||contract.salesmanName) +'</p><div class="approve-reason"></div></li>';
   if(doneList.length != 0){
       for(var i = 0; i < doneList.length; i++){
           var result = str[doneList[i].result];
           var doneTpl = '<li class="approve-record-end"><p class="approve-name">'+ doneList[i].nodeName+' <span class="approve-time">'+ new Date(doneList[i].updateTime) +'</span></p>'+
               '<p class="approve-process">'+ doneList[i].handlerName +'： <span class="deal-status">'+ result +'</span></p>'+
               '<div class="approve-reason">'+ (doneList[i].opinion||'') +'</div></li>';
           $('#processLine').append(doneTpl);
       }
   }
    $('#processLine').append(ask);
    layer.photos({
        photos: '#processLine',
        shift : -1
    });
};
workOrder.doingList = function(doingList){ // 处理中的业务审批

    if(doingList.length != 0){
        var doingListTpl = '<li class="approve-record-ing"><p class="approve-name">'+ doingList[0].nodeName +' <span class="approve-time">'+ new Date(doingList[0].updateTime)+'</span></p><p class="approve-process">';
        var handlerName = [];
        for(var i = 0; i < doingList.length; i++){
            handlerName.push(doingList[i].handlerName);
        }
        doingListTpl+= handlerName.join('、')+ '<span class="deal-status">：处理中</span></p></li>';
        $('#processLine').append(doingListTpl);
    }
};
workOrder.getUserInfo= function () {
    layer.load(1, {
        shade: [0.5,'#000']
    });
    var  authorization = Utils.getValue("authorization");
    $.ajax({
        type: "get",
        url: workOrder.url + '/authority/user/homepage/detail',
        async: true,
        beforeSend: function (xhr) {
            xhr.setRequestHeader("authorization", authorization);
        },
        success: function (data) {
            if (data.code == 'success') {
                var contents=data.content;
                $('#userName').html(contents.realname);
                $('#dptName').html(contents.depName);
                $('#position').html(contents.post);
                var headPic = contents.headPic;
                if(!Utils.isNullorEmpty(headPic)){
                    var imgurl = workOrder.url  + "/authority/user/picture/head/" + headPic + "/download";
                    $("#userhead").attr("src",imgurl);
                }
                Utils.setValue("sex", contents.sex);
                workOrder.getProcessInfo();
            } else {//接口调用失败
                Utils.Alert(data.message);
            }
            layer.closeAll('loading');
        },
        error: function () {
            Utils.Alert('服务器异常');
        }
    });
};
/**
 * 获取菜单
 */
workOrder.getMenu = function () {
    var data={
        typeLevel:1
    };
    $.ajax({
        type: "get",
        url: workOrder.url + '/authority/resource/user/resources',
        async: true,
        data: data,
        beforeSend: function (xhr) {
            xhr.setRequestHeader("authorization", workOrder.authorization);
        },
        success: function (data) {
            if (data.code == 'success') {
                var content = data.content;
                for(var i = 0; i < content.length; i++){
                    if(content[i].url == 'contractManage'){
                        $('#fastEntry').attr('href', '../../main.html?resourceid='+ content[i].id +'&resourcename='+ encodeURI(encodeURI(content[i].name)) +'');
                    }
                }
            } else {//接口调用失败
                Utils.Alert(data.message);
            }
        },
        error: function () {
            Utils.Alert('服务器异常');
        }
    });
};


/**
 * 获取合同字段
 */
workOrder.getFile = function(code, callback){
    //归档状态：  contract_exstatus
    //合同状态：  contract_status
    //产品线：    department
    //流程类型：  processtype
    $.ajax({
        url: workOrder.url + '/ctm/setting/param/list',
        type: 'get',
        beforeSend: function (request) {
            request.setRequestHeader("Content-Type", "application/json;charset=UTF-8;");
            request.setRequestHeader("authorization", workOrder.authorization);
        },
        data: {
            code : code
        },
        success: function (data) {
            if (data.code == "success") {
                callback(data.content);
            } else {
                layer.msg(data.message);
            }
        }
    });
};


workOrder.init = function(){
    this.getUserInfo();
    this.getMenu();
};

$(function(){
    workOrder.init();
});