package com.ecaray.ecms.entity.pmo;

public class PmoRequireTask {
    private String id;

    private String requireId;

    private String taskPerson;

    private String taskPersonName;

    private String taskStatus;//0 未反馈 1已经反馈 2已经过期

    private long startTime;

    private long endTime;

    private long finishTime;

    private long addTime;

    private long updateTime;

    private String fadebackInfo;//反馈信息

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id == null ? null : id.trim();
    }

    public String getRequireId() {
        return requireId;
    }

    public void setRequireId(String requireId) {
        this.requireId = requireId == null ? null : requireId.trim();
    }

    public String getTaskPerson() {
        return taskPerson;
    }

    public void setTaskPerson(String taskPerson) {
        this.taskPerson = taskPerson == null ? null : taskPerson.trim();
    }

    public String getTaskPersonName() {
        return taskPersonName;
    }

    public void setTaskPersonName(String taskPersonName) {
        this.taskPersonName = taskPersonName == null ? null : taskPersonName.trim();
    }

    public String getTaskStatus() {
        return taskStatus;
    }

    public void setTaskStatus(String taskStatus) {
        this.taskStatus = taskStatus == null ? null : taskStatus.trim();
    }

    public long getStartTime() {
        return startTime;
    }

    public void setStartTime(long startTime) {
        this.startTime = startTime;
    }

    public long getEndTime() {
        return endTime;
    }

    public void setEndTime(long endTime) {
        this.endTime = endTime;
    }

    public long getFinishTime() {
        return finishTime;
    }

    public void setFinishTime(long finishTime) {
        this.finishTime = finishTime;
    }

    public long getAddTime() {
        return addTime;
    }

    public void setAddTime(long addTime) {
        this.addTime = addTime;
    }

    public long getUpdateTime() {
        return updateTime;
    }

    public void setUpdateTime(long updateTime) {
        this.updateTime = updateTime;
    }

    public String getFadebackInfo() {
        return fadebackInfo;
    }

    public void setFadebackInfo(String fadebackInfo) {
        this.fadebackInfo = fadebackInfo == null ? null : fadebackInfo.trim();
    }
}