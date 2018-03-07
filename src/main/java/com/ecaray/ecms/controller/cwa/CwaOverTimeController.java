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
import com.ecaray.ecms.entity.cwa.CwaOverTime;
import com.ecaray.ecms.entity.process.SysProDone;
import com.ecaray.ecms.services.cwa.CwaDateHolidayService;
import com.ecaray.ecms.services.cwa.CwaUserHolidayService;
import com.ecaray.ecms.services.cwa.process.OverTimeProcess;
import com.ecaray.ecms.services.processes.ProcessService;

@RestController()
@RequestMapping("cwa/overtime")
public class CwaOverTimeController {
	
	@Autowired
	OverTimeProcess overtimeProcess;
	@Autowired
	CwaUserHolidayService cwaUserHolidayService;
	@Autowired
	private ProcessService processService;
	@Autowired
	private CwaDateHolidayService cwaDateHolidayService;
	
	/**
	 * 发起审批
	 */
	@Authorization
	@RequestMapping(value = "/start", method = RequestMethod.POST)
	public Result createLeaveProcess(@CurrentUser User user,@RequestBody CwaOverTime cwaOverTime) throws Exception{
		cwaOverTime.setUserId(user.getId());
		return processService.createProcess(cwaOverTime);
	}
	
	/**
	 * 提交审批结果
	 */
	@Authorization
	@RequestMapping(value = "/submit", method = RequestMethod.POST)
	public Result submitLeaveProcess(@CurrentUser User user,@RequestBody SysProDone done) throws Exception{
		return processService.rotatingProcess(user, done);
	}
	
	/**
	 * 查询2个日期之间时长
	 */
	@Authorization
	@RequestMapping(value = "/timelong", method = RequestMethod.GET)
	public Result getLeaveTimeLong(long starttime,long endtime) throws Exception{
		return Result.success().addObject(overtimeProcess.getLeaveTimeLong(starttime,endtime));
	}
	/**
	 * 重新发起审批修改请假条内容
	 * @throws Exception 
	 */
	@Authorization
	@RequestMapping(value = "/update", method = RequestMethod.PUT)
	public Result updateCwaLeave(@CurrentUser User user,@RequestBody CwaOverTime overtime) throws Exception{
		overtimeProcess.updataCwaOvertime(overtime);
		return Result.success();
	}
	
	@Authorization
	@RequestMapping(value = "/validation", method = RequestMethod.GET)
	public Result updateCwaLeave(Long starttime,Long endtime) throws Exception{
		return Result.success().addObject(cwaDateHolidayService.validateOverTime(starttime,endtime));
	}
}
