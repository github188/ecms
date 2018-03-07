package com.ecaray.ecms.entity.cwa;

import com.ecaray.ecms.entity.process.ProcessBase;

public class CwaTravel extends ProcessBase implements CwaProcess{

    private Long startTime;

    private Long endTime;

    private Double timeLength;

    private String startAddress;

    private String endAddress;

    private Integer isNeedplane;

    private String planeRemark;

    private String remark;

    private String addUser;
    
    private int processType = 3;

	public Long getStartTime() {
		return startTime;
	}

	public void setStartTime(Long startTime) {
		this.startTime = startTime;
	}

	public Long getEndTime() {
		return endTime;
	}

	public void setProcessType(int processType) {
		this.processType = processType;
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

	public String getStartAddress() {
		return startAddress;
	}

	public void setStartAddress(String startAddress) {
		this.startAddress = startAddress;
	}

	public String getEndAddress() {
		return endAddress;
	}

	public void setEndAddress(String endAddress) {
		this.endAddress = endAddress;
	}

	public Integer getIsNeedplane() {
		return isNeedplane;
	}

	public void setIsNeedplane(Integer isNeedplane) {
		this.isNeedplane = isNeedplane;
	}

	public String getPlaneRemark() {
		return planeRemark;
	}

	public void setPlaneRemark(String planeRemark) {
		this.planeRemark = planeRemark;
	}

	public String getRemark() {
		return remark;
	}

	public void setRemark(String remark) {
		this.remark = remark;
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

	@Override
	public Integer getType() {
		return processType;
	}
}