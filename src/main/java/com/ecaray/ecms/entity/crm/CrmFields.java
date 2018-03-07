package com.ecaray.ecms.entity.crm;

import java.io.Serializable;

public class CrmFields implements Serializable {


    private String id;

    private String code;

    private String name;

    private String belongCode;

    private String belongName;

    private String belongGroup;

    private String addPerson;

    private Long addTime;


    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id == null ? null : id.trim();
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code == null ? null : code.trim();
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name == null ? null : name.trim();
    }

    public String getBelongCode() {
        return belongCode;
    }

    public void setBelongCode(String belongCode) {
        this.belongCode = belongCode == null ? null : belongCode.trim();
    }

    public String getBelongName() {
        return belongName;
    }

    public void setBelongName(String belongName) {
        this.belongName = belongName == null ? null : belongName.trim();
    }

    public String getBelongGroup() {
        return belongGroup;
    }

    public void setBelongGroup(String belongGroup) {
        this.belongGroup = belongGroup == null ? null : belongGroup.trim();
    }

    public String getAddPerson() {
        return addPerson;
    }

    public void setAddPerson(String addPerson) {
        this.addPerson = addPerson == null ? null : addPerson.trim();
    }

    public Long getAddTime() {
        return addTime;
    }

    public void setAddTime(Long addTime) {
        this.addTime = addTime;
    }
}