/**
 * 合同归档详情-编辑
 * @author: xiongxiaojun
 * @time:2017-06-21
 */

var contractFile = {
    url: appHost + approot,
    authorization:  Utils.getValue('authorization'), //获取登录人的userId和Token
    shutId: undefined
};

/**
 * 获取合同归档详情
 */
contractFile.getDetail = function(){
    $.ajax({
        url: contractFile.url + '/ctm/contract/details',
        type: 'get',
        data: {
            contractId: Utils.getLocationPara('id')
        },
        beforeSend: function (request) {
            request.setRequestHeader("authorization", contractFile.authorization);
        },
        success: function (data) {
            if (data.code == "success") {
                var content = data.content;
                $('#contractCode').text(content.contractCode);
                $('#contractName').text(content.contractName);
                $('#contractDate').text(new Date(content.contractDate).toDay());
                $('#regionName').text(content.regionName);
                $('#salesmanName').text(content.salesmanName);
                $('#salesmanTel').text(content.salesmanTel);
                $('#oppName').text(content.oppName);
                $('#customerName').text(content.customerName);
                $('#crmAdress').text(content.crmAdress);
                $('#crmConName').text(content.crmConName);
                $('#crmConTel').text(content.crmConTel);
                contractFile.shutId = content.id;
                var file = content.files;
                contractFile.getFiled('ctm_style', 'contractType', content.contractType);  //合同式份
                contractFile.getFiled('ctm_attr', 'contractAttr', content.contractAttr);  //合同属性
                contractFile.showFileList(file, '#fileList');
                if(content.contractStatus != 3){
                    $('#shutDown').show();
                }
            } else {
                layer.msg(data.message);
            }
        }
    })
};
/**
 * 获取商务信息
 */
contractFile.getBusinessInfo = function () {
    layer.load(1, {
        shade: [0.5,'#000']
    });
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
            layer.closeAll('loading');
            if (data.code == "success" && data.content) {
                var content = data.content;
                contractFile.getSignModal(content.signModal);
                $('#contractAmount').text(content.ctmBalance);
                $('#carAmount').text(content.laneBalance);
                $('#adAmount').text(content.advBalance);
                $('#period').text(content.recCycle);
                $('#startStopTime').text(new Date(content.startTime).toDay() + ' 至 ' + new Date(content.endTime).toDay());
                $('#payStyle').text(content.payWay);
                $('#deadline').text(content.ctmTerm);

            } else {
                layer.msg("暂无数据！");
            }
        }
    });
};

/**
 * 获取工程信息
 */
contractFile.getProjectInfo = function () {
    layer.load(1, {
        shade: [0.5,'#000']
    });
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
                $('#carRoads').text(content.lineNum);
                $('#berth').text(content.parkNum);
                $('#otherDemand').text(content.specialNeeds);
                $('#verifyTime').text(new Date(content.checkTime).toDay());
                $('#verifyPerson').text(content.checkUser);
                $('#verifyResult').text(content.checkResult);
                $('#deviceList').empty();
                contractFile.showFileList(file, '#deviceList');
            }else{
                layer.msg("暂无数据！");
            }
        }
    });
};
/**
 * 展示附件
 */
contractFile.showFileList = function (file, ele) {
    var returnName = function (type, id, name) {
        $(ele).append('<p><img style="height:32px; width:32px; margin-right:10px; margin-left: -5px;" src="../skins/img/file/'+ type +'.png" ><a title="下载附件" href="'+ contractFile.url +'/ctm/contract/project/download?fileId='+ id +'&name='+ name +'">'+ name +'</a></p>')
    };
    for(var i = 0; i < file.length; i++){
        var name = file[i].name;
        var id = file[i].id;
        var postfix = name.split('.')[1];
        var type = Utils.getFileType(postfix);
        returnName(type, id, name);
    }
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
                for (var i = 0; i < content.length; i++) {
                    if(content[i].value == id){
                        $('#signStyle').text(content[i].name);
                    }
                }
            } else {
                layer.msg(data.message);
            }
        }
    });
};
/**
 * 获取字段属性
 */
contractFile.getFiled = function (type, ele, value) {
    $.ajax({
        url: contractFile.url + '/ctm/setting/param/list',
        type: 'get',
        data: {code: type},
        beforeSend: function (request) {
            request.setRequestHeader("authorization", contractFile.authorization);
        },
        success: function (data) {
            if (data.code == "success") {
                $('#'+ ele).text(data.content[0].name)
            } else {
                //显示错误信息
                layer.msg(data.message);
            }
        }
    })
};
/**
 * 中止合同
 */
contractFile.shutDown = function () {
    layer.confirm('确定要终止合同吗？', {
        btn: ['确定', '取消']
    }, function (index) {
        $.ajax({
            url: contractFile.url + '/ctm/contract/shutdown',
            type: 'PUT',
            data: JSON.stringify({
                contractStatus: 3,
                id: contractFile.shutId
            }),
            beforeSend: function (request) {
                request.setRequestHeader("authorization", contractFile.authorization);
                request.setRequestHeader("Content-Type", "application/json;charset=UTF-8;");
            },
            success: function (data) {
                if (data.code == "success") {
                    if(data.code == 'success'){
                        $('#shutDown').remove();
                        layer.msg('操作成功！', '', function () {
                            window.location.reload();
                        });
                    }
                } else {
                    //显示错误信息
                    layer.msg(data.message);
                }
            }
        })
    }, function (index) {
        layer.close(index);
    });
};
/**
 * 获取当前登录人能看到的按钮
 */
contractFile.getMenuButton = function () {
    var resourceId = Utils.getLocationPara('resourceid');
    var flag = false;
    var menuContent = undefined;
    $.ajax({
        url: contractFile.url + '/authority/resource/user/resources?resourceId=' + resourceId,
        type: 'get',
        async: false,
        beforeSend: function (request) {
            request.setRequestHeader("authorization", contractFile.authorization);
        },
        success: function (data) {
            if (data.code == "success") {
                var content = data.content;
                if(data.code == '401' ||  content.length == 0){
                    $('body').empty();
                    layer.confirm('没有权限访问！', {
                        btn: ['确定'],
                        closeBtn: 0
                    }, function () {
                        window.open("about:blank","_self").close()
                    });
                    return;
                }
                for (var i = 0; i < content.length; i++) {
                    if(content[i].url == '/project/contractFileDetail.html'){
                        flag = true;
                        menuContent = content[i];
                    }
                }

                if(!flag){  //没有权限
                    $('body').empty();
                    layer.confirm('没有权限访问！', {
                        btn: ['确定'],
                        closeBtn: 0
                    }, function () {
                        window.open("about:blank","_self").close()
                    });
                }else{
                    contractFile.getDetail();
                    $.ajax({
                        url: contractFile.url + '/authority/resource/user/resources?resourceId=' + menuContent.id,
                        type: 'get',
                        beforeSend: function (request) {
                            request.setRequestHeader("authorization", contractFile.authorization);
                        },
                        success: function (operate) {
                            if (operate.code == "success") {
                                var options = '';
                                var operateContent = operate.content;
                                for (var j = 0; j < operateContent.length; j++) {
                                    var theData = operateContent[j];
                                    if(theData.url == "editContract"){
                                        options+= '<a href="./contractFile.html?id='+ Utils.getLocationPara('id') +'&resourceid='+ Utils.getLocationPara('resourceid') +'" target="_blank" class="btn  btn-empty handle-btn btn-edit" id="'+ theData.url +'">'+ theData.name +'</a>'
                                    }else if(theData.url == "shutDown"){
                                        options+= '<button class="z-hide btn pull-right btn-orange margin-r-20" id="'+  theData.url +'">'+ theData.name + '</button>'
                                    }
                                }
                                $('#contractFileButton').append(options);
                                // $('#editContract').attr('href', './contractFile.html?id='+Utils.getLocationPara('id'));

                            } else {
                                //显示错误信息
                                layer.msg(data.message);
                            }
                        }
                    });
                }
                // $('#contractFileButton').append(options);
            } else {
                //显示错误信息
                $('body').empty();
                layer.confirm('身份验证失败！', {
                    btn: ['确定'],
                    closeBtn: 0
                }, function () {
                    window.open("about:blank","_self").close()
                });
            }
        }
    });
};
contractFile.init = function () {
    var hash = window.location.hash;
    $('.side-panel li a').each( function (a, b) {
        var id = $(b).attr('href');
        if(id == hash){
            $(b).tab('show');
        }
    });
    this.getMenuButton();
    $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
        var id = $(e.target).attr('href').split('#')[1];
        if(id == "contractTab"){
            window.location.hash = '#contractTab';
        }
        if(id == "businessTab"){  //商务信息
            window.location.hash = '#businessTab';
            contractFile.getBusinessInfo();
        }else if(id == "projectTab"){ //工程信息
            window.location.hash =  '#projectTab';
            contractFile.getProjectInfo();
        }
    });
    $('#contractFileButton').on('click', '#shutDown', function () {
        contractFile.shutDown();
    })
};
$(function(){
    contractFile.init();
});