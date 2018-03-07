package com.ecaray.ecms.services.cwa;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ecaray.ecms.commons.constant.ValiResult;
import com.ecaray.ecms.commons.utils.DateUtil;
import com.ecaray.ecms.commons.utils.ParaMap;
import com.ecaray.ecms.dao.mapper.sys.SysDateHolidayMapper;
import com.ecaray.ecms.entity.cwa.CwaAttReport;
import com.ecaray.ecms.entity.sys.DateHolidayVo;
import com.ecaray.ecms.entity.sys.SysDateHoliday;

@Service
public class CwaDateHolidayService {

	@Autowired
	private SysDateHolidayMapper sysDateHolidayMapper;

	/**
	 * 保存非工作日
	 */
	public void saveDateHoliday(SysDateHoliday date) {
		SysDateHoliday d = sysDateHolidayMapper.selectByPrimaryKey(date.getDate());
		if (d == null) {
			Long now = DateUtil.nowTime();
			date.setAddUser("1");
			date.setAddTime(now);
			date.setUpdateTime(now);
			sysDateHolidayMapper.insertSelective(date);
		}
	}

	/**
	 * 查询某月节假日、非工作日日期列表
	 * 
	 * month:yyyy-MM
	 */
	public List<SysDateHoliday> listHolidayByMonth(String month) {
		String monthKey = "%" + month + "%";
		List<SysDateHoliday> list = sysDateHolidayMapper.listHolidayByMonth(monthKey);
		ParaMap map = new ParaMap();
		for (SysDateHoliday date : list) {
			map.put(date.getDate(), date);
		}
		int maxDay = DateUtil.lastDayOfMonth(month, "yyyy-MM");
		List<SysDateHoliday> dateList = new ArrayList<>();
		for (int i = 1; i <= maxDay; i++) {
			SysDateHoliday addDate = new SysDateHoliday();
			String day = month + "-" + String.format("%02d", i);
			if (map.get(day) == null) {
				addDate.setDate(day);
				addDate.setType(1);
				dateList.add(addDate);
			} else {
				dateList.add((SysDateHoliday) map.get(day));
			}
		}
		return dateList;
	}

	/**
	 * 更新某月节假日、非工作日日期列表
	 * 
	 * month:yyyy-MM
	 */
	public void updateMonthHoliday(DateHolidayVo vo) {
		String addUserId = vo.getUserId();
		String month = vo.getMonth();
		String monthKey = "%" + month + "%";
		sysDateHolidayMapper.deleteListByMonth(monthKey);
		List<SysDateHoliday> list = vo.getList();
		if (list != null && list.size() > 0) {
			for (SysDateHoliday dateHoliday : list) {
				Long now = DateUtil.nowTime();
				dateHoliday.setAddUser(addUserId);
				dateHoliday.setAddTime(now);
				dateHoliday.setUpdateTime(now);
				sysDateHolidayMapper.insertSelective(dateHoliday);
			}
		}
	}

	/**
	 * 查询某天工作日类型
	 * 
	 * 1-工作日，2-非工作日，3-法定节假日
	 */
	public Integer getDateType(String date) {
		SysDateHoliday dateHoliday = sysDateHolidayMapper.selectByPrimaryKey(date);
		if (dateHoliday == null) {
			return 1;
		}
		return dateHoliday.getType();
	}
	
	public boolean validateOverTime(Long starttime,Long endtime){
		while(starttime <= endtime) {
			String startDay = DateUtil.format(starttime);
			if (getDateType(startDay) == 1){
				return false;
			}
			starttime = DateUtil.getTime(startDay, "yyyy-MM-dd") + 24 * 3600 * 1000;
		}
		return true;
	}
}
