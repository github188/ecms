/**
 * 待办中心
 * @author: xiongxiaojun
 * @time:2017-06-26
 */
var workOrder = {};
workOrder.url = fsHost + approot;
workOrder.authorization = Utils.getValue('authorization'); //获取登录人的userId和Token
workOrder.pageSize = 5;
workOrder.template = function (title, nodesName, sponsorsName, addTime, doingPerson, donePerson, id, type, nodeId, waitId) {
    var doingPersonName = [];
    var donePersonName = [];

    var str = '<li title="查看详情" onclick="workOrder.readOrderDetail(\'processId='+ id +'&type='+ type +'&nodeId='+ nodeId +'&waitId='+waitId+'\')" style="position: relative; pointer"><p class="padding-t-20"><a class="order-link" href="javascript:;">'+ title +'</a></p>' +
        '<div class="col-sm-2 padding-l-20 time-icon">'+ nodesName +'</div><div class="col-sm-6 text-center" style="position: absolute; bottom: 10px; left: 140px;">';
        for(var i = 0; i < doingPerson.length; i++){
            doingPersonName.push(doingPerson[i].handlerName);
        }
        str+= Utils.arrayUnique(doingPersonName).join('、');
        if(doingPerson.length !== 0){
            str +='<span class="deal-status">&nbsp;处理中</span>';
        }

        // if(donePerson.length !== 0 && doingPerson.length !== 0){
        //     str+='/&nbsp;';
        // }
        // for(var j = 0; j < donePerson.length; j++){
        //     donePersonName.push(donePerson[j].handlerName);
        // }
        // str+= Utils.arrayUnique(donePersonName).join('、');
        // if(donePerson.length !== 0){
        //     str+='<span class="deal-status">&nbsp;已处理</span>';
        // }
        if(doingPerson.length == 0 && donePerson.length> 0){
            str+= "已完成";
        }

        if(doingPerson.length == 0 && donePerson.length == 0){
            str+= nodesName;
        }
        str+='</div><div class="col-sm-4 pull-right" style="text-align: right"> <span class="user-name">'+sponsorsName+'</span> <span class="deal-time">'+ addTime+'</span></div></li>';
        return str;
};
workOrder.readOrderDetail = function (query) {
    window.open('./workOrderDetail.html?'+ query, '_blank');
};
workOrder.waitDealtList = function(pageNum){  //我的待办
    var params = workOrder.getParams();
    params.pageNum =  pageNum || 1;
    params.pageSize = workOrder.pageSize;
    $.ajax({
        url: workOrder.url + '/sys/process/todo/list',
        type: 'get',
        beforeSend: function (request) {
            request.setRequestHeader("authorization", workOrder.authorization);
        },
        data: params,
        success: function (data) {
            if (data.code == "success") {
                var content = data.content;
                if(content.length == 0){
                    $('#waitTabLIst').html('<p style="text-align: center; margin-top: 50px;">勤劳如您，一个待办都木有，点赞！</p> ');
                    $('#waitPage').empty();
                    return;
                }
                $('#waitTabLIst').empty();
                for(var i = 0; i < content.length; i++){
                    var title = content[i].title;
                    var nodesName = content[i].nodesName;
                    var sponsorsName = content[i].sponsorsName;
                    var addTime = new Date(content[i].updateTime || content[i].addTime);
                    var doingPerson = content[i].doingPerson;
                    var donePerson = content[i].donePerson;
                    var waitId = content[i].id;

                    var id = content[i].processId;
                    var type = content[i].type;
                    var nodeId = content[i].nodeId;
                    $('#waitTabLIst').append( workOrder.template(title, nodesName, sponsorsName, addTime, doingPerson, donePerson, id, type, nodeId, waitId));
                }

                if(!pageNum){
                    workOrder.setPage('waitPage', data.totals, params.pageSize, function (api) {
                        workOrder.waitDealtList(api.getCurrent());
                    });
                }
            } else {
                //显示错误信息
                layer.msg(data.message);
            }
        }
    })
};

workOrder.myHandledList = function(pageNum){  //我的已办
    var params = workOrder.getParams();
    params.pageNum =  pageNum || 1;
    params.pageSize = workOrder.pageSize;
    $.ajax({
        url: workOrder.url + '/sys/process/done/list',
        type: 'get',
        beforeSend: function (request) {
            request.setRequestHeader("authorization", workOrder.authorization);
        },
        data: params,
        success: function (data) {
            if (data.code == "success") {
                var content = data.content;
                if(content.length == 0){
                    $('#handleTabList').html('<p style="text-align: center; margin-top: 50px;">四大皆空，已办也空。</p> ');
                    $('#handlePage').empty();
                    return;
                }
                $('#handleTabList').empty();
                for(var i = 0; i < content.length; i++){
                    var title = content[i].title;
                    var nodesName = content[i].nodesName;
                    var sponsorsName = content[i].sponsorsName;
                    var addTime = new Date(content[i].updateTime || content[i].addTime);
                    var doingPerson = content[i].doingPerson;
                    var donePerson = content[i].donePerson;

                    var id = content[i].processId;
                    var type = content[i].type;
                    var nodeId = content[i].nodeId;
                    var waitId = content[i].id;
                    $('#handleTabList').append( workOrder.template(title, nodesName, sponsorsName, addTime, doingPerson, donePerson, id, type, nodeId, waitId));
                }
                if(!pageNum){
                    workOrder.setPage('handlePage', data.totals, params.pageSize, function (api) {
                        workOrder.myHandledList(api.getCurrent());
                    });
                }

            } else {
                //显示错误信息
                layer.msg(data.message);
            }
        }
    })
};

workOrder.myApplyList = function(pageNum){  //我申请的
    var params = workOrder.getParams();
    params.pageNum =  pageNum || 1;
    params.pageSize = workOrder.pageSize;
    $.ajax({
        url: workOrder.url + '/sys/process/myapply/list',
        type: 'get',
        data: params,
        beforeSend: function (request) {
            request.setRequestHeader("authorization", workOrder.authorization);
        },
        success: function (data) {
            if (data.code == "success") {
                var content = data.content;
                if(content.length == 0){
                    $('#askTabList').html('<p style="text-align: center; margin-top: 50px;">您还没有发起过任何申请，此处空空如也。</p> ');
                    $('#askPage').empty();
                    return;
                }
                $('#askTabList').empty();
                for(var i = 0; i < content.length; i++){
                    var title = content[i].title;
                    var nodesName = content[i].nodesName;
                    var sponsorsName = content[i].sponsorsName;
                    var addTime = new Date(content[i].updateTime || content[i].addTime);
                    var doingPerson = content[i].doingPerson;
                    var donePerson = content[i].donePerson;
                    var id = content[i].id;
                    var type = content[i].type;
                    var nodeId = content[i].nodeId;
                    var waitId = content[i].id;
                    $('#askTabList').append( workOrder.template(title, nodesName, sponsorsName, addTime, doingPerson, donePerson, id, type, nodeId, waitId));
                }
                if(!pageNum){
                    workOrder.setPage('askPage', data.totals, params.pageSize, function (api) {
                        workOrder.myApplyList(api.getCurrent());
                    });
                }

            } else {
                //显示错误信息
                layer.msg(data.message);
            }
        }
    })
};
workOrder.getParams = function () {
    var object = {
        sponsorsName: $('#sponsorName').val(),
        title: $('#processName').val(),
        type: $('#processType').val()
    };
    var temp = {};
    for (var i in object) {
        if (object[i] !== '' && object[i] !== null) {
            temp[i] = object[i];
        }
    }
    return temp;
};
workOrder.setPage = function (ele, total, pageNumber, callback) {
    $('#'+ ele).pagination({
        prevContent:'<',
        nextContent:'>',
        totalData: total,			//数据总条数
        showData: pageNumber,			//每页显示的条数
        pageCount: 9,			//总页数,默认为9
        prevCls: 'prev',		//上一页class
        nextCls: 'next',
        callback: function (api) {
            callback(api);
        }
    });
};

workOrder.getProcessType = function(){  //获取流程类型
    $.ajax({
        url: workOrder.url + '/ctm/setting/param/list',
        type: 'get',
        beforeSend: function (request) {
            request.setRequestHeader("authorization", workOrder.authorization);
        },
        data: {
            code : 'processtype'
        },
        success: function (data) {
            if (data.code == "success") {
                var content = data.content;
                var options = '<option value="">全部</option>';
                for (var i = 0; i < content.length; i++) {
                    options += '<option value="' + content[i].value + '">' + content[i].name + '</option>';
                }
                $('#processType').html(options);

            } else {
                layer.msg(data.message);
            }
        }
    });
};

workOrder.getUserInfo= function () {
    var  authorization = Utils.getValue("authorization");
    $.ajax({
        type: "get",
        url: workOrder.url + '/authority/user/homepage/detail',
        async: true,
        beforeSend: function (xhr) {
            xhr.setRequestHeader("authorization", authorization);
        },
        success: function (data) {
            if (data.code == 'success') {
                var contents=data.content;
                $('#userName').html(contents.realname);
                $('#dptName').html(contents.depName);
                $('#position').html(contents.post);
                var headPic = contents.headPic;
                if(!Utils.isNullorEmpty(headPic)){
                    var imgurl = workOrder.url + "/authority/user/picture/head/" + headPic + "/download";
                    $("#userhead").attr("src",imgurl);
                }
                Utils.setValue("sex", contents.sex);
            } else {//接口调用失败
                Utils.Alert(data.message);
            }
        },
        error: function () {
            Utils.Alert('服务器异常');
        }
    });
};

workOrder.init = function(){
    var activeTab = Utils.getLocationPara('active');
    if(activeTab == "askTab"){
        $('#askTabTag a').tab('show');
        $('#askForm').hide();
    }
    this.getUserInfo();
    this.getProcessType();
    this.waitDealtList();
    this.myHandledList();
    this.myApplyList();  //默认第一页

    $('#btnAsk').on('click', function () {
        workOrder.myApplyList();
    });
    $('#btnHandel').on('click', function () {
        workOrder.myHandledList();
    });
    $('#btnWait').on('click', function () {
        workOrder.waitDealtList();
    });

    $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
        var id = $(e.target).attr('href').split('#')[1];
        if( id == 'askTab'){
            $('#askForm').hide();
        }else{
            $('#askForm').show();
        }
    });
};

$(function(){
    workOrder.init();
});