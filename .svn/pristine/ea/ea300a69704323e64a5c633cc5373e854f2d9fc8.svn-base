/**
 * OA系统-首页
 * @author:xiongxiaojun
 * @time:2017-07-14
 */
var oaSystem = {
    authorization: Utils.getValue("authorization"),
    url: rootHost
};
oaSystem.menu = function () {
    $('.menu').on('mouseover', function () {
       $(this).find('.sub-menu').stop().slideDown(200);
    }).on('mouseout', function () {
        $(this).find('.sub-menu').stop().slideUp(200);
    })
};
/**
 * 简易tab切换
 */
oaSystem.tabChange = function () {
    var menu = $('.tab-menu a');
    var content = $('.tab-content').find('ul');
    menu.on('click', function () {
        var index = $(this).index();
        menu.removeClass('active');
        $(this).addClass('active');
        content.hide();
        $(content[index]).show();
    })
};
/**
 * 获取菜单
 */
oaSystem.getMenu = function () {
    var data={
        typeLevel:1
    };
    $.ajax({
        type: "get",
        url: oaSystem.url + '/authority/resource/user/resources',
        async: true,
        data: data,
        beforeSend: function (xhr) {
            xhr.setRequestHeader("authorization", oaSystem.authorization);
        },
        success: function (data) {
            if (data.code == 'success') {
                var content = data.content;
                for(var i = 0; i < content.length; i++){
                    $('#entryMenu').append( '<li><a href="../../main.html?resourceid='+ content[i].id +'&resourcename='+ encodeURI(encodeURI(content[i].name)) +'"><em class="icon '+ content[i].icon +'"></em><span>'+ content[i].name+'</span><em class="icon-cell"></em></a></li>');
                }
            } else {//接口调用失败
                Utils.Alert(data.message);
            }
        },
        error: function () {
            Utils.Alert('服务器异常');
        }
    });
};
/**
 *获取置顶公告或新闻一条
 */
oaSystem.getPublic = function () {
    $.ajax({
        type: "get",
        url: oaSystem.url + '/news/common/list',
        data: {
            isTop:1,
            pageNum:1,
            pageSize:1
        },
        beforeSend: function (xhr) {
            xhr.setRequestHeader("authorization", oaSystem.authorization);
        },
        success: function (data) {
            if (data.code == 'success') {
               var content = data.content[0];
               var str = '';
               if(content.newsType == 0){
                   str+= '<span class="top-line-tag top-line-tag-news">新闻</span>';
               }else if(content.newsType == 1){
                   str+= '<span class="top-line-tag top-line-tag-publish">公告</span>';
               }
               if(content.pictureId){
                   $('.public-news-img').attr('src', oaSystem.url+ 'news/picture/top/' + content.id + '/download');
               }
               str+= '<a href=" ../news/newsDetail.html?newsid='+content.id +'&mestype=1" title="查看详情">'+ content.newsTitle +'</a> <span class="top-line-time"> '+ new Date(content.addTime).toDay() +'</span>'
               $('#topPublic').html(str);
               $('#topPublicContent').text(Utils.filterHtmlTag(content.content).substring(0, 172)+'......');

            } else {//接口调用失败
                Utils.Alert(data.message);
            }
        },
        error: function () {
            Utils.Alert('服务器异常');
        }
    });
};

/**
 *获取公司新闻3条
 */
oaSystem.getNews = function () {
    $.ajax({
        type: "get",
        url: oaSystem.url + '/news/common/list',
        data: {
            isTop:0,
            pageNum:1,
            pageSize:3
        },
        beforeSend: function (xhr) {
            xhr.setRequestHeader("authorization", oaSystem.authorization);
        },
        success: function (data) {
            if (data.code == 'success') {
                var content = data.content;
                var str = '';
                for(var i = 0; i < content.length; i++){
                    str += '<li>';
                    if(content[i].newsType == 0){
                        str+= '<span class="top-line-tag top-line-tag-news">新闻</span>';
                    }else if(content[i].newsType == 1){
                        str+= '<span class="top-line-tag top-line-tag-publish">公告</span>';
                    }
                    str += '<a href="../news/newsDetail.html?newsid='+ content[i].id +'&mestype=0">'+content[i].newsTitle+'</a> <span class="top-line-time"> '+ new Date(content[i].addTime).toDay() +'</span></li>'
                }
                $('#topNews').html(str);

            } else {//接口调用失败
                Utils.Alert(data.message);
            }
        },
        error: function () {
            Utils.Alert('服务器异常');
        }
    });
};

/**
 * 设置天气和日期
 */
oaSystem.getDay = function () {
    var date = new Date();
    var arr = ["星期一", "星期二", "星期三", "星期四", "星期五", "星期六", "星期日"];
    Date.prototype.toDay = function () {
        var s = '';
        var year = this.getFullYear();
        var month = this.getMonth();
        var date = this.getDate();
        s += year;
        s += month < 9 ? '-0' + (month + 1) : '-' + (month + 1);
        s += date < 10 ? '-0' + date : '-' + date;
        return s;
    };
    $('.weather-time').html(date.toDay() + '&nbsp;&nbsp;&nbsp;&nbsp;'+ arr[new Date().getDay() -1]);

    $.ajax({  //获取天气预报
        url: 'https://free-api.heweather.com/v5/weather?city=shenzhen&key=30ba99f5d2154ddd8e7ab25747743902',
        type: 'get',
        success: function (data) {
            $('.weather-status').text(data.HeWeather5[0].now.cond.txt)
        }
    })
};
/**
 * 获取个人信息
 */
oaSystem.getPersonInfo = function () {
    $.ajax({
        type: "get",
        url: oaSystem.url + '/authority/user/homepage/detail',
        async: true,
        beforeSend: function (xhr) {
            xhr.setRequestHeader("authorization", oaSystem.authorization);
        },
        success: function (data) {
            if (data.code == 'success') {
                var content = data.content;
                $('#userName').text(content.realname);
                $('.person-pos').html((content.depName || '&nbsp;') + '&nbsp;&nbsp;&nbsp;&nbsp;' + (content.post || '&nbsp;'));

                Utils.setValue("sex", content.sex);
                if (Utils.getValue("sex") !== null && Utils.getValue("sex") != "" ) {
                    if (Utils.getValue("sex") == 2) {
                        $(".person-avatar").prop("src", "../../skins/img/male-default.png");
                    }
                    else if (Utils.getValue("sex") == 1) {
                        $(".person-avatar").prop("src", "../../skins/img/man-default.png");
                    }
                } else {
                    $(".person-avatar").prop("src", "../../skins/img/man-default.png");
                }

            } else {//接口调用失败
                Utils.Alert(data.message);
            }
        },
        error: function () {
            Utils.Alert('服务器异常');
        }
    });
};
/**
 * 快捷入口
 */
oaSystem.fastEntry = function () {
    $.ajax({
        type: "get",
        url: oaSystem.url + '/authority/resource/user/resources',
        async: true,
        beforeSend: function (xhr) {
            xhr.setRequestHeader("authorization", oaSystem.authorization);
        },
        success: function (data) {
            if (data.code == 'success') {
                var content = data.content;
                for(var i = 0; i < content.length; i++){
                    var url = content[i].url;
                    var parentId = content[i].parentId;
                    var id = content[i].id;
                   if(url == '/project/projectContract.html'){ // 项目合同
                       oaSystem.setEntryMenu(parentId, id, content, '发起合同', 'contract');
                   }else if(url == '/project/proManage.html'){ //立项
                       oaSystem.setEntryMenu(parentId, id, content, '立项', 'approval');
                   }else if(url == '/project/demandManage.html'){  //提需求
                       oaSystem.setEntryMenu(parentId, id, content, '提需求', 'need');
                   }
                }
            } else {//接口调用失败
                Utils.Alert(data.message);
            }
        },
        error: function () {
            Utils.Alert('服务器异常');
        }
    });
};
oaSystem.setEntryMenu = function (parentId, id, content, name, type) {
    for(var j = 0; j < content.length; j++){
        if(parentId == content[j].id){
            $('#fastEntry').append('<li onclick="oaSystem.setEntryCookies(\'' +type + '\', \'' + id + '\')"><a href="../../main.html?resourceid='+ content[j].id +'&resourcename='+ encodeURI(encodeURI(content[j].name)) +'&entry='+type+'&id='+ id +'"><div class="operation-'+ type +'"></div><span>'+name+'</span></a></li>');
        }
    }
};
oaSystem.setEntryCookies = function (type, id) {
    Utils.setValue('fastEntry', type+ "|" +id);
};
/**
 * 我的工作台-待办
 */
oaSystem.waitHandle = function () {
    $.ajax({
        type: "get",
        url: oaSystem.url + '/sys/process/todo/list',
        data: {
            pageNum:1,
            pageSize:7
        },
        beforeSend: function (xhr) {
            xhr.setRequestHeader("authorization", oaSystem.authorization);
        },
        success: function (data) {
            if (data.code == 'success') {
                var content = data.content;
                $('#waitHandleTab').html('我的待办<span> ('+ data.totals +') </span>');
                if(content.length == 0){
                    $('#waitHandle').html("<p style='margin-top: 150px;' class='text-center'>暂无数据！</p>");
                    return;
                }
                var str = '';
                for(var i = 0; i < content.length; i++){
                    str+= '<li><p><a target="_blank" href="../workOrder/workOrderDetail.html?processId='+content[i].processId+'&type='+ content[i].type +'&nodeId='+ content[i].nodeId +'&waitId='+ content[i].id +'">'+content[i].title+'</a><span class="work-list-info">'+content[i].sponsorsName+'<em class="work-time"> '+new Date(content[i].addTime).toDay()+'</em></span></p></li>';
                }
                $('#waitHandle').html(str);

            } else {//接口调用失败
                Utils.Alert(data.message);
            }
        },
        error: function () {
            Utils.Alert('服务器异常');
        }
    });
};

/**
 * 我的工作台-我申请的
 */
oaSystem.mineAsk = function () {
    $.ajax({
        type: "get",
        url: oaSystem.url + '/sys/process/myapply/list',
        data: {
            pageNum:1,
            pageSize:7
        },
        beforeSend: function (xhr) {
            xhr.setRequestHeader("authorization", oaSystem.authorization);
        },
        success: function (data) {
            if (data.code == 'success') {
                var content = data.content;
                if(content.length == 0){
                    $('#mineAsk').html("<p style='margin-top: 150px;' class='text-center'>暂无数据！</p>");
                    return;
                }
                var str = '';
                for(var i = 0; i < content.length; i++){
                    str+= '<li><p><a target="_blank" href="../workOrder/workOrderDetail.html?processId='+content[i].id+'&type='+ content[i].type +'&nodeId='+ content[i].nodeId +'&waitId='+ content[i].id +'">'+content[i].title+'</a><span class="work-list-info">'+content[i].sponsorsName+'<em class="work-time"> '+ new Date(content[i].addTime).toDay() +'</em></span></p></li>';
                }
                $('#mineAsk').html(str);

            } else {//接口调用失败
                Utils.Alert(data.message);
            }
        },
        error: function () {
            Utils.Alert('服务器异常');
        }
    });
};
oaSystem.honourData = {
    0: [{
        name: "朱天同",
        src: "zhutiantong.png",
        department: "研发中心",
        post: "高级模式识别工程师",
        honour: "技术之星"
    },{
        name: "刘源",
        src: "liuyuan.png",
        department: "运营部",
        post: "活动运营经理",
        honour: "进步之星"
    },{
        name: "吴立辉",
        src: "wulihui.png",
        department: "路外停车事业部",
        post: "产品经理",
        honour: "进步之星"
    },{
        name: "张海",
        src: "zhanghai.png",
        department: "工程建设部",
        post: "实施工程师",
        honour: "进步之星"
    },{
        name: "刘世强",
        src: "liushiqiang.png",
        department: "工程建设部",
        post: "维护组组长",
        honour: "进步之星"
    }],
    1:[{
        name: "舒玲燕",
        src: "shulingyan.png",
        department: "人资行政部",
        post: "行政经理",
        honour: "奉献之星"
    },{
        name: "曾小菊",
        src: "zengxiaoju.png",
        department: "新能源事业部",
        post: "客服专员",
        honour: "奉献之星"
    },{
        name: "尤书畅",
        src: "youshuchang.png",
        department: "路内停车事业部",
        post: "产品经理",
        honour: "奉献之星"
    },{
        name: "黄剑豪",
        src: "huangjianhao.png",
        department: "路内停车事业部",
        post: "android开发工程师",
        honour: "奉献之星"
    },{
        name: "韦宏周",
        src: "weihongzhou.png",
        department: "路外停车事业部",
        post: "UI设计师",
        honour: "奉献之星"
    }],
    2:[{
        name: "杨双健",
        src: "yangshuangjian.png",
        department: "战略发展部",
        post: "战略发展经理",
        honour: "明日之星"
    },{
        name: "刘瑞雪",
        src: "liuruixue.png",
        department: "运营部",
        post: "停车场经营主管",
        honour: "明日之星"
    },{
        name: "冉成伟",
        src: "ranchengwei.png",
        department: "新能源事业部",
        post: "WEB前端开发工程师",
        honour: "明日之星"
    },{
        name: "熊小军",
        src: "xiongxiaojun.png",
        department: "路外停车事业部",
        post: "WEB前端开发工程师",
        honour: "明日之星"
    },{
        name: "李志标",
        src: "lizhibiao.png",
        department: "路内停车事业部",
        post: "软件测试工程师",
        honour: "明日之星"
    }],
    3:[{
        name: "潘江辉",
        src: "panjianghui.png",
        department: "路内停车事业部",
        post: "Java开发工程师",
        honour: "明日之星"
    },{
        name: "谢月星",
        src: "xieyuexing.png",
        department: "研发中心",
        post: "营销中心",
        honour: "明日之星"
    },{
        name: "田德志",
        src: "tiandezhi.png",
        department: "运行维护部",
        post: "应用运维工程师",
        honour: "明日之星"
    },{
        name: "肖云峰",
        src: "xiaoyunfeng.png",
        department: "营销中心",
        post: "区域经理",
        honour: "业绩之星"
    },{
        name: "梅宇杰",
        src: "meiyujie.png",
        department: "营销中心",
        post: "区域经理",
        honour: "开拓之星"
    }],
    4:[{
        name: "冯晋颉",
        src: "fengjinjie.png",
        department: "营销中心",
        post: "售前技术经理",
        honour: "责任之星"
    },{
        name: "游璇冰",
        src: "youxuanbing.png",
        department: "营销中心",
        post: "数据专员",
        honour: "责任之星"
    },{
        name: "黄焰",
        src: "huangyan.png",
        department: "财务部",
        post: "主管会计",
        honour: "责任之星"
    },{
        name: "万红军",
        src: "wanhongjun.png",
        department: "路外停车事业部",
        post: "测试工程师",
        honour: "责任之星"
    },{
        name: "李庆",
        src: "liqing.png",
        department: "营销中心",
        post: "售前技术经理",
        honour: "服务之星"
    }],
    5:[{
        name: "徐晨光",
        src: "xuchenguang.png",
        department: "营销中心",
        post: "售前技术经理",
        honour: "合作之星"
    },{
        name: "胡海波",
        src: "huhaibo.png",
        department: "运行维护部",
        post: "应用运维工程师",
        honour: "协作之星"
    },{
        name: "赵龙",
        src: "zhaolong.png",
        department: "工程建设部",
        post: "维护工程师",
        honour: "协作之星"
    },{
        name: "汪体",
        src: "wangti.png",
        department: "研发中心",
        post: "工程建设部",
        honour: "行动之星"
    },{
        name: "石芳铭",
        src: "shifangming.png",
        department: "战略发展部",
        post: "战略发展经理",
        honour: "讲师之星"
    }],
    6:[{
        name: "林坚立",
        src: "linjianli.png",
        department: "战略发展部",
        post: "战略发展部总经理",
        honour: "导师之星"
    }]
}
oaSystem.newPersonData = [{
    src: 'chenyu.jpg',
    name: '陈玉',
    address: '湖北|仙桃',
    department: "路外停车事业部",
    post: "Android工程师",
    hobby: '喜欢打球、爬山、游泳',
    show: '相信自己，你能行！'
},{
    src: 'liaoyinglong.jpg',
    name: '廖应龙',
    address: '江西|赣州',
    department: "路外停车事业部",
    post: "web前端开发工程师",
    hobby: '喜欢羽毛球',
    show: 'time will tell'
}];
/**
 *新同事风采
 */
oaSystem.newPerson = function () {
    var data = oaSystem.newPersonData;
    for(var i = 0; i < data.length; i++){
        if(i == 0){
            var temp =  $('<div class="item active"></div>');

        }else{
            var temp = $('<div class="item"></div>');
        }
        temp.append('<div class="item"><img alt="" src="../skins/img/workmate/'+data[i].src+'"><div class="person-new-info"><p><span class="person-name">'+data[i].name+'</span> <span>'+ data[i].address.split('|').join('&nbsp;')+'</span></p><p title="'+data[i].post+'">'+data[i].department+'&nbsp;&nbsp;'+data[i].post+'</p><p>'+data[i].hobby+'</p><p>show me: '+data[i].show+'</p></div></div>');
        $('#newWorkMate').append(temp);
    }
};

/**
 * 亿车荣誉榜
 */
oaSystem.getHonour = function () {
    var data = oaSystem.honourData;
    for(var item in data){
        if(item == 0){
            $('#honourBox').append('<div class="item active"><ul></ul></div>');
        }else{
            $('#honourBox').append('<div class="item"><ul></ul></div>');
        }
        for(var i = 0; i < data[item].length; i++){
            $($('#honourBox').find('.item')[item]).find('ul').append('<li><a target="_blank" href="../skins/img/excellent/'+ data[item][i].src +'"><img src="../skins/img/excellent/'+ data[item][i].src +'" alt="" title="'+data[item][i].name+'"><p class="honour-name">'+data[item][i].name+'</p><p>'+data[item][i].department+'&nbsp;&nbsp;&nbsp;'+data[item][i].honour+'</p><p>'+data[item][i].post+'</p></a></li>');
        }
    }
};
oaSystem.init = function () {
  this.menu();
  this.getMenu();
  this.fastEntry();
  this.tabChange();
  this.getDay();
  this.getPersonInfo();
  this.getPublic();
  this.getNews();
  this.waitHandle();
  this.mineAsk();
  this.getHonour();
  this.newPerson();
};

$(function () {
    oaSystem.init();
});