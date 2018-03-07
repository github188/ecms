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
                    $('#ctr_Name').text(publicInfo.ctmName);
                    $('#ctr_starTime').text(new Date(publicInfo.startTime).toDay());
                    $('#ctr_endTime').text(new Date(publicInfo.endTime).toDay());
                    $('#ctr_salesmanName').text(publicInfo.userName);
                    $('#ctr_customerName').text(publicInfo.cusName);
                    $('#ctr_projectName').text(publicInfo.projectName || '/');
                    $('#ctr_amount').html( publicInfo.amount && (publicInfo.amount).addComma() + '&nbsp;元' || '/');
                    $('#ctr_contractType').text(publicInfo.ctmAttrName);
                    $('#ctr_Remark').text(publicInfo.remark);
                    $('#ctr_department').text(publicInfo.depName.split('-').reverse().join('-'));
                    // workOrder.getProduct(publicInfo.departmentId); //设置合同审批产品线名称

                    var list = content.list;   //合同附件
                    if(list){
                        if(list.length == 0){
                            $('#contractFile').text('暂无附件');
                        }else{
                            workOrder.showFileList(list, '#ctr_File');
                        }
                    }

                }else if( workOrder.processType == 1){  //展示请假信息
                    $('#vacationDetail').show();
                    $('#vac_reason').text(publicInfo.reason);
                    $('#vac_name').text(publicInfo.salesmanName);
                    $('#vac_time').text(publicInfo.timeLength + '天');

                    if(!publicInfo.agentName){
                        $('#vac_agent').parents('li').remove();
                    }else{
                        $('#vac_agent').text(publicInfo.agentName);
                    }
                    // $('#vac_type').text(publicInfo.type);
                    $('#vac_startTime').text(new Date(publicInfo.startTime));
                    $('#vac_endTime').text(new Date(publicInfo.endTime));
                    workOrder.getAffairsType(publicInfo.type, $('#vac_type'));
                }else if(workOrder.processType == 2){   //展示加班信息
                    $('#overTimeDetail').show();
                    $('#over_reason').text(publicInfo.reason);
                    $('#over_name').text(publicInfo.salesmanName);
                    $('#over_time').text(publicInfo.timeLength + '天');
                    $('#over_startTime').text(new Date(publicInfo.startTime));
                    $('#over_endTime').text(new Date(publicInfo.endTime));
                }else if(workOrder.processType == 3){  //展示出差信息
                    $('#awayOfficialDetail').show();
                    $('#away_reason').text(publicInfo.remark);
                    $('#away_name').text(publicInfo.salesmanName);
                    $('#away_time').text(publicInfo.timeLength + '天');
                    $('#away_startTime').text(new Date(publicInfo.startTime));
                    $('#away_endTime').text(new Date(publicInfo.endTime));
                    $('#away_start').text(publicInfo.startAddress);
                    $('#away_end').text(publicInfo.endAddress);

                    if(publicInfo.isNeedplane == 0){
                        $('.away_plane_box').remove();
                    }else{
                        $('.away_plane_box').show();
                        $('#away_plane').text('需要').show();
                        $('#away_plane_remark').text(publicInfo.planeRemark).show();
                    }
                }else if(workOrder.processType == 5){ //展示外出详情
                    $('.be-out-tips').show();
                    $('#beOutDetail').show();

                    // publicInfo.list();
                    var beOutTemplate = function (data, index) {
                        var str = '<div class="be-out-list"><p>外出'+ index+'</p>'+
                        '<li><label>开&nbsp;始&nbsp;时&nbsp;间：</label><span class="order-detail-control" >'+ new Date(data.startTime)+'</span></li>'+
                        '<li><label>结&nbsp;束&nbsp;时&nbsp;间：</label><span class="order-detail-control" >'+ new Date(data.endTime) +'</span></li>'+
                        '<li><label>时&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;长：</label><span class="order-detail-control" >'+ data.timeLength +'</span></li>'+
                        '<li><label>外&nbsp;出&nbsp;事&nbsp;由：</label><span class="order-detail-control" style="display: inline">'+ data.reason+'</span> </li></div>';
                        return str;
                    };

                    for(var i = 0; i < publicInfo.list.length; i++){
                        $('#beOutDetail').append(beOutTemplate(publicInfo.list[i], i+1));
                    }
                }

                $('.order-box ul').each(function (a, b) {
                    if($(b).is(":hidden")){
                        $(b).remove();
                    }
                });

                //公共信息
                workOrder.setTodo(publicInfo.id);  //获取处理节点
                $('.order-time').text(new Date(publicInfo.addTime)); //时间
                $('.order-title').text(content.title);
                $('.user-name').text(user.realname);
                $('.user-section').html(user.depName + '&nbsp;|&nbsp;' + user.post);

                if(publicInfo.status == 2 ){
                    $('#approveResult').addClass('approve-result approve-result-agree');
                }else if(publicInfo.status == 3 || publicInfo.status == 4){
                    $('#approveResult').addClass('approve-result approve-result-refuse');
                }

                $('.user-avatar').attr('src', Utils.getAvatar(user, 200, 200));

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

/**
 * 获取请假类型
 */
workOrder.getAffairsType = function (type, detail) {
    $.ajax({
        url: workOrder.url + '/ctm/setting/param/list',
        type: 'get',
        beforeSend: function (request) {
            request.setRequestHeader("Content-Type", "application/json;charset=UTF-8;");
            request.setRequestHeader("authorization", workOrder.authorization);
        },
        data: {
            code : 'cwa_leave_type'
        },
        success: function (data) {
            if (data.code == "success") {
                var status = data.content;
                var options = '<option value="">--请选择--</option>';
                for (var i = 0; i < status.length; i++) {
                    if(detail && type == status[i].value){
                        detail.text(status[i].name);
                    }
                    if(status[i].value >= 4 && status[i].value != 9 && status[i].value !=10){
                        if(status[i].value == type){
                            options += '<option selected value="' + status[i].value + '">' + status[i].name + '</option>';
                        }else{
                            options += '<option value="' + status[i].value + '">' + status[i].name + '</option>';
                        }
                    }
                }
                $('#ask_leaveType').html(options);
            } else {
                layer.msg(data.message);
            }
        }
    });
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
        // $(ele).append('<p class="file-temp-list"><img style=" margin-left: -5px; height: 32px; width: 32px; margin-right: 5px" src="../../skins/img/file/'+ type +'.png" ><a title="下载附件" href="'+ workOrder.url +'/ctm/contract/files/download?fileId='+ id +'&name='+ name +'">'+ name +'</a><em class="file-remove" data-id="'+ id +'" title="删除">X</em></p>')
        $(ele).append('<p class="file-temp-list"><img style=" margin-left: -5px; height: 32px; width: 32px; margin-right: 5px" src="../../skins/img/file/'+ type +'.png" ><a title="下载附件" onclick="workOrder.downFile(\''+ id + '\', \''+ name + '\')" id="file_'+ id +'" href="javascript:;">'+ name +'</a><em class="file-remove" data-id="'+ id +'" title="删除">X</em></p>')
    };
    for(var i = 0; i < file.length; i++){
        var name = file[i].name;
        var id = file[i].id;
        var postfix = name.split('.')[name.split('.').length-1];
        var type = Utils.getFileType(postfix);
        returnName(type, id, name);
    }
};

/**
 * 上传附件
 */
workOrder.uploadFileList = function (file, ele) {
    var returnName = function (type, name) {
        $(ele).append('<p class="file-temp-list"><img style="height: 32px; width: 32px; margin-right: 5px" src="../../skins/img/file/'+ type +'.png" ><a href="javascript:;">'+ name +'</a><em class="file-remove" data-id="'+ file.id +'" title="删除">X</em></p>');
    };
    var name = file.name;
    var postfix = name.split('.')[name.split('.').length-1];
    var type = Utils.getFileType(postfix);
    returnName(type, name);
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
    if(Utils.getLocationPara('type') != 5){
        $('.approve-box').show();
    }
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

// workOrder.getProduct = function (departmentId) { //获取产品线名称
//     if(!departmentId){
//         return;
//     }
//     var product = departmentId.split('_');
//     var productValue = [];
//     for(var i = 0; i < product.length; i++){
//         $.ajax({
//             url: workOrder.url + '/ctm/setting/param/list',
//             type: 'get',
//             beforeSend: function (request) {
//                 request.setRequestHeader("Content-Type", "application/json;charset=UTF-8;");
//                 request.setRequestHeader("authorization", workOrder.authorization);
//             },
//             async: false,
//             data: {code : 'department', value: product[i]},
//             success: function (data) {
//                 if (data.code == "success") {
//                     productValue.push(data.content[0].name);
//                 } else {
//                     layer.msg(data.message);
//                 }
//             }
//         });
//     }
//     $('#ctr_departmentId').html(productValue.join('、'));
// };

/**
 * 上传审核意见图片
 */
workOrder.fileImage = function () {
    workOrder.picNum = 0;
    var uploader = WebUploader.create({
        server: workOrder.url + '/news/picture/content/upload',
        auto: true,
        pick: {
            id: '#fileImage'
        },
        accept: {
            title: 'Images',
            mimeTypes: 'image/*'
        }
    });
    uploader.on('fileQueued', function(file) {
        workOrder.uploadFileList(file, '#fileList');
    });
    uploader.on('uploadError', function(){
        layer.msg('上传失败，请重试！');
    });
    uploader.on('uploadSuccess', function(file, response ){
        if(response.code == 'success'){
            $('#imgBox').append('<div class="img-box"><em data-id="'+ file.id +'" title="删除" class="del-image"></em><img src="'+ workOrder.url +'/news/picture/content/'+ response.content.picId +'/download" /></div>')
        }
        layer.msg('上传成功！');
        workOrder.picNum = $('.img-box').length;
    });
    uploader.on('uploadComplete', function(){
        layer.closeAll('loading');
    });
    uploader.on('uploadStart', function () {
        layer.load(1, {
            shade: [0.5,'#000']
        });
    });

    uploader.on('beforeFileQueued', function () {
        if(workOrder.picNum > 4){
            $('.error-box').html('<div class="img-error">图片数量已达上限</div>');
            return false;
        }
    });

    $('#memo').on('click', '.del-image', function () {
        var id = $(this).attr('data-id');
        $(this).parents('.img-box').remove();
        uploader.removeFile(id);
        workOrder.picNum = $('.img-box').length;
        if(workOrder.picNum <= 4){
            $('.error-box').empty()
        }
    })
};
//文本框自适应高度
workOrder.autoTextarea = function (elem) {
    $('.order-memo').attr('style', 'height:' + (this.scrollHeight) + 'px;overflow-y:hidden;').on('input', function() {
        this.style.height = 'auto';
        this.style.height = (this.scrollHeight) + 'px';
    });
};

workOrder.setTodo = function (id) {  //获取处理节点按钮
    $.ajax({
        url: workOrder.url + '/sys/process/todo/btn',
        type: 'get',
        beforeSend: function (request) {
            request.setRequestHeader("authorization", workOrder.authorization);
        },
        data: {id: Utils.getLocationPara('processId')},
        success: function (data) {
            if (data.code == "success") {
                var content = data.content;
                if(!content){
                    return;
                }
                $('.order-operate').empty();
                for(var i = 0; i < content.length; i++){
                    if(content[i] == 'contractAgree'){
                        $('.order-operate').append('<button class="btn btn-agree" id="contractAgree" type="button">同意</button>');
                        $('#memo').html('<textarea placeholder="请输入审核意见" class="order-memo" contenteditable="true"></textarea><div class="order-image"><div id="imgBox"></div><div class="error-box"></div></div><div title="上传图片" id="fileImage"></div>');
                    }else if(content[i] == 'contractRebut'){
                        $('.order-operate').append('<button class="btn btn-rebut" id="contractRebut" type="button">驳回</button>');
                    }else if(content[i] == 'contractFile'){
                        // $('.order-operate').append('<a href="../../project/contractFile.html?id='+ id +'&resourceid='+workOrder.getResource()+'" target="_blank" class="btn pull-right btn-agree" id="contractFileBtn" >立即归档</a>');
                    }else if(content[i] == 'contractRestart'){
                        $('.order-operate').css('width', 285).append('<button style="margin-left:20px;" class="btn btn-agree" id="contractRestart" type="button">重新发起审批</button>');
                    }else if(content[i] == 'contractEnd'){
                        $('.order-operate').css('width', 285).append('<button class="btn btn-rebut" id="contractEnd" type="button">结束流程</button>');
                    }else if(content[i] == 'ceoApprove'){
                        $('.order-operate').css('width', 465).append(' <label class="margin-r-10 margin-l-10"> CEO审批：</label><label for="ceoApproveYes" class="margin-r-20"> 是&nbsp;&nbsp;<input name="ceoApprove" id="ceoApproveYes" value="1" type="radio"></label> <label for="ceoApproveNo" class="margin-r-20"> 否&nbsp;&nbsp;<input name="ceoApprove" checked id="ceoApproveNo" value="0"  type="radio"></label>');
                    }
                }
                workOrder.fileImage();
                workOrder.autoTextarea();

            } else {
                layer.msg(data.message);
            }
        }
    });
};

/**
 * 获取合同归档页面资源id
 */
workOrder.getResource = function () {
    var resourcesId = undefined;
    var subContent = Utils.getValue('contractId');
    $.ajax({
        type: "get",
        url: workOrder.url + '/authority/resource/user/resources?resourceId=' + subContent,
        async: false,
        beforeSend: function (xhr) {
            xhr.setRequestHeader("authorization", workOrder.authorization);
        },
        success: function (resources) {
            if(resources.code == 'success'){
                var resourcesContent = resources.content;
                for(var j = 0; j < resourcesContent.length; j++){
                    if(resourcesContent[j].url == "/project/contractFile.html"){  //合同归档页面
                        resourcesId = resourcesContent[j].id;
                    }
                }
            }else{
                layer.msg(data.message);
            }
        }
    });
    return resourcesId;
};
workOrder.doContract = function(type, end, callback){  //处理审批
    var arg = {
        processId: Utils.getLocationPara('processId'),
        handlerId: workOrder.handlerId,
        result: type
    };
    var imgSrc = '';
    if(type == 1){
        arg.flag =  $("input[name='ceoApprove']:checked").val() || 0;
    }

    $('#imgBox img').each(function (a, b) {
        imgSrc += '<img src="'+  $(b).attr('src') +'">';
    });


    var memo = $('.order-memo').val();
    if(!end){
        if(memo.trimAll() == ''){
            layer.msg('请输入处理意见！');
            return;
        }
    }
    // if(memo && memo.length > 250){
    //     layer.msg('不能超过250个字符！');
    //     return;
    // }

    var url = '';

    if(Utils.getLocationPara('type') == 1){  //请假
        url = '/cwa/leave/submit';
    }else if(Utils.getLocationPara('type') == 4){  //合同
        url = '/ctm/contract/exmine';
    }else if(Utils.getLocationPara('type') == 2){  //加班
        url = '/cwa/overtime/submit';
    }else if(Utils.getLocationPara('type') == 3){  //出差
        url = "/cwa/travel/submit"
    }
    arg.opinion = (memo || '') +  '<div class="approve-reason-img">'+ imgSrc + '</div>';
    $.ajax({
        url: workOrder.url + url,
        type: 'post',
        beforeSend: function (request) {
            layer.load(1, {
                shade: [0.5,'#000']
            });
            request.setRequestHeader("authorization", workOrder.authorization);
            request.setRequestHeader("Content-Type", "application/json;charset=UTF-8;");
        },
        data: JSON.stringify(arg),
        success: function (data) {
            layer.closeAll('loading');
            if (data.code == "success") {
                if(callback){
                    callback();
                }else{
                    layer.msg('操作成功！');
                }
                workOrder.getProcessInfo();
                $('.order-operate').remove();
                $('#memo').remove();
                window.location.reload();
                window.opener.location.reload();

            } else {
                layer.msg(data.message);
            }
        }
    });
};

workOrder.getUserInfo= function (callback) {
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
                if(callback){
                    callback(contents)
                }
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
 * 上传合同附件
 */
workOrder.fileUpload = function () {
    var uploader = WebUploader.create({
        server: workOrder.url + '/ctm/contract/files/upload',
        // formData: {
        //     authorization: contract.authorization
        // },
        auto: true,
        pick: '#picker',
        accept:{
            title: 'document',
            extensions: 'xls,xlsx,doc,docx,pdf',
            mimeTypes: 'application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/pdf'
        }
    });

    $('#picker').mouseenter(function(){
        uploader.refresh();
        $($('#picker').find('div')[1]).addClass('file-box');
    });
    uploader.on('fileQueued', function(file) {
        // var tpl = '<a href="javascript:" class="file-temp-list">'+
        //     '<img src="../../skins/img/file.png" alt="">'+
        //     '<span>'+ file.name +'</span>'+
        //     '<em class="file-remove" data-id="'+ file.id +'" title="删除"></em></a>';
        // $('#fileList').append(tpl);
        workOrder.uploadFileList(file, '#fileList');
    });

    uploader.on('uploadError', function(){
        layer.msg('上传失败，请重试！');
        $('#startFile').addClass('restart-file');
    });

    uploader.on('uploadSuccess', function(file, response ){
        layer.msg('上传成功！');
        $('#fileOperate').empty();
        workOrder.upload.push({
            file: response.content,
            name: file.name,
            id: file.id
        });
    });

    uploader.on('uploadComplete', function(){
        layer.close(workOrder.layerIndex);
    });

    uploader.on('fileQueued', function(){  //添加到队列回调
        $('#fileOperate').html('<button type="button" class="btn btn-turquoise" id="startFile">开始上传</button>');
    });

    uploader.on('fileDequeued', function(){ //从队列中移除
        if($('#fileList').is(":empty")){
            $('#fileOperate').empty();
        }
    });
    //
    // $('#fileOperate').on('click', '#startFile', function(){  //执行上传
    //     uploader.upload();
    //     workOrder.layerIndex = layer.load(1, {
    //         shade: [0.5,'#000']
    //     });
    // }).on('click', '.restart-file', function(){  //上传失败发起重试
    //     uploader.retry();
    // });

    uploader.on('uploadStart', function () {
        workOrder.layerIndex = layer.load(1, {
            shade: [0.5,'#000']
        });
    });

    $('#fileList').on('click', '.file-remove', function(){ //从页面上移除文件
        $(this).parents('.file-temp-list').remove();
        var id = $(this).attr('data-id');
        // if(id){
        //     uploader.removeFile(id);
        // }
        var upload = workOrder.upload;
        for(var i = 0; i < upload.length; i++){
            if(upload[i].id == id){
                upload.splice(i,1);
            }
        }
    });
};

/**
 * 合同审批客户列表
 */
workOrder.clientList = function (id) {
    $.ajax({
        url: workOrder.url + '/crm/client/list',
        type: 'get',
        beforeSend: function (request) {
            request.setRequestHeader("Content-Type", "application/json;charset=UTF-8;");
            request.setRequestHeader("authorization", workOrder.authorization);
        },
        data: {
            isMyKeeper:1,
            pageNum: 100
        },
        success: function (data) {
            if (data.code == "success") {
                var options = '<option value="">--请选择--</option>';
                for (var i = 0; i < data.content.length; i++) {
                    if(data.content[i].id == id){
                        options += '<option selected value="' + data.content[i].id + '">' + data.content[i].name + '</option>';
                    }else{
                        options += '<option value="' + data.content[i].id + '">' + data.content[i].name + '</option>';
                    }
                }
                $('#customerNameModal').html(options);
            } else {
                layer.msg(data.message);
            }
        }
    });
};

/**
 * 获取业务员对应所属商机
 */
workOrder.businessList = function (id) {
    $.ajax({
        url: workOrder.url + '/crm/opp/list',
        type: 'get',
        beforeSend: function (request) {
            request.setRequestHeader("Content-Type", "application/json;charset=UTF-8;");
            request.setRequestHeader("authorization", workOrder.authorization);
        },
        data: {
            isMyKeeper:1,
            pageNum: 100
        },
        success: function (data) {
            if (data.code == "success") {
                var options = '<option value="">--请选择--</option>';
                for (var i = 0; i < data.content.length; i++) {
                    if(data.content[i].id == id){
                        options += '<option selected value="' + data.content[i].id + '">' + data.content[i].name + '</option>';
                    }else{
                        options += '<option value="' + data.content[i].id + '">' + data.content[i].name + '</option>';
                    }
                }
                $('#business').html(options);
            } else {
                layer.msg(data.message);
            }
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

/**
 * 获取关联项目
 */
workOrder.getProjectName = function () {
    var cmd = new CommandAjax(workOrder.url + "/pmo/project/list", workOrder.authorization);

    var object = {
        peopleName: $('#modalProjectPerson').val(),
        proMsg: $('#modalProjectNum').val()
    };

    for (var i in object) {
        if (object[i] !== '' && object[i] !== null) {
            cmd[i] = object[i]
        }
    }

    $("#projectList").datagrid({
        columns: [{
            display: "项目编号",
            name: "proCode",
            width: "180px"
        }
            , {
                display: "项目名称",
                name: "proName",
                width: "180px",
                align: "center"
            },{
                display: "项目经理",
                width: "150px",
                name: "managePersonName",
                align: "center"
            },{
                display: "操作",
                width: "80px",
                align: "center",
                render: function (row) {
                    var id = row.id,
                        name = row.proName,
                        rowHtml = '';
                    rowHtml += '<a class="oprate" title="选定" href="javascript:void(0);" onclick="workOrder.chooseProject(\'' + id + '\',\'' + name + '\')">选定</a>';
                    return rowHtml;
                }}],
        reqdata: cmd,
        isShowCheckBox: false,
        rowNumber: false,
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
};
/**
 * 获取关联项目
 */
workOrder.chooseProject = function (id, name) {
    $('#chooseProjectModal').modal('hide');
    $('#projectName').val(name).attr('data-id', id);
    $('#clearProject').show();
};

/**
 * 获取产品线
 */
// workOrder.getProductModal = function (id) {
//     var product = id.split('_');
//     $('#productLineModal').empty();
//     workOrder.getFile('department', function(data){
//         for(var i = 0; i < data.length; i++) {
//             $('#productLineModal').append('<label class="checkbox-inline"><input type="checkbox" name="productStyle" value="'+ data[i].value +'"> '+ data[i].name +'</label>');
//             for(var j = 0; j < product.length; j++){
//                 if(data[i].value == product[j]){
//                     $('#productLineModal label').eq(i).find('input').prop('checked', true);
//                 }
//             }
//         }
//     })
// };

/**
 * 查询假期剩余天数
 */
workOrder.surplusDay = function (type, callback) {
    $.ajax({
        url: workOrder.url + '/cwa/leave/user/holiday',
        type: 'get',
        data:{
            type: type
        },
        beforeSend: function (request) {
            request.setRequestHeader("authorization", workOrder.authorization);
        },
        success: function (data) {
            if (data.code == "success") {
                workOrder.overplusDay = data.content;
                callback(data.content);
            } else {
                layer.msg(data.message);
            }
        }
    });
};

/**
 * 获取片区
 */
workOrder.getMarketCenter = function (id) {
    $.ajax({
        url: workOrder.url + '/pmo/common/markets',
        type: 'get',
        beforeSend: function (request) {
            request.setRequestHeader("authorization", workOrder.authorization);
        },
        success: function (data) {
            if (data.code == "success") {
                var content = data.content;
                var options = '<option value="">--请选择--</option>';
                for (var i = 0; i < content.length; i++) {
                    if(content[i].id == id){
                        options += '<option selected value="' + content[i].id + '">' + content[i].name + '</option>';
                    }else{
                        options += '<option value="' + content[i].id + '">' + content[i].name + '</option>';
                    }

                }
                $('#areaName').html(options)
            } else {
                //显示错误信息
                layer.msg(data.message);
            }
        }
    });
};

/**
 * 重新发起合同审批;查询审批数据
 */
workOrder.reApproveGet = function (type) {
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
                var start = {
                    format: 'YYYY-MM-DD'
                    ,istime: false
                    ,isclear: false
                    ,choose: function(datas){
                        end.min = datas; //开始日选好后，重置结束日的最小日期
                        end.start = datas; //将结束日的初始值设定为开始日
                        workOrder.validateDurationTime($(start.elem));
                    }
                };

                var end = {
                    format: 'YYYY-MM-DD'
                    ,istime: false
                    ,isclear: false
                    ,choose: function(datas){
                        start.max = datas; //结束日选好后，重置开始日的最大日期
                        workOrder.validateDurationTime($(end.elem));
                    }
                };

                $('.lay-date-start').on('click', function(){
                    start.elem = this;
                    laydate(start);
                });
                $('.lay-date-end').on('click', function(){
                    end.elem = this;
                    laydate(end);
                });

                $('.ask-time').on('change', function () {
                    workOrder.validateDurationTime($(this));
                });

                if(type == 4){  //合同
                    $('#fileList').empty();
                    var contract = content.detailsObject;
                    var list = content.list;

                    // workOrder.getMarketCenter(contract.regionId);
                    // workOrder.clientList(contract.customerId);
                    // workOrder.businessList(contract.oppId);
                    // workOrder.getProductModal(contract.departmentId);
                    workOrder.fileUpload();
                    workOrder.contractId = contract.id;

                    workOrder.getContractFileType(contract.ctmAttr);


                    $('#contractName').val(contract.ctmName);
                    $('#partnerName').val(contract.cusName);
                    $('#contractAmount').val(contract.amount);
                    $('#salesmanName').on('click', function(){
                    }).val(Utils.getValue('realname')).attr('data-id', Utils.getValue('u'));


                    workOrder.getUserInfo(function (data) {
                        $('#departmentName').val(data.depName.split('-').reverse().join('-')).attr('data-id', data.depId);
                    });

                    $('#projectName').val(contract.projectName).attr('data-id', contract.projectId);

                    $('#startDate').val(new Date(contract.startTime).toDay());
                    $('#endDate').val(new Date(contract.endTime).toDay());

                    $('#remarks').val(contract.remark);
                    for(var i = 0; i < list.length; i++){
                        var id = list[i].id;
                        var name = list[i].name;
                        workOrder.upload.push({
                            id: id,
                            name: name
                        });
                    }
                    workOrder.showFileList(list,'#fileList' );

                }else if(type == 1){ //请假
                    var askInfo = content.detailsObject;
                    var ask_agentPerson = $('#ask_agentPerson');
                    var ask_starDate = $('#ask_starDate');
                    workOrder.askId= askInfo.id;
                    workOrder.getAffairsType(askInfo.type);
                    ask_agentPerson.val(askInfo.salesmanName);
                    $('#ask_remark').val(askInfo.reason);
                    $('#ask_durationTime').val(askInfo.timeLength);
                    ask_starDate.val(new Date(askInfo.startTime).toDay());
                    $('#ask_endDate').val(new Date(askInfo.endTime).toDay());

                    workOrder.validateDurationTime(ask_starDate);

                    ask_agentPerson.on('click', function () {
                        $('#choosePersonModal').modal('show');
                        workOrder.getDepLeaderList();
                    }).val(askInfo.agentName).attr('data-id', askInfo.agentId)
                    workOrder.chooseLeader = function(id, name){
                        $('#ask_agentPerson').val(name).attr('data-id', id);
                        $('#choosePersonModal').modal('hide');
                    };
                }else if(type == 2){  //加班
                    var overtimeInfo = content.detailsObject;
                    workOrder.overtimeId= overtimeInfo.id;
                    $('#over_remark').val(overtimeInfo.reason);
                    $('#over_durationTime').val(overtimeInfo.timeLength);
                    $('#over_startDate').val(new Date(overtimeInfo.startTime).toDay());
                    $('#over_endDate').val(new Date(overtimeInfo.endTime).toDay());
                    workOrder.validateDurationTime($('#over_startDate'));
                }else if(type == 3){ //出差
                    var awayInfo = content.detailsObject;
                    workOrder.awayId= awayInfo.id;
                    $('#away_remark').val(awayInfo.remark);
                    $('#away_durationTime').val(awayInfo.timeLength);
                    $('#away_startDate').val(new Date(awayInfo.startTime).toDay());
                    $('#away_endDate').val(new Date(awayInfo.endTime).toDay());
                    $('#away_startAddress').val(awayInfo.startAddress);
                    $('#away_endAddress').val(awayInfo.endAddress);
                    if(awayInfo.isNeedplane == 1){
                        $($('.needPlane')[1]).prop('checked', true);
                        $('#planeRemark').val(awayInfo.planeRemark);
                        $('#planeRemarkBox').show();
                    }else{
                        $($('.needPlane')[0]).prop('checked', true);
                    }
                    workOrder.validateDurationTime($('#away_startDate'));
                }
            } else {
                layer.msg(data.message);
            }
        }
    })
};

/**
 * 验证时长
 * @param $this
 */
workOrder.validateDurationTime = function ($this) {
    var modal = $this.parents('.modal');
    var eleId = modal.attr('id');
    var url = "";
    var startDate = modal.find("input[name=startDate]").val() + ' ';
    var endDate =  modal.find("input[name=endDate]").val() + ' ';
    var startTime = modal.find("select[name=startTime]").find('option:selected').text() + ':00';
    var endTime = modal.find("select[name=endTime]").find('option:selected').text() + ':00';

    var START = startDate + startTime;
    var END =  endDate + endTime;

    if(startDate.trimAll() != '' && endDate.trimAll() != ''){
        if(eleId == 'askForLeaveModal'){ //请假
            url = "/cwa/leave/timelong";
        }else if(eleId == 'overtimeModal'){  //加班
            url = "/cwa/overtime/timelong";
        }else if(eleId == 'awayOfficialModal'){  //出差
            url = "/cwa/overtime/timelong";
        }
        workOrder.durationTime(START, END, modal, url);
    }
};

/**
 * 获取合同字段属性
 */
workOrder.getContractFileType = function (value) {
    $.ajax({
        url: workOrder.url + '/ctm/setting/param/list',
        type: 'get',
        data: {code: 'ctm_attr'},
        beforeSend: function (request) {
            request.setRequestHeader("authorization", workOrder.authorization);
        },
        success: function (data) {
            if (data.code == "success") {
                var content = data.content;
                var options = '<option value="">--请选择--</option>';
                for (var i = 0; i < content.length; i++) {
                    if(content[i].value == value){
                        options += '<option selected value="' + content[i].value + '">' + content[i].name + '</option>';
                    }else{
                        options += '<option value="' + content[i].value + '">' + content[i].name + '</option>';
                    }

                }
                $('#contractType').html(options);
            } else {
                //显示错误信息
                layer.msg(data.message);
            }
        }
    })
};

/**
 * 计算请假时长
 */
workOrder.durationTime = function (start, end, modal, url) {
    var startTime = start.toSecTime();
    var endTime = end.toSecTime();
    workOrder.startTime = startTime;
    workOrder.endTime = endTime;

    if(endTime - startTime <= 0 ){
        layer.msg('结束时间不能小于等于开始时间!');
        return;
    }
    layer.load(1, {
        shade: [0.5,'#000']
    });
    $.ajax({
        url: workOrder.url + url,
        type: 'get',
        beforeSend: function (request) {
            request.setRequestHeader("authorization", workOrder.authorization);
        },
        data: {
            starttime: startTime,
            endtime: endTime
        },
        success: function (data) {
            layer.closeAll('loading');
            if (data.code == "success") {
                modal.find('input[name=durationTime]').val(data.content);
                if(modal.attr('id') == 'askForLeaveModal'){
                    var type = $('#leaveType').val();
                    if(type == 4  || type == 5){  //年假
                        if(data.content > workOrder.overplusDay){
                            layer.msg('剩余假期不足');
                        }
                    }
                }
            } else {
                layer.msg(data.message);
            }
        }
    });
};

/**
 *合同审批表单验证
 */
workOrder.validate = function(){
    workOrder.validateMethod = $('#approveForm').validate({
        debug: true,
        rules: {
            salesmanName: "required",
            departmentName: "required",
            contractType: "required",
            contractName: "required",
            partnerName:"required",
            contractAmount:{
                number: true,
                min: 0
            },
            startDate:"required",
            endDate:"required"
        },
        messages:{
            salesmanName: "合同发起人不能为空！",
            departmentName: "合同归属部门不能为空！",
            contractType: "合同类型不能为空！",
            contractName: "合同名称不能为空！",
            partnerName:"合作方名称不能为空！",
            contractAmount: {
                number: '请输入数字!',
                min: '不能为负数！'
            },
            startDate:"开始日期不能为空！",
            endDate:"结束日期不能为空！"
        },
        errorPlacement: function (error, element) {
            if(error.attr('id') == 'productStyle-error'){
                error.appendTo(element.parents('.col-sm-9'));
            }else{
                error.appendTo(element.parent());
            }
        },
        submitHandler: function(){
            if(workOrder.upload.length <= 0){
                layer.msg('合同附件不能为空！');
                return;
            }
            var departmentId = [];
            var uploadList = [];
            for(var j = 0; j < workOrder.upload.length; j++){
                uploadList.push({
                    id: workOrder.upload[j].file?workOrder.upload[j].file.split('.')[0]:workOrder.upload[j].id,
                    name: workOrder.upload[j].name
                })
            }

            $('input:checkbox:checked').each(function(){
                departmentId.push($(this).val());
            });
            var contractData = {
                id: workOrder.contractId ,
                ctmName: $('#contractName').val(),
                cusName: $('#partnerName').val(),
                ctmAttr: $('#contractType').val(),
                amount:  $('#contractAmount').val(),
                projectId: $('#projectName').attr('data-id'),
                startTime: $('#startDate').val().toTime(),
                endTime: $('#endDate').val().toTime(),
                remark: $('#remarks').val(),
                list: uploadList
            };
           layer.load(1, {
                shade: [0.5,'#000']
            });
            $.ajax({
                url: workOrder.url + '/ctm/contract/update',
                type: 'put',
                beforeSend: function (request) {
                    request.setRequestHeader("authorization", workOrder.authorization);
                    request.setRequestHeader("Content-Type", "application/json;charset=UTF-8;");
                },
                data: JSON.stringify(contractData),
                success: function (data) {
                    if (data.code == "success") {
                        layer.closeAll();
                        workOrder.doContract(2, true, function () {
                            $('#startVerifyModal').modal('hide');
                            layer.msg("重新发起审批成功！");
                        });
                    } else {
                        //显示错误信息
                        layer.msg(data.message);
                    }
                }
            });
        }
    });
};

/**
 * 请假申请表单验证
 */
workOrder.askForLeaveValidate = function () {
    $("#askForLeaveForm").validate({
        debug: true,
        errorPlacement: function (error, element) {
            var eleName = $(element).attr("name");
            if (eleName == "reqEmergency") {
                error.appendTo(element.parents(".errorPlacement"));
            } else {
                error.appendTo(element.parent());
            }
        },
        submitHandler: function (a, b) {
            /**
             * 发起请假
             */
            var params = {
                userId: Utils.getValue('u'),
                type: $('#ask_leaveType').val(),
                startTime: workOrder.startTime,
                endTime: workOrder.endTime,
                timeLength: $('#ask_durationTime').val(),
                reason: $('#ask_remark').val(),
                id: workOrder.askId
            };
            var agentId = $('#ask_agentPerson').attr('data-id');
            if(agentId){
                params.agentId = agentId;
            }
            layer.load(1, {
                shade: [0.5,'#000']
            });
            $.ajax({
                url: workOrder.url + '/cwa/leave/update',
                type: 'put',
                data: JSON.stringify(params),
                beforeSend: function (request) {
                    request.setRequestHeader("authorization", workOrder.authorization);
                    request.setRequestHeader("Content-Type", "application/json;charset=UTF-8;");
                },
                success: function (data) {
                    if (data.code == "success") {
                        layer.closeAll();
                        layer.closeAll('loading');
                        workOrder.doContract(2, true, function () {
                            $('#askForLeaveModal').modal('hide');
                            layer.msg("重新发起审批成功！");
                        });
                    } else {
                        //显示错误信息
                        layer.closeAll('loading');
                        layer.msg(data.message);
                    }
                }
            });
        },
        rules: {
            type: {
                required: true
            },
            startDate: {
                required: true
            },
            endDate: {
                required: true
            },
            durationTime: {
                required: true
            },
            remark: {
                required: true,
                maxlength: 250
            }
        },
        messages: {
            type: {
                required: "请选择日请假类型！"
            },
            startDate: {
                required: "请选择开始时间！"
            },
            endDate: {
                required: "请选择结束时间！"
            },
            durationTime: {
                required: "时长不能为空！"
            },
            remark: {
                required: "请假理由不能为空！",
                maxlength: "最多输入250个字符"
            }
        }
    });
};


/**
 * 加班申请表单验证
 */
workOrder.overtimeValidate = function () {
    $("#overtimeForm").validate({
        debug: true,
        errorPlacement: function (error, element) {
            var eleName = $(element).attr("name");
            if (eleName == "reqEmergency") {
                error.appendTo(element.parents(".errorPlacement"));
            } else {
                error.appendTo(element.parent());
            }
        },
        submitHandler: function (a, b) {
            /**
             * 重新发起加班
             */
            var params = {
                userId: Utils.getValue('u'),
                startTime: workOrder.startTime,
                endTime: workOrder.endTime,
                timeLength: $('#over_durationTime').val(),
                reason: $('#over_remark').val(),
                id: workOrder.overtimeId
            };
            layer.load(1, {
                shade: [0.5,'#000']
            });
            $.ajax({
                url: workOrder.url + '/cwa/overtime/update',
                type: 'put',
                data: JSON.stringify(params),
                beforeSend: function (request) {
                    request.setRequestHeader("authorization", workOrder.authorization);
                    request.setRequestHeader("Content-Type", "application/json;charset=UTF-8;");
                },
                success: function (data) {
                    if (data.code == "success") {
                        layer.closeAll();
                        layer.closeAll('loading');
                        workOrder.doContract(2, true, function () {
                            $('#overtimeModal').modal('hide');
                            layer.msg("重新发起审批成功！");
                        });
                    } else {
                        //显示错误信息
                        layer.closeAll('loading');
                        layer.msg(data.messages);
                    }
                }
            });
        },
        rules: {
            startDate: {
                required: true
            },
            endDate: {
                required: true
            },
            durationTime: {
                required: true
            },

            remark: {
                required: true,
                maxlength: 250
            }
        },
        messages: {
            startDate: {
                required: "请选择开始时间！"
            },
            endDate: {
                required: "请选择结束时间！"
            },
            durationTime: {
                required: "时长不能为空！"
            },
            remark: {
                required: "加班说明不能为空！",
                maxlength: "最多输入250个字符"
            }
        }
    });
};


/**
 * 出差申请表单验证
 */
workOrder.awayOfficialValidate = function () {
    var checkedStatus = 0;
    $('input[name=isNeedplane]').on('change', function () {
        var checked = $('input[name=isNeedplane]:checked').val();
        if(checked == 0){
            checkedStatus = 0;
            $('#planeRemarkBox').hide();
        }else{
            $('#planeRemarkBox').show();
            checkedStatus = 1;
        }
    });
    $("#awayOfficialForm").validate({
        debug: true,
        errorPlacement: function (error, element) {
            var eleName = $(element).attr("name");
            if (eleName == "reqEmergency") {
                error.appendTo(element.parents(".errorPlacement"));
            } else {
                error.appendTo(element.parent());
            }
        },
        submitHandler: function () {
            /**
             * 重新发起出差
             */
            var params = {
                userId: Utils.getValue('u'),
                startTime: workOrder.startTime,
                endTime: workOrder.endTime,
                timeLength: $('#away_durationTime').val(),
                remark: $('#away_remark').val(),
                startAddress: $('#away_startAddress').val(),
                endAddress: $('#away_endAddress').val(),
                isNeedplane: $('input[name=isNeedplane]:checked').val(),
                id: workOrder.awayId
            };

            if(checkedStatus == 1){
                params.planeRemark = $('#planeRemark').val()
            }

            layer.load(1, {
                shade: [0.5,'#000']
            });
            $.ajax({
                url: workOrder.url + '/cwa/travel/update',
                type: 'put',
                data: JSON.stringify(params),
                beforeSend: function (request) {
                    request.setRequestHeader("authorization", workOrder.authorization);
                    request.setRequestHeader("Content-Type", "application/json;charset=UTF-8;");
                },
                success: function (data) {
                    if (data.code == "success") {
                        layer.closeAll();
                        layer.closeAll('loading');
                        workOrder.doContract(2, true, function () {
                            $('#awayOfficialModal').modal('hide');
                            layer.msg("重新发起审批成功！");
                        });

                    } else {
                        //显示错误信息
                        layer.closeAll('loading');
                        layer.msg(data.messages);
                    }
                }
            });
        },
        rules: {
            startDate: {
                required: true
            },
            endDate: {
                required: true
            },
            durationTime: {
                required: true
            },
            startAddress: {
                required: true
            },
            endAddress: {
                required: true
            },
            remark: {
                required: true,
                maxlength: 250
            }
        },
        messages: {
            startDate: {
                required: "请选择开始时间！"
            },
            endDate: {
                required: "请选择结束时间！"
            },
            durationTime: {
                required: "时长不能为空！"
            },
            startAddress: {
                required: "出发地点不能为空！"
            },
            endAddress: {
                required: "目的地点不能为空！"
            },
            remark: {
                required: "出差说明不能为空！",
                maxlength: "最多输入250个字符"
            }
        }
    });
};

/**
 * 获取员工列表
 */
workOrder.getDepLeaderList = function () {
    var cmd = new CommandAjax(workOrder.url + "/authority/user/query/list", workOrder.authorization);
    if (!Utils.isNullorEmpty($('#queryKD').val())) {
        cmd.queryInfo = $('#queryKD').val().trimAll();
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
            display: "手机",
            name: "phone",
            width: "120px",
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
                rowHtml += '<a class="oprate" title="选定" href="javascript:void(0);" onclick="workOrder.chooseLeader(\'' + id + '\',\'' + name + '\')">选定</a>';
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
        }
    });
};

workOrder.init = function(){
    this.getUserInfo();
    this.validate();
    this.askForLeaveValidate();
    this.overtimeValidate();
    this.awayOfficialValidate();
    $('#startVerifyModal').on('hidden.bs.modal', function () {
        if(workOrder.validateMethod){
            workOrder.validateMethod.resetForm();
            $('.error').removeClass('error');
        }
    });

    $('.order-detail').css({
        'min-height': $(document).height() - 160
    });

    $('#salesmanNameModal').on('click', function(){
        $('#choosePersonModal').modal('show');
        workOrder.getDepLeaderList();
    }).val(Utils.getValue('realname')).attr('data-id', Utils.getValue('u'));

    workOrder.chooseLeader = function(id, name){
        $('#salesmanNameModal').val(name).attr('data-id', id);
        $('#choosePersonModal').modal('hide');
    };

    $('#btnSearchDepLeader').on('click', function(){
        workOrder.getDepLeaderList();
    });

    $('#projectName').on('click', function () {
        $('#chooseProjectModal').modal('show');
        workOrder.getProjectName();
    });


    // $('#ask_leaveType').on('change', function () {
    //     var $selected = $(this).find('option:selected');
    //     if($selected.val() == 4){ //年假
    //         workOrder.surplusDay(function (data) {
    //             if(data.annualLeave == 0){
    //                 $('#ask_surplusDay').html("<spa n style='color: red'>剩余年休假：0&nbsp;天</span>");
    //                 return;
    //             }
    //             $('#ask_surplusDay').html("剩余年休假："+ data.annualLeave +"&nbsp;天");
    //         });
    //     }else if($selected.val() == 5){ //调休假
    //         workOrder.surplusDay(function (data) {
    //             $('#ask_surplusDay').html("剩余调休假："+ data.takeOff +"&nbsp;天");
    //         });
    //     }else {
    //         $('#ask_surplusDay').text("");
    //     }
    // });

    $('#ask_leaveType').on('change', function () {
        var $selected = $(this).find('option:selected');

        workOrder.surplusDay($(this).val(), function (data) {
            if($selected.val() == 4){ //年假
                if(data == 0){
                    $('#ask_surplusDay').html("<spa n style='color: red'>剩余年休假：0&nbsp;天</span>");
                    return;
                }
                $('#ask_surplusDay').html("剩余年休假："+ data +"&nbsp;天");
            }else if($selected.val() == 5){ //调休假
                if(data == 0){
                    $('#ask_surplusDay').html("<spa n style='color: red'>剩余调休假：0&nbsp;天</span>");
                    return;
                }

                $('#ask_surplusDay').html("剩余调休假："+ data +"&nbsp;天");
            }else {
                $('#ask_surplusDay').text("");
            }
        });
    });

    var start = {
        // min: laydate.now() ,
       max: '2099-06-16 23:59:59'
        ,istoday: false
        ,choose: function(datas){
            end.min = datas; //开始日选好后，重置结束日的最小日期
            end.start = datas; //将结束日的初始值设定为开始日
        }
    };

    var end = {
       max: '2099-06-16 23:59:59'
        ,istoday: false
        ,choose: function(datas){
            start.max = datas; //结束日选好后，重置开始日的最大日期
        }
    };

    $('#startDate').on('click', function(){
        start.elem = this;
        laydate(start);
    });
    $('#endDate').on('click', function(){
        end.elem = this;
        laydate(end);
    });

    $('.order-operate').on('click', '#contractRebut',  function(){
        workOrder.doContract(0); //驳回
    }).on('click', '#contractAgree',  function(){
        workOrder.doContract(1, true);//同意
    }).on('click', '#contractRestart', function () {  //重新发起审批
        if(workOrder.processType == 4){ //合同
            $('#startVerifyModal').modal('show');
        }else if(workOrder.processType == 1){ //请假
            $('#askForLeaveModal').modal('show');
        }else if(workOrder.processType == 2){ //加班
            $('#overtimeModal').modal('show');
        }else if(workOrder.processType == 3){  //出差
            $('#awayOfficialModal').modal('show');
        }
        workOrder.reApproveGet(workOrder.processType);

    }).on('click', '#contractEnd', function () { //结束流程
        workOrder.doContract(3, true);
    });

    $('#clearProject').on('click', function () {
        $('#projectName').val('').attr('data-id', '');
        $('#clearProject').hide();
    });

    // $('#contractAmount').on('blur', function(){   //合同金额千分位转换
    //     var amount = Number($(this).val());
    //     if(!!amount){
    //         $(this).attr('data-value', amount);
    //         $(this).val(amount.addComma());
    //     }
    // });

};

$(function(){
    workOrder.init();
});