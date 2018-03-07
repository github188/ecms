/**
 * 考勤管理-考勤审批单
 * @author:xiongxiaojun
 * @time:2017-09-11
 *
 */

var approve = {
    url: appHost + approot,
    authorization: Utils.getValue('authorization')
};


/**
 * 获取部门列表
 */
approve.getDepartTreeList = function () {
    $.ajax({
        url: approve.url + '/authority/dep/tree/list',
        type: 'get',
        beforeSend: function (request) {
            request.setRequestHeader("authorization", approve.authorization);
        },
        success: function (data) {
            if (data.code == "success") {
                var zNodes = data.content;

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
                        onClick: function (a, b, obj) {
                            $('.dep-parentname').val(obj.name).attr('data-id', obj.id);
                            $('#DepartForSuperiorEditPanel').hide();
                            $('#clearDepart').show();
                        }
                    }
                };
                $.fn.zTree.init($("#treeDepartForSuperiorEdit"), setting, zNodes);
                var treeDepartForSuperiorEdit = $.fn.zTree.getZTreeObj("treeDepartForSuperiorEdit");
                var theRootNode = treeDepartForSuperiorEdit.getNodeByParam('id', 1, null);
                treeDepartForSuperiorEdit.expandNode(theRootNode);
            } else {
                //显示错误信息
                layer.msg(data.message);
            }
        }
    });
};

/**
 * 获取审批单列表
 */
approve.getList = function(){
    var cmd = new CommandAjax(approve.url + "/sys/process/cwa/list", approve.authorization);
    var object = {
        cwaType: $('#affairsType').val(),
        starttime: $('#startDate').val() && new Date($('#startDate').val()).toString().toTime(),
        endtime: $('#endDate').val() && new Date($('#endDate').val()).toString().toTime(),
        depId:  $('.dep-parentname').attr('data-id') || 1,
        authorName: $('#userName').val()
    };
    for (var i in object) {
        if (object[i] !== '' && object[i] !== null && object[i] !== undefined) {
            cmd[i] = object[i]
        }
    }
    $("#clockList tbody tr").empty();
    $("#clockList").datagrid({
        columns: [{
            display: "考勤类型",
            name: "typeName",
            width: "80px"
        }, {
            display: "日期",
            width: "130px",
            render: function (row) {
                return new Date(parseInt(row.addTime));
            }
        }, {
            display: "部门",
            width: "160px",
            render: function (row) {
                return  (row.depName).split('-').reverse().join('-');
            }
        },{
            display: "申请人",
            name: "authorName",
            width: "160px"
        },{
            display: "操作",
            width: "160px",
            render: function (row) {
                var processId = row.id;
                var cwaType = row.cwaType;
                return '<a class="oprate" title="详情" target="_blank" href="portals/workOrder/workOrderDetail.html?type='+ cwaType +'&processId='+ processId +'">详情</a>';
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
    })
};
/**
 * 获取请假类型
 */
approve.getAffairsType = function () {
    $.ajax({
        url: approve.url + '/ctm/setting/param/list',
        type: 'get',
        async: false,
        beforeSend: function (request) {
            request.setRequestHeader("Content-Type", "application/json;charset=UTF-8;");
            request.setRequestHeader("authorization", approve.authorization);
        },
        data: {
            code : 'processtype'
        },
        success: function (data) {
            if (data.code == "success") {
                var options = '<option value="">--请选择--</option>';
                var status = data.content;
                for (var i = 0; i < status.length; i++) {
                    if(status[i].value != 4 ){
                        options += '<option value="' + status[i].value + '">' + status[i].name + '</option>';
                    }
                }
                $('#affairsType').html(options);
            } else {
                layer.msg(data.message);
            }
        }
    });
};

/**
 * 初始化
 */
approve.init = function() {
    this.getList();
    this.getDepartTreeList();
    this.getAffairsType();


    var start = {
        // min: laydate.now() ,
        max: '2099-06-16 23:59:59'
        ,istoday: true
        ,choose: function(datas){
            end.min = datas; //开始日选好后，重置结束日的最小日期
            end.start = datas; //将结束日的初始值设定为开始日
        }
    };

    var end = {
        max: '2099-06-16 23:59:59'
        ,istoday: true
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

    $('.dep-parentname').on('click', function(){
        $('#DepartForSuperiorEditPanel').show();
    });

    $('#closeDepartForSuperiorEdit').on('click', function () {
        $('#DepartForSuperiorEditPanel').hide();
    });

    $('#clearDepart').on('click', function () {
        $('.dep-parentname').val('').attr('data-id', '');
        $(this).hide();
    });

    $('.btn-search').on('click', function () {
        approve.getList();
    });
};
$(function () {
    approve.init();
});