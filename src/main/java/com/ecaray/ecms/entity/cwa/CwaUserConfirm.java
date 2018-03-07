package com.ecaray.ecms.entity.cwa;

import com.ecaray.ecms.entity.process.ProcessBase;

public class CwaUserConfirm extends ProcessBase{

    private String month;
    
    private Integer processType = 11;

	public String getMonth() {
		return month;
	}

	public void setMonth(String month) {
		this.month = month;
	}

	public Integer getProcessType() {
		return processType;
	}

	public void setProcessType(Integer processType) {
		this.processType = processType;
	}
}