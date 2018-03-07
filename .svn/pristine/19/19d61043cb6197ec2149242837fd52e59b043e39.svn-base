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
import com.ecaray.ecms.entity.process.SysProDone;
import com.ecaray.ecms.services.processes.ProcessService;

@RestController()
@RequestMapping("cwa/exception")
public class CwaExceptionController {
	
	
	@Autowired
	ProcessService processService;
	/**
	 * 提交审批结果
	 */
	@Authorization
	@RequestMapping(value = "/submit", method = RequestMethod.POST)
	public Result submitLeaveProcess(@CurrentUser User user,@RequestBody SysProDone done) throws Exception{
		return processService.rotatingProcess(user, done);
	}
	
}
