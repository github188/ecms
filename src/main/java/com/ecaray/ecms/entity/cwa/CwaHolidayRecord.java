package com.ecaray.ecms.entity.cwa;

public class CwaHolidayRecord {
    private String id;

    private String userId;

    private String date;

    private Integer type;

    private Double addnum;

    private Double subnum;

    private Double blance;

    private Long addTime;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id == null ? null : id.trim();
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId == null ? null : userId.trim();
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date == null ? null : date.trim();
    }

    public Integer getType() {
        return type;
    }

    public void setType(Integer type) {
        this.type = type;
    }

    public Double getAddnum() {
		return addnum;
	}

	public void setAddnum(Double addnum) {
		this.addnum = addnum;
	}

	public Double getSubnum() {
		return subnum;
	}

	public void setSubnum(Double subnum) {
		this.subnum = subnum;
	}

	public Double getBlance() {
        return blance;
    }

    public void setBlance(Double blance) {
        this.blance = blance;
    }

    public Long getAddTime() {
        return addTime;
    }

    public void setAddTime(Long addTime) {
        this.addTime = addTime;
    }
}