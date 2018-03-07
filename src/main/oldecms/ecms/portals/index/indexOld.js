/**
 * Created by ranchengwei on 2017/4/25 0025.
 */
var indexObj = {};
/**
 * 处理键盘事件 禁止后退键（Backspace）密码或单行、多行文本框除外
 * */
indexObj.banBackSpace = function (e) {
    //var ev = e || window.event;//获取event对象
    //var obj = ev.target || ev.srcElement;//获取事件源
    //var t = obj.type || obj.getAttribute('type');//获取事件源类型
    ////获取作为判断条件的事件类型
    //var vReadOnly = obj.getAttribute('readonly');
    //var vEnabled = obj.getAttribute('enabled');
    //var editable = obj.getAttribute('contenteditable');
    ////处理null值情况
    //vReadOnly = (vReadOnly == null) ? false : vReadOnly;
    //vEnabled = (vEnabled == null) ? true : vEnabled;
    //editable = Utils.isNullorEmpty(editable) ? false : editable;
    ////当敲Backspace键时，事件源类型为密码或单行、多行文本的，
    ////并且readonly属性为true或enabled属性为false的，则退格键失效
    //var flag1 = (ev.keyCode == 8 && (t == "password" || t == "text" || t == "textarea") &&
    //(vReadOnly == true || vEnabled != true || editable == true)) ? true : false;
    //
    ////当敲Backspace键时，事件源类型非密码或单行、多行文本的，则退格键失效
    //var flag2 = (ev.keyCode == 8 && t != "password" && t != "text" && t != "textarea") ? true : false;
    //
    ////当敲Backspace键时，事件源类型是DIV并且editable为true、退格键失效
    //var flag3 = (ev.keyCode == 8 && t == null && editable) ? true : false;
    //
    ////判断
    //if (flag3) {
    //    return true;
    //}
    //if (flag2) {
    //    return false;
    //}
    //if (flag1) {
    //    return false;
    //}
};
//公司通知、新闻
indexObj.publicMessage = function (newsType, isTop, pageSize, pageNum) {//newsType:0 新闻，1资讯，isTop:0置顶 1不置顶
    var data = {
        newsType: newsType,
        isTop: isTop,
        pageNum: pageNum,
        pageSize: pageSize,
        isPublish:0
    };
    var authorization=Utils.getValue("authorization");
    $.ajax({
        type: "get",
        url: rootHost + '/news/common/list',
        async: true,
        data: data,
        beforeSend: function (xhr) {
            xhr.setRequestHeader("authorization", authorization);
        },
        success: function (data) {
            if (data.code == 'success') {
                var content = data.content;
                var html = '';
                if(isTop == '1'){
                    for (var i = 0, contentL = content.length; i < contentL; i++) {
                        var newTime = content[i].publishDate;
                        var pubTime = new Date(newTime).toDay();
                        html += '<li class="module-item clear-float"><a href="../news/newsDetail.html?newsid=' + content[i].id + '&mestype='+content[i].newsType+'">' +
                            '<span class="module-name pull-left">' + content[i].newsTitle + '</span>' +
                            '<span class="module-time pull-right">' + pubTime + '</span></a></li>';
                    }
                    $('#company-message').empty().append(html);
                }else{
                    if(newsType=='1'){
                        if(content.length>0){
                            indexObj.companyBanner(content);
                        }
                    }else{
                        if(content.length>0){
                            var picUrl=rootHost+'/news/picture/top/'+content[0].pictureId+'/download';
                            var bannerImg='<img src="'+picUrl+'">';
                            var bannerImg='<a href="../news/newsDetail.html?newsid='+content[0].id+'&mestype='+content[0].newsType+'">'+
                                '<img   src="'+picUrl+'" alt="亿车科技"></a>';
                            //var bannerImg='<a href="../news/newsDetail.html?newsid='+content[0].id+'&mestype='+content[0].newsType+'><img src="'+picUrl+'"></a>';
                            $('#bannerImage').html(bannerImg);
                        }
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
//头部公司公告轮播
indexObj.companyBanner = function (data) {
    var bannerControl = $('<ol>');//控制按钮容器
    bannerControl.addClass('carousel-indicators');
    var bannerImage = $("<div>");//轮播图片容器
    bannerImage.addClass('carousel-inner');
    bannerImage.attr('role', 'listbox');
    var controlItem = '';//控制按钮
    var imageItem = '';//轮播图片
    for (var i = 0, imgL = data.length; i < imgL; i++) {
        var newTime = data[i].publishDate;
        var pubTime = new Date(newTime).toDay();
        if (i == 0) {
            controlItem += '<li data-target="#carousel-example-generic" data-to="' + i + '" class="active"></li>';
            imageItem += '<div class="item active"><a href="../news/newsDetail.html?newsid='+data[i].id+'&mestype='+data[i].newsType+'"><div class="notice-title">'+data[i].newsTitle+'</div>' +
                '<div class="notice-data">'+pubTime+'</div><div class="notice-detail">'+data[i].content+'</div></a></div>';
        } else {
            controlItem += '<li data-target="#carousel-example-generic" data-to="' + i + '"></li>';
            imageItem += '<div class="item"><a href="../news/newsDetail.html?newsid='+data[i].id+'&mestype='+data[i].newsType+'"><div class="notice-title">'+data[i].newsTitle+'</div>' +
                '<div class="notice-data">'+pubTime+'</div><div class="notice-detail"></div></a></div>';
        }
    }
    bannerControl.append(controlItem);
    bannerImage.append(imageItem);
    $('#banner-carousel').empty().append(bannerControl, bannerImage);
    //    轮播图初始化
    indexObj.bannerCarousel();
};
//公司公告轮播图初始化
indexObj.bannerCarousel = function () {
    $('#banner-carousel').carousel();
    $('#banner-carousel .left ').click(function (event) {
        event.stopPropagation();
        $('#banner-carousel').carousel('prev');
    });
    $('#banner-carousel .right ').click(function (event) {
        event.stopPropagation();
        $('#banner-carousel').carousel('next');
    });
    $('#banner-carousel .carousel-indicators>li').click(function (event) {
        event.stopPropagation();
        var imgNumber = parseInt($(this).attr('data-to'));
        $('#banner-carousel').carousel(imgNumber);
    });
};
//页面访问历史判断
indexObj.historyUrl = function () {
    var historyUrl = window.location.hash.replace('#', '');
    if (historyUrl != '') {
        var url = '../' + historyUrl;
        $('#all-content').empty().load(url)
    }
};
//获取右边菜单
indexObj.rightMenu= function () {
    var  authorization = Utils.getValue("authorization");
    var data={
        typeLevel:1
    };
    $.ajax({
        type: "get",
        url: rootHost + '/authority/resource/user/resources',
        async: true,
        data: data,
        beforeSend: function (xhr) {
            xhr.setRequestHeader("authorization", authorization);
        },
        success: function (data) {
            if (data.code == 'success') {
                var contents=data.content;
                var html='';
                for(var i= 0,contentL=contents.length;i<contentL;i++){
                    html+='<li class="plat-menu-item"><a href="../../main.html?resourceid='+contents[i].id+'&resourcename='+ encodeURI(encodeURI(contents[i].name))+'">'+
                        '<span class="icon icon-plat-customer"></span>'+
                        contents[i].name+'</a></li>';
                }
                $('#plat-menu').html(html);

            } else {//接口调用失败
                Utils.Alert(data.message);
            }
        },
        error: function () {
            Utils.Alert('服务器异常');
        }
    });
};
//获取当前用户信息
indexObj.getUserInfo= function () {
    var  authorization = Utils.getValue("authorization");
    $.ajax({
        type: "get",
        url: rootHost + '/authority/user/homepage/detail',
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
                    var imgurl = rootHost + "/authority/user/picture/head/" + headPic + "/download";
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
//页面初始化
indexObj.init = function () {
    //获取用户信息
    indexObj.getUserInfo();
    //获取公司通知
    indexObj.publicMessage(1, 1, 8, 1);//资讯不置顶
    indexObj.publicMessage(1, 0, 3, 1);//资讯置顶
    indexObj.publicMessage(0, 0, 1, 1);//新闻置顶
    indexObj.rightMenu();//获取右边菜单
    //待办工单选项卡切换
    $('#work-order .module-item').on('click', function (event) {
        event.stopPropagation();
        $(this).addClass('current').siblings('.module-item').removeClass('current');
    });
    ////新闻选项卡切换
    $('#company-news .module-item').on('click', function (event) {
        event.stopPropagation();
        $(this).addClass('current').siblings('.module-item').removeClass('current');
        var mesType = $(this).attr('data-type');
        indexObj.publicMessage(mesType, 1, 8, 1);
        $(this).siblings('.module-more').attr('href','#news/newsList.html?mestype'+mesType);
    });
    ////优秀员工展轮播
    $('#employee-carousel').carousel();
    $('#employee-carousel .employee-prev ').click(function (event) {
        event.stopPropagation();
        $('#employee-carousel').carousel('prev');
    });
    $('#employee-carousel .employee-next ').click(function (event) {
        event.stopPropagation();
        $('#employee-carousel').carousel('next');
    });
    ////欢迎新员工轮播
    $('#wall-carousel').carousel({interval:0});
    $('#wall-carousel .carousel-indicators>li').click(function (event) {
        event.stopPropagation();
        var imgNumber=parseInt($(this).attr('data-to'));
        $('#wall-carousel').carousel(imgNumber);
    });
    ////更多新闻
    $('#company-news .module-more').click(function (event) {
        event.stopPropagation();
        var mesType=$(this).siblings('.current').attr('data-type');
        var url=$(this).attr('data-url');
        window.location.href=url+'?mestype='+mesType;
    })


};
$(document).ready(function () {
    indexObj.init();

});