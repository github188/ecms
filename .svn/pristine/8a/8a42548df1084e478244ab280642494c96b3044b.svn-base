/**
 * 合同归档
 * @author: xiongxiaojun
 * @time:2017-06-21
 */

var contractFile = {
    authorization: Utils.getValue('authorization'), //获取登录人的userId和Token
    url: appHost + approot,
    id: Utils.getLocationPara('id'),
    upload: [],
    deviceUpload: [],
    commitStatus: undefined
};

/**
 * 获取客户联系人
 */
contractFile.getContacts = function (customerId, crmConId) {
    $.ajax({
        url: contractFile.url + '/crm/client/contacts/list',
        type: 'get',
        data: {clientId: customerId},
        beforeSend: function (request) {
            request.setRequestHeader("authorization", contractFile.authorization);
        },
        success: function (data) {
            if (data.code == "success") {
                var content = data.content;
                var options = '<option value="">--请选择--</option>';
                for (var i = 0; i < content.length; i++) {
                    if(content[i].id == crmConId){
                        options += '<option data-phone="'+ content[i].phone +'" selected value="' + content[i].id + '">' + content[i].name + '</option>';
                    }else{
                        options += '<option  data-phone="'+ content[i].phone +'" value="' + content[i].id + '">' + content[i].name + '</option>';
                    }
                }
                $('#contacts').html(options).on('change', function(){
                    var _select = $(this).find("option:selected");
                    $('#contactsPhone').val(_select.attr('data-phone'));
                })
                $('#contactsPhone').val($('#contacts').find("option:selected").attr('data-phone'));
            } else {
                //显示错误信息
                layer.msg(data.message);
            }
        }
    })
};

/**
 * 获取字段属性
 */
contractFile.getField = function (type, ele, id) {
    $.ajax({
        url: contractFile.url + '/ctm/setting/param/list',
        type: 'get',
        data: {code: type},
        beforeSend: function (request) {
            request.setRequestHeader("authorization", contractFile.authorization);
        },
        success: function (data) {
            if (data.code == "success") {
                var content = data.content;
                var options = '<option value="">--请选择--</option>';
                for (var i = 0; i < content.length; i++) {
                    if(content[i].value == id){
                        options += '<option selected value="' + content[i].value + '">' + content[i].name + '</option>';
                    }else{
                        options += '<option value="' + content[i].value + '">' + content[i].name + '</option>';
                    }
                }
                $('#'+ ele).html(options)
            } else {
                //显示错误信息
                layer.msg(data.message);
            }
        }
    })
};

/**
 * 获取合同式份字段
 */
contractFile.getContractFile = function (id) {
  this.getField('ctm_attr', 'contractAttr', id);
};

/**
 * 获取合同式份字段
 */
contractFile.getStyleFile = function (id) {
    this.getField('ctm_style', 'contractStyle', id);
};


/**
 * 上传合同附件
 */
contractFile.fileUpload = function () {
    var uploader = WebUploader.create({
        server: contractFile.url + '/ctm/contract/pic/upload',
        pick: '#picker',
        auto: true,
        accept:{
            title: 'document',
            extensions: 'xls,xlsx,doc,docx,jpg,jpeg,png',
            mimeTypes: 'image/*,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        }
    });

    uploader.on('fileQueued', function(file) {
        contractFile.uploadFileList(file, '#fileList');
    });

    uploader.on('uploadError', function(){
        layer.msg('上传失败，请重试！');
        $('#startFile').addClass('restart-file');
    });

    uploader.on('uploadSuccess', function(file, response ){
        layer.msg('上传成功！');
        $('#fileOperate').empty();
        contractFile.upload.push({
            file: response.content,
            name: file.name,
            id: file.id
        });
    });

    uploader.on('uploadComplete', function(){
        layer.close(contractFile.layerIndex);
    });
    uploader.on('fileDequeued', function(){ //从队列中移除
        if($('#fileList').is(":empty")){
            $('#fileOperate').empty();
        }
    });

    uploader.on('uploadStart', function () {
        contractFile.layerIndex = layer.load(1, {
            shade: [0.5,'#000']
        });
    });

    $('#fileList').on('click', '.file-remove', function(){ //从页面上移除文件
        $(this).parents('.file-temp-list').remove();
        var id = $(this).attr('data-id');
        var upload = contractFile.upload;
        for(var i = 0; i < upload.length; i++){
            if(upload[i].id == id){
                upload.splice(i,1);
            }
        }
    });
};

/**
 * 获取合同信息
 */
contractFile.getDetail = function () {
    $.ajax({
        url: contractFile.url + '/ctm/contract/details',
        type: 'get',
        beforeSend: function (request) {
            request.setRequestHeader("authorization", contractFile.authorization);
        },
        data: {
            contractId : contractFile.id
        },
        success: function (data) {
            if (data.code == "success") {
                var content = data.content;
                var file = content.files;
                $('#customName').val(content.customerName);
                $('#belong').val(content.oppName);
                $('#salesName').val(content.salesmanName);
                $('#salesPhone').val(content.salesmanTel);
                $('#contractArea').val(content.regionName);
                $('#contactsPhone').val(content.crmConTel);
                $('#customAddress').val(content.crmAdress);
                $('#contacts').val(content.crmConName);
                $('#contractNumber').val(content.contractCode);
                $('#contractName').val(content.contractName);
                $('#remarks').val(content.contractAbstract);
                $('#contractDate').val(!content.contractDate?'': new Date(content.contractDate).toDay());
                contractFile.getContractFile(content.contractAttr);
                contractFile.getStyleFile(content.contractType);
                contractFile.getContacts(content.customerId, content.crmConId);
                for(var i = 0; i < file.length; i++){
                    var id = file[i].id;
                    var name = file[i].name;
                    contractFile.upload.push({
                        id: id,
                        name: name
                    });
                }
                contractFile.commitStatus = content.exstatus;
                if(content.exstatus == '3'){
                    $('#contractSubmit').text('保存')
                }else{
                    $('#contractSubmit').text('保存并提交')
                }
                contractFile.showFileList(file, '#fileList');
            }
        }
    });
};

/**
 * 展示附件
 */
contractFile.showFileList = function (file, ele) {
    var returnName = function (type, id, name) {
        $(ele).append('<p class="file-temp-list"><img style="height: 32px; width: 32px; margin-right: 10px" src="../skins/img/file/'+ type +'.png" ><a title="下载附件" href="'+ contractFile.url +'/ctm/contract/project/download?fileId='+ id +'&name='+ name +'">'+ name +'</a><em class="file-remove" data-id="'+ id +'" title="删除">X</em></p>')
    };
    for(var i = 0; i < file.length; i++){
        var name = file[i].name;
        var id = file[i].id;
        var postfix = name.split('.')[1];
        var type = Utils.getFileType(postfix);
        returnName(type, id, name);
    }
    layer.closeAll('loading');
};
/**
 * 上传附件
 */
contractFile.uploadFileList = function (file, ele) {
    var returnName = function (type, name) {
        $(ele).append('<p class="file-temp-list"><img style="height: 32px; width: 32px; margin-right: 10px" src="../skins/img/file/'+ type +'.png" ><a href="javascript:;">'+ name +'</a><em class="file-remove" data-id="'+ file.id +'" title="删除">X</em></p>');
    };
    var name = file.name;
    var postfix = name.split('.')[1];
    var type = Utils.getFileType(postfix);
    returnName(type, name);
};

/**
 * 保存合同信息
 */
contractFile.saveContractInfo = function () {
    if(contractFile.upload.length == 0){
        layer.msg('附件不能为空！');
        return;
    }
    var uploadList = [];
    for(var j = 0; j < contractFile.upload.length; j++){
        if(contractFile.upload[j].file){
            uploadList.push({
                id: (contractFile.upload[j].file).split('.')[0],
                name: contractFile.upload[j].name
            })
        }else{
            uploadList = contractFile.upload;
        }
    }
    layer.load(1, {
        shade: [0.5,'#000']
    });
    $.ajax({
        url: contractFile.url + '/ctm/contract/save/info',
        type: 'POST',
        beforeSend: function (request) {
            request.setRequestHeader("authorization", contractFile.authorization);
            request.setRequestHeader("Content-Type", "application/json;charset=UTF-8;");
        },
        data: JSON.stringify({
            contractCode: $('#contractNumber').val(),
            contractDate : $('#contractDate').val().toTime(),
            contractAttr: $('#contractAttr').val(),
            examineId: Utils.getLocationPara('id'),
            contractType: $('#contractStyle').val(),
            contractAbstract: $('#remarks').val(),
            crmConName:  $("#contacts").find("option:selected").text(),
            crmConId:  $('#contacts').val(),
            crmConTel: $('#contactsPhone').val(),
            files: uploadList
        }),
        success: function (data) {
            if (data.code == "success") {
                $('#businessLink').attr('data-toggle', "tab").removeAttr('disabled').tab('show');
                contractFile.getSignModal();  // 获取签约模式
                contractFile.getBusinessInfo();//获取商务信息数据
            } else {
                layer.msg(data.message);
            }
        }
    });
};

/**
 * 获取商务信息
 */
contractFile.getBusinessInfo = function () {
    $.ajax({
        url: contractFile.url + '/ctm/contract/detail/bus',
        type: 'get',
        beforeSend: function (request) {
            request.setRequestHeader("authorization", contractFile.authorization);
        },
        data: {
            exId: Utils.getLocationPara('id')
        },
        success: function (data) {
            if (data.code == "success" && data.content) {
                var content = data.content;
                contractFile.getSignModal(content.signModal);
                $('#contractAmount').val(content.ctmBalance);
                $('#carAmount').val(content.laneBalance);
                $('#adAmount').val(content.advBalance);
                $('#period').val(content.recCycle);
                $('#startStopTime').val(new Date(content.startTime).toDay() + ' 至 ' + new Date(content.endTime).toDay()).daterangepicker({
                    startDate: new Date(content.startTime).toDay(),
                    endDate: new Date(content.endTime).toDay(),
                    applyClass : 'btn-sm btn-success',
                    cancelClass : 'btn-sm btn-default',
                    locale: {
                        applyLabel: '确认',
                        cancelLabel: '取消',
                        fromLabel : '起始时间',
                        toLabel : '结束时间'
                    },
                    opens : 'left',
                    separator : ' 至 ',
                    showWeekNumbers : true,
                    //maxDate : moment(),
                    format: 'YYYY-MM-DD'
                }).attr('title',  $('#startStopTime').val())
                $('#payStyle').val(content.payWay);
                $('#deadline').val(content.ctmTerm);
                layer.closeAll('loading');
            }
        }
    });
};
/**
 * 保存商务信息
 */
contractFile.saveBusinessInfo = function (data) {
    $('#projectLink').attr('data-toggle', 'tab').removeAttr('disabled').tab('show');
    contractFile.getProjectInfo();
    layer.load(1, {
        shade: [0.5,'#000']
    });
    $.ajax({
        url: contractFile.url + '/ctm/contract/save/bus',
        type: 'POST',
        beforeSend: function (request) {
            request.setRequestHeader("authorization", contractFile.authorization);
            request.setRequestHeader("Content-Type", "application/json;charset=UTF-8;");
        },
        data: JSON.stringify({
            examineId: Utils.getLocationPara('id'),
            signModal : data.signStyle,
            ctmBalance: data.contractAmount,
            advBalance: data.adAmount,
            recCycle: data.period,
            laneBalance: data.carAmount,
            startTime: $('#startTime').val().toTime(),
            endTime: $('#endTime').val().toTime(),
            ctmTerm: data.deadline,
            payWay: data.payStyle
        }),
        success: function (data) {
            if (data.code == "success") {
                contractFile.getProjectInfo();
            } else {
                layer.msg(data.message);
            }
        }
    });
};
/**
 * 获取工程信息
 */
contractFile.getProjectInfo = function () {

    $.ajax({
        url: contractFile.url + '/ctm/contract/detail/pro',
        type: 'get',
        beforeSend: function (request) {
            request.setRequestHeader("authorization", contractFile.authorization);
        },
        data: {
            exId: Utils.getLocationPara('id')
        },
        success: function (data) {
            layer.closeAll('loading');
            if (data.code == "success" && data.content) {
                var content = data.content;
                var file = content.files;
                $('#carRoads').val(content.lineNum);
                $('#berth').val(content.parkNum);
                $('#verifyTime').val(new Date(content.checkTime).toDay());
                $('#verifyPerson').val(content.checkUser);
                $('#verifyResult').val(content.checkResult);
                $('#otherDemand').val(content.specialNeeds);
                $('#deviceList').empty();
                for(var i = 0; i < file.length; i++){
                    var id = file[i].id;
                    var name = file[i].name;
                    contractFile.deviceUpload.push({
                        id: id,
                        name: name
                    });
                }
                contractFile.showFileList(file, '#deviceList');
            }
        }
    });
};
/**
 * 保存工程信息
 */
contractFile.saveProjectInfo = function (data) {
    if(contractFile.deviceUpload.length == 0){
        layer.msg('附件不能为空！');
        return;
    }
    layer.load(1, {
        shade: [0.5,'#000']
    });

    var uploadList = [];
    for(var j = 0; j < contractFile.deviceUpload.length; j++){
        if(contractFile.deviceUpload[j].file){
            uploadList.push({
                id: (contractFile.deviceUpload[j].file).split('.')[0],
                name: contractFile.deviceUpload[j].name
            })
        }else{
            uploadList = contractFile.deviceUpload;
        }
    }

    $.ajax({
        url: contractFile.url + '/ctm/contract/save/pro',
        type: 'POST',
        beforeSend: function (request) {
            request.setRequestHeader("authorization", contractFile.authorization);
            request.setRequestHeader("Content-Type", "application/json;charset=UTF-8;");
        },
        data: JSON.stringify({
            examineId: Utils.getLocationPara('id'),
            lineNum : data.carRoads,
            parkNum: data.berth,
            specialNeeds: $('#otherDemand').val(),
            checkTime: data.verifyTime.toTime(),
            checkUser: data.verifyPerson,
            checkResult: data.verifyResult,
            files: uploadList
        }),
        success: function (data) {
            layer.closeAll('loading');
            if (data.code == "success") {
                if(contractFile.commitStatus !== '3'){
                    $.ajax({ //提交所有信息
                        url: contractFile.url + '/ctm/contract/add',
                        type: 'post',
                        beforeSend: function (request) {
                            request.setRequestHeader("Content-Type", "application/json;charset=UTF-8;");
                            request.setRequestHeader("authorization", contractFile.authorization);
                        },
                        data: JSON.stringify({
                            examineId: Utils.getLocationPara('id')
                        }),
                        success: function (data) {
                            if (data.code == "success") {
                                layer.msg('保存并提交成功！', '', function () {
                                    window.location.href = 'contractFileDetail.html?id='+ Utils.getLocationPara('id') + '&resourceid=' + Utils.getValue('contractId');
                                });

                            } else {
                                layer.msg(data.message);
                            }
                        }
                    });
                }else{
                    layer.msg('保存成功！', '', function () {
                        window.location.href = 'contractFileDetail.html?id='+ Utils.getLocationPara('id') + '&resourceid=' + Utils.getValue('contractId');
                    });
                }
            } else {
                layer.msg(data.message);
            }
        }
    });
};
/**
 * 上传设备清单附件
 */
contractFile.fileUploadDevice = function () {
    var uploader = WebUploader.create({
        server: contractFile.url + '/ctm/contract/project/upload',
        pick: '#uploadDevice',
        auto: true,
        accept:{
            title: 'document',
            extensions: 'xls,xlsx,doc,docx,jpg,jpeg,png',
            mimeTypes: 'image/*,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        }
    });

    uploader.on('fileQueued', function(file) {
        contractFile.uploadFileList(file, '#deviceList');
    });

    uploader.on('uploadError', function(){
        layer.msg('上传失败，请重试！');
    });

    uploader.on('uploadSuccess', function(file, response ){
        layer.msg('上传成功！');
        $('#deviceOperate').empty();
        contractFile.deviceUpload.push({
            file: response.content,
            name: file.name,
            id: file.id
        });
    });

    uploader.on('uploadComplete', function(){
        layer.close(contractFile.layerIndex);
    });

    uploader.on('fileQueued', function(){  //添加到队列回调
        $('#deviceOperate').html('<button type="button" class="btn btn-empty" id="startFile">开始上传</button>');
    });

    uploader.on('fileDequeued', function(){ //从队列中移除
        if($('#deviceList').is(":empty")){
            $('#deviceOperate').empty();
        }
    });

    uploader.on('uploadStart', function () {
        contractFile.layerIndex = layer.load(1, {
            shade: [0.5,'#000']
        });
    });

    $('#deviceList').on('click', '.file-remove', function(){ //从页面上移除文件
        $(this).parents('.file-temp-list').remove();
        var id = $(this).attr('data-id');
        // uploader.removeFile(id);
        var upload = contractFile.deviceUpload;
        for(var i = 0; i < upload.length; i++){
            if(upload[i].id == id){
                upload.splice(i,1);
            }
        }

    });
};

/**
 * 获取签约模式
 */
contractFile.getSignModal = function (id) {
    $.ajax({
        url: contractFile.url + '/ctm/setting/param/list',
        type: 'get',
        beforeSend: function (request) {
            request.setRequestHeader("Content-Type", "application/json;charset=UTF-8;");
            request.setRequestHeader("authorization", contractFile.authorization);
        },
        data: {
            code : 'sign_modal'
        },
        success: function (data) {
            if (data.code == "success") {
                var content = data.content;
                var options = '<option value="">--请选择--</option>';
                for (var i = 0; i < content.length; i++) {
                    if(content[i].value == id){
                        options += '<option selected value="' + content[i].value + '">' + content[i].name + '</option>';
                    }else{
                        options += '<option value="' + content[i].value + '">' + content[i].name + '</option>';
                    }
                }
                $('#signStyle').html(options)
            } else {
                layer.msg(data.message);
            }
        }
    });
};

/**
 * 合同审批来联系人列表
 */
contractFile.clientList = function () {
    $.ajax({
        url: contractFile.url + '/crm/client/list',
        type: 'get',
        beforeSend: function (request) {
            request.setRequestHeader("Content-Type", "application/json;charset=UTF-8;");
            request.setRequestHeader("authorization", contractFile.authorization);
        },
        data: {
            isMyKeeper:1,
            pageNum: 100
        },
        success: function (data) {
            if (data.code == "success") {
                var options = '<option value="">--请选择--</option>';
                for (var i = 0; i < data.content.length; i++) {
                    options += '<option value="' + data.content[i].id + '">' + data.content[i].contactsName + '</option>';
                }
                $('#customerName').html(options);
            } else {
                layer.msg(data.message);
            }
        }
    });
};

contractFile.validate = function(){
	$('#contractForm').validate({
        debug: true,
        rules: {
            contractNumber: "required",
            contractName: "required",
            contractDate: "required",
            contractAttr: "required",
            contractStyle: "required",
            contractArea: "required",
            contractDo: "required",
            salesName: "required",
            salesPhone: "required",
            belong: "required",
            remarks: "required",
            customName: "required",
            customAddress: "required",
            contacts: "required",
            contactsPhone: "required"
		},
        messages:{
            contractNumber: "合同编号不能为空！",
            contractName: "合同名称不能为空！",
            contractDate: "合同日期不能为空！",
            contractAttr: "合同属性不能为空！",
            contractStyle: "式份不能为空！",
            contractArea: "片区不能为空！",
            contractDo: "办事处不能为空！",
            salesName: "业务员不能为空！",
            salesPhone: "业务员电话不能为空！",
            belong: "合同所属商机不能为空！",
            remarks: "合同摘要不能为空！",
            customName: "客户名称不能为空！",
            customAddress: "合作方地址不能为空！",
            contacts: "联系人不能为空！",
            contactsPhone: "联系人电话不能为空！"
		},
        submitHandler: function(e, b){
            var button = $(e).find('button[type=submit]')
            contractFile.saveContractInfo(button);
        }
	});


	$('#businessForm').validate({
		debug: true,
        rules: {
            signStyle: "required",
            contractAmount: {
                required: true,
                number: true
            },
            carAmount: {
                required: true,
                number: true
            },
            adAmount: {
                required: true,
                number: true
            },
            period: {
                required: true,
                number: true
            },
            startStopTime: "required",
            deadline: "required",
            payStyle: "required"
		},
        messages: {
            signStyle: "请选择签约模式！",
            contractAmount: {
                required: "合同金额不能为空！",
                number: "金额只能为数字！"
            },
            carAmount: {
                required: "单车道金额不能为空！",
                number: "金额只能为数字！"
            },
            adAmount:  {
                required: "广告金额不能为空！",
                number: "金额只能为数字！"
            },
            period: {
                required: "对账周期不能为空！",
                number: "周期只能为数字！"
            },
            startStopTime: "合同起止时间不能为空！",
            deadline: "合同年限不能为空！",
            payStyle: "付款方式不能为空！"
		},submitHandler: function(a, b,c,d ){
            contractFile.saveBusinessInfo(b);
        }
	});

	$('#projectForm').validate({
		debug: true,
		rules: {
            carRoads: "required",
            berth: "required",
            verifyTime: "required",
            verifyPerson: "required",
            verifyResult: "required"
		},
        messages: {
            carRoads: "车道数不能为空！",
            berth: "泊位数不能为空！",
            verifyTime: "验收时间不能为空！",
            verifyPerson: "验收人不能为空！",
            verifyResult: "验收结果不能为空！"
		},submitHandler: function(a, b,c,d ){
            contractFile.saveProjectInfo(b);
        }
	});
};
/**
 * 获取当前登录人能看到的按钮
 */
contractFile.getMenuButton = function () {
    layer.load(1, {
        shade: [0.5,'#000']
    });
    var resourceId = Utils.getLocationPara('resourceid');
    if(!resourceId){
        $('#contractFileButton').append('<button class="z-hide btn btn-turquoise" id="contractSubmit">提交归档</button>');
        return;
    }
    $.ajax({
        url: contractFile.url + '/authority/resource/user/resources?resourceId=' + resourceId,
        type: 'get',
        beforeSend: function (request) {
            request.setRequestHeader("authorization", contractFile.authorization);
        },
        success: function (data) {
           if(data.code ==  "401" ||  data.content.length == 0){
               $('body').empty();
               layer.confirm('没有权限访问！', {
                   btn: ['确定'],
                   closeBtn: 0
               }, function () {
                   window.open("about:blank","_self").close()
               });
           }else{
               contractFile.getDetail();
           }
        }
    });
};
contractFile.init = function () {
    this.validate();
    this.getMenuButton();
    this.fileUpload();
    this.fileUploadDevice();

    laydate({
        elem: '#contractDate',
        format: 'YYYY-MM-DD'
    });

    laydate({
        elem: '#verifyTime',
        format: 'YYYY-MM-DD'
    });

   $('#startStopTime').daterangepicker({  //日期范围选择
        applyClass : 'btn-sm btn-success',
        cancelClass : 'btn-sm btn-default',
        locale: {
            applyLabel: '确认',
            cancelLabel: '取消',
            fromLabel : '起始时间',
            toLabel : '结束时间'
        },
        startDate: new Date().toDay(),
        endDate: new Date().toDay(),
        opens : 'left',
        separator : ' 至 ',
        showWeekNumbers : true,
        //maxDate : moment(),
        format: 'YYYY-MM-DD'
    }, function(start, end, label) { // 格式化日期显示框
        var startTime = start.format('YYYY-MM-DD');
        var endTime = end.format('YYYY-MM-DD');
        $('#startTime').val(startTime);
        $('#endTime').val(endTime);
        $('#deadline').val(endTime.diffTime(startTime));
    }).attr('title',  $('#startStopTime').val())

   $('.addComma').on('blur', function(){
        var amount = Number($(this).val());
        if(!!amount){
            $(this).val(amount.addComma());
        }
   });

    // var hash = window.location.hash;
    // $('.side-panel li a').each( function (a, b) {
    //     var id = $(b).attr('href');
    //     if(id == hash){
    //         $(b).tab('show');
    //     }
    //    if(id == "#businessTab"){  //商务信息
    //         contractFile.getBusinessInfo();
    //         contractFile.getSignModal();
    //     }else if(id == "#projectTab"){ //工程信息
    //         contractFile.getProjectInfo();
    //     }
    // });
    // $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
    //     var id = $(e.target).attr('href').split('#')[1];
    //     if(id == "contractTab"){
    //         window.location.hash = '#contractTab';
    //     }else if(id == "businessTab"){  //商务信息
    //         window.location.hash = '#businessTab';
    //         contractFile.getBusinessInfo();
    //         contractFile.getSignModal();
    //     }else if(id == "projectTab"){ //工程信息
    //         window.location.hash =  '#projectTab';
    //         contractFile.getProjectInfo();
    //     }
    // });
};

$(function(){
    contractFile.init();
});