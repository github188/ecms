package com.ecaray.ecms.entity.pmo.Vo;

import com.ecaray.ecms.commons.constant.Constants;
import org.springframework.beans.factory.annotation.Value;

/**
 * com.ecaray.imspmo.entity.query
 * Author ：zhxy
 * 2017/4/6 0:22
 * 说明：
 */
public class RequireQueryFilter {

    /**项目编码，项目名称*/
    private String proInfo;
    /**营销中心ID*/
    private String marktId;
    /**添加人名称*/
    private String addPerson;
    /**接收人名称*/
    private String receivePerson;
    /**是否紧急*/
    private String reqEmergency;
    /**添加时间*/
    private String startTime;
    /**结束时间*/
    private String endTime;
    /**流程ID*/
    private String actId;
    /**pageNum*/
    @Value("${query.pageNum}")
    private int pageNum;
    /**pageSize*/
    @Value("${query.pageSize}")
    private int pageSize;
    /**查询范围*/
    private int scope  = Constants.QUREY_REQUIRE_SCOPE_ALL;//1 all  2 我提出的  3 我待办的

    private String curUserId;
    /**待办事项*/
    private String todoUserId;
    /**我提出的*/
    private String addUserId;

    private String authorization;

    public String getProInfo() {
        return proInfo;
    }

    public void setProInfo(String proInfo) {
        this.proInfo = proInfo;
    }

    public String getMarktId() {
        return marktId;
    }

    public void setMarktId(String marktId) {
        this.marktId = marktId;
    }

    public String getAddPerson() {
        return addPerson;
    }

    public void setAddPerson(String addPerson) {
        this.addPerson = addPerson;
    }

    public String getReceivePerson() {
        return receivePerson;
    }

    public void setReceivePerson(String receivePerson) {
        this.receivePerson = receivePerson;
    }

    public String getReqEmergency() {
        return reqEmergency;
    }

    public void setReqEmergency(String reqEmergency) {
        this.reqEmergency = reqEmergency;
    }

    public String getStartTime() {
        return startTime;
    }

    public void setStartTime(String startTime) {
        this.startTime = startTime;
    }

    public String getEndTime() {
        return endTime;
    }

    public void setEndTime(String endTime) {
        this.endTime = endTime;
    }

    public String getActId() {
        return actId;
    }

    public void setActId(String actId) {
        this.actId = actId;
    }

    public int getPageNum() {
        return pageNum;
    }

    public void setPageNum(int pageNum) {
        this.pageNum = pageNum;
    }

    public int getPageSize() {
        return pageSize;
    }

    public void setPageSize(int pageSize) {
        this.pageSize = pageSize;
    }

    public int getScope() {
        return scope;
    }

    public void setScope(int scope) {
        this.scope = scope;
    }

    public String getTodoUserId() {
        return todoUserId;
    }

    public void setTodoUserId(String todoUserId) {
        this.todoUserId = todoUserId;
    }

    public String getAddUserId() {
        return addUserId;
    }

    public void setAddUserId(String addUserId) {
        this.addUserId = addUserId;
    }

    public String getCurUserId() {
        return curUserId;
    }

    public void setCurUserId(String curUserId) {
        this.curUserId = curUserId;
    }

    public String getAuthorization() {
        return authorization;
    }

    public void setAuthorization(String authorization) {
        this.authorization = authorization;
    }

    @Override
    public String toString() {
        return "RequireQueryFilter{" +
                "proInfo='" + proInfo + '\'' +
                ", authorization='" + authorization + '\'' +
                ", addUserId='" + addUserId + '\'' +
                ", todoUserId='" + todoUserId + '\'' +
                ", curUserId='" + curUserId + '\'' +
                ", scope=" + scope +
                ", marktId='" + marktId + '\'' +
                ", reqEmergency='" + reqEmergency + '\'' +
                ", receivePerson='" + receivePerson + '\'' +
                ", addPerson='" + addPerson + '\'' +
                ", startTime='" + startTime + '\'' +
                ", endTime='" + endTime + '\'' +
                ", actId='" + actId + '\'' +
                '}';
    }
}
