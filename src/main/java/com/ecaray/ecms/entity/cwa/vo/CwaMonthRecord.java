package com.ecaray.ecms.entity.cwa.vo;

import java.util.List;

import com.ecaray.ecms.entity.cwa.CwaAttendance;

public class CwaMonthRecord {
	
	private String fristTime;
	
	private String lastTime;
	
	private String status;
	
	private String date;
	
	private String attName;
	
	private List<CwaAttendance> dayList;

	public String getFristTime() {
		return fristTime;
	}

	public void setFristTime(String fristTime) {
		this.fristTime = fristTime;
	}

	public String getLastTime() {
		return lastTime;
	}

	public void setLastTime(String lastTime) {
		this.lastTime = lastTime;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public List<CwaAttendance> getDayList() {
		return dayList;
	}

	public void setDayList(List<CwaAttendance> dayList) {
		this.dayList = dayList;
	}

	public String getDate() {
		return date;
	}

	public void setDate(String date) {
		this.date = date;
	}

	public String getAttName() {
		return attName;
	}

	public void setAttName(String attName) {
		this.attName = attName;
	}
}
