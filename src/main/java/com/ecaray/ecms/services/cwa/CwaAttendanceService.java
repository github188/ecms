package com.ecaray.ecms.services.cwa;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.alibaba.fastjson.JSONObject;
import com.ecaray.ecms.commons.exception.ProcessSubmitException;
import com.ecaray.ecms.commons.utils.DataUtil;
import com.ecaray.ecms.commons.utils.DateUtil;
import com.ecaray.ecms.commons.utils.LeaveCalender;
import com.ecaray.ecms.commons.utils.ParaMap;
import com.ecaray.ecms.commons.utils.StrUtils;
import com.ecaray.ecms.dao.mapper.cwa.CwaAttendanceMapper;
import com.ecaray.ecms.entity.authority.User;
import com.ecaray.ecms.entity.cwa.CwaAttendance;
import com.ecaray.ecms.entity.cwa.CwaException;
import com.ecaray.ecms.entity.cwa.CwaOverTime;
import com.ecaray.ecms.entity.cwa.CwaProcess;
import com.ecaray.ecms.entity.cwa.PunchCard;
import com.ecaray.ecms.entity.cwa.vo.CwaAttendanceVo;
import com.ecaray.ecms.entity.cwa.vo.CwaFilter;
import com.ecaray.ecms.entity.cwa.vo.CwaMonthRecord;
import com.ecaray.ecms.entity.process.ProcessBase;
import com.ecaray.ecms.entity.process.SysProcess;
import com.ecaray.ecms.services.authority.UserRoleService;
import com.ecaray.ecms.services.authority.UserService;
import com.ecaray.ecms.services.common.ParameterService;
import com.ecaray.ecms.services.cwa.process.CwaExceptionProcess;
import com.ecaray.ecms.services.processes.BaseProcessService;
import com.ecaray.ecms.services.processes.ProcessService;
import com.ecaray.ecms.services.processes.SpringFactory;

/**
 * 员工考勤记录
 * 
 * @author Administrator
 *
 */
@Service
public class CwaAttendanceService {

	@Autowired
	private CwaAttendanceMapper cwaAttendanceMapper;

	@Autowired
	private CwaPunchCardService cwaPunchCardService;

	@Autowired
	private ProcessService processService;

	@Autowired
	private UserService userService;
	
	@Autowired
	private CwaUserHolidayService cwaUserHolidayService;
	
	@Autowired
	private CwaReportService cwaReportService;
	
	@Autowired
	private CwaExceptionProcess cwaExceptionProcess;
	
	@Autowired
	private UserRoleService userRoleService;
	
	@Autowired
	private LeaveCalender leaveCalender;
	
	
	@Autowired
	private ParameterService parameterService;

	/**
	 * 插入考勤记录对象
	 */
	public String saveCwaAttendance(CwaAttendance cwaAttendance) {
		String id = cwaAttendance.getId();
		if (StrUtils.isNull(id)) {
			id = DataUtil.uuidData();
			cwaAttendance.setId(id);
		}
		long time = DateUtil.nowTime();
		cwaAttendance.setUpdateTime(time);
		cwaAttendanceMapper.insertSelective(cwaAttendance);
		return id;
	}

	/**
	 * 更新考勤记录考勤记录对象
	 */
	public String updateCwaAttendanceById(CwaAttendance cwaAttendance) {
		long time = DateUtil.nowTime();
		cwaAttendance.setUpdateTime(time);
		cwaAttendanceMapper.updateByPrimaryKeySelective(cwaAttendance);
		return cwaAttendance.getId();
	}

	/**
	 * 通过考勤审批单更新考勤记录状态
	 */
	public String updateCwaAttendanceByRefId(CwaAttendance cwaAttendance) {
		long time = DateUtil.nowTime();
		cwaAttendance.setUpdateTime(time);
		cwaAttendanceMapper.updateCwaAttendanceByRefId(cwaAttendance);
		return cwaAttendance.getId();
	}

	/**
	 * 删除某个考勤审批单产生的考勤记录
	 */
	public void deleteCwaAttendanceByRefId(String refId) {
		cwaAttendanceMapper.deleteByRefId(refId);
	}

//	/**
//	 * 从原始考勤记录表汇总多人考勤记录，得到报表信息
//	 */
//	public List<CwaAttReport> listAttendanceToReport(CwaAttenUserVo vo) {
//		return cwaAttendanceMapper.selectAttendanceReport(vo);
//	}

//	/**
//	 * 从原始考勤记录表汇总个人考勤记录，得到报表信息 ---重载
//	 */
//	public List<CwaAttReport> listAttendanceToReport(String month, String date, String userId) {
//		CwaAttenUserVo vo = new CwaAttenUserVo();
//		if (StrUtils.isNotNull(month) && !month.contains("%")) {
//			month = "%" + month + "%";
//			vo.setMonth(month);
//		}
//		vo.setUserId(userId);
//		vo.setDay(date);
//		return listAttendanceToReport(vo);
//	}
//
//	/**
//	 * 从原始考勤记录表汇总多人考勤记录，得到报表信息 ---重载
//	 */
//	public List<CwaAttReport> listAttendanceToReport(String month, String date, List<String> ids) {
//		CwaAttenUserVo vo = new CwaAttenUserVo();
//		if (StrUtils.isNotNull(month) && !month.contains("%")) {
//			month = "%" + month + "%";
//			vo.setMonth(month);
//		}
//		vo.setIds(ids);
//		vo.setDay(date);
//		return listAttendanceToReport(vo);
//	}
//
//	/**
//	 * 从原始考勤记录表汇总所有人考勤记录，得到报表信息 ---重载
//	 */
//	public List<CwaAttReport> listAttendanceToReport(String month, String date) {
//		CwaAttenUserVo vo = new CwaAttenUserVo();
//		if (StrUtils.isNotNull(month) && !month.contains("%")) {
//			month = "%" + month + "%";
//			vo.setMonth(month);
//		}
//		vo.setDay(date);
//		return listAttendanceToReport(vo);
//	}

	/**
	 * 查询考勤原始记录列表（精确到天）
	 */
	public List<CwaAttendance> listAttendance(CwaAttendance cwaAttendance) {
		return cwaAttendanceMapper.selectAttendanceList(cwaAttendance);
	}

	/**
	 * 查询考勤原始记录列表 -重载
	 */
	public List<CwaAttendance> listAttendanceByUserAndDate(String userId, String date) {
		CwaAttendance cwaAttendance = new CwaAttendance();
		cwaAttendance.setUserId(userId);
		cwaAttendance.setDate(date);
		return listAttendance(cwaAttendance);
	}

	/**
	 * 查询考勤原始记录列表（按月查询）
	 */
	public List<CwaAttendance> listAttendanceByCwaAttendanceVo(CwaAttendanceVo vo) throws Exception {
		String month = vo.getMonth();
		if (StrUtils.isNotNull(month) && !month.contains("%")) {
			vo.setMonth("%" + month + "%");
		}
		List<CwaAttendance> list = cwaAttendanceMapper.selectAttendanceListLikeMonth(vo);
		return list;
	}
 
	/**
	 * 查询考勤原始记录列表（按月查询） - 重载
	 */
	public List<CwaAttendance> listAttendanceByUserAndMonth(String userId, String month) throws Exception {
		CwaAttendanceVo vo = new CwaAttendanceVo();
		vo.setUserId(userId);
		vo.setMonth(month);
		return listAttendanceByCwaAttendanceVo(vo);
	}

	/**
	 * 生成考勤记录
	 */
	public void translateCwaToAttendance(CwaProcess process, Integer status) throws Exception {
		long starttime = process.getStartTime();
		long endtime = process.getEndTime();
		int processType = process.getProcessType();
		String userId = process.getUserId();
		while (starttime <= endtime) {
			String endDay = DateUtil.format(endtime);
			String beginDay = DateUtil.format(starttime);
			long beginDayEnd = beginDay.equals(endDay) ? endtime : DateUtil.getTime(beginDay + " 18:30", "yyyy-MM-dd HH:mm");
			int m = 1;
			if (processType == 1) {
				m = 1;
			}
			if (processType == 2) {
				m = 3;
			}
			if (processType == 10 || processType == 3) {
				m = 2;
			}
			double leavelength = leaveCalender.getOverTimeLong(starttime, beginDayEnd, m);
			if (leavelength >= 0.5d) {
				int type = process.getType();
				if (processType == 2 && leaveCalender.getOneDayIsHoliday(starttime) == 2) {
					type = 9;
				}
				CwaAttendance cwaAttendance = new CwaAttendance();
				cwaAttendance.setDate(beginDay);
				cwaAttendance.setType(type);
				cwaAttendance.setProcessType(process.getProcessType());
				cwaAttendance.setUserId(userId);
				cwaAttendance.setTime(leavelength);
				cwaAttendance.setStartTime(starttime);
				cwaAttendance.setEndTime(beginDayEnd);
				cwaAttendance.setStatus(status);
				cwaAttendance.setRefId(process.getId());
				this.saveCwaAttendance(cwaAttendance);
			}
			long nextDay = DateUtil.getTime(beginDay, "yyyy-MM-dd") + 32 * 3600 * 1000;
			starttime = nextDay;
		}
	}

	/**
	 * 插入考勤记录
	 */
	public void translateCwaToAttendance(CwaProcess process) throws Exception {
		translateCwaToAttendance(process, 1);
	}

	/**
	 * 查询自己月考勤记录
	 */
	public List<CwaMonthRecord> listMonthAttendanceByUserId(User user, String month) throws Exception {
		List<CwaMonthRecord> result = new ArrayList<>();
		if (StrUtils.isNull(month)) {
			return null;
		}
		String userId = user.getId();
		String userName = user.getRealname();
		ParaMap punchCard = cwaPunchCardService.listPunchCardRecordByMonth(userName, month);
		if (punchCard != null) {
			String monthkey = "%" + month + "%";
			List<CwaAttendance> list = listAttendanceByUserAndMonth(userId, monthkey);
			for (CwaAttendance att : list) {
				if (StrUtils.isNull(att.getRefId())) {
					CwaException cwaEXP = cwaExceptionProcess.getCwaExceptionByCwaId(att.getId());
					if (cwaEXP != null) {
						SysProcess process = processService.getProcessIdByRefId(cwaEXP.getId());
						if (process != null) {
							att.setRefId(process.getId());
						}
					}
				}
			}
			ParaMap cwaMap = new ParaMap();
			for (CwaAttendance cwaAttendance : list) {
				String date = cwaAttendance.getDate();
				List<CwaAttendance> dayList = (List<CwaAttendance>) cwaMap.get(date);
				if (dayList == null) {
					dayList = new ArrayList<CwaAttendance>();
				}
				if (cwaAttendance.getType() != 1) {
					dayList.add(cwaAttendance);
					cwaMap.put(date, dayList);
				}
			}
			int maxDay = 0;
			String m = DateUtil.format(DateUtil.now(), "yyyy-MM");
			if (m.equals(month)) {
				maxDay =  Integer.parseInt(DateUtil.format(DateUtil.now(), "d"));
			} else {
				maxDay = DateUtil.lastDayOfMonth(month, "yyyy-MM");
			}
			for (int i = 1; i <= maxDay; i++) {
				CwaMonthRecord data = new CwaMonthRecord();
				String day = month + "-" + String.format("%02d", i);
				data.setDate(day);
				JSONObject object = (JSONObject) punchCard.get(day);
				long dayTime = DateUtil.parse(day + " 23", "yyyy-MM-dd HH").getTime();
				if (dayTime < user.getCreateTime()) {
					List<CwaAttendance> CwaAttendanceList = new ArrayList<>();
					CwaAttendance holi = new CwaAttendance();
					holi.setType(-3);
					CwaAttendanceList.add(holi);
					data.setDayList(CwaAttendanceList);
					data.setAttName("");
				}
				if (object != null) {
					data.setFristTime(object.getString("fristTime"));
					data.setLastTime(object.getString("lastTime"));
					data.setStatus(object.getString("status"));
					data.setAttName("出勤");
				}
				if (leaveCalender.isHoliday(day)){
					List<CwaAttendance> CwaAttendanceList = new ArrayList<>();
					CwaAttendance holi = new CwaAttendance();
					holi.setType(-3);
					CwaAttendanceList.add(holi);
					data.setDayList(CwaAttendanceList);
					data.setAttName("休");
				}
				if (day.equals(DateUtil.format(DateUtil.nowTime()))){
					List<CwaAttendance> CwaAttendanceList = new ArrayList<>();
					CwaAttendance holi = new CwaAttendance();
					holi.setType(-3);
					CwaAttendanceList.add(holi);
					data.setDayList(CwaAttendanceList);
					data.setAttName("");
				}
				if (cwaMap.get(day) != null) {
					List<CwaAttendance> CwaAttendanceList = (List<CwaAttendance>) cwaMap.get(data.getDate());
					String name = "";
					for (CwaAttendance att : CwaAttendanceList) {
						name += parameterService.getName("cwa_leave_type", String.format("%02d", att.getType()));
						name += att.getTime() == 0.5d ? "0.5" :"";
						name += "#";
					}
					name = name.substring(0, name.length() - 1);
					data.setAttName(name);
					data.setDayList(CwaAttendanceList);
				}
				result.add(data);
			}
		}
		return result;
	}

	/**
	 * 验证考勤记录和打卡记录
	 */
	public void valiAttendanceAndPunchCard(List<User> list, String date) throws Exception {
		ParaMap punchcardMap = cwaPunchCardService.getUserPunchDataByDate(list, date);
		for (User user : list) {
			int workHour = 8;
			List<String> codeList = userRoleService.getRoleCodeListByUserId(user.getId());
			if (codeList.contains("100905")){
				List<CwaAttendance> list2 = listAttendanceByUserAndDate(user.getId(), date,2);
				for (CwaAttendance att : list2) {
					att.setStatus(3);
					updateCwaAttendanceById(att);// 将考勤记录置为结果
					if (att.getType() == 2 ) {
						CwaOverTime overtime = new CwaOverTime();
						overtime.setUserId(att.getUserId());
						overtime.setTimeLength(att.getTime());
						overtime.setStartTime(att.getStartTime());
						overtime.setEndTime(att.getEndTime());
						cwaUserHolidayService.updateUserHoliday(overtime);
					}
				}
				cwaReportService.updateNowUserReport(user.getId());
				continue;
			}
			CwaException exception = new CwaException();
			exception.setDate(date);
			exception.setUserId(user.getId());
			exception.setUserName(user.getRealname());
			String userId = user.getId();
			PunchCard punchCard = (PunchCard) punchcardMap.get(userId);
			List<CwaAttendance> list3 = listAttendanceByUserAndDate(userId, date,3);
			List<CwaAttendance> list1 = listAttendanceByUserAndDate(userId, date,1);
			boolean haveIng = false;
			if (list1 != null && list1.size() > 0) {
				haveIng = true;
			}
			if (list3 != null && list3.size() > 0) {
				boolean flag = false;
				Iterator<CwaAttendance> it = list3.iterator();
				while(it.hasNext()){
					CwaAttendance att = it.next();
					if (att.getType() == -1 || att.getType() == -2) {
						cwaAttendanceMapper.deleteByPrimaryKey(att.getId());
						it.remove();
					}
					if (att.getType() == 1 && att.getTime() == 1) {
						flag = true;
					}
				}
				if (flag) {
					cwaReportService.updateNowUserReport(user.getId());
					continue;
				}
			}
			List<CwaAttendance> list2 = listAttendanceByUserAndDate(userId, date,2);
			list2.addAll(list3);
			if (leaveCalender.isWorkday(date) && !haveIng) {
				Double cwaTime = 0.0d;
				for (CwaAttendance att : list2) {
					att.setStatus(3);
					updateCwaAttendanceById(att);// 将考勤记录置为结果
					if (att.getType() != -1 && att.getType() != -2) {
						cwaTime += att.getTime();
					}
				}
				if (cwaTime != 1) {
					if (punchCard == null) {
						createAbsenteeismException(user, date, 1 - cwaTime);
						cwaReportService.updateNowUserReport(user.getId());
						continue;
					}
					String ft = punchCard.getFristtime();
					String lt = punchCard.getLasttime();
					if (StrUtils.isNull(ft) && StrUtils.isNull(lt)) {
						// 旷工
						createAbsenteeismException(user, date, 1 - cwaTime);
					} else {
						if (StrUtils.isNull(ft) || StrUtils.isNull(lt)) {
							createLeftEarlyException(punchCard, 1 - cwaTime, 0);
						} else {
							ft = DateUtil.now("yyyy-MM-dd") + " " + ft;
							lt = DateUtil.now("yyyy-MM-dd") + " " + lt;
							long fristTime = DateUtil.parse(ft, "yyyy-MM-dd HH:mm").getTime();
							long lastTime = DateUtil.parse(lt, "yyyy-MM-dd HH:mm").getTime();
							if (lastTime - fristTime < 0) {
								lastTime += 24 * 3600 * 1000;
							}
							long t = 0L;
							t = getWorkTime(fristTime, lastTime);
							workHour = cwaTime == 0 ? workHour : workHour / 2;
							long worklongtime = 3600000 * workHour;
							if (t < worklongtime) {
								createLeftEarlyException(punchCard, 1 - cwaTime, t);
							} else {
								deleteCwaExceptionAtt(userId, date);
							}
						}
					}
				}
			} else if (leaveCalender.isHoliday(date)){
				List<CwaAttendance> overtimeList = new ArrayList<>();
				Double overtimelength = 0.0d;
				for (CwaAttendance att : list2) {
					if (att.getType() == 2 || att.getType() == 9) {
						List<CwaAttendance> otherList = cwaAttendanceMapper.listAttendanceByTimeNotOvertime(userId, att.getStartTime(), att.getEndTime());
						if (otherList != null && otherList.size() > 0) {
							att.setStatus(3);
							updateCwaAttendanceById(att);// 有外出和出差的情况直接通过
							if (att.getType() == 2) { // 增加调休假
								CwaOverTime overtime = new CwaOverTime();
								overtime.setStartTime(att.getStartTime());
								overtime.setEndTime(att.getEndTime());
								overtime.setUserId(att.getUserId());
								overtime.setTimeLength(att.getTime());
								cwaUserHolidayService.updateUserHoliday(overtime);
							}
						} else {
							overtimeList.add(att);
							overtimelength += att.getTime();
						}
					} else if (!haveIng) {
						att.setStatus(3);
						updateCwaAttendanceById(att);// 将其他考勤记录置为结果
					}
				}
				if (overtimeList.size() > 0) {
					workHour = overtimelength == 1 ? workHour : workHour / 2;
					long t = 0l;
					String ft = "";
					String lt = "";
					if (punchCard == null) {
						punchCard = new PunchCard();
						punchCard.setDate(date);
						punchCard.setUserId(userId);
						t = 0;
					} else {
						ft = punchCard.getFristtime();
						lt = punchCard.getLasttime();
					}
					if (StrUtils.isNull(ft) || StrUtils.isNull(lt)) {
						t = 0;
					} else {
						long fristTime = DateUtil.parse(ft, "HH:mm").getTime();
						long lastTime = DateUtil.parse(lt, "HH:mm").getTime();
						if (lastTime - fristTime <= 0) {
							lastTime += 24 * 3600 * 1000;
						}
						t = getWorkTime(fristTime, lastTime);
					}
					long worklongtime = 3600000 * workHour;
					if (t < worklongtime) {
						// 加班异常
						createOverTimeException(punchCard, t,overtimelength);
					} else {
						for (CwaAttendance attend : overtimeList) {
							if (attend.getStatus() != 3) {
								attend.setStatus(3);
								updateCwaAttendanceById(attend);// 将加班记录置为结果
								if (attend.getType() == 2) { // 增加调休假
									CwaOverTime overtime = new CwaOverTime();
									overtime.setStartTime(attend.getStartTime());
									overtime.setEndTime(attend.getEndTime());
									overtime.setUserId(attend.getUserId());
									overtime.setTimeLength(attend.getTime());
									cwaUserHolidayService.updateUserHoliday(overtime);
								}
							}
						}
					}
				}
			}
			cwaReportService.updateNowUserReport(user.getId());
		}
	}

	private void deleteCwaExceptionAtt(String userId, String date) {
		cwaAttendanceMapper.deleteCwaExceptionAtt(userId, date);
	}

	private List<CwaAttendance> listAttendanceByUserAndDate(String userId, String date,int status) {
		CwaAttendance cwaAttendance = new CwaAttendance();
		cwaAttendance.setUserId(userId);
		cwaAttendance.setDate(date);
		cwaAttendance.setStatus(status);
		return listAttendance(cwaAttendance);
	}

	public void valiAttendanceAndPunchCard(String userId, String date) throws Exception {
		User user = userService.getUserById(userId);
		List<User> list = new ArrayList<>();
		list.add(user);
		valiAttendanceAndPunchCard(list, date);
	}

	private void createAbsenteeismException(User user, String date, double d) throws Exception {
		String userId = user.getId();
		List<CwaAttendance> list = listAttendanceByUserAndDate(userId, date);
		List<CwaException> todolist = cwaExceptionProcess.getCwaException(userId,date,1);
		String cwaId = "";
		double absenteeismTime = 0.0d;
		for (CwaAttendance att : list) {
			if (att.getType() == -1) {
				absenteeismTime += att.getTime();
			}
		}
		if (absenteeismTime < d) {
			CwaAttendance att = new CwaAttendance();
			att.setTime(d);
			att.setType(-1);
			att.setStatus(3);
			att.setUserId(user.getId());
			att.setDate(date);
			cwaId = saveCwaAttendance(att);
		}
		if (todolist == null || todolist.size() == 0) {
			CwaException exception = new CwaException();
			exception.setDate(date);
			exception.setExpName("旷工" + "#" + d);
			exception.setExpType(1);
			exception.setUserId(user.getId());
			exception.setUserName(user.getRealname());
			exception.setCwaId(cwaId);
			processService.createProcess(exception);
		} else {
			CwaException e = new CwaException();
			e.setId(todolist.get(0).getId());
			e.setExpName("旷工" + "#" + d);
			e.setCwaId(cwaId);
			cwaExceptionProcess.updateCwaException(e);
		}
	}

	/**
	 * 创建早退异常
	 * 
	 * @param punchCard
	 * @throws Exception
	 */
	private void createLeftEarlyException(PunchCard p, double d, long t) throws Exception {
		String userId = p.getUserId();
		String date = p.getDate();
		if (DateUtil.dayForWeek(date) == 4){
			long lt = DateUtil.parse(p.getLasttime(), "HH:mm").getTime();
			long h18 = DateUtil.parse("18:00", "HH:mm").getTime(); 
			if (t > 0 && lt >= h18) {
				return;
			}
		}
		List<CwaException> todolist = cwaExceptionProcess.getCwaException(userId,date,2);
		List<CwaAttendance> list = listAttendanceByUserAndDate(userId, date);
		String cwaId = "";
		double leftEarlyTime = 0.0d;
		for (CwaAttendance att : list) {
			if (att.getType() == -2) {
				leftEarlyTime += att.getTime();
			}
		}
		if (leftEarlyTime < d) {
			// 插入考勤记录
			CwaAttendance att = new CwaAttendance();
			att.setTime(d);
			att.setType(-2);
			att.setStatus(3);
			att.setUserId(userId);
			att.setDate(date);
			cwaId = saveCwaAttendance(att);
		}
		if (todolist == null || todolist.size() == 0) {
			CwaException exception = new CwaException();
			exception.setDate(date);
			exception.setExpName("早退" + "#" + d);
			exception.setExpType(2);
			exception.setUserId(userId);
			exception.setFristtime(p.getFristtime());
			exception.setLasttime(p.getLasttime());
			exception.setWorktime(DateUtil.gettimeLong(t));
			exception.setCwaId(cwaId);
			processService.createProcess(exception);
		}
	}

	/**
	 * 创建加班异常
	 * 
	 * @param punchCard
	 * @throws Exception
	 */
	private void createOverTimeException(PunchCard p, long t,double time) throws Exception {
		String date = p.getDate();
		String userId = p.getUserId();
		List<CwaException> list = cwaExceptionProcess.getCwaException(userId,date,3);
		if (list == null || list.size() == 0) {
			CwaException exception = new CwaException();
			exception.setDate(date);
			exception.setExpName("加班异常" + "#" + time);
			exception.setExpType(3);
			exception.setUserId(userId);
			exception.setFristtime(p.getFristtime());
			exception.setLasttime(p.getLasttime());
			exception.setWorktime(DateUtil.gettimeLong(t));
			processService.createProcess(exception);
		}
//		 else {
//				CwaException exception = list.get(0);
//				exception.setExpName("加班异常" + "#" + time);
//				exception.setFristtime(p.getFristtime());
//				exception.setLasttime(p.getLasttime());
//				exception.setWorktime(DateUtil.gettimeLong(t));
//				cwaExceptionProcess.updateCwaException(exception);
//			}
	}

	public static void main(String[] args) {
		System.out.println(DateUtil.parse(DateUtil.now("yyyy-MM-dd"), "yyyy-MM-dd").getTime());
		System.out.println(DateUtil.format(1512144000000l,"yyyy-MM-dd HH:mm:ss"));
	}

	/**
	 * 删除异常考勤记录
	 */
	public void deleteCwaAttendanceById(String cwaId) {
		cwaAttendanceMapper.deleteByPrimaryKey(cwaId);
	}

	public void coverUserCwaAttendance(CwaFilter filter) {
		cwaAttendanceMapper.updateCwaAttendanceCover(filter);
	}

	public List<CwaAttendance> listAttendanceByTime(String userId, long starttime, long endtime) {
		return cwaAttendanceMapper.listAttendanceByTime(userId, starttime, endtime);
	}
	
	public List<CwaAttendance> listAttendanceByTimeNotIng(String userId, long starttime, long endtime) {
		return cwaAttendanceMapper.listAttendanceByTimeNoIng(userId, starttime, endtime);
	}
	
	public List<CwaAttendance> listAttendanceByTimeNotOvertime(String userId, long starttime, long endtime) {
		return cwaAttendanceMapper.listAttendanceByTimeNotOvertime(userId, starttime, endtime);
	}
	
	public List<ProcessBase> listUserCwaByTime(CwaFilter filter) throws Exception {
		List<CwaAttendance> attlist = listAttendanceByTimeNotIng(filter.getAuthorId(), filter.getStarttime(),
				filter.getEndtime());
		List<ProcessBase> baseList = new ArrayList<>();
		ParaMap map =  new ParaMap();
		for (CwaAttendance cwa : attlist) {
			long date = cwa.getStartTime();
			long time = DateUtil.parse("2017-11-26", "yyyy-MM-dd").getTime();
			if (date < time) {
				throw new ProcessSubmitException("不能更改2017-11-26日之前的考勤单");
			}
			if (cwa.getType() != 1) {
				int type = cwa.getProcessType();
				if (type == 2) {
					continue;
				}
				String str1 = processService.getProcessPath(type);
				BaseProcessService service = SpringFactory.getBean(str1);
				try {
					ProcessBase base = service.getObjectById(cwa.getRefId());
					base = service.setTitle(base);
					if (map.get(base.getId()) == null) {
						baseList.add(base);
					}
					map.put(base.getId(), 1);
				} catch (Exception e) {
				}
			}
		}
		return baseList;
	}

	public List<CwaAttendance> getOldUserAttendance() {
		return cwaAttendanceMapper.listOldUserAttendance();
	}

	public CwaAttendance getAttById(String id) {
		return cwaAttendanceMapper.selectByPrimaryKey(id);
	}
	
	public List<CwaAttendance> getCwaAttendanceByCwaList(List<String> cwaList) {
		List<CwaAttendance> attList = new ArrayList<>();
		for (String id : cwaList) {
			attList.addAll(cwaAttendanceMapper.selectListByRefId(id));
		}
		return attList;
	}
	public void valiAttendanceAndPunchCardByTime(String userId, Long starttime, Long endtime) throws Exception {
		long nowday = DateUtil.parse(DateUtil.now("yyyy-MM-dd"), "yyyy-MM-dd").getTime();
		while (starttime <= endtime) {
			String startday = DateUtil.format(starttime);
			long startdaytime = DateUtil.parse(startday, "yyyy-MM-dd").getTime();
			if (startdaytime < nowday) {
				valiAttendanceAndPunchCard(userId, startday);
			}
			starttime += 24 * 3600 * 1000;
		}
	}
	
	public long getWorkTime(long starttime,long endtime){
		String day = DateUtil.format(endtime);
		long t12 = DateUtil.parse(day + " 12", "yyyy-MM-dd HH").getTime();
		long t14 = DateUtil.parse(day + " 14", "yyyy-MM-dd HH").getTime();
		if (starttime >= endtime) {
			return 0;
		}
		if (t12 <= endtime && endtime <= t14) {
			return t12 - starttime < 0 ? 0 :t12 - starttime;
		}
		if (t12 <= starttime && starttime <= t14) {
			return endtime - t14 < 0 ? 0 :endtime - t14;
		}
		if (starttime <=t12 && endtime >= t14){
			return endtime - starttime - 2 * 3600 * 1000;
		}
		if (starttime >= t14 || endtime <= t12) {
			return endtime - starttime;
		}
		return 0;
	}
//	static class A{
//		public long getWorkTime(long starttime,long endtime){
//			String day = DateUtil.format(endtime);
//			long t12 = DateUtil.parse(day + " 12", "yyyy-MM-dd HH").getTime();
//			long t14 = DateUtil.parse(day + " 14", "yyyy-MM-dd HH").getTime();
//			if (starttime >= endtime) {
//				return 0;
//			}
//			if (t12 <= endtime && endtime <= t14) {
//				return t12 - starttime < 0 ? 0 :t12 - starttime;
//			}
//			if (t12 <= starttime && starttime <= t14) {
//				return endtime - t14 < 0 ? 0 :endtime - t14;
//			}
//			if (starttime <=t12 && endtime >= t14){
//				return endtime - starttime - 2 * 3600 * 1000;
//			}
//			if (starttime >= t14 || endtime <= t12) {
//				return endtime - starttime;
//			}
//			return 0;
//		}
//		public static void main(String[] args) {
//			long starttime = DateUtil.parse("2017-11-20 12:58", "yyyy-MM-dd HH:mm").getTime();
//			long endtime = DateUtil.parse("2017-11-20 12:58", "yyyy-MM-dd HH:mm").getTime();
//			A a = new A();
//			System.out.println(DateUtil.gettimeLong(a.getWorkTime(starttime, endtime)));
//		}
//	}

	public List<CwaAttendance> listDayAllAttendance(String userId, String startDay) {
		return cwaAttendanceMapper.selectDayAllList(userId,startDay);
	}

	public List<CwaAttendance> listAttendanceByTimeIng(String userId, Long starttime, Long endtime) {
		// TODO Auto-generated method stub
		return cwaAttendanceMapper.listAttendanceByTimeIng(userId, starttime, endtime);
	}

	public CwaAttendance getAttendanceByResultId(String userId, String startday, String resultId) {
		// TODO Auto-generated method stub
		return cwaAttendanceMapper.getAttendanceByResultId(userId, startday, resultId);
	}

	public void updateCwaAttendanceByUserDateType(CwaAttendance att) {
		cwaAttendanceMapper.updateCwaAttendanceByUserDateType(att);
	}

	public List<CwaAttendance> getExcepetionList() {
		return cwaAttendanceMapper.getExcepetionList();
	}
	
}
