package com.ecaray.ecms.entity.pmo.Vo;

import com.ecaray.ecms.commons.utils.ExcelRows;
import org.springframework.format.annotation.DateTimeFormat;

import java.text.SimpleDateFormat;
import java.util.Date;

/**
 * com.ecaray.imspmo.entity.Vo
 * Author ：zhxy
 * 2017/4/16 20:39
 * 说明：TODO
 */
public class PmoProjectQueryVo{
    private String id;

    @ExcelRows(index = 4,remark = "项目编号")
    private String proCode;

    @ExcelRows(index = 5,remark = "项目名称")
    private String proName;

    private String marktId;

    @ExcelRows(index = 0,remark = "营销中心")
    private String marktName;

    @DateTimeFormat(pattern="yyyy-MM-dd")
    @ExcelRows(index = 7,remark = "立项日期")
    private String proDate;

    private int proStatus;

    private String provinceId;

    @ExcelRows(index = 1,remark = "省份")
    private String province;

    private String cityId;

    @ExcelRows(index = 2,remark = "城市")
    private String city;

    private String areaId;

    @ExcelRows(index = 3,remark = "区/县")
    private String area;


    private long addTime;

    private String marktPersonId;

    private String marktPersonName;

    private String managePersonId;

    @ExcelRows(index = 6,remark = "项目经理")
    private String managePersonName;

    private long updateTime;

    private String proContents;
    @ExcelRows(index = 9,remark = "需求")
    private int requireCount=0;

    @ExcelRows(index = 10,remark = "新任务")
    private int taskCount;

    @ExcelRows(index = 8,remark = "项目状态")
    private String proStatusName;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getProCode() {
        return proCode;
    }

    public void setProCode(String proCode) {
        this.proCode = proCode;
    }

    public String getProName() {
        return proName;
    }

    public void setProName(String proName) {
        this.proName = proName;
    }

    public String getMarktId() {
        return marktId;
    }

    public void setMarktId(String marktId) {
        this.marktId = marktId;
    }

    public String getMarktName() {
        return marktName;
    }

    public void setMarktName(String marktName) {
        this.marktName = marktName;
    }

    public String getProDate() {
        return proDate;
    }

    public void setProDate(String proDate) {
        this.proDate =proDate;
    }

    public int getProStatus() {
        return proStatus;
    }

    public void setProStatus(int proStatus) {
        this.proStatus = proStatus;
    }

    public String getProvinceId() {
        return provinceId;
    }

    public void setProvinceId(String provinceId) {
        this.provinceId = provinceId;
    }

    public String getProvince() {
        return province;
    }

    public void setProvince(String province) {
        this.province = province;
    }

    public String getCityId() {
        return cityId;
    }

    public void setCityId(String cityId) {
        this.cityId = cityId;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getAreaId() {
        return areaId;
    }

    public void setAreaId(String areaId) {
        this.areaId = areaId;
    }

    public String getArea() {
        return area;
    }

    public void setArea(String area) {
        this.area = area;
    }

    public long getAddTime() {
        return addTime;
    }

    public void setAddTime(long addTime) {
        this.addTime = addTime;
    }

    public String getMarktPersonId() {
        return marktPersonId;
    }

    public void setMarktPersonId(String marktPersonId) {
        this.marktPersonId = marktPersonId;
    }

    public String getMarktPersonName() {
        return marktPersonName;
    }

    public void setMarktPersonName(String marktPersonName) {
        this.marktPersonName = marktPersonName;
    }

    public String getManagePersonId() {
        return managePersonId;
    }

    public void setManagePersonId(String managePersonId) {
        this.managePersonId = managePersonId;
    }

    public String getManagePersonName() {
        return managePersonName;
    }

    public void setManagePersonName(String managePersonName) {
        this.managePersonName = managePersonName;
    }

    public long getUpdateTime() {
        return updateTime;
    }

    public void setUpdateTime(long updateTime) {
        this.updateTime = updateTime;
    }

    public String getProContents() {
        return proContents;
    }

    public void setProContents(String proContents) {
        this.proContents = proContents;
    }

    public int getRequireCount() {
        return requireCount;
    }

    public void setRequireCount(int requireCount) {
        this.requireCount = requireCount;
    }

    public int getTaskCount() {
        return taskCount;
    }

    public void setTaskCount(int taskCount) {
        this.taskCount = taskCount;
    }

    public String getProStatusName() {
       // 项目状态（1已立项2跟进中3结项）

        switch (getProStatus()) {
            case 1:this.proStatusName = "已立项"; break;
            case 2:this.proStatusName = "跟进中"; break;
            case 3:this.proStatusName = "已结项"; break;
            default: break;
        }
        return proStatusName;
    }

    public void setProStatusName(String proStatusName) {
        this.proStatusName = proStatusName;
    }
}
