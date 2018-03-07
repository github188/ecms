/**
 * 考勤模块-考勤设置
 * @author: xiongxiaojun
 * @time:2017-07-31
 */
var workAttendance = {
    authorization: Utils.getValue('authorization'), //获取登录人的userId和Token
    url: appHost + approot,
    approveType: 0
};
/**
 * 获取员工列表
 */
workAttendance.getDepLeaderList = function (ele) {
    if(ele){
        workAttendance.approvePerson = ele;
    }
    var cmd = new CommandAjax(workAttendance.url + "/authority/user/query/list", workAttendance.authorization);
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
                    rowHtml = '';
                rowHtml += '<a class="oprate choose-person" title="选定" data-id="'+ id +'" data-name="'+ name +'" href="javascript:void(0);">选定</a>';

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
 * 设置人事审批负责人
 */
workAttendance.saveApprovePersonPlane = function (object) {
    layer.load(1, {
        shade: [0.5,'#000']
    });
    $.ajax({
        url: workAttendance.url + '/cwa/attendance/handler/update',
        type: 'put',
        beforeSend: function (request) {
            request.setRequestHeader("authorization", workAttendance.authorization);
            request.setRequestHeader("Content-Type", "application/json;charset=UTF-8;");
        },
        data: JSON.stringify({
            nodeId: object.nodeId,
            userId: object.userId
        }),
        success: function (data) {
            if (data.code == "success") {
                layer.msg('操作成功！');
                workAttendance.approvePlane();
                $('#approvalModal').modal('hide');
            } else {
                layer.msg(data.message);
            }
            layer.closeAll('loading');
        }
    })
};

/**
 * 设置考勤查看人员
 */
workAttendance.saveApprovePersonCheck = function (object) {
    layer.load(1, {
        shade: [0.5,'#000']
    });
    $.ajax({
        url: workAttendance.url + '/authority/role/user/add',
        type: 'put',
        beforeSend: function (request) {
            request.setRequestHeader("authorization", workAttendance.authorization);
            request.setRequestHeader("Content-Type", "application/json;charset=UTF-8;");
        },
        data: JSON.stringify({
            userId: object.userId
        }),
        success: function (data) {
            if (data.code == "success") {
                layer.msg('操作成功！');
                workAttendance.approveCheck();
                $('#approvalModal').modal('hide');
            } else {
                layer.msg(data.message);
            }
            layer.closeAll('loading');
        }
    })
};

/**
 * 删除考勤查看人员
 */
workAttendance.delApprovePersonCheck = function (userId) {
    layer.load(1, {
        shade: [0.5,'#000']
    });
    $.ajax({
        url: workAttendance.url + '/authority/role/user/delete',
        type: 'put',
        beforeSend: function (request) {
            request.setRequestHeader("authorization", workAttendance.authorization);
            request.setRequestHeader("Content-Type", "application/json;charset=UTF-8;");
        },
        data: JSON.stringify({
            userId: userId
        }),
        success: function (data) {
            if (data.code == "success") {
                layer.msg('操作成功！');
                workAttendance.approveCheck();
                $('#approvalModal').modal('hide');
            } else {
                layer.msg(data.message);
            }
            layer.closeAll('loading');
        }
    })
};

/**
 * 保存部门考勤管理员
 */
workAttendance.saveApprovePersonDep = function (object) {
    var params = {
        depId: object.depId,
        userId: object.userId
    };
    if(object.id){
        params.id = object.id;
    }
    if(object.userId == null){
        layer.msg('考勤管理员不能为空！');
        return;
    }
    $.ajax({
        url: workAttendance.url + '/cwa/attendance/dept/update',
        type: 'PUT',
        beforeSend: function (request) {
            layer.load(1, {
                shade: [0.5,'#000']
            });
            request.setRequestHeader("authorization", workAttendance.authorization);
            request.setRequestHeader("Content-Type", "application/json;charset=UTF-8;");
        },
        data: JSON.stringify(params),
        success: function (data) {
            layer.closeAll('loading');
            if (data.code == "success") {
                layer.msg('操作成功！');
                $('#approvalModal').modal('hide');
                workAttendance.approveDep();
            } else {
                layer.msg(data.message);
            }
        }
    });
};
workAttendance.approvePlane = function () {   //机票审批设置
    var cmd = new CommandAjax(workAttendance.url + '/cwa/attendance/handler/list', workAttendance.authorization);
    $("#approveList").datagrid({
        columns: [{
            display: "名称",
            name: 'nodeName'
        }, {
            display: "姓名",
            render: function (row) {
                var userId = row.userId;
                var userName = row.userName;
                return userName || '/';
            }
        }, {
            display: "操作",
            render: function (row) {
                workAttendance['approve_'+row.userId] = {
                    nodeId: row.nodeId,
                    nodeName: row.nodeName,
                    id: row.id,
                    userId: row.userId,
                    userName: row.userName
                };
                return '<a href="javascript:;" data-type="plane" data-id="'+ row.userId+'" class="oprate set-approve">设置</a>'
            }
        }],
        reqdata: cmd,
        isShowCheckBox: false,
        rowNumber: false,
        isPage: false,
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

workAttendance.approveDep = function () {   //部门考勤管理员设置
    var cmd = new CommandAjax(workAttendance.url + '/cwa/attendance/dept/list', workAttendance.authorization);
    $("#approveList").datagrid({
        columns: [{
            display: "名称",
            name: 'depName'
        }, {
            display: "姓名",
            render: function (row) {
                var userId = row.userId;
                var userName = row.userName;
                return userName || '/';
            }
        }, {
            display: "操作",
            render: function (row) {
                workAttendance['approve_'+row.depId] = {
                    depId: row.depId,
                    depName: row.depName,
                    id: row.id,
                    userId: row.userId,
                    userName: row.userName
                };
                return '<a href="javascript:;" data-type="dep" data-id="'+ row.depId+'" class="oprate set-approve">设置</a>'
            }
        }],
        reqdata: cmd,
        isShowCheckBox: false,
        rowNumber: false,
        isPage: false,
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

workAttendance.approveCheck = function () {  //考勤查看人员设置
    var cmd = new CommandAjax(workAttendance.url + '/authority/role/list/code', workAttendance.authorization);
    $("#approveList").datagrid({
        columns: [{
            display: "姓名",
            render: function (row) {
                var userId = row.userId;
                var userName = row.userName;
                return userName || '/';
            }
        }, {
            display: "操作",
            render: function (row) {
                return '<a href="javascript:;" data-type="check" data-id="'+ row.userId+'" class="oprate del-approve">删除</a>'
            }
        }],
        reqdata: cmd,
        isShowCheckBox: false,
        rowNumber: false,
        isPage: false,
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

workAttendance.renderTag = function (person) {
    var depId = $('#approvalModal').attr('data-id');
    var str = '';
    if(person){
        if(!$.isArray(person)){
            if(person.userId != null){
                str += '<a class="tag-list" href="javascript:;">'+ person.userName +'</a>';
            }
            workAttendance['approve_'+ depId].userId = person.userId;
            workAttendance['approve_'+ depId].userName = person.userName;
        }else{
            for(var i = 0; i < person.length; i++){
                if(person[i].userId != null){
                    str += '<a class="tag-list" href="javascript:;">'+ person[i].userName +'<span title="删除" data-id="'+ person[i].userId +'" class="remove-tag">x</span></a>';
                }
            }
        }
    }
    $('.input-tag').html(str);
};

workAttendance.init = function () {
    this.approvePlane();
    $('.approvePersonBox').on('click', '.approvePerson', function () {
        $('#choosePersonModal').modal('show');
        workAttendance.getDepLeaderList($(this));
    }).on('click', '.clear-person', function () {//删除管理员
        var $parent = $(this).parents('.row-list');
        $parent.find('.save-person').attr('data-del', true);
        $parent.find('.approvePerson').removeAttr('data-id').val('');

    }).on('click', '.save-person', function () { //新增管理员
        var id = $(this).attr('data-id');
        var temp = workAttendance[id];
        for(var name in temp){
            if(name == 'id'){
               if(!temp['id']){ // 新增
                   workAttendance.saveApprovePerson($(this), temp, true);
               }else{  //更新
                   workAttendance.saveApprovePerson($(this), temp);
               }
            }
        }
    }).on('click', '.save-approve', function () { //设置人事审批负责人
        // workAttendance.setHandleList($(this));
    });

    $('#choosePersonModal').on('click', '.choose-person', function () {  //选择管理员
        var id = $(this).attr('data-id');
        var name = $(this).attr('data-name');
        var approve = {
            userName: name,
            userId: id
        };
        // workAttendance.approvePerson.val(name).attr('data-id', id);
        workAttendance.renderTag(approve);
        $('#choosePersonModal').modal('hide');
    });
    
    $('#btnSearchDepLeader').on('click', function () {
        workAttendance.getDepLeaderList();
    });

    $('#approveType').on('change', function () {
        var type = $(this).val();
        $('#approvalAdd').hide();
        $('#approvalTips').hide();
        if(type == 0){
            workAttendance.approvePlane();
        }else if(type == 1){
            workAttendance.approveDep();
        }else if(type == 2){
            workAttendance.approveCheck();
            $('#approvalAdd').show();
            $('#approvalTips').css('display','inline-block');

        }
    });

    $('#approveList').on('click', '.set-approve', function () {
        var depId = $(this).attr('data-id');
        var type = $(this).attr('data-type');
        var approve = workAttendance['approve_' + depId];
        $('#approvalModal').modal('show').attr({
            'data-id': depId,
            'data-type': type
        });
        workAttendance.renderTag(approve);
    });

    $('#approvalAdd').on('click', function () {
        $('#approvalModal').modal('show').attr({
            'data-id': 101010101,
            'data-type': 'check'
        });
        workAttendance['approve_'+ 101010101] = {};
        workAttendance.renderTag();
    });

    $('.input-tag').on('click', '.remove-tag', function () {  //删除审批人
        // $('.approvePerson').height($('.input-tag').height());
        // var id =  $(this).attr('data-id');
        // var person = approvalSet.tempPerson;
        // for(var item in person.user){
        //     if(item == id){
        //         $(this).parent('.tag-list').remove();
        //         delete  person.user[item];
        //     }
        // }
    });

    $('#approveList').on('click', '.del-approve',function () {  //删除考勤查看人员
        workAttendance.delApprovePersonCheck($(this).attr('data-id'));
    });

    $('.approvePerson, .input-tag').on('click', function (e) {  //审批人设置
        if(!$(e.target).hasClass('remove-tag')){
            $('#choosePersonModal').modal('show');
            workAttendance.getDepLeaderList();
        }
    });

    $('#approvalPersonBtn').on('click', function () {   //保存各项审批人
        var id =  $('#approvalModal').attr('data-id');
        var type = $('#approvalModal').attr('data-type');
        var temp = workAttendance['approve_' + id];

        if(type == 'plane'){   //机票审批设置
            workAttendance.saveApprovePersonPlane(temp);
        }else if(type == 'dep'){  //部门考勤管理员设置
            workAttendance.saveApprovePersonDep(temp);
        }else if(type == 'check'){  //考勤查看人员设置
            workAttendance.saveApprovePersonCheck(temp);
        }
    });

    $('#choosePersonModal').on('hide.bs.modal', function () {
        $('#queryKD').val('');
    });

};
$(function(){
    workAttendance.init();
});