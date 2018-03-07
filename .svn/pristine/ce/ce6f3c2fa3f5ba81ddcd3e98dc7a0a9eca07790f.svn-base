/**
 * 考勤管理-打卡统计
 * @author:xiongxiaojun
 * @time:2017-09-08
 */

var punchClock = {
    url: appHost + approot,
    authorization: Utils.getValue('authorization')
};
/**
 * 获取部门列表
 */
punchClock.getDepartTreeList = function () {
    $.ajax({
        url: punchClock.url + '/authority/dep/tree/list',
        type: 'get',
        beforeSend: function (request) {
            request.setRequestHeader("authorization", punchClock.authorization);
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
punchClock.getWeekByDay = function(dayValue){
    var day = new Date(Date.parse(dayValue.replace(/-/g, '/')));
    var today = ["星期日","星期一","星期二","星期三","星期四","星期五","星期六"];
    return today[day.getDay()];  //返一个星期中的某一天，其中0为星期日
};
/**
 * 获取打卡统计列表
 */
punchClock.getList = function(){
    var cmd = new CommandAjax(punchClock.url + "/cwa/attendance/pc/list", punchClock.authorization);
    var object = {
        depart: $('.dep-parentname').val(),
        depId: $('.dep-parentname').attr('data-id') || 1,
        address: $('#address').val(),
        date: $('#layDate').val(),
        name: $('#userName').val(),
        fbegin: $('#part-1').val(),
        fend: $('#part-2').val(),
        lbegin: $('#part-3').val(),
        lend: $('#part-4').val()
    };
    for (var i in object) {
        if (object[i] !== '' && object[i] !== null && object[i] !== undefined) {
            cmd[i] = object[i]
        }
    }
    $("#clockList tbody tr").empty();
    $("#clockList").datagrid({
        columns: [{
            display: "姓名",
            name: "name",
            width: "80px",
            align: "center"
        }, {
            display: "部门",
            name: "depName",
            width: "130px",
            align: "center"
        }, {
            display: "常住地",
            name: "address",
            align: "center"
        },{
            display: "前一天",
            name: "lastday",
            render: function (row) {
                if(!row.lastday){
                    return '无记录'
                }
                return row.lastday;
            }
        },{
            display: "首次打卡",
            name: "fristTime",
            render: function (row) {
                if(!row.fristTime){
                    return '无记录'
                }
                return row.fristTime;
            }
        },{
            display: "末次打卡",
            name: "lastTime",
            render: function (row) {
                if(!row.lastTime){
                    return '无记录'
                }
                return row.lastTime;
            }
        },{
            display: "考勤状态",
            name: "cwaName"
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

            var tbody = $('#' + this.targetID).find('tbody');
            var thead = $('#' + this.targetID).find('thead tr');
            tbody.prepend('<tr>' +
                    '<td>姓名</td>'+
                '<td>部门</td>'+
                '<td>常住地</td>'+
                '<td>末次打卡</td>'+
                '<td>首次打卡</td>'+
                '<td>末次打卡</td>'+
                '<td>考勤状态</td>'+
                '</tr>');
            for(var i = 0; i < 2; i++){
                $(thead.find('th:first')).remove();
                $(thead.find('th:last')).remove();
            }
            $(thead.find('th:first')).attr('colspan', 3).text('员工信息');
            $(thead.find('th:last')).attr('colspan', 3).text($('#layDate').val() + '（'+punchClock.getWeekByDay($('#layDate').val()) +'）');
        }
    })
};
/**
 * 初始化
 */
punchClock.init = function() {

    laydate({
        elem: '#layDate',
        istime: false,
        festival: false,
        isclear: false,
        max: laydate.now(),
        format: 'YYYY-MM-DD'
    });
    $('#layDate').val(laydate.now());

    this.getList();
    this.getDepartTreeList();

    var part1Time = undefined, part2Time = undefined, part3Time = undefined, part4Time = undefined;

    var part1 = layDate.render({
        elem: '#part-1',
        type: 'time',
        change: function (value, date) {
            part1Time = new Date(([date.year, date.month, date.date]).join('-') + ' ' + value).getTime();
            if((part1Time != undefined && part2Time != undefined) &&  part1Time > part2Time){
                part1.hint('结束时间小于了开始时间，建议重新选择');
            }
        },
        done: function (value, date) {
            part1Time = new Date(([date.year, date.month, date.date]).join('-') + ' ' + value).getTime();
            if((part1Time != undefined && part2Time != undefined) &&  part1Time > part2Time){
                setTimeout(function () {
                    $('#part-1').val('');
                }, 10)
            }
        }
    });

    var part2 = layDate.render({
        elem: '#part-2',
        type: 'time',
        change: function (value, date) {
            part2Time = new Date(([date.year, date.month, date.date]).join('-') + ' ' + value).getTime();
            if((part1Time != undefined && part2Time != undefined) &&  part1Time > part2Time){
                part2.hint('结束时间小于了开始时间，建议重新选择');
            }
        },
        done: function (value, date) {
            part2Time = new Date(([date.year, date.month, date.date]).join('-') + ' ' + value).getTime();
            if((part1Time != undefined && part2Time != undefined) &&  part1Time > part2Time){
               setTimeout(function () {
                   $('#part-2').val('');
               }, 10)
            }
        }
    });

    var part3 = layDate.render({
        elem: '#part-3',
        type: 'time',
        change: function (value, date) {
            part3Time = new Date(([date.year, date.month, date.date]).join('-') + ' ' + value).getTime();
            if((part3Time != undefined && part4Time != undefined) &&  part3Time > part4Time){
                part3.hint('结束时间小于了开始时间，建议重新选择');
            }
        },
        done: function (value, date) {
            part3Time = new Date(([date.year, date.month, date.date]).join('-') + ' ' + value).getTime();
            if((part3Time != undefined && part4Time != undefined) &&  part3Time > part4Time){
                setTimeout(function () {
                    $('#part-3').val('');
                }, 10)
            }
        }
    });

    var part4 = layDate.render({
        elem: '#part-4',
        type: 'time',
        change: function (value, date) {
            part4Time = new Date(([date.year, date.month, date.date]).join('-') + ' ' + value).getTime();
            if((part3Time != undefined && part4Time != undefined) &&  part3Time > part4Time){
                part4.hint('结束时间小于了开始时间，建议重新选择');
            }
        },
        done: function (value, date) {
            part4Time = new Date(([date.year, date.month, date.date]).join('-') + ' ' + value).getTime();
            if((part3Time != undefined && part3Time != undefined) &&  part3Time > part4Time){
                setTimeout(function () {
                    $('#part-4').val('');
                }, 10)
            }
        }
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
        punchClock.getList();
    })
};
$(function () {
    punchClock.init();
});