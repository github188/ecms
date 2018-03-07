package com.ecaray.ecms.entity.cwa;

public class CwaHolidayBlance {
    private String userId;

    private String month;

    private Double annualBlance;

    private Double takeoffBlance;

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId == null ? null : userId.trim();
    }

    public String getMonth() {
        return month;
    }

    public void setMonth(String month) {
        this.month = month == null ? null : month.trim();
    }

    public Double getAnnualBlance() {
        return annualBlance;
    }

    public void setAnnualBlance(Double annualBlance) {
        this.annualBlance = annualBlance;
    }

    public Double getTakeoffBlance() {
        return takeoffBlance;
    }

    public void setTakeoffBlance(Double takeoffBlance) {
        this.takeoffBlance = takeoffBlance;
    }
}