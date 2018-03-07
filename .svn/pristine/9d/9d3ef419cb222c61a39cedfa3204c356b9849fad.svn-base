var person = {
    authorization: Utils.getValue("authorization"),
    url: appHost + approot
};
/**
 * 查询用户信息
 */
person.queryInfo = function () {
    $.ajax({
        type: "get",
        url: person.url + '/authority/user/'+ Utils.getValue('u') +'/detail',
        beforeSend: function (xhr) {
            xhr.setRequestHeader("authorization", person.authorization);
        },
        success: function (data) {
            if (data.code == 'success') {
                var content = data.content;
                $('#personCode').text(content.usercode);
                $('#personName').text(content.realname);
                $('.person-name').text('亲爱的'+ content.realname);
                $('#personDep').text(content.depName.split('-').reverse().join('-'));
                $('#personPost').text(content.post);
                $('#personPhone').val(content.phone).attr('data-phone', content.phone);
                $('#personEmail').text(content.email);
                $('#personAddress').text(content.address);
                $('#personTel').text(content.tel || '-');
                $('#personDay').text(content.joindate || 0)
                $('#personAvatarImg').attr('src', Utils.getAvatar(content))
            } else {//接口调用失败
                layer.msg(data.message);
            }
        },
        error: function () {
            layer.msg('服务器异常');
        }
    });
};
/**
 * 修改信息
 */
person.editInfo = function (info) {
    var data = info;
    data.id = Utils.getValue('u');
    $.ajax({
        type: "put",
        url: person.url + '/authority/user',
        data: JSON.stringify(data),
        beforeSend: function (xhr) {
            xhr.setRequestHeader("authorization", person.authorization);
            xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8;");
        },
        success: function (data) {
            if (data.code == 'success') {
                layer.msg('修改成功！');
            } else {//接口调用失败
                layer.msg(data.message);
            }
        },
        error: function () {
            layer.msg('服务器异常');
        }
    });

};


/**
 * 修改头像
 */
person.uploadAvatar = function () {
    var file = $('#uploadAvatar')[0].files[0];
    var rFilter = /^(image\/bmp|image\/gif|image\/jpeg|image\/png|image\/tiff)$/i;
    if (!rFilter.test(file.type)) {
        layer.msg('只能选择格式为：bmp、gif、jpeg、png、tiff的图片')
    } else {
        var size = file.size, start = 0;
        var data = new FormData();//利用FormData对象模拟表单
        var picName = file.name;
        data.append(picName, file.slice(start, size));
        $.ajax({
            type: "POST",
            url: person.url + '/authority/user/picture/head/upload',
            async: true,
            data: data,
            contentType: false,    //不可缺
            processData: false,    //不可缺
            beforeSend: function (xhr) {
                xhr.setRequestHeader("authorization", person.authorization);
            },
            success: function (data) {
                if (data.code == 'success') {
                    var content = data.content;
                    var personUrl = person.url + "/authority/user/picture/head/" + content.picId + "/download";
                    $('#personAvatarImg').attr('src', personUrl);
                    person.editInfo({
                        headPic: content.picId
                    });
                    Utils.setValue("headPic", content.picId);
                } else {
                    layer.msg('服务器异常!');
                }
            },
            error: function () {
                layer.msg('服务器异常!');
            }
        });
    }
};

person.init = function () {
  $('.main-section').height($(document).height() - 103);
  this.queryInfo();
  $('.person-phone-edit').on('click', function () {

      var status = $(this).attr('data-status');
      if(status == 0){
          $(this).attr('data-status', 1).text('保存');
          $('.person-info-value').removeAttr('readonly').focus();

          $('.person-phone-cancel').show();
      }else{

          var reg = /^1[3|4|5|7|8][0-9]{9}$/;
          var phone = $('#personPhone').val();
          if(!reg.test(phone)){
            layer.msg('手机号码格式不正确!');
          }else{
              $(this).attr('data-status', 0).text('编辑');
              $('.person-phone-cancel').hide();
              $('.person-info-value').attr('readonly', true);
              person.editInfo({
                  phone: phone
              });
              $('#personPhone').attr('data-phone', phone);
          }
      }
  });
  $('.person-phone-cancel').on('click', function () {
      var _phone = $('#personPhone').attr('data-phone');
      $('#personPhone').val(_phone);
      $('.person-phone-edit').attr('data-status', 0).text('编辑');
      $(this).hide();
      $('.person-info-value').attr('readonly', true);
  });
};

$(function(){
    person.init();
});