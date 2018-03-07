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
import com.ecaray.ecms.entity.cwa.CwaCorrect;
import com.ecaray.ecms.entity.process.SysProDone;
import com.ecaray.ecms.services.processes.ProcessService;

@RestController()
@RequestMapping("cwa/correct")
public class CwaCorrectController {

	@Autowired
	ProcessService processService;
	
	/**
	 * 发起审批
	 */
	@Authorization
	@RequestMapping(value = "/start", method = RequestMethod.POST)
	public Result createLeaveProcess(@CurrentUser User user,@RequestBody CwaCorrect cwaLeave) throws Exception{
		cwaLeave.setUserId(user.getId());
		return processService.createProcess(cwaLeave);
	}
	
	/**
	 * 提交审批结果
	 */
	@Authorization
	@RequestMapping(value = "/submit", method = RequestMethod.POST)
	public Result submitLeaveProcess(@CurrentUser User user,@RequestBody SysProDone done) throws Exception{
		return processService.rotatingProcess(user, done);
	}
	
}
