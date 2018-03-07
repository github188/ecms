/**
 * 组织架构-角色管理
 * @author:何凡凡
 * @time:2017-04-22
 */

var htmlObj = {};
htmlObj.rootUrl = appHost + approot;
var validatorOfAddRole; //添加角色form的validate对象
htmlObj.arr = []; //菜单树多选后的数据
htmlObj.authorization = Utils.getValue('authorization'); //获取登录人的userId和Token

/**
 * 获取角色分页列表
 */
htmlObj.getRoleList = function () {
    var cmd = new CommandAjax(htmlObj.rootUrl + "/authority/role/list", htmlObj.authorization);
    var Rstate = $('#Rstate').val();
    var Rrolename = $('#Rrolename').val();
    if (!Utils.isNullorEmpty(Rstate)) {
        cmd.status = Rstate;
    }
    if (!Utils.isNullorEmpty(Rrolename)) {
        cmd.name = Rrolename;
    }
    $("#roleList").datagrid({
        columns: [{
            display: "角色名称",
            name: "name",
            width: "150px",
            align: "center"
        }, {
            display: "角色说明",
            name: "profile",
            width: "180px",
            align: "center"
        }, {
            display: "角色状态",
            width: "100px",
            align: "center",
            render: function (row) {
                var theStatus = row.status;
                return theStatus == 0 ? '启用中' : '已停用';
            }
        }, {
            display: "操作",
            width: "200px",
            align: "center",
            render: function (row) {
                var id = row.id,
                    name = row.name,
                    profile = row.profile,
                    status = row.status,
                    statusName = '',
                    rowHtml = '';
                if (status == 0) {
                    //这里要反过来，因为状态已经是启用中，else里面同理
                    statusName = '停用';
                    status = 1;
                } else {
                    statusName = '启用';
                    status = 0;
                }
                rowHtml += '<a class="oprate edit-roles" title="编辑" data-name="'+ name +'" data-id="'+ id +'" data-profile="'+ profile +'" href="javascript:void(0);">编辑</a>' +
                    '<a class="oprate" title="' + statusName + '" href="javascript:void(0);" onclick="htmlObj.leaveTheRole(\'' + id + '\',\'' + name + '\',\'' + status + '\')">' + statusName + '</a>' +
                    '<a class="oprate" title="分配菜单" href="javascript:void(0);" onclick="htmlObj.toAssignMenu(\'' + id + '\',\'' + name + '\')">分配菜单</a>';
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
 * 添加、修改角色
 */
htmlObj.addRole = function (whichHandle, roleId) {
    var url = htmlObj.rootUrl + "/authority/role";
    var theJson = {};
    var theRequestMethod = "post";
    var roleEditModal = $('#roleEditModal');
    theJson.name = $('#rolename').val().replace(/\s/g, "");
    theJson.profile = $('#roleprofile').val().replace(/(^\s+)|(\s+$)/g, "");
    if (whichHandle == "update") {
        theJson.id = roleId;
        theRequestMethod = "put";
    }
    $.ajax({
        url: url,
        type: theRequestMethod,
        data: JSON.stringify(theJson),
        beforeSend: function (request) {
            request.setRequestHeader("Content-Type", "application/json;charset=UTF-8;");
            request.setRequestHeader("authorization", htmlObj.authorization);
        },
        success: function (data) {
            if (data.code == "success") {
                roleEditModal.modal('hide');
                htmlObj.resetValide(validatorOfAddRole, roleEditModal, 'roleEditForm');
                //刷新角色列表
                htmlObj.getRoleList();
            } else {
                //显示错误信息
                pageObj.showNotLoginErrorMsg(data.code, data.message);
            }
        }
    });
};

/**
 * 显示角色详情
 * @param roleId
 * @param roleName
 * @param roleProfile
 */
htmlObj.toRoleDetail = function ($this) {
    var roleId = $this.attr('data-id');
    var roleName = $this.attr('data-name');
    var roleProfile = $this.attr('data-profile');
    var roleEditModal = $('#roleEditModal');
    roleEditModal.modal();
    roleEditModal.find('.modal-title').html('编辑角色信息');
    var roleEditForm = $('#roleEditForm');
    roleEditForm.find('#rolename').val(roleName).attr('data-roleid', roleId);
    if (!Utils.isNullorEmpty(roleProfile)) {
        roleEditForm.find('#roleprofile').val(roleProfile);
    }
};

/**
 * 停用角色
 */
htmlObj.leaveTheRole = function (roleId, roleName, roleStatus) {
    //询问框
	var str = roleStatus == 0 ? '启用' : '停用';
    layer.confirm('确定'+str+'【' + roleName + '】这个角色？', {
        btn: ['确定'+str, '取消'] //按钮
    }, function (index) {
        var url = htmlObj.rootUrl + "/authority/role";
        var theJson = {};
        theJson.id = roleId;
        theJson.status = roleStatus;
        $.ajax({
            url: url,
            type: "put",
            data: JSON.stringify(theJson),
            beforeSend: function (request) {
                request.setRequestHeader("Content-Type", "application/json;charset=UTF-8;");
                request.setRequestHeader("authorization", htmlObj.authorization);
            },
            success: function (data) {
                if (data.code == "success") {
                    //刷新角色列表
                    htmlObj.getRoleList();
                    layer.close(index);
                } else {
                    //显示错误信息
                    pageObj.showNotLoginErrorMsg(data.code, data.message);
                }
            }
        });
    }, function (index) {
        layer.close(index);
    });
};

/**
 * 添加角色Modal弹框中需处理的事
 */
htmlObj.initAddRoleHandle = function () {
    //添加角色的表单验证
    htmlObj.validateAddRole();
    $('#roleEditModal').on("hidden.bs.modal", function () {
        htmlObj.resetValide(validatorOfAddRole, $('#roleEditModal'), 'roleEditForm');
        $('#roleEditForm').find('#rolename').attr('data-roleid', '');
        $('#roleEditModal').find('.modal-title').html('新增角色信息');
    });
};

/**
 * 表单验证--添加、编辑角色
 */
htmlObj.validateAddRole = function () {
    validatorOfAddRole = $("#roleEditForm").validate({
        debug: true,
        onfocusout: function (element) {
            $(element).valid();
        },
        onsubmit: function (element) {
            $(element).valid();
        },
        errorPlacement: function (error, element) {
            error.appendTo(element.parent());
        },
        submitHandler: function () {
            var theRoleId = $('#roleEditForm').find('#rolename').attr('data-roleid');
            if (Utils.isNullorEmpty(theRoleId)) {
                //添加角色
                htmlObj.addRole('add');
            } else {
                //修改角色
                htmlObj.addRole('update', theRoleId);
            }
        },
        rules: {
            rolename: {
                required: true
            }
        },
        messages: {
            rolename: {
                required: "请输入角色名称"
            }
        }
    });
};

/**
 * 重置表单validate插件验证信息和样式
 * @param validator
 * @param node
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
 * 重置树的状态,取消选中任何节点，且只展开根节点的第一层子节点
 * @param treeULId
 */
htmlObj.resetTreeToNoSelected = function (treeULId) {
    var theTreeObj = $.fn.zTree.getZTreeObj(treeULId);
    /*var nodesChecked = theTreeObj.getCheckedNodes();
     for (var i = 0; i < nodesChecked.length; i++) {
     theTreeObj.checkNode(nodesChecked[i], false, null, true);
     }*/
    var nodes = theTreeObj.getSelectedNodes();
    for (var i = 0; i < nodes.length; i++) {
        theTreeObj.cancelSelectedNode(nodes[i]);
    }
    theTreeObj.expandAll(false);
    var theRootNode = theTreeObj.getNodeByParam('id', 1, null);
    theTreeObj.expandNode(theRootNode);
};

/**
 * 获取菜单树
 */
htmlObj.getMenuTreeList = function (roleId) {
    $.ajax({
        url: htmlObj.rootUrl + '/authority/resource/tree/list',
        type: 'get',
        beforeSend: function (request) {
            request.setRequestHeader("authorization", htmlObj.authorization);
        },
        success: function (data) {
            if (data.code == "success") {
                var zNodes = data.content;
                //初始化分配菜单modal里的菜单树
                var setting = {
                    check: {
                        enable: true,
                        chkboxType: { "Y" : "ps", "N" : "s" }
                    },
                    data: {
                        simpleData: {
                            enable: true
                        }
                    },
                    view: {
                        dblClickExpand: false
                    },
                    callback: {
                        onClick: htmlObj.onClickMenuDbl,
                        onCheck: htmlObj.onCheckMenuDbl
                    }
                };
                $.fn.zTree.init($("#treeForMenu"), setting, zNodes);
                var treeForMenuObj = $.fn.zTree.getZTreeObj("treeForMenu");
                //展开全部
                treeForMenuObj.expandAll(true);
                //选中这个角色被分配的菜单
                htmlObj.getRoleMenu(roleId);
            } else {
                //显示错误信息
                pageObj.showNotLoginErrorMsg(data.code, data.message);
            }
        }
    });
};

/**
 * 多选人员树的click事件
 * @param e
 * @param treeId
 * @param treeNode
 * @returns {boolean}
 */
htmlObj.onClickMenuDbl = function (e, treeId, treeNode) {
    var zTree = $.fn.zTree.getZTreeObj("treeForMenu");
    zTree.expandNode(treeNode);
    zTree.checkNode(treeNode, !treeNode.checked, null, true);
    return false;
};

/**
 * 多选人员树的check事件
 * @param e
 * @param treeId
 * @param treeNode
 */
htmlObj.onCheckMenuDbl = function (e, treeId, treeNode) {
    var zTree = $.fn.zTree.getZTreeObj("treeForMenu"),
        nodes = zTree.getCheckedNodes(true);
    //重置
    htmlObj.arr = [];
    for (var i = 0, l = nodes.length; i < l; i++) {
        htmlObj.arr.push(nodes[i].id);
    }
};

/**
 * 给当前角色分配菜单
 * @param roleId
 */
htmlObj.toAssignMenu = function (roleId, roleName) {
    var assignMenuModal = $('#assignMenuModal');
    assignMenuModal.modal();
    assignMenuModal.attr('data-currentroleid', roleId);
    assignMenuModal.find('.modal-title').html('给【' + roleName + '】这个角色分配菜单');
    htmlObj.getMenuTreeList(roleId); //初始化菜单树
};

/**
 * 获取这个角色被分配的所有菜单
 * @param roleId
 */
htmlObj.getRoleMenu = function (roleId) {
    $.ajax({
        url: htmlObj.rootUrl + '/authority/resource/role/resources?roleId=' + roleId + '&pageNum=0&pageSize=0',
        type: 'get',
        beforeSend: function (request) {
            request.setRequestHeader("authorization", htmlObj.authorization);
        },
        success: function (data) {
            if (data.code == "success") {
                var content = data.content;
                var treeForMenuObj = $.fn.zTree.getZTreeObj("treeForMenu");
                for (var i = 0; i < content.length; i++) {
                    //放入全局
                    htmlObj.arr.push(content[i].id);
                    var theNode = treeForMenuObj.getNodeByParam('id', content[i].id, null);
                    treeForMenuObj.checkNode(theNode, true, null, true);
                }
            } else {
                //显示错误信息
                pageObj.showNotLoginErrorMsg(data.code, data.message);
            }
        }
    });
};

/**
 * 初始化
 */
htmlObj.init = function () {
    htmlObj.getRoleList(); //获取角色分页列表
    //多条件查询
    $('#btnSearchRole').on('click', function () {
        htmlObj.getRoleList(); //获取角色分页列表
    });
    //新增角色
    $('#btnAddRole').on('click', function () {
        $('#roleEditModal').modal();
    });
    //编辑角色
    $('#roleList').on('click', '.edit-roles', function () {
        htmlObj.toRoleDetail($(this));
    })
    htmlObj.initAddRoleHandle(); //初始化添加角色Modal处理事项
    //点击分配菜单modal的确定
    $('.btn-assignmenu').on('click', function () {
        var theArr = htmlObj.arr;
        if (theArr.length < 1) {
            layer.msg("请勾选菜单！");
        } else {
            var theJson = [];
            for (var i = 0; i < theArr.length; i++) {
                theJson.push({'resourceId': theArr[i], 'roleId': $('#assignMenuModal').attr('data-currentroleid')});
            }
            var url = htmlObj.rootUrl + "/authority/role/resource/batch";
            $.ajax({
                url: url,
                type: 'put',
                data: JSON.stringify(theJson),
                beforeSend: function (request) {
                    request.setRequestHeader("Content-Type", "application/json;charset=UTF-8;");
                    request.setRequestHeader("authorization", htmlObj.authorization);
                },
                success: function (data) {
                    if (data.code == "success") {
                        $('#assignMenuModal').modal('hide');
                        treeForMenuObj.expandAll(true);
                        treeForMenuObj.checkAllNodes(false);
                    } else {
                        //显示错误信息
                        pageObj.showNotLoginErrorMsg(data.code, data.message);
                    }
                }
            });
        }
    });
    //分配菜单modal的关闭事件
    $('#assignMenuModal').on("hidden.bs.modal", function () {
        //重置菜单树
        htmlObj.resetTreeToNoSelected('treeForMenu');
    });
};

$(function () {
    htmlObj.init();
});