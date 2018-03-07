package com.ecaray.ecms.entity.cwa;

public class CwaHolidayRecordVo {
	
	private String userId;
	
	private String month;
	
	private Double annualLastBlance;
	
	private Double annualAdd;
	
	private Double annualSub;
	
	private Double annualBlance;

	private Double takeoffLastBlance;

	private Double takeoffAdd;
	
	private Double takeoffSub;
	
	private Double takeoffBlance;

	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	public Double getAnnualLastBlance() {
		return annualLastBlance;
	}

	public void setAnnualLastBlance(Double annualLastBlance) {
		this.annualLastBlance = annualLastBlance;
	}

	public Double getAnnualAdd() {
		return annualAdd;
	}

	public void setAnnualAdd(Double annualAdd) {
		this.annualAdd = annualAdd;
	}

	public Double getAnnualSub() {
		return annualSub;
	}

	public void setAnnualSub(Double annualSub) {
		this.annualSub = annualSub;
	}

	public Double getAnnualBlance() {
		return annualBlance;
	}

	public void setAnnualBlance(Double annualBlance) {
		this.annualBlance = annualBlance;
	}

	public Double getTakeoffLastBlance() {
		return takeoffLastBlance;
	}

	public void setTakeoffLastBlance(Double takeoffLastBlance) {
		this.takeoffLastBlance = takeoffLastBlance;
	}

	public Double getTakeoffAdd() {
		return takeoffAdd;
	}

	public void setTakeoffAdd(Double takeoffAdd) {
		this.takeoffAdd = takeoffAdd;
	}

	public Double getTakeoffSub() {
		return takeoffSub;
	}

	public void setTakeoffSub(Double takeoffSub) {
		this.takeoffSub = takeoffSub;
	}

	public Double getTakeoffBlance() {
		return takeoffBlance;
	}

	public void setTakeoffBlance(Double takeoffBlance) {
		this.takeoffBlance = takeoffBlance;
	}

	public String getMonth() {
		return month;
	}

	public void setMonth(String month) {
		this.month = month;
	}
}
