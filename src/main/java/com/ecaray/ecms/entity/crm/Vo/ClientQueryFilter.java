package com.ecaray.ecms.entity.crm.Vo;

import java.util.List;

/**
 * com.ecaray.ecms.entity.crm.Vo
 * Author ：zhxy
 * 2017/5/13 16:47
 * 说明：客户列表查询条件
 */
public class ClientQueryFilter {
    private String clientName;//模糊搜索 客户名字

    private String keeperName;//模糊搜索 负责人

    private String keeperId;//负责人Id

    private String regionId;// 片区

    private String clientTypeId;//客户类型

    private String clientStatusId;//客户状态

    private String dealStatusId;//成交状态

    private String clientLevelId;//客户级别

    private String coAreaId;//合作领域

    private String coModeId;//合作模式

    private int isMyKeeper =2;//是否是我负责的客户 1是 其他（2）否

    private List<String> keepers; //如果是的话,则选择当前用户的所有下级包括下级的下级

    private int pageNum;

    private int pageSize;

    public String getClientName() {
        return clientName;
    }

    public void setClientName(String clientName) {
        this.clientName = clientName;
    }

    public String getKeeperName() {
        return keeperName;
    }

    public void setKeeperName(String keeperName) {
        this.keeperName = keeperName;
    }

    public String getRegionId() {
        return regionId;
    }

    public void setRegionId(String regionId) {
        this.regionId = regionId;
    }

    public String getClientTypeId() {
        return clientTypeId;
    }

    public void setClientTypeId(String clientTypeId) {
        this.clientTypeId = clientTypeId;
    }

    public String getClientStatusId() {
        return clientStatusId;
    }

    public void setClientStatusId(String clientStatusId) {
        this.clientStatusId = clientStatusId;
    }

    public String getDealStatusId() {
        return dealStatusId;
    }

    public void setDealStatusId(String dealStatusId) {
        this.dealStatusId = dealStatusId;
    }

    public String getClientLevelId() {
        return clientLevelId;
    }

    public void setClientLevelId(String clientLevelId) {
        this.clientLevelId = clientLevelId;
    }

    public String getCoAreaId() {
        return coAreaId;
    }

    public void setCoAreaId(String coAreaId) {
        this.coAreaId = coAreaId;
    }

    public String getCoModeId() {
        return coModeId;
    }

    public void setCoModeId(String coModeId) {
        this.coModeId = coModeId;
    }

    public String getKeeperId() {
        return keeperId;
    }

    public void setKeeperId(String keeperId) {
        this.keeperId = keeperId;
    }

    public int getIsMyKeeper() {
        return isMyKeeper;
    }

    public void setIsMyKeeper(int isMyKeeper) {
        this.isMyKeeper = isMyKeeper;
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

    public List<String> getKeepers() {
        return keepers;
    }

    public void setKeepers(List<String> keepers) {
        this.keepers = keepers;
    }
}
