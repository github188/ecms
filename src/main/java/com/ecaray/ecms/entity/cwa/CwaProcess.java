package com.ecaray.ecms.entity.cwa;

public interface CwaProcess {
	String getId();
	
	Integer getType();
	
	Long getStartTime();
	
	Long getEndTime();
	
	Double getTimeLength();
	
	String getUserId();
	
	Integer getStatus();
	
	Integer getProcessType();
}
