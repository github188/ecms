/**
 * 组织架构
 * @author：何凡凡
 * @time：2017-04-19
 */

var htmlObj = {};
htmlObj.rootUrl = appHost + approot;
htmlObj.personClickfrom = '';  // 标识从哪里的文本框点击出来的单选人员modal
var validatorOfAddPerson; //添加用户form的validate对象
var validatorOfAddDep; //添加部门form的validate对象
var validatorOfEditDep; //编辑部门的validate对象
var roleCheckedArray = []; //存储选中的角色对象
htmlObj.authorization = Utils.getValue('authorization'); //获取登录人的userId和Token
htmlObj.userPicId = 'skins/img/man-default.png'; //存储用户选择图像上传到后台时，后台返回的picId
htmlObj.checkCollection = {};  //用于存放复选框选中的数据
/**
 * 获取部门列表
 */
htmlObj.getDepartTreeList = function () {
    $.ajax({
        url: htmlObj.rootUrl + '/authority/dep/tree/list',
        type: 'get',
        beforeSend: function (request) {
            request.setRequestHeader("authorization", htmlObj.authorization);
        },
        success: function (data) {
            if (data.code == "success") {
                var zNodes = data.content;
                //初始化人员管理页面左侧的部门树
                var setting1 = {
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
                        onClick: htmlObj.onClickDepart
                    }
                };
                $.fn.zTree.init($("#treeDepart"), setting1, zNodes);
                var treeDepartObj = $.fn.zTree.getZTreeObj("treeDepart");
                treeDepartObj.expandAll(true);

                //初始化添加用户modal里的部门树
                var setting2 = {
                    data: {
                        simpleData: {
                            enable: true
                        }
                    },
                    view: {
                        dblClickExpand: false
                    },
                    callback: {
                        onClick: htmlObj.onClickDepartForAddPer
                    }
                };
                $.fn.zTree.init($("#treeDepartForAddPer"), setting2, zNodes);
                var treeDepartForAddPerObj = $.fn.zTree.getZTreeObj("treeDepartForAddPer");
                var theRootNode = treeDepartForAddPerObj.getNodeByParam('id', 1, null);
                treeDepartForAddPerObj.expandNode(theRootNode);

                //初始化添加部门modal里的部门树
                var setting3 = {
                    data: {
                        simpleData: {
                            enable: true
                        },
                        keep: {
                            parent: true
                        }
                    },
                    view: {
                        dblClickExpand: false,
                        selectedMulti: false
                    },
                    callback: {
                        onClick: htmlObj.onClickDepartForSuperiorAdd
                    }
                };
                $.fn.zTree.init($("#treeDepartForSuperiorAdd"), setting3, zNodes);
                var treeDepartForSuperiorAdd = $.fn.zTree.getZTreeObj("treeDepartForSuperiorAdd");
                var theRootNode = treeDepartForSuperiorAdd.getNodeByParam('id', 1, null);
                treeDepartForSuperiorAdd.expandNode(theRootNode);

                //初始化添加部门modal里的部门树
                var setting4 = {
                    data: {
                        simpleData: {
                            enable: true
                        }
                    },
                    view: {
                        dblClickExpand: false
                    },
                    callback: {
                        onClick: htmlObj.onClickDepartForSuperiorEdit
                    }
                };
                $.fn.zTree.init($("#treeDepartForSuperiorEdit"), setting4, zNodes);
                var treeDepartForSuperiorEdit = $.fn.zTree.getZTreeObj("treeDepartForSuperiorEdit");
                var theRootNode = treeDepartForSuperiorEdit.getNodeByParam('id', 1, null);
                treeDepartForSuperiorEdit.expandNode(theRootNode);

                //初始化部门操作modal中的部门树
                var setting5 = {
                    /*edit: {
                     drag: {
                     autoExpandTrigger: true,
                     prev: true,
                     inner: true,
                     next: true
                     },
                     enable: true,
                     showRemoveBtn: false,
                     showRenameBtn: false
                     },*/
                    data: {
                        simpleData: {
                            enable: true
                        }
                    },
                    view: {
                        dblClickExpand: false
                    },
                    callback: {
                        onClick: htmlObj.onClickDepartForHandle
                        /*,
                         beforeDrag: beforeDrag,
                         beforeDrop: beforeDrop*/
                    }
                };
                $.fn.zTree.init($("#treeDepartForHandle"), setting5, zNodes);
                var treeDepartForHandleObj = $.fn.zTree.getZTreeObj("treeDepartForHandle");
                treeDepartForHandleObj.expandAll(true);
                /*//设置禁止根节点下的子节点移出到根节点外
                 var rootNode = treeDepartForHandleObj.getNodeByParam('id', 1, null);
                 rootNode.childOuter = false;*/

                var setting6 = {
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
                        onClick: htmlObj.moveDepartment
                    }
                };
                $.fn.zTree.init($("#treeDepartForMove"), setting6, zNodes);
                var treeDepartForMove = $.fn.zTree.getZTreeObj("treeDepartForMove");
                treeDepartForMove.expandAll(true);


            } else {
                //显示错误信息
                pageObj.showNotLoginErrorMsg(data.code, data.message);
            }
        }
    });
};

/*function beforeDrag(treeId, treeNodes) {
 for (var i=0,l=treeNodes.length; i<l; i++) {
 if (treeNodes[i].drag === false) {
 return false;
 }
 }
 return true;
 }
 function beforeDrop(treeId, treeNodes, targetNode, moveType) {
 return targetNode ? targetNode.drop !== false : true;
 }*/

/**
 * 部门树的click事件
 * @param e
 * @param treeId
 * @param treeNode
 * @returns {boolean}
 */
htmlObj.onClickDepart = function (e, treeId, treeNode) {
    var zTree = $.fn.zTree.getZTreeObj("treeDepart");
    if (!treeNode.open) {
        zTree.expandNode(treeNode);
    }
    if (treeNode.children.length <= 0) {
        zTree.checkNode(treeNode, !treeNode.checked, null, true);
    }
    //加载该部门下的所有人
    htmlObj.getPersonListByDepId(treeNode.id);
    $('#treeDepart').attr('data-currentdepid', treeNode.id).attr('data-currentdepname', treeNode.name);
    htmlObj.searchFrom = 'deptree';
    return false;
};

/**
 * 部门树的click事件
 * @param e
 * @param treeId
 * @param treeNode
 * @returns {boolean}
 */
htmlObj.onClickDepartForAddPer = function (e, treeId, treeNode) {
    var zTree = $.fn.zTree.getZTreeObj("treeDepartForAddPer");
    // zTree.expandNode(treeNode);
    zTree.checkNode(treeNode, !treeNode.checked, null, true);
    //点击后，获取选中的，赋值给部门文本框，再隐藏树
    $('#basicInfoTab').find('.p-depart').val(treeNode.name).attr('data-currentdepid', treeNode.id).blur();
    $('#DepartForAddPerPanel').hide();
    return false;
};

/**
 * 部门树的click事件
 * @param e
 * @param treeId
 * @param treeNode
 * @returns {boolean}
 */
htmlObj.onClickDepartForSuperiorAdd = function (e, treeId, treeNode) {
    var zTree = $.fn.zTree.getZTreeObj("treeDepartForSuperiorAdd");
    if (!treeNode.open) {
        zTree.expandNode(treeNode);
    }
    if (treeNode.children.length <= 0) {
        zTree.checkNode(treeNode, !treeNode.checked, null, true);
    }
    //点击后，获取选中的，赋值给部门文本框，再隐藏树
    $('#addDepForm').find('.dep-parentname').val(treeNode.name).attr('data-currentdepid', treeNode.id).blur();
    $('#DepartForSuperiorAddPanel').hide();
    return false;
};

/**
 * 部门树的click事件
 * @param e
 * @param treeId
 * @param treeNode
 * @returns {boolean}
 */
htmlObj.onClickDepartForSuperiorEdit = function (e, treeId, treeNode) {
    var zTree = $.fn.zTree.getZTreeObj("treeDepartForSuperiorEdit");
    if (!treeNode.open) {
        zTree.expandNode(treeNode);
    }
    if (treeNode.children.length <= 0) {
        zTree.checkNode(treeNode, !treeNode.checked, null, true);
    }
    //点击后，获取选中的，赋值给部门文本框，再隐藏树
    $('#editDepForm').find('.dep-parentname').val(treeNode.name).attr('data-currentdepid', treeNode.id).blur();
    $('#DepartForSuperiorEditPanel').hide();
    return false;
};

/**
 * 部门树的click事件
 * @param e
 * @param treeId
 * @param treeNode
 * @returns {boolean}
 */
htmlObj.onClickDepartForHandle = function (e, treeId, treeNode) {
    var zTree = $.fn.zTree.getZTreeObj("treeDepartForHandle");
    if (!treeNode.open) {
        zTree.expandNode(treeNode);
    }
    if (treeNode.children.length <= 0) {
        zTree.checkNode(treeNode, !treeNode.checked, null, true);
    }
    //点击后，获取选中的，然后可以点击编辑/删除按钮 进行相关操作
    $('#treeDepartForHandle').attr('data-currentdepid', treeNode.id).attr('data-currentdepname', treeNode.name).blur();
    return false;
};
/**
 // 备用代码 -- 选择组织架构中的人员
 /!**
 * 获取人员组织架构
 *!/
 htmlObj.getPersonTreeList = function () {
    $.ajax({
        url: htmlObj.rootUrl + '/authority/user/userdept/tree/check',
        type: 'get',
         beforeSend: function (request) {
            request.setRequestHeader("authorization", htmlObj.authorization);
        },
        success: function (data) {
            if (data.code == "success") {
                var zNodes = data.content;
                //初始化人员组织架构树--添加用户的直接上级
                var setting1 = {
                    data: {
                        simpleData: {
                            enable: true
                        }
                    },
                    view: {
                        dblClickExpand: false
                    },
                    callback: {
                        onClick: htmlObj.onClickImmediateSuperior
                    }
                };
                $.fn.zTree.init($("#treeImmediateSuperior"), setting1, zNodes);

                //初始化人员组织架构树--添加部门的部门负责人
                var setting2 = {
                    data: {
                        simpleData: {
                            enable: true
                        }
                    },
                    view: {
                        dblClickExpand: false
                    },
                    callback: {
                        onClick: htmlObj.onClickDepLeaderForAddDep
                    }
                };
                $.fn.zTree.init($("#treeDepLeaderForAddDep"), setting2, zNodes);

                //初始化人员组织架构树--编辑部门的部门负责人
                var setting3 = {
                    data: {
                        simpleData: {
                            enable: true
                        }
                    },
                    view: {
                        dblClickExpand: false
                    },
                    callback: {
                        onClick: htmlObj.onClickDepLeaderForEditDep
                    }
                };
                $.fn.zTree.init($("#treeDepLeaderForEditDep"), setting3, zNodes);

            } else {
                //显示错误信息
                pageObj.showNotLoginErrorMsg(data.code,data.message);
            }
        }
    });
};

 /!**
 * 人员组织架构树的点击事件--添加用户的直接上级
 * @param e
 * @param treeId
 * @param treeNode
 * @returns {boolean}
 *!/
 htmlObj.onClickImmediateSuperior = function (e, treeId, treeNode) {
    var zTree = $.fn.zTree.getZTreeObj("treeImmediateSuperior");
    zTree.expandNode(treeNode);
    if (treeNode.children.length <= 0) {
        zTree.checkNode(treeNode, !treeNode.checked, null, true);
        //点击后，获取选中的，赋值给被点击的文本框，再隐藏树
        $('#basicInfoTab').find('.p-superior').val(treeNode.name).attr('data-personid', treeNode.id).blur();
        $('#ImmediateSuperiorPanel').hide();
    }
    return false;
};

 /!**
 * 人员组织架构树的点击事件--添加部门的部门负责人
 * @param e
 * @param treeId
 * @param treeNode
 * @returns {boolean}
 *!/
 htmlObj.onClickDepLeaderForAddDep = function (e, treeId, treeNode) {
    var zTree = $.fn.zTree.getZTreeObj("treeDepLeaderForAddDep");
    zTree.expandNode(treeNode);
    if (treeNode.children.length <= 0) {
        zTree.checkNode(treeNode, !treeNode.checked, null, true);
        //点击后，获取选中的，赋值给被点击的文本框，再隐藏树
        $('#addDepForm').find('.dep-leader').val(treeNode.name).attr('data-personid', treeNode.id).blur();
        $('#DepLeaderForAddDepPanel').hide();
    }
    return false;
};

 /!**
 * 人员组织架构树的点击事件--编辑部门的部门负责人
 * @param e
 * @param treeId
 * @param treeNode
 * @returns {boolean}
 *!/
 htmlObj.onClickDepLeaderForEditDep = function (e, treeId, treeNode) {
    var zTree = $.fn.zTree.getZTreeObj("treeDepLeaderForEditDep");
    zTree.expandNode(treeNode);
    if (treeNode.children.length <= 0) {
        zTree.checkNode(treeNode, !treeNode.checked, null, true);
        //点击后，获取选中的，赋值给被点击的文本框，再隐藏树
        $('#editDepForm').find('.dep-leader').val(treeNode.name).attr('data-personid', treeNode.id).blur();
        $('#DepLeaderForEditDepPanel').hide();
    }
    return false;
};
 */

/**
 * 获取部门负责人，列表形式展现且可模糊搜索
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

};


//选择部门负责人modal的关闭事件
$('#chooseDepLeaderModal').on("hidden.bs.modal", function () {
    $('#addPersonModal').removeClass('z-index20');
    $('#editDepModal').removeClass('z-index20');
    $('#addDepModal').removeClass('z-index20');
    $('#chooseDepLeaderModal .modal-title').text('选择部门负责人');
    $('#btnSearchDepLeader').off('click');
});

$('#chooseDepLeaderModal').on("show.bs.modal", function () {
    //模糊查询点击事件
    $('#btnSearchDepLeader').on('click', function () {
        htmlObj.getDepLeaderList();
    });
})


/**
 * 获取选择的负责人，并显示到来源input
 * @param personId
 */
htmlObj.chooseLeader = function (personId, personName) {
    switch (htmlObj.personClickfrom) {
        case 'addDep':
            $('#addDepForm').find('.dep-leader').val(personName).attr('data-personid', personId).blur();
            $('#addDepModal').removeClass('z-index20');
            break;
        case 'editDep':
            $('#editDepForm').find('.dep-leader').val(personName).attr('data-personid', personId).blur();
            $('#editDepModal').removeClass('z-index20');
            break;
        case 'addPer':
            $('#basicInfoTab').find('.p-superior').val(personName).attr('data-personid', personId).blur();
            $('#addPersonModal').removeClass('z-index20');
            break;
        case 'appointLeader':
            htmlObj.appointLeader(personId, personName);

    }
    $('#chooseDepLeaderModal').modal('hide');
    $('#queryKD').val('');
    //重新初始化所有人员分页list
    htmlObj.getDepLeaderList();
};

/**
 * 通过部门id获取部门人员列表
 */
htmlObj.getPersonListByDepId = function (depId, fromInit) {
    var cmd = new CommandAjax(htmlObj.rootUrl + "/authority/user/dep/" + depId, htmlObj.authorization);
    var personKD = $('#personKD').val();
    if (!Utils.isNullorEmpty(personKD)) {
        cmd.queryInfo = personKD;
    }
    $("#personlist").datagrid({
        columns: [{
            display: "姓名",
            width: "100px",
            align: "center",
            render: function (row) {
                var id = row.id,
                    realname = row.realname,
                    rowHtml = '';
                rowHtml += '<a data-id='+id+' class="check-detail oprate" title="进入详情" href="javascript:void(0);" onclick="htmlObj.toPerDetail(\'' + id + '\',\'personDetailModal\')">' + realname + '</a>';
                return rowHtml;
            }
        }, {
            display: "工号",
            name: "usercode",
            width: "40px",
            align: "center"
        }, {
            display: "岗位名称",
            name: "post",
            width: "160px",
            align: "center"
        }, {
            display: "手机",
            name: "phone",
            width: "80px",
            align: "center"
        }, {
            display: "操作",
            width: "240px",
            align: "center",
            render: function (row) {
                var id = row.id,
                    realname = row.realname,
                    isLeave = row.isLeave,
                    isLeaveName = '',
                    rowHtml = '';
                if (isLeave == 0) {
                    //这里要反过来，因为状态已经是启用中，else里面同理
                    isLeaveName = '停用';
                    isLeave = 1;
                } else {
                    isLeaveName = '启用';
                    isLeave = 0;
                }
                rowHtml += '<a class="oprate" title="详情" href="javascript:void(0);" onclick="htmlObj.toPerDetail(\'' + id + '\',\'personDetailModal\')">详情</a>' +
                    '<a class="oprate" title="编辑" href="javascript:void(0);" onclick="htmlObj.toPerDetail(\'' + id + '\',\'addPersonModal\')">编辑</a>' +
                    '<a class="oprate" title="' + isLeaveName + '" href="javascript:void(0);" onclick="htmlObj.leavePerson(\'' + id + '\',\'' + realname + '\',' + isLeave + ')">' + isLeaveName + '</a>' +
                    '<a class="oprate" title="角色权限" href="javascript:void(0);" onclick="htmlObj.toRoleAuthority(\'' + id + '\')">角色权限</a>' +
                    '<a class="oprate" title="重置密码" href="javascript:void(0);" onclick="htmlObj.resetPassword(\'' + id + '\')">重置密码</a>';

                return rowHtml;
            }
        }],
        reqdata: cmd,
        isShowCheckBox: true,
        rowNumber: false,
        onResponse: function (data) {
            return data;
        },
        onComplete: function (data) {
            if (data.code != 'success') {
                //显示错误信息
                pageObj.showNotLoginErrorMsg(data.code, data.message);
            } else {
                var theDepName = $('#treeDepart').attr('data-currentdepname');
                var currentDepMsg = $('#currentDepMsg');
                if (!Utils.isNullorEmpty(theDepName)) {
                    if (!Utils.isNullorEmpty($('#personKD').val())) {
                        if (data.totals > 0) {
                            currentDepMsg.html('搜索结果：（共' + data.totals + '人）');
                        } else {
                            currentDepMsg.html('搜索结果：（暂无人员）');
                        }
                    } else {
                        if (data.totals > 0) {
                            currentDepMsg.html(theDepName + '（共' + data.totals + '人）');
                        } else {
                            currentDepMsg.html(theDepName + '（暂无人员）');
                        }
                    }
                } else {
                    if (!Utils.isNullorEmpty(fromInit) && fromInit == 'init') {
                        if (data.totals > 0) {
                            currentDepMsg.html('亿车全体：（共' + data.totals + '人）');
                        } else {
                            currentDepMsg.html('亿车全体：（暂无人员）');
                        }
                    } else {
                        if (data.totals > 0) {
                            currentDepMsg.html('搜索结果：（共' + data.totals + '人）');
                        } else {
                            currentDepMsg.html('搜索结果：（暂无人员）');
                        }
                    }
                }
                currentDepMsg.show();
            }
            var checkOne = $('#personlist input.checkone');
            var checkAll = $('#personlist input.checkall');

            //放置下拉全选所有
            // checkAll.parents('th').width(60).append('<span class="fa-angle-down choose-all-data"><a>全选所有数据</a></span>');
            // $('.choose-all-data').hover(function () {
            //     $(this).find('a').show();
            // }, function () {
            //     $(this).find('a').hide();
            // });


            var checkCollection = htmlObj.checkCollection;
            var allCheckDetail = $('.dataTable .check-detail');

            allCheckDetail.each(function(index, ele){
                var id = $(ele).attr('data-id');
                for(var item in checkCollection){
                    if(item == id){
                        $(ele).parents('tr').find('input[type=checkbox]').prop('checked', true);
                    }
                }
                if(allCheckDetail.length == $('#personlist input.checkone:checked').length){
                    checkAll.prop('checked', true);
                }else{
                    checkAll.prop('checked', false);
                }
            });

            var doCheck = function () {
                var length = Object.getOwnPropertyNames(checkCollection).length;

                $('#currentDepMsg').text('当前已选中（'+ length +'）条数据');
                if(length == 0){
                    $('#manyOperate').hide();
                }else{
                    $('#manyOperate').show();
                }

            };


            checkOne.on('click', function () {  //单个选取
                var checked = $('#personlist input.checkone:checked');
                var id = $(this).parents('tr').find('.check-detail').attr('data-id');
                if(checked.length == checkOne.length){
                    checkAll.prop('checked', true);
                }else{
                    checkAll.prop('checked', false);
                }
                checkOne.each(function (a, b) {
                    var checkOneId = $(b).parents('tr').find('.check-detail').attr('data-id');
                    if($(b).prop('checked')){
                        checkCollection[checkOneId] = checkOneId;
                    }else{
                        delete  checkCollection[checkOneId]
                    }
                });
                doCheck();

            });
            checkAll.on('click', function () {  //多个选取
                checkOne.each(function (a, b) {
                    var checkOneId = $(b).parents('tr').find('.check-detail').attr('data-id');
                    if($('#personlist input.checkall:checked').length == 0){
                        delete  checkCollection[checkOneId]
                        $(b).prop('checked', false)
                    }else{
                        checkCollection[checkOneId] = checkOneId;
                        $(b).prop('checked', true)
                    }
                });
                doCheck();
            });
        }
    });
};
/**
 * 重置密码
 */
htmlObj.resetPassword = function (userId) {
    layer.confirm('确定要重置该用户的登陆密码吗？', {
        btn: ['确定', '取消'] //按钮
    }, function (index) {
        $.ajax({
            url: htmlObj.rootUrl + '/authority/user/update/restart',
            type: 'put',
            beforeSend: function (request) {
                request.setRequestHeader("authorization", htmlObj.authorization);
                request.setRequestHeader("Content-Type", "application/json;charset=UTF-8;");
            },
            data: JSON.stringify({
                id: userId
            }),
            success: function (data) {

                if (data.code !== "success") {
                    layer.msg(data.messages);
                }else{
                    layer.msg('操作成功！');
                    layer.close(index);
                }
            }
        });

    }, function (index) {
        layer.close(index);
    });
};
/**
 * 新增 / 修改 用户
 * @param whichHandle
 * @param personId
 */
htmlObj.addPerson = function (whichHandle, personId) {
    var theJson = {};
    var theRequestMethod = "post";
    var addPersonModal = $('#addPersonModal');
    theJson.realname = addPersonModal.find('.p-name').val().replace(/\s/g, "");//去掉空格
    theJson.usercode = addPersonModal.find('.p-jobnum').val().replace(/\s/g, "");
    theJson.phone = addPersonModal.find('.p-tel').val().replace(/\s/g, "");
    theJson.sex = addPersonModal.find("input[name='pSex']:checked").val();
    theJson.depId = addPersonModal.find('.p-depart').attr('data-currentdepid');
    theJson.post = addPersonModal.find('.p-position').val().replace(/\s/g, "");
    theJson.username = addPersonModal.find('.p-email').val().replace(/\s/g, "") + '@ecaray.com';
    theJson.email = addPersonModal.find('.p-email').val().replace(/\s/g, "") + '@ecaray.com';
    theJson.professLevel = addPersonModal.find('.p-professionalrank').val();
    theJson.manageLevel = addPersonModal.find('.p-managerank').val();
    theJson.idcard = addPersonModal.find('.p-birthday').val();
    theJson.directLeader = addPersonModal.find('.p-superior').attr('data-personid');
    theJson.address = addPersonModal.find('.p-usualplace').val().replace(/\s/g, "");
    theJson.headPic = htmlObj.userPicId; //图像
    if (whichHandle == "update") {
        theJson.id = personId;
        theRequestMethod = "put";
    }
    layer.load(1, {
        shade: [0.5,'#000']
    });
    $.ajax({
        url: htmlObj.rootUrl + '/authority/user',
        type: theRequestMethod,
        data: JSON.stringify(theJson),
        beforeSend: function (request) {
            request.setRequestHeader("Content-Type", "application/json;charset=UTF-8;");
            request.setRequestHeader("authorization", htmlObj.authorization);
        },
        success: function (data) {
            if (data.code == "success") {
                if (whichHandle == "add" || whichHandle == "update") {
                    $('#addPersonModal').modal('hide');
                    htmlObj.resetValide(validatorOfAddPerson, $("#addPersonModal"), 'addPersonForm');
                    if (whichHandle == "update") {
                        addPersonModal.find('.p-name').attr('data-personid', '');
                        addPersonModal.find('.p-depart').attr('dta-persondep', '');
                        htmlObj.userPicId = 'skins/img/man-default.png'; //重置用户图像id
                        $('#previewLogo').attr('src',htmlObj.userPicId);
                        var theDepId = $('#treeDepart').attr('data-currentdepid');
                        if (!Utils.isNullorEmpty(theDepId)) {
                            //刷新该部门下的人员
                            htmlObj.getPersonListByDepId(theDepId);
                        } else {
                            //刷新该部门下的人员
                            htmlObj.getPersonListByDepId(1);
                        }
                    }
                    $('#btnToAdd').removeAttr('disabled');//解禁
                }
                layer.msg('操作成功！');
            } else {
                //显示错误信息
                pageObj.showNotLoginErrorMsg(data.code, data.message);
            }
            layer.closeAll('loading');
        }
    });
};

/**
 * 停用/启用用户
 * @param personId
 * @param status
 */
htmlObj.leavePerson = function (personId, personName, status) {
    //询问框
	var str = "停用";
	if(status == 0){
		str = "启用";
	}
    layer.confirm('确定'+str+'【' + personName + '】的信息？', {
        btn: ['确定'+str, '取消'] //按钮
    }, function (index) {
        $.ajax({
            url: htmlObj.rootUrl + '/authority/user/' + personId + '/' + status + '/leave',
            type: 'put',
            beforeSend: function (request) {
                request.setRequestHeader("Content-Type", "application/json;charset=UTF-8;");
                request.setRequestHeader("authorization", htmlObj.authorization);
            },
            success: function (data) {
                if (data.code == "success") {
                    $('#addPersonModal').modal('hide');
                    htmlObj.resetValide(validatorOfAddPerson, $("#addPersonModal"), 'addPersonForm');
                    var theDepId = $('#treeDepart').attr('data-currentdepid');
                    if (!Utils.isNullorEmpty(theDepId)) {
                        //刷新该部门下的人员
                        htmlObj.getPersonListByDepId(theDepId);
                    } else {
                        //刷新该部门下的人员
                        htmlObj.getPersonListByDepId(1);
                    }
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
 * 通过用户id获取用户信息
 * @param personId
 */
htmlObj.toPerDetail = function (personId, whichModal) {
    var theModal = $('#' + whichModal);
    $.ajax({
        url: htmlObj.rootUrl + '/authority/user/' + personId + '/detail',
        type: 'get',
        beforeSend: function (request) {
            request.setRequestHeader("authorization", htmlObj.authorization);
        },
        success: function (data) {
            if (data.code == "success") {
                var content = data.content;
                theModal.find('.p-name').val(content.realname).attr('data-personid', content.id);
                theModal.find('.p-jobnum').val(content.usercode);
                theModal.find('.p-tel').val(content.phone);
                theModal.find('.p-depart').val(content.depName).attr('dta-persondep', content.depId);
                theModal.find('.p-position').val(content.post);
                theModal.find('.p-superior').val(content.leaderName || '/').attr('data-personsuperior', content.directLeader);
                theModal.find('.p-usualplace').val(content.address);
                theModal.find('.p-birthday').val(content.idcard || '/');
                var imgurl =  Utils.getAvatar(content);

                //编辑成员信息的modal
                if (whichModal == "personDetailModal") {
                    //性别
                    if (content.sex == 1) {
                        theModal.find('.p-sex').val('男');
                    } else if (content.sex == 2) {
                        theModal.find('.p-sex').val('女');
                    }
                    //邮箱
                    theModal.find('.p-email').val(content.email);
                    theModal.find('.p-professionalrank').val(content.professLevel || '/');
                    //管理级别
                    theModal.find('.p-managerank').val(content.manageLevel || '/');
                    //显示图像
                    $('#previewLogoPD').attr('src', imgurl);
                }
                //成员详细信息的modal
                else if (whichModal == "addPersonModal") {
                    theModal.find('input[name=pSex]').each(function () {
                        if (content.sex == $(this).val()) {
                            $(this).attr('checked', true);
                        }
                    });
                    //邮箱
                    theModal.find('.p-email').val(content.email.split('@')[0]);
                    //专业级别

                    theModal.find('.p-professionalrank').val(content.professLevel);
                    //管理级别

                    theModal.find('.p-managerank').val(content.manageLevel);
                    //显示图像
                    $('#previewLogo').attr('src', imgurl);
                }
            } else {
                //显示错误信息
                pageObj.showNotLoginErrorMsg(data.code, data.message);
            }
        }
    });
    if (whichModal == "addPersonModal") {
        theModal.find('.modal-title').html('编辑成员信息');
    }
    theModal.modal();
};

/**
 * 获取角色分页列表
 */
htmlObj.getRoleList = function () {
    var cmd = new CommandAjax(htmlObj.rootUrl + "/authority/role/list", htmlObj.authorization);
    var queryRole = $('#queryRole').val();
    if (!Utils.isNullorEmpty(queryRole)) {
        cmd.name = queryRole;
    }
    $("#perRoleList").datagrid({
        columns: [{
            display: "角色名称",
            width: "180px",
            align: "center",
            render: function (row) {
                //隐藏域是为了选中复选框的时候获取
                return row.name + '<input type="hidden" value="' + row.id + '">';
            }
        }, {
            display: "角色说明",
            name: "profile",
            width: "200px",
            align: "center"
        }, {
            display: "角色状态",
            width: "100px",
            align: "center",
            render: function (row) {
                var status = row.status;
                return status == 0 ? '启用中' : '已停用';
            }
        }],
        reqdata: cmd,
        isShowCheckBox: true,
        rowNumber: false,
        onResponse: function (data) {
            return data;
        },
        onComplete: function (data) {
            if (data.code == 'success') {
                //列表加载完成后在列表中选中这个人的所有角色checkbox
                $("#perRoleList table tbody .ace").each(function () {
                    var $this = $(this),
                        thisval = $this.parents("tr").find("input[type=hidden]").val();
                    if ($.inArray(thisval, roleCheckedArray) >= 0) {
                        $this.prop("checked", true);
                    }
                });
                var checkleng = $("#perRoleList table tbody tr .checkone:checked").length,
                    trlength = $("#perRoleList table tbody tr").length;
                if (checkleng == trlength) {
                    $("#perRoleList table thead .checkall").prop("checked", true);
                }
            }
            else {
                //显示错误信息
                pageObj.showNotLoginErrorMsg(data.code, data.message);
            }
        }
    });
};

/**
 * 角色权限
 * @param personId
 */
htmlObj.toRoleAuthority = function (personId) {
    var roleAuthorityModal = $('#roleAuthorityModal');
    roleAuthorityModal.modal();
    if(personId == 'all'){ //批量分配权限
        roleAuthorityModal.attr('data-personid', 'all');
    }else{
        roleAuthorityModal.attr('data-personid', personId);
    }
    //获取此用户的所有角色，并在表格里面选中
    htmlObj.getRoleAuthorityByPersonId(personId);

};

/**
 * 进行角色分配
 */
htmlObj.setRoleAuthority = function () {
    var roleIds = roleCheckedArray;
    if (roleIds.length == 0) {
        layer.msg("请选择角色！");
    } else {
        var roleAuthorityModal = $('#roleAuthorityModal');
        var personId = roleAuthorityModal.attr('data-personid');
        if(personId == 'all'){ //批量分配角色
            var ids = [];
            for(var item in htmlObj.checkCollection){
                ids.push(item);
            }
            var theJson = {
                ids: ids,
                roleIds: roleIds
            };
            $.ajax({
                url: htmlObj.rootUrl + '/authority/user/update/batch',
                type: 'put',
                data: JSON.stringify(theJson),
                beforeSend: function (request) {
                    request.setRequestHeader("Content-Type", "application/json;charset=UTF-8;");
                    request.setRequestHeader("authorization", htmlObj.authorization);
                },
                success: function (data) {
                    if (data.code == "success") {
                        roleCheckedArray = []; //重置选中的role数组
                        roleAuthorityModal.modal('hide');
                        roleAuthorityModal.on("hidden.bs.modal", function () {
                            $('.main-menu li.active a').trigger('click')
                        });
                    } else {
                        //显示错误信息
                        pageObj.showNotLoginErrorMsg(data.code, data.message);
                    }
                }
            });
        }else{
            var theJson = [];
            for (var i = 0; i < roleIds.length; i++) {
                theJson.push({'roleId': roleIds[i], 'userId': personId});
            }
            $.ajax({
                url: htmlObj.rootUrl + '/authority/user_permission',
                type: 'post',
                data: JSON.stringify(theJson),
                beforeSend: function (request) {
                    request.setRequestHeader("Content-Type", "application/json;charset=UTF-8;");
                    request.setRequestHeader("authorization", htmlObj.authorization);
                },
                success: function (data) {
                    if (data.code == "success") {
                        roleAuthorityModal.modal('hide');
                        roleCheckedArray = []; //重置选中的role数组
                        // roleAuthorityModal.on("hidden.bs.modal", function () {
                        //     layer.msg("操作成功！");
                        // })

                    } else {
                        //显示错误信息
                        pageObj.showNotLoginErrorMsg(data.code, data.message);
                    }
                }
            });
        }
    }
};

/**
 * 获取某用户的所有角色
 */
htmlObj.getRoleAuthorityByPersonId = function (personId) {
    $.ajax({
        url: htmlObj.rootUrl + '/authority/role/user/rolelist?userId=' + personId + '&pageNum=0&pageSize=0',
        type: 'get',
        beforeSend: function (request) {
            request.setRequestHeader("authorization", htmlObj.authorization);
        },
        success: function (data) {
            if (data.code == "success") {
                var content = data.content;
                for (var i = 0; i < content.length; i++) {
                    //放入全局
                    roleCheckedArray.push(content[i].id);
                }
                htmlObj.getRoleList(); //获取角色列表
            } else {
                //显示错误信息
                pageObj.showNotLoginErrorMsg(data.code, data.message);
            }
        }
    });
};

/**
 * 给用户分配角色Modal弹框中需处理的事
 */
htmlObj.initAddRoleAuthorityHandle = function () {
    var roleAuthorityModal = $('#roleAuthorityModal');
    roleAuthorityModal.on("hidden.bs.modal", function () {
        roleCheckedArray = []; //重置选中的role数组
        roleAuthorityModal.find('#queryRole').val('');
    });
    //模糊查询点击事件
    $('#btnSearchRole').on('click', function () {
        htmlObj.getRoleList();
    });
    var perRoleList = $('#perRoleList');
    //全/反选
    perRoleList.on('click', 'thead #checkall', function () {
        var ischeck = $(this).prop('checked');
        var ckboxs = perRoleList.find('tbody .checkone');
        for (var i = 0; i < ckboxs.length; i++) {
            var theRoleId = $(ckboxs[i]).parents('tr').find('input[type=hidden]').val();
            $(ckboxs[i]).prop('checked', ischeck);
            if (ischeck) {
                //检测数组中是否已经存在此元素，没有才push
                var index = $.inArray(theRoleId, roleCheckedArray);
                if (index < 0) {
                    roleCheckedArray.push(theRoleId);
                }
            }
        }
        if (!ischeck) {
            roleCheckedArray = [];
        }
    });
    //点击单个CheckBox
    perRoleList.on('click', 'tbody .checkone', function () {
        var ischeck = $(this).prop('checked');
        var theRoleId = $(this).parents('tr').find('input[type=hidden]').val();
        if (ischeck) {
            //检测数组中是否已经存在此元素，没有才push
            var index = $.inArray(theRoleId, roleCheckedArray);
            if (index < 0) {
                roleCheckedArray.push(theRoleId);
            }
        } else {
            var index = $.inArray(theRoleId, roleCheckedArray);
            if (index >= 0) {
                roleCheckedArray.splice(index, 1);
            }
        }
        var pageCount = perRoleList.find('tbody tr').length,
            checklength = perRoleList.find("input.checkone:checked").length;
        if (checklength == pageCount) {
            perRoleList.find('thead #checkall').prop('checked', true);
        } else {
            perRoleList.find('thead #checkall').prop('checked', false);
        }
    });
    //确定
    $('.btn-setrole').on('click', function () {
        //分配角色
        htmlObj.setRoleAuthority();
    });

};

/**
 * 添加用户Modal弹框中需处理的事
 */
htmlObj.initAddPersonHandle = function () {
    //添加用户的表单验证
    htmlObj.validateAddPerson();
    var addPersonModal = $('#addPersonModal');
    addPersonModal.on("hidden.bs.modal", function () {
        htmlObj.resetValide(validatorOfAddPerson, addPersonModal, 'addPersonForm');
        $('#DepartForAddPerPanel').hide();
        $('#ImmediateSuperiorPanel').hide();
        addPersonModal.find('.p-name').attr('data-personid', '');
        addPersonModal.find('.modal-title').html('添加成员信息');
        htmlObj.userPicId = 'skins/img/man-default.png'; //重置用户图像id
        $('#previewLogo').attr('src',htmlObj.userPicId);
    });
    //选择所属部门
    addPersonModal.find('.p-depart').on('click', function () {
        $('#DepartForAddPerPanel').show();
    });
    $('#closeDepartForAddPer').on('click', function () {
        $('#DepartForAddPerPanel').hide();
    });
    //选择直接上级
    addPersonModal.find('.p-superior').on('click', function () {
        /** 备用代码
         // 以下拉形式显示负责人树
         // $('#ImmediateSuperiorPanel').show();
         */
        $('#chooseDepLeaderModal').modal();
        $('#addPersonModal').addClass('z-index20');
        //标注来源
        htmlObj.personClickfrom = 'addPer';
        htmlObj.getDepLeaderList(); //刷新人员组织架构分页列表
    });
    $('#closeImmediateSuperior').on('click', function () {
        $('#ImmediateSuperiorPanel').hide();
    });
    $('#personDetailModal').on("hidden.bs.modal", function () {
        htmlObj.userPicId = 'skins/img/man-default.png'; //重置用户图像id
    });
};

/**
 * 部门操作Modal弹框中需处理的事
 */
htmlObj.initDealDepartHandle = function () {
    //添加部门的表单验证
    htmlObj.validateAddDep();
    //编辑部门的表单验证
    htmlObj.validateEditDep();
    var addDepForm = $('#addDepForm');
    var editDepForm = $('#editDepForm');
    //添加
    $('#btnAddDep').on('click', function () {
        $('#addDepModal').modal();
        $('#dealDepartModal').addClass('z-index20');
    });
    //编辑
    $('#btnEditDep').on('click', function () {
        var treeDepartForHandle = $('#treeDepartForHandle');
        var dataCurrentDepId = treeDepartForHandle.attr('data-currentdepid');
        if (!Utils.isNullorEmpty(dataCurrentDepId)) {
            $('#editDepModal').modal();
            $('#dealDepartModal').addClass('z-index20');
            //获取该部门的详情信息
            htmlObj.getDepDetail(dataCurrentDepId);
        } else {
            layer.msg('请先选择一个部门');
        }
    });
    //删除
    $('#btnDelDep').on('click', function () {
        var dataCurrentDepId = $('#treeDepartForHandle').attr('data-currentdepid');
        if (!Utils.isNullorEmpty(dataCurrentDepId)) {
            //询问框
            layer.confirm('确定删除此部门及其子部门？', {
                btn: ['确定', '取消'] //按钮
            }, function (index) {
                //删除此部门
                htmlObj.deleteDep(dataCurrentDepId);
                layer.close(index);
            }, function (index) {
                layer.close(index);
            });
        } else {
            layer.msg('请先选择一个部门');
        }
    });
    //添加部门的关闭事件
    $('#addDepModal').on("hidden.bs.modal", function () {
        //重置添加部门的modal
        htmlObj.resetAddDepModal($('#addDepModal'));
    });
    //编辑部门的关闭事件
    $('#editDepModal').on("hidden.bs.modal", function () {
        //重置添加部门的modal
        htmlObj.resetEditDepModal($('#editDepModal'));
    });
    //选择上级部门
    addDepForm.find('.dep-parentname').on('click', function () {
        $('#DepartForSuperiorAddPanel').show();
    });
    editDepForm.find('.dep-parentname').on('click', function () {
        $('#DepartForSuperiorEditPanel').show();
    });
    $('#closeDepartForSuperiorAdd').on('click', function () {
        $('#DepartForSuperiorAddPanel').hide();
    });
    $('#closeDepartForSuperiorEdit').on('click', function () {
        $('#DepartForSuperiorEditPanel').hide();
    });
    //选择部门负责人
    addDepForm.find('.dep-leader').on('click', function () {
        /** 备用代码
         // 以下拉形式显示负责人树
         // $('#DepLeaderForAddDepPanel').show();
         */
        $('#chooseDepLeaderModal').modal();
        $('#addDepModal').addClass('z-index20');
        //标注来源
        htmlObj.personClickfrom = 'addDep';
    });
    editDepForm.find('.dep-leader').on('click', function () {
        /** 备用代码
         // 以下拉形式显示负责人树
         // $('#DepLeaderForEditDepPanel').show();
         */
        $('#chooseDepLeaderModal').modal();
        $('#editDepModal').addClass('z-index20');
        //标注来源
        htmlObj.personClickfrom = 'editDep';
    });
    $('#closeDepLeaderForAddDep').on('click', function () {
        $('#DepLeaderForAddDepPanel').hide();
    });
    $('#closeDepLeaderForEditDep').on('click', function () {
        $('#DepLeaderForEditDepPanel').hide();
    });
};

/**
 * 重置modal--添加部门
 * @param addDepModal
 */
htmlObj.resetAddDepModal = function (addDepModal) {
    htmlObj.resetValide(validatorOfAddDep, addDepModal, 'addDepForm');
    addDepModal.find('.dep-parentname').attr('data-currentdepid', '');
    addDepModal.find('.dep-leader').attr('data-personid', '');
    $('#dealDepartModal').removeClass('z-index20');
    $('#DepartForSuperiorAddPanel').hide();
    $('#DepLeaderForAddDepPanel').hide();
    //重置树的状态,取消选中任何节点，且只展开根节点的第一层子节点
    htmlObj.resetTreeToNoSelected('treeDepartForSuperiorAdd');
    /**
     * 备份代码--下拉形式的人员树
     * //htmlObj.resetTreeToNoSelected('treeDepLeaderForAddDep');
     */
};

/**
 * 添加部门
 */
htmlObj.addDep = function () {
    var theJson = {};
    var addDepModal = $('#addDepModal');
    var addDepForm = $('#addDepForm');
    theJson.name = addDepForm.find('.dep-name').val();
    theJson.parentId = addDepForm.find('.dep-parentname').attr('data-currentdepid');
    theJson.leaderName = addDepForm.find('.dep-leader').val();
    theJson.leaderId = addDepForm.find('.dep-leader').attr('data-personid');
    $.ajax({
        url: htmlObj.rootUrl + '/authority/dep',
        type: 'post',
        data: JSON.stringify(theJson),
        beforeSend: function (request) {
            request.setRequestHeader("Content-Type", "application/json;charset=UTF-8;");
            request.setRequestHeader("authorization", htmlObj.authorization);
        },
        success: function (data) {
            if (data.code == "success") {
                addDepModal.modal('hide');
                //重置添加部门的modal
                htmlObj.resetAddDepModal(addDepModal);
                //刷新部门树list
                htmlObj.getDepartTreeList();
            } else {
                //显示错误信息
                pageObj.showNotLoginErrorMsg(data.code, data.message);
            }
        }
    });
};

/**
 * 重置modal--编辑部门
 * @param editDepModal
 */
htmlObj.resetEditDepModal = function (editDepModal) {
    htmlObj.resetValide(validatorOfEditDep, editDepModal, 'editDepForm');
    editDepModal.find('.dep-parentname').attr('data-currentdepid', '');
    editDepModal.find('.dep-leader').attr('data-personid', '');
    $('#dealDepartModal').removeClass('z-index20');
    $('#DepartForSuperiorEditPanel').hide();
    $('#DepLeaderForEditDepPanel').hide();
    //重置树的状态,取消选中任何节点，且只展开根节点的第一层子节点
    htmlObj.resetTreeToNoSelected('treeDepartForSuperiorEdit');
    /**  备份代码--下拉形式的人员树
     * // htmlObj.resetTreeToNoSelected('treeDepLeaderForEditDep');
     */
};

/**
 * 编辑部门
 * @param depId
 */
htmlObj.editDep = function (depId) {
    var theJson = {};
    var editDepModal = $('#editDepModal');
    var editDepForm = $('#editDepForm');
    theJson.id = depId;
    theJson.name = editDepForm.find('.dep-name').val();
    theJson.parentId = editDepForm.find('.dep-parentname').attr('data-currentdepid');
    theJson.leaderName = editDepForm.find('.dep-leader').val();
    theJson.leaderId = editDepForm.find('.dep-leader').attr('data-personid');
    $.ajax({
        url: htmlObj.rootUrl + '/authority/dep',
        type: 'put',
        data: JSON.stringify(theJson),
        beforeSend: function (request) {
            request.setRequestHeader("Content-Type", "application/json;charset=UTF-8;");
            request.setRequestHeader("authorization", htmlObj.authorization);
        },
        success: function (data) {
            if (data.code == "success") {
                editDepModal.modal('hide');
                //重置编辑部门的modal
                htmlObj.resetEditDepModal(editDepModal);
                //刷新部门树list
                htmlObj.getDepartTreeList();
            } else {
                //显示错误信息
                pageObj.showNotLoginErrorMsg(data.code, data.message);
            }
        }
    });
};

/**
 * 通过部门id获取部门详情
 * @param depId
 */
htmlObj.getDepDetail = function (depId) {
    var editDepForm = $('#editDepForm');
    $.ajax({
        url: htmlObj.rootUrl + '/authority/dep/' + depId + '/detail',
        type: 'get',
        beforeSend: function (request) {
            request.setRequestHeader("authorization", htmlObj.authorization);
        },
        success: function (data) {
            if (data.code == "success") {
                if(!data.content){
                    return;
                }
                var content = data.content;
                editDepForm.find('.dep-name').val(content.name);
                editDepForm.find('.dep-parentname').val(content.parentName).attr('data-currentdepid', content.parentId);
                editDepForm.find('.dep-leader').val(content.leaderName).attr('data-personid', content.leaderId);
            } else {
                //显示错误信息
                pageObj.showNotLoginErrorMsg(data.code, data.message);
            }
        }
    });
};

/**
 * 删除部门
 * @param depId
 */
htmlObj.deleteDep = function (depId) {
    $.ajax({
        url: htmlObj.rootUrl + '/authority/dep/' + depId + '/delete',
        type: 'delete',
        beforeSend: function (request) {
            request.setRequestHeader("Content-Type", "application/json;charset=UTF-8;");
            request.setRequestHeader("authorization", htmlObj.authorization);
        },
        success: function (data) {
            if (data.code == "success") {
                //重新初始化部门树
                htmlObj.getDepartTreeList();
            } else {
                //显示错误信息
                pageObj.showNotLoginErrorMsg(data.code, data.message);
            }
        }
    });
};

/**
 * 表单验证--添加 / 编辑用户
 */
htmlObj.validateAddPerson = function () {
    validatorOfAddPerson = $("#addPersonForm").validate({
        debug: true,
        onfocusout: function (element) {
            $(element).valid();
        },
        onsubmit: function (element) {
            $(element).valid();
        },
        errorPlacement: function (error, element) {
            //修改提示信息出现的位置
            var eleName = $(element).attr("name");
            if (eleName == "pSex") {
                error.css({
                    'padding-left': '0',
                    'padding-top': '10px'
                });
                error.appendTo(element.parents('.sex-radio'));
            } else {
                error.appendTo(element.parent());
            }
        },
        submitHandler: function () {
            var dataPersonid = $('#addPersonModal').find('.p-name').attr('data-personid');
            if (Utils.isNullorEmpty(dataPersonid)) {
                //添加用户信息
                htmlObj.addPerson('add');
            } else {
                //修改用户信息
                htmlObj.addPerson('update', dataPersonid);
            }
        },
        rules: {
            pName: {
                required: true
            },pBirthday:{
                    required: true
            }, pTel: {
                required: true,
                mobile: true
            }, pJobNum: {
                required: true
            }, pSex: {
                required: true
            }, pDepart: {
                required: true
            }, pPosition: {
                required: true
            }, pEmail: {
                required: true
            }, pProfessionalRank: {
                required: true
            }
            /*, pSuperior: {
             required: true
             }*/
            , pUsualPlace: {
                required: true
            }
        },
        messages: {
            pName: {
                required: "请输入新成员名字"
            }, pBirthday:{
              required: "请输入生日"
            },pTel: {
                required: "请输入手机号"
            }, pJobNum: {
                required: "请输入工号"
            }, pSex: {
                required: "请选择性别"
            }, pDepart: {
                required: "请选择部门"
            }, pPosition: {
                required: "请输入岗位名称"
            }, pEmail: {
                required: "请输入邮箱"
            }, pProfessionalRank: {
                required: "请输入专业级别"
            }/*, pSuperior: {
             required: "请选择直接上级"
             }*/, pUsualPlace: {
                required: "请输入常驻地"
            }
        }
    });
};

/**
 * 验证手机号码格式
 */
jQuery.validator.addMethod("mobile", function (value, element) {
    var reg = /^1\d{10}$/;
    var length = value.length;
    return this.optional(element) || (length == 11 && reg.test(value));
}, "请输入正确的手机号码");

/**
 * 表单验证--添加部门
 */
htmlObj.validateAddDep = function () {
    validatorOfAddDep = $("#addDepForm").validate({
        debug: true,
        onfocusout: function (element) {
            $(element).valid();
        },
        onsubmit: function (element) {
            $(element).valid();
        },
        errorPlacement: function (error, element) {
            //修改提示信息出现的位置
            error.css({
                'margin-left': '89px'
            });
            error.appendTo(element.parent());
        },
        submitHandler: function () {
            //添加部门
            htmlObj.addDep();
        },
        rules: {
            depName: {
                required: true
            }, depParentName: {
                required: true
            }, depLeader: {
                required: true
            }
        },
        messages: {
            depName: {
                required: "请输入部门名称"
            }, depParentName: {
                required: "请选择上级部门"
            }, depLeader: {
                required: "请选择部门负责人"
            }
        }
    });
};

/**
 * 表单验证--编辑部门
 */
htmlObj.validateEditDep = function () {
    validatorOfEditDep = $("#editDepForm").validate({
        debug: true,
        onfocusout: function (element) {
            $(element).valid();
        },
        onsubmit: function (element) {
            $(element).valid();
        },
        errorPlacement: function (error, element) {
            //修改提示信息出现的位置
            error.css({
                'margin-left': '89px'
            });
            error.appendTo(element.parent());
        },
        submitHandler: function () {
            var dataCurrentDepId = $('#treeDepartForHandle').attr('data-currentdepid');
            //修改部门信息
            htmlObj.editDep(dataCurrentDepId);
        },
        rules: {
            depName: {
                required: true
            }, depParentName: {
                required: true
            }, depLeader: {
                required: true
            }
        },
        messages: {
            depName: {
                required: "请输入部门名称"
            }, depParentName: {
                required: "请选择上级部门"
            }, depLeader: {
                required: "请选择部门负责人"
            }
        }
    });
};

/**
 * 导出人员列表
 * @param depId
 */
htmlObj.exportPerson = function (depId, queryInfo) {
    // var url = htmlObj.rootUrl + "/authority/user/dep/" + depId + "/download";
    // var downloadurl = url;
    // if (!Utils.isNullorEmpty(queryInfo)) {
    //     downloadurl += '?queryInfo=' + queryInfo;
    // }
    // window.open(encodeURI(downloadurl));
    // $("#exportExclePanel").modal("hide");
    var theDepId = $('#treeDepart').attr('data-currentdepid');
    Utils.getFile({
        url: "/authority/user/dep/" + (theDepId ||　'1') + "/download",
        export: true
    });
};

/**
 * 图片文件选择
 */
htmlObj.fileSelected = function () {
    var theError = document.getElementById('uploadLogoError');
    theError.style.display = 'none';
    var file = $('#uploadLogo')[0].files[0];
    var rFilter = /^(image\/bmp|image\/gif|image\/jpeg|image\/png|image\/tiff)$/i;
    if (!rFilter.test(file.type)) {
        theError.style.display = 'block';
        theError.innerText = '只能选择格式为：bmp、gif、jpeg、png、tiff的图片';
    } else {
        var size = file.size, start = 0;
        var data = new FormData();//利用FormData对象模拟表单
        var picName = file.name;
        data.append(picName, file.slice(start, size));
        $.ajax({
            type: "POST",
            url: htmlObj.rootUrl + '/authority/user/picture/head/upload',
            async: true,
            data: data,
            contentType: false,    //不可缺
            processData: false,    //不可缺
            beforeSend: function (xhr) {
                xhr.setRequestHeader("authorization", htmlObj.authorization);
            },
            success: function (data) {
                if (data.code == 'success') {
                    var content = data.content;
                    htmlObj.userPicId = content.picId;
                    var imgurl = htmlObj.rootUrl + "/authority/user/picture/head/" + content.picId + "/download";
                    $('#previewLogo').attr('src', imgurl);
                    Utils.setValue("headPic", content.picId);
                } else {//接口调用失败
                    //showTip('失败')
                }
            },
            error: function () {
                //showTip('服务器异常');
            }
        });
    }
    // little test for filesize
    /*if (oFile.size > iMaxFilesize) {
     theError.style.display = 'block';
     theError.innerText='请选择小于1M的图片';
     return;
     }*/

    /*
     // prepare HTML5 FileReader
     var oReader = new FileReader();
     oReader.onload = function (e) {
     $('#previewLogo').attr('src', e.target.result);
     };

     // read selected file as DataURL
     oReader.readAsDataURL(oFile);
     */
};

/**
 * 重置树的状态,取消选中任何节点，且只展开根节点的第一层子节点
 * @param treeULId
 */
htmlObj.resetTreeToNoSelected = function (treeULId) {
    var theTreeObj = $.fn.zTree.getZTreeObj(treeULId);
    var nodes = theTreeObj.getSelectedNodes();
    for (var i = 0; i < nodes.length; i++) {
        theTreeObj.cancelSelectedNode(nodes[i]);
    }
    theTreeObj.expandAll(false);
    var theRootNode = theTreeObj.getNodeByParam('id', 1, null);
    theTreeObj.expandNode(theRootNode);
};

/**
 * 阻止事件冒泡
 * @param event  事件对象
 */
htmlObj.stopPropagation = function (event) {
    if (event.stopPropagation) { //支持W3C标准
        event.stopPropagation();
    } else { //IE8及以下浏览器
        event.cancelBubble = true;
    }
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
 * 批量分配角色
 */
htmlObj.allocationRoles = function () {
    if($.isEmptyObject(htmlObj.checkCollection)){
        layer.msg("请至少选择一个用户！");
        return;
    }
    htmlObj.toRoleAuthority('all');
};

/**
 * 批量指定上级
 */
htmlObj.appointLeader = function (id, name) {
    layer.confirm('确定要选择'+ name + '为直接上级吗？', {
        btn: ['确定', '取消'] //按钮
    }, function (index) {
        var ids = [];
        for(var item in htmlObj.checkCollection){
            ids.push(item);
        }
        var theJson = {
            ids: ids,
            leaderId: id
        };
        $.ajax({
            url: htmlObj.rootUrl + '/authority/user/update/batch',
            type: 'put',
            data: JSON.stringify(theJson),
            beforeSend: function (request) {
                request.setRequestHeader("Content-Type", "application/json;charset=UTF-8;");
                request.setRequestHeader("authorization", htmlObj.authorization);
            },
            success: function (data) {
                if (data.code == "success") {
                    layer.close(index);
                    $('.main-menu li.active a').trigger('click');
                    layer.msg('操作成功！');
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
 * 批量移动到部门
 */
htmlObj.moveDepartment = function (a, b, c) {
    var departmentName = c.name;
    layer.confirm('确定要移动到【'+ departmentName + '】吗？', {
        btn: ['确定', '取消'] //按钮
    }, function (index) {
        var ids = [];
        for(var item in htmlObj.checkCollection){
            ids.push(item);
        }
        var theJson = {
            ids: ids,
            depId: c.id
        };
        $.ajax({
            url: htmlObj.rootUrl + '/authority/user/update/batch',
            type: 'put',
            data: JSON.stringify(theJson),
            beforeSend: function (request) {
                request.setRequestHeader("Content-Type", "application/json;charset=UTF-8;");
                request.setRequestHeader("authorization", htmlObj.authorization);
            },
            success: function (data) {
                if (data.code == "success") {
                    layer.close(index);
                    $('#moveDepartModal').modal('hide');
                    $('#moveDepartModal').on("hidden.bs.modal", function () {
                        $('.main-menu li.active a').trigger('click');
                        layer.msg('操作成功！');
                    });

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
 * 初始化
 */
htmlObj.init = function () {
    htmlObj.getDepartTreeList(); //获取部门树列表
    // htmlObj.getPersonTreeList(); //获取人员组织架构树列表
    htmlObj.getDepLeaderList(); //获取人员组织架构分页列表
    //部门树右侧默认显示全公司人
    htmlObj.getPersonListByDepId(1, 'init');

    //添加新用户
    $('.btn-addperson').on('click', function () {
        var theModal = $('#addPersonModal');
        theModal.find('.modal-title').html('添加成员信息');
        theModal.modal();
    });
    /*//添加人员--重置modal和form
     $('#addPersonModal').on("hidden.bs.modal", function () {
     htmlObj.resetValide(validatorOfAddPerson, $('#addPersonModal'), 'addPersonForm');
     });*/
    //点击组织架构管理页面的编辑部门大按钮
    $('#btnEditDepartment').on('click', function () {
        $('#dealDepartModal').modal();
    });
    //点击组织架构管理页面的人员搜索
    $('#btnSearchPerInMain').on('click', function () {
        //搜索范围为全公司人
        htmlObj.getPersonListByDepId(1);
        // $("#personKD").val('');
    });
    //响应回车搜索人
    $("#personKD").on("focus", function () {
        $(this).keyup(function (e) {
            var code;
            if (!e) {
                var e = window.event;
            }
            if (e.keyCode) {
                code = e.keyCode;
            }
            else if (e.which) {
                code = e.which;
            }
            if (code == 13) {
                htmlObj.getPersonListByDepId(1);
                // $("#personKD").val('');
            }
        });
    });
    htmlObj.initAddPersonHandle(); //初始化添加&编辑人员信息Modal处理事项
    htmlObj.initDealDepartHandle(); //初始化部门操作Modal处理事项
    htmlObj.initAddRoleAuthorityHandle(); //初始化分配角色Modal处理事项

    //点击导出列表
    // $('.btn-export').on('click', function () {
    //     $("#exportExclePanel").modal();
    // });
    // var theDepId = $('#treeDepart').attr('data-currentdepid');
    // Utils.getFile({
    //     url: "/authority/user/dep/" + (theDepId ||　'1') + "/download",
    //     id: 'exportPerson',
    //     export: true
    // });
    // //确认导出
    // $('#export-sure').on('click', function () {
    //     var theDepId = $('#treeDepart').attr('data-currentdepid');
    //     Utils.getFile({
    //         url: "/authority/user/dep/" + (theDepId ||　'1') + "/download",
    //         export: true
    //     });
    // });

    $('#exportPerson').on('click', function(){
        htmlObj.exportPerson();
    });
    $('#allocationRoles').on('click', function () { // 批量分配角色
       htmlObj.allocationRoles();
    });

    $('#appointLeader').on('click', function () {  //批量指定上级
        if($.isEmptyObject(htmlObj.checkCollection)){
            layer.msg("请至少选择一个用户！");
            return;
        }
        $('#chooseDepLeaderModal').modal();
        $('#chooseDepLeaderModal .modal-title').text('请选择直接上级');
        $('#addPersonModal').addClass('z-index20');
        htmlObj.personClickfrom = "appointLeader";
        htmlObj.getDepLeaderList();
    });

    $('#moveDepartment').on('click', function(){ //批量移动部门
        if($.isEmptyObject(htmlObj.checkCollection)){
            layer.msg("请至少选择一个用户！");
            return;
        }
        $('#moveDepartModal').modal('show');
    });
};

$(function () {
    htmlObj.init();
});