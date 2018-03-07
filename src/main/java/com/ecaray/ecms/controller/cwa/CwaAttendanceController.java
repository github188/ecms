package com.ecaray.ecms.controller.cwa;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.alibaba.fastjson.JSONObject;
import com.ecaray.ecms.commons.authorization.annotation.Authorization;
import com.ecaray.ecms.commons.authorization.annotation.CurrentUser;
import com.ecaray.ecms.commons.constant.PageResult;
import com.ecaray.ecms.commons.constant.Result;
import com.ecaray.ecms.commons.utils.ParaMap;
import com.ecaray.ecms.commons.utils.StrUtils;
import com.ecaray.ecms.entity.authority.User;
import com.ecaray.ecms.entity.cwa.CwaDeptAdmin;
import com.ecaray.ecms.entity.cwa.CwaPunchCard;
import com.ecaray.ecms.entity.cwa.CwaUserConfirm;
import com.ecaray.ecms.entity.cwa.vo.CwaAttendanceFilter;
import com.ecaray.ecms.entity.cwa.vo.CwaAttendanceVo;
import com.ecaray.ecms.entity.cwa.vo.CwaFilter;
import com.ecaray.ecms.entity.process.SysNodesUser;
import com.ecaray.ecms.entity.sys.DateHolidayVo;
import com.ecaray.ecms.services.authority.DeptService;
import com.ecaray.ecms.services.authority.UserService;
import com.ecaray.ecms.services.cwa.CwaAttendanceService;
import com.ecaray.ecms.services.cwa.CwaDateHolidayService;
import com.ecaray.ecms.services.cwa.CwaDeptAdminService;
import com.ecaray.ecms.services.cwa.CwaPunchCardService;
import com.ecaray.ecms.services.cwa.CwaReportService;
import com.ecaray.ecms.services.cwa.process.LeaveProcess;
import com.ecaray.ecms.services.processes.ProcessService;
import com.ecaray.ecms.services.processes.ProcessSettingService;
import com.ecaray.ecms.services.processes.base.SysNodeUserService;
import com.github.pagehelper.Page;

@RestController()
@RequestMapping("cwa/attendance")
public class CwaAttendanceController {

	@Autowired
	CwaAttendanceService cwaAttendanceService;
	@Autowired
	DeptService deptService;
	@Autowired
	LeaveProcess cwaLeaveService;
	@Autowired
	UserService userservice;
	@Autowired
	CwaDeptAdminService cwaDeptAdminService;
	@Autowired
	CwaPunchCardService cwaPunchCardService;
	@Autowired
	SysNodeUserService sysNodeUserService;
	@Autowired
	ProcessSettingService processSettingService;
	@Autowired
	CwaReportService cwaReportService;
	@Autowired
	CwaDateHolidayService cwaDateHolidayService;
	@Autowired
	ProcessService processService;

	/**
	 * 查询用户的考勤列表
	 */
	@Authorization
	@RequestMapping(value = "/list", method = RequestMethod.GET)
	public Result getUserAttendanceList(CwaAttendanceVo vo,@CurrentUser User user) throws Exception {
		if (StrUtils.isNotNull(vo.getUserId())) {
			user = userservice.getUserById(vo.getUserId());
		}
		return Result.success().addObject(cwaAttendanceService.listMonthAttendanceByUserId(user,vo.getMonth()));
	}
	
	/**
	 * 查询用户一段时间内发起的考勤单
	 */
	@Authorization
	@RequestMapping(value = "/list/bytime", method = RequestMethod.GET)
	public Result getUserCwaListByTime(CwaFilter filter,@CurrentUser User user) throws Exception {
		filter.setAuthorId(user.getId());
		return Result.success().addObject(cwaAttendanceService.listUserCwaByTime(filter));
	}

	/**
	 * 查询个人考勤记录月汇总信息
	 */
	@Authorization
	@RequestMapping(value = "/my/total", method = RequestMethod.GET)
	public Result getUserMonthTotal(@CurrentUser User user, CwaAttendanceVo vo)
			throws Exception {
		vo.setUserId(user.getId());
		return Result.success().addObject(cwaReportService.getUserMonthCwaTotal(vo));
	}
	

	/**
	 * 修改部门考勤管理员
	 */
	@Authorization
	@RequestMapping(value = "/dept/update", method = RequestMethod.PUT)
	public Result setDeptAttendanceAdmin(@CurrentUser User user, @RequestBody CwaDeptAdmin cwaDeptAdmin)
			throws Exception {
		cwaDeptAdminService.setDeptAttendanceAdmin(user, cwaDeptAdmin);
		return Result.success();
	}
	
	/**
	 * 查询可以配置考勤管理员的部门
	 */
	@Authorization
	@RequestMapping(value = "/dept/list", method = RequestMethod.GET)
	public Result getAttendanceDept(@CurrentUser User user)
			throws Exception {
		return Result.success().addObject(deptService.getAttendanceDept());
	}
	
	/**
	 * 查询考勤报表
	 * @throws Exception 
	 */
	@Authorization
	@RequestMapping(value = "/atten/list", method = RequestMethod.GET)
	public PageResult getUserAttendanceList(CwaAttendanceFilter filter,@CurrentUser User user) throws Exception{
		ParaMap map = cwaReportService.listCwaReportByFilter(filter,user);
    	Object o = map.get("object");
    	@SuppressWarnings("rawtypes")
		Page page = (Page)map.get("page");
    	Integer pageNum = (Integer)map.get("pageNum");
    	return PageResult.success().addObject(o).addPageInfo(page,pageNum);
	}
	
	/**
	 * 查询可以配置审批人的节点
	 */
	@Authorization
	@RequestMapping(value = "/nodes/list", method = RequestMethod.GET)
	public Result getSettingNodesList(@CurrentUser User user)
			throws Exception {
		return Result.success().addObject(cwaLeaveService.getSettingNodes());
	}
	
	/**
	 * 获取某人所能看到考勤数据的部门树
	 */
	@Authorization
	@RequestMapping(value = "/project/tree", method = RequestMethod.GET)
	public Result getProjectDepTree(@CurrentUser User user)
			throws Exception {
		return Result.success().addObject(cwaDeptAdminService.getProjectDepTree(user));
	}
	
	/**
	 * 获取某人所能看到考勤数据的部门树
	 */
	@Authorization
	@RequestMapping(value = "/admin/tree", method = RequestMethod.GET)
	public Result getAttAdminDepTree(@CurrentUser User user)
			throws Exception {
		return Result.success().addObject(cwaDeptAdminService.getAttendanceDepTree(user));
	}
	
	/**
	 * 获取考勤审批人列表
	 */
	@Authorization
	@RequestMapping(value = "/handler/list", method = RequestMethod.GET)
	public Result getNodeUserList(@CurrentUser User user)
			throws Exception {
		return Result.success().addObject(sysNodeUserService.getNodeUserList());
	}
	
	/**
	 * 修改考勤审批人列表
	 */
	@Authorization
	@RequestMapping(value = "/handler/update", method = RequestMethod.PUT)
	public Result updateCwaHandler(@RequestBody SysNodesUser nodeUser)
			throws Exception {
		String userId = nodeUser.getUserId();
		String nodeId = nodeUser.getNodeId();
		processSettingService.updateCwaHandler(userId, nodeId);
		return Result.success();
	}
	
	/**
	 * 获取当前部门考勤提交状态
	 */
	@Authorization
	@RequestMapping(value = "/submit/status", method = RequestMethod.GET)
	public Result getDepAttStatus(String userId,String month,String depId) throws Exception{
		return Result.success().addObject(cwaReportService.getAttendanceStatus(userId, month, depId));
	}
	
	/**
	 * 部门考勤管理员提交
	 */
	@Authorization
	@RequestMapping(value = "/submit/dep", method = RequestMethod.GET)
	public Result submitDepAttendance(String userId,String month,String depId) throws Exception{
		cwaReportService.depAdminSubmit(userId, month, depId);
		return Result.success();
	}
	/**
	 * 总考勤管理员提交
	 */
	@Authorization
	@RequestMapping(value = "/submit/all", method = RequestMethod.GET)
	public Result submitAllAttendance(String userId,String month,String depId) throws Exception{
		cwaReportService.AdminSubmit(userId, month, depId);
		return Result.success();
	}
	
	/**
	 * 总考勤管理员提交
	 */
	@Authorization
	@RequestMapping(value = "/submit/validation", method = RequestMethod.GET)
	public Result validateSubmit(String userId,String month,String depId) throws Exception{
		return cwaReportService.validateSubmit(userId, month, depId);
	}
	
	/**
	 * 导出
	 */
	@Authorization
	@RequestMapping(value = "/export", method = RequestMethod.GET)
	public byte[] exportUserSubmitAttendanceList(@CurrentUser User user,CwaAttendanceFilter filter, HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		return cwaReportService.exportUserSubmitAttendanceList(filter, request, response,user);
	}
	
	/**
	 * 导出
	 */
	@RequestMapping(value = "/export/month", method = RequestMethod.GET)
	public byte[] exportExcel( HttpServletRequest request,HttpServletResponse response) throws Exception {
		return cwaReportService.exportExcel(request, response);
	}
	
	/**
	 * 发送考勤邮件
	 */
	@Authorization
	@RequestMapping(value = "/sendemail", method = RequestMethod.GET)
	public Result sendEmailToAll(String month, @CurrentUser User user) throws Exception {
		cwaReportService.sendEmailToAll(month);
		return Result.success();
	}
	
	/**
	 * 查询打卡列表
	 */
	@Authorization
	@RequestMapping(value = "/pc/list", method = RequestMethod.GET)
	public PageResult getPunchCardList(CwaPunchCard pc,@CurrentUser User user) throws Exception {
		JSONObject o = cwaPunchCardService.getPunchCardList(pc,user);
		Object obj = o.get("list");
    	return PageResult.success().addObject(obj).addPageInfo(o.getInteger("pages"),o.getInteger("totals"),o.getInteger("pageIndex"));
	}
	
	/**
	 * 查询打卡列表
	 */
	@RequestMapping(value = "/useratt/update", method = RequestMethod.GET)
	public Result getPunchCardListAnthor(String name,String date) throws Exception {
		User user = userservice.getUserByrealname(name);
		cwaAttendanceService.valiAttendanceAndPunchCard(user.getId(), date);
		return Result.success();
	}
	
	/**
	 * 查询打卡列表
	 */
	@RequestMapping(value = "/userconfrim/update", method = RequestMethod.GET)
	public Result creatUserConfrime(String month) throws Exception {
		List<User> userList = userservice.selectAllUserList();
		for (User user : userList) {
			CwaUserConfirm cwaUserConfirm = new CwaUserConfirm();
			cwaUserConfirm.setMonth(month);
			cwaUserConfirm.setUserId(user.getId());
			processService.createProcess(cwaUserConfirm);
		}
		return Result.success();
	}
	
	/**
	 * 查询工作日列表
	 */
	@RequestMapping(value = "/date/holiday", method = RequestMethod.GET)
	public Result listHolidayByMonth(String month) throws Exception {
		return Result.success().addObject(cwaDateHolidayService.listHolidayByMonth(month));
	}
	
	/**
	 * 更新工作日期列表
	 */
	@RequestMapping(value = "/date/update", method = RequestMethod.POST)
	public Result updateMonthHoliday(@RequestBody DateHolidayVo vo) throws Exception {
		cwaDateHolidayService.updateMonthHoliday(vo);
		return Result.success();
	}
}
