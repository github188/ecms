/**
 * Created by ranchengwei on 2017/4/28 0028.
 */
var htmlObj={
    url: appHost + approot,
    authorization: Utils.getValue("authorization")
};
//获取新闻详情
htmlObj.getNewsDetails= function (id) {
    var authorization = Utils.getValue("authorization");
    $.ajax({
        type: "get",
        url: htmlObj.url + '/news/'+id+'/detail?comStatus=0',
        async: true,
        beforeSend: function (xhr) {
            xhr.setRequestHeader("authorization", authorization);
        },
        success: function (data) {
            if (data.code == 'success') {
                var contents = data.content;
                var newsTitle=contents.newsTitle;//新闻标题
                var newTime = contents.publishDate;
                var pubTime = new Date(newTime);//发布时间
                var newsAuthor = contents.newsAuthor;//新闻作者
                var commentCount = contents.commentCount;//评论数量
                var content = contents.content;//内容
                var attachmentId = contents.attachmentId;//附件ID
                var attachmentName = contents.attachmentName;//附件名称
                var newstype= ['新闻','公告','分享', '规章制度'][contents.newsType];
                var thumbData = [];
                htmlObj.newsId = contents.id;
                document.title = newsTitle;
                $('.news-title').html(newsTitle);
                $('.news-time').text(pubTime);
                $('#author').text(newsAuthor);
                $('.news-substance').html(content);

                // $('.thumb-img').each(function(a, b){
                //     var id = $(b).attr('data-id');
                //     Utils.getImage( '/news/picture/content/' + id + '/download', function(url){
                //         $(b).attr( 'src', url);
                //     });
                // });
                // $(".news-substance img").colorbox({
                //     rel:'group1',
                //     preloading: false,
                //     photo: true,
                // }).each(function(a, b){
                //     var id = $(b).attr('data-id');
                //     Utils.getImage( '/news/picture/content/' + id + '/download?width=600&height=600', function(url){
                //         $(b).attr('href', url)
                //     });
                // });

                $(".ecary-group").colorbox({
                    rel:'group1',
                    fixed: true,
                    maxWidth: '100%',
                    maxHeight: '100%',
                    preloading: true,
                    scrolling: false,
                    scalePhotos: true,
                    photo: true
                });

                $('.news-category-tag').text(newstype);
                $('.new-author').html('撰稿人:&nbsp;' + newsAuthor);
                $('.comments-amount').text(commentCount);
                $('.news-category').show();
                if(attachmentId){
                    var attatchmentHtml='<p class="margin-b-20">附件下载：<a style="color: #01cd78;" id="downAttachment" title="点击下载" class="attachment-link" href="javascript:;">'+ attachmentName +'</a></p>';
                    $('.news-substance').append(attatchmentHtml);
                    $('#downAttachment').on('click', function () {
                        Utils.getFile({
                            url: '/news/attachment/'+attachmentId+'/download',
                            name: attachmentName
                        })
                    })

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
//获取评论列表
htmlObj.getCommentList= function (newsId,status) {//status——0显示
    var authorization=Utils.getValue("authorization");
    $.ajax({
        type: "get",
        url:  htmlObj.url + '/news/comment/'+newsId+'/'+status+'/list',
        async: true,
        beforeSend: function (xhr) {
            xhr.setRequestHeader("authorization", authorization);
        },
        success: function (data) {
            if (data.code == 'success') {
                var html='';
                var commentList = data.content;
                var length = commentList.length;
                for(var i= 0; i < length; i++){
                    html+= '<li><a style="cursor: context-menu" class="avatar-link" href="javascript:;"><img class="comments-avatar" src="'+ Utils.getAvatar(commentList[i].user) +'" alt=""></a><div class="comments-content"><p class="comments-user-name">'+ commentList[i].addPersonName +' <span>&nbsp;'+ commentList[i].user.depName + '&nbsp;|&nbsp;' + commentList[i].user.post+'&nbsp;</span> <em>'+ htmlObj.restTime(commentList[i].addTime) +'</em></p><p class="comments-substance">'+ commentList[i].content +'</p></div></li>'
                }
                $('.comments-avatar').attr('src', Utils.getAvatar());
                $('.comments-list').html(html);
                $('.comments-amount').text(length);
                // if(!pageNum){
                //     htmlObj.setPage(length, 2, function (api) {
                //         htmlObj.getCommentList(api.getCurrent());
                //     });
                // }
            } else {//接口调用失败
                Utils.Alert(data.message);
            }
        },
        error: function () {
            Utils.Alert('服务器异常');
        }
    });
};

//设置分页
htmlObj.setPage = function ( total, pageNumber, callback) {
    $('#askPage').pagination({
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

htmlObj.restTime = function (dateTimeStamp) {
    var minute = 1000 * 60;
    var hour = minute * 60;
    var day = hour * 24;
    var month = day * 30;
    var now = new Date().getTime();
    var diffValue = now - dateTimeStamp;
    if(diffValue < 0){return '刚刚';}
    var monthC = diffValue/month;
    var weekC = diffValue/(7*day);
    var dayC = diffValue/day;
    var hourC = diffValue/hour;
    var minC = diffValue/minute;
    var result = '';
   if(weekC == 1){
        result="" + parseInt(weekC) + "周前";
    }
    else if(dayC>=1 && dayC <= 5){
        result=""+ parseInt(dayC) +"天前";
    }
    else if(hourC>=1 && hourC<=24){
        result=""+ parseInt(hourC) +"小时前";
    }
    else if(minC>=1 && minC<= 60){
        result=""+ parseInt(minC) +"分钟前";
    }else if(minC < 1){
        result="刚刚";
    }else{
        result= new Date(dateTimeStamp);
    }
    return result;
};

//获取最新新闻
htmlObj.getNewestList= function () {//newsType:0 新闻，1资讯，isTop:0置顶 1不置顶
    $.ajax({
        type: "get",
        url: htmlObj.url + '/news/common/list',
        data: {
            isTop: 1,
            pageNum:1,
            pageSize:5,
            isPublish:0
        },
        beforeSend: function (xhr) {
            xhr.setRequestHeader("authorization", htmlObj.authorization);
        },
        success: function (data) {
            if (data.code == 'success') {
                var content = data.content;
                var html = '';
                for(var i = 0; i < content.length; i++){
                    if(content[i].id !== htmlObj.newsId){
                        html+= '<li><a href="newsDetail.html?newsid='+content[i].id+'&newsType='+content[i].newsType+'">'+content[i].newsTitle+'</a><span class="news-trends-time">'+ new Date(content[i].publishDate)+'</span></li>'
                    }
                }
                $('.news-trends ul').html(html);
            } else {//接口调用失败
                Utils.Alert(data.message);
            }
        },
        error: function () {
            Utils.Alert('服务器异常');
        }
    });
};

//新增评论
htmlObj.addComment= function (newsId,commentText) {//userId——用户id，username——用户名，newsId——新闻id，commentText——评论内容
    var data={
        newId:newsId,
        content:commentText
    };
    var authorization=Utils.getValue("authorization");
    layer.load(1, {
        shade: [0.5,'#000']
    });
    $.ajax({
        type: "post",
        url:  htmlObj.url + '/news/comment',
        async: true,
        data: JSON.stringify(data),
        contentType:'application/json; charset=UTF-8',
        beforeSend: function (xhr) {
            xhr.setRequestHeader("authorization", authorization);
        },
        success: function (data) {
            if (data.code == 'success') {
                $('.comments-input').val('').animate({
                    height: 42
                },100);
                $('.submit-box').width(0);
                var newsid = Utils.getLocationPara('newsid');
                layer.msg('评论成功！');
                $('.comments-text').val('').height(40);
                htmlObj.getCommentList(newsid,0);//评论列表
            }else {//接口调用失败
                Utils.Alert(data.message);
            }
            layer.closeAll('loading');
        },
        error: function () {
            Utils.Alert('服务器异常');
        }
    });
};

//页面初始化
htmlObj.init= function () {
    var newsid = Utils.getLocationPara('newsid');//新闻id
    var newsType = Utils.getLocationPara('newsType');//新闻类型0 新闻，1资讯，2分享，3规章制度
    $('#prePage').attr('href','newsList.html?newsType='+newsType);
    var commentsText = $('.comments-text');
    var commentsInput = $('.comments-input');
    if( newsType == 0 ){
        $('#prePage').html('新闻');
    }else if( newsType == 1 ){
        $('#prePage').html('公告');
    }else if( newsType == 2 ){
        $('#prePage').html('分享');
    }else if( newsType == 3 ){
        $('#prePage').html('规章制度');
    }else{
        $('#prePage').html('全部');
    }
    htmlObj.getNewsDetails(newsid);//新闻详情
    htmlObj.getCommentList(newsid,0);//评论列表
    htmlObj.getNewestList();//获取最新新闻
//    点击评论按钮
    $('.comments-submit').on('click', function (event) {
        event.stopPropagation();
        var commentText = $('.comments-text').val().ltrim();
        if(commentText.length > 0){
            htmlObj.addComment(newsid,commentText);
        }else{
            layer.msg('内容不能为空！')
        }
    });

    $('.comments-amount').on('click',  function(){ //快速到达评论区
        document.body.scrollTop = commentsText.offset().top - 300;
        commentsText.focus();
    });

    commentsText.on('focus', function () {
        commentsInput.animate({
            height: 160
        },100, 'linear', function () {
            commentsText.height(120);
        });
        $('.submit-box').width(609);
    });
    
    $(window).on('scroll', function () {
        var scrollTop = $(window).scrollTop();
        var goTop = $('#goTop');
        if(scrollTop <= 0){
            $('.news-comments').css({
                top: 176
            });

        }else{
            $('.news-comments').css({
                top: 90
            });
        }
        if(scrollTop >= 500){
            goTop.fadeIn();
        }else{
            goTop.fadeOut();
        }
    });
    $('#goTop').on('click', function () {
        $('body,html').animate({scrollTop:0},200);
    });
    // $('.comments-text').attr('style', 'height:' + (this.scrollHeight) + 'px;overflow-y:hidden;').on('input', function() {
    //     var $height = this.scrollHeight;
    //     if($height <= 120){
    //
    //     }else{
    //         $('.comments-input').height($height);
    //         this.style['min-height'] = 'auto';
    //         this.style['min-height'] = $height + 'px';
    //     }
    //
    //
    // });
};
$(document).ready(function () {
    htmlObj.init();
});