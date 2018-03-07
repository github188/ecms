package com.ecaray.ecms.entity.pmo.Vo;

import com.ecaray.ecms.commons.utils.ExcelRows;

/**
 * com.ecaray.imspmo.entity.Vo
 * Author ：zhxy
 * 2017/4/9 23:54
 * 说明：TODO
 */
public class PmoRequireQueryVo {
    @ExcelRows(index = 0,remark = "需求名称")
    private String  reqTitle;
    @ExcelRows(index = 1,remark = "项目名称")
    private String  proName;
    @ExcelRows(index = 2,remark = "发起人")
    private String  addPersonName;
    @ExcelRows(index = 3,remark = "发起时间")
    private String startTime;
    @ExcelRows(index = 4,remark = "需求接收人")
    private String  receivePersonName;
    @ExcelRows(index = 5,remark = "是否紧急")
    private String  reqEmergency;
    private String  projectId;
    private String  requireId;
    private String  proCode;
    private String  actId;
    @ExcelRows(index = 6,remark = "需求状态")
    private String  actName;
    private String  addPersonId;
    private String  receivePersonId;
    private String reqCode;//需求编码


    public String getProjectId() {
        return projectId;
    }

    public void setProjectId(String projectId) {
        this.projectId = projectId;
    }

    public String getRequireId() {
        return requireId;
    }

    public void setRequireId(String requireId) {
        this.requireId = requireId;
    }

    public String getProCode() {
        return proCode;
    }

    public void setProCode(String proCode) {
        this.proCode = proCode;
    }

    public String getReqTitle() {
        return reqTitle;
    }

    public void setReqTitle(String reqTitle) {
        this.reqTitle = reqTitle;
    }

    public String getReqEmergency() {
        return reqEmergency;
    }

    public void setReqEmergency(String reqEmergency) {
        this.reqEmergency = reqEmergency;
    }

    public String getProName() {
        return proName;
    }

    public void setProName(String proName) {
        this.proName = proName;
    }

    public String getActId() {
        return actId;
    }

    public void setActId(String actId) {
        this.actId = actId;
    }

    public String getActName() {
        return actName;
    }

    public void setActName(String actName) {
        this.actName = actName;
    }

    public String getAddPersonId() {
        return addPersonId;
    }

    public void setAddPersonId(String addPersonId) {
        this.addPersonId = addPersonId;
    }

    public String getAddPersonName() {
        return addPersonName;
    }

    public void setAddPersonName(String addPersonName) {
        this.addPersonName = addPersonName;
    }

    public String getReceivePersonId() {
        return receivePersonId;
    }

    public void setReceivePersonId(String receivePersonId) {
        this.receivePersonId = receivePersonId;
    }

    public String getReceivePersonName() {
        return receivePersonName;
    }

    public void setReceivePersonName(String receivePersonName) {
        this.receivePersonName = receivePersonName;
    }

    public String getStartTime() {
        return startTime;
    }

    public void setStartTime(String startTime) {
        this.startTime = startTime;
    }

    public String getReqCode() {
        return reqCode;
    }

    public void setReqCode(String reqCode) {
        this.reqCode = reqCode;
    }
}
