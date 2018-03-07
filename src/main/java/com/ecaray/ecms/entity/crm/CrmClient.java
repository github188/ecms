package com.ecaray.ecms.entity.crm;

public class CrmClient {
    private String id;

    private String name;

    private String contactsId;

    private String contactsName;

    private String contactsPhone;

    private String keeperId;

    private String keeperName;

    private String regionId;

    private String clientTypeId;

    private String clientStatusId;

    private String dealStatusId;

    private String clientLevelId;

    private String coAreaId;

    private String coModeId;

    private String comments;

    private Long lastFlowTime;

    private String address;

    private String addPersonId;

    private Long addTime;

    private Long updateTime;

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

    public String getContactsId() {
        return contactsId;
    }

    public void setContactsId(String contactsId) {
        this.contactsId = contactsId == null ? null : contactsId.trim();
    }

    public String getContactsName() {
        return contactsName;
    }

    public void setContactsName(String contactsName) {
        this.contactsName = contactsName == null ? null : contactsName.trim();
    }

    public String getContactsPhone() {
        return contactsPhone;
    }

    public void setContactsPhone(String contactsPhone) {
        this.contactsPhone = contactsPhone == null ? null : contactsPhone.trim();
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

    public String getClientTypeId() {
        return clientTypeId;
    }

    public void setClientTypeId(String clientTypeId) {
        this.clientTypeId = clientTypeId == null ? null : clientTypeId.trim();
    }

    public String getClientStatusId() {
        return clientStatusId;
    }

    public void setClientStatusId(String clientStatusId) {
        this.clientStatusId = clientStatusId == null ? null : clientStatusId.trim();
    }

    public String getDealStatusId() {
        return dealStatusId;
    }

    public void setDealStatusId(String dealStatusId) {
        this.dealStatusId = dealStatusId == null ? null : dealStatusId.trim();
    }

    public String getClientLevelId() {
        return clientLevelId;
    }

    public void setClientLevelId(String clientLevelId) {
        this.clientLevelId = clientLevelId == null ? null : clientLevelId.trim();
    }

    public String getCoAreaId() {
        return coAreaId;
    }

    public void setCoAreaId(String coAreaId) {
        this.coAreaId = coAreaId == null ? null : coAreaId.trim();
    }

    public String getCoModeId() {
        return coModeId;
    }

    public void setCoModeId(String coModeId) {
        this.coModeId = coModeId == null ? null : coModeId.trim();
    }

    public String getComments() {
        return comments;
    }

    public void setComments(String comments) {
        this.comments = comments == null ? null : comments.trim();
    }

    public Long getLastFlowTime() {
        return lastFlowTime;
    }

    public void setLastFlowTime(Long lastFlowTime) {
        this.lastFlowTime = lastFlowTime;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address == null ? null : address.trim();
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
}