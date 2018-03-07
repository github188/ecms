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
import com.ecaray.ecms.entity.cwa.CwaTravel;
import com.ecaray.ecms.entity.process.SysProDone;
import com.ecaray.ecms.services.cwa.CwaUserHolidayService;
import com.ecaray.ecms.services.cwa.process.TravelProcess;
import com.ecaray.ecms.services.processes.ProcessService;

@RestController()
@RequestMapping("cwa/travel")
public class CwaTravelController {
	
	@Autowired
	TravelProcess travelProcess;
	@Autowired
	CwaUserHolidayService cwaUserHolidayService;
	
	@Autowired
	private ProcessService processService;
	/**
	 * 发起审批
	 */
	@Authorization
	@RequestMapping(value = "/start", method = RequestMethod.POST)
	public Result createLeaveProcess(@CurrentUser User user,@RequestBody CwaTravel cwaTravel) throws Exception{
		cwaTravel.setUserId(user.getId());
		return processService.createProcess(cwaTravel);
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
		return Result.success().addObject(travelProcess.getTravelTimeLong(starttime,endtime));
	}
	
	/**
	 * 重新发起审批修改请假条内容
	 * @throws Exception 
	 */
	@Authorization
	@RequestMapping(value = "/update", method = RequestMethod.PUT)
	public Result updateCwaLeave(@CurrentUser User user,@RequestBody CwaTravel travel) throws Exception{
		travelProcess.updataCwaTravel(travel);
		return Result.success();
	}
	/**
	 * 查询可以配置审批人的节点
	 */
	@Authorization
	@RequestMapping(value = "/nodes/list", method = RequestMethod.GET)
	public Result getSettingTravelNodesList(@CurrentUser User user)
			throws Exception {
		return Result.success().addObject(travelProcess.getSettingNodes());
	}
}
