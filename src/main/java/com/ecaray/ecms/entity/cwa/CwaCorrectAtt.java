package com.ecaray.ecms.entity.cwa;

public class CwaCorrectAtt {
    private String cId;

    private String cwaId;

    public String getcId() {
        return cId;
    }

    public void setcId(String cId) {
        this.cId = cId == null ? null : cId.trim();
    }

    public String getCwaId() {
        return cwaId;
    }

    public void setCwaId(String cwaId) {
        this.cwaId = cwaId == null ? null : cwaId.trim();
    }
}