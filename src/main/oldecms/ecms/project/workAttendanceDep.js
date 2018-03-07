/**
 * 考勤模块-考勤报表
 * @author: xiongxiaojun
 * @time:2017-07-31
 */
var workAttendance = {
    authorization: Utils.getValue('authorization'), //获取登录人的userId和Token
    url: appHost + approot,
    attendanceRecord: {},   //修改考勤记录
    affairsType: []
};

/**
 * 获取部门列表
 */
workAttendance.getDepartTreeList = function () {
    $.ajax({
        url: workAttendance.url + '/cwa/attendance/admin/tree',
        type: 'get',
        beforeSend: function (request) {
            request.setRequestHeader("authorization", workAttendance.authorization);
        },
        success: function (data) {
            if (data.code == "success") {
                var zNodes = data.content;
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
                        onClick: function (a, b, c) {
                            $('#personList').html('<p style="text-align: center; margin-top: 200px;">加载中...</p>');
                            $('#page').empty();
                            workAttendance.depId = c.id;
                            workAttendance.getPersonListByDepId(workAttendance.depId)
                        }
                    }
                };
                $.fn.zTree.init($("#treeDepart"), setting1, zNodes);
                var treeDepartObj = $.fn.zTree.getZTreeObj("treeDepart");
                treeDepartObj.expandAll(true);
                workAttendance.getPersonListByDepId(1);
            } else {
                //显示错误信息
                layer.msg(data.message);
            }
        }
    });
};
/**
 * 通过部门id获取部门人员列表
 */
workAttendance.getPersonListByDepId = function (depId) {
    if(!depId){
        depId = 1;
    }
    var cmd = new CommandAjax(workAttendance.url + "/cwa/attendance/atten/list", workAttendance.authorization);
    var name = $('#userName').val();
    var month = $('#layDate').val();
    if (!Utils.isNullorEmpty(name)) {
        cmd.name = name;
    }
    if (!Utils.isNullorEmpty(month)) {
        cmd.month = month;
    }
    cmd.depId = depId;

    $("#personList").datagrid({
        columns: [{
            display: "姓名",
            width: "70px",
            name: "userRealname"
        }, {
            display: "工号",
            name: "usercode",
            width: "80px",
            align: "center"
        }, {
            display: "部门",
            name: "depName",
            width: "80px",
            align: "center"
        }, {
            display: "正常",
            name: "normal",
            width: "80px"
        }, {
            display: "加班",
            name: "overtime",
            width: "80px"
        }, {
            display: "出差",
            name: "travel",
            width: "80px"
        },{
            display: "年休假",
            name: "leave0",
            width: "80px"
        },{
            display: "调休假",
            name: "leave1",
            width: "80px"
        },{
            display: "病假",
            name: "leave2",
            width: "80px"
        },{
            display: "事假",
            name: "leave3",
            width: "80px"
        },{
            display: "有薪假",
            name: "leave4",
            width: "80px"
        },{
            display: "操作",
            width: "100px",
            align: "center",
            render: function (row) {
                var id = row.userId;
                return '<a class="oprate detail-attendance" data-id="'+ id +'" title="详情">详情</a>';
            }
        }],
        reqdata: cmd,
        isShowCheckBox: false,
        rowNumber: false,
        onResponse: function (data) {
            return data;
        },
        onComplete: function (data) {

        }
    });
};
workAttendance.editAttendanceValidate = function () {
    $("#editAttendanceForm").validate({
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
            var data = workAttendance.attendanceRecord;
            data.type = $('#leaveType').val();
            data.typeName = $('#leaveType').find('option:selected').text();
            data.time = $('#duration').val();
            data.remark = $('#remark').val();
            data.userId = $('#detailAttendanceModal').attr('data-id');
            workAttendance.editAttendance(data);
        },
        rules: {
            status: {
                required: true
            },
            duration: {
                required: true
            },
            remark: {
                required: true,
                maxlength: 250
            }
        },
        messages: {
            status: {
                required: "请选择状态！"
            },
            duration: {
                required: "请选择时长！"
            },
            remark: {
                required: "备注不能为空！",
                maxlength: "最多输入250个字符"
            }
        }
    });
};

/**
 * 获取当前登录人在考勤报表里面能看到的按钮
 */
workAttendance.getMenuButton = function () {
    var resourceId = $(".main-menu li.active").attr("data-id");
    $.ajax({
        url: workAttendance.url + '/authority/resource/user/resources?resourceId=' + resourceId,
        type: 'get',
        async: false,
        beforeSend: function (request) {
            request.setRequestHeader("authorization", workAttendance.authorization);
        },
        success: function (data) {
            if (data.code == "success") {
                var content = data.content;
                var options = '';
                for (var i = 0; i < content.length; i++) {
                    var theData = content[i];
                    if(theData.url == "submitReport" || theData.url == "sendEmail" || theData.url == "exportReport" ){
                        options += '<button class="btn btn-turquoise" id="' + theData.url + '">' + theData.name + '</button>';
                    }
                }
                $('#workAttendanceButton').append(options);
            } else {
                //显示错误信息
                layer.msg(data.message);
            }
        }
    });
};

/**
 * 获取请假类型
 */
workAttendance.getAffairsType = function () {
    $.ajax({
        url: workAttendance.url + '/ctm/setting/param/list',
        type: 'get',
        async: false,
        beforeSend: function (request) {
            request.setRequestHeader("Content-Type", "application/json;charset=UTF-8;");
            request.setRequestHeader("authorization", workAttendance.authorization);
        },
        data: {
            code : 'cwa_leave_type'
        },
        success: function (data) {
            if (data.code == "success") {
                workAttendance.affairsType = data.content;
            } else {
                layer.msg(data.message);
            }
        }
    });
};
/**
 * 渲染请假类型
 */
workAttendance.setAffairsType = function () {
    var status = workAttendance.affairsType;
    var options = '<option value="">--请选择--</option>';
    for (var i = 0; i < status.length; i++) {
        if(status[i].value != 9){
            options += '<option value="' + status[i].value + '">' + status[i].name + '</option>';
        }
    }
    $('#leaveType').html(options);
};

/**
 * 修改考勤记录
 */
workAttendance.editAttendance = function (data) {
    $.ajax({
        url: workAttendance.url + '/cwa/attendance/update',
        type: 'put',
        beforeSend: function (request) {
            request.setRequestHeader("Content-Type", "application/json;charset=UTF-8;");
            request.setRequestHeader("authorization", workAttendance.authorization);
        },
        data: JSON.stringify(data),
        success: function (data) {
            if (data.code == "success") {
                layer.msg('操作成功！');
                workAttendance.getHumanAttendance($('#layDate').val(), $('#detailAttendanceModal').attr('data-id'));
                $('#editAttendanceModal').modal('hide');
            } else {
                layer.msg(data.message);
            }
        }
    });
};

/**
 * 获取用户的考勤
 */
workAttendance.getHumanAttendance = function (dates, id) {
    var date = dates.split('-');
    var year = date[0];
    var month = date[1];
    $.ajax({
        url: workAttendance.url + '/cwa/attendance/list',
        type: 'get',
        data: {
            month: dates,
            userId: id
        },
        beforeSend: function (request) {
            request.setRequestHeader("authorization", workAttendance.authorization);
        },
        success: function (data) {

            if (data.code == "success") {
                var config = {
                    year: year,
                    month: month,
                    leaveType: workAttendance.affairsType,
                    data: data
                };
                if(!workAttendance.isSubmit(workAttendance.depId, dates)){  //如果已经提交报表，则不能编辑
                    config.edit =  function (date, id) {
                        $('#editAttendanceModal').modal('show');
                        $('#detailAttendanceModal').css('z-index', 10);
                        workAttendance.attendanceRecord = {
                            date: date,
                            id: id
                        };
                    }
                }
                $('#calendarTable').calendarRecord(config);

            } else {
                //显示错误信息
                layer.msg(data.message);
            }


            // if (data.code == "success") {
            //     console.log(data,  'data');
            //     $('#calendarTable').calendarRecord({
            //         year: year,
            //         month: month,
            //         leaveType: workAttendance.affairsType,
            //         data: data,
            //         edit: function (date, id) {
            //             $('#editAttendanceModal').modal('show');
            //             $('#detailAttendanceModal').css('z-index', 10);
            //             workAttendance.attendanceRecord = {
            //                 date: date,
            //                 id: id
            //             };
            //         }
            //     });
            // } else {
            //     //显示错误信息
            //     layer.msg(data.message);
            // }
        }
    });
};

/**
 * 判断部门是否已经提交
 */
workAttendance.isSubmit = function (depId, month) { //返回true表示已提交
    var flag = true;
    $.ajax({
        url: workAttendance.url + '/cwa/attendance/issubmit',
        type: 'get',
        data: {
            depId: depId,
            date: month
        },
        async: false,
        beforeSend: function (request) {
            request.setRequestHeader("authorization", workAttendance.authorization);
        },
        success: function (data) {
            if (data.code == "success") {
                if(data.content == 0){ //未提交
                    flag = false;
                }
            } else {
                //显示错误信息
                layer.msg(data.message);
            }
        }
    });
    return flag;
};

workAttendance.init = function () {
    monthPicker.create('layDate', {
        autoCommit: true,
        trigger : 'layDate',
        callback : function(dates){
            $('#layDate').val(dates)
        }
    });

    this.getDepartTreeList();
    this.getMenuButton();
    this.editAttendanceValidate();
    this.getAffairsType();
    var editAttendanceModal = $('#editAttendanceModal');  //修改考勤记录的模态框
    var detailAttendanceModal = $('#detailAttendanceModal');  //查看考勤记录详情的模态框

    editAttendanceModal.on('shown.bs.modal', function () {
        workAttendance.setAffairsType();
        $('#remark').val('');
    }).on('hidden.bs.modal', function () {
        detailAttendanceModal.css('z-index', 1050);
    });


    $('.table-responsive').on('click', '.detail-attendance', function(){   //查看考勤记录详情
        var id = $(this).attr('data-id');
        detailAttendanceModal.modal('show');
        detailAttendanceModal.attr('data-id', id);
    });

    detailAttendanceModal.on('shown.bs.modal', function () {
        var dates = $('#layDate').val();
        workAttendance.getHumanAttendance(dates, detailAttendanceModal.attr('data-id'));
    });



    $('.btn-search').on('click', function () {
        workAttendance.getPersonListByDepId(workAttendance.depId);
    });
    
    $('#workAttendanceButton').on('click', '#submitReport', function () {  //提交报表
        var depId =  workAttendance.depId || 1;
        var name = $('#userName').val();
        var month = $('#layDate').val();
        var data = {
            depId: depId
        };

        if(workAttendance.isSubmit(depId, month)){
            layer.msg('报表已经提交过了！');
            return;
        }

        if (!Utils.isNullorEmpty(name)) {
            data.name = name;
        }
        if (!Utils.isNullorEmpty(month)) {
            data.month = month;
        }

        $.ajax({
            url: workAttendance.url + '/cwa/attendance/table/submit',
            type: 'post',
            data: JSON.stringify(data),
            beforeSend: function (request) {
                request.setRequestHeader("authorization", workAttendance.authorization);
                request.setRequestHeader("Content-Type", "application/json;charset=UTF-8;");
            },
            success: function (data) {
                if (data.code == "success") {
                    layer.msg('操作成功！');
                } else {
                    //显示错误信息
                    layer.msg(data.message);
                }
            }
        });
        
    }).on('click', '#exportReport', function(){ //导出报表
        var object = {
            month: $('#layDate').val(),
            name: $('#userName').val(),
            depId: workAttendance.depId || 1
        };
        var params = '';
        for (var i in object) {
            if (object[i] !== '' && object[i] !== null) {
                params += i + '=' +object[i]+ '&'
            }
        }
        window.open(workAttendance.url + '/cwa/attendance/dept/export?' + params + 'authorization='+ workAttendance.authorization + '&userId=' + Utils.getValue('u'));

    })
};
$(function () {
    workAttendance.init();
});