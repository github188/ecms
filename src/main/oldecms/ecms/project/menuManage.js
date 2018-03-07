/**
 * 组织架构-菜单管理
 * @author:何凡凡
 * @time:2017-04-23
 */

var htmlObj = {};
htmlObj.rootUrl = appHost + approot;
var validatorOfAddMenu; //添加菜单form的validate对象
htmlObj.authorization = Utils.getValue('authorization'); //获取登录人的userId和Token


/**
 * 获取&nbsp;的个数
 * */
htmlObj.npfunc = function (n) {
    var p = "";
    if (n == 0) {
        //如果是第一层，就不加分级线
        return p;
    } else {
        for (var j = 0; j < n * 2; j++) {
            p += "&nbsp;";
        }
        return p + "|__";
    }
};

/**
 *权限类型选择
 */
htmlObj.authority = function () {
    var str = '<div class="form-group"><label class="control-label">菜单图标</label><input type="text" class="form-control" id="setMenuIcon" name="setMenuIcon"></div>';
    var menuIcon = $('#menuIcon');
  $('#nametype').on('change', function () {
      if($(this).val() == '0'){
          menuIcon.html(str);
      }else{
          menuIcon.empty();
      }
  }).trigger('change');
};
/**
 * 获取菜单分页列表
 */
htmlObj.getMenuList = function () {
    var cmd = new CommandAjax(htmlObj.rootUrl + "/authority/resource/list", htmlObj.authorization);
    var keywords = $("#keywords").val().trimAll();
    var restype = $("#restype").val();
    if (!Utils.isNullorEmpty(keywords)) {
        cmd.name = keywords;
    }
    if (!Utils.isNullorEmpty(restype)) {
        cmd.restype = restype;
    }
    $('#menuList').datagrid({
        columns: [{
            display: '菜单名称',
            align: 'left',
            width: '180px',
            render: function (row) {
                var name = row.name,
                    degree = row.degree,
                    np = '';
                if (!Utils.isNullorEmpty(degree)) {
                    np = htmlObj.npfunc(degree);
                }
                return np + name;
            }
        }, {
            display: '菜单类型',
            width: '100px',
            align: 'center',
            render: function (row) {
                var type = row.type;
                if (type == 0) {
                    return '模块';
                } else if (type == 1) {
                    return '页面';
                } else if (type == 2) {
                    return '操作';
                }
            }
        }, {
            display: '菜单内容',
            name: 'url',
            width: '280px',
            align: 'left'
        }, {
            display: '上级菜单节点',
            width: '180px',
            align: 'center',
            render: function (row) {
                var parentId = row.parentId;
                if (!Utils.isNullorEmpty(parentId)) {
                    return parentId;
                } else {
                    return '【一级菜单】';
                }
            }
        }
            /*, {
             display: '所属模块',
             width: '120px',
             align: 'center',
             render: function (row) {
             var appId = row.appId, appName = '';
             if (!Utils.isNullorEmpty(appId)) {
             switch (appId) {
             case 'pmo':
             appName = 'PMO';
             break;
             case '组织架构':
             appName = '组织架构';
             break;
             case '一级模块':
             appName = '直属OA';
             break;
             }
             }
             return appName;
             }
             }*/, {
                display: '状态',
                align: 'center',
                width: '100px',
                render: function (row) {
                    var status = row.status;
                    if (status == 0) {
                        return '启用';
                    } else if (status == 1) {
                        return '停用';
                    }
                }
            }, {
                display: '操作',
                width: '180px',
                align: 'center',
                render: function (row) {
                    var id = row.id,
                        name = row.name,
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
                    rowHtml += '<a class="oprate" title="编辑" href="javascript:void(0);" onclick="htmlObj.toMenuDetail(\'' + id + '\')">编辑</a>' +
                        '<a class="oprate" title="' + statusName + '" href="javascript:void(0);" onclick="htmlObj.leaveTheMenu(\'' + id + '\',\'' + name + '\',\'' + status + '\')">' + statusName + '</a>';
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
 * 获取菜单树
 */
htmlObj.getMenuTreeList = function () {
    $.ajax({
        url: htmlObj.rootUrl + '/authority/resource/tree/list',
        type: 'get',
        beforeSend: function (request) {
            request.setRequestHeader("authorization", htmlObj.authorization);
        },
        success: function (data) {
            if (data.code == "success") {
                var zNodes = data.content;
                //初始化添加菜单modal里的菜单树
                var setting = {
                    data: {
                        simpleData: {
                            enable: true
                        }
                    },
                    view: {
                        dblClickExpand: false
                    },
                    callback: {
                        onClick: htmlObj.onClickTreeForMenu
                    }
                };
                $.fn.zTree.init($("#treeForMenu"), setting, zNodes);
                var treeForMenuObj = $.fn.zTree.getZTreeObj("treeForMenu");
                var theRootNode = treeForMenuObj.getNodeByParam('id', 1, null);
                treeForMenuObj.expandNode(theRootNode);
            } else {
                //显示错误信息
                pageObj.showNotLoginErrorMsg(data.code, data.message);
            }
        }
    });
};

/**
 * 菜单树的click事件
 * @param e
 * @param treeId
 * @param treeNode
 * @returns {boolean}
 */
htmlObj.onClickTreeForMenu = function (e, treeId, treeNode) {
    var zTree = $.fn.zTree.getZTreeObj("treeForMenu");
    zTree.expandNode(treeNode);
    if (treeNode.children.length <= 0) {
        zTree.checkNode(treeNode, !treeNode.checked, null, true);
    }
    //点击后，获取选中的，赋值给部门文本框，再隐藏树
    $('#mParentName').val(treeNode.name).attr('data-parentid', treeNode.id).blur();
    $('.menu-contain').hide();
    return false;
};

/**
 * 添加、修改菜单
 */
htmlObj.addMenu = function (whichHandle, menuId) {
    var url = htmlObj.rootUrl + "/authority/resource";
    var theJson = {};
    var theRequestMethod = "post";
    var editMenuModal = $('#editMenuModal');
    theJson.name = $('#mName').val().replace(/\s/g, "");//去掉空格
    theJson.url = $('#mUrl').val().replace(/\s/g, "");
    // theJson.appId = $('#mAppId').val();
    theJson.icon = $('#setMenuIcon').val();
    theJson.type = $('#nametype').val();
    theJson.parentId = $('#mParentName').attr('data-parentid');
    if (whichHandle == "update") {
        theJson.id = menuId;
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
                editMenuModal.modal('hide');
                htmlObj.resetValide(validatorOfAddMenu, editMenuModal, 'editMenuForm');
                //刷新菜单列表
                htmlObj.getMenuList();
            } else {
                //显示错误信息
                pageObj.showNotLoginErrorMsg(data.code, data.message);
            }
        }
    });
};

/**
 * 显示菜单详情
 * @param menuId
 */
htmlObj.toMenuDetail = function (menuId) {
    $.ajax({
        url: htmlObj.rootUrl + '/authority/resource/' + menuId + '/detail',
        type: 'get',
        beforeSend: function (request) {
            request.setRequestHeader("authorization", htmlObj.authorization);
        },
        success: function (data) {
            if (data.code == 'success') {
                var content = data.content;
                var editMenuForm = $('#editMenuForm');
                editMenuForm.find('#mName').val(content.name).attr('data-menuid', menuId);
                editMenuForm.find('#mUrl').val(content.url);

                editMenuForm.find('#mParentName').val(content.parentName).attr('data-parentid', content.parentId);
                editMenuForm.find('#mAppId').find('option').each(function () {
                    var that = $(this);
                    if (that.val() == content.appId) {
                        that.attr("selected", true);
                    }
                });
                editMenuForm.find('#nametype').find('option').each(function () {
                    var that = $(this);
                    if (that.val() == content.type) {
                        that.attr("selected", true);
                        if(content.type == 0){
                            var str = '<div class="form-group"><label class="control-label">菜单图标</label><input type="text" class="form-control" id="setMenuIcon" name="setMenuIcon"></div>';
                            var menuIcon = $('#menuIcon');
                            if ($(this).val() == '0') {
                                menuIcon.html(str);
                            } else {
                                menuIcon.empty();
                            }
                        }
                        editMenuForm.find('#setMenuIcon').val(content.icon);
                    }
                });

            } else {
                //显示错误信息
                pageObj.showNotLoginErrorMsg(data.code, data.message);
            }
        }
    });
    var editMenuModal = $('#editMenuModal');
    editMenuModal.modal();
    editMenuModal.find('.modal-title').html('编辑基础菜单');
};

/**
 * 停用菜单
 */
htmlObj.leaveTheMenu = function (menuId, menuName, menuStatus) {
    //询问框
    layer.confirm('确定停用【' + menuName + '】的信息？', {
        btn: ['确定停用', '取消'] //按钮
    }, function (index) {
        var url = htmlObj.rootUrl + "/authority/resource";
        var theJson = {};
        theJson.id = menuId;
        theJson.status = menuStatus;
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
                    //刷新菜单列表
                    htmlObj.getMenuList();
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
 * 添加菜单Modal弹框中需处理的事
 */
htmlObj.initAddMenuHandle = function () {
    //添加菜单的表单验证
    htmlObj.validateAddMenu();
    $('#editMenuModal').on("hidden.bs.modal", function () {
        htmlObj.resetValide(validatorOfAddMenu, $('#editMenuModal'), 'editMenuForm');
        $('#editMenuForm').find('#mName').attr('data-menuid', '');
        //重置菜单树
        htmlObj.resetTreeToNoSelected('treeForMenu');
        $('#editMenuModal').find('.modal-title').html('新增基础菜单');
    });
    //获取菜单树
    htmlObj.getMenuTreeList();
    //点击上级菜单节点input
    $('#mParentName').on('click', function () {
        $('.menu-contain').show();
        //刷新菜单树
        htmlObj.getMenuTreeList();
    });
    //关闭菜单layout
    $('#closeMenuTree').on('click', function () {
        $('.menu-contain').hide();
    });
    // //选择菜单图标
    // $('#mIcon').on('click', function () {
    //     $('#menuIconModal').modal();
    //     $('#editMenuModal').addClass('z-index20');
    // });
    // $('#iconList').find('span').each(function () {
    //     $(this).on('click', function () {
    //         $('#mIcon').val($(this).text());
    //         $('#menuIconModal').modal('hide');
    //         $('#editMenuModal').removeClass('z-index20');
    //     });
    // });
    // //选择图标modal的关闭事件
    // $('#menuIconModal').on("hidden.bs.modal", function () {
    //     $('#editMenuModal').removeClass('z-index20');
    // });
};

/**
 * 表单验证--添加、编辑菜单
 */
htmlObj.validateAddMenu = function () {
    validatorOfAddMenu = $("#editMenuForm").validate({
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
            var theMenuId = $('#editMenuForm').find('#mName').attr('data-menuid');
            if (Utils.isNullorEmpty(theMenuId)) {
                //添加菜单
                htmlObj.addMenu('add');
            } else {
                //修改菜单
                htmlObj.addMenu('update', theMenuId);
            }
        },
        rules: {
            mName: {
                required: true
            }, mParentName: {
                required: true
            }, mAppId: {
                required: true
            }, nametype: {
                required: true
            },setMenuIcon: {
                required: true
            }
        },
        messages: {
            mName: {
                required: "请输入菜单名称"
            }, mParentName: {
                required: "请选择上级节点"
            }, mAppId: {
                required: "请选择所属模块"
            }, nametype: {
                required: "请选择权限类型"
            },setMenuIcon: {
                required: "请输入菜单图标名"
            }
        }
    });
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

htmlObj.init = function () {
    htmlObj.getMenuList(); //获取菜单分页列表
    htmlObj.authority();
    //多条件查询
    $('#btnSearchMenu').on('click', function () {
        htmlObj.getMenuList(); //获取菜单分页列表
    });
    //新增菜单
    $('#btnAddMenu').on('click', function () {
        $('#editMenuModal').modal();
    });
    htmlObj.initAddMenuHandle(); //初始化添加菜单Modal处理事项
};

$(function () {
    htmlObj.init();
});