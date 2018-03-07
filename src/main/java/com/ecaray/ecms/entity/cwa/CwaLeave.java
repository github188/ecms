package com.ecaray.ecms.entity.cwa;

import com.ecaray.ecms.entity.process.ProcessBase;

public class CwaLeave extends ProcessBase implements CwaProcess {

	private int processType = 1;

	private Integer type;

	private String userName;

	private Long startTime;

	private Long endTime;

	private Double timeLength;

	private String agentId;

	private String agentName;

	private String reason;

	private String addUser;

	public Integer getType() {
		return type;
	}

	public void setType(Integer type) {
		this.type = type;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String salesmanName) {
		this.userName = salesmanName;
	}

	public Long getStartTime() {
		return startTime;
	}

	public void setStartTime(Long startTime) {
		this.startTime = startTime;
	}

	public Long getEndTime() {
		return endTime;
	}

	public void setEndTime(Long endTime) {
		this.endTime = endTime;
	}

	public Double getTimeLength() {
		return timeLength;
	}

	public void setTimeLength(Double timeLength) {
		this.timeLength = timeLength;
	}

	public String getAgentId() {
		return agentId;
	}

	public void setAgentId(String agentId) {
		this.agentId = agentId;
	}

	public String getAgentName() {
		return agentName;
	}

	public void setAgentName(String agentName) {
		this.agentName = agentName;
	}

	public String getReason() {
		return reason;
	}

	public void setReason(String reason) {
		this.reason = reason;
	}

	public String getAddUser() {
		return addUser;
	}

	public void setAddUser(String addUser) {
		this.addUser = addUser;
	}

	public Integer getProcessType() {
		return processType;
	}

	public void setProcessType(int processType) {
		this.processType = processType;
	}
}