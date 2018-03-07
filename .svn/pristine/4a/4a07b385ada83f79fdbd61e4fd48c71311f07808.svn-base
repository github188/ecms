/**
 * Created by Administrator on 2017/3/16.
 */

var loginObj = {};

/**
 * 登录
 */
loginObj.login = function () {
    var username = $("#username").val().trim();
    var password = $("#password").val().trim();
    if (Utils.isNullorEmpty(username)) {
        $('.login-msg').show();
        $(".error-text").text("请输入登录账号");
        return false;
    }
    if (Utils.isNullorEmpty(password)) {
        $('.login-msg').show();
        $(".error-text").text("请输入登录密码");
        return false;
    }
    var url = appHost + approot + "/authority/account/login";

    if(username !== 'admin'){
        username+= '@ecaray.com';
    }
    $.ajax({
        type: "GET",
        url: url,
        data: {
            username: username,
            password: $.md5(password)
        },
        success: function (data) {
            var code = data.code;
            if (code == "success") {
                $(".error-text").text("");
                loginObj.setParam(data);

                if($('#rememberPassword').is(':checked')){

                    if(username == 'admin'){
                        Utils.setValue("email", 'admin@ecaray.com');
                    }else{
                        Utils.setValue("email", username);
                    }
                }else{
                    Utils.delCookie('email');
                }
                window.location.href = "home.html";
            } else {
                var message = data.message;
                message = Utils.isNullorEmpty(message) ? "登录失败" : message;
                $('.login-msg').show();
                $(".error-text").text(message);
            }
        }
    });
};

/**
 * 登录成功记录用户信息
 */
loginObj.setParam = function (data) {
    var content = data.content,
        userId = content.userId,
        token = content.token,
        realname = content.realname,
        authorization = userId + "_" + token;
    Utils.setValue("authorization", authorization);
    Utils.setValue("u", userId);
    Utils.setValue("realname", realname);
};

loginObj.init = function () {

    var email = Utils.getValue('email');
    var authorization = Utils.getValue('authorization');
    if(email){
        $('#username').val(email.split('@')[0]);
        $('#rememberPassword').prop('checked', true);
    }
    if(authorization){
        window.location.href = "home.html";
    }

    $(".btn-login").on("click", function () {
        loginObj.login();
    });

    //响应回车登录
    $("#username,#password").on("focus", function () {
        $(this).keyup(function (e) {
            var code;
            if (!e) {
                var e = window.event;
            }
            if (e.keyCode) {
                code = e.keyCode;
            }
            else if (e.which) {
                code = e.which;
            }
            if (code == 13) {
                loginObj.login();
            }
        });
    }).on("", function () {

    });
};

$(function () {
    loginObj.init();
});