/**
 * Created by ranchengwei on 2017/4/27 0027.
 */
var htmlObj={
    url: appHost + approot,
    pageSize: 5
};
htmlObj.publicMessage = function (newsType, pageNum) {//newsType:0 新闻，1资讯，isTop:0置顶 1不置顶
    var params = {
        pageNum:  pageNum || 1,
        pageSize:  htmlObj.pageSize,
        isPublish: 0
    };
    if(newsType == 0 || newsType == 1 || newsType == 2 || newsType == 3){
        params.newsType = newsType;
    }
    var authorization=Utils.getValue("authorization");
    $.ajax({
        type: "get",
        url: htmlObj.url + '/news/common/list',
        async: true,
        data: params,
        beforeSend: function (xhr) {
            xhr.setRequestHeader("authorization", authorization);
        },
        success: function (data) {
            if (data.code == 'success') {
                var contents = data.content;
                var html = '';
                    for(var i= 0,contentL=contents.length;i<contentL;i++){
                        var newTime = contents[i].publishDate;
                        var pubTime = new Date(newTime);
                        html+='<div class="news-item"><div class="news-title"><a target="_blank" href="newsDetail.html?newsid='+contents[i].id+'&newsType='+contents[i].newsType+'">'+contents[i].newsTitle+'</a></div>'+
                            '<div class="news-data">'+pubTime+' <span style="padding-left: 10px;">撰稿人：'+ contents[i].newsAuthor +'</span> <span class="comments-num">'+ contents[i].commentCount +'</span></div><div class="news-abstract">'+
                            '<span>' + (contents[i].content.replace(/<\/?[^>]*>/g, '')).substring(0, 104)  +'...' +'</span><a target="_blank" title="查看全文" href="newsDetail.html?newsid='+contents[i].id+'&newsType='+contents[i].newsType+'" class="look-more">查看全文></a></div></div>'
                    }
                $('#news-list').html(html);
                if(params.pageNum == 1){
                    htmlObj.setPage(data.totals, params.pageSize, function(api){
                        htmlObj.publicMessage(newsType, api.getCurrent());
                    } );
                }
            }else {//接口调用失败
                Utils.Alert(data.message);
            }
        },
        error: function () {
            Utils.Alert('服务器异常');
        }
    });
};
//选项卡渲染初始化
htmlObj.tabRender= function (newsType) {
    console.log(newsType)
    $('#left-menu').children('li[data-type='+newsType+']').siblings('.menu-item').removeClass('current-menu');
    $('#left-menu').children('li[data-type='+newsType+']').addClass('current-menu');
};

htmlObj.setPage = function ( total, pageNumber, callback) {
    $('#pageNumber').pagination({
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

//页面初始化
htmlObj.init= function () {
    var newsType = Utils.getLocationPara('newsType');
    htmlObj.tabRender(newsType);
    htmlObj.publicMessage(newsType);
    $('#left-menu .menu-item').click(function (event) {
        event.stopPropagation();
        var newsType = $(this).attr('data-type');
        if(newsType == 1){
            $('.current-color').text('公告')
        }else if(newsType == 0){
            $('.current-color').text('新闻')
        }else if(newsType == 2){
            $('.current-color').text('分享')
        }else if(newsType == 3){
            $('.current-color').text('规章制度')
        }else{
            $('.current-color').text('全部')
        }
        $(this).addClass('current-menu').siblings('.menu-item').removeClass('current-menu');
        htmlObj.publicMessage(newsType);
    })
};
$(document).ready(function () {
    htmlObj.init();
});