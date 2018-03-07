package com.ecaray.ecms.entity.cwa;

import com.ecaray.ecms.entity.process.ProcessBase;

public class CwaOutSideDel extends ProcessBase implements CwaProcess{
	
    private String outId;

    private Long startTime;

    private Long endTime;

    private Double timeLength;

    private String address;

    private String reason;
    
    private int processType = 10;
    
    public String getOutId() {
        return outId;
    }

    public void setOutId(String outId) {
        this.outId = outId == null ? null : outId.trim();
    }

    public Long getStartTime() {
        return startTime;
    }

    public void setProcessType(int processType) {
		this.processType = processType;
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

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address == null ? null : address.trim();
    }

    public String getReason() {
        return reason;
    }

    public void setReason(String reason) {
        this.reason = reason == null ? null : reason.trim();
    }

	@Override
	public Integer getType() {
		return processType;
	}

	public Integer getProcessType() {
		return processType;
	}
}