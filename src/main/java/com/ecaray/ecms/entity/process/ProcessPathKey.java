package com.ecaray.ecms.entity.process;

public class ProcessPathKey {
    private Integer processType;

    private String service;

    public Integer getProcessType() {
        return processType;
    }

    public void setProcessType(Integer processType) {
        this.processType = processType;
    }

    public String getService() {
        return service;
    }

    public void setService(String service) {
        this.service = service == null ? null : service.trim();
    }
}