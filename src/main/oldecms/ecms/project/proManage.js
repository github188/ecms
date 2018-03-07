/**
 * Created by Administrator on 2017/3/28.
 */
var htmlObj = {};
htmlObj.rootUrl = appHost + approot;
htmlObj.leaderInputSgl = ''; //区分人员单选点击的来源
htmlObj.leaderInputDbl = ''; //区分人员多选点击的来源
htmlObj.arr = []; //选择的项目成员
htmlObj.checkedNodesName = ''; //选择的项目成员名字（只作用于显示到文本框）
htmlObj.personClickfrom = "";
htmlObj.pageCount = 0;
var validatorOfAdd; //新建项目的validate对象
var validatorOfDetail;  //修改项目详情的validate对象
var validatorOfDemand;  //新建需求的validate对象
htmlObj.proDetailManager = {}; //项目详情接口返回的项目经理信息
htmlObj.proDetailMarketLeader = {}; //项目详情接口返回的市场负责人信息
htmlObj.authorization = Utils.getValue('authorization'); //获取登录人的userId和Token

/**
 * 获取当前登录人在项目管理里面能看到的按钮
 */
htmlObj.getMenuButton = function () {
    $.ajax({
        url: htmlObj.rootUrl + '/authority/resource/user/resources?' + 'resourceId=1493089982195835',
        type: 'get',
        beforeSend: function (request) {
            request.setRequestHeader("authorization", htmlObj.authorization);
        },
        success: function (data) {
            if (data.code == "success") {
                var content = data.content;
                var options = '';
                for (var i = 0; i < content.length; i++) {
                    var theData = content[i];
                    options += '<button class="btn btn-turquoise" id="' + theData.url + '">' + theData.name + '</button>';
                }
                $('#btnsOfListContain').html(options);
                //点击新建项目
                $("#pmo_add_project").click(function () {
                    //重置表单数据
                    document.getElementById("addproForm").reset();
                    //重置表单验证信息
                    htmlObj.resetValide(validatorOfAdd, $("#addpro"));
                    $("#procreatetime").val(new Date().Format("yyyy-MM-dd"));
                    $("#addpro").modal("show");
                });
                //点击导出项目
                Utils.getFile({
                    url: '/pmo/project/download/excel',
                    id: 'pmo_export_project',
                    export: true
                })
            } else {
                //显示错误信息
                pageObj.showNotLoginErrorMsg(data.code, data.message);
            }
        }
    });
};

/**
 * 获取营销中心
 */
htmlObj.getMarketCenter = function () {
    $.ajax({
        url: htmlObj.rootUrl + '/pmo/common/markets',
        type: 'get',
        beforeSend: function (request) {
            request.setRequestHeader("authorization", htmlObj.authorization);
        },
        success: function (data) {
            if (data.code == "success") {
                var content = data.content;
                var options = '<option value="">--请选择--</option>';
                for (var i = 0; i < content.length; i++) {
                    options += '<option value="' + content[i].id + '">' + content[i].name + '</option>';
                }
                $('#marketlist').html(options);
                //同时显示到添加项目modal、项目详情modal的下拉框
                $('#marketlistadd').html(options);
                $('#dmarket2').html(options);
            } else {
                //显示错误信息
                pageObj.showNotLoginErrorMsg(data.code, data.message);
            }
        }
    });
};

/**
 * 获取省
 */
htmlObj.getProvince = function () {
    $.ajax({
        url: htmlObj.rootUrl + '/region/province',
        type: 'get',
        beforeSend: function (request) {
            request.setRequestHeader("authorization", htmlObj.authorization);
        },
        success: function (data) {
            if (data.code == "success") {
                var content = data.content;
                var options = '<option value="">全国</option>';
                for (var i = 0; i < content.length; i++) {
                    options += '<option value="' + content[i].provinceId + '">' + content[i].province + '</option>';
                }
                var $provinceList = $('#provincelist');
                $provinceList.html(options);
                $provinceList.on('change', function () {
                    var theProvinceId = this.options[this.options.selectedIndex].value;
                    if (!Utils.isNullorEmpty(theProvinceId)) {
                        //获取市
                        htmlObj.getCity(theProvinceId, function (options) {
                            var $cityList = $('#citylist');
                            $cityList.html(options);
                            $cityList.on('change', function () {
                                var theCityId = this.options[this.options.selectedIndex].value;
                                //获取县
                                htmlObj.getCounty(theCityId, function (options) {
                                    $('#countylist').html(options);
                                });
                            });
                        });
                    } else {
                        //重置市
                        var theoption = '<option value="">--请选择--</option>';
                        $('#citylist').html(theoption);
                    }
                    //重置县
                    var theoption = '<option value="">--请选择--</option>';
                    $('#countylist').html(theoption);
                });

                //同时显示到添加项目区域的下拉框
                var provincelistadd = $('#provincelistadd');
                provincelistadd.html(options);
                provincelistadd.on('change', function () {
                    var theProvinceId = this.options[this.options.selectedIndex].value;
                    if (!Utils.isNullorEmpty(theProvinceId)) {
                        //获取市
                        htmlObj.getCity(theProvinceId, function (options) {
                            //同时显示到添加项目区域的下拉框
                            var citylistadd = $('#citylistadd');
                            citylistadd.html(options);
                            citylistadd.on('change', function () {
                                var theCityId = this.options[this.options.selectedIndex].value;
                                //获取县
                                htmlObj.getCounty(theCityId, function (options) {
                                    $('#countylistadd').html(options);
                                });
                            });
                        });
                    } else {
                        //重置市
                        var theoption = '<option value="">--请选择--</option>';
                        $('#citylistadd').html(theoption);
                    }
                    //重置县
                    var theoption = '<option value="">--请选择--</option>';
                    $('#countylistadd').html(theoption);
                });

                //同时显示到项目详情区域的下拉框
                var dproprovince2 = $('#dproprovince2');
                dproprovince2.html(options);
                dproprovince2.on('change', function () {
                    var theProvinceId = this.options[this.options.selectedIndex].value;
                    if (!Utils.isNullorEmpty(theProvinceId)) {
                        //获取市
                        htmlObj.getCity(theProvinceId, function (options) {
                            //同时显示到项目详情区域的下拉框
                            var dprocity2 = $('#dprocity2');
                            dprocity2.html(options);
                            dprocity2.on('change', function () {
                                var theCityId = this.options[this.options.selectedIndex].value;
                                //获取县
                                htmlObj.getCounty(theCityId, function (options) {
                                    $('#dprocounty2').html(options);
                                });
                            });
                        });
                    } else {
                        //重置市
                        var theoption = '<option value="">--请选择--</option>';
                        $('#dprocity2').html(theoption);
                    }
                    //重置县
                    var theoption = '<option value="">--请选择--</option>';
                    $('#dprocounty2').html(theoption);
                });
            } else {
                //显示错误信息
                pageObj.showNotLoginErrorMsg(data.code, data.message);
            }
        }
    });
};

/**
 * 获取市
 */
htmlObj.getCity = function (provinceid, callback) {
    $.ajax({
        url: htmlObj.rootUrl + '/region/' + provinceid + '/city',
        type: 'get',
        beforeSend: function (request) {
            request.setRequestHeader("authorization", htmlObj.authorization);
        },
        success: function (data) {
            if (data.code == "success") {
                var content = data.content;
                var options = '<option value="">--请选择--</option>';
                for (var i = 0; i < content.length; i++) {
                    options += '<option value="' + content[i].cityId + '">' + content[i].city + '</option>';
                }
                callback(options);
            } else {
                //显示错误信息
                pageObj.showNotLoginErrorMsg(data.code, data.message);
            }
        }
    });
};

/**
 * 获取县
 */
htmlObj.getCounty = function (cityid, callback) {
    $.ajax({
        url: htmlObj.rootUrl + '/region/' + cityid + '/area',
        type: 'get',
        beforeSend: function (request) {
            request.setRequestHeader("authorization", htmlObj.authorization);
        },
        success: function (data) {
            if (data.code == "success") {
                var content = data.content;
                var options = '<option value="">--请选择--</option>';
                for (var i = 0; i < content.length; i++) {
                    options += '<option value="' + content[i].areaId + '">' + content[i].area + '</option>';
                }
                callback(options);
            } else {
                //显示错误信息
                pageObj.showNotLoginErrorMsg(data.code, data.message);
            }
        }
    });
};

/**
 * 获取项目负责人
 */
htmlObj.initLeader = function () {
    //人员单选（市场负责人、项目经理用）
    $.ajax({
        url: htmlObj.rootUrl + '/pmo/common/users/check',
        type: 'get',
        beforeSend: function (request) {
            request.setRequestHeader("authorization", htmlObj.authorization);
        },
        success: function (data) {
            if (data.code == "success") {
                var zNodes = data.content;
                var setting = {
                    check: {
                        enable: true,
                        chkStyle: "radio",
                        radioType: "all"
                    },
                    data: {
                        simpleData: {
                            enable: true
                        }
                    },
                    view: {
                        dblClickExpand: false
                        // ,showLine: false
                    },
                    callback: {
                        onClick: htmlObj.onClickLeaderSgl
                        // ,onCheck: htmlObj.onCheckLeaderSgl
                    }
                };
                //初始化树
                $.fn.zTree.init($("#treeDemo"), setting, zNodes);
                // 点击确定
                $('#btnChoosePersgl').on('click', function () {
                    var treeObj = $.fn.zTree.getZTreeObj("treeDemo");
                    var nodes = treeObj.getCheckedNodes(true)[0];
                    if (!Utils.isNullorEmpty(nodes)) {
                        //来源--添加项目modal的市场负责人
                        if (htmlObj.leaderInputSgl == 'scfzr-add') {
                            $('#leaderlist1add').val(nodes.name).attr('data-personid', nodes.id).blur();
                            $('#addpro').removeClass('z-index20');
                        }
                        //来源--添加项目modal的项目经理
                        else if (htmlObj.leaderInputSgl == 'xmjl-add') {
                            $('#leaderlist2add').val(nodes.name).attr('data-personid', nodes.id).blur();
                            $('#addpro').removeClass('z-index20');
                        }
                        //来源--主页面的负责人
                        else if (htmlObj.leaderInputSgl == 'scfzr-main') {
                            $('#leaderlist').val(nodes.name).attr('data-personid', nodes.id);
                        }
                        //来源--项目详情modal的市场负责人
                        else if (htmlObj.leaderInputSgl == 'scfzr-prodetail') {
                            $('#dproleader2').val(nodes.name).attr('data-personid', nodes.id).blur();
                            $('#prodetail').removeClass('z-index20');
                        }
                        //来源--项目详情modal的项目经理
                        else if (htmlObj.leaderInputSgl == 'xmjl-prodetail') {
                            $('#dpromanager2').val(nodes.name).attr('data-personid', nodes.id).blur();
                            $('#prodetail').removeClass('z-index20');
                        }
                    } else {
                        //来源--添加项目modal的市场负责人
                        if (htmlObj.leaderInputSgl == 'scfzr-add') {
                            $('#leaderlist1add').val('').attr('data-personid', '').blur();
                            $('#addpro').removeClass('z-index20');
                        }
                        //来源--添加项目modal的项目经理
                        else if (htmlObj.leaderInputSgl == 'xmjl-add') {
                            $('#leaderlist2add').val('').attr('data-personid', '').blur();
                            $('#addpro').removeClass('z-index20');
                        }
                        //来源--主页面的负责人
                        else if (htmlObj.leaderInputSgl == 'scfzr-main') {
                            $('#leaderlist').val('').attr('data-personid', '');
                        }
                        //来源--项目详情modal的市场负责人
                        else if (htmlObj.leaderInputSgl == 'scfzr-prodetail') {
                            $('#dproleader2').val('').attr('data-personid', '').blur();
                            $('#prodetail').removeClass('z-index20');
                        }
                        //来源--项目详情modal的项目经理
                        else if (htmlObj.leaderInputSgl == 'xmjl-prodetail') {
                            $('#dpromanager2').val('').attr('data-personid', '').blur();
                            $('#prodetail').removeClass('z-index20');
                        }
                    }

                    $('#sglperchoose').modal('hide');
                    //重新初始化树，达到不选中任何节点的效果，可行。
                    $.fn.zTree.init($("#treeDemo"), setting, zNodes);
                });
                // modal模式窗口的关闭事件（包括叉叉和取消按钮）回调
                $("#sglperchoose").on("hidden.bs.modal", function () {
                    //显示新建项目modal
                    if (htmlObj.leaderInputSgl == 'scfzr-add' || htmlObj.leaderInputSgl == 'xmjl-add') {
                        $('#addpro').removeClass('z-index20');
                    }
                    //显示项目详情modal
                    else if (htmlObj.leaderInputSgl == 'scfzr-prodetail' || htmlObj.leaderInputSgl == 'xmjl-prodetail') {
                        $('#prodetail').removeClass('z-index20');
                    }
                })
            } else {
                //显示错误信息
                pageObj.showNotLoginErrorMsg(data.code, data.message);
            }
        }
    });

    //人员多选（项目成员用）
    $.ajax({
        url: htmlObj.rootUrl + '/pmo/common/users/check',
        type: 'get',
        beforeSend: function (request) {
            request.setRequestHeader("authorization", htmlObj.authorization);
        },
        success: function (data) {
            if (data.code == "success") {
                var zNodes = data.content;
                var setting = {
                    check: {
                        enable: true,
                        chkboxType: {"Y": "", "N": ""}
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
                        onClick: htmlObj.onClickLeaderDbl,
                        onCheck: htmlObj.onCheckLeaderDbl
                    }
                };
                //初始化树
                $.fn.zTree.init($("#treeDemodbl"), setting, zNodes);
                // 点击确定
                $('#btnChoosePerdbl').on('click', function () {
                    //新建项目
                    if (htmlObj.leaderInputDbl == "promebs-add") {
                        $('#leaderlist3add').val(htmlObj.checkedNodesName).blur();
                        $('#addpro').removeClass('z-index20');
                    }
                    //项目详情
                    else if (htmlObj.leaderInputDbl == "promebs-detail") {
                        $('#dpromebs2').val(htmlObj.checkedNodesName).blur();
                        $('#prodetail').removeClass('z-index20');
                    }
                    $('#dblperchoose').modal('hide');
                    //重新初始化树，达到不选中任何节点的效果，可行。
                    $.fn.zTree.init($("#treeDemodbl"), setting, zNodes);
                });
                // modal模式窗口的关闭事件（包括叉叉和取消按钮）回调
                $("#dblperchoose").on("hidden.bs.modal", function () {
                    if (htmlObj.leaderInputDbl == "promebs-add") {
                        $('#addpro').removeClass('z-index20');
                    } else if (htmlObj.leaderInputDbl == "promebs-detail") {
                        $('#prodetail').removeClass('z-index20');
                    }
                });

            } else {
                //显示错误信息
                pageObj.showNotLoginErrorMsg(data.code, data.message);
            }
        }
    });
};

/**
 * 单选人员树的click事件
 * @param e
 * @param treeId
 * @param treeNode
 * @returns {boolean}
 */
htmlObj.onClickLeaderSgl = function (e, treeId, treeNode) {
    var zTree = $.fn.zTree.getZTreeObj("treeDemo");
    zTree.expandNode(treeNode);
    if (treeNode.children.length <= 0) {
        zTree.checkNode(treeNode, !treeNode.checked, null, true);
    }
    return false;
};

/**
 * 单选人员树的check事件
 * @param e
 * @param treeId
 * @param treeNode
 */
htmlObj.onCheckLeaderSgl = function (e, treeId, treeNode) {
    var zTree = $.fn.zTree.getZTreeObj("treeDemo"),
        nodes = zTree.getCheckedNodes(true),
        v = "";
    for (var i = 0, l = nodes.length; i < l; i++) {
        v += nodes[i].name + ",";
    }
    if (v.length > 0) v = v.substring(0, v.length - 1);
    console.log('选中：' + v);
};

/**
 * 多选人员树的click事件
 * @param e
 * @param treeId
 * @param treeNode
 * @returns {boolean}
 */
htmlObj.onClickLeaderDbl = function (e, treeId, treeNode) {
    var zTree = $.fn.zTree.getZTreeObj("treeDemodbl");
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
htmlObj.onCheckLeaderDbl = function (e, treeId, treeNode) {
    var zTree = $.fn.zTree.getZTreeObj("treeDemodbl"),
        nodes = zTree.getCheckedNodes(true);
    //重置
    htmlObj.arr = [];
    htmlObj.checkedNodesName = '';
    for (var i = 0, l = nodes.length; i < l; i++) {
        htmlObj.arr.push({'personId': nodes[i].id, 'personName': nodes[i].name, 'personCategory': 3});
        htmlObj.checkedNodesName += nodes[i].name + "、";
    }
    if (htmlObj.checkedNodesName.length > 0) {
        htmlObj.checkedNodesName = htmlObj.checkedNodesName.substring(0, htmlObj.checkedNodesName.length - 1);
    }
};

/**
 * 获取项目状态
 */
htmlObj.getProjectStatus = function () {
    $.ajax({
        url: htmlObj.rootUrl + '/pmo/common/project/status/pmo_project_status',
        type: 'get',
        beforeSend: function (request) {
            request.setRequestHeader("authorization", htmlObj.authorization);
        },
        success: function (data) {
            if (data.code == "success") {
                var content = data.content;
                var options = '<option value="">--请选择--</option>';
                for (var i = 0; i < content.length; i++) {
                    options += '<option value="' + content[i].code + '">' + content[i].name + '</option>';
                }
                $('#projectstatuslist').html(options);
            } else {
                //显示错误信息
                pageObj.showNotLoginErrorMsg(data.code, data.message);
            }
        }
    });
};

/**
 * 新建项目
 */
htmlObj.addNewProject = function () {
    var $projectname = $('#projectname');
    var $procreatetime = $('#procreatetime');
    var $projectcontext = $('#projectcontext');
    var $marketlistadd = $('#marketlistadd');
    var $provincelistadd = $('#provincelistadd');
    var $citylistadd = $('#citylistadd');
    var $countylistadd = $('#countylistadd');
    var $leaderlist1add = $('#leaderlist1add');
    var $leaderlist2add = $('#leaderlist2add');
    var obj = {};
    //项目名称
    obj['proCode'] = '';
    obj['proName'] = $projectname.val();
    //立项时间
    obj['proDate'] = $procreatetime.val();
    //项目背景
    obj['proContents'] = $projectcontext.val();
    //营销中心
    obj['marktId'] = $marketlistadd.val();
    obj['marktName'] = $marketlistadd.find("option:selected").text();
    //省、市、县
    obj['provinceId'] = $provincelistadd.val();
    obj['province'] = $provincelistadd.find("option:selected").text();
    if (Utils.isNullorEmpty($citylistadd.val())) {
        obj['cityId'] = '';
        obj['city'] = '';
    } else {
        obj['cityId'] = $citylistadd.val();
        obj['city'] = $citylistadd.find("option:selected").text();
    }
    if (Utils.isNullorEmpty($countylistadd.val())) {
        obj['areaId'] = '';
        obj['area'] = '';
    }
    else {
        obj['areaId'] = $countylistadd.val();
        obj['area'] = $countylistadd.find("option:selected").text();
    }
    //市场负责人 标识是2
    var leaderObj = {};
    leaderObj['personId'] = $leaderlist1add.attr('data-personid');
    leaderObj['personName'] = $leaderlist1add.val();
    leaderObj['personCategory'] = 2;
    //项目经理 标识是1
    var promanObj = {};
    promanObj['personId'] = $leaderlist2add.attr('data-personid');
    promanObj['personName'] = $leaderlist2add.val();
    promanObj['personCategory'] = 1;
    //项目成员 标识是3 ,值取自htmlObj.arr
    var ary=[];
    var ids = $("#leaderlist3add").attr("data-personid").split("_");
    var names = $("#leaderlist3add").val().split("、");
    for(var i = 0;i < ids.length;i++){
    	var objj = {};
    	objj['personId'] = ids[i];
    	objj['personName'] = names[i];
    	objj['personCategory'] = 3;
    	ary[i] = objj;
    }
    //拼接参数
    var theJson = JSON.stringify({"pmoProject": obj, "pmoPersonList": [leaderObj].concat([promanObj]).concat(ary)});
    //请求接口
    $.ajax({
        url: htmlObj.rootUrl + '/pmo/project',
        type: 'post',
        data: theJson,
        beforeSend: function (request) {
            request.setRequestHeader("Content-Type", "application/json;charset=UTF-8;");
            request.setRequestHeader("authorization", htmlObj.authorization);
        },
        success: function (data) {
            if (data.code == "success") {
                document.getElementById("addproForm").reset();
                $('#addpro').modal('hide');
                $('#btnAddPro').removeAttr('disabled');//解禁
                //刷新项目列表
                htmlObj.getProList();
            } else {
                //显示错误信息
                pageObj.showNotLoginErrorMsg(data.code, data.message);
            }
        }
    });
};

/**
 * 表单验证--添加项目
 */
htmlObj.formvalidator = function () {
    //表单验证
    validatorOfAdd = $("#addproForm").validate({
        debug: true,
        onfocusout: function (element) {
            $(element).valid();
        },
        submitHandler: function () {
            $('#btnAddPro').attr('disabled', 'disabled');
            //添加项目
            htmlObj.addNewProject();
        },
        rules: {
            projectname: {
                required: true
            },
            marketlistadd: {
                required: true
            }, provincelistadd: {
                required: true
            }, procreatetime: {
                required: true
            }, projectcontext: {
                required: true
            }, leaderlist1add: {
                required: true
            }, leaderlist2add: {
                required: true
            }, leaderlist3add: {
                required: true
            }
        }, messages: {
            projectname: {
                required: "项目名称不能为空！"
            }, marketlistadd: {
                required: "请选择营销中心！",
            }, provincelistadd: {
                required: "请选择省份！",
            }, procreatetime: {
                required: "请选择立项日期！",
            }, projectcontext: {
                required: "请输入项目背景！",
            }, leaderlist1add: {
                required: "请选择市场负责人！",
            }, leaderlist2add: {
                required: "请选择项目经理！",
            }, leaderlist3add: {
                required: "请选择项目成员！",
            }
        }, errorPlacement: function (error, element) {
            //修改提示信息出现的位置
            var eleName = $(element).attr("name");
            if (eleName == "provincelistadd") {
                error.insertAfter(element.parents(".area-block"));
            } else {
                error.appendTo(element.parent());
            }

        }
    });
};

/**
 * 获取项目列表
 */
htmlObj.getProList = function () {
    var cmd = new CommandAjax(htmlObj.rootUrl + "/pmo/project/list", htmlObj.authorization);
    cmd = htmlObj.setParam(cmd);
    $("#prolist").datagrid({
        columns: [{
        	display: "项目编号",
            name: "proCode",
            width: "150px",
            align: "center"
        }, {
        	 display: "项目名称",
             align: "center",
             width:"150px",
             name: "proName"
        }, {
        	 display: "片区",
             name: "marktName",
             width: "100px",
             align: "center"
        }, {
        	 display: "区域",
             width: "200px",
             align: "center",
             render: function (row) {
                 var area = row.province + row.city + row.area;
                 return area;
             }
        }, {
            display: "市场负责人",
            name: "marktPersonName",
            width: "90px",
            align: "center"
        }, {
            display: "项目经理",
            name: "managePersonName",
            width: "90px",
            align: "center"
        }, 
        /*  {
            display: "立项日期",
            name: "proDate",
            width: "150px",
            align: "center"
            ,
             render: function (row) {
             var time = parseInt(row.updateTime);
             time = (isNaN(time) || Utils.isNullorEmpty(time)) ? "--" : new Date(time);
             return time;
             }
        },*/
        {
            display: "项目状态",
            name: "proStatus",
            width: "100px",
            align: "center",
            render: function (row) {
                var proStatus = '';
                switch (row.proStatus) {
                    case 1:
                        proStatus = '立项';
                        break;
                    case 2:
                        proStatus = '跟进中';
                        break;
                    case 3:
                        proStatus = '结项';
                        break;
                    default:
                        break;
                }
                return proStatus;
            }
        }, {
            display: "需求",
            width: "80px",
            align: "center",
            name: "requireCount",
            render: function (row) {
                var id = row.id,
                    proCode = row.proCode,
                    rowHtml = '';
                rowHtml += '<a class="oprate" title="需求总数" href="' + 'main.html?resourceid=' + pageObj.resourceID + '&resourcename=' + encodeURI(pageObj.resourceNAME) + '" onclick="htmlObj.setJumpFrom(\'' + proCode + '\')">' + row.requireCount + '</a>'
                return rowHtml;
            }
        }/*, {
         display: "周报",
         width: "80px",
         align: "center",
         render: function (row) {
         return '√';
         }
         }*/, {
            display: "操作",
            width: "120px",
            align: "center",
            render: function (row) {
                var id = row.id,
                    name = row.proName,
                    managePersonId = row.managePersonId,
                    managePersonName = row.managePersonName,
                    proStatus = row.proStatus,
                    rowHtml = '';
                rowHtml += '<a class="oprate" title="详情" href="javascript:void(0);" onclick="htmlObj.toProDetail(\'' + id + '\')">详情</a>';
                // '<a class="oprate" title="写周报" href="javascript:void(0);" onclick="htmlObj.addWeekReport(\'' + id + '\')">写周报</a>' +
                if (proStatus != 3) {
                    rowHtml += '<a class="oprate" title="新建需求" href="javascript:void(0);" onclick="htmlObj.addNewDemand(\'' + id + '\',\'' + name + '\',\'' + managePersonId + '\',\'' + managePersonName + '\')">新建需求</a>';
                }
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
 * 点击项目列表的需求个数一项 或 项目详情中的项目需求按钮，存储需求管理中要查询的项目code
 * @param proCodeFromPM
 */
htmlObj.setJumpFrom = function (proCodeFromPM) {
    Utils.setTimeValue('proCodeFromPM', proCodeFromPM, 1);
};

/**
 * 设置参数
 * @param {Object} cmd
 */
htmlObj.setParam = function (cmd) {
    var ascription = $(".ascription li.active").attr("data-state"),
        marketlist = $("select[id='marketlist']").val(),
        provincelist = $("select[id='provincelist']").val(),
        citylist = $("select[id='citylist']").val(),
        countylist = $("select[id='countylist']").val(),
        projectstatuslist = $("select[id='projectstatuslist']").val(),
        leaderlist = $("input[id='leaderlist']").val(),
        personid = $("input[id='leaderlist']").attr("data-personid"),
        proMsg = $("input[name='proMsg']").val();
    if (!Utils.isNullorEmpty(ascription)) {
        cmd.scope = ascription;
    }
    if (!Utils.isNullorEmpty(marketlist)) {
        cmd.marktId = marketlist;
    }
    if (!Utils.isNullorEmpty(provincelist)) {
        cmd.provinceId = provincelist;
    }
    if (!Utils.isNullorEmpty(citylist)) {
        cmd.cityId = citylist;
    }
    if (!Utils.isNullorEmpty(countylist)) {
        cmd.areaId = countylist;
    }
    if (!Utils.isNullorEmpty(projectstatuslist)) {
        cmd.proStatus = projectstatuslist;
    }
    if (!Utils.isNullorEmpty(leaderlist)) {
        cmd.peopleName = leaderlist;
    }
    if (!Utils.isNullorEmpty(proMsg)) {
        cmd.proMsg = proMsg;
    }
    return cmd;
};

/**
 * 重置项目详情modal布局
 */
htmlObj.resetDetailModal = function () {
    $('.btn-editprod').text('编辑').attr('data-status', 'edit');
    $('#editblock').show();
    $('#editblock2').hide();
};

/**
 * 进入项目详情
 */
htmlObj.toProDetail = function (proId) {
    // 通过项目id拿项目角色
    htmlObj.getProRole(proId);

    $.ajax({
        url: htmlObj.rootUrl + '/pmo/project/' + proId + '/detail',
        type: 'get',
        beforeSend: function (request) {
            request.setRequestHeader("authorization", htmlObj.authorization);
        },
        success: function (data) {
            if (data.code == "success") {
                var content = data.content;
                var pmoPersonList = content.pmoPersonList;
                var pmoProject = content.pmoProject;
                $('#prodetail').find('.modal-title').html('【' + pmoProject.proName + '】的项目详情');
                $('#dprodate').val(pmoProject.proDate);
                $('#dprodate2').val(pmoProject.proDate);
                $('#dprocode').val(pmoProject.proCode);
                $('#dprocode2').val(pmoProject.proCode);
                var theArea = '';
                if (Utils.isNullorEmpty(pmoProject.city)) {
                    theArea += pmoProject.province;
                    if (!Utils.isNullorEmpty(pmoProject.area)) {
                        theArea += ' | ' + pmoProject.area;
                    }
                } else {
                    theArea += pmoProject.province + ' | ' + pmoProject.city;
                    if (!Utils.isNullorEmpty(pmoProject.area)) {
                        theArea += ' | ' + pmoProject.area;
                    }
                }
                $('#dproarea').val(theArea);
                $('#dproprovince2').find('option').each(function () {
                    var that = $(this);
                    if (that.val() == pmoProject.provinceId) {
                        that.attr("selected", true);
                    }
                });
                //项目详情--获取市
                htmlObj.getCity(pmoProject.provinceId, function (options) {
                    $('#dprocity2').html(options).find('option').each(function () {
                        var that = $(this);
                        if (that.val() == pmoProject.cityId) {
                            that.attr("selected", true);
                        }
                    });
                });
                //项目详情--获取县
                htmlObj.getCounty(pmoProject.cityId, function (options) {
                    $('#dprocounty2').html(options).find('option').each(function () {
                        var that = $(this);
                        if (that.val() == pmoProject.areaId) {
                            that.attr("selected", true);
                        }
                    });
                });
                //项目详情--显示营销中心
                $('#dmarket').val(pmoProject.marktName);
                $('#dmarket2').find('option').each(function () {
                    var that = $(this);
                    if (that.val() == pmoProject.marktId) {
                        that.attr("selected", true);
                    }
                });
                //项目详情--显示市场负责人
                $('#dproleader').val(pmoProject.marktPersonName);
                $('#dproleader2').val(pmoProject.marktPersonName).attr('data-personid', pmoProject.marktPersonId);
                //项目详情--显示项目经理
                $('#dpromanager').val(pmoProject.managePersonName);
                $('#dpromanager2').val(pmoProject.managePersonName).attr('data-personid', pmoProject.managePersonId);
                //项目详情--选择项目经理
                $('#dpromanager2').on('click', function () {
                	 htmlObj.personClickfrom = "dpromanager2";
                     $("#choosePersonModal").modal("show");
                     htmlObj.getDepLeaderList();
                });
                //项目详情--选择市场负责人
                $('#dproleader2').on('click', function () {
                	htmlObj.personClickfrom = "dproleader2";
                    $("#choosePersonModal").modal("show");
                    htmlObj.getDepLeaderList();
                });
                //项目详情--显示项目成员\
                var perOption = '';
                var perIds = '';
                for (var i = 0; i < pmoPersonList.length; i++) {
                    perOption += pmoPersonList[i].personName + '、';
                    perIds += pmoPersonList[i].personId + '_';
                }
                perOption = perOption.substring(0, perOption.length - 1);
                perIds = perIds.substring(0, perIds.length - 1);
                $('#dpromebs').val(perOption);
                $('#dpromebs').attr("data-personid",perIds);
                //项目详情--选择项目成员
                htmlObj.arr = pmoPersonList;
                $('#dpromebs2').val(perOption).attr("data-personid",perIds).on('click', function () {
                	htmlObj.personClickfrom = "dpromebs2";
                    $("#choosePersonModal").modal("show");
                    htmlObj.getDepLeaderList();
                });
                //项目详情--显示项目背景
                $('#dprodesc').val(pmoProject.proContents);
                //项目详情--填写项目背景
                $('#dprodesc2').val(pmoProject.proContents);

                // modal模式窗口的关闭事件（包括叉叉和取消按钮）回调
                $('#prodetail').on("hidden.bs.modal", function () {
                    document.getElementById("proDetailForm").reset();
                })
            } else {
                //显示错误信息
                pageObj.showNotLoginErrorMsg(data.code, data.message);
            }
        }
    });

    //重置项目详情modal布局
    htmlObj.resetDetailModal();
    //显示详情modal
    $('#prodetail').modal();
    //点击编辑按钮
    $('.btn-editprod').on('click', function () {
    	if ($(this).attr('data-status') == 'update') {
            //提交项目详情修改
            htmlObj.formvalidatorProDetail(proId);
            return;
        } else {
        // 是编辑时
            event.preventDefault();
            $(this).text('提交').attr('data-status', 'update');
            $('#editblock').hide();
            $('#editblock2').show();
            //初始化日期
            $("#dprodate2").addClass('laydate-icon').focus(function () {
                laydate({
                    elem: "#dprodate2",
                    format: "YYYY-MM-DD",
                    festival: true,
                    istime: false,
                    choose: function () {
                        $("#dprodate2").focusout();
                    }
                });
            });
        }
    });
    //点击关闭项目
    $('.btn-closepro').on('click', function () {
        htmlObj.closeProject(proId);
    });
    //点击项目需求
    $('.btn-prodemand').on('click', function () {
        event.preventDefault();
        //进入需求管理页面，并显示此项目的需求列表
        window.location.href = "main.html?resourceid=" + pageObj.resourceID + "&resourcename=" + encodeURI(pageObj.resourceNAME);
        //把项目code存到cookie
        htmlObj.setJumpFrom($('#dprocode2').val());
    });
};

/**
 * 表单验证--项目详情--修改项目详情
 */
htmlObj.formvalidatorProDetail = function (proId) {
    //表单验证
    validatorOfDetail = $("#proDetailForm").validate({
        debug: true,
        onfocusout: function (element) {
            $(element).valid();
        },
        submitHandler: function () {
            //修改项目详情
            htmlObj.updateProDetail(proId);
        },
        rules: {
            dprodate2: {
                required: true
            },
            dmarket2: {
                required: true
            }, dproprovince2: {
                required: true
            }, dpromanager2: {
                required: true
            }, dproleader2: {
                required: true
            }, dpromebs2: {
                required: true
            }, dprodesc2: {
                required: true
            }
        }, messages: {
            dprodate2: {
                required: "请选择立项日期！"
            }, dmarket2: {
                required: "请选择营销中心！",
            }, dproprovince2: {
                required: "请选择省份！",
            }, dpromanager2: {
                required: "请选择项目经理！",
            }, dproleader2: {
                required: "请输入市场负责人！",
            }, dpromebs2: {
                required: "请选择项目成员！",
            }, dprodesc2: {
                required: "请输入项目背景！",
            }
        }, errorPlacement: function (error, element) {
            //修改提示信息出现的位置
            var eleName = $(element).attr("name");
            error.css({'margin-left': '64px'})
            if (eleName == "dproprovince2") {
                $(element).blur();
                error.insertAfter(element.parents(".eb2-selects"));
            } else {
                error.appendTo(element.parent());
            }

        }
    });
};

/**
 * 修改项目详情
 */
htmlObj.updateProDetail = function (projectID) {
    var $procreatetime = $('#dprodate2');
    var $projectcontext = $('#dprodesc2');
    var $marketlistadd = $('#dmarket2');
    var $provincelistadd = $('#dproprovince2');
    var $citylistadd = $('#dprocity2');
    var $countylistadd = $('#dprocounty2');
    var $leaderlist1add = $('#dproleader2');
    var $leaderlist2add = $('#dpromanager2');
    var obj = {};
    //项目id
    obj['id'] = projectID;
    //立项时间
    obj['proDate'] = $procreatetime.val();
    //项目背景
    obj['proContents'] = $projectcontext.val();
    //营销中心
    obj['marktId'] = $marketlistadd.val();
    obj['marktName'] = $marketlistadd.find("option:selected").text();
    //省、市、县
    obj['provinceId'] = $provincelistadd.val();
    obj['province'] = $provincelistadd.find("option:selected").text();
    if (Utils.isNullorEmpty($citylistadd.val())) {
        obj['cityId'] = '';
        obj['city'] = '';
    } else {
        obj['cityId'] = $citylistadd.val();
        obj['city'] = $citylistadd.find("option:selected").text();
    }
    if (Utils.isNullorEmpty($countylistadd.val())) {
        obj['areaId'] = '';
        obj['area'] = '';
    }
    else {
        obj['areaId'] = $countylistadd.val();
        obj['area'] = $countylistadd.find("option:selected").text();
    }
    //市场负责人 标识是2
    var leaderObj = {};
    leaderObj['personId'] = $leaderlist1add.attr('data-personid');
    leaderObj['personName'] = $leaderlist1add.val();
    leaderObj['personCategory'] = 2;
    //项目经理 标识是1
    var promanObj = {};
    promanObj['personId'] = $leaderlist2add.attr('data-personid');
    promanObj['personName'] = $leaderlist2add.val();
    promanObj['personCategory'] = 1;
    //项目成员 标识是3 ,值取自htmlObj.arr
    var ary=[];
    var ids = $("#dpromebs2").attr("data-personid").split("_");
    var names = $("#dpromebs2").val().split("、");
    for(var i = 0;i < ids.length;i++){
    	var objj = {};
    	objj['personId'] = ids[i];
    	objj['personName'] = names[i];
    	objj['personCategory'] = 3;
    	ary[i] = objj;
    }
    //拼接参数
    var theJson = JSON.stringify({"pmoProject": obj, "pmoPersonList": [leaderObj].concat([promanObj]).concat(ary)});
    //请求接口
    $.ajax({
        url: htmlObj.rootUrl + '/pmo/project/update',
        type: 'put',
        data: theJson,
        beforeSend: function (request) {
            request.setRequestHeader("Content-Type", "application/json;charset=UTF-8;");
            request.setRequestHeader("authorization", htmlObj.authorization);
        },
        success: function (data) {
            if (data.code == "success") {
                $('#prodetail').modal('hide');
                //刷新项目列表
                htmlObj.getProList();
            } else {
                //显示错误信息
                pageObj.showNotLoginErrorMsg(data.code, data.message);
            }
        }
    });
};

/**
 * 关闭项目
 * @param proId
 */
htmlObj.closeProject = function (proId) {
    $.ajax({
        url: htmlObj.rootUrl + '/pmo/project/' + proId + '/close',
        type: 'put',
        beforeSend: function (request) {
            request.setRequestHeader("Content-Type", "application/json;charset=UTF-8;");
            request.setRequestHeader("authorization", htmlObj.authorization);
        },
        success: function (data) {
            if (data.code == "success") {
                $('#prodetail').modal('hide');
                //刷新项目列表
                htmlObj.getProList();
            } else {
                //显示错误信息
                pageObj.showNotLoginErrorMsg(data.code, data.message);
            }
        }
    });
};

/**
 * 进入新建需求
 * @param proId
 */
htmlObj.addNewDemand = function (proId, proName, managePersonId, managePersonName) {
    var demandEditModal = $('#demandEditPanel');
    //打开新建需求modal
    demandEditModal.modal();
    //显示项目名称
    $('input[name=proInfo]').val(proName).attr('data-proid', proId);
    $('input[name=receivePerson]').val(managePersonName).attr('data-id', managePersonId);
    // 关闭新建需求modal时重置
    demandEditModal.on("hidden.bs.modal", function () {
        htmlObj.resetValide(validatorOfDemand, demandEditModal);
        document.getElementById('demandEditForm').reset();
        //重置富文本
        $("#reqDetail").html('');
    });
};

/**
 * 初始化wangEditor富文本编辑器
 */
htmlObj.wangEditorInit = function () {
    var u = Utils.getValue("u"),
        v = Utils.getValue("v");
    var url = htmlObj.rootUrl + "/file/upload";
    wangEditor.config.printLog = false;
    var reqDetail = new wangEditor("reqDetail");
    reqDetail.config.uploadImgUrl = url;

    wangEditor.config.uploadImgFns.onload = function (resultText, xhr) {
        var result = Utils.parse(resultText);
        if (result.code == "success") {
            var content = result.content;
            var imgurl = htmlObj.rootUrl + "/file/download?&fileName=" + content;
            var editContent = this.$parent.find(".wangeditor-container").attr("id"),
                imgHtml = "<img src=\"" + imgurl + "\" alt=\"图片\" >";
            if (editContent == "reqDetail") {
                reqDetail.command(null, "insertHtml", imgHtml);
            }
        } else {
            if (window.console) {
                console.log("上传失败！");
            }
        }
    };
    reqDetail.create();
    reqDetail.$txt.html("");
};

/**
 * 写周报
 * @param proId
 */
htmlObj.addWeekReport = function (proId) {
    window.location.href = "addWeekReport.html" + '?proId=' + proId;
};

/**
 * 获取接收人列表
 */
htmlObj.getUsersList = function (proId, callback, keyword) {
    var url = htmlObj.rootUrl + "/pmo/project/" + proId + "/users";
    $.ajax({
        type: "get",
        url: url,
        beforeSend: function (request) {
            request.setRequestHeader("authorization", htmlObj.authorization);
        },
        success: function (data) {
            callback(data);
        }
    });
};

/**
 * 显示项目相关人员--新建需求
 * @param data
 */
htmlObj.showUserList = function (data) {
    var code = data.code;
    if (code == "success") {
        var content = data.content,
            content_len = content.length,
            result_html = "";
        if (content_len > 0) {
            for (var i = 0; i < content_len; i++) {
                var items = data.content[i],
                    personId = items.personId,
                    personName = items.personName;
                result_html += "<p class=\"search-items\">";
                result_html += "<span class=\"rsc-name\">" + personName + "</span>";
                result_html += "<input name=\"rsc-id\" type=\"hidden\" value=\"" + personId + "\">";
                result_html += "</p>";
            }
            $(".user-search").find(".renew-search-border").empty().append(result_html);
        }
    }
};

/**
 * 表单验证
 */
htmlObj.formValidateAddDemand = function () {
    var editorCheck = function (editid) {
        var editorEdit = $("#" + editid).html(),
            result = false;
        if (Utils.isNullorEmpty(editorEdit) || editorEdit == "<p><br></p>") {
            var error = "<label class=\"error\" for=\"editorExamine\">请输入需求详情</label>";
            if ($("#" + editid).parents(".wangEditor-container").find("label[for='editorExamine']").length <= 0) {
                $("#" + editid).parents(".wangEditor-container").append(error);
            } else {
                $("#" + editid).parents(".wangEditor-container").find("label[for='editorExamine']").text("请输入需求详情").show();
            }
            return false;
        } else {
            var reg = /<[^>]*>|/g,
                editorText = editorEdit.replace(/<[^>]*>|/g, "");
            if (editorEdit.length > 600) {
                var error = "<label class=\"error\" for=\"editorExamine\">需求详情内容最大输入长度为600</label>";
                if ($("#" + editid).parents(".wangEditor-container").find("label[for='editorExamine']").length <= 0) {
                    $("#" + editid).parents(".wangEditor-container").append(error);
                } else {
                    $("#" + editid).parents(".wangEditor-container").find("label[for='editorExamine']").text("需求详情内容最大输入长度为600").show();
                }
                return false;
            } else {
                $("#" + editid).parents(".wangEditor-container").find("label[for='editorExamine']").remove();
                result = true;
            }
        }
        return result;
    };

    validatorOfDemand = $("#demandEditForm").validate({
        debug: true,
        onfocusout: function (element) {
            $(element).valid();
        },
        onsubmit: function (element) {
            $(element).valid();
        },
        errorPlacement: function (error, element) {
            var eleName = $(element).attr("name");
            if (eleName == "reqEmergency") {
                error.appendTo(element.parents(".errorPlacement"));
            } else {
                error.appendTo(element.parent());
            }
        },
        submitHandler: function () {//验证完成，保存数据
            var editcheck = editorCheck("reqDetail");
            if (editcheck == true || editcheck == "true") {
                $('#btnToAddDMD').attr('disabled', 'disabled');
                htmlObj.editDemand();//新增需求
            }
        },
        rules: {
            proInfo: {
                required: true
            },
            receivePerson: {
                required: true
            },
            reqEmergency: {
                required: true
            },
            reqtitle: {
                required: true,
                maxlength: 50
            }
        },
        messages: {
            proInfo: {
                required: "请选择项目名称"
            },
            receivePerson: {
                required: "请选择需求接收人"
            },
            reqEmergency: {
                required: "请选择是否紧急"
            },
            reqtitle: {
                required: "请输入需求标题",
                maxlength: "最多输入50个字符"
            }
        }
    });

    $("#reqDetail").on("keyup", function () {
        var editid = $(this).attr("id");
        editorCheck(editid);
    });
};

/**
 * 新建需求
 */
htmlObj.editDemand = function () {
    var url = htmlObj.rootUrl + "/pmo/require/add_submit",
        proInfo = $("input[name='proInfo']").val(),
        proId = $("input[name='proInfo']").attr("data-proid"),
        proCode = $("input[name='proInfo']").attr("data-code"),
        receivePersonName = $("input[name='receivePerson']").val(),
        receivePersonId = $("input[name='receivePerson']").attr("data-id"),
        reqEmergency = $("input[name='reqEmergency']:checked").val(),
        reqtitle = $("input[name='reqtitle']").val(),
        reqDetail = $("#reqDetail").html(),
        data = {};
    if (!Utils.isNullorEmpty(proId)) {
        data.proId = proId.trim();
    }
    if (!Utils.isNullorEmpty(proCode)) {
        data.proCode = proCode.trim();
    }
    if (!Utils.isNullorEmpty(receivePersonName)) {
        data.receivePersonName = receivePersonName.trim();
    }
    if (!Utils.isNullorEmpty(receivePersonId)) {
        data.receivePersonId = receivePersonId.trim();
    }
    if (!Utils.isNullorEmpty(reqEmergency)) {
        data.reqEmergency = reqEmergency;
    }
    if (!Utils.isNullorEmpty(reqtitle)) {
        data.reqTitle = reqtitle.trim().escapeHtml();
    }
    if (!Utils.isNullorEmpty(reqDetail)) {
        reqDetail = reqDetail.trim().escapeHtml();
        data.reqDetail = filterXSS(reqDetail);
    }
    $.ajax({
        type: "post",
        url: url,
        data: JSON.stringify(data),
        beforeSend: function (request) {
            request.setRequestHeader("Content-Type", "application/json;charset=UTF-8;");
            request.setRequestHeader("authorization", htmlObj.authorization);
        },
        success: function (data) {
            var code = data.code,
                message = data.message;
            if (code == "success") {
                $("#demandEditPanel").modal('hide');
                htmlObj.resetValide(validatorOfDemand, $("#demandEditPanel"));
                document.getElementById('demandEditForm').reset();
                //重置富文本
                $("#reqDetail").html('');
                $('#btnToAddDMD').removeAttr('disabled');//解禁
                //刷新项目列表
                htmlObj.getProList();
            } else {
                message = Utils.isNullorEmpty(message) ? "新增需求失败！" : message;
                $("#demandEditPanel .modal-msg").empty().show.text(message);
            }
        }
    });
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
htmlObj.resetValide = function (validator, node) {
    validator.resetForm();
    node.find('input,select,textarea').each(function () {
        if ($(this).hasClass('error')) {
            $(this).removeClass('error');
        }
    });
    node.find('.input_clear').hide();
};

/**
 * 导出项目
 */
// htmlObj.export = function () {
//     $("#exportExclePanel").on("click", "#export-sure", function () {
//
//         var url = htmlObj.rootUrl + "/pmo/project/download/excel",
//             data = {};
//         data = htmlObj.setParam(data);
//         var str ="";
//         var num = 1;
//         for(var i in data) {
//             if (num == 1) {
//                 str += i + "=" + data[i];
//             } else {
//                 str += "&" + i + "=" + data[i];
//             }
//             num += 1;
//         }
//         var downloadurl = url + "?" + str + "&authorization=" + htmlObj.authorization;
//         window.open(downloadurl);
//         $("#exportExclePanel").modal("hide");
//     });
// };

/**
 * 根据项目id拿角色
 * @param proId
 */
htmlObj.getProRole = function (proId) {
    $.ajax({
        url: htmlObj.rootUrl + '/pmo/project/' + proId + '/role',
        type: 'get',
        beforeSend: function (request) {
            request.setRequestHeader("authorization", htmlObj.authorization);
        },
        success: function (data) {
            if (data.code == "success") {
                var content = data.content;
                if (!Utils.isNullorEmpty(content)) {
                    //如果是项目经理，开放关闭项目的按钮
                    if (content.personCategory == 1) {
                        $('#prodetail').find('.btn-closepro').show();
                    }else{
                        $('#prodetail').find('.btn-editprod').hide();
                    }
                }
            } else {
                //显示错误信息
                pageObj.showNotLoginErrorMsg(data.code, data.message);
            }
        }
    });
};
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

    //选择部门负责人modal的关闭事件
    $('#chooseDepLeaderModal').on("hidden.bs.modal", function () {
        switch (htmlObj.personClickfrom) {
            case 'leaderlist':
                $('#addDepModal').removeClass('z-index20');
                break;
            case 'leaderlist2add':
                $('#addpro').removeClass('z-index20');
                break;
            case 'leaderlist3add':
                $('#addpro').removeClass('z-index20');
                break;
        }
    });
};

//模糊查询点击事件
$('#btnSearchDepLeader').on('click', function () {
    htmlObj.getDepLeaderList();
});
/**
 * 获取选择的负责人，并显示到来源input
 * @param personId
 */
htmlObj.chooseLeader = function(personId, personName) {
	if (htmlObj.personClickfrom == "dpromebs2"|| htmlObj.personClickfrom == "leaderlist3add") {
		var ids = $('#' + htmlObj.personClickfrom).attr("data-personid");
		var name = $('#' + htmlObj.personClickfrom).val();
		if (Utils.isNullorEmpty(ids)) {
			$('#' + htmlObj.personClickfrom).val(personName).attr('data-personid', personId).blur();
		}
		else if(ids.indexOf(personId) == -1){
			$('#' + htmlObj.personClickfrom).attr("data-personid",ids + "_" + personId);
			$('#' + htmlObj.personClickfrom).val(name + "、" + personName);
		}
	} else if (htmlObj.personClickfrom == 'receivePerson'){
        $('#receivePerson').val(personName).attr('data-id', personId);
    }else {
		$('#' + htmlObj.personClickfrom).val(personName).attr('data-personid',personId).blur();
	}
	$('#choosePersonModal').modal('hide');
	$('#queryKD').val('');
	htmlObj.getDepLeaderList();
	if ($('#' + htmlObj.personClickfrom).val() != '') {
		$('#' + htmlObj.personClickfrom).parent().find('.input_clear').show();
	}
};
/**
 *
 * 快捷入口进入
 */
htmlObj.getEntryType = function () {
    var fastEntry = Utils.getValue('fastEntry');
    var type = fastEntry.split('|')[0];
    var id = fastEntry.split('|')[1];
    if(type == 'approval'){   //发起立项
        $('#addpro').modal("show");
    }else if(type == 'need'){
        $('.main-menu li').each(function(a, b){
            if($(b).attr('data-id') == id){
                $(b).find('a').trigger('click');
                setTimeout(function(){
                    $('#demandEditPanel').modal('show');
                }, 800)
            }
        })
    }
    Utils.setValue('fastEntry', 'null');
};
/**
 * 初始化
 */
htmlObj.init = function () {
    //获取菜单按钮
    htmlObj.getMenuButton();

    //获取项目列表
    htmlObj.getProList();
    $(".button-position").on("click", ".btn-search", function () {
        htmlObj.getProList();
    });
    //获取营销中心
    htmlObj.getMarketCenter();
    //获取省
    htmlObj.getProvince();
    //获取负责人
    htmlObj.initLeader();
    htmlObj.getEntryType();

    //项目归属点击查询列表
    $(".ascription").on("click", "li", function () {
        var $this = $(this);
        $this.addClass("active").siblings("li").removeClass("active");
        $(this).parents(".form-horizontal").find(".btn-search").click();
    });

    $('#receivePerson').on('click', function () {
        htmlObj.personClickfrom = "receivePerson";
        $("#choosePersonModal").modal("show");
        htmlObj.getDepLeaderList();
    });

    //主页面-选择负责人
    /*$('#leaderlist').on('click', function () {
    	htmlObj.personClickfrom = "leaderlist";
        $("#choosePersonModal").modal("show");
        htmlObj.getDepLeaderList();
    });*/
    //添加项目--选择市场负责人
    $('#leaderlist1add').on('click', function () {
        //降低新建项目modal的层级
        htmlObj.personClickfrom = "leaderlist1add";
        $("#choosePersonModal").modal("show");
        htmlObj.getDepLeaderList();
    });
    //添加项目--选择项目经理
    $('#leaderlist2add').on('click', function () {
        htmlObj.personClickfrom = "leaderlist2add";
        $("#choosePersonModal").modal("show");
        htmlObj.getDepLeaderList();
    });
    //添加项目--选择项目成员
    $('#leaderlist3add').on('click', function () {
        htmlObj.personClickfrom = "leaderlist3add";
        $("#choosePersonModal").modal("show");
        htmlObj.getDepLeaderList();
    });
    //获取项目状态
    htmlObj.getProjectStatus();
    //初始化日期
    $("#procreatetime").focus(function () {
        laydate({
            elem: "#procreatetime",
            format: "YYYY-MM-DD",
            festival: true,
            istime: false,
            choose: function () {
                $("#procreatetime").focusout();
            }
        });
    });

    //添加项目--验证表单
    htmlObj.formvalidator();
    //初始化wangEditor富文本编辑器
    htmlObj.wangEditorInit();
    //表单验证--新建需求
    htmlObj.formValidateAddDemand();
    $(".input_clear").parent().find("input").focus(function(event){  
    	if($(this).val()=='') {
    		$(this).parent().children(".input_clear").show();  
    	}
    });  
    $(".input_clear").parent().find("input").blur(function(event){  
        if($(this).val()=='')  
        {  
            $(this).parent().children(".input_clear").hide();  
        }  
    });  
    $(".input_clear").click(function(event){  
        $(this).parent().find('input').val('');  
        $(this).parent().find('input').attr('data-personid','');  
        $(this).hide();  
    });
    $('#choosePersonModal').on('hidden.bs.modal', function (e) {
    	$("#queryKD").val("");
    })
};

Date.prototype.Format = function (fmt) { //author: meizz 
    var o = {
        "M+": this.getMonth() + 1, //月份 
        "d+": this.getDate(), //日 
        "h+": this.getHours(), //小时 
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

$(function () {
    htmlObj.init();
});