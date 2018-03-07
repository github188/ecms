/**
 * OA后台
 * 魏传波
 * 2017-03-23
 */

var pageObj = {};
pageObj.setT;
pageObj.resourse = [];
pageObj.menuLevel = [];

/**
 * 没有登录时/登录的token失效时
 * @param code
 * @param message
 */
pageObj.showNotLoginErrorMsg = function (code, message) {
    if (code == "401") {
        layer.alert(message, function (index) {
            //跳转到登录页
            window.location.href = "index.html";
            layer.close(index);
        });
        if ($('body').css('display') == 'none') {
            $('body').show();
        }
    } else {
        layer.msg(message);
    }
};

/**
 * 信息加载
 */
pageObj.bindData = function () {

    $(".user-sysimg").prop("src", Utils.getAvatar());
    var realname = Utils.getValue("realname");
    if (realname.length > 8) {
        realname = realname.substring(0, 8) + "...";
    }
    $("#user-name").html(realname + '&nbsp;&nbsp;&nbsp;<i class="fa-angle-down"></i>').attr("title", Utils.getValue("realname"));
    $(".user-name2").empty().text(realname);
};

/**
 * 非空验证
 * */
pageObj.formvalidator = function () {
    //表单验证
    $(".formvalidate").validate({
        debug: true,
        onfocusout: function (element) {
            $(element).valid();
        },
        submitHandler: function () {
            pageObj.updateUserPwd();
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
pageObj.updateUserPwd = function () {
    var cmd = new Command('rcomp', 'User', 'updateUserPwd');
    cmd.id = Utils.getValue("u");//NOT NULL 业主id
    cmd.userpwd = $.md5($("#accountname").val().trim());
    cmd.newpwd = $.md5($("#newpwd").val().trim());
    cmd.success = function (data) {
        if (data.state == 1) {
            pageObj.logout();
            $('#editPassword').modal("hide");
        } else if (data.state > 1) {
            $("#editPassword .modal-msg").show().text(data.message);
        } else {
            $("#editPassword .modal-msg").show().text(data.message);
        }
    };
    cmd.execute();
};

/**
 * 系统退出
 */
pageObj.logout = function () {
    var url = appHost + approot + "/authority/account/logout",
        authorization = Utils.getValue("authorization");
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

/**
 * 动态获取左侧大菜单
 */
pageObj.getMenuSideBar = function (menuId) {
    pageObj.showLoading();
    $.ajax({
        url: appHost + approot + '/authority/resource/user/resources?resourceId=' + menuId,
        type: 'get',
        beforeSend: function (request) {
            request.setRequestHeader("authorization", Utils.getValue("authorization"));
        },
        success: function (data) {
            if (data.code == "success") {
                var content = data.content;
                var parentNode = '';
                for (var i = 0; i < content.length; i++) {
                    //显示一级菜单
                    if (content[i].type == 1 && content[i].status == 0) {
                        if (!Utils.isNullorEmpty(content[i].url)) {
                            parentNode += ' <li class="nodea" data-id="' + content[i].id + '">' +
                                '<a url=".' + content[i].url + '">' +
                                '<i class="linecons-cloud"></i>' +
                                '<span class="title">' + content[i].name + '</span>' +
                                '</a>';
                        } else {
                            parentNode += ' <li class="nodea has-sub" data-id="' + content[i].id + '">' +
                                '<a>' +
                                '<i class="linecons-cloud"></i>' +
                                '<span class="title">' + content[i].name + '</span>' +
                                '</a>';
                        }
                        //循环第二级菜单
                        var subNode = '';
                        for (var j = 0; j < content.length; j++) {
                            if (content[j].parentId == content[i].id) {
                                if (!Utils.isNullorEmpty(content[j].url)) {
                                    subNode += ' <li data-id="' + content[j].id + '" class="nodeb">' +
                                        '<a url=".' + content[j].url + '">' +
                                        '<span class="title">' + content[j].name + '</span>' +
                                        '</a></li>';
                                } else {
                                    subNode += ' <li data-id="' + content[j].id + '" class="nodeb has-sub">' +
                                        '<a>' +
                                        '<span class="title">' + content[j].name + '</span>' +
                                        '</a></li>';
                                }

                            }
                        }
                        if (subNode != '') {
                            parentNode += '<ul>' + subNode + '</ul></li>';
                        } else {
                            parentNode += '</li>';
                        }
                    }
                }
                $('#main-menu').html(parentNode);

                //默认显示第一个菜单，如果其下有子菜单，则展开其并选中其第一个子菜单
                var theFirstNode = $("#main-menu li").eq(0);
                theFirstNode.addClass("active");
                if (theFirstNode.find('ul').length < 1) {
                    var url = theFirstNode.find('a').attr("url");
                    Utils.setValue("urlload", url);
                    $(".new-main-container").load(url);
                } else {
                    theFirstNode.addClass("expanded").addClass("active");
                    var theSubul = theFirstNode.find("ul");
                    theSubul.slideDown(200);
                    var theSubUlfirstli = theSubul.find('li').eq(0);
                    theSubUlfirstli.addClass("active");
                    var url = theSubUlfirstli.find('a').attr("url");
                    Utils.setValue("urlload", url);
                    $(".new-main-container").load(url);
                }
                //显示菜单
                $('.sidebar-menu').removeClass('opacity0');
                $('.sidebar-menu-inner').removeClass('opacity0');

                //左侧大菜单点击事件
                $("#main-menu").on("click", "li a", function () {
                    var $this = $(this).parent("li");
                    var index = $this.index();
                    if ($this.find("ul").length < 1) {
                        $("#main-menu").find(".active").removeClass("active");
                        $this.addClass("active");
                        $this.parents(".nodea").addClass("active");
                        var url = $(this).attr("url");
                        Utils.setValue("urlload", url);
                        $(".new-main-container").load(url);
                        return false;
                    } else {
                        $this.addClass("active").siblings().removeClass("active");
                    }
                    var $li = $("#main-menu").children("li");
                    for (var i = 0; i < $li.length; i++) {
                        if (i != index) {
                            $li.eq(i).find("ul").slideUp(200);
                            $li.eq(i).removeClass("expanded");
                        }
                    }
                    if ($this.hasClass("expanded")) {
                        $this.find("ul").slideUp(200);
                        $this.removeClass("expanded");
                    } else {
                        $this.find("ul").slideDown(200);
                        $this.addClass("expanded");
                    }
                    return false;
                });

                //从项目管理页面跳转过来需求管理页面时，设置左侧菜单，并载入相应页面
                var proCodeFromPM = Utils.getValue('proCodeFromPM');
                if (!Utils.isNullorEmpty(proCodeFromPM)) {
                    //载入需求管理页面
                    $(".new-main-container").load('./project/demandManage.html');
                    $("#main-menu li").each(function () {
                        var that = $(this);
                        var theUrl = that.find('a').attr('url');
                        if (theUrl == './project/demandManage.html') {
                            that.addClass('active').siblings().removeClass('active');
                        }
                    });
                }
            } else {
                //显示错误信息
                pageObj.showNotLoginErrorMsg(data.code, data.message);
            }
            pageObj.closeLoading();
        }
    });
};

/**
 * 显示loading
 */
pageObj.showLoading = function () {
    $('.loader').show();
};

/**
 * 关闭loading
 */
pageObj.closeLoading = function () {
    $('.loader').hide();
};

/**
 * 初始化
 */
pageObj.init = function () {
    //计算顶部菜单的长度
    $('.sys-handle').width(document.documentElement.clientWidth - $('.sys-logo').width() + 5);

    pageObj.resourceID = Utils.getLocationPara('resourceid');
    pageObj.resourceNAME = Utils.getLocationPara('resourcename');

    if (!Utils.isNullorEmpty(pageObj.resourceID) && !Utils.isNullorEmpty(decodeURI(pageObj.resourceNAME))) {
        $('body').show(); //显示body
    }

    //显示模块名称
    if (!Utils.isNullorEmpty(pageObj.resourceNAME)) {
        document.title = "亿车科技EAP-" + decodeURI(pageObj.resourceNAME)
    }
    //获取左侧大菜单
    pageObj.getMenuSideBar(pageObj.resourceID);


    //初始化修改密码的表单验证
    pageObj.formvalidator();

    var u = Utils.getValue("u");
    var authorization = Utils.getValue("authorization");
    //判断用户是否登录
    if (u != "" && u != null && u != undefined) {
        pageObj.bindData();
    } else {
        //pageObj.logout();
    }



    //退出系统
    $("#user-logout").click(function () {
        pageObj.logout();
    });

    $(document).on("keyup", function (event) {//键盘Esc按下事件
        if (event.keyCode == 27) {
            //$("button[type=reset]").click();
            var validator = $(".formvalidate").validate();
            validator.resetForm();
            $(".modal-dialog .modal-msg").empty();//重置消息显示
        }
        if (event.keyCode == 122) {

        }
    });

    $(".page-container").on("mouseover", ".collapsed .has-sub", function () {
        if (!$(this).hasClass("hover")) {
            $("#main-menu li").removeClass("hover");
        }
        $(this).css({
            "width": "303px",
            "text-align": "left",
            "text-indent": "10px",
            "box-shadow": "1px 1px 5px #ccc"
        })
        $(this).find("ul").css({
            "display": "block"
        });
        $(this).find("a span").css({
            "display": "inline-block"
        })

    }).on("mouseout", ".collapsed .has-sub", function () {
        $("#main-menu li ul").css("display", "none");
        $(this).css({
            "width": "auto",
            "text-align": "center",
            "text-indent": "0px",
            "box-shadow": "none"
        });
        $(this).find("a span").css({
            "display": "none"
        })
    });

    //菜单缩进
    $(".side-new").on('click', function () {
        if ($(".sidebar-menu.toggle-others").hasClass('collapsed')) {
            $("footer.main-footer").css("padding-left", "245px");
            $(".sidebar-menu.toggle-others").removeClass('collapsed');
            $("#main-menu").find("li a span").css({
                "display": "inline-block"
            })
            $("#main-menu > li").css({"text-align": "left"});
        } else {
            $("footer.main-footer").css("padding-left", "70px");
            $(".sidebar-menu.toggle-others").addClass('collapsed');
            $("#main-menu>li").find("ul").removeAttr("style");
            $("#main-menu").find("li a span").css({
                "display": "none"
            })
            $("#main-menu > li").css({"text-align": "center"});
        }
        return false;
    });

    //弹出密码修改窗口
    $("#pwname").on("click", function () {
        $(".formvalidate")[0].reset();
        $("#editPassword .modal-msg").hide();
        $('#editPassword').modal();
    });

    //全屏
    $(".navbar").on("click", "a#all-screen", function (e) {
        if ($(".navbar").hasClass("Rall")) {
            $(this).children("img").attr("src", "skins/img/full-screen.png").attr("title", "全屏查看");
            $(".navbar").animate({"top": "0"}, 200).removeClass("Rall");
            $(".sidebar-menu").animate({"left": "0px"}, 200).removeClass("opacity0");
            if ($(".sidebar-menu").hasClass("collapsed")) {
                $(".main-container").animate({
                    "margin-left": "0",
                    "margin-top": "68px",
                    "margin-bottom": "12px"
                }, 200);
                $(".sidebar-menu").removeClass("l230");
                $(".sidebar-menu,.sidebar-menu-inner").animate({"left": "0px"}, 200).removeClass("opacity0");
                $("footer.main-footer").animate({"padding-left": "70px"}, 200);
            } else {
                var aurl = $("#navbar-nav").find("li.active").find("a").attr("url");
                if (Utils.isNullorEmpty(aurl)) {
                    $(".main-container,.sidebar-menu,.sidebar-menu-inner").animate({
                        "margin-left": "0px",
                        left: "0px"
                    }, 200).removeClass("opacity0");
                    $(".sidebar-menu").removeClass("l230");
                    $("footer.main-footer").animate({"padding-left": "245px"}, 200);
                }
                $(".main-container").animate({
                    "margin-top": "68px"
                }, 200);
            }
            //退出全屏
            if (typeof window.ActiveXObject != "undefined") {
                //兼容IE
                var wsh = new ActiveXObject("WScript.Shell");
                wsh.sendKeys("{F11}");
            } else {
                if (screenfull && !Utils.isNullorEmpty(screenfull)) {
                    screenfull.exit();
                }
            }
        } else {
            $(this).children("img").attr("src", "skins/img/exit-screen.png").attr("title", "退出全屏");
            $(".navbar").animate({"top": "-68px"}, 200).addClass("Rall");
            if ($(".sidebar-menu").hasClass("collapsed")) {
                $(".main-container").animate({
                    "margin-left": "-50px",
                    "margin-top": "0",
                    "margin-bottom": "12px"
                }, 20);
            } else {
                $(".main-container").animate({
                    "margin-left": "-230px",
                    "margin-top": "0",
                    "margin-bottom": "12px"
                }, 20);
            }
            $(".sidebar-menu,.sidebar-menu-inner").animate({"left": "-230px"}, 200).addClass("opacity0");
            $(".sidebar-menu").addClass("l230");
            $("footer.main-footer").animate({"padding-left": "20px"}, 200);
            //浏览器全屏
            if (typeof window.ActiveXObject != "undefined") {
                //兼容IE
                var wsh = new ActiveXObject("WScript.Shell");
                wsh.sendKeys("{F11}");
            } else {
                if (screenfull && !Utils.isNullorEmpty(screenfull)) {
                    screenfull.request();
                }
            }
        }
    });

    //获取鼠标位置
    $(document).on("mouseover", function (e) {
        if ($(".navbar").hasClass("Rall")) {
            if (parseInt(e.clientY) < 50) {
                clearTimeout(pageObj.setT);
                pageObj.setT = setTimeout(function () {
                    $(".main-container").animate({
                        "margin-top": "0"
                    }, 200);
                    $(".navbar").animate({"top": "0"}, 200);
                }, 100)
            } else if (parseInt(e.clientY) > 50) {
                clearTimeout(pageObj.setT);
                pageObj.setT = setTimeout(function () {
                    $(".main-container").animate({
                        "margin-top": "0"
                    }, 200);
                    $(".navbar").animate({"top": "-68px"}, 200);
                }, 100);
            }
        }
    });

    //确认修改密码
    $("#btnPwdSave").on("click", function () {
        pageObj.formvalidator();
    });

    //重置表单
    $(".close,button[type=reset]").on('click', function () {//表单重置
        var validator = $(".formvalidate").validate();
        validator.resetForm();
    });

    jQuery.validator.addMethod("pwdbox", function (value, element) {
        var pwdinput = /[0-9a-zA-Z]{6,20}/;
        return this.optional(element) || (  pwdinput.test(value) );
    }, "密码只能是有效的数字和字母！");
};

window.onresize = function () {
    var w = $("#navbar-nav").width();
    var levelNum = $("#navbar-nav").children("li").length;
    $("#navbar-nav").children("li").css({width: parseFloat((w - 89) / levelNum) + "px"});

    //计算顶部菜单的长度
    $('.sys-handle').width(document.documentElement.clientWidth - $('.sys-logo').width() + 5);
}

/**
 * 回车查询
 */

$('.main-container').on('keypress', '.input-key', function (e) {
    if(e.keyCode == 13){
        $(this).parents('.panel').find('.btn-search').trigger('click');
    }
}).on('keypress', '.form-control', function (e) {
    if(e.keyCode == 13){
        $(this).parents('.modal ').find('.btn-search').click();
    }
});
/**
 * 页面加载
 */
$(function () {
    pageObj.init();
});

/**
 * 处理键盘事件 禁止后退键（Backspace）密码或单行、多行文本框除外
 * */
pageObj.banBackSpace = function (e) {
    var ev = e || window.event;//获取event对象
    var obj = ev.target || ev.srcElement;//获取事件源
    var t = obj.type || obj.getAttribute('type');//获取事件源类型
    //获取作为判断条件的事件类型
    var vReadOnly = obj.getAttribute('readonly');
    var vEnabled = obj.getAttribute('enabled');
    var editable = obj.getAttribute('contenteditable');
    //处理null值情况
    vReadOnly = (vReadOnly == null) ? false : vReadOnly;
    vEnabled = (vEnabled == null) ? true : vEnabled;
    editable = Utils.isNullorEmpty(editable) ? false : editable;
    //当敲Backspace键时，事件源类型为密码或单行、多行文本的，
    //并且readonly属性为true或enabled属性为false的，则退格键失效
    var flag1 = (ev.keyCode == 8 && (t == "password" || t == "text" || t == "textarea") &&
    (vReadOnly == true || vEnabled != true || editable == true)) ? true : false;

    //当敲Backspace键时，事件源类型非密码或单行、多行文本的，则退格键失效
    var flag2 = (ev.keyCode == 8 && t != "password" && t != "text" && t != "textarea") ? true : false;

    //当敲Backspace键时，事件源类型是DIV并且editable为true、退格键失效
    var flag3 = (ev.keyCode == 8 && t == null && editable) ? true : false;

    //判断
    if (flag3) {
        return true;
    }
    if (flag2) {
        return false;
    }
    if (flag1) {
        return false;
    }
};