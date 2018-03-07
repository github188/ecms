package com.ecaray.ecms.entity.cwa;

import java.util.List;
import java.util.Map;

import com.ecaray.ecms.entity.process.ProcessBase;

public class CwaCorrect extends ProcessBase{
    private Integer type;

    private Long starttime;

    private Long endtime;

    private Double timeLength;

    private String reason;

    private Integer resultType;

    private String resultId;
    
    private Map<String,Object> map;
    
    private List<ProcessBase> refList;
    
    private List<String> cwaList;
    
    private String typeName;
    
    private Integer processType = 9;
    
	public Integer getType() {
		return type;
	}

	public void setType(Integer type) {
		this.type = type;
	}

	public Long getStarttime() {
		return starttime;
	}

	public void setStarttime(Long starttime) {
		this.starttime = starttime;
	}

	public Long getEndtime() {
		return endtime;
	}

	public void setEndtime(Long endtime) {
		this.endtime = endtime;
	}

	public Double getTimeLength() {
		return timeLength;
	}

	public void setTimeLength(Double timeLength) {
		this.timeLength = timeLength;
	}

	public String getReason() {
		return reason;
	}

	public void setReason(String reason) {
		this.reason = reason;
	}

	public Integer getResultType() {
		return resultType;
	}

	public void setResultType(Integer resultType) {
		this.resultType = resultType;
	}

	public String getResultId() {
		return resultId;
	}

	public void setResultId(String resultId) {
		this.resultId = resultId;
	}
	
	@Override
	public Integer getProcessType() {
		return this.processType;
	}

	public Map<String, Object> getMap() {
		return map;
	}

	public void setMap(Map<String, Object> map) {
		this.map = map;
	}

	public String getTypeName() {
		return typeName;
	}

	public void setTypeName(String typeName) {
		this.typeName = typeName;
	}

	public List<ProcessBase> getRefList() {
		return refList;
	}

	public void setRefList(List<ProcessBase> refList) {
		this.refList = refList;
	}

	public List<String> getCwaList() {
		return cwaList;
	}

	public void setCwaList(List<String> cwaList) {
		this.cwaList = cwaList;
	}
	
}