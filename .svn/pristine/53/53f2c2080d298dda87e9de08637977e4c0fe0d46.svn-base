package com.ecaray.ecms.controller.cwa;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.ecaray.ecms.commons.authorization.annotation.Authorization;
import com.ecaray.ecms.commons.authorization.annotation.CurrentUser;
import com.ecaray.ecms.commons.constant.Result;
import com.ecaray.ecms.entity.authority.User;
import com.ecaray.ecms.entity.cwa.CwaLeave;
import com.ecaray.ecms.entity.cwa.CwaOutSide;
import com.ecaray.ecms.entity.cwa.CwaOutSideDel;
import com.ecaray.ecms.entity.process.SysProDone;
import com.ecaray.ecms.services.cwa.process.OutsideDelProcess;
import com.ecaray.ecms.services.processes.ProcessService;

@RestController
@RequestMapping("cwa/outside")
public class CwaOutSideController {
	
	@Autowired
	private ProcessService processService;
	@Autowired
	private OutsideDelProcess outsideDelProcess;
	
	/**
	 * 发起审批
	 */
	@Authorization
	@RequestMapping(value = "/start", method = RequestMethod.POST)
	public Result createLeaveProcess(@CurrentUser User user,@RequestBody CwaOutSideDel outside) throws Exception{
		outside.setUserId(user.getId());
		return processService.createProcess(outside);
	}
	
	/**
	 * 发起审批
	 */
	@Authorization
	@RequestMapping(value = "/submit", method = RequestMethod.POST)
	public Result submitLeaveProcess(@CurrentUser User user,@RequestBody SysProDone done) throws Exception{
		return processService.rotatingProcess(user, done);
	}
	
	/**
	 * 重新发起审批修改请假条内容
	 */
	@Authorization
	@RequestMapping(value = "/update", method = RequestMethod.PUT)
	public Result updateCwaLeave(@CurrentUser User user,@RequestBody CwaOutSideDel del){
		outsideDelProcess.updateCwaOutSideDel(del);
		return Result.success();
	}
}
