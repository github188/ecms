/**
 * OA系统-首页
 * @author:xiongxiaojun
 * @time:2017-07-14
 */
var oaSystem = {
    authorization: Utils.getValue("authorization"),
    url: appHost + approot,
    fastEntryNum: 0
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
        if(index == 0){
            oaSystem.waitHandle();
        }else if(index == 1){
            oaSystem.mineAsk();
        }
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
                    $('#entryMenu').append( '<li><a target="_blank" href="main.html?resourceid='+ content[i].id +'&resourcename='+ encodeURI(encodeURI(content[i].name)) +'"><em class="icon '+ content[i].icon +'"></em><span>'+ content[i].name+'</span><em class="icon-cell"></em></a></li>');
                }
                $('#entryMenu').append('<li><a target="_blank" href="http://ecaray.learnnow.net.cn/app/user/userLogin/$"><em class="icon icon-learn"></em><span>学习平台</span><em class="icon-cell"></em></a></li>')
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
oaSystem.getPublic = function () {  //newsType:0 新闻，1资讯，isTop:0置顶 1不置顶
    $.ajax({
        type: "get",
        url: oaSystem.url + '/news/common/list',
        data: {
            isTop: 0,
            pageNum:1,
            pageSize:1,
            isPublish:0
        },
        beforeSend: function (xhr) {
            xhr.setRequestHeader("authorization", oaSystem.authorization);
        },
        success: function (data) {
            if (data.code == 'success') {
               var content = data.content[0];
               if (!content){
                   return;
               }
               var str = '';
               if(content.newsType == 0){
                   str+= '<span class="top-line-tag top-line-tag-news">新闻</span>';
               }else if(content && content.newsType == 1){
                   str+= '<span class="top-line-tag top-line-tag-publish">公告</span>';
               }else if(content && content.newsType == 2){
                   str+= '<span class="top-line-tag top-line-tag-share">分享</span>';
               }else if(content && content.newsType == 3){
                   str+= '<span class="top-line-tag top-line-tag-share">制度</span>';
               }
               if(content.pictureId){
                   $('#public-news-img').attr('src', oaSystem.url+ '/news/picture/top/' + content.pictureId + '/download?width=230&height=120');
               }else{
                   $('#public-news-img').attr('src', 'skins/img/news-default.png');
               }
               var link = 'portals/news/newsDetail.html?newsid='+content.id +'&newsType='+ content.newsType;
               str+= '<a target="_blank" href='+ link +' title="查看详情">'+ content.newsTitle +'</a><em class="tag-icon tag-icon-top">Top</em> <span class="top-line-time" style="margin-top: 0;"> '+ new Date(content.publishDate) +'</span>'
               $('#topPublic').html(str);
               $('#topLink').attr('href', link);
               $('#topNewsOne').show();
               $('#topPublicContent').text(Utils.filterHtmlTag(content.content.unescapeHtml()).substring(0, 140)+'...');

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
            isTop: 1,
            pageNum:1,
            pageSize:3,
            isPublish:0
        },
        beforeSend: function (xhr) {
            xhr.setRequestHeader("authorization", oaSystem.authorization);
        },
        success: function (data) {
            if (data.code == 'success') {
                var content = data.content;
                var str = '';
                for(var i = 0; i < content.length; i++){
                    str += '<li class="top-line-title">';
                    if(content[i].newsType == 0){
                        str+= '<span class="top-line-tag top-line-tag-news" style="position: relative; top: -12px;">新闻</span>';
                    }else if(content[i].newsType == 1){
                        str+= '<span class="top-line-tag top-line-tag-publish" style="position: relative; top: -12px;">公告</span>';
                    }else if(content[i].newsType == 2){
                        str+= '<span class="top-line-tag top-line-tag-share" style="position: relative; top: -12px;">分享</span>';
                    }else if(content[i].newsType == 3){
                        str+= '<span class="top-line-tag top-line-tag-rule" style="position: relative; top: -12px;">制度</span>';
                    }
                    str += '<a target="_blank" href="portals/news/newsDetail.html?newsid='+ content[i].id +'&newsType='+ content[i].newsType +'">'+content[i].newsTitle+  '</a>'+ oaSystem.restTime(content[i].publishDate) +'<span class="top-line-time"> '+ new Date(content[i].publishDate) +'</span></li>'
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
 * 是否5天内
 */

oaSystem.restTime = function (dateTimeStamp) {
    var str = '';
    var minute = 1000 * 60;
    var hour = minute * 60;
    var day = hour * 24;
    var now = new Date().getTime();
    var diffValue = now - dateTimeStamp;
    var dayC =diffValue/day;
    if(dayC <= 5){
         str = '<em class="tag-icon tag-icon-new">New</em>';
    }
    return str;
};

/**
 * 设置天气和日期
 */
oaSystem.getDay = function () {
    var date = new Date();
    var arr = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
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
    $('.weather-time').html(date.toDay() + '&nbsp;&nbsp;&nbsp;&nbsp;'+ arr[new Date().getDay()]);

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
                var depName = (content.depName).split('-');
                $('.person-pos').html(( depName[depName.length-1] || '&nbsp;') + '&nbsp;&nbsp;&nbsp;&nbsp;<span class="person-post">' + (content.post || '&nbsp;') + '</span>');

                if($('.person-post').width() >= 198 ){
                    $('.person-post').css('display', 'block');
                    $('.person-pos').css('margin-top', -10);

                }else{
                    $('.person-post').css('display', 'inline');
                }

                Utils.setValue("headPic", content.headPic);
                Utils.setValue("sex", content.sex);

                $(".person-avatar").prop("src", Utils.getAvatar(content, 200, 200));

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
                    if(url == '/project/humanAttendance.html'){  // 发起请假
                        oaSystem.setEntryMenu(parentId, id, content, '请假', 'leave');
                        oaSystem.setEntryMenu(parentId, id, content, '加班', 'extra');
                        oaSystem.setEntryMenu(parentId, id, content, '出差', 'out');
                        oaSystem.setEntryMenu(parentId, id, content, '外出', 'egress');
                    }else if(url == '/project/projectContract.html'){ // 项目合同
                       Utils.setValue('contractId', id);
                       oaSystem.getEntrySubBtn(id, 'startVerify', function () {
                           oaSystem.setEntryMenu(parentId, id, content, '发起合同', 'contract');
                       });
                   }else if(url == '/project/proManage.html'){ //立项
                       oaSystem.getEntrySubBtn(id, 'pmo_add_project', function () {
                           oaSystem.setEntryMenu(parentId, id, content, '立项', 'approval');
                       });
                   }else if(url == '/project/demandManage.html'){  //提需求
                       oaSystem.getEntrySubBtn(id, 'pmo_add_demand', function () {
                           oaSystem.setEntryMenu(parentId, id, content, '提需求', 'need');
                       });
                   }else if(url == '/project/crmClientManage.html'){ //录客户
                       oaSystem.getEntrySubBtn(id, 'crm_add_client', function () {
                           oaSystem.setEntryMenu(parentId, id, content, '录客户', 'client');
                       });
                   }else if(url == '/project/crmBusinessManage.html'){//录商机
                       oaSystem.getEntrySubBtn(id, 'crm_add_opportunity', function () {
                           oaSystem.setEntryMenu(parentId, id, content, '录商机', 'business');
                       });
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
/**
 * 获取当前用户的权限按钮
 */
oaSystem.getEntrySubBtn = function (id, url, callback) {
    $.ajax({
        type: "get",
        url: oaSystem.url + '/authority/resource/user/resources?resourceId=' + id,
        async: false,
        beforeSend: function (xhr) {
            xhr.setRequestHeader("authorization", oaSystem.authorization);
        },
        success: function (data) {
            if(data.code == 'success'){
                var content = data.content;
                for(var i = 0; i < content.length; i++){
                    if(content[i].url == url){
                        callback();
                    }
                }
            }else{
                layer.msg(data.message);
            }
        }
    })
};
oaSystem.setEntryMenu = function (parentId, id, content, name, type) {
    oaSystem.fastEntryNum++;
    for(var j = 0; j < content.length; j++){
        if(parentId == content[j].id){
           if(oaSystem.fastEntryNum <= 6){
               $( $('#fastEntry ul')[0] ).append('<li onclick="oaSystem.setEntryCookies(\'' +type + '\', \'' + id + '\')"><a target="_blank" href="main.html?resourceid='+ content[j].id +'&resourcename='+ encodeURI(encodeURI(content[j].name)) +'&entry='+type+'&id='+ id +'"><div class="operation-'+ type +'"></div><span>'+name+'</span></a></li>');
           }else{
               if($( $('#fastEntry ul')[1] ).length == 0 ){
                   $('#fastEntry .carousel-inner').append("<ul class='item'></ul>")
               }
               $( $('#fastEntry ul')[1] ).append('<li onclick="oaSystem.setEntryCookies(\'' +type + '\', \'' + id + '\')"><a target="_blank" href="main.html?resourceid='+ content[j].id +'&resourcename='+ encodeURI(encodeURI(content[j].name)) +'&entry='+type+'&id='+ id +'"><div class="operation-'+ type +'"></div><span>'+name+'</span></a></li>');
               $('#fastEntry .slide-toggle').show();
           }
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
                    $('#waitHandle').html("<p style='margin-top: 150px;' class='text-center'>勤劳如您，一个待办都木有，点赞！</p>");
                    return;
                }
                var str = '';
                for(var i = 0; i < content.length; i++){
                    str+= '<li><p><a target="_blank" href="portals/workOrder/workOrderDetail.html?processId='+content[i].processId+'&type='+ content[i].type +'&nodeId='+ content[i].nodeId +'&waitId='+ content[i].id +'">'+content[i].title+'</a><span class="work-list-info">'+content[i].sponsorsName+'<em class="work-time"> '+new Date(content[i].addTime)+'</em></span></p></li>';
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
                    $('#mineAsk').html("<p style='margin-top: 150px;' class='text-center'>您还没有发起过任何申请，此处空空如也。</p>");
                    return;
                }
                var str = '';
                for(var i = 0; i < content.length; i++){
                    str+= '<li><p><a target="_blank" href="portals/workOrder/workOrderDetail.html?processId='+content[i].id+'&type='+ content[i].type +'&nodeId='+ content[i].nodeId +'&waitId='+ content[i].id +'">'+content[i].title+'</a><span class="work-list-info">'+content[i].sponsorsName+'<em class="work-time"> '+ new Date(content[i].addTime) +'</em></span></p></li>';
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
        honour: "技术之星",
        describe: '对待开发工作严肃认真、精益求精，在2016年的基础上开发出了识别率高达97%的斜拍车牌识别算法，达到业界领先水平，用自己的技术为公司增加竞争力！'
    },{
        name: "林坚立",
        src: "linjianli.png",
        department: "战略发展部",
        post: "战略发展部总经理",
        honour: "导师之星",
        describe: '季度内共辅导2位新人转正，新人转正考核平均分达88.85分；导师对新人循循善导，辅导技巧灵活多样，新人不仅顺利转正，且表现优秀，均被评选为本季度的优秀个人明日之星奖！'
    },{
        name: "吴立辉",
        src: "wulihui.png",
        department: "路外停车事业部",
        post: "产品经理",
        honour: "进步之星",
        describe: '去年的新人已经成长为路外事业部项目及产品的需求工作主力，在二季度表现非常突出，在交管产品、集团化产品等的构建过程中，承担了大部分的需求输出工作，所完成的产品得到了公司领导、外部客户的一致认可及好评，对于路外产品体系的了解也逐步地深化，相信在今年一定能做出非常优异的成绩！'
    },{
        name: "张海",
        src: "zhanghai.png",
        department: "工程建设部",
        post: "实施工程师",
        honour: "进步之星",
        describe: '进步快，工作积极，认真勤奋，积极融入团队，客户服务态度非常好；上半年前几个月改了不少场地，保质保量，最近经常在外出差做技术支持或者停车场改造，踏实认真，工作完成的很出色，客户评价很高！'
    },{
        name: "刘世强",
        src: "liushiqiang.png",
        department: "工程建设部",
        post: "维护组组长",
        honour: "进步之星",
        describe: '从一个应届毕业生到现在的维护组长，成长有目共睹，用6个人的团队服务着全深圳几百个停车场项目，组内制度也慢慢建立，同时对组员很好地传递了公司敢拼敢闯不怕辛苦的传统，继续努力！'
    }],
    1:[{
        name: "舒玲燕",
        src: "shulingyan.png",
        department: "人资行政部",
        post: "行政经理",
        honour: "奉献之星",
        describe: '具有很明显的早期员工特点，任劳任怨，哪里需要去哪里，不管是来自本部门的需求还是来自其他部门的需求；乐于接受任何一项工作任务，视为锻炼自己、成长自己的机会；虽然是85后，但已经是大家耳熟能详的“小舒姐”！'
    },{
        name: "石芳铭",
        src: "shifangming.png",
        department: "战略发展部",
        post: "战略发展经理",
        honour: "讲师之星",
        describe: '二季度培训主题“规划先行-停车项目的前期工作”学员满意度高达4.91分，覆盖参训人数排名中最多达58人，在课程内容讲解方面深入浅出，互动性强，学员反馈与工作相关性较强，整体评价非常高！'
    },{
        name: "尤书畅",
        src: "youshuchang.png",
        department: "路内停车事业部",
        post: "产品经理",
        honour: "奉献之星",
        describe: '在产品团队人力紧张的情况下，同时负责商业化变现、广告平台和基础框架平台的产品设计工作，有效推进了相关产品的研发工作，为公司后续的想象空间和产品可扩展性打下了良好的基础！'
    },{
        name: "黄剑豪",
        src: "huangjianhao.png",
        department: "路内停车事业部",
        post: "android开发工程师",
        honour: "奉献之星",
        describe: '在路内停车事业部负责了10多个城市PDA开发与升级，并完成了多个硬件设备的顺利接入，以认真负责的态度及时应对客户现场发生的问题，大大提高了用户体验以及产品性能，为路内事业部奉献了自己的汗水和努力！'
    },{
        name: "韦宏周",
        src: "weihongzhou.png",
        department: "路外停车事业部",
        post: "UI设计师",
        honour: "奉献之星",
        describe: '今年对于UI规范、布局、交互设计等知识有了更深的了解，将所学运用到工作中有很大的提升；负责的城市停车场报送平台大数据展示页面设计得到了同事们和市场广泛认可和积极反馈；新学习的C4D三维软件也很好的运用海报、展厅、展会设计和蜜蜂停车启动页面设计等工作中，视觉、风格、表现形式都有明显的提升和改善！'
    }],
    2:[{
        name: "杨双健",
        src: "yangshuangjian.png",
        department: "战略发展部",
        post: "战略发展经理",
        honour: "明日之星",
        describe: '入职时间不长但已较全面了解公司产品线，并转化为项目申报成果；积极配合展会和宣传；支撑市场一线，为客户编制项目建议书、可研报告等规划文档建设文档；积极与高校、专家、规划研究院所建立合作，为公司对外高层合作打下基础！'
    },{
        name: "刘瑞雪",
        src: "liuruixue.png",
        department: "运营部",
        post: "停车场经营主管",
        honour: "明日之星",
        describe: '虽为新员工，但积极主动，充分发挥传统物业管理行业经验，草拟了《停车场项目运营管理手册》，完成经营权项目调研表、成本产出测算模型等；积极与营销中心配合洽谈多地经营权项目；利用原有物业关系资源，推动与物业的蜜蜂停车项目合作！'
    },{
        name: "冉成伟",
        src: "ranchengwei.png",
        department: "新能源事业部",
        post: "WEB前端开发工程师",
        honour: "明日之星",
        describe: '学习能力强，入职后很快融入团队并能独挡一面；为人友好，热心帮助同事，工作积极认真负责；一人承担骆驼快充web端所有业务开发和维护，并都能按时按质完成所有工作内容，对骆驼web端做出很大贡献！'
    },{
        name: "熊小军",
        src: "xiongxiaojun.png",
        department: "路外停车事业部",
        post: "WEB前端开发工程师",
        honour: "明日之星",
        describe: '入职后短时间内快速熟悉蜜蜂停车业务，在工作中积极与同事沟通，并不断提升自身的业务和协作能力，很好的完成各项任务安排；参与交管平台项目，完成了前端的多个关键技术实现的攻关，使系统最终的呈现效果非常流畅！'
    },{
        name: "李志标",
        src: "lizhibiao.png",
        department: "路内停车事业部",
        post: "软件测试工程师",
        honour: "明日之星",
        describe: '作为实习生加入公司到现在一年多，每天都在进步，从毫无职场经验到独立承担深圳项目的测试，再到现在负责几个项目的测试，每次在面对巨大时间压力时都能按时完成任务；业余时间不断地学习测试技术，不断地提升自己，如这次路内产品线上巡检的实现就是自己不断学习的结果！'
    }],
    3:[{
        name: "潘江辉",
        src: "panjianghui.png",
        department: "路内停车事业部",
        post: "Java开发工程师",
        honour: "明日之星",
        describe: '自入职以来每个月都在进步，从当初一个对路内的业务一窍不通成长到现在能独当一面的组长，同时带领自己的组员对需求进行快速反应和研发，每次面对巨大的时间压力时都能按时完成任务，是我们路内事业部的明日之星！'
    },{
        name: "谢月星",
        src: "xieyuexing.png",
        department: "售前技术经理",
        post: "营销中心",
        honour: "明日之星",
        describe: '在全国停车项目的集中爆发期，面对公司营销团队众多的项目支持需求，有条不紊地全力支撑前方战场、输送武器；主要牵头负责了公司NB停车项目的跟进，几个月以来取得了良好成果，与联通集团、移动集团等在NB停车方面建立了深度合作，使公司在NB技术领域站在行业前列！'
    },{
        name: "田德志",
        src: "tiandezhi.png",
        department: "运行维护部",
        post: "应用运维工程师",
        honour: "明日之星",
        describe: '自入职运维以来，对待工作认真勤恳，很好的完成自己的本职工作，积极响应客户提出的问题并帮助客户解决！'
    },{
        name: "肖云峰",
        src: "xiaoyunfeng.png",
        department: "营销中心",
        post: "区域经理",
        honour: "业绩之星",
        describe: '在任丘项目中，积极主动地协调商务工作，时刻以公司利益作为行动准则；通过自身努力学习，很快熟悉新产品并带入项目中，扩大了销售额！'
    },{
        name: "梅宇杰",
        src: "meiyujie.png",
        department: "营销中心",
        post: "区域经理",
        honour: "开拓之星",
        describe: '从2C到2G，角色转变与自我学习迅速，在项目执行跟进中展现了亿车人该有的专业素养和谈判能力，在浙江地区打破最大竞争对手的封锁，在炮火最前沿的阵地拿下城市级停车场联网改造项目和路内外一体化运营项目；接下来主动出击，在垂直停车场运营以及更大城市级项目中提升能力、提高格局，让亿车的旗帜插遍吴越大地！'
    }],
    4:[{
        name: "冯晋颉",
        src: "fengjinjie.png",
        department: "营销中心",
        post: "售前技术经理",
        honour: "责任之星",
        describe: '工作认真仔细，输出的技术方案非常完善；项目试点时，深入了解公司平台和设备，提出非常多的合理化建议；输出的方案得到业主，得到市场人员的认可；团队配合度非常高！'
    },{
        name: "游镟冰",
        src: "youxuanbing.png",
        department: "营销中心",
        post: "数据专员",
        honour: "责任之星",
        describe: '勤恳务实，善于学习，对本职工作兢兢业业，注重个人成长，有效改进自己的工作方式，不断优化部门数据分析及合同管理工作，快速成长；悟性强，充分利用业余时间精专业务知识，提高工作能力！'
    },{
        name: "黄焰",
        src: "huangyan.png",
        department: "财务部",
        post: "主管会计",
        honour: "责任之星",
        describe: '工作富有耐心、责任心、积极谏言，在第二季度强压状态下完成2016年所有公司的汇算清缴和工商年报，辅助前期账务梳理，同时也能耐心辅导两位新同事！'
    },{
        name: "万红军",
        src: "wanhongjun.png",
        department: "路外停车事业部",
        post: "测试工程师",
        honour: "责任之星",
        describe: '重新梳理业务流程和业务逻辑，对业务的熟悉也进一步加深，工作做起来有条不紊，秩序井然，感觉焕然一新；对测试有了新的认识，对岗位的理解有了新的定义，测试作为产品交到客户手里的最后一道关卡，肩上的担子不言而喻；在工作中一丝不苟，认真负责，虽然并不一定是尽善尽美，但对自己交付的版本可以肯定的说没问题！'
    },{
        name: "李庆",
        src: "liqing.png",
        department: "营销中心",
        post: "售前技术经理",
        honour: "服务之星",
        describe: '调入办事处后，虽远离总部，但一直保持着总部价值观对区域的积极输出，兢兢业业地为区域同事提供各种方案支持并主导了区域的培训工作；工作任劳任怨，积极负责，思路清晰，并且具有主人翁精神！'
    }],
    5:[{
        name: "徐晨光",
        src: "xuchenguang.png",
        department: "营销中心",
        post: "售前技术经理",
        honour: "合作之星",
        describe: '作为五区售前支持，不论在方案上还是客户现场拜访沟通上，都给予我们最大的支持；专业能力优秀，对项目推动效果明显，对大家的学习提升也带来实战经验的指导；下半年还需要大家团结一致，一起奋战拿下重点项目，成为最强拍档！'
    },{
        name: "胡海波",
        src: "huhaibo.png",
        department: "运行维护部",
        post: "应用运维工程师",
        honour: "协作之星",
        describe: '对待运维工作中出现的问题善于分析和总结；积极主动帮助同事解决问题；面对客户项目出现的突发事故快速响应，及时处理！'
    },{
        name: "赵龙",
        src: "zhaolong.png",
        department: "工程建设部",
        post: "维护工程师",
        honour: "协作之星",
        describe: '作为售后维护团队中能说会道的定损高手，每次遇到棘手的客户总能迅速化解问题，并且得到物业的一直认可；同时在大型值班任务中主动承担责任，很好的协调工单处理！'
    },{
        name: "汪体",
        src: "wangti.png",
        department: "实施工程师",
        post: "工程建设部",
        honour: "行动之星",
        describe: '加入工程部一年多时间里，在本职工作全部完成的同时，积极地参与到其他同事的工作中，尽自己所能挺高部门的工作效率，并积极地学习其他专业技术，扩大自己的知识范围！'
    }]
}
oaSystem.newPersonData = [{
    src: 'zengzengyao.jpg',
    name: '曾锃垚',
    address: '湖南省|衡阳市',
    department: "财务部",
    post: "合资公司财务经理",
    hobby: '羽毛球、轻装户外行走',
    show: '诚信、敬业 '
},{
    src: 'xiadongjin.jpg',
    name: '夏冬金',
    address: '江苏省|淮安市',
    department: "营销中心",
    post: "（南京）售前技术经理",
    hobby: '看书、旅游、羽毛球',
    show: '阳光开朗，性格直爽、简单 '
},{
    src: 'zhufeifei.jpg',
    name: '朱非飞',
    address: '湖北省|宜昌市',
    department: "运维服务中心",
    post: "网络工程师",
    hobby: '爬山、宅',
    show: '一切都是最好的安排'
},{
    src: 'chenwei.jpg',
    name: '陈伟',
    address: '河南省|信阳市',
    department: "营销中心",
    post: "（武汉）售前技术经理",
    hobby: '篮球、跑步',
    show: '没有可以秀的才艺'
},{
    src: 'liuwei.jpg',
    name: '刘伟',
    address: '山东省|聊城市',
    department: "营销中心",
    post: "（济南）售前技术经理",
    hobby: '阅读、思考、运动、社交、羽毛球',
    show: '以梦为马 不负韶华'
},{
    src: 'shenruiqin.jpg',
    name: '申瑞芹',
    address: '湖南省|邵阳市',
    department: "政府事业部",
    post: "Android开发工程师",
    hobby: '跑步、游泳',
    show: '独立思考、不断学习、解决问题'
},{
    src: 'zhoupengqi.jpg',
    name: '周鹏奇',
    address: '广东省|深圳市',
    department: "人资行政部",
    post: "行政专员",
    hobby: '运动、自助旅游',
    show: '一切皆有可能'
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
        temp.append('<div class="item"><img alt="" src="skins/img/workmate/'+data[i].src+'"><div class="person-new-info"><p><span class="person-name">'+data[i].name+'</span> <span>'+ data[i].address.split('|').join('&nbsp;')+'</span></p><p title="'+data[i].post+'">'+data[i].department+'&nbsp;&nbsp;'+data[i].post+'</p><p>'+data[i].hobby+'</p><p title="'+data[i].show+'">show me: '+data[i].show+'</p></div></div>');
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

            $($('#honourBox').find('.item')[item]).find('ul').append('<li><img src="skins/img/excellent/'+ data[item][i].src +'" alt="" title="'+data[item][i].name+'"><p class="honour-name">'+data[item][i].name+'</p><p>'+data[item][i].department+'&nbsp;&nbsp;&nbsp;'+data[item][i].honour+'</p><p>'+data[item][i].post+'</p><div class="honour-synopsis"><p><label>部门:</label> '+ data[item][i].department +'</p><p><label>岗位:</label> '+ data[item][i].post +'</p><p>'+ data[item][i].describe +'</p></div></li>');
            // $($('#honourBox').find('.item')[item]).find('ul').append('<li><img src="skins/img/excellent/'+ data[item][i].src +'" alt="" title="'+data[item][i].name+'"><div class="person-honour"><p class="person-honour-name">'+data[item][i].name +'</p><p class="person-honour-dpart">'+ data[item][i].honour +'</p></div><div class="honour-synopsis"><p><label>部门:</label> '+ data[item][i].department +'</p><p><label>岗位:</label> '+ data[item][i].post +'</p><p>'+ data[item][i].describe +'</p></div></li>');
        }
    }

    $('#honourBox ul li').on('mouseover', function(){
        $('.honour-synopsis').stop().fadeOut(100);
        $(this).find('.honour-synopsis').stop().fadeIn();
        $(this).find('.person-honour-dpart').css('color', '#01cd78');

    }).on('mouseout',function(){
        $('.honour-synopsis').stop().fadeOut(100);
        $(this).find('.person-honour-dpart').css('color', 'rgba(1, 1, 1, .8)');
    });
};

oaSystem.init = function () {
  this.getPublic();
  this.menu();
  this.getMenu();
  this.fastEntry();
  this.tabChange();
  this.getDay();
  this.getPersonInfo();

  this.getNews();
  this.waitHandle();
  this.mineAsk();
  this.getHonour();
  this.newPerson();
};

$(function () {
    oaSystem.init();
});