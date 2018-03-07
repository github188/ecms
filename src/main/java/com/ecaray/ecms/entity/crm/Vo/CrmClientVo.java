package com.ecaray.ecms.entity.crm.Vo;

import com.ecaray.ecms.entity.crm.CrmClient;


/**
 * com.ecaray.ecms.entity.crm.Vo
 * Author ：zhxy
 * 2017/5/12 21:04
 * 说明：
 */
public class CrmClientVo extends CrmClient{

    private String regionName;

    private String clientTypeName;

    private String clientStatusName;

    private String dealStatusName;

    private String clientLevelName;

    private String coAreaName;

    private String coModeName;

    private Integer oppCount = 0;

    private Integer contactsCount = 0;

    private Integer followCount = 0;


    public String getRegionName() {
        return regionName;
    }

    public void setRegionName(String regionName) {
        this.regionName = regionName;
    }

    public String getClientTypeName() {
        return clientTypeName;
    }

    public void setClientTypeName(String clientTypeName) {
        this.clientTypeName = clientTypeName;
    }

    public String getClientStatusName() {
        return clientStatusName;
    }

    public void setClientStatusName(String clientStatusName) {
        this.clientStatusName = clientStatusName;
    }

    public String getDealStatusName() {
        return dealStatusName;
    }

    public void setDealStatusName(String dealStatusName) {
        this.dealStatusName = dealStatusName;
    }

    public String getClientLevelName() {
        return clientLevelName;
    }

    public void setClientLevelName(String clientLevelName) {
        this.clientLevelName = clientLevelName;
    }

    public String getCoAreaName() {
        return coAreaName;
    }

    public void setCoAreaName(String coAreaName) {
        this.coAreaName = coAreaName;
    }

    public String getCoModeName() {
        return coModeName;
    }

    public void setCoModeName(String coModeName) {
        this.coModeName = coModeName;
    }

    public Integer getOppCount() {
        return oppCount;
    }

    public void setOppCount(Integer oppCount) {
        this.oppCount = oppCount;
    }

    public Integer getContactsCount() {
        return contactsCount;
    }

    public void setContactsCount(Integer contactsCount) {
        this.contactsCount = contactsCount;
    }

    public Integer getFollowCount() {
        return followCount;
    }

    public void setFollowCount(Integer followCount) {
        this.followCount = followCount;
    }
}
