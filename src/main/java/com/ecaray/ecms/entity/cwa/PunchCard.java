package com.ecaray.ecms.entity.cwa;

public class PunchCard {
	
	private String date;

	private String userId;
	
	private String fristtime;
	
	private String lasttime;

	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	public String getDate() {
		return date;
	}

	public void setDate(String date) {
		this.date = date;
	}

	public String getFristtime() {
		return fristtime;
	}

	public void setFristtime(String fristtime) {
		this.fristtime = fristtime;
	}

	public String getLasttime() {
		return lasttime;
	}

	public void setLasttime(String lasttime) {
		this.lasttime = lasttime;
	}
}
