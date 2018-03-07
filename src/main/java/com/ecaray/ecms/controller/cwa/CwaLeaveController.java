package com.ecaray.ecms.controller.cwa;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.alibaba.fastjson.JSONObject;
import com.ecaray.ecms.commons.authorization.annotation.Authorization;
import com.ecaray.ecms.commons.authorization.annotation.CurrentUser;
import com.ecaray.ecms.commons.constant.Result;
import com.ecaray.ecms.entity.authority.User;
import com.ecaray.ecms.entity.cwa.CwaLeave;
import com.ecaray.ecms.entity.cwa.CwaUserHoliday;
import com.ecaray.ecms.entity.process.SysProDone;
import com.ecaray.ecms.services.common.ParameterService;
import com.ecaray.ecms.services.cwa.CwaUserHolidayService;
import com.ecaray.ecms.services.cwa.process.LeaveProcess;
import com.ecaray.ecms.services.processes.ProcessService;

@RestController()
@RequestMapping("cwa/leave")
public class CwaLeaveController {
	
	@Autowired
	LeaveProcess leaveProcess;
	@Autowired
	CwaUserHolidayService cwaUserHolidayService;
	@Autowired
	ProcessService processService;
	
	@Autowired
	ParameterService parameterService;
	
	/**
	 * 发起审批
	 */
	@Authorization
	@RequestMapping(value = "/start", method = RequestMethod.POST)
	public Result createLeaveProcess(@CurrentUser User user,@RequestBody CwaLeave cwaLeave) throws Exception{
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
	
	/**
	 * 查询2个日期之间时长
	 */
	@RequestMapping(value = "/timelong", method = RequestMethod.GET)
	public Result getLeaveTimeLong(long starttime,long endtime) throws Exception{
		return Result.success().addObject(leaveProcess.getLeaveTimeLong(starttime,endtime));
	}
	
	/**
	 * 查询某人剩余年假，调休假
	 */
	@Authorization
	@RequestMapping(value = "/user/holiday", method = RequestMethod.GET)
	public Result getUserHasHoliday(@CurrentUser User user,Integer type){
		CwaUserHoliday userHoliday = cwaUserHolidayService.getUserHasHoliday(user.getId());
		JSONObject o = new JSONObject();
		o.put("annual",userHoliday.getAnnual());
		o.put("takeoff",userHoliday.getLastTakeoff() + userHoliday.getAddTakeoff() - userHoliday.getSubTakeoff());
		return Result.success().addObject(o);
	}
	
	/**
	 * 重新发起审批修改请假条内容
	 * @throws Exception 
	 */
	@Authorization
	@RequestMapping(value = "/update", method = RequestMethod.PUT)
	public Result updateCwaLeave(@CurrentUser User user,@RequestBody CwaLeave leave) throws Exception{
		leaveProcess.updateCwaLeave(leave);
		return Result.success();
	}
	
	/**
	 * 重新发起审批修改请假条内容
	 */
	@Authorization
	@RequestMapping(value = "/param/list", method = RequestMethod.GET)
	public Result getCwaLeaveList(){
		return Result.success().addObject(parameterService.getLeaveTypeList());
	}
}
