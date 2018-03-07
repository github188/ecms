package com.ecaray.ecms.entity.pmo;

public class PmoFlowMsg {
    private String id;

    private String nodeId;

    private String nodeName;

    private String operPerson;

    private String operPersonName;

    private long addTime;

    private long updateTime;

    private String opinionContent;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id == null ? null : id.trim();
    }

    public String getNodeId() {
        return nodeId;
    }

    public void setNodeId(String nodeId) {
        this.nodeId = nodeId == null ? null : nodeId.trim();
    }

    public String getNodeName() {
        return nodeName;
    }

    public void setNodeName(String nodeName) {
        this.nodeName = nodeName == null ? null : nodeName.trim();
    }

    public String getOperPerson() {
        return operPerson;
    }

    public void setOperPerson(String operPerson) {
        this.operPerson = operPerson == null ? null : operPerson.trim();
    }

    public String getOperPersonName() {
        return operPersonName;
    }

    public void setOperPersonName(String operPersonName) {
        this.operPersonName = operPersonName == null ? null : operPersonName.trim();
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

    public String getOpinionContent() {
        return opinionContent;
    }

    public void setOpinionContent(String opinionContent) {
        this.opinionContent = opinionContent == null ? null : opinionContent.trim();
    }
}