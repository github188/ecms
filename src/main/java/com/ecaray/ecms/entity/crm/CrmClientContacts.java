package com.ecaray.ecms.entity.crm;

public class CrmClientContacts {
    private String id;

    private String name;

    private String clientId;

    private String phone;

    private String title;

    private String comments;

    private String addPersonId;

    private String addPersonName;

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

    public String getClientId() {
        return clientId;
    }

    public void setClientId(String clientId) {
        this.clientId = clientId == null ? null : clientId.trim();
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone == null ? null : phone.trim();
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title == null ? null : title.trim();
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

    public String getAddPersonName() {
        return addPersonName;
    }

    public void setAddPersonName(String addPersonName) {
        this.addPersonName = addPersonName == null ? null : addPersonName.trim();
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