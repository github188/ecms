package com.ecaray.ecms.services.cwa;

import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ecaray.ecms.commons.constant.PageResult;
import com.ecaray.ecms.commons.constant.ValiResult;
import com.ecaray.ecms.commons.utils.DateUtil;
import com.ecaray.ecms.commons.utils.LeaveCalender;
import com.ecaray.ecms.commons.utils.StrUtils;
import com.ecaray.ecms.dao.mapper.cwa.CwaCorrectMapper;
import com.ecaray.ecms.dao.mapper.cwa.CwaExceptionMapper;
import com.ecaray.ecms.dao.mapper.process.SysProcessMapper;
import com.ecaray.ecms.entity.authority.User;
import com.ecaray.ecms.entity.cwa.CwaAttReport;
import com.ecaray.ecms.entity.cwa.CwaAttendance;
import com.ecaray.ecms.entity.cwa.CwaCorrect;
import com.ecaray.ecms.entity.cwa.CwaException;
import com.ecaray.ecms.entity.cwa.CwaProcess;
import com.ecaray.ecms.entity.cwa.vo.CwaFilter;
import com.ecaray.ecms.entity.process.ProcessBase;
import com.ecaray.ecms.services.authority.DeptService;
import com.ecaray.ecms.services.common.ParameterService;
import com.ecaray.ecms.services.cwa.process.OutSideProcess;
import com.ecaray.ecms.services.processes.BaseProcessService;
import com.ecaray.ecms.services.processes.ProcessService;
import com.ecaray.ecms.services.processes.SpringFactory;
import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;

@Service
public class CwaProcessService {
   
	@Autowired
	CwaAttendanceService cwaAttendanceService;
	@Autowired
	ProcessService processService;
	@Autowired
	ParameterService parameterService;
	@Autowired
	CwaReportService cwaReportService;
	@Autowired
	SysProcessMapper sysProcessMapper;
	@Autowired
	CwaUserHolidayService cwaUserHolidayService;
	@Autowired
	CwaExceptionMapper cwaExceptionMapper;
	@Autowired
	CwaCorrectMapper cwaCorrectMapper;
	@Autowired
	OutSideProcess outSideProcess;
	@Autowired
	DeptService depService;
	@Autowired
	LeaveCalender leaveCalender;
	
	private static final Map<Integer,Integer[]> cwaMap;  
	static  {  
		cwaMap = new HashMap<Integer,Integer[]>(); 
		cwaMap.put(1,new Integer[]{1,2,3,10});  
		cwaMap.put(2,new Integer[]{1,2});  
		cwaMap.put(3,new Integer[]{1,3,10});  
		cwaMap.put(10,new Integer[]{1,3,10});  
    }  
	
	/**
	 * 考勤时间验证
	 */
	public ValiResult validateTimeForCwa(CwaProcess cwaProcess) throws Exception{
		if (!validateTimeForSub(cwaProcess).getCode())  {
			return validateTimeForSub(cwaProcess);
		}
		if (!validateTimeForAll(cwaProcess).getCode())  {
			return validateTimeForAll(cwaProcess);
		}
		if (!validationOtherProcess(cwaProcess).getCode())  {
			return validationOtherProcess(cwaProcess);
		}
		if (!validationLeaveType(cwaProcess).getCode())  {
			return validationLeaveType(cwaProcess);
		}
		if (!validationCwaTime(cwaProcess).getCode())  {
			return validationCwaTime(cwaProcess);
		}
		return ValiResult.pass();
	}
	
	/**
	 * 考勤时间验证
	 */
	public ValiResult validateTimeForException(CwaProcess cwaProcess) throws Exception{
		if (!validateTimeForSub(cwaProcess).getCode())  {
			return validateTimeForSub(cwaProcess);
		}
		if (!validateTimeForAll(cwaProcess).getCode())  {
			return validateTimeForAll(cwaProcess);
		}
		if (!validationOtherProcess(cwaProcess).getCode())  {
			return validationOtherProcess(cwaProcess);
		}
		if (!validationLeaveType(cwaProcess).getCode())  {
			return validationLeaveType(cwaProcess);
		}
		return ValiResult.pass();
	}
	
	/**
	 * 考勤时间验证
	 */
	public ValiResult validateTimeForSubmit(CwaProcess cwaProcess) throws Exception{
//		if (!validateTimeForAll(cwaProcess).getCode())  {
//			return validateTimeForAll(cwaProcess);
//		}
		if (!validateTimeForSub(cwaProcess).getCode())  {
			return validateTimeForSub(cwaProcess);
		}
		if (!validationLeaveType(cwaProcess).getCode())  {
			return validationLeaveType(cwaProcess);
		}
		if (!validationOtherCorrect(cwaProcess).getCode())  {
			return validationOtherCorrect(cwaProcess);
		}
		if (!validationOtherIng(cwaProcess).getCode())  {
			return validationOtherIng(cwaProcess);
		}
		if (!validationOtherExption(cwaProcess).getCode())  {
			return validationOtherExption(cwaProcess);
		}
		return ValiResult.pass();
	}
	
	public ValiResult validateTimeForSub(CwaProcess cwaProcess) throws Exception{
		long starttime = cwaProcess.getStartTime();
		long endtime = cwaProcess.getEndTime();
		String userId = cwaProcess.getUserId();
		while(starttime <= endtime) {
			String startDay = DateUtil.format(starttime);
			String month = DateUtil.format(starttime,"yyyy-MM");
			CwaAttReport cwaAttReport = cwaReportService.getUserReport(userId, month);
			if (cwaAttReport != null && cwaAttReport.getStatus() == 4) {
				return ValiResult.fail(startDay + "日考勤结果已通过管理员确认，无法修改，请联系人事");
			}
			starttime = DateUtil.getTime(startDay, "yyyy-MM-dd") + 24 * 3600 * 1000;
		}
		return ValiResult.pass();
	}
	
	/**
	 * 考勤时间验证
	 */
	public ValiResult validateTimeForAll(CwaProcess cwaProcess) throws Exception{
		long starttime = cwaProcess.getStartTime();
		long endtime = cwaProcess.getEndTime();
		int processType = cwaProcess.getProcessType();
		String userId = cwaProcess.getUserId();
		double timelength = cwaProcess.getTimeLength();
		if (timelength <= 0.0d) {
			return ValiResult.fail("时长必须大于0"); 
		}
		if (starttime - endtime >= 0) {
			return ValiResult.fail("起止时间有误"); 
		}
		List<Integer> validation = Arrays.asList(cwaMap.get(processType));
		boolean hasWorkDay = false;
		while(starttime <= endtime) {
			String startDay = DateUtil.format(starttime);
			List<CwaAttendance> daylist = cwaAttendanceService.listDayAllAttendance(userId, startDay);
			double time = 0d ;
			for (CwaAttendance dayAttendance : daylist) {
				Integer type = dayAttendance.getProcessType();
				if (validation.contains(type)) {
					time += dayAttendance.getTime();
				}
			}
			if (1.0 - time <= 0.0) {
				return ValiResult.fail(startDay + "已发起过其他考勤申请");
			}
			if (leaveCalender.isWorkday(startDay)){
				hasWorkDay = true;
				if (processType == 2) {
					return ValiResult.fail("工作日不能发起加班");
				}
			}
			starttime = DateUtil.getTime(startDay, "yyyy-MM-dd") + 24 * 3600 * 1000;
		}
		if (!hasWorkDay && processType == 1) {
			return ValiResult.fail("请假时间必须包含工作日");
		}
		return ValiResult.pass();
	}
	
	public ValiResult validationOtherProcess(CwaProcess cwaProcess){
		Integer processType = cwaProcess.getProcessType();
		List<Integer> validation = Arrays.asList(cwaMap.get(processType));
		Long starttime = cwaProcess.getStartTime();
		Long endtime = cwaProcess.getEndTime();
		String userId = cwaProcess.getUserId();
		List<CwaAttendance> list = cwaAttendanceService.listAttendanceByTime(userId,starttime,endtime);
		for (CwaAttendance cwaAttendance : list) {
			int type = cwaAttendance.getProcessType();
			if (validation.contains(type)) {
				return ValiResult.fail("您当前选择的时间段已有" + parameterService.getName("processtype", type +"") + "申请");
			}
			if (type == 1) {
				return ValiResult.fail("您当前选择的时间段包含已经通过考勤变更为出勤的日期");
			}
		}
		return ValiResult.pass();
	}
	
	public ValiResult validationOtherIng(CwaProcess cwaProcess){
		Long starttime = cwaProcess.getStartTime();
		Long endtime = cwaProcess.getEndTime();
		String userId = cwaProcess.getUserId();
		List<CwaAttendance> list = cwaAttendanceService.listAttendanceByTimeIng(userId,starttime,endtime);
		if (list.size() > 0) {
			return ValiResult.fail("您当前选择的时间段存在审批中的" + parameterService.getName("processtype", list.get(0).getProcessType() +"") + "申请");
		}
		return ValiResult.pass();
	}
	
	public ValiResult validationOtherCorrect(CwaProcess cwaProcess){
		Long starttime = cwaProcess.getStartTime();
		Long endtime = cwaProcess.getEndTime();
		String userId = cwaProcess.getUserId();
		List<CwaCorrect> list = cwaCorrectMapper.listCwaCorrByTime(userId,starttime,endtime);
		if (list.size() > 0) {
			return ValiResult.fail("您当前选择的时间段还有审批中的考勤变更单");
		}
		return ValiResult.pass();
	}
	public ValiResult validationOtherExption(CwaProcess cwaProcess){
		Long starttime = cwaProcess.getStartTime();
		Long endtime = cwaProcess.getEndTime();
		String userId = cwaProcess.getUserId();
		while (starttime <= endtime) {
			String startday = DateUtil.format(starttime);
			List<CwaException> list = cwaExceptionMapper.selectByUserDate(userId,startday);
			if (list.size() > 0) {
				return ValiResult.fail("您当前选择的时间段已有系统检测考勤异常处理中");
			}
			starttime += 24 * 3600 *1000;
		}
		return ValiResult.pass();
	}
	
	public ValiResult validationCwaTime(CwaProcess cwaProcess){
		long starttime = cwaProcess.getStartTime();
		long now = DateUtil.parse(DateUtil.format(DateUtil.nowTime()), "yyyy-MM-dd").getTime();
		Integer processType = cwaProcess.getProcessType();
		if (starttime - now < 0 && processType != 2) {
			return ValiResult.fail("不能发起之前的审批"); 
		}
		return ValiResult.pass();
	}
	
	public ValiResult validationLeaveType(CwaProcess leave){
		int type = leave.getType();
		String userId = leave.getUserId();
		double time = leave.getTimeLength();
		double ann = cwaUserHolidayService.getUserAnnual(userId);
		double takeoff = cwaUserHolidayService.getUserTakeOff(userId);
		if (type == 4) {
			if (ann <= 0 || ann - time < 0) {
				return ValiResult.fail("剩余年假不足");
			}
		}
		if (type == 5) {
			if (ann > 0) {
				return ValiResult.fail("请先使用年假！");
			}
			if (takeoff <= 0 || takeoff - time < 0) {
				return ValiResult.fail("剩余调休假不足");
			}
		}
		if (type == 7) {
			if (ann > 0) {
				return ValiResult.fail("请先使用年假！");
			}
			if (takeoff > 0) {
				return ValiResult.fail("请先使用调休假！");
			}
		}
		return ValiResult.pass();
	}
	
	/**
	 * 查询考勤审批单
	 */
	public PageResult getCwaProcessList(User user, CwaFilter filter) throws Exception {
		String userId = user.getId();
		String depId = filter.getDepId();
		List<String> depList = cwaReportService.listDepIdByUserRole(userId, depId);
		if (depList != null && depList.size() > 0) {
			filter.setDepIdList(depList);
		} 
		String authorName = filter.getAuthorName();
		if (StrUtils.isNotNull(authorName)) {
			filter.setAuthorName("%" + authorName + "%");
		}
		String month = filter.getMonth();
		if (StrUtils.isNotNull(month)) {
			filter.setMonth("%" + month + "%");
		}
		Page<?> page = PageHelper.startPage(filter.getPageNum(), filter.getPageSize());
		List<CwaFilter> list = sysProcessMapper.selectListByCwa(filter);
		for (CwaFilter f:list) {
			int type = f.getCwaType();
			f.setDepName(depService.getAllDept(new StringBuffer(""),Long.parseLong(f.getDepId())));
			int status = 0;
			if (type == 5) {
				f.setStarttime(0l);
				f.setEndtime(0l);
				status = 2;
			} else {
				String str1 = processService.getProcessPath(type);
				BaseProcessService servce = SpringFactory.getBean(str1);
				ProcessBase base = servce.getObjectById(f.getRelId());
				try {
					CwaProcess cwap = (CwaProcess) base;
					f.setStarttime(cwap.getStartTime());
					f.setEndtime(cwap.getEndTime());
				} catch (Exception e) {
				}
				status = base.getStatus();
			}
			if (status == 1) {
				f.setStatus("审批中"); 
			}
			if (status == 2) {
				f.setStatus("已通过"); 
			}
			if (status == 3) {
				f.setStatus("已驳回"); 
			}
		}
		
//		List<CwaFilter> pagelist = new ArrayList<>();
//		list = StrUtils.isNotNull(filter.getStatus())? statuslist :list;
//		int start = filter.getPageNum() * filter.getPageSize() - filter.getPageSize();
//		int end = filter.getPageNum() * filter.getPageSize();
//		for (int i = start; i < (end >= list.size() ? list.size() : end);i++){
//			pagelist.add(list.get(i));
//		}
//		int pages = list.size() / filter.getPageSize() + (list.size()%filter.getPageSize() == 0 ? 0 :1);
//		PageResult r = new PageResult().success().addObject(pagelist).addPageInfo(pages, list.size(), filter.getPageNum());
		return PageResult.success().addObject(list).addPageInfo(page, filter.getPageNum());
	}
}
