package com.ecaray.ecms.entity.sys;

import java.util.List;

public class DateHolidayVo {

	private List<SysDateHoliday> list;
	
	private String month;

	private String userId;
	
	public List<SysDateHoliday> getList() {
		return list;
	}

	public void setList(List<SysDateHoliday> list) {
		this.list = list;
	}

	public String getMonth() {
		return month;
	}

	public void setMonth(String month) {
		this.month = month;
	}

	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}
}
