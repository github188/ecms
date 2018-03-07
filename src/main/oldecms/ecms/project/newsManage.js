/**
 * Created by ranchengwei on 2017/5/3 0003.
 */
var htmlObj={};
//接口配置路径
htmlObj.rootUrl = appHost + approot;
htmlObj.authorization = Utils.getValue('authorization'); //获取登录人的userId和Token
//新闻id主要是区别新增还是修改
htmlObj.newsId='';
//新闻编辑器
htmlObj.newsEditor='';
//上传封面图片的id
htmlObj.topImage='';
//附件信息
htmlObj.attachment={
    name:'',
    id:''
};

//获取新鲜事儿列表
htmlObj.getNewsList= function () {
    var cmd = new CommandAjax(htmlObj.rootUrl + "/news/common/list", htmlObj.authorization);
    cmd.newsTitle=$('#newsTitle').val();
    cmd.isPublish=$('#status').val();
    cmd.newsAuthor=$('#publicPerson').val();//发布人
    cmd.newsType =99;//发布人
    $("#newsList").datagrid({
        columns: [{
            display: "类型",
            width: "160px",
            align: "center",
            render: function (row) {
                var newsType = row.newsType;
                if(newsType==1){//资讯
                    return '通知';
                }else if(newsType==0){//新闻
                    return '新闻';
                }else if(newsType==2){
                    return '分享';
                }else if(newsType==3){
                    return '规章制度';
                }
            }
        }, {
            display: "标题",
            align: "left",
            name:'newsTitle'
        }, {
            display: "发布人",
            name: "newsAuthor",
            width: "150px",
            align: "center"
        }, {
            display: "发布日期",
            width: "150px",
            align: "center",
            render: function (row) {
                var newTime = row.publishDate;
                var pubTime = new Date(newTime).toDay();
                return pubTime;
            }
        }, {
            display: "当前状态",
            name: "marktPersonName",
            width: "90px",
            align: "center",
            render: function (row) {
                var status = row.isPublish;
                if(status=='1'){
                    return '未发布'
                }else{
                    return '已发布'
                }
            }
        },{
            display: "评论数量",
            name: "commentCount",
            width: "80px",
            align: "center"
        }, {
            display: "操作",
            width: "220px",
            align: "center",
            render: function (row) {
                var id = row.id,//新闻id
                    status = row.isPublish,//发布状态,0——发布，1——不发布
                    isTop = row.isTop,//是否置顶，0——置顶，1——不置顶
                    rowHtml = '<div style="padding-left: 8px;text-align: left;">';
                if(status==1){
                    rowHtml += '<a class="oprate" title="修改" href="javascript:void(0);" onclick="htmlObj.modifyNews(\'' + id + '\')">修改</a>';
                    rowHtml +='<a class="oprate" title="发布" href="javascript:void(0);" onclick="htmlObj.publicNews(\'' + id + '\',\'' + status + '\')">发布</a>' ;
                }else{
                    rowHtml +='<a class="oprate" title="取消发布" href="javascript:void(0);" onclick="htmlObj.publicNews(\'' + id + '\',\'' + status + '\')">取消发布</a>' ;
                }
                if(isTop=='1'){
                    rowHtml+= '<a class="oprate" title="置顶" href="javascript:void(0);" onclick="htmlObj.addTop(\'' + id + '\',\'' + isTop + '\')">置顶</a>';
                }else{
                    rowHtml+= '<a class="oprate" title="取消置顶" href="javascript:void(0);" onclick="htmlObj.addTop(\'' + id + '\',\'' + isTop + '\')">取消置顶</a>';
                }
                rowHtml +='<a class="oprate" title="评论管理" href="javascript:void(0);" onclick="htmlObj.argumentsManage(\'' + id + '\')">评论管理</a>';
                rowHtml += "</div>";
                return rowHtml;
            }
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

            }
        }
    });
};
//获取新闻详情
htmlObj.getNewsInfo= function (id) {
    var authorization=htmlObj.authorization;
    $.ajax({
        type: "GET",
        url: htmlObj.rootUrl + '/news/'+id+'/detail',
        async: true,
        beforeSend: function (xhr) {
            xhr.setRequestHeader("authorization", authorization);
        },
        success: function (data) {
            if (data.code == 'success') {
                var contents=data.content;
                var title=contents.newsTitle;//标题
                var author=contents.newsAuthor;//作者
                var newsType=contents.newsType;//类型
                var isTop=contents.isTop;//是否置顶
                var publishDate=contents.publishDate;//发布时间
                publishDate=new Date(publishDate).toDay();
                var content=contents.content;//正文
                var pictureId=contents.pictureId;//图片
                var attachmentName=contents.attachmentName;//附件名称
                var attachmentId=contents.attachmentId;//附件Id
                if(!Utils.isNullorEmpty(pictureId)){//图片
                    var imgurl=htmlObj.rootUrl + "/news/picture/top/"+pictureId+"/download";
                    var html='<img src="'+imgurl+'"/>';
                    htmlObj.topImage=content.picId;
                    $('#imgPreview').html(html);
                }
                if(!Utils.isNullorEmpty(attachmentId)){
                    $('#choice-attachment').html('已选择附件：'+attachmentName);
                }
                $('#title').val(title);
                $('#author').val(author);
                $('#newsType').val(newsType);
                $('#publicTime').val(publishDate);
                htmlObj.newsEditor.$txt.html(content);
                // $('.thumb-img').each(function(a, b){
                //     var id = $(this).attr('data-id');
                //     Utils.getImage( '/news/picture/content/' + id + '/download', function(url){
                //         $(b).attr('src', url);
                //     })
                // });

                if(isTop=='1'){
                    $('#isTop').attr('checked',false);
                }else{
                    $('#isTop').attr('checked',true);
                }
                $('#newsEditModal').modal('show');
            } else {//接口调用失败
                //alert('失败')
            }
        },
        error: function () {
            //alert('服务器异常');
        }
    });
};
//修改新闻
htmlObj.modifyNews= function (id) {
    htmlObj.newsId=id;
    $('#newsEditModal .modal-title').text('修改');
    htmlObj.getNewsInfo(id);
};
//发布、取消发布
htmlObj.publicNews= function (id, status) {
    var isPublish=status=='1'?'0':'1';
    var authorization=htmlObj.authorization;
    $.ajax({
        type: "PUT",
        url: htmlObj.rootUrl + '/news/'+id+'/'+isPublish+'/publish',
        async: true,
        beforeSend: function (xhr) {
            xhr.setRequestHeader("authorization", authorization);
        },
        success: function (data) {
            if (data.code == 'success') {
                htmlObj.getNewsList();
            } else {//接口调用失败
                //alert('失败')
            }
        },
        error: function () {
            //alert('服务器异常');
        }
    });
};
//置顶、取消置顶
htmlObj.addTop= function (id,isTop) {
    var top=isTop=='1'?'0':'1';
    var authorization=htmlObj.authorization;
    var data={
        id:id,
        isTop:top
    };
    $.ajax({
        type: "PUT",
        url: htmlObj.rootUrl + '/news',
        async: true,
        data:JSON.stringify(data),
        contentType:'application/json; charset=UTF-8',
        beforeSend: function (xhr) {
            xhr.setRequestHeader("authorization", authorization);
        },
        success: function (data) {
            if (data.code == 'success') {
                htmlObj.getNewsList();
            } else {//接口调用失败
                //alert('失败')
            }
        },
        error: function () {
            //alert('服务器异常');
        }
    });
};
//获取评论列表
htmlObj.argumentList= function (newsId) {
    var authorization=Utils.getValue("authorization");
    $.ajax({
        type: "GET",
        url: htmlObj.rootUrl + '/news/comment/'+newsId+'/12/list',
        async: true,
        beforeSend: function (xhr) {
            xhr.setRequestHeader("authorization", authorization);
        },
        success: function (data) {
            if (data.code == 'success') {
                var html='';
                var commentList=data.content;
                for(var i= 0,commentL=commentList.length;i<commentL;i++){
                    var newTime = commentList[i].addTime;
                    var pubTime = new Date(newTime).toDay();//发布时间
                    var status=commentList[i].status;//评论状态0显示1隐藏2删除
                    var id=commentList[i].id;//评论id
                    html+='<li class="comment-item clear-float"><div class="clear-float"><div class="user-img-content pull-left">'+
                        '<img class="user-img" src="'+ Utils.getAvatar(commentList[i].user)+'" alt="亿车科技">'+
                        '</div><div class="comment-info"><div class="user-name">'+commentList[i].addPersonName+'</div><div>'+
                        commentList[i].content+
                        '</div></div><div class="operation-bar clear-float">'+
                        '<span class="public-time">'+pubTime+'</span>';

                    if(status==1){//隐藏
                        html+='<span class="pull-right operation-btn" onclick="htmlObj.showOrHideArgument(\'' + id + '\',\'' + status + '\',\'' + newsId + '\')">显示</span>';
                    }else{
                        html+='<span class="pull-right operation-btn" onclick="htmlObj.showOrHideArgument(\'' + id + '\',\'' + status + '\',\'' + newsId + '\')">隐藏</span>';
                    }
                    //html+='<span class="pull-right operation-btn">删除</span>';
                    html+='</div></div></li>';
                }
                $('#comment-list').html(html);
                $('#commentManage').modal('show');
            } else {//接口调用失败
                //Utils.Alert(data.message);
            }
        },
        error: function () {
            //Utils.Alert('服务器异常');
        }
    });
};
//评论管理
htmlObj.argumentsManage= function (id) {
    htmlObj.argumentList(id);
};
htmlObj.showOrHideArgument= function (id, status,newsId) {//status——0显示1隐藏2删除
    var status=status=='1'?'0':'1';
    var authorization=htmlObj.authorization;
    $.ajax({
        type: "PUT",
        url: htmlObj.rootUrl + '/news/comment/'+id+'/'+status+'/hide',
        async: true,
        beforeSend: function (xhr) {
            xhr.setRequestHeader("authorization", authorization);
        },
        success: function (data) {
            if (data.code == 'success') {
                htmlObj.argumentList(newsId);
            } else {//接口调用失败
                //alert('失败')
            }
        },
        error: function () {
            //alert('服务器异常');
        }
    });
};
/**
 * 初始化wangEditor富文本编辑器
 */
htmlObj.wangEditorInit = function (whichEditorId) {
    var u = Utils.getValue("u"),
        v = Utils.getValue("v");
    var url = htmlObj.rootUrl + "/news/picture/content/upload";
    wangEditor.config.printLog = false;
    var theEditor = new wangEditor(whichEditorId);
    theEditor.config.uploadImgUrl = url;
    wangEditor.config.uploadImgFns.onload = function (resultText, xhr) {
        var result = Utils.parse(resultText);
        if (result.code == "success") {
            var content = result.content;
            var imgurl = htmlObj.rootUrl + "/news/picture/content/"+ content.picId +"/download";
            var editContent = this.$parent.find(".wangeditor-container").attr("id");
            //
            // Utils.getImage("/news/picture/content/"+content.picId+"/download", function(url){
            //     var imgHtml = '<a data-id="'+ content.picId +'" class="ecary-group" href="javascript:;"><img title="图片加载中..." class="thumb-img" data-id="'+ content.picId +'" src="'+ url +'"></a>';
            //     // var imgHtml = "<img class='thumb-img' data-id="+ content.picId +" src=\"" + url + "\" alt=\"图片\" >";
            //     if (editContent == whichEditorId) {
            //         theEditor.command(null, "insertHtml", imgHtml);
            //     }
            // });

            // var tempImg = $('body').append('<img id="tempImg" style="display: none" src="'+ imgurl +'" />');
            var imgHtml = '';
            var img = new Image();
            img.onload =function(){
                //680
                var width = this.width;
                var height = this.height;
                var scale = width/680;
                if(width < 680 && width >= 340){ //可以查看大图，但是不缩放尺寸
                    imgHtml = '<a data-id="'+ content.picId +'" class="ecary-group" href="'+ imgurl +'"><img alt="图片加载中..." class="thumb-img" data-id="'+ content.picId +'" src="'+ imgurl +'"></a>';
                }else if(width < 320){
                    imgHtml = '<a data-id="'+ content.picId +'"><img alt="图片加载中..." data-id="'+ content.picId +'" src="'+ imgurl +'"></a>';
                }else{
                    imgHtml = '<a data-id="'+ content.picId +'" class="ecary-group" href="'+ imgurl +'"><img alt="图片加载中..." class="thumb-img" data-id="'+ content.picId +'" src="'+ imgurl +'?width='+ parseInt(width/scale)+'&height='+ parseInt(height/scale)+'"></a>';
                }
                // if(width < 340){
                //     imgHtml = '<a data-id="'+ content.picId +'"><img alt="图片加载中..." data-id="'+ content.picId +'" src="'+ imgurl +'"></a>';
                // }else{
                //     imgHtml = '<a data-id="'+ content.picId +'" class="ecary-group" href="'+ imgurl +'"><img alt="图片加载中..." class="thumb-img" data-id="'+ content.picId +'" src="'+ imgurl +'?width='+ parseInt(width/scale)+'&height='+ parseInt(height/scale)+'"></a>';
                // }
                if (editContent == whichEditorId) {
                    theEditor.command(null, "insertHtml", imgHtml);
                }
            };
            img.src = imgurl;
        } else {
            if (window.console) {
                console.log("上传失败！");
            }
        }
    };
    theEditor.create();
    theEditor.$txt.html("");
    htmlObj.newsEditor = theEditor;
};
/**校验富文本内容*/
htmlObj.checkEditor= function () {
    var editorHtml=htmlObj.newsEditor.$txt.html();
    if(Utils.isNullorEmpty(editorHtml) || editorHtml == "<p><br></p>"){
        return true;
    }else{
        return false;
    }
};
/**表单校验*/
htmlObj.formValidate= function () {
    validatorOfDemand = $("#newsEditForm").validate({
        debug: true,
        onfocusout: function (element) {
            $(element).valid();
        },
        onsubmit: function (element) {
            $(element).valid();
        },
        submitHandler: function () {
            if(htmlObj.checkEditor()){//正文为空
                $('#newsContentEmpty').show();
                return;
            }
            htmlObj.saveNews();
        },
        rules: {
            title: {
                required: true
            },
            author: {
                required: false
            },
            newsType: {
                required: true
            },
            // publicTime: {
            //     required: true
            // },
            uploadImage: {
                required: false
            },
            uploadAttachment: {
                required: false
            },
            newsEditor:{
                required: true
            }
        },
        messages: {
            title: {
                required: "标题不能为空"
            },
            newsType: {
                required: "类型不能为空"
            },
            // publicTime: {
            //     required: "发布日期不能为空"
            // },
            newsEditor:{
                required: '正文不能为空'
            }
        }
    });
};
/**新闻新增、编辑保存*/
htmlObj.saveNews= function () {
    var newsTitle=$('#title').val();//新闻标题
    var newsAuthor=$('#author').val();//作者
    var newsType=$('#newsType').val();//新闻类型
    // var publishDate=$('#publicTime').val();//发布日期
    var content=htmlObj.newsEditor.$txt.html();//内容
    // publishDate=new Date(publishDate).getTime();
    var isTop;
    if($('#isTop').is(':checked')){
        isTop=0;
    }else{
        isTop=1;
    }
    var data={
        newsTitle:newsTitle,
        newsAuthor:newsAuthor,
        newsType:newsType,
        // publishDate:publishDate,
        content:content,
        isTop:isTop
    };
    if(htmlObj.newsId!=''){
        data.id=htmlObj.newsId;
    }
    if(htmlObj.topImage!=''){
        data.pictureId=htmlObj.topImage;
    }
    if(htmlObj.attachment.id!=''){
        data.attachmentName=htmlObj.attachment.name;
        data.attachmentId=htmlObj.attachment.id;
    }
    var authorization=htmlObj.authorization;
    var method=htmlObj.newsId!=''?'PUT':'POST';
    $.ajax({
        type: method,
        url: htmlObj.rootUrl + '/news',
        async: false,
        data:JSON.stringify(data),
        contentType:'application/json; charset=UTF-8',
        beforeSend: function (xhr) {
            xhr.setRequestHeader("authorization", authorization);
        },
        success: function (data) {
            if (data.code == 'success') {
                htmlObj.getNewsList();
                $('#newsEditModal').modal('hide');
                htmlObj.newsId='';
                htmlObj.editorFormRest();
            } else {//接口调用失败
                //alert('失败')
                $(".modal-footer .modal-msg").show().html(data.message);
            }
        },
        error: function () {
            //alert('服务器异常');
        }
    });
};
/**图片上传*/
htmlObj.uploadImage= function () {
    var authorization=htmlObj.authorization;
    var file = $('#uploadImage')[0].files[0];
    var size = file.size, start = 0;
    var data = new FormData();//利用FormData对象模拟表单
    var picName=file.name;
    data.append(picName, file.slice(start, size));
    $.ajax({
        type: "POST",
        url: htmlObj.rootUrl + '/news/picture/top/upload',
        async: true,
        data:data,
        contentType: false,    //不可缺
        processData: false,    //不可缺
        beforeSend: function (xhr) {
            xhr.setRequestHeader("authorization", authorization);
        },
        success: function (data) {
            if (data.code == 'success') {
                var content=data.content;
                var imgurl=htmlObj.rootUrl + "/news/picture/top/"+content.picId+"/download";
                var html='<img src="'+imgurl+'"/>';
                htmlObj.topImage=content.picId;
                $('#imgPreview').html(html);
            } else {//接口调用失败
                //alert('失败')
            }
        },
        error: function () {
            //alert('服务器异常');
        }
    });
};
//附件上传
htmlObj.uploadAttachment= function () {
    var authorization=htmlObj.authorization;
    var attachment=$('#uploadAttachment').val();
    var file = $('#uploadAttachment')[0].files[0];
    var size = file.size, start = 0;
    var data = new FormData();//利用FormData对象模拟表单
    var fileName=file.name;
    data.append(fileName, file.slice(start, size));
    //切割文件
    $.ajax({
        type: "POST",
        url: htmlObj.rootUrl + '/news/attachment/upload',
        async: true,
        data:data,
        contentType: false,    //不可缺
        processData: false,    //不可缺
        beforeSend: function (xhr) {
            xhr.setRequestHeader("authorization", authorization);
        },
        success: function (data) {
            if (data.code == 'success') {
                var Id=data.content.picId;
                htmlObj.attachment.name=fileName;
                htmlObj.attachment.id=Id;
                $('#choice-attachment').html('已选择附件：'+fileName);
            } else {//接口调用失败
                //alert('失败')
            }
        },
        error: function () {
            //alert('服务器异常');
        }
    });
}
//表单重置
htmlObj.editorFormRest= function () {
    var validator = $("#newsEditForm").validate();
    validator.resetForm();
    $("#newsEditForm")[0].reset();
    $(".modal-footer .modal-msg").empty();//清空消息显示
    htmlObj.newsId='';
    htmlObj.attachment.name='';
    htmlObj.attachment.id='';
    $('#imgPreview').empty();
    $('#choice-attachment').empty();
    $('#newsContentEmpty').hide();
    htmlObj.newsEditor.$txt.html("");
};
//页面初始化
htmlObj.init= function () {
    htmlObj.getNewsList();//获取列表
    htmlObj.wangEditorInit('newsEditor'); //初始化新建项目Modal的wangEditor富文本编辑器
    htmlObj.formValidate();//表单校验初始化
    //新闻列表按条件查询
    $('#search').on('click', function (event) {
        event.stopPropagation();
        htmlObj.getNewsList();//获取列表
    });
    //图片上传
    $('#uploadImage').on('change', function (event) {
        event.stopPropagation();
        htmlObj.uploadImage();
    });
//    附件上传
    $('#uploadAttachment').on('change', function (event) {
        event.stopPropagation();
        htmlObj.uploadAttachment();
    });
//    新闻新增
    $('#newsAdd').on('click', function (event) {
        event.stopPropagation();
        $('#newsEditModal .modal-title').text('新增');
        $('#newsEditModal').modal();
        htmlObj.newsId='';
    });
    //弹出框关闭，数据重置
    $('#newsEditModal').on('hide.bs.modal', function (event) {
        event.stopPropagation();
        htmlObj.editorFormRest();
    });
    //正文非空校验
    $('#newsEditor').on('keyup', function (event) {
        event.stopPropagation();
        if(htmlObj.checkEditor()){//正文为空
            $('#newsContentEmpty').show();
        }else{
            $('#newsContentEmpty').hide();
        }

    });
    //保存新闻
    $('#sureSave').on('click', function (event) {
        if(htmlObj.checkEditor()){//正文为空
            $('#newsContentEmpty').show();
        }else{
            $('#newsContentEmpty').hide();
        }
    });
    //初始化日期
    $("#publicTime").focus(function () {
        laydate({
            elem: "#publicTime",
            format: "YYYY-MM-DD",
            festival: true,
            istime: false,
            choose: function () {
                $("#publicTime").focusout();
            }
        });
    });
};
$(document).ready(function () {
   htmlObj.init();
});
