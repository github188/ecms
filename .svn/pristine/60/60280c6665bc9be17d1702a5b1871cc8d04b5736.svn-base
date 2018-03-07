package com.ecaray.ecms.services.cwa;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ecaray.ecms.commons.utils.DataUtil;
import com.ecaray.ecms.commons.utils.DateUtil;
import com.ecaray.ecms.commons.utils.LeaveCalender;
import com.ecaray.ecms.commons.utils.StrUtils;
import com.ecaray.ecms.dao.mapper.cwa.CwaHolidayBlanceMapper;
import com.ecaray.ecms.dao.mapper.cwa.CwaHolidayRecordMapper;
import com.ecaray.ecms.dao.mapper.cwa.CwaUserHolidayMapper;
import com.ecaray.ecms.entity.cwa.CwaHolidayBlance;
import com.ecaray.ecms.entity.cwa.CwaHolidayRecord;
import com.ecaray.ecms.entity.cwa.CwaHolidayRecordVo;
import com.ecaray.ecms.entity.cwa.CwaLeave;
import com.ecaray.ecms.entity.cwa.CwaOverTime;
import com.ecaray.ecms.entity.cwa.CwaUserHoliday;

@Service
public class CwaUserHolidayService {

	@Autowired
	CwaUserHolidayMapper cwaUserHolidayMapper;

	@Autowired
	CwaHolidayRecordMapper cwaHolidayRecordMapper;

	@Autowired
	LeaveCalender leaveCalender;
	
	@Autowired
	CwaHolidayBlanceMapper cwaHolidayBlanceMapper;

	/**
	 * 新增剩余假期记录（新员工）
	 */
	public void addNewUserHoliday(String id) {
		CwaUserHoliday holi = new CwaUserHoliday();
		holi.setUserId(id);
		holi.setAddTakeoff(0d);
		holi.setAnnual(0d);
		holi.setLastAnnual(0d);
		holi.setLastTakeoff(0d);
		holi.setSubTakeoff(0d);
		cwaUserHolidayMapper.insertSelective(holi);
	}

	/**
	 * 更新用户假期记录
	 */
	public void update(CwaUserHoliday holi) {
		cwaUserHolidayMapper.updateByPrimaryKeySelective(holi);
	}

	/**
	 * 获取用户的假期结余，年假、调休假
	 */
	public CwaUserHoliday getUserHasHoliday(String userId) {
		CwaUserHoliday holiday = cwaUserHolidayMapper.selectByPrimaryKey(userId);
		return holiday;
	}

	/**
	 * 按类型获取假期天数
	 */
	public double getHolidayByType(int type, CwaUserHoliday userHoliday) {
		if (type == 4) {
			return userHoliday.getAnnual();
		} else if (type == 5) {
			return userHoliday.getLastTakeoff() + userHoliday.getAddTakeoff() - userHoliday.getSubTakeoff();
		} else {
			return 0.0d;
		}
	}

	/**
	 * 按类型获取假期结余
	 */
	public double getUserHolidayByType(int type, String userId) {
		CwaUserHoliday holi = getUserHasHoliday(userId);
		return getHolidayByType(type, holi);
	}

	/**
	 * 获取用户剩余年假
	 */
	public double getUserAnnual(String userId) {
		return getHolidayByType(4, getUserHasHoliday(userId));
	}

	/**
	 * 获取用户剩余调休假
	 */
	public double getUserTakeOff(String userId) {
		return getHolidayByType(5, getUserHasHoliday(userId));
	}

	/**
	 * 请假扣除假期
	 */
	public void updateUserHoliday(CwaLeave leave) throws Exception {
		Integer type = leave.getType();
		if (type != 4 && type != 5) {
			return;
		}
		String userId = leave.getUserId();
		double t = leave.getTimeLength();
		int i = t < 0 ? -1 : 1;
		CwaUserHoliday holiday = getUserHasHoliday(userId);
		double blance = getUserHolidayByType(type, userId);
		long starttime = leave.getStartTime();
		long endtime = leave.getEndTime();
		double subcount = 0.0d;
		while (starttime <= endtime) {
			String beginDay = DateUtil.format(starttime);
			String endDay = DateUtil.format(endtime);
			long beginDayEnd = beginDay.equals(endDay) ? endtime
					: DateUtil.getTime(beginDay + " 18:30", "yyyy-MM-dd HH:mm");
			double holidaySub = leaveCalender.getOverTimeLong(starttime, beginDayEnd, 1);
			subcount += i * holidaySub;
			CwaHolidayRecord record = new CwaHolidayRecord();
			record.setDate(beginDay);
			record.setSubnum(i * holidaySub);
			record.setBlance(blance - subcount);
			record.setUserId(userId);
			record.setType(type);
			
			saveUseHolidayRecord(record);
			starttime = DateUtil.getTime(beginDay, "yyyy-MM-dd") + 32 * 3600 * 1000;
		}
		CwaUserHoliday updateHoliday = new CwaUserHoliday();
		updateHoliday.setUserId(userId);
		if (type == 4) {
			updateHoliday.setAnnual(blance - subcount);
			cwaUserHolidayMapper.updateByPrimaryKeySelective(updateHoliday);
		}
		if (type == 5) {
			updateHoliday.setSubTakeoff(holiday.getSubTakeoff() + leave.getTimeLength());
			cwaUserHolidayMapper.updateByPrimaryKeySelective(updateHoliday);
		}
	}

	/**
	 * 加班增加调休假
	 */
	public void updateUserHoliday(CwaOverTime cwaOverTime) throws Exception {
		String userId = cwaOverTime.getUserId();
		double t = cwaOverTime.getTimeLength();
		int i = t < 0 ? -1 : 1;
		double blance = getUserTakeOff(userId);
		long starttime = cwaOverTime.getStartTime();
		long endtime = cwaOverTime.getEndTime();
		double subcount = 0.0d;
		while (starttime <= endtime) {
			String beginDay = DateUtil.format(starttime);
			if (leaveCalender.isLawHoliday(beginDay)) {
				starttime = DateUtil.getTime(beginDay, "yyyy-MM-dd") + 32 * 3600 * 1000;
				continue;
			}
			String endDay = DateUtil.format(endtime);
			long beginDayEnd = beginDay.equals(endDay) ? endtime
					: DateUtil.getTime(beginDay + " 18:30", "yyyy-MM-dd HH:mm");
			double holidaySub = leaveCalender.getOverTimeLong(starttime,beginDayEnd,3);
			subcount += i * holidaySub;
			CwaHolidayRecord record = new CwaHolidayRecord();
			record.setDate(beginDay);
			record.setAddnum(i * holidaySub);
			record.setBlance(blance + subcount);
			record.setUserId(userId);
			record.setType(5);
			saveUseHolidayRecord(record);
			starttime = DateUtil.getTime(beginDay, "yyyy-MM-dd") + 32 * 3600 * 1000;
		}
		CwaUserHoliday histor = cwaUserHolidayMapper.selectByPrimaryKey(userId);
		CwaUserHoliday updateHoliday = new CwaUserHoliday();
		updateHoliday.setUserId(userId);
		updateHoliday.setAddTakeoff(histor.getAddTakeoff() + cwaOverTime.getTimeLength());
		cwaUserHolidayMapper.updateByPrimaryKeySelective(updateHoliday);
	}

	/**
	 * 验证请假假期时长
	 */
	public boolean validateLeaveHoliday(CwaLeave l) {
		String userId = l.getUserId();
		CwaUserHoliday cwaUserHoliday = getUserHasHoliday(userId);
		int type = l.getType();
		if (type == 4 || type == 5) {
			double holiday = getHolidayByType(type, cwaUserHoliday);
			if (holiday < l.getTimeLength()) {
				return false;
			}
		}
		return true;
	}

	/**
	 * 保存假期使用记录
	 */
	public void saveUseHolidayRecord(CwaHolidayRecord record) {
		String id = record.getId();
		if (StrUtils.isNull(id)) {
			id = DataUtil.uuidData();
			record.setId(id);
		}
		record.setAddTime(DateUtil.nowTime());
		cwaHolidayRecordMapper.insertSelective(record);
	}
	
	/**
	 * 统计用户假期月变化汇总
	 */
	public CwaHolidayRecordVo getUserHolidayRecord(String userId,String month){
		String preMonth = DateUtil.prevMonth(month,"yyyy-MM");
		String monthkey = "%" + month + "%";
		List<CwaHolidayRecord> list = cwaHolidayRecordMapper.listUseRecordByUserIdAndMonth(userId,monthkey);
		CwaHolidayBlance preblance = cwaHolidayBlanceMapper.selectBlanceByUserIdAndMonth(userId,preMonth);
		double lastannualBlance = preblance == null? 0.0d :preblance.getAnnualBlance();
		double lasttakeoffBlance = preblance == null? 0.0d :preblance.getTakeoffBlance();
		double annualBlance = 0.0d;
		double takeoffBlance = 0.0d;
		if (month.equals(DateUtil.getMonth("yyyy-MM"))) {
			annualBlance = getUserAnnual(userId);
			takeoffBlance = getUserTakeOff(userId);
		} else {
			CwaHolidayBlance blance = cwaHolidayBlanceMapper.selectBlanceByUserIdAndMonth(userId,month);
			annualBlance =  blance == null? 0.0d :blance.getAnnualBlance();
			takeoffBlance =  blance == null? 0.0d :blance.getTakeoffBlance();
		}
		double annualAdd = 0.0d;
		double annualSub = 0.0d;
		double takeoffAdd = 0.0d;
		double takeoffSub = 0.0d;
		for (CwaHolidayRecord record : list) {
			if (record.getType() == 4) {
				annualAdd += record.getAddnum();
				annualSub += record.getSubnum();
			}
			if (record.getType() == 5) {
				takeoffAdd += record.getAddnum();
				takeoffSub += record.getSubnum();
			}
		}
		CwaHolidayRecordVo vo = new CwaHolidayRecordVo();
		vo.setUserId(userId);
		vo.setMonth(month);
		vo.setAnnualAdd(annualAdd);
		vo.setAnnualSub(annualSub);
		vo.setAnnualBlance(annualBlance);
		vo.setAnnualLastBlance(lastannualBlance);
		vo.setTakeoffAdd(takeoffAdd);
		vo.setTakeoffBlance(takeoffBlance);
		vo.setTakeoffLastBlance(lasttakeoffBlance);
		vo.setTakeoffSub(takeoffSub);
		return vo;
	}
	
	public static void main(String[] args) {
	}
}
