/**
 * Created by ranchengwei on 2017/4/28 0028.
 */
var headerObj={
    url: appHost + approot,
    authorization: Utils.getValue("authorization")
};

//登出
headerObj.loginOut= function () {
    var url = appHost + approot + "/authority/account/logout",
        authorization = Utils.getValue("authorization");
    Utils.clearValue();
    window.location.href = "index.html";
    $.ajax({
        type: "GET",
        url: url,
        beforeSend: function (xhr) {
            xhr.setRequestHeader("authorization", authorization);
        },
        success: function (data) {
            Utils.clearValue();
            window.location.href = "index.html";
        }
    });
};
headerObj.getEmailUrl = function () {
    $.ajax({
        type: "get",
        url: headerObj.url + '/authority/user/mail/login',
        beforeSend: function (xhr) {
            xhr.setRequestHeader("authorization", headerObj.authorization);
        },
        success: function (data) {
            if(data.code == 'success'){
                $('#emailMenu').attr('href', data.content);
            }
        }
    })
};
headerObj.getEmailNum = function () {
    $.ajax({
        type: "get",
        url: headerObj.url +  '/authority/user/mail/toread',
        beforeSend: function (xhr) {
            xhr.setRequestHeader("authorization", headerObj.authorization);
        },
        success: function (data) {
            if(data.code == 'success'){
                var content = data.content;
                // var content = 10;
                if(content > 0 && content < 100){
                    $('#emailNum').append('<div class="email-num">'+ content +'</div>');
                }else if(content >= 100){
                    $('#emailNum').append('<div class="email-num"><span style="position: relative; left: 1px;">99</span><em>+</em></div>');
                }
            }
        }
    })
};
jQuery.validator.addMethod("pwdbox", function (value, element) {
    var pwdinput = /[0-9a-zA-Z]{6,20}/;
    return this.optional(element) || (  pwdinput.test(value) );
}, "密码只能是有效的数字和字母！");

/**修改密码
 * 非空验证
 * */
headerObj.ModifyPwdFormvalidator = function () {
    //表单验证
    $("#modifyPasswordForm").validate({
        debug: true,
        onfocusout: function (element) {
            $(element).valid();
        },
        submitHandler: function () {
            headerObj.updateUserPwd();
        },
        rules: {
            accountname: {
                required: true
            }, newpwd: {
                required: true,
                minlength: 6,
                maxlength: 20,
                pwdbox: true
            }, savepwd: {
                required: true,
                equalTo: "#newpwd"
            }
        }, messages: {
            accountname: {
                required: "原密码不能为空！"
            }, newpwd: {
                required: "新密码不能为空！",
                minlength: "输入密码不能小于6数字！",
                maxlength: "输入密码不能大于20为数字！"
            }, savepwd: {
                required: "确认密码不能为空！",
                equalTo: "两次输入密码不相同！"
            }
        }
    });
};
/**
 * 密码修改
 * */
headerObj.updateUserPwd = function () {
    var userpwd = $.md5($("#accountname").val().trim());
    var newpwd = $.md5($("#newpwd").val().trim());
    var url = appHost + approot + "/authority/user/reset/password",
        authorization = Utils.getValue("authorization");
    var data={
        oldPass:userpwd,
        newPass:newpwd
    };
    $.ajax({
        type: "PUT",
        url: url,
        async: true,
        data:JSON.stringify(data),
        contentType:'application/json; charset=UTF-8',
        beforeSend: function (xhr) {
            xhr.setRequestHeader("authorization", authorization);
        },
        success: function (data) {
            if(data.code=='success'){
                layer.msg('密码修改成功,即将跳转登录页！',{time: 1500}, function(){
                    Utils.clearValue();
                    $('#modifyPassword').modal();
                    window.location.href = "index.html";
                });
            }else{
                $("#modifyPassword .modal-msg").text(data.message).show();
            }
        }
    });
};
//头部初始化
headerObj.init= function () {
    /**修改密码非空验证初始化*/
    headerObj.ModifyPwdFormvalidator();
    $('#emailMenu').on('click', function () {
        headerObj.getEmailUrl();
        headerObj.getEmailNum
    });
    headerObj.getEmailUrl();
    headerObj.getEmailNum();

//    头部设置
    $('.menu').on('mouseover', function () {
        $(this).find('.sub-menu').stop().slideDown(200);
    }).on('mouseout', function () {
        $(this).find('.sub-menu').stop().slideUp(200);
    });
//    登出
    $('#logOut').on('click', function (event) {
        event.stopPropagation();
        layer.confirm('确定要退出系统吗？', {
            title: "退出确认",
            btn: ['确定', '取消'] //按钮
        }, function (index) {
            headerObj.loginOut();
        }, function (index) {
            layer.close(index);
        });
    });
//    修改密码
    $('#changePassword').on('click', function (event) {
        event.stopPropagation();
        var validator = $("#modifyPasswordForm").validate();
        validator.resetForm();
        $("#modifyPasswordForm")[0].reset();
        $("#modifyPassword .modal-msg").hide();
        $('#modifyPassword').modal();
    });
};
//
$(document).ready(function () {
    headerObj.init();

});