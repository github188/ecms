/**
 * 合同管理-项目合同
 * @author:xiongxiaojun
 * @time:2017-06-20
 */

var contract = {
    contractStatus: 2, //合同审批状态,默认显示已通过
    departmentId: null //三级部门id
};
contract.url = appHost + approot;
contract.validate = undefined;
contract.upload = [];
contract.authorization = Utils.getValue('authorization'); //获取登录人的userId和Token

/**
 * 获取合同字段
 */
contract.getFile = function(code, callback){
    //归档状态：  contract_exstatus
    //合同状态：  contract_status
    //产品线：    department
    //流程类型：  processtype
    $.ajax({
        url: contract.url + '/ctm/setting/param/list',
        type: 'get',
        beforeSend: function (request) {
            request.setRequestHeader("Content-Type", "application/json;charset=UTF-8;");
            request.setRequestHeader("authorization", contract.authorization);
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
 * 获取归档状态
 */
contract.getFileStatus = function(){
   this.getFile('contract_exstatus', function(exStatus){
       var options = '<option value="">--请选择--</option>';
       for (var i = 0; i < exStatus.length; i++) {
           options += '<option value="' + exStatus[i].value + '">' + exStatus[i].name + '</option>';
       }
       $('#fileState').html(options);
    });
};


/**
 * 获取合同字段属性
 */
contract.getFileType = function () {
    $.ajax({
        url: contract.url + '/ctm/setting/param/list',
        type: 'get',
        data: {code: 'ctm_attr'},
        beforeSend: function (request) {
            request.setRequestHeader("authorization", contract.authorization);
        },
        success: function (data) {
            if (data.code == "success") {
                var content = data.content;
                var options = '<option value="">--请选择--</option>';
                for (var i = 0; i < content.length; i++) {
                    options += '<option value="' + content[i].value + '">' + content[i].name + '</option>';
                }
                $('#searchContractType').html(options);
            } else {
                //显示错误信息
                layer.msg(data.message);
            }
        }
    })
};

/**
 * 获取项目合同列表
 */
contract.getList = function () {
    var cmd = new CommandAjax(contract.url + "/ctm/contract/list", contract.authorization);
    var object = {
        ctmAttr: $('#searchContractType').val(),
        userName: $('#searchSalesName').val(),
        key: $('#searchContractName').val(),
        depId: contract.departmentId,
        startAmount: $('#searchContractAmountStart').val(),
        endAmount: $('#searchContractAmountEnd').val(),
        status: contract.contractStatus
    };
    for (var i in object) {
        if (object[i] !== '' && object[i] !== null && object[i] !== undefined) {
            cmd[i] = object[i]
        }
    }
    $("#contractList").datagrid({
        columns: [{
            display: "合同编号",
            name: "ctmCode",
            width: "180px"
        },{
            display: "合同名称",
            name: "ctmName",
            width: "180px"
        }, {
            display: "合同类型",
            width: "100px",
            name: "ctmAttr"
        },  {
            display: "合同金额",
            width: "100px",
            name: "amount",
            render: function (row) {
                return row.amount && (row.amount).addComma() + ' 元';
            }
        },{
            display: "归属部门",
            width: "200px",
            name: "depName",
            render: function (row) {
                return row.depName.split('-').reverse().join('-');

            }
        }, {
            display: "发起人",
            width: "100px",
            name: "userName"
        }, {
            display: "操作",
            width: "100px",
            render: function (row) {
                return '<a class="oprate" title="详情" target="_blank" href="portals/workOrder/contractDetail.html?type=4&processId='+ row.processId+'">详情</a>';
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
                layer.msg(data.message);
            }
        }
    });
};

/**
 * 获取关联项目
 */
contract.getProjectName = function () {
    var cmd = new CommandAjax(contract.url + "/pmo/project/list", contract.authorization);

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
                rowHtml += '<a class="oprate" title="选定" href="javascript:void(0);" onclick="contract.chooseProject(\'' + id + '\',\'' + name + '\')">选定</a>';
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
contract.chooseProject = function (id, name) {
    $('#chooseProjectModal').modal('hide');
    $('#projectName').val(name).attr('data-id', id);
    $('#clearProject').show();
};
/**
 * 获取产品线
 */
contract.getProduct = function () {
    contract.getFile('department', function(data){
        for(var i = 0; i < data.length; i++){
            $('#productLine').append('<label class="checkbox-inline"><input type="checkbox" name="productStyle" value="'+ data[i].value +'"> '+ data[i].name +'</label>')
        }
    })
};
/**
 * 获取片区
 */
contract.getMarketCenter = function () {
    $.ajax({
        url: contract.url + '/pmo/common/markets',
        type: 'get',
        beforeSend: function (request) {
            request.setRequestHeader("authorization", contract.authorization);
        },
        success: function (data) {
            if (data.code == "success") {
                var content = data.content;
                var options = '<option value="">--请选择--</option>';
                for (var i = 0; i < content.length; i++) {
                    options += '<option value="' + content[i].id + '">' + content[i].name + '</option>';
                }
                $('#marketList').html(options);
                $('#areaName').html(options)

            } else {
                //显示错误信息
                layer.msg(data.message);
            }
        }
    });
};

/**
 * 上传合同附件
 */
contract.fileUpload = function () {
    var uploader = WebUploader.create({
        server: contract.url + '/ctm/contract/files/upload',
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
        contract.uploadFileList(file, '#fileList');
    });

    uploader.on('uploadError', function(){
        layer.msg('上传失败，请重试！');
        $('#startFile').addClass('restart-file');
    });

    uploader.on('uploadSuccess', function(file, response ){
        layer.msg('上传成功！');
        $('#fileOperate').empty();
        contract.upload.push({
            file: response.content,
            name: file.name,
            id: file.id
        });
    });

    uploader.on('uploadComplete', function(){
        layer.close(contract.layerIndex);
    });

    uploader.on('fileQueued', function(){  //添加到队列回调
        // $('#fileOperate').html('<button type="button" class="btn btn-turquoise" id="startFile">开始上传</button>');
    });

    uploader.on('fileDequeued', function(){ //从队列中移除
        if($('#fileList').is(":empty")){
            $('#fileOperate').empty();
        }
    });

    uploader.on('uploadStart', function () {
        contract.layerIndex = layer.load(1, {
            shade: [0.5,'#000']
        });
    });

   $('#fileList').on('click', '.file-remove', function(){ //从页面上移除文件
       $(this).parents('.file-temp-list').remove();
       var id = $(this).attr('data-id');
       uploader.removeFile(id);
       var upload = contract.upload;
       for(var i = 0; i < upload.length; i++){
           if(upload[i].id == id){
               upload.splice(i,1);
           }
       }
   });
};

/**
 * 展示附件
 */
contract.showFileList = function (file, ele) {
    var returnName = function (type, id, name) {
        $(ele).append('<p><img style="height: 32px; width: 32px; margin-right: 5px" src="skins/img/file/'+ type +'.png" ><a title="下载附件" href="'+ contract.url +'/ctm/contract/project/download?fileId='+ id +'&name='+ name +'">'+ name +'</a></p>')
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
contract.uploadFileList = function (file, ele) {
    var returnName = function (type, name) {
        $(ele).append('<p class="file-temp-list"><img style="height: 32px; width: 32px; margin-right: 5px" src="skins/img/file/'+ type +'.png" ><a class="file-link" href="javascript:;">'+ name +'</a><em class="file-remove" data-id="'+ file.id +'" title="删除">X</em></p>');
    };
    var name = file.name;
    var postfix = name.split('.')[name.split('.').length-1];
    var type = Utils.getFileType(postfix);
    returnName(type, name);
};
/**
 * 获取业务员对应所属商机
 */
contract.businessList = function () {
    $.ajax({
        url: contract.url + '/crm/opp/list',
        type: 'get',
        beforeSend: function (request) {
            request.setRequestHeader("Content-Type", "application/json;charset=UTF-8;");
            request.setRequestHeader("authorization", contract.authorization);
        },
        data: {
            isMyKeeper:1,
            pageNum: 100
        },
        success: function (data) {
            if (data.code == "success") {
                var options = '<option value="">--请选择--</option>';
                for (var i = 0; i < data.content.length; i++) {
                    options += '<option value="' + data.content[i].id + '">' + data.content[i].name + '</option>';
                }
                $('#business').html(options);
            } else {
                layer.msg(data.message);
            }
        }
    });
};

/**
 *合同审批表单验证
 */
contract.validate = function(){
    contract.validate = $('#approveForm').validate({
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
            if(contract.upload.length <= 0){
                layer.msg('合同附件不能为空！');
                return;
            }
            var departmentId = [];
            var uploadList = [];
            for(var j = 0; j < contract.upload.length; j++){
                uploadList.push({
                    id: (contract.upload[j].file).split('.')[0],
                    name: contract.upload[j].name
                })
            }

            $('input:checkbox:checked').each(function(){
                departmentId.push($(this).val());
            });
            var contractData = {
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
            contract.layerIndex = layer.load(1, {
                shade: [0.5,'#000']
            });
            contract.createContract(contractData);
        }
    });
};

/**
 * 通过用户id获取用户信息
 * @param personId
 */
contract.toPerDetail = function () {
    var result = null;
    var personId = Utils.getValue('u');
    $.ajax({
        url: contract.url + '/authority/user/' + personId + '/detail',
        type: 'get',
        async: false,
        beforeSend: function (request) {
            request.setRequestHeader("authorization", contract.authorization);
        },
        success: function (data) {
            if (data.code == "success") {
                if(!data.content.leaderName){
                }else{
                    result = true;
                }
            }
        }
    });
    return result;
};
/**
 * 发起合同审批
 */
contract.createContract = function (data) {
  $.ajax({
      url: contract.url + '/ctm/contract/create',
      type: 'post',
      beforeSend: function (request) {
          request.setRequestHeader("Content-Type", "application/json;charset=UTF-8;");
          request.setRequestHeader("authorization", contract.authorization);
      },
      data: JSON.stringify(data),
      success: function (data) {
          layer.close(contract.layerIndex);
          if (data.code == "success") {
             $('#startVerifyModal').modal('hide');
             document.getElementById('approveForm').reset();
              layer.msg('合同审批申请成功！', {time: 1500}, function () {
                  window.location.href = "portals/workOrder/workOrder.html?active=askTab"
              })
          } else {
              layer.msg(data.message);
          }
      }
  })
};

/**
 * 合同树加载
 */
contract.getContractTree = function (ele) {  //获取合同模板列表
    $.ajax({
        url: contract.url + '/ctm/template/tree',
        type: 'get',
        beforeSend: function (request) {
            request.setRequestHeader("authorization", contract.authorization);
        },
        success: function (data) {
            if (data.code == "success") {
                var zNodes = data.content;
                //初始化合同模板列表
                var setting = {
                    data: {
                        keep: {
                            parent: true
                        },
                        simpleData: {
                            enable: true
                        }
                    },
                    view: {
                        dblClickExpand: false,
                        selectedMulti: false
                    },
                    callback: {
                        onClick: function(event, name, obj){
                            contract.zTreeObj = obj;
                            contract.getContractList();
                        }
                    }
                };
                $.fn.zTree.init($('#'+ele), setting, zNodes);
                var treeDepartObj = $.fn.zTree.getZTreeObj(ele);
                var nodes = treeDepartObj.getNodes();

                if (nodes.length>0) {
                    contract.zTreeObj = nodes[0];
                    treeDepartObj.selectNode(nodes[0]);
                }
                treeDepartObj.expandAll(true);
            } else {
                //显示错误信息
                layer.msg(data.message);
            }
        }
    });
};

/**
 * 分级获取部门
 */
contract.getDepartment = function (id, ele, callback) {
    if(id == ''){
        return;
    }
    $.ajax({
        url: contract.url + '/authority/dep/list/pid',
        type: 'get',
        data: {
            parentId: id
        },
        beforeSend: function (request) {
            request.setRequestHeader("authorization", contract.authorization);
        },
        success: function (data) {
            if(data.code == 'success'){
                var content = data.content;
                var options = '<option value="">--请选择--</option>';
                for (var i = 0; i < content.length; i++) {
                    options += '<option data-id="'+ content[i].parentId +'" value="' + content[i].id + '">' + content[i].name + '</option>';
                }
                $('#' + ele).html(options);
                callback(content);
            }
        }
    })
};
/**
 * 加载合同模板文件
 */
contract.getContractList = function(){
    var cmd = new CommandAjax(contract.url + "/ctm/template/temp/list/", contract.authorization);
    cmd.tempId = contract.zTreeObj && contract.zTreeObj.id || 1000000;
    $("#contractFileList").datagrid({
        columns: [{
            display: "",
            name: "name",
            align: "center",
            render: function(row){
                return '<a class="oprate"  onclick="contract.getFileTemplate(\''+ row.id + '\', \''+ row.name + '\')" title="下载文件" href="javascript::" >'+row.name+'<img style="float: right;margin-right: 10px;margin-top: 4px; width: 16px;" src="skins/img/file/down.png" alt=""></a>';
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
                layer.msg(data.message);
            }
        }
    });
};
/**
 * 下载合同模板
 */
contract.downTpl = function () {
    $('#contractTempletModal').modal('show');
    contract.getContractTree('contractTreeView');
    contract.getContractList();

};
/**
 * 合同审批客户列表
 */
contract.clientList = function () {
    $.ajax({
        url: contract.url + '/crm/client/list',
        type: 'get',
        beforeSend: function (request) {
            request.setRequestHeader("Content-Type", "application/json;charset=UTF-8;");
            request.setRequestHeader("authorization", contract.authorization);
        },
        data: {
            isMyKeeper:1,
            pageNum: 100
        },
        success: function (data) {
            if (data.code == "success") {
                var options = '<option value="">--请选择--</option>';
                for (var i = 0; i < data.content.length; i++) {
                    options += '<option value="' + data.content[i].id + '">' + data.content[i].name + '</option>';
                }
                $('#customerName').html(options);
            } else {
                layer.msg(data.message);
            }
        }
    });
};

/**
 * 获取合同字段属性
 */
contract.getContractFileType = function () {
    $.ajax({
        url: contract.url + '/ctm/setting/param/list',
        type: 'get',
        data: {code: 'ctm_attr'},
        beforeSend: function (request) {
            request.setRequestHeader("authorization", contract.authorization);
        },
        success: function (data) {
            if (data.code == "success") {
                var content = data.content;
                var options = '<option value="">--请选择--</option>';
                for (var i = 0; i < content.length; i++) {
                    options += '<option value="' + content[i].value + '">' + content[i].name + '</option>';
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
 * 获取员工列表
 */
contract.getDepLeaderList = function () {
    var cmd = new CommandAjax(contract.url + "/authority/user/query/list", contract.authorization);
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
                    depName = row.depName,
                    depId = row.depId,
                    rowHtml = '';
                rowHtml += '<a class="oprate" title="选定" href="javascript:void(0);" onclick="contract.chooseLeader(\'' + id + '\',\'' + name + '\', \'' + depId + '\',\'' + depName + '\')">选定</a>';
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
};

/**
 *
 * 快捷入口进入
 */
contract.getEntryType = function () {
    var fastEntry = Utils.getValue('fastEntry');
    var type = fastEntry.split('|')[0];
    if(type == 'contract'){   //发起审批
        if(!contract.toPerDetail()){
            layer.msg("请先配置直接上级！");
            return false;
        }
        $('#startVerifyModal').modal("show");
    }
    Utils.setValue('fastEntry', 'null');
};

/**
 * 获取当前登录人在客户管理里面能看到的按钮
 */
contract.getMenuButton = function () {
    var resourceId = $(".main-menu li.active").attr("data-id");
    $.ajax({
        url: contract.url + '/authority/resource/user/resources?resourceId=' + resourceId,
        type: 'get',
        async: false,
        beforeSend: function (request) {
            request.setRequestHeader("authorization", contract.authorization);
        },
        success: function (data) {
            if (data.code == "success") {
                var content = data.content;
                var options = '';
                for (var i = 0; i < content.length; i++) {
                    var theData = content[i];
                    if(theData.url == "export" || theData.url == "startVerify"){

                        options += '<button class="btn btn-turquoise" id="file_' + theData.url + '">' + theData.name + '</button>';
                    }
                    if(theData.url == 'contractFileBtn'){
                        contract.contractFileBtn = true;
                    }
                    if(theData.url == '/project/contractFile.html'){
                        contract.contractParentId = theData.id;
                    }
                }
                $('#contractFileButton').append(options);
            } else {
                //显示错误信息
                pageObj.showNotLoginErrorMsg(data.code, data.message);
            }
        }
    });
};
contract.getFileTemplate = function (id, name) {
    Utils.getFile({
        url:  '/ctm/template/download?id='+ id +'&realname='+ name,
        id: id,
        name: name
    });
};
/**
 * 获取个人信息
 */
contract.getPersonInfo = function (callback) {
    $.ajax({
        type: "get",
        url: contract.url + '/authority/user/homepage/detail',
        async: true,
        beforeSend: function (xhr) {
            xhr.setRequestHeader("authorization", contract.authorization);
        },
        success: function (data) {
            if (data.code == 'success') {
                callback(data.content);

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
 * 初始化
 */
contract.init = function(){
    this.getMenuButton();
    this.getList();
    this.validate();
    this.getEntryType();
    this.fileUpload();
    this.getMarketCenter();
    this.getFileType();
    // this.getFileStatus();
    this.clientList();
    this.businessList();
    this.getProduct();

    this.getDepartment(1, 'searchDepTop', function () {

        var searchDepMiddle = $('#searchDepMiddle');
        var searchDepBottom = $('#searchDepBottom');

        $('#searchDepTop').on('change', function () {
            var $val = $(this).val();
            contract.departmentId = $val;
            if(!$val){
                searchDepMiddle.empty();
                searchDepBottom.empty();
            }
            contract.getDepartment($val, 'searchDepMiddle', function () {

                searchDepMiddle.on('change', function () {
                    var _val = $(this).val();
                    contract.departmentId = _val;
                    if(!_val){
                        searchDepBottom.empty();
                    }
                    contract.getDepartment(_val, 'searchDepBottom', function () {
                        searchDepBottom.on('change', function () {
                            contract.departmentId = $(this).val();
                        })
                    })
                })
            });
        })
    });

    $('.btn-search').on('click', function(){
        contract.getList();
    });
    
    $('#projectSearch').on('click', function () {
        contract.getProjectName();
    });

    $('#contractFileButton').on('click', '#file_startVerify', function(){
        if(!contract.toPerDetail()){
            layer.msg("请先配置直接上级！");
            return false;
        }
        $('#startVerifyModal').modal("show");
    });

    $('#salesmanName').on('click', function(){
        // $('#choosePersonModal').modal('show');
        // contract.getDepLeaderList();
    }).val(Utils.getValue('realname')).attr('data-id', Utils.getValue('u'));

    $('#btnSearchDepLeader').on('click', function(){
        contract.getDepLeaderList();
    });

    $('#choosePersonModal').on('hidden.bs.modal', function () {
        $('#queryKD').val('');
    });

    $('#startVerifyModal').on('hidden.bs.modal', function () {  //发起审批的modal关闭或显示
        if(contract.validate){
            contract.validate.resetForm();
            $('.error').removeClass('error');
        }
    }).on('shown.bs.modal', function () {
        contract.getPersonInfo(function (data) {
            $('#departmentName').val(data.depName.split('-').reverse().join('-')).attr('data-id', data.depId);
        });
        contract.getContractFileType();
    });

    $('#downTpl').on('click', function(){
       contract.downTpl();
    });

    var start = {
        // min: laydate.now(),
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

    // $('#contractAmount').on('blur', function(){   //合同金额千分位转换
    //     var amount = Number($(this).val());
    //     if(!!amount){
    //         $(this).attr('data-value', amount);
    //         $(this).val(amount.addComma());
    //     }
    // });

    $('.ascription li').on('click', function () {
        $('.ascription li').removeClass('active');
        $(this).addClass('active');
        contract.contractStatus = $(this).attr('data-state');
        contract.getList();
    });

    $('#contractFileButton').on('click', '#file_export',function () {   //导出数据
        var object = {
            ctmAttr: $('#searchContractType').val(),
            userName: $('#searchSalesName').val(),
            key: $('#searchContractName').val(),
            depId: contract.departmentId,
            startAmount: $('#searchContractAmountStart').val(),
            endAmount: $('#searchContractAmountEnd').val(),
            status: contract.contractStatus
        };
        var params = '';
        for (var i in object) {
            if (object[i] !== '' && object[i] !== null) {
                params += i + '=' +object[i]+ '&'
            }
        }
        Utils.getFile({
            url: '/ctm/contract/export?' + (params).substring('&', params.length-1),
            export: true
        });
        // window.open(contract.url + '/ctm/contract/export?' + params + 'authorization='+ contract.authorization + '&authId=' + Utils.getValue('u'), '亿车科技EAP - 导出合同');
    });
    
    $('#projectName').on('click', function () {
        $('#chooseProjectModal').modal('show');
        contract.getProjectName();
    });

    $('#clearProject').on('click', function () {
        $('#projectName').val('').attr('data-id', '');
        $('#clearProject').hide();
    });
};


contract.chooseLeader = function(id, name, depId, depName){
    $('#salesmanName').val(name).attr('data-id', id);
    $('#departmentName').val(depName).attr('data-id', depId);
    $('#choosePersonModal').modal('hide');
};
$(function () {
    contract.init();
});