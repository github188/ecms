/**
 * 人事模块-考勤
 * @author: xiongxiaojun
 * @time:2017-07-31
 */
var humanAffairs = {
    authorization: Utils.getValue('authorization'), //获取登录人的userId和Token
    url: appHost + approot,
    affairsType: [],

};

humanAffairs.getYearMonth = function () {
  var data = new Date();
  return data.getFullYear() + (data.getMonth() < 10 ? '0' : '') +data.getMonth();
};
/**
 * 请假申请表单验证
 */
humanAffairs.askForLeaveValidate = function () {
    $("#askForLeaveForm").validate({
        debug: true,
        errorPlacement: function (error, element) {
            var eleName = $(element).attr("name");
            if (eleName == "reqEmergency") {
                error.appendTo(element.parents(".errorPlacement"));
            } else {
                error.appendTo(element.parent());
            }
        },
        submitHandler: function (a, b) {
            /**
             * 发起请假
             */
            var params = {
                userId: Utils.getValue('u'),
                type: b.type,
                startTime: humanAffairs.startTime,
                endTime: humanAffairs.endTime,
                timeLength: b.durationTime,
                reason: b.remark
            };
            var agentId = $('#agentPerson').attr('data-id');
            if(agentId){
                params.agentId = agentId;
            }
            layer.load(1, {
                shade: [0.5,'#000']
            });
            $.ajax({
                url: humanAffairs.url + '/cwa/leave/start',
                type: 'post',
                data: JSON.stringify(params),
                beforeSend: function (request) {
                    request.setRequestHeader("authorization", humanAffairs.authorization);
                    request.setRequestHeader("Content-Type", "application/json;charset=UTF-8;");
                },
                success: function (data) {

                    if (data.code == "success") {
                        $('#askForLeaveModal').modal('hide');
                        layer.closeAll('loading');
                        layer.msg("操作成功！", {time: 1000}, function () {
                            window.location.href="./portals/workOrder/workOrder.html?active=askTab"
                        });
                    } else {
                        //显示错误信息
                        layer.closeAll('loading');
                        layer.msg(data.message);
                    }
                }
            });
        },
        rules: {
            type: {
                required: true
            },
            startDate: {
                required: true
            },
            endDate: {
                required: true
            },
            durationTime: {
                required: true
            },
            remark: {
                required: true,
                maxlength: 250
            }
        },
        messages: {
            type: {
                required: "请选择日请假类型！"
            },
            startDate: {
                required: "请选择开始时间！"
            },
            endDate: {
                required: "请选择结束时间！"
            },
            durationTime: {
                required: "时长不能为空！"
            },
            remark: {
                required: "请假理由不能为空！",
                maxlength: "最多输入250个字符"
            }
        }
    });
};

/**
 * 加班申请表单验证
 */
humanAffairs.overtimeValidate = function () {
    $("#overtimeForm").validate({
        debug: true,
        errorPlacement: function (error, element) {
            var eleName = $(element).attr("name");
            if (eleName == "reqEmergency") {
                error.appendTo(element.parents(".errorPlacement"));
            } else {
                error.appendTo(element.parent());
            }
        },
        submitHandler: function (a, b) {
            /**
             * 发起加班
             */
            var params = {
                userId: Utils.getValue('u'),
                startTime: humanAffairs.startTime,
                endTime: humanAffairs.endTime,
                timeLength: b.durationTime,
                reason: b.remark
            };
            layer.load(1, {
                shade: [0.5,'#000']
            });
            $.ajax({
                url: humanAffairs.url + '/cwa/overtime/start',
                type: 'post',
                data: JSON.stringify(params),
                beforeSend: function (request) {
                    request.setRequestHeader("authorization", humanAffairs.authorization);
                    request.setRequestHeader("Content-Type", "application/json;charset=UTF-8;");
                },
                success: function (data) {
                    if (data.code == "success") {
                        $('#overtimeModal').modal('hide');
                        layer.closeAll('loading');
                        layer.msg("操作成功！", {time: 1000}, function () {
                            window.location.href="./portals/workOrder/workOrder.html?active=askTab"
                        });
                    } else {
                        //显示错误信息
                        layer.closeAll('loading');
                        layer.msg(data.message);
                    }
                }
            });
        },
        rules: {
            startDate: {
                required: true
            },
            endDate: {
                required: true
            },
            durationTime: {
                required: true
            },

            remark: {
                required: true,
                maxlength: 250
            }
        },
        messages: {
            startDate: {
                required: "请选择开始时间！"
            },
            endDate: {
                required: "请选择结束时间！"
            },
            durationTime: {
                required: "时长不能为空！"
            },
            remark: {
                required: "加班说明不能为空！",
                maxlength: "最多输入250个字符"
            }
        }
    });
};

/**
 * 出差申请表单验证
 */
humanAffairs.awayOfficialValidate = function () {
    var checkedStatus = 0;
    $('input[name=isNeedplane]').on('change', function () {
        var checked = $('input[name=isNeedplane]:checked').val();
        if(checked == 0){
            checkedStatus = 0;
            $('#planeRemarkBox').hide();
        }else{
            $('#planeRemarkBox').show();
            checkedStatus = 1;
        }
    });


    $("#awayOfficialForm").validate({
        debug: true,
        errorPlacement: function (error, element) {
            var eleName = $(element).attr("name");
            if (eleName == "reqEmergency") {
                error.appendTo(element.parents(".errorPlacement"));
            } else {
                error.appendTo(element.parent());
            }
        },
        submitHandler: function (a, b) {
            /**
             * 发起出差
             */
            var params = {
                userId: Utils.getValue('u'),
                startTime: humanAffairs.startTime,
                endTime: humanAffairs.endTime,
                timeLength: b.durationTime,
                remark: b.remark,
                startAddress: b.startAddress,
                endAddress: b.endAddress,
                isNeedplane: $('input[name=isNeedplane]:checked').val()
            };

            if(checkedStatus == 1){
                params.planeRemark = $('#planeRemark').val()
            }

            layer.load(1, {
                shade: [0.5,'#000']
            });
            $.ajax({
                url: humanAffairs.url + '/cwa/travel/start',
                type: 'post',
                data: JSON.stringify(params),
                beforeSend: function (request) {
                    request.setRequestHeader("authorization", humanAffairs.authorization);
                    request.setRequestHeader("Content-Type", "application/json;charset=UTF-8;");
                },
                success: function (data) {
                    if (data.code == "success") {
                        $('#awayOfficialModal').modal('hide');
                        layer.closeAll('loading');
                        layer.msg("操作成功！", {time: 1000}, function () {
                            window.location.href="./portals/workOrder/workOrder.html?active=askTab"
                        });

                    } else {
                        //显示错误信息
                        layer.closeAll('loading');
                        layer.msg(data.message);
                    }
                }
            });
        },
        rules: {
            startDate: {
                required: true
            },
            endDate: {
                required: true
            },
            durationTime: {
                required: true
            },
            startAddress: {
                required: true
            },
            endAddress: {
                required: true
            },
            remark: {
                required: true,
                maxlength: 250
            }
        },
        messages: {
            startDate: {
                required: "请选择开始时间！"
            },
            endDate: {
                required: "请选择结束时间！"
            },
            durationTime: {
                required: "时长不能为空！"
            },
            startAddress: {
                required: "出发地点不能为空！"
            },
            endAddress: {
                required: "目的地点不能为空！"
            },
            remark: {
                required: "出差说明不能为空！",
                maxlength: "最多输入250个字符"
            }
        }
    });
};

/**
 * 外出申请表单验证
 */
humanAffairs.beOutValidate = function () {
    humanAffairs.outValidate = $("#beOutForm").validate({
        debug: true,
        errorPlacement: function (error, element) {
            var eleName = $(element).attr("name");
            if (eleName == "reqEmergency") {
                error.appendTo(element.parents(".errorPlacement"));
            } else {
                error.appendTo(element.parent());
            }
        },
        submitHandler: function (a, b) {
            var list = [];
            $('.section-item').each(function(a, b){
                list.push({
                    startTime: $(b).find('input.lay-date-start').attr('data-time'),
                    endTime: $(b).find('input.lay-date-end').attr('data-time'),
                    timeLength:  $(b).find('.duration-time').val(),
                    address:  $(b).find('.address').val(),
                    reason: $(b).find('.remark').val()
                })
            });

            layer.load(1, {
                shade: [0.5,'#000']
            });
            $.ajax({
                url: humanAffairs.url + '/cwa/outside/start',
                type: 'post',
                data: JSON.stringify({
                    list: list
                }),
                beforeSend: function (request) {
                    request.setRequestHeader("authorization", humanAffairs.authorization);
                    request.setRequestHeader("Content-Type", "application/json;charset=UTF-8;");
                },
                success: function (data) {
                    if (data.code == "success") {
                        $('#overtimeModal').modal('hide');
                        layer.closeAll('loading');
                        layer.msg("操作成功！", {time: 1000}, function () {
                            window.location.href="./portals/workOrder/workOrder.html?active=askTab"
                        });
                    } else {
                        //显示错误信息
                        layer.closeAll('loading');
                        layer.msg(data.message);
                    }
                }
            });
        },
        rules: {
            startDate: {
                required: true
            },
            endDate: {
                required: true
            },
            durationTime: {
                required: true
            },
            address: {
                required: true
            },
            remark: {
                required: true,
                maxlength: 250
            }
        },
        messages: {
            startDate: {
                required: "请选择开始时间！"
            },
            endDate: {
                required: "请选择结束时间！"
            },
            durationTime: {
                required: "外出时长不能为空！"
            },
            address: {
                required: "外出地点不能为空！"
            },
            remark: {
                required: "外出事由不能为空！",
                maxlength: "最多输入250个字符"
            }
        }
    });
};
/**
 * 获取员工列表
 */
humanAffairs.getDepLeaderList = function () {
    var cmd = new CommandAjax(humanAffairs.url + "/authority/user/query/list", humanAffairs.authorization);
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
                rowHtml += '<a class="oprate" title="选定" href="javascript:void(0);" onclick="humanAffairs.chooseLeader(\'' + id + '\',\'' + name + '\')">选定</a>';
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
    })
};

humanAffairs.chooseLeader = function(userId, name){
    $('#agentPerson').val(name).attr('data-id', userId);
    $('#choosePersonModal').modal('hide');
};
/**
 * 获取我的考勤
 */
humanAffairs.getHumanAttendance = function (dates) {
    var date = dates.split('-');
    var year = date[0];
    var month = date[1];
    $.ajax({
        url: humanAffairs.url + '/cwa/attendance/list',
        type: 'get',
        data: {
            month: dates,
            userId: Utils.getValue('u')
        },
        beforeSend: function (request) {
            request.setRequestHeader("authorization", humanAffairs.authorization);
        },
        success: function (data) {
            if (data.code == "success") {
                $('#calendarTable').calendarRecord({
                    year: year,
                    month: month,
                    leaveType: humanAffairs.affairsType,
                    data: data
                });
            } else {
                //显示错误信息
                layer.msg(data.message);
            }
        }
    });
};
/**
 * 月度考勤总结
 */
humanAffairs.humanAttendanceMonth = function (dates) {
    var date = dates.split('-');
    var year = date[0];
    var month = date[1];
    $.ajax({
        url: humanAffairs.url + '/cwa/attendance/my/total',
        type: 'get',
        data: {
            month: dates,
            userId: Utils.getValue('u')
        },
        beforeSend: function (request) {
            request.setRequestHeader("authorization", humanAffairs.authorization);
        },
        success: function (data) {
            if (data.code == "success") {
                var content = data.content;
                var report = content.report || {
                        travel: 0,
                        outside: 0,
                        overtime: 0,
                        overtimeHoli: 0,
                        leave0:0,
                        leave1: 0,
                        leave2: 0,
                        leave3:0,
                        leave4:0
                    };
                $('#humanNormal').text(content.normal);  //正常打卡
                $('#humanNotCard').text(content.noPunch);  //未打卡
                $('#humanNotSign').text(content.noFrist);  //未签到
                $('#humanNotRetreat').text(content.noLast);  //未签退
                $('#humanYearVacation').text(content.annual);  //剩余年假
                $('#humanRestVacation').text(content.takeoff);  //剩余调休假
                $('#humanWorkDay').text(content.workday);  //应出勤

                $('#humanNormalWork').text(report.normal);  //正常出勤
                $('#humanOvertime').text(report.overtime + report.overtimeHoli);  //加班
                $('#humanAway').text(report.travel);  //出差
                $('#humanBeOut').text(report.outside);  //外出
                $('#humanYearDay').text(report.leave0);  //年休假
                $('#humanRestDay').text(report.leave1);  //调休假
                $('#humanSick').text(report.leave2);  //病假
                $('#humanAffair').text(report.leave3);  //事假
                $('#humanMoneyDay').text(report.leave4);  //有薪假

                $('.human-attendance ul li').each(function (a, b) {
                    var count = $(b).find('.human-calendar-count');
                    if($.trim(count.text())  == '0'){
                        count.css({
                            color: '#999999'
                        })
                    }else{
                        count.css({
                            color: '#3e3e3e'
                        });
                    }
                });
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
humanAffairs.getAffairsType = function () {
    $.ajax({
        url: humanAffairs.url + '/ctm/setting/param/list',
        type: 'get',
        async: false,
        beforeSend: function (request) {
            request.setRequestHeader("Content-Type", "application/json;charset=UTF-8;");
            request.setRequestHeader("authorization", humanAffairs.authorization);
        },
        data: {
            code : 'cwa_leave_type'
        },
        success: function (data) {
            if (data.code == "success") {
                humanAffairs.affairsType = data.content;
            } else {
                layer.msg(data.message);
            }
        }
    });
};
/**
 * 渲染请假类型
 */
humanAffairs.setAffairsType = function () {
    var status = humanAffairs.affairsType;
    var options = '<option value="">--请选择--</option>';
    for (var i = 0; i < status.length; i++) {
        if(status[i].value >= 4 && status[i].value !=9 && status[i].value !=10 ){
            options += '<option value="' + status[i].value + '">' + status[i].name + '</option>';
        }
    }
    $('#leaveType').html(options);
};

/**
 * 查询假期剩余天数
 */
humanAffairs.surplusDay = function (type, callback) {
    $.ajax({
        url: humanAffairs.url + '/cwa/leave/user/holiday',
        type: 'get',
        data:{
            type: type
        },
        beforeSend: function (request) {
            request.setRequestHeader("authorization", humanAffairs.authorization);
        },
        success: function (data) {
            if (data.code == "success") {
                humanAffairs.overplusDay = data.content;
                callback(data.content);
            } else {
                layer.msg(data.message);
            }
        }
    });
};

/**
 * 计算请假时长
 */
humanAffairs.durationTime = function (start, end, modal, url, beOut) {

    var startTime = start.toSecTime();
    var endTime = end.toSecTime();
    humanAffairs.startTime = startTime;
    humanAffairs.endTime = endTime;

    if(endTime - startTime <= 0 ){
        layer.msg('结束时间不能小于等于开始时间!');
        modal.find('.duration-time').val('');
        return;
    }
    layer.load(1, {
        shade: [0.5,'#000']
    });
    $.ajax({
        url: humanAffairs.url + url,
        type: 'get',
        beforeSend: function (request) {
            request.setRequestHeader("authorization", humanAffairs.authorization);
        },
        data: {
            starttime: startTime,
            endtime: endTime
        },
        success: function (data) {
            layer.closeAll('loading');
            if (data.code == "success") {
                if(beOut){  //如果是外出。存在多个计算时长
                    modal.find('input.duration-time').val(data.content);
                    modal.find('input.lay-date-start').attr('data-time', startTime);
                    modal.find('input.lay-date-end').attr('data-time', endTime);
                }else{
                    modal.find('input[name=durationTime]').val(data.content);
                }
                if(modal.attr('id') == 'askForLeaveModal'){
                    var type = $('#leaveType').val();
                    if(type == 4  || type == 5){  //年假
                        if(data.content > humanAffairs.overplusDay){
                            layer.msg('剩余假期不足');
                        }
                    }
                }
            } else {
                layer.msg(data.message);
            }
        }
    });
};
humanAffairs.validateDurationTime = function ($this) {
    var modal = '';
    var eleId = undefined;
    if($this.parents('.modal').attr('id') == 'beOutModal'){  //外出
        modal = $this.parents('.section-item');
    }else{
        modal = $this.parents('.modal');
        eleId = modal.attr('id');
    }

    var url = "";
    var startDate = modal.find("input[name^=startDate]").val() + ' ';
    var endDate =  modal.find("input[name^=endDate]").val() + ' ';
    var startTime = modal.find("select[name^=startTime]").find('option:selected').text() + ':00';
    var endTime = modal.find("select[name^=endTime]").find('option:selected').text() + ':00';

    var START = startDate + startTime;
    var END =  endDate + endTime;

    if((startDate.trimAll() != '' &&　startDate.trimAll() != 'undefined') && (endDate.trimAll() != '' && endDate.trimAll() != 'undefined' )){
        if(eleId == 'askForLeaveModal'){ //请假
            url = "/cwa/leave/timelong";
        }else if(eleId == 'overtimeModal'){  //加班
            url = "/cwa/overtime/timelong";
        }else if(eleId == 'awayOfficialModal'){  //出差
            url = "/cwa/overtime/timelong";
        }
        if(eleId){
            humanAffairs.durationTime(START, END, modal, url);
        }else{   //外出
            url = "/cwa/overtime/timelong";
            humanAffairs.durationTime(START, END, modal, url, true);
        }
    }
};
humanAffairs.getBeOutTemplate = function (index) {
    var str = '<div class="section-item fold">' +
        '<div class="be-out-title">' +
        '<h3 class="icon-fold">外出'+ index +'</h3>' +
        '<a href="javascript:;" class="delete-item">删除</a>' +
        '</div>' +
        '<div class="row">' +
        '<div class="col-md-12 form-group">' +
        '<label class="col-md-2 control-label"><span class="required">*</span>开始时间</label>' +
        '<div class="col-md-5" style="margin-right: 0; padding-right: 0">' +
        '<input class="form-control lay-date-start" required type="text" readonly name="startDate'+ index +'">' +
        '</div>' +
        '<div class="col-md-5" style="padding-left: 0; margin-left: 0">' +
        '<select class="form-control ask-time" name="startTime '+ index +'">' +
        '<option value="">09:00</option>' +
        '<option value="">10:00</option>' +
        '<option value="">11:00</option>' +
        '<option value="">12:00</option>' +
        '<option value="">14:00</option>' +
        '<option value="">15:00</option>' +
        '<option value="">16:00</option>' +
        '<option value="">17:00</option>' +
        '<option value="">18:00</option>' +
        '</select>' +
        '</div>' +
        '</div>' +
        '<div class="col-md-12 form-group">' +
        '<label class="col-md-2 control-label ask-time"><span class="required">*</span>结束时间</label>' +
        '<div class="col-md-5" style="margin-right: 0; padding-right: 0">' +
        '<input class="form-control lay-date-end" required  type="text" readonly name="endDate'+ index +'">' +
        '</div>' +
        '<div class="col-md-5" style="padding-left: 0; margin-left: 0">' +
        '<select class="form-control ask-time" name="endTime'+ index +'">' +
        '<option value="">09:00</option>' +
        '<option value="">10:00</option>' +
        '<option value="">11:00</option>' +
        '<option value="">12:00</option>' +
        '<option value="">14:00</option>' +
        '<option value="">15:00</option>' +
        '<option value="">16:00</option>' +
        '<option value="">17:00</option>' +
        '<option value="" selected>18:00</option>' +
        '</select>' +
        '</div>' +
        '</div>' +
        '<div class="col-md-12 form-group">' +
        '<label class="col-md-2 control-label"><span class="required">*</span>外出时长（天）</label>' +
        '<div class="col-md-10">' +
        '<input class="form-control duration-time" readonly type="text" required  name="durationTime'+ index +'">' +
        '</div>' +
        '</div>' +
        '<div class="col-md-12 form-group">' +
        '<label class="col-md-2 control-label"><span class="required">*</span>外出地点</label>' +
        '<div class="col-md-10">' +
        '<input class="form-control address" type="text" required  name="address'+ index +'">' +
        '</div>' +
        '</div>' +
        '<div class="col-md-12 form-group">' +
        '<label class="col-md-2 control-label"><span class="required">*</span>外出事由</label>' +
        '<div class="col-md-10">' +
        '<textarea class="form-control remark" required name="remark'+ index +'" style="height: 100px"></textarea>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>';
    return str;
};
/**
 *
 * 快捷入口进入
 */
humanAffairs.getEntryType = function () {
    var fastEntry = Utils.getValue('fastEntry');
    var type = fastEntry.split('|')[0];
    var id = fastEntry.split('|')[1];
    if(type){  //发起请假
        $('.main-menu li').each(function(a, b){
            if($(b).attr('data-id') == id){
                $(b).find('a').trigger('click');
                if(type == 'leave'){
                    setTimeout(function(){
                        $('#askForLeave').click();
                    }, 600)
                }else if(type == 'extra'){
                    setTimeout(function(){
                        $('#overtime').click();
                    }, 600)
                }else if(type == 'out'){
                    setTimeout(function(){
                        $('#awayOfficial').click();
                    }, 600)
                }else if(type == 'egress'){
                    setTimeout(function(){
                        $('#beOut').click();
                    }, 600)
                }
            }
        })
    }
    Utils.setValue('fastEntry', 'null');
};

/**
 * 日历记录
 */

humanAffairs.init = function () {
    this.askForLeaveValidate();
    this.overtimeValidate();
    this.awayOfficialValidate();
    this.beOutValidate();
    this.getAffairsType();
    this.getEntryType();
    monthPicker.create('layDate', {
        autoCommit: true,
        startYear: 2017,
        callback : function(dates){
            humanAffairs.humanAttendanceMonth(dates);  //获取月度考勤总结
            humanAffairs.getHumanAttendance(dates);
            var date = dates.split('-');
            humanAffairs.month = parseInt(date[1]);
            $('#layYear').text(date[0]);
            $('#layDate').html(parseInt(date[1]));
            $('#layCount').text();
            if(parseInt(date[0] + date[1]) <= 201708){   //8月前没有数据
                $('.h-prev').attr('disabled', true);
            }else{
                $('.h-prev').removeAttr('disabled');
                // $('.h-prev').show();
            }
            if(parseInt(date[0] + date[1]) > humanAffairs.getYearMonth()){
                // $('.h-next').hide();
                $('.h-next').attr('disabled', true);
            }else{
                $('.h-next').removeAttr('disabled');
                // $('.h-next').show();
            }
        }
    });

    $('.h-prev').on('click', function () {
        if(humanAffairs.month == 1){
           $('#gri_preYear').click();
           $('#gri_month12').click();
        }else{
            $('#gri_month' + (humanAffairs.month-1)).click();
        }

    });
    $('.h-next').on('click', function () {
        if(humanAffairs.month == 12){
            $('#gri_nextYear').click();
            $('#gri_month1').click();
        }else{
            $('#gri_month' + (humanAffairs.month+1)).click();
        }
    });
    var start = {
         format: 'YYYY-MM-DD'
        ,istime: false
        ,isclear: false
        ,choose: function(datas){
            end.min = datas; //开始日选好后，重置结束日的最小日期
            end.start = datas; //将结束日的初始值设定为开始日
            humanAffairs.validateDurationTime($(start.elem));
            end.min = null;
            end.min = null;
            start.max = null;
            start.max = null;
        }
    };

    var end = {
         format: 'YYYY-MM-DD'
        ,istime: false
        ,isclear: false
        ,choose: function(datas){
            start.max = datas; //结束日选好后，重置开始日的最大日期
            humanAffairs.validateDurationTime($(start.elem));
            end.min = null;
            end.min = null;
            start.max = null;
            start.max = null;
        }
    };

    $('.modal ').on('click', '.lay-date-start', function(){
        start.elem = this;
        laydate(start);
    }).on('click', '.lay-date-end', function(){
        end.elem = this;
        laydate(end);
    });


    $('#askForLeave').on('click', function () {
        $('#askForLeaveModal').modal('show');
        $('#surplusDay').empty();
    });

    $('#askForLeaveModal').on('shown.bs.modal', function () {
        humanAffairs.setAffairsType();
    });

    $('#overtime').on('click', function () {
       $('#overtimeModal').modal('show');
    });

    $('#awayOfficial').on('click', function () {
        $('#awayOfficialModal').modal('show');
    });

    $('#beOut').on('click', function () {
        $('#beOutModal').modal('show');
    });
    
    $('#leaveType').on('change', function () {
        var $selected = $(this).find('option:selected');

        humanAffairs.surplusDay($(this).val(), function (data) {
            if($selected.val() == 4){ //年假
                if(data == 0){
                    $('#surplusDay').html("<spa n style='color: red'>剩余年休假：0&nbsp;天</span>");
                    return;
                }
                $('#surplusDay').html("剩余年休假："+ data +"&nbsp;天");
            }else if($selected.val() == 5){ //调休假
                if(data == 0){
                    $('#surplusDay').html("<spa n style='color: red'>剩余调休假：0&nbsp;天</span>");
                    return;
                }

                $('#surplusDay').html("剩余调休假："+ data +"&nbsp;天");
            }else {
                $('#surplusDay').text("");
            }
        });
    });

    $('#agentPerson').on('click', function () {
        $('#choosePersonModal').modal('show');
        humanAffairs.getDepLeaderList();
    });
    $('#btnSearchDepLeader').on('click', function () {
        humanAffairs.getDepLeaderList();
    });

    $('#beOutForm').on('click', '.icon-fold', function () {
        var item = $(this).parents('.section-item');
        if(item.hasClass('unfold')){
            item.removeClass('unfold').addClass('fold');
        }else{
            item.removeClass('fold').addClass('unfold');
        }
    }).on('click', '.delete-item', function () {
        var item = $(this).parents('.section-item');
        layer.confirm('确认删除该条外出申请？', {
            title: "信息确认",
            btn: ['确定', '取消'] //按钮
        }, function (index) {
            item.remove();
            layer.close(index);
        }, function (index) {
            layer.close(index);
        });

    }).on('change', '.ask-time', function () {
        humanAffairs.validateDurationTime($(this));
    });

    $('.modal').on('change', '.ask-time', function () {
        humanAffairs.validateDurationTime($(this));
    });

    /**
     * 动态添加外出报备单
     */
    $('.add-item').on('click', function () {
        var modal = $('#beOutModal').find('.section-item:last');
        $('.section-item').addClass('unfold');
        modal.after(humanAffairs.getBeOutTemplate(modal.index() + 2));
    });

};
$(function () {
    humanAffairs.init();
});