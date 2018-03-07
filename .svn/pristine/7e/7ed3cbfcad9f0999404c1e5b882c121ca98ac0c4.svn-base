/**
 * 人事模块-通訊錄
 * @author: xiongxiaojun
 * @time:2017-07-31
 */
var humanAffairs = {
    authorization: Utils.getValue('authorization'), //获取登录人的userId和Token
    url: appHost + approot
};
/**
 * 查询人员列表形式展现且可模糊搜索
 */
humanAffairs.getDepLeaderList = function () {
    var cmd = new CommandAjax(humanAffairs.url + "/authority/user/phone/list", humanAffairs.authorization);
    var object = {
        // driectName: $('#higherUps').val(),
        realname: $('#userName').val()
        // phone: $('#telPhone').val(),
        // address: $('#address').val(),
        // depId: $('#department').attr('data-id') || ''
    };
    for (var i in object) {
        if (object[i] !== '' && object[i] !== null) {
            cmd[i] = object[i]
        }
    }
    $("#personList").datagrid({
        columns: [{
            display: "员工编号",
            name: "usercode",
        }, {
            display: "姓名",
            name: "realname",
        }, {
            display: "电话",
            name: "phone",
            render: function (row) {
                var value = row.phone;
                var temp = [];
                temp[0] = value.slice(0, 3);
                temp[1] = value.slice(3, 7);
                temp[2] = value.slice(7);
                return temp.join("-");
            }
        }, {
            display: "邮箱",
            name: "email"
        },{
            display: "部门",
            name: "depName"
        },{
            display: "岗位",
            name: "post"
        },{
            display: "常驻地",
            name: "address"
        }],
        reqdata: cmd,
        isShowCheckBox: false,
        rowNumber: true,
        onResponse: function (data) {
            return data;
        },
        onComplete: function (data) {
            if(data.content == null){
                $('.nodata').text('找不到与您搜索条件相匹配的人，再试试?')
            }
            if (data.code != 'success') {
                layer.msg(data.message)
            }
        }
    });
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
 * 获取部门列表
 */
humanAffairs.getDepartTreeList = function () {
    $.ajax({
        url: humanAffairs.url + '/authority/dep/tree/list',
        type: 'get',
        beforeSend: function (request) {
            request.setRequestHeader("authorization", humanAffairs.authorization);
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
                        onClick: function (a, b, c) {
                            $('#department').attr('data-id', c.id).val(c.name);
                            $('#DepartForAddPerPanel').hide();
                        }
                    }
                };
                $.fn.zTree.init($("#treeDepartForAddPer"), setting1, zNodes);
                var treeDepartObj = $.fn.zTree.getZTreeObj("treeDepartForAddPer");
                treeDepartObj.expandAll(true);
            } else {
                //显示错误信息
                layer.msg(data.message);
            }
        }
    });
};


humanAffairs.init = function () {
    // this.getDepLeaderList();
    // this.getDepartTreeList();
    this.getEntryType();
    $('.btn-search').on('click', function () {
        humanAffairs.getDepLeaderList();
    });
    //选择所属部门
    // $('#department').on('click', function () {
    //     $('#DepartForAddPerPanel').show();
    // });

    $('#closeDepartForAddPer').on('click', function () {
        $('#DepartForAddPerPanel').hide();
    });
};
$(function () {
    humanAffairs.init();
});