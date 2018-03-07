package com.ecaray.ecms.entity.crm;

public class CrmFollow {
    private String id;

    private String clientId;

    private String oppId;

    private String personId;

    private String personName;

    private String followModeId;

    private String followModeName;

    private String comments;

    private String nextPlan;

    private String addPersonId;

    private String addPersonName;

    private Long followTime;

    private Long addTime;

    private Long updateTime;

    private Integer comCount = 0;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id == null ? null : id.trim();
    }

    public String getClientId() {
        return clientId;
    }

    public void setClientId(String clientId) {
        this.clientId = clientId == null ? null : clientId.trim();
    }

    public String getOppId() {
        return oppId;
    }

    public void setOppId(String oppId) {
        this.oppId = oppId == null ? null : oppId.trim();
    }

    public String getPersonId() {
        return personId;
    }

    public void setPersonId(String personId) {
        this.personId = personId == null ? null : personId.trim();
    }

    public String getPersonName() {
        return personName;
    }

    public void setPersonName(String personName) {
        this.personName = personName == null ? null : personName.trim();
    }

    public String getFollowModeId() {
        return followModeId;
    }

    public void setFollowModeId(String followModeId) {
        this.followModeId = followModeId == null ? null : followModeId.trim();
    }

    public String getComments() {
        return comments;
    }

    public void setComments(String comments) {
        this.comments = comments == null ? null : comments.trim();
    }

    public String getNextPlan() {
        return nextPlan;
    }

    public void setNextPlan(String nextPlan) {
        this.nextPlan = nextPlan == null ? null : nextPlan.trim();
    }

    public String getAddPersonId() {
        return addPersonId;
    }

    public void setAddPersonId(String addPersonId) {
        this.addPersonId = addPersonId == null ? null : addPersonId.trim();
    }

    public String getAddPersonName() {
        return addPersonName;
    }

    public void setAddPersonName(String addPersonName) {
        this.addPersonName = addPersonName == null ? null : addPersonName.trim();
    }

    public Long getFollowTime() {
        return followTime;
    }

    public void setFollowTime(Long followTime) {
        this.followTime = followTime;
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

    public String getFollowModeName() {
        return followModeName;
    }

    public void setFollowModeName(String followModeName) {
        this.followModeName = followModeName;
    }

    public Integer getComCount() {
        return comCount;
    }

    public void setComCount(Integer comCount) {
        this.comCount = comCount;
    }
}