/**
 * 合同归档详情-编辑
 * @author: xiongxiaojun
 * @time:2017-06-21
 */

var contractFile = {

};

contractFile.validate = function(){

	$('#contractForm').validate({
        debug: true,
        rules: {
            contractNumber: "required",
            contractName: "required",
            contractDate: "required",
            contractAttr: "required",
            contractStyle: "required",
            contractArea: "required",
            contractDo: "required",
            salesName: "required",
            salesPhone: "required",
            belong: "required",
            remarks: "required",
            customName: "required",
            customAddress: "required",
            contacts: "required",
            contactsPhone: "required"
		},
        messages:{
            contractNumber: "合同编号不能为空！",
            contractName: "合同名称不能为空！",
            contractDate: "合同日期不能为空！",
            contractAttr: "合同属性不能为空！",
            contractStyle: "式份不能为空！",
            contractArea: "片区不能为空！",
            contractDo: "办事处不能为空！",
            salesName: "业务员不能为空！",
            salesPhone: "业务员电话不能为空！",
            belong: "合同所属商机不能为空！",
            remarks: "合同摘要不能为空！",
            customName: "客户名称不能为空！",
            customAddress: "合作方地址不能为空！",
            contacts: "联系人不能为空！",
            contactsPhone: "联系人电话不能为空！"
		}
	});

	$('#businessForm').validate({
		debug: true,
        rules: {
            signStyle: "required",
            contractAmount: "required",
            carAmount: "required",
            adAmount: "required",
            period: "required",
            startStopTime: "required",
            deadline: "required",
            payStyle: "required"
		},
        messages: {
            signStyle: "请选择签约模式！",
            contractAmount: "合同金额不能为空！",
            carAmount: "单车道金额不能为空！",
            adAmount: "广告金额不能为空！",
            period: "对账周期不能为空！",
            startStopTime: "合同起止时间不能为空！",
            deadline: "合同年限不能为空！",
            payStyle: "付款方式不能为空！"
		}
	});

	$('#projectForm').validate({
		debug: true,
		rules: {
            carRoads: "required",
            berth: "required",
            deviceList: "required",
            verifyTime: "required",
            verifyPerson: "required",
            verifyResult: "required"
		},
        messages: {
            carRoads: "车道数不能为空！",
            berth: "泊位数不能为空！",
            deviceList: "设备清单不能为空！",
            verifyTime: "验收时间不能为空！",
            verifyPerson: "验收人不能为空！",
            verifyResult: "验收结果不能为空！"
		}
	});
};

contractFile.editInfo = function () {

};
contractFile.init = function () {
    this.validate();
    $('#editContract').on('click', function () {
        contractFile.editInfo();
    });

    $("#contractDate").focus(function () {
        laydate({
            elem: '#contractDate',
            format: 'YYYY-MM-DD'
        });
    });

    $("#verifyTime").focus(function () {
        laydate({
            elem: '#verifyTime',
            format: 'YYYY-MM-DD'
        });
    });

    $('.btn-close-window').on('click', function(){
        window.close();
    });

};

$(function(){
    contractFile.init();
});