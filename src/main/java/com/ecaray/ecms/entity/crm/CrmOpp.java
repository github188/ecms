package com.ecaray.ecms.entity.crm;

public class CrmOpp {
    private String id;

    private String name;

    private String clientId;

    private String clientName;

    private String keeperId;

    private String keeperName;

    private String regionId;

    private String intItemsId;

    private String coModeId;

    private String saleStageId;

    private Double advanceSales;

    private Long dealDate;

    private String comments;

    private String addPersonId;

    private Long addTime;

    private Long updateTime;

    private Long lastFlowTime;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id == null ? null : id.trim();
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name == null ? null : name.trim();
    }

    public String getClientId() {
        return clientId;
    }

    public void setClientId(String clientId) {
        this.clientId = clientId == null ? null : clientId.trim();
    }

    public String getClientName() {
        return clientName;
    }

    public void setClientName(String clientName) {
        this.clientName = clientName == null ? null : clientName.trim();
    }

    public String getKeeperId() {
        return keeperId;
    }

    public void setKeeperId(String keeperId) {
        this.keeperId = keeperId == null ? null : keeperId.trim();
    }

    public String getKeeperName() {
        return keeperName;
    }

    public void setKeeperName(String keeperName) {
        this.keeperName = keeperName == null ? null : keeperName.trim();
    }

    public String getRegionId() {
        return regionId;
    }

    public void setRegionId(String regionId) {
        this.regionId = regionId == null ? null : regionId.trim();
    }

    public String getIntItemsId() {
        return intItemsId;
    }

    public void setIntItemsId(String intItemsId) {
        this.intItemsId = intItemsId == null ? null : intItemsId.trim();
    }

    public String getCoModeId() {
        return coModeId;
    }

    public void setCoModeId(String coModeId) {
        this.coModeId = coModeId == null ? null : coModeId.trim();
    }

    public String getSaleStageId() {
        return saleStageId;
    }

    public void setSaleStageId(String saleStageId) {
        this.saleStageId = saleStageId == null ? null : saleStageId.trim();
    }

    public Double getAdvanceSales() {
        return advanceSales;
    }

    public void setAdvanceSales(Double advanceSales) {
        this.advanceSales = advanceSales;
    }

    public Long getDealDate() {
        return dealDate;
    }

    public void setDealDate(Long dealDate) {
        this.dealDate = dealDate;
    }

    public String getComments() {
        return comments;
    }

    public void setComments(String comments) {
        this.comments = comments == null ? null : comments.trim();
    }

    public String getAddPersonId() {
        return addPersonId;
    }

    public void setAddPersonId(String addPersonId) {
        this.addPersonId = addPersonId == null ? null : addPersonId.trim();
    }

    public Long getAddTime() {
        return addTime;
    }

    public void setAddTime(Long addTime) {
        this.addTime = addTime;
    }

    public Long getUpdateTime() {
        return updateTime;
    }

    public void setUpdateTime(Long updateTime) {
        this.updateTime = updateTime;
    }

    public Long getLastFlowTime() {
        return lastFlowTime;
    }

    public void setLastFlowTime(Long lastFlowTime) {
        this.lastFlowTime = lastFlowTime;
    }
}