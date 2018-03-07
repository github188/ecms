/**
 * 合同管理-项目合同设置
 * @author:xiongxiaojun
 * @time:2017-06-22
 */

var contract = {};
var contractTemplet = {};
var approvalSet = {};
var contractSet = {};
contract.url = appHost + approot;
contract.authorization = Utils.getValue('authorization'); //获取登录人的userId和Token
contract.zTreeObj = {};
/**
 * 合同树加载
 */
contractTemplet.getContract = function (ele, call) {  //获取合同模板列表
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
                            if(ele == 'contractTree'){
                                $('#btnUploadContract').show();
                            }
                            if(call){
                                call(obj);
                            }
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
                contractTemplet.uploadFile(); //上传合同文件
                contractTemplet.getContractList();

                treeDepartObj.expandAll(true);
            } else {
                //显示错误信息
                layer.msg(data.message);
            }
        }
    });
};

contractTemplet.updateTree = function () {  //更新树数据
    this.getContract('contractTreeEdit');
    this.getContract('contractTree');
};

contractTemplet.getContractList = function(){
    var cmd = new CommandAjax(contract.url + "/ctm/template/temp/list/", contract.authorization);
    cmd.tempId = contract.zTreeObj.id || 1000000;
    $("#contractList").datagrid({
        columns: [{
            display: "文件名",
            name: "name",
            align: "center",
            render: function(row){
                return '<a onclick="contractTemplet.getFileTemplate(\''+ row.id + '\', \''+ row.name + '\')" class="oprate" id="file_'+ row.id +'"  title="下载文件" href="javascript:;" >'+row.name+'</a>';
            }
        }, {
            display: "添加时间",
            width: "180px",
            render: function(row){
                return new Date(row.addTime);
            }
        },{
            display: '操作',
            width: '100px',
            render: function (row) {
                return '<a class="oprate" title="删除" href="javascript:void(0);" onclick="contractTemplet.deleteFile(\'' + row.id + '\')">删除</a>';
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
contractTemplet.getFileTemplate = function (id, name) {
    Utils.getFile({
        url:  '/ctm/template/download?id='+ id +'&realname='+ name,
        id: id,
        name: name
    });
};
// '+ contract.url +'/ctm/template/download?id='+ row.id +'&realname='+ row.name +'
contractTemplet.editContract = function(){   //显示编辑面板
    $('#contractTempletModal').modal('show');
    this.getContract('contractTreeEdit', function(obj){
        contract.zTreeObj = obj;
    });
};

contractTemplet.editContractTemplet = function(){  //编辑模板
    var zTree = $.fn.zTree.getZTreeObj("contractTreeEdit"),
        nodes = zTree.getSelectedNodes(),
        treeNode = nodes[0];
    if (nodes.length == 0) {
        layer.msg('请先选择一个节点!');
        return;
    }
    var currentZtree = contract.zTreeObj;
    // zTree.editName(treeNode);
    $('#editDepModal').modal('show');
    $('#contractTempletModal').css({
        'zIndex': 120
    });
    $('#editContractName').val(currentZtree.name);

    $('#btnEditContractName').on('click', function(){
        var name = $('#editContractName').val();
        layer.load(1, {
            shade: [0.5,'#000']
        });
        $.ajax({
            url: contract.url + '/ctm/template/update',
            type: 'put',
            beforeSend: function (request) {
                request.setRequestHeader("authorization", contract.authorization);
                request.setRequestHeader("content-Type", 'application/json;charset=UTF-8');
            },
            data:JSON.stringify({
                id: currentZtree.id,
                name: name
            }),
            success: function (data) {
                if (data.code == "success") {
                    $('#editDepModal').modal('hide');
                    $('#btnEditContractName').off('click');
                    $('#editContractName').val('');
                    contractTemplet.updateTree();
                    layer.msg('编辑成功!');
                } else {
                    //显示错误信息
                    layer.msg(data.message);
                }
                layer.closeAll('loading');
            }
        })
    });
};

contractTemplet.addContractTemplet = function () { //添加模板
    var zTree = $.fn.zTree.getZTreeObj("contractTreeEdit"),
        nodes = zTree.getSelectedNodes();
    if (nodes.length == 0) {
        layer.msg('请先选择一个节点!');
        return;
    }
    var currentZtree = contract.zTreeObj;
    $('#addDepModal').modal('show');
    $('#contractTempletModal').css({
        'zIndex': 120
    });
    $('#btnAddContractName').on('click', function(){
        var name = $('#addContractName').val();

        if(name.trimAll() == ''){
            layer.msg('请输入模板名称!');
            return;
        }
        layer.load(1, {
            shade: [0.5,'#000']
        });
        $.ajax({
            url: contract.url + '/ctm/template/add',
            type: 'post',
            beforeSend: function (request) {
                request.setRequestHeader("authorization", contract.authorization);
                request.setRequestHeader("content-Type", 'application/json;charset=UTF-8');
            },
            data: JSON.stringify({
                parentId: currentZtree.id||0,
                name: name
            }),
            success: function (data) {
                if (data.code == "success") {
                    zTree.addNodes(nodes[0], {name: name, isParent: true});
                    $('#addDepModal').modal('hide');
                    $('#btnAddContractName').off('click');
                    $('#addContractName').val('');
                    contractTemplet.updateTree();
                    layer.msg('添加成功!');
                } else {
                    //显示错误信息
                    layer.msg(data.message);
                }
                layer.closeAll('loading');
            }
        })
    });
};

contractTemplet.deleteContractTemplet = function () {
    var zTree = $.fn.zTree.getZTreeObj("contractTreeEdit"),
        nodes = zTree.getSelectedNodes();
    var currentZtree = contract.zTreeObj;
    if (nodes.length == 0) {
        layer.msg('请先选择一个节点!');
        return;
    }
    if(contract.zTreeObj.level == 0){
        layer.msg('不能删除根节点!');
        return;
    }

    var deleteContract = function(id, index){
        layer.load(1, {
            shade: [0.5,'#000']
        });
        $.ajax({
            url: contract.url + '/ctm/template/delete',
            type: 'put',
            beforeSend: function (request) {
                request.setRequestHeader("authorization", contract.authorization);
                request.setRequestHeader("content-Type", 'application/json;charset=UTF-8');
            },
            data: JSON.stringify({id:currentZtree.id}),
            success: function (data) {
                if (data.code == "success") {
                    contractTemplet.updateTree();
                    layer.close(index);
                    layer.msg('删除成功!');
                } else {
                    //显示错误信息
                    layer.msg(data.message);
                }
                layer.closeAll('loading');
            }
        })
    };

    if(currentZtree.isParent){
        layer.confirm('确定删除此模板及其子模板？', {
            btn: ['确定', '取消'] //按钮
        }, function (index) {
            deleteContract(index)
        }, function (index) {
            layer.close(index);
        });
    }
};

contractTemplet.uploadFile = function () { //上传合同文件
    var uploader = WebUploader.create({
        server: contract.url + '/ctm/template/upload',
        pick: {
            id: '#btnUploadContract',
            multiple: false
        },
        formData: {
            authorization: Utils.getValue('authorization')
        },
        auto: true,
        accept:{
            title: 'document',
            extensions: 'xls,xlsx,doc,docx',
            mimeTypes: 'application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        }
    });

    uploader.on('uploadError', function(){
        layer.msg('上传失败，请重试！');
    });

    uploader.on('error', function(){
       setTimeout(function(){
           layer.closeAll('loading');
       }, 200);
        layer.msg('文件已存在！');
    });

    uploader.on('startUpload', function () {
        layer.load(1, {
            shade: [0.5,'#000']
        });
    });

    uploader.on('uploadSuccess', function(file, response ){
        if(response.code == 'success'){
            $.ajax({
                url: contract.url + '/ctm/template/submit',
                type: 'post',
                data: JSON.stringify({refId: contract.zTreeObj.id, id: response.content.split('.')[0], name: file.name}),
                beforeSend: function (request) {
                    request.setRequestHeader("authorization", contract.authorization);
                    request.setRequestHeader("Content-Type", "application/json;charset=UTF-8;");
                },
                success: function (data) {
                    if (data.code == "success") {
                        layer.closeAll();
                        layer.msg('模板上传成功！');
                        uploader.reset();
                        contractTemplet.getContractList();
                    } else {
                        //显示错误信息
                        layer.closeAll();
                        layer.msg(data.message);
                    }
                }
            })
        }
    });
};

contractTemplet.deleteFile = function (id) {  //合同文件删除
    layer.confirm('确定删除此文件？', {
        btn: ['确定', '取消'] //按钮
    }, function (index) {
        layer.close(index);
        layer.load(1, {
            shade: [0.5,'#000']
        });
        $.ajax({
            url: contract.url + '/ctm/template/temp/delete',
            type: 'put',
            data: JSON.stringify({id:id}),
            beforeSend: function (request) {
                request.setRequestHeader("authorization", contract.authorization);
                request.setRequestHeader("Content-Type", "application/json;charset=UTF-8;");
            },
            success: function (data) {
                if (data.code == "success") {
                    contractTemplet.getContractList();
                    layer.msg('模板删除成功！');
                } else {
                    //显示错误信息
                    layer.msg(data.message);
                }
                layer.closeAll('loading')
            }
        })
    }, function (index) {
        layer.close(index);
    });
};

contractTemplet.init = function(){
    this.getContract('contractTree', function(obj){  //加载合同树对应的文件
        contractTemplet.getContractList(obj);
    });
    $('#btnEditDepartment').on('click', function(){ //弹出编辑页面
        contractTemplet.editContract();
    });

    $('#btnEditDep').on('click', function(){  //编辑合同模板
        contractTemplet.editContractTemplet();
    });

    $('#btnAddDep').on('click', function(){ //添加合同模板文件
        contractTemplet.addContractTemplet();
    });

    $('#btnDelDep').on('click', function(){ //删除合同文件
        contractTemplet.deleteContractTemplet();
    });
    $('#addDepModal, #editDepModal').on('hidden.bs.modal', function(){
        $('#contractTempletModal').css({
            'zIndex': 1050
        });
    });
};

/**
 * 合同审批设置
 */

// approvalSet.getNodeList = function () { //获取可设置处理人的节点列表
//     $.ajax({
//         url: contract.url + '/ctm/setting/node/list',
//         type: 'get',
//         beforeSend: function (request) {
//             request.setRequestHeader("authorization", contract.authorization);
//         },
//         success: function (data) {
//             if (data.code == "success") {
//                 var content = data.content;
//                 if(content.length == 0) return;
//                 for(var i = 0; i < content.length; i++){
//
//                     // if(content[i].id == "8" &&　content[i].nodeName == "合同归档"){
//                     //     $.ajax({
//                     //         url: contract.url + '/pmo/common/markets',
//                     //         type: 'get',
//                     //         beforeSend: function (request) {
//                     //             request.setRequestHeader("authorization", contract.authorization);
//                     //         },
//                     //         success: function (data) {
//                     //             if (data.code == "success") {
//                     //                 var approveFile = data.content;
//                     //                 var nodeTpl = '<div class="approvePersonBox"><div class="list-top"><h4 class="list-title">'+content[i-1].nodeName +'</h4></div>';
//                     //                 for (var j = 0; j < approveFile.length; j++) {
//                     //                     nodeTpl += '<div class="row padding-t-20"><div class="form-group col-sm-12"><label class="col-sm-1 control-label padding-t-10">'+ approveFile[j].name+'：</label>'+
//                     //                         '<div class="col-sm-7 row-list"><div class="input-tag"></div><input type="text" readonly style="height:40px; cursor: pointer" class="form-control approvePerson" id="approvePerson_'+approveFile[j].id +'"></div><div class="col-sm-1"><button type="button" onclick="approvalSet.saveApprovePerson(\'approvePerson_' + approveFile[j].id + '\', '+approveFile[j].id+', true)" class="btn btn-success margin-t-5">保存</button></div></div></div>';
//                     //                     (function(a){
//                     //                         $('body').on('click', '#approvePerson_'+approveFile[a].id, function () {
//                     //                             $('#choosePersonModal').attr({'data-id': 'approvePerson_'+ approveFile[a].id, 'data-node': approveFile[a].id}).modal('show');
//                     //                             contract.getDepLeaderList();
//                     //                         });
//                     //                     })(j);
//                     //                     approvalSet.getRegionFileList(approveFile[j].id, 'approvePerson_'+ approveFile[j].id);
//                     //                 }
//                     //                 nodeTpl+='</div>';
//                     //                 $('#approveTab').append(nodeTpl);
//                     //             } else {
//                     //                 //显示错误信息
//                     //                 layer.msg(data.message);
//                     //             }
//                     //         }
//                     //     });
//                     //
//                     // }else{
//                         var nodeTpl = '<div class="approvePersonBox"><div class="list-top"><h4 class="list-title">'+content[i].nodeName+'</h4></div><div class="row padding-t-20"><div class="form-group col-sm-12"><label class="col-sm-1 control-label padding-t-10">审批人：</label>'+
//                             '<div class="col-sm-7 row-list"><div class="input-tag"></div><input type="text" readonly style="height:40px; cursor: pointer" class="form-control approvePerson" id="approvePerson_'+content[i].id +'"></div><div class="col-sm-1"><button type="button" onclick="approvalSet.saveApprovePerson(\'approvePerson_' + content[i].id + '\', '+content[i].id+')" class="btn btn-success margin-t-5">保存</button></div></div></div></div>';
//                         $('#approveList').append(nodeTpl);
//                     // }
//
//
//                     (function(a){
//                         $('#approvePerson_'+content[i].id).on('click', function () {
//                             $('#choosePersonModal').attr({'data-id': 'approvePerson_'+ content[a].id, 'data-node': content[a].id}).modal('show');
//                             contract.getDepLeaderList();
//                         });
//                     })(i);
//                     approvalSet.getHandleList(content[i].id, 'approvePerson_'+ content[i].id, content[i].nodeName);
//                 }
//             } else {
//                 //显示错误信息
//                 layer.msg(data.message);
//             }
//         }
//     })
// };
// approvalSet.getHandleList = function (id, eleId, name) { //获取合同审批人
//     $.ajax({
//         url: contract.url + '/ctm/setting/node/handler',
//         type: 'get',
//         beforeSend: function (request) {
//             request.setRequestHeader("authorization", contract.authorization);
//         },
//         data: {nodeId:id},
//         success: function (data) {
//             approvalSet[eleId] = {};
//             approvalSet[eleId]['exist'] = {};
//             approvalSet[eleId]['add'] = {};
//             approvalSet[eleId]['del'] = {};
//             approvalSet[eleId]['update'] = {};
//
//             if (data.code == "success") {
//                 var content = data.content;
//                 if(content.length == 0) return;
//                 for(var i = 0; i < content.length; i++){
//                     approvalSet[eleId]['exist'][content[i].userId] = {
//                         name: content[i].realname,
//                         id:  content[i].id,
//                         nodeId: id,
//                         userId: content[i].userId
//                     };
//                     approvalSet[eleId]['update'][content[i].userId] = {
//                         name: content[i].realname,
//                         id:  content[i].id,
//                         nodeId: id,
//                         userId: content[i].userId
//                     }
//                 }
//                 approvalSet.inputTag(eleId, approvalSet[eleId].update);
//             } else {
//                 //显示错误信息
//                 layer.msg(data.message);
//             }
//         }
//     })
// };
//
// approvalSet.getRegionFileList = function (regionId, eleId, name) { //获取各区归档人列表
//     $.ajax({
//         url: contract.url + '/ctm/setting/region/list',
//         type: 'get',
//         beforeSend: function (request) {
//             request.setRequestHeader("authorization", contract.authorization);
//         },
//         data: {regionId:regionId},
//         success: function (data) {
//             approvalSet[eleId] = {};
//             approvalSet[eleId]['exist'] = {};
//             approvalSet[eleId]['add'] = {};
//             approvalSet[eleId]['del'] = {};
//             approvalSet[eleId]['update'] = {};
//
//             if (data.code == "success") {
//                 var content = data.content;
//                 if(content.length == 0) return;
//                 for(var i = 0; i < content.length; i++){
//                     approvalSet[eleId]['exist'][content[i].userId] = {
//                         name: content[i].realname,
//                         id:  content[i].id,
//                         nodeId: regionId,
//                         userId: content[i].userId
//                     };
//                     approvalSet[eleId]['update'][content[i].userId] = {
//                         name: content[i].realname,
//                         id:  content[i].id,
//                         nodeId: regionId,
//                         userId: content[i].userId
//                     }
//                 }
//                 approvalSet.inputTag(eleId, approvalSet[eleId].update);
//             } else {
//                 //显示错误信息
//                 layer.msg(data.message);
//             }
//         }
//     })
// };
//
// approvalSet.inputTag = function (eleId, data) {
//     var tagEle = $('#'+ eleId).parent('.row-list').find('.input-tag');
//     tagEle.empty();
//     var str = '';
//     for(var i in data){
//         (function(a, id){
//             str += '<a class="tag-list" href="javascript:;">'+ data[a].name +'<span title="删除" onclick="approvalSet.removeTag(this, \'' + eleId + '\', \'' + data[a].nodeId + '\', \'' + data[a].userId + '\', \'' + data[a].id + '\')" class="remove-tag">x</span></span></a>';
//         })(i, eleId)
//     }
//     tagEle.append(str);
// };
// approvalSet.removeTag = function ($this, eleId, nodeId, userId, id) { //移除标签
//     var del = approvalSet[eleId]['del'];
//     var add = approvalSet[eleId]['add'];
//     var exist = approvalSet[eleId]['exist'];
//     var update = approvalSet[eleId]['update'];
//
//     if(!$.isEmptyObject(add)){
//         for(var a in add){
//             if(add[a] && add[a].userId == userId){
//                 add[userId] && delete add[userId];
//                 update[userId] && delete update[userId];
//                 break;
//             }else{
//                 del[userId] = {
//                     id: id,
//                     isvalid: 0,
//                     userId: userId,
//                     nodeId: nodeId
//                 }
//             }
//         }
//     }
//     if(!$.isEmptyObject(update)){
//         for(var u in update){
//             if(update[u] && update[u].userId == userId){
//                 del[userId] = {
//                     id: id,
//                     isvalid: 0,
//                     userId: userId,
//                     nodeId: nodeId
//                 };
//                 update[userId] && delete update[userId];
//                 break;
//             }else{
//                 del[userId] && delete del[userId];
//             }
//         }
//     }
//     approvalSet.getFinalPerson(exist, add, del, update, eleId);
// };
// approvalSet.saveApprovePerson = function (eleId, nodeId, region) { //保存审批人
//
//     var result = approvalSet.getFinalPerson(approvalSet[eleId]['exist'], approvalSet[eleId]['add'], approvalSet[eleId]['del'], approvalSet[eleId]['update'], eleId);
//     var add = result.add;
//     var del = result.del;
//     var exist = result.exist;
//     var update = result.update;
//
//     if($.isEmptyObject(update)){
//         layer.msg('审批操作人不能为空！');
//         return;
//     }
//     if($.isEmptyObject(add) && $.isEmptyObject(del)){
//         layer.msg('操作成功！');
//         return;
//     }
//
//     var arg = [];
//     layer.load(1, {
//         shade: [0.5,'#000']
//     });
//
//     var url = contract.url + '/ctm/setting/node/update';
//     if(region){  //片区归档人的id
//         url = contract.url + '/ctm/setting/region/update';
//         for(var a in add){
//             arg.push({
//                 handlerId: add[a].userId,
//                 nodeId: add[a].nodeId
//             });
//         }
//         for(var d in del){
//             arg.push({
//                 handlerId: del[d].userId,
//                 nodeId: del[d].nodeId,
//                 isvalid: 0,
//                 id: del[d].id
//             })
//         }
//     }else{
//         for(var a in add){
//             arg.push({
//                 userId: add[a].userId,
//                 nodeId: add[a].nodeId
//             });
//         }
//         for(var d in del){
//             arg.push({
//                 userId: del[d].userId,
//                 nodeId: del[d].nodeId,
//                 isvalid: 0,
//                 id: del[d].id
//             })
//         }
//     }
//     $.ajax({
//         url: url,
//         type: 'put',
//         beforeSend: function (request) {
//             request.setRequestHeader("authorization", contract.authorization);
//             request.setRequestHeader("Content-Type", "application/json;charset=UTF-8;");
//         },
//         data: JSON.stringify({
//             data:arg
//         }),
//         success: function (data) {
//             if (data.code == "success") {
//                layer.msg('操作成功！');
//             } else {
//                 layer.msg(data.message);
//             }
//             layer.closeAll('loading');
//         }
//     })
// };
// approvalSet.getFinalPerson = function (exist, add, del, update, eleId) {
//     var temp = $.extend({}, update, add);
//     if(!$.isEmptyObject(exist)){  //判断是否是被多次删除的数据，以保留id
//         for(var e in exist){
//             for(var u in update){
//                 if(exist[e] && exist[e].userId == update[u].userId){
//                     update[u].id = exist[e].id;
//                 }
//             }
//         }
//     }
//     approvalSet.inputTag(eleId, temp);
//     return {
//         add: add,
//         del: del,
//         exist: exist,
//         update: temp
//     }
// };
// approvalSet.approvalPerson = function () {  //获取审批人列表
//
//     $.ajax({
//         url: contract.url + '/ctm/setting/node/handler',
//         type: 'get',
//         beforeSend: function (request) {
//             request.setRequestHeader("authorization", contract.authorization);
//         },
//         data:{
//             parentId: currentZtree.id||0,
//             name: name
//         },
//         success: function (data) {
//             if (data.code == "success") {
//                 zTree.addNodes(nodes[0], {name: name, isParent: true});
//                 $('#addDepModal').modal('hide');
//                 $('#btnAddContractName').off('click');
//                 $('#addContractName').val('');
//                 contractTemplet.updateTree();
//                 layer.msg('添加成功!');
//             } else {
//                 //显示错误信息
//                 layer.msg(data.message);
//             }
//         }
//     })
// };

/**
 * 获取合同字段属性
 */
approvalSet.getFileType = function () {
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
                var options = '';
                for (var i = 0; i < content.length; i++) {
                    options += '<option value="' + content[i].value + '">' + content[i].name + '</option>';
                }
                $('#contractType').html(options);
                approvalSet.getPerson($('#contractType').val());
            } else {
                //显示错误信息
                layer.msg(data.message);
            }
        }
    })
};

/**
 * 获取审批人
 */
approvalSet.getPerson = function (value) {
    var cmd = new CommandAjax(contract.url + "/ctm/setting/attr/list", contract.authorization);
    cmd.attr = value;
    $("#approvalList").datagrid({
        columns: [{
            display: "审批名称",
            name: "nodeName",
            width: '30%'
        }, {
            display: "审批人",
            width: '30%',
            render: function(row){
                var user = row.user;
                if(!user){
                    return '/';
                }
                var person = [];
                for(var i = 0; i < user.length; i++){
                    person.push(user[i].realname)
                }
                return person.join('、');
            }
        },{
            display: '操作',
            width: '100px',
            render: function (row) {
                approvalSet['tempPerson_'+ row.nodeId] = row.user;
                return '<a  class="oprate approval-set" data-type="'+ value +'" data-id="'+ row.nodeId +'" title="设置审批人" href="javascript:void(0);">设置</a>';
            }
        }],
        reqdata: cmd,
        isPage:false,
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

approvalSet.renderTag = function (person) {
    var str = '';
    for(var i = 0; i < person.length; i++){
        approvalSet.tempPerson.user[person[i].id] = {
            id: person[i].id,
            name: person[i].realname
        };
        str += '<a class="tag-list" href="javascript:;">'+ person[i].realname +'<span title="删除" data-id="'+ person[i].id +'" class="remove-tag">x</span></a>';
    }
    $('.input-tag').html(str);
};

approvalSet.init = function () {
    this.getFileType();
    $('#contractType').on('change', function(){
        approvalSet.getPerson($(this).val());
    });

    $('#approvalList').on('click', '.approval-set', function () {  //设置审批人
        var nodeId = $(this).attr('data-id');
        var type = $(this).attr('data-type');
        $('.input-tag').empty();
       $('#approvalModal').modal('show');
       var person = approvalSet['tempPerson_'+ nodeId];
        approvalSet.tempPerson = {  //临时存储对象
            nodeId: nodeId,
            attr: type,
            user: {}
        };
        if(!person){
           return;
       }
        approvalSet.renderTag(person, nodeId);
    });

    $('.input-tag').on('click', '.remove-tag', function () {  //删除审批人
        $('.approvePerson').height($('.input-tag').height());
        var id =  $(this).attr('data-id');
        var person = approvalSet.tempPerson;
       for(var item in person.user){
           if(item == id){
               $(this).parent('.tag-list').remove();
               delete  person.user[item];
           }
       }
    });

    $('.approvePerson, .input-tag').on('click', function (e) {  //审批人设置事件
        if(!$(e.target).hasClass('remove-tag')){
            $('#choosePersonModal').modal('show');
            contract.getDepLeaderList();
        }
    });

    $('#approvalPersonBtn').on('click', function () { // 保存审批人
        var person = approvalSet.tempPerson;
        var params = {
            user: []
        };

        for(var item in person){
            if(item != 'user'){
                params[item] = person[item];
            }
        }
        for(var id in person.user){
            params.user.push({
                id: id
            });
        }
        $.ajax({
            url: contract.url + '/ctm/setting/attr/update',
            type: 'post',
            data: JSON.stringify(params),
            beforeSend: function (request) {
                request.setRequestHeader("authorization", contract.authorization);
                request.setRequestHeader("Content-Type", "application/json;charset=UTF-8;");
            },
            success: function (data) {
                if(data.code == 'success'){
                    approvalSet.getPerson($('#contractType').val());
                    $('#approvalModal').modal('hide');
                    layer.msg('操作成功！');
                }else{
                    layer.msg(data.message);
                }
            }
        })
    });
};

/**
 * 合同字段设置
 */
contractSet.init = function () {
    this.validateSyllableAdd();
    this.validateSyllableEdit();

    $('#syllableList').on('click', '.contract-type', function () {
       $('#editSyllableModal').modal('show');
       var name = $(this).attr('data-name');
       var value = $(this).attr('data-value');
       var id = $(this).attr('data-id');
        contractSet.updateTypeFile = {
            name: name,
            value: value,
            id: id
        };
        $('#editSyllableName').val(name);
    }).on('click', '.contract-status', function () {
        var id = $(this).attr('data-id');
        var valid = $(this).attr('data-valid');
        var _valid = 0;
        if(valid == 0){
            _valid = 1;
        }
        $.ajax({
            url: contract.url + '/ctm/setting/param/update',
            type: 'put',
            data: JSON.stringify({
                data: [{
                    id: id,
                    isvalid: _valid
                }]
            }),
            beforeSend: function (request) {
                request.setRequestHeader("authorization", contract.authorization);
                request.setRequestHeader("Content-Type", "application/json;charset=UTF-8;");
            },
            success: function (data) {
                if (data.code == "success") {
                    layer.msg('操作成功！');
                    contractSet.getContractType();
                } else {
                    //显示错误信息
                    layer.msg(data.message);
                }
                layer.closeAll('loading');
            }
        })
    });
    // this.getContractField();
    // this.getSignField();
    // this.getTypeField();
    // this.getDepartmentField();
};
/**
 * 获取字段属性
 */
// contractSet.getField = function (type, eleId, value) {
//     $.ajax({
//         url: contract.url + '/ctm/setting/param/list',
//         type: 'get',
//         data: {code: type},
//         beforeSend: function (request) {
//             request.setRequestHeader("authorization", contract.authorization);
//         },
//         success: function (data) {
//             if (data.code == "success") {
//                 contractSet.firedTpl(data.content, eleId, value, type);
//             } else {
//                 //显示错误信息
//                 layer.msg(data.message);
//             }
//         }
//     })
// };
/**
 * 设置字段属性
 */
// contractSet.setField = function (arg) {
//     layer.load(1, {
//         shade: [0.5,'#000']
//     });
//     $.ajax({
//         url: contract.url + '/ctm/setting/param/update',
//         type: 'put',
//         data: JSON.stringify({
//             data: arg
//         }),
//         beforeSend: function (request) {
//             request.setRequestHeader("authorization", contract.authorization);
//             request.setRequestHeader("Content-Type", "application/json;charset=UTF-8;");
//         },
//         success: function (data) {
//             if (data.code == "success") {
//                 layer.msg('操作成功！');
//             } else {
//                 //显示错误信息
//                 layer.msg(data.message);
//             }
//             layer.closeAll('loading');
//         }
//     })
// };
/**
 * 字段设置模板
 */
// contractSet.firedTpl = function (data, eleId, value, type) {
//     var num = ["一","二","三","四","五","六","七","八","九","十","十一","十二", "十三", "十四", "十五", "十六", "十七", "十八", "十九", "二十"];
//
//     var length =  data.length;
//     var label = "" ;
//
//
//     var str = '<div class="list-top" data-code="'+ type +'"><h4 class="list-title">'+value+'</h4><button class="btn btn-turquoise edit-files pull-right margin-t-20">编辑</button><button class="btn btn-turquoise save-files pull-right margin-t-20 z-hide">保存</button></div>'+
//         '<div class="form-horizontal field-setting"><div class="field-box">';
//     for(var i = 0; i < data.length; i++){
//         if(length < 20 ){
//             label = "选项" + num[i];
//         }else{
//             label = "选项" + (i+1);
//         }
//       str+= '<div class="form-group inblock"><label class="control-label col-sm-2">'+label+'：</label><input type="text" class="form-control" name="'+ data[i].value +'" data-id="'+ data[i].id +'" value="'+data[i].name +'"></div>';
//     }
//     str += '</div><div class="pull-right"><button class="btn btn-turquoise pull-right z-hide fieldDo">新增选项</button></div>';
//
//     $('#'+ eleId).append(str);
//     contract.fieldInit();
// };
//
// /**
//  * 获取合同字段属性
//  */
// contractSet.getContractField = function () {
//     this.getField('ctm_attr', 'contractField', '合同属性');
// };
// /**
//  * 获取签约模式属性
//  */
// contractSet.getSignField = function () {
//     this.getField('sign_modal', 'signModalField', '签约模式');
// };
// /**
//  * 获取式份属性
//  */
// contractSet.getTypeField = function () {
//     this.getField('ctm_style', 'typeField', '式份');
// };
// /**
//  * 获取产品线属性
//  */
// contractSet.getDepartmentField = function () {
//     this.getField('department', 'departmentField', '产品线');
// };

// contractSet.getField = function (type, eleId, value) {
//     $.ajax({
//         url: contract.url + '/ctm/setting/param/list',
//         type: 'get',
//         data: {code: type},
//         beforeSend: function (request) {
//             request.setRequestHeader("authorization", contract.authorization);
//         },
//         success: function (data) {
//             if (data.code == "success") {
//                 contractSet.firedTpl(data.content, eleId, value, type);
//             } else {
//                 //显示错误信息
//                 layer.msg(data.message);
//             }
//         }
//     })
// };

/**
 * 获取合同字段类型
 */
contractSet.getContractType = function () {
    var cmd = new CommandAjax(contract.url + "/ctm/setting/param/list", contract.authorization);
    cmd.code = 'ctm_attr';
    $("#syllableList").datagrid({
        columns: [{
            display: "编号",
            name: "value"
        }, {
            display: "合同类型",
            name: 'name'
        }, {
            display: '操作',
            render: function (row) {
                var id = row.id;
                var value = row.value;
                var name = row.name;
                var valid = row.isvalid;
                // var str = ['启用', '停用'][valid];
                // <a data-name="'+ name +'" data-id="'+ id +'" data-valid="'+ valid+'" title="'+ str +'" class="oprate contract-status" href="javascript:void(0);">'+ str +'</a>
                return '<a data-name="'+ name +'" data-id="'+ id +'" data-value="'+ value+'" class="oprate contract-type" title="编辑" href="javascript:void(0);">编辑</a>';
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
 * 更新合同字段类型
 */
contractSet.updateType = function (obj) {
    var params = obj;
    params.code = "ctm_attr";
    $.ajax({
        url: contract.url + '/ctm/setting/param/update',
        type: 'put',
        data: JSON.stringify({
            data: [params]
        }),
        beforeSend: function (request) {
            request.setRequestHeader("authorization", contract.authorization);
            request.setRequestHeader("Content-Type", "application/json;charset=UTF-8;");
        },
        success: function (data) {
            if (data.code == "success") {
                layer.msg('操作成功！');
                $('#addSyllableModal').modal('hide');
                $('#editSyllableModal').modal('hide');
                contractSet.getContractType();
            } else {
                //显示错误信息
                layer.msg(data.message);
            }
            layer.closeAll('loading');
        }
    })
};
/**
 * 添加合同字段类型表单
 */
contractSet.validateSyllableAdd = function () {
    $('#addSyllableForm').validate({
        debug: true,
        rules: {
            addSyllableNum: "required",
            addSyllableName: {
                required: true,
                maxlength: 20
            },
            addBelongDep: "required"

        },
        messages:{
            addSyllableNum: "编号不能为空！",
            addSyllableName: {
                required: "类型名称不能为空！",
                maxlength: '不能超过20个字符!'
            },
            addBelongDep: "归属部门不能为空！"

        },
        submitHandler: function(){
            layer.load(1, {
                shade: [0.5,'#000']
            });
            contractSet.updateType({
                name: $('#addSyllableName').val()
            });
        }
    });
};

/**
 * 编辑合同字段类型表单
 */
contractSet.validateSyllableEdit = function () {
    $('#editSyllableForm').validate({
        debug: true,
        rules: {
            editSyllableNum: "required",
            editSyllableName: {
                required: true,
                maxlength: 20
            },
            editBelongDep: "required"

        },
        messages:{
            editSyllableNum: "编号不能为空！",
            editSyllableName: {
                required: "类型名称不能为空！",
                maxlength: '不能超过20个字符!'
            },
            editBelongDep: "归属部门不能为空！"

        },
        submitHandler: function(){
            contractSet.updateType({
                name: $('#editSyllableName').val(),
                value: contractSet.updateTypeFile.value,
                id: contractSet.updateTypeFile.id
            });
        }
    });
};

/**
 * 初始化
 */
contract.init = function(){

    // $('#syllableTab').on('click', '.fieldDo', function(){//新增
    //     var $parent = $(this).parents('.tab-pane-box');
    //     contract.fieldSetting($(this), $parent);
    // }).on('click', '.edit-files', function(){//编辑
    //     var $parent = $(this).parents('.tab-pane-box');
    //     contract.fieldEdit($parent, $(this));
    // }).on('click', '.save-files', function(){//保存
    //     var $parent = $(this).parents('.tab-pane-box');
    //     var arg = [];
    //     $parent.find('input').each(function(a, b){
    //
    //         if(!$(b).val().trimAll()){
    //             $(b).parent('.form-group ').remove();
    //         }else{
    //             contract.fieldInit($parent);
    //             var name = $(b).attr('name');
    //             var id = $(b).attr('data-id');
    //             var value = $(b).val();
    //             var code = $parent.find('.list-top').attr('data-code');
    //             arg.push({
    //                 name: value,
    //                 id: id,
    //                 value: name,
    //                 code: code
    //             })
    //         }
    //     });
    //     contractSet.setField(arg)
    // });

    // $('#saveApprovePerson').on('click', function(){
    //     if($.isEmptyObject(contract.choosePerson)){
    //         layer.msg('审批人不能为空！');
    //     }
    // });

    contractTemplet.init();
    approvalSet.init();
    contractSet.init();
    approvalSet.getFileType();
    contractSet.getContractType();
    //模糊查询点击事件
    $('#btnSearchDepLeader').on('click', function () {
        contract.getDepLeaderList();
    });

    $('#choosePersonModal').on('hide.bs.modal', function () {
       $(this).find('#queryKD').val('');
        contract.getDepLeaderList();
    });

    $('#addSyllableModal').on('hide.bs.modal', function () {
       $('#addSyllableName').val('');
    });

    //新增合同属性
    $('#syllableAdd').on('click', function () {
        $('#addSyllableModal').modal('show');
    });

    $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
        var id = $(e.target).attr('href').split('#')[1];
        if(id == "syllableTab"){
            contractSet.getContractType();
        }else if(id == "approveTab"){
            approvalSet.getFileType();
            approvalSet.getPerson($('#contractType').val());
        }
    });
};
/**
 * 查看模式
 */
// contract.fieldInit = function ($parent) {
//     var parent = $parent?$parent: $('.field-setting');
//     parent.find("input").css({'border': 'none', cursor: 'default'}).attr('disabled', true);
//     parent.find('.fieldDo').hide();
//     parent.find('.save-files').hide();
//     parent.find('.edit-files').show();
// };
/**
 * 编辑模式
 */
// contract.fieldEdit = function ($parent, $this) {
//     var parent = $parent?$parent: $('.field-setting');
//     parent.find('.fieldDo').show();
//     parent.find('.save-files').show();
//     $this.hide();
//     parent.find('input').removeAttr('style').removeAttr('disabled');
// };
/**
 * 字段添加设置
 */
// contract.fieldSetting = function ($this, $parent) {
//     var flag = false;
//     $parent.find('input').each(function(a, b){
//         if(!$(b).val().trimAll()){
//             flag = true;
//         }else{
//             flag = false;
//         }
//     });
//     if(flag){
//         layer.msg('请先填写再新增！');
//         return;
//     }
//     var num = ["一","二","三","四","五","六","七","八","九","十","十一","十二", "十三", "十四", "十五", "十六", "十七", "十八", "十九", "二十"];
//     var length =  $parent.find('input').length;
//     var label = "" ;
//     if(length < 20 ){
//         label = "选项" + num[length];
//     }else{
//         label = "选项" + (length+1);
//     }
//     var addTpl = '<div class="form-group inblock">'+
//         '<label class="control-label col-sm-2">'+label+'：</label>'+
//         '<input type="text" class="form-control"></div>';
//     $parent.find('.field-box').append(addTpl);
// };

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
                rowHtml += '<a class="oprate" title="选定" href="javascript:void(0);" onclick="contract.chooseLeader(\'' + id + '\',\'' + name + '\')">选定</a>';
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

contract.chooseLeader = function(userId, name){
    approvalSet.tempPerson.user[userId] = {
        id: userId,
        name: name
    };
    var user = approvalSet.tempPerson.user;
    var person = [];

    for(var item in user){
        person.push({
            realname: user[item].name,
            id: user[item].id
        })
    }
    approvalSet.renderTag(person);
    $('.approvePerson').height($('.input-tag').height());
    $('#choosePersonModal').modal('hide');
};
$(function () {
    contract.init();
});