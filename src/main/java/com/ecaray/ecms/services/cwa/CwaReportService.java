package com.ecaray.ecms.services.cwa;

import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.alibaba.fastjson.JSONObject;
import com.ecaray.ecms.commons.authorization.annotation.CurrentUser;
import com.ecaray.ecms.commons.constant.Constants;
import com.ecaray.ecms.commons.constant.Result;
import com.ecaray.ecms.commons.constant.ValiResult;
import com.ecaray.ecms.commons.exception.ProcessSubmitException;
import com.ecaray.ecms.commons.utils.DataUtil;
import com.ecaray.ecms.commons.utils.DateUtil;
import com.ecaray.ecms.commons.utils.LeaveCalender;
import com.ecaray.ecms.commons.utils.ParaMap;
import com.ecaray.ecms.commons.utils.StrUtils;
import com.ecaray.ecms.dao.mapper.cwa.CwaAttendanceReportMapper;
import com.ecaray.ecms.dao.mapper.process.SysProcessMapper;
import com.ecaray.ecms.entity.authority.Role;
import com.ecaray.ecms.entity.authority.User;
import com.ecaray.ecms.entity.cwa.CwaAttReport;
import com.ecaray.ecms.entity.cwa.CwaAttendance;
import com.ecaray.ecms.entity.cwa.CwaDeptAdmin;
import com.ecaray.ecms.entity.cwa.CwaHolidayRecordVo;
import com.ecaray.ecms.entity.cwa.vo.CwaAttendanceFilter;
import com.ecaray.ecms.entity.cwa.vo.CwaAttendanceVo;
import com.ecaray.ecms.entity.cwa.vo.CwaExport;
import com.ecaray.ecms.entity.cwa.vo.CwaMonthRecord;
import com.ecaray.ecms.entity.pmo.Vo.MailVo;
import com.ecaray.ecms.entity.process.SysProcess;
import com.ecaray.ecms.entity.process.Vo.DoneResultVo;
import com.ecaray.ecms.services.authority.DeptService;
import com.ecaray.ecms.services.authority.RoleService;
import com.ecaray.ecms.services.authority.UserService;
import com.ecaray.ecms.services.common.ExcelExportService;
import com.ecaray.ecms.services.cwa.process.CwaExceptionProcess;
import com.ecaray.ecms.services.email.MailSendThread;
import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;

/**
 * 
 * 考勤报表相关
 */
@Service
public class CwaReportService implements Constants {

	@Autowired
	private UserService userService;

	@Autowired
	private DeptService depService;

	@Autowired
	private RoleService roleService;

	@Autowired
	private CwaAttendanceReportMapper cwaReportMapper;

	@Autowired
	private CwaAttendanceService cwaAttendanceService;

	@Autowired
	private ExcelExportService excelExportService;

	@Autowired
	private CwaDeptAdminService cwaDeptAdminService;
	
	@Autowired
	private CwaUserHolidayService cwaUserHolidayService;
	@Autowired
	private CwaExceptionProcess cwaExceptionProcess;
	@Autowired
	private LeaveCalender leaveCalender;
	@Autowired
	private SysProcessMapper sysProcessMapper;
	
	
	private static ParaMap eamilMap = new ParaMap();
	{
		eamilMap.put("-3", "-");
		eamilMap.put("-2", "Z");
		eamilMap.put("-1", "K");
		eamilMap.put("1", "√");
		eamilMap.put("2", "√");
		eamilMap.put("3", "C");
		eamilMap.put("4", "N");
		eamilMap.put("5", "T");
		eamilMap.put("6", "B");
		eamilMap.put("7", "S");
		eamilMap.put("8", "Y");
		eamilMap.put("9", "√");
		eamilMap.put("10", "W");
	}

	/**
	 * 新增
	 */
	public void saveCwaAttReport(CwaAttReport sub) {
		String id = sub.getId();
		if (StrUtils.isNull(id)) {
			sub.setId(DataUtil.uuidData());
		}
		cwaReportMapper.insertSelective(sub);
	}

	/**
	 * 更新
	 */
	public void update(CwaAttReport cwaatt) {
		String id = cwaatt.getId();
		if (StrUtils.isNull(id)) {
			return;
		}
		cwaReportMapper.updateByPrimaryKeySelective(cwaatt);
	}
	
	/**
	 * 人资平台个人查看汇总数据
	 */
    public JSONObject getUserMonthCwaTotal(CwaAttendanceVo vo) throws Exception{
    	String userId = vo.getUserId();
    	String month = vo.getMonth();
    	User user = userService.getUserById(userId);
    	CwaAttReport report = getUserReport(userId,month);
    	if(report == null) {
    		report = new CwaAttReport();
    	}
    	CwaHolidayRecordVo holiday = cwaUserHolidayService.getUserHolidayRecord(userId, month);
		List<DoneResultVo> list = cwaExceptionProcess.countUserHandlerRecord(userId,month);
		double correct = 0.0d;
		double cwaexception = 0.0d;
		for (DoneResultVo result :list) {
			if (result.getResult() == 8) {
				correct += result.getCount();
			} else if (result.getResult() != 0) {
				cwaexception += result.getCount();
			}
		}
    	JSONObject o = new JSONObject();
    	o.put("workday", leaveCalender.getHasWorkday(month, user.getCreateTime()));
    	o.put("normal", report.getNormal() == null ? 0 : report.getNormal());
    	o.put("paidDay", report.getPaidDay() == null ? 0 : report.getPaidDay());
    	o.put("lastannual", holiday.getAnnualLastBlance());
    	o.put("annualadd", holiday.getAnnualAdd());
    	o.put("annualsub", holiday.getAnnualSub());
    	o.put("annualblance", holiday.getAnnualBlance());
    	o.put("lasttakeoff", holiday.getTakeoffLastBlance());
    	o.put("takeoffadd", holiday.getTakeoffAdd());
    	o.put("takeoffsub", holiday.getTakeoffSub());
    	o.put("takeoffblance", holiday.getTakeoffBlance());
		o.put("leave2", report.getLeave2());
		o.put("leave3", report.getLeave3());
		o.put("leave4", report.getLeave4());
		o.put("absenteeism", report.getAbsenteeism());
		o.put("early", report.getEarly());
		o.put("correct", correct);
		o.put("cwaexception", cwaexception);
		return o;
    }
	
	
	/**
	 * 查询个人的考勤报表 - 重载
	 */
	public CwaAttReport getUserReport(String userId, String month) {
		CwaAttReport sub = new CwaAttReport();
		sub.setDate(month);
		sub.setUserId(userId);
		return getUserReport(sub);
	}

	/**
	 * 查询个人的考勤报表
	 */
	public CwaAttReport getUserReport(CwaAttReport sub) {
		return cwaReportMapper.selectByUserAndDate(sub);
	}

	/**
	 * 查询月报表(所有人)
	 */
	public List<CwaAttReport> listReportByMonth(String month) {
		return cwaReportMapper.selectReportListByMonth(month);
	}

	/**
	 * 按权限查询月报表
	 */
	public List<CwaAttReport> listReportByRole(CwaAttendanceFilter filter) {
		return cwaReportMapper.selectReportListByRole(filter);
	}

	/**
	 * 
	 * 查询考勤报表
	 * 
	 * 1、部门领导，2、考勤管理员，3、CEO
	 * @throws Exception 
	 * 
	 */
	public ParaMap listCwaReportByFilter(CwaAttendanceFilter filter, User user) throws Exception {
		String userId = user.getId();
		String depId = filter.getDepId();
		List<String> childList = listDepIdByUserRole(userId, depId);
		if (childList == null || childList.isEmpty()) {
			Page<?> page = PageHelper.startPage(filter.getPageNum(), filter.getPageSize());
			return ParaMap.getPageHelperMap(null, page);
		}
		filter.setDepIdList(childList);
		String name = filter.getName();
		if (StrUtils.isNotNull(name)) {
			filter.setName("%" + name + "%");
		}
		if (filter.getIsPage() == 1) {
			Page<?> page = PageHelper.startPage(filter.getPageNum(), filter.getPageSize());
			List<CwaAttReport> result = listReportByRole(filter);
			List<JSONObject> list = new ArrayList<>();
			for (CwaAttReport report : result) {
				JSONObject o = new JSONObject();
				User u = userService.getUserById(report.getUserId()); 
				List<CwaMonthRecord> attlist = cwaAttendanceService.listMonthAttendanceByUserId(u, filter.getMonth());
				CwaHolidayRecordVo vo = cwaUserHolidayService.getUserHolidayRecord(report.getUserId(), filter.getMonth());
				List<DoneResultVo> resultlist = cwaExceptionProcess.countUserHandlerRecord(report.getUserId(),filter.getMonth());
				double correct = 0.0d;
				double cwaexception = 0.0d;
				for (DoneResultVo resultVo :resultlist) {
					if (resultVo.getResult() == 8) {
						correct += resultVo.getCount();
					} else if (resultVo.getResult() != 0) {
						cwaexception += resultVo.getCount();
					}
				}
				report.setCorrect(correct);
				report.setCwaexception(cwaexception);
				report.setWorkDay(leaveCalender.getHasWorkday(filter.getMonth(), user.getCreateTime()));
				o.put("report", report);
				o.put("attendance", attlist);
				o.put("holiday", vo);
				list.add(o);
			}
			return ParaMap.getPageHelperMap(list, page);
		}
		ParaMap map = new ParaMap();
		List<CwaAttReport> result = listReportByRole(filter);
		List<JSONObject> list = new ArrayList<>();
		for (CwaAttReport report : result) {
			JSONObject o = new JSONObject();
			User u = userService.getUserById(report.getUserId()); 
			List<CwaMonthRecord> attlist = cwaAttendanceService.listMonthAttendanceByUserId(u, filter.getMonth());
			CwaHolidayRecordVo vo = cwaUserHolidayService.getUserHolidayRecord(report.getUserId(), filter.getMonth());
			List<DoneResultVo> resultlist = cwaExceptionProcess.countUserHandlerRecord(report.getUserId(),filter.getMonth());
			double correct = 0.0d;
			double cwaexception = 0.0d;
			for (DoneResultVo resultVo :resultlist) {
				if (resultVo.getResult() == 8) {
					correct += resultVo.getCount();
				} else if (resultVo.getResult() != 0) {
					cwaexception += resultVo.getCount();
				}
			}
			report.setCorrect(correct);
			report.setCwaexception(cwaexception);
			report.setWorkDay(leaveCalender.getHasWorkday(filter.getMonth(), user.getCreateTime()));
			o.put("report", report);
			o.put("attendance", attlist);
			o.put("holiday", vo);
			list.add(o);
		}
		map.put("object", list);
		return map;
	}

	/**
	 * 导出考勤报表
	 */
	@SuppressWarnings("unchecked")
	public byte[] exportUserSubmitAttendanceList(CwaAttendanceFilter filter, HttpServletRequest request,
			HttpServletResponse response, @CurrentUser User user) throws Exception {
		filter.setIsPage(0);
		ParaMap map = listCwaReportByFilter(filter, user);
		List<ParaMap> maplist1 = new ArrayList<ParaMap>();
		List<ParaMap> maplist2 = new ArrayList<ParaMap>();
		List<JSONObject> list = (List<JSONObject>) map.get("object");
		List<CwaMonthRecord> att = (List<CwaMonthRecord>)list.get(0).get("attendance");
		for (JSONObject o : list) {
			CwaAttReport report = (CwaAttReport) o.get("report");
			int status = report.getStatus();
			if (status == 1) {
				report.setStatusName("待确认");
			}
			if (status == 2) {
				report.setStatusName("部门未确认");
			}
			if (status == 3) {
				report.setStatusName("部门确认");
			}
			if (status == 4) {
				report.setStatusName("已核实");
			}
			ParaMap objmap1 = ParaMap.ObjToParaMap(report);
			CwaHolidayRecordVo holiday = (CwaHolidayRecordVo) o.get("holiday");
			ParaMap objmap2 = ParaMap.ObjToParaMap(holiday);
			objmap1.putAll(objmap2);
			maplist1.add(objmap1);
			List<CwaMonthRecord> attlist = (List<CwaMonthRecord>) o.get("attendance");
			ParaMap objmap3 = new ParaMap();
			for (int i = 0;i < 31 ;i++){
				if (i < attlist.size()) {
					objmap3.put("data" + (i * 3 + 1),attlist.get(i).getFristTime());
					objmap3.put("data" + (i * 3 + 2),attlist.get(i).getLastTime());
					List<CwaAttendance> daylist = attlist.get(i).getDayList();
					String s = "";
					if (daylist == null) {
						s = "√";
					} else {
						for (CwaAttendance a : daylist) {
							int type = a.getType();
							String time = "";
							if (a.getType() > 10){
								type = 8;
							}
							if (a.getTime() != null) {
								time = a.getTime() + "";
							}
							s += (eamilMap.getString(type + "") + time + "/");
						}
						s = s.substring(0,s.length() - 1);
					}
					objmap3.put("data" + (i * 3 + 3),s);
				} else {
					objmap3.put("data" + (i + 1),"");
					objmap3.put("data" + (i * 3 + 1), "");
					objmap3.put("data" + (i * 3 + 2), "");
					objmap3.put("data" + (i * 3 + 3), "");
				}
			}
			objmap3.putAll(objmap1);
			maplist2.add(objmap3);
		}
		ParaMap objmap4 = new ParaMap();
		for (int i = 0;i < 31 ;i++){
			if (i < att.size()) {
				objmap4.put("day" + (i + 1), att.get(i).getDate());
				objmap4.put("str" + (i * 3 + 1), "上班时间");
				objmap4.put("str" + (i * 3 + 2), "下班时间");
				objmap4.put("str" + (i * 3 + 3), "考勤状态");
			} else {
				objmap4.put("day" + (i + 1),"");
				objmap4.put("str" + (i * 3 + 1), "");
				objmap4.put("str" + (i * 3 + 2), "");
				objmap4.put("str" + (i * 3 + 3), "");
			}
		}
		ParaMap paramap = new ParaMap();
		paramap.put("total", maplist1);
		paramap.put("record", maplist2);
		paramap.put("head", objmap4);
		paramap.put("month", filter.getMonth());
		return excelExportService.exportUserSubmitAttendanceList(paramap, request, response);
	}

	/**
	 * 更新某人考勤记录
	 */
	public void updateCwaReportForUserId(String userId, String month) throws Exception {
		String today = DateUtil.format(DateUtil.now(), "yyyy-MM-dd");
		long todaytime = DateUtil.parse(today, "yyyy-MM-dd").getTime();
		CwaAttReport cwaAttReport = getUserReport(userId, month);
		if (cwaAttReport != null && cwaAttReport.getStatus() == 4) {
			return;
		}
		List<CwaAttendance> list = cwaAttendanceService.listAttendanceByUserAndMonth(userId, month);
		List<CwaAttendance> cwaList = new ArrayList<>();
		for (CwaAttendance att : list) {
			long cwatime = DateUtil.parse(att.getDate(), "yyyy-MM-dd").getTime();
			if (cwatime <= todaytime) {
				cwaList.add(att);
			}
		}
		updateCwaReportByAttList(cwaList,userId,month);
	}

	/**
	 * 将考勤记录列表更新至报表记录
	 */
	@SuppressWarnings("unchecked")
	private void updateCwaReportByAttList(List<CwaAttendance> list,String userId,String month) throws Exception {
		long joindate = userService.getUserById(userId).getCreateTime();
		int workday = leaveCalender.getHasWorkday(month, joindate);
		if (workday > 0) {
			ParaMap map = new ParaMap();
			for (CwaAttendance attendance : list) {
				if (map.get(attendance.getDate()) == null) {
					List<CwaAttendance> daylist = new ArrayList<>();
					daylist.add(attendance);
					map.put(attendance.getDate(), daylist);
				} else {
					List<CwaAttendance> daylist = (List<CwaAttendance>)map.get(attendance.getDate());
					daylist.add(attendance);
				}
			}
			double normal = 0.0d;
			double payday = 0.0d;
			double overtime = 0.0d;
			double overtimeHoli = 0.0d;
			double travel = 0.0d;
			double outside = 0.0d;
			double absenteeism = 0.0d;
			double early = 0.0d;
			double leave_0 = 0.0d;
			double leave_1 = 0.0d;
			double leave_2 = 0.0d;
			double leave_3 = 0.0d;
			double leave_4 = 0.0d;
			for (int i = 1;i <= DateUtil.getMaxDayNum(month);i++) {
				String date = month + "-" + String.format("%02d", i);
				List<CwaAttendance> daylist = (List<CwaAttendance>)map.get(date);
				if (daylist != null) {
					for (CwaAttendance att : daylist) {
						switch (att.getType()) {
						case 1:
							break;
						case 2:
							overtime += att.getTime();
							break;
						case 3:
							travel += att.getTime();
							break;
						case 4:
							leave_0 += att.getTime();
							break;
						case 5:
							leave_1 += att.getTime();
							break;
						case 6:
							leave_2 += att.getTime();
							break;
						case 7:
							leave_3 += att.getTime();
							break;
						case 8:
							leave_4 += att.getTime();
							break;
						case 9:
							overtimeHoli += att.getTime();
							break;
						case 10:
							outside += att.getTime();
							break;
						case -2:
							early += att.getTime();
							break;
						case -1:
							absenteeism += att.getTime();
							break;
						default:
							leave_4 += att.getTime();
							break;
						}
					}
				}
				if (leaveCalender.isWorkday(date)) {
					double t = 1.0d;
					double p = 1.0d;
					double o = 0.0d;
					if (daylist != null) {
						for (CwaAttendance att : daylist) {
							if (att.getProcessType() != null && att.getProcessType() == 1) {
								t = t - att.getTime();
							}
							if (att.getType() == -2) {
								p = p - 0.5d;
								t = t - 0.5;
							}
							if (att.getType() == 2) {
								t = 0;
								p = 0;
								o += att.getTime();
							}
							if (att.getType() == -1 ) {
								p = p - att.getTime();
								t = t - att.getTime();
							}
							if (att.getType() == 7 ) {
								p = p - att.getTime();
							}
							if (att.getType() == 6) {
								p = p - ( att.getTime() * 0.4d );
							}
						}
					}
					normal = normal + t + o;
					payday = payday + p;
				}
				if (leaveCalender.isHoliday(date)) {
					if (daylist != null) {
						double t2 = 0.0d;
						double t3 = 0.0d;
						double t10 = 0.0d;
						for (CwaAttendance att : daylist) {
							if (att.getProcessType() == null) {
								t2 = 0.0d;
							} else {
								if (att.getProcessType() == 2) {
									t2 = t2 + att.getTime();
								}
								if (att.getProcessType() == 3) {
									t3 = t3 + att.getTime();
								}
								if (att.getProcessType() == 10) {
									t10 = t10 + att.getTime();
								}
							}
						}
						t2 = Math.max(Math.max(t2, t3),t10);
						normal = normal + t2;
					}
				}
				if (leaveCalender.isLawHoliday(date)) {
					payday++;
					if (daylist != null) {
						for (CwaAttendance att : daylist) {
							if (att.getType() == 9) {
								payday += (att.getTime() * 2);
							}
						}
					}
				}
			}
			CwaAttReport report = new CwaAttReport();
			User user = userService.getUserByIdNoPassWord(userId);
			report.setAbsenteeism(absenteeism);
			report.setDate(month);
			report.setDepId(user.getDepId());
			report.setDepName(user.getDepName());
			report.setEarly(early);
			report.setLeave0(leave_0);
			report.setLeave1(leave_1);
			report.setLeave2(leave_2);
			report.setLeave3(leave_3);
			report.setLeave4(leave_4);
			report.setNormal(normal);
			report.setOutside(outside);
			report.setOvertime(overtime);
			report.setOvertimeHoli(overtimeHoli);
			report.setPaidDay(payday);
			report.setTravel(travel);
			report.setUserId(userId);
			report.setUserRealname(user.getRealname());
			report.setUsercode(user.getUsercode());
			CwaAttReport userReport = getUserReport(userId, month);
			if (userReport != null) {
				report.setId(userReport.getId());
				update(report);
			} else {
				String id = DataUtil.uuidData();
				report.setId(id);
				saveCwaAttReport(report);
			}
		}
	}

	/**
	 * 更新单个人考勤汇总记录（本月和上月）
	 */
	public void updateNowUserReport(String userId) throws Exception {
		long now = DateUtil.nowTime();
		String month = DateUtil.format(now, "yyyy-MM");
		updateCwaReportForUserId(userId, month);
		String premonth = DateUtil.getPreMonth(month);
		updateCwaReportForUserId(userId, premonth);
	}
	
	/**
	 * 更新状态
	 */
	public void submitDepAttendance(String userId,String month,String depId,int status) throws Exception {
		List<String> depIdList = cwaDeptAdminService.listDepIdByAdminId(userId);
		if (depIdList.contains(depId)) {
			List<String> userlist = userService.listUserIdByDepId(depId);
			List<Integer> statusList = cwaReportMapper.listReportStatus(userlist, month);
			if (statusList.contains(1)) {
				throw new ProcessSubmitException("当前有员工未确认考勤，请催促及时确认！");
			}
			cwaReportMapper.updateAttendanceStatus(userlist,month,status);
		}
	}
	
	/**
	 * 部门考勤管理员提交考勤报表
	 */
	public void depAdminSubmit(String userId,String month,String depId) throws Exception {
		submitDepAttendance(userId, month, depId, 3);
		CwaDeptAdmin admin = cwaDeptAdminService.getAttendanceAdminByDepId("1");
		MailVo mailVo = new MailVo("部门考勤提交通知", "submitDepAttendance", admin.getUserId());
		String depName = depService.selectDeptNameById(depId);
		ParaMap map = new ParaMap();
		map.put("depName", depName);
		map.put("time", DateUtil.format(DateUtil.now(),"yyyy-MM"));
		mailVo.setParams(map);
		MailSendThread.queue.offer(mailVo);
	}
	
	/**
	 * 总考勤管理员提交
	 */
	public void AdminSubmit(String userId,String month,String depId) throws Exception {
		if (month.equals(DateUtil.getMonth("yyyy-MM-dd"))) {
			throw new ProcessSubmitException("不能提交当月的考勤！");
		}
		depId = "1";
		String monthkey = month.contains("%") ? month : "%" + month + "%";
		List<SysProcess> list = sysProcessMapper.selectListByStatus(monthkey, 1);
		if (list.size() > 0 ) {
			throw new ProcessSubmitException("当前还存在" + month + "月审批中的考勤流程！");
		}
		submitDepAttendance(userId, month, depId, 4);
	}
	
	/**
	 * 总考勤管理员提交
	 */
	public Result validateSubmit(String userId,String month,String depId) throws Exception {
		String monthkey = month.contains("%") ? month : "%" + month + "%";
		List<SysProcess> list = sysProcessMapper.selectListByStatus(monthkey, 1);
		if (list.size() > 0 ) {
			return Result.failed(month + "月还有" + list.size() + "张考勤单处于审批中,请及时督促完成审批");
		}
		return Result.success();
	}
	
	/**
	 * 查询部门考勤提交状态
	 */
	public int getAttendanceStatus(String userId,String month,String depId) throws Exception {
		if (month.equals(DateUtil.getMonth("yyyy-MM-dd"))) {
			return -1;
		}
		List<String> depIdList = cwaDeptAdminService.listDepIdByAdminId(userId);
		if (depIdList.contains(depId)) {
			List<String> userlist = userService.listUserIdByDepId(depId);
			List<Integer> statusList = cwaReportMapper.listReportStatus(userlist, month);
			if (statusList.contains(1)) {
				return 1;
			}
			if (statusList.contains(2) && !statusList.contains(3)) {
				return 2;
			}
			if (statusList.contains(3) && !statusList.contains(4)) {
				return 3;
			} else {
				return 4;
			}
		}
		return -1;
	}
	
	/**
	 * 获取用户的数据权限，部门列表
	 */
	public List<String> listDepIdByUserRole(String userId, String depId) {
		List<Role> list = roleService.listRoleByUserId(userId);
		List<String> depIdList = cwaDeptAdminService.listDepIdByAdminId(userId);
		List<String> deplist = new ArrayList<String>();
		for (Role role : list) {
			int roleCode = role.getCode();
			if (roleCode == cwa_role_ecar || roleCode == cwa_role_see) {
				deplist = new ArrayList<String>();
				deplist.add("1");
				break;
			}
			if (roleCode == cwa_role_dept) {
				deplist.addAll(depIdList);
			}
		}
		List<String> leadDep = new ArrayList<String>();
		if (!deplist.contains("1")) {
			leadDep = depService.getdepIdByLeaderId(userId);
			for (String id : leadDep) {
				if (!deplist.contains(id)) {
					deplist.add(id);
				}
			}
		}
		List<String> childList = new ArrayList<String>();
		for (String canSeedepId : deplist) {
			childList.add(canSeedepId);
			List<String> canseeList = depService.getDepChildIdList(canSeedepId);
			for (String canseechild : canseeList) {
				if (!childList.contains(canseechild)) {
					childList.add(canseechild);
				}
			}
		}
		if (StrUtils.isNotNull(depId)) {
			List<String> paramtList = depService.getDepChildIdList(depId);
			childList.retainAll(paramtList);
		}
		return childList;
	}

	@SuppressWarnings("rawtypes")
	public byte[] exportExcel(HttpServletRequest request, HttpServletResponse response) throws Exception {
		List<CwaExport> exlist = new ArrayList<CwaExport>();
		for (int i = 1; i <= 351; i++) {
			String usercode = String.format("%04d", i);
			User user = userService.selectUserByUsercode(usercode);
			if (user == null || user.getIsLeave() == 1) {
				continue;
			}
			CwaExport cwaExport = new CwaExport();
			cwaExport.setName(user.getRealname());
			cwaExport.setUsercode(usercode);
			cwaExport.setUserId(user.getId());
			int j = 1;
			if (user.getCreateTime() > DateUtil.parse("2017-09-01", "yyyy-MM-dd").getTime()) {
				j = Integer.parseInt(DateUtil.format(user.getCreateTime(), "dd"));
			}
			if (user.getCreateTime() > DateUtil.parse("2017-10-01", "yyyy-MM-dd").getTime()) {
				continue;
			}
			for (; j <= 31; j++) {
				String day = "2017-09-" + String.format("%02d", j);
				String userId = user.getId();
				List<CwaAttendance> list = cwaAttendanceService.listAttendanceByUserAndDate(userId, day);
				String status = "";
				if (list == null || list.isEmpty()) {
					continue;
				}
				for (CwaAttendance att : list) {
					if (att.getType() != 1) {
						String type = att.getType() + "";
						if (att.getTime() == 0.5d) {
							type += "半天";
						}
						status += (type + "/");
					}
				}
				status = status == "" ? "" : status.substring(0, status.length() - 1);
				Class userCla = (Class) cwaExport.getClass();
				Field[] fs = userCla.getDeclaredFields();
				for (int m = 0; m < fs.length; m++) {
					Field f = fs[m];
					f.setAccessible(true); // 设置些属性是可以访问的
					if (f.getName().equals("day" + j)) {
						f.set(cwaExport, status);
					}
				}
			}
			exlist.add(cwaExport);
		}
		ParaMap paramap = new ParaMap();
		List<ParaMap> maplist = new ArrayList<ParaMap>();
		for (CwaExport f : exlist) {
			ParaMap objmap = ParaMap.ObjToParaMap(f);
			maplist.add(objmap);
		}
		paramap.put("data", maplist);
		return excelExportService.exportUserAttendanceMonth(paramap, request, response);
	}

	/**
	 * 发送考勤邮件
	 */
	public void sendEmailToAll(String month) throws Exception {
		if (getAttendanceStatus( cwaDeptAdminService.getAttendanceAdminByDepId("1").getUserId(), month, "1") != 4){
			throw new ProcessSubmitException("请先提交考勤再发送邮件");
		}
		int maxday = leaveCalender.getMaxDayByYearMonth(month);
		int workday = leaveCalender.getMonthHasWorkday(month);
		List<User> userList = userService.getAllUserList();
		for (User user : userList) {
			String userId = user.getId();
			String usercode = user.getUsercode();
			CwaAttReport report = getUserReport(userId, month);
			if (report == null) {
				continue;
			}
			String subject = month + "月考勤表";
			MailVo mailVo = new MailVo(subject, "cwaReport", userId);
			Map<String, String> params = new HashMap<String, String>();
			params.put("year-month", month);
			params.put("usercode", usercode);
			params.put("realname", user.getRealname());
			params.put("depname", user.getDepName());
			params.put("joindate", DateUtil.format(user.getCreateTime(), "yyyy.MM.dd"));
			params.put("workday", workday + "");
			params.put("normal", report.getNormal() + "");
			params.put("leave0", report.getLeave0() + "");
			params.put("leave1", report.getLeave1() + "");
			params.put("leave2", report.getLeave2() + "");
			params.put("leave3", report.getLeave3() + "");
			params.put("leave4", report.getLeave4() + "");
			params.put("overtime", report.getOvertime() + "");
			params.put("overtimeholi", report.getOvertimeHoli() + "");
			params.put("travel", report.getTravel() + "");
			params.put("early", report.getEarly() + "");
			params.put("abbsim", report.getAbsenteeism() + "");
			params.put("outside", report.getOutside() + "");
			Map<String, CwaAttendance> attmap = new HashMap<>();
			List<CwaAttendance> userAttList = cwaAttendanceService.listAttendanceByUserAndMonth(userId, month);
			for (CwaAttendance cwauser : userAttList) {
				attmap.put(cwauser.getDate(), cwauser);
			}
			int forday = 0;
			String m = month.split("-")[1];
			if (m.equals(DateUtil.format(DateUtil.now(), "MM"))) {
				forday = Integer.parseInt(DateUtil.format(DateUtil.now(), "dd"));
			} else {
				forday = maxday;
			}
			int x = DateUtil.dayForWeek(month + "-01");
			for (int i = 1; i <= forday; i++) {
				String date = month + "-" + String.format("%02d", i);
				String str = "\">";
				int xx = (x + i - 2) / 7 + 1;
				int yy = DateUtil.dayForWeek(date);
				String str1 = xx + "-" + yy + "-" + "1" + str;
				params.put(str1, str1 + m + "-" + String.format("%02d", i));
				String str2 = xx + "-" + yy + "-" + "2" + str; 
				String value = "";
				CwaAttendance attdance = attmap.get(date);
				if (attdance == null) {
					long timelong = DateUtil.getTime(date, "yyyy-MM-d");
					if (leaveCalender.getOneDayIsHoliday(timelong) == 0) {
						value = "√";
					} else {
						value = "休";
					}
				} else {
					Integer type = attdance.getType();
					if (type == null) {
						type = 1;
					}
					
					String time = attdance.getTime() + "";
					value = eamilMap.getString(type+"");
					if (type > 10) {
						value = "Y";
					}
					if (time.equals("0.5")) {
						value += "0.5";
					}
				}
				params.put(str2, str2 + value);
			}
			mailVo.setParams(params);
			MailSendThread.queue.offer(mailVo);
		}
	}

	public static void main(String[] args) {
		test();
	}

	public static void test() {
		getCaller();
	}

	public static void getCaller() {
		StackTraceElement stack[] = (new Throwable()).getStackTrace();
		for (int i = 0; i < stack.length; i++) {
			StackTraceElement s = stack[i];
			System.out.println(s.getClassName());
			System.out.println(s.getMethodName());
			System.out.println(s.getFileName());
			System.out.println(s.getLineNumber());
		}
	}

}
