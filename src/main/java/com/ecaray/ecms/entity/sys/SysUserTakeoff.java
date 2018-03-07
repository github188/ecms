package com.ecaray.ecms.entity.sys;

public class SysUserTakeoff {
    private String userId;

    private Double takeoff;

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId == null ? null : userId.trim();
    }

    public Double getTakeoff() {
        return takeoff;
    }

    public void setTakeoff(Double takeoff) {
        this.takeoff = takeoff;
    }
}