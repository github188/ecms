package com.ecaray.ecms.entity.crm.Vo;

import java.util.List;

/**
 * com.ecaray.ecms.entity.crm.Vo
 * Author ：zhxy
 * 2017/5/14 18:33
 * 说明：商机查询
 */
public class OppQueryFilter {

    private String name;//商机名称 模糊查询

    private String clientId;

    private String clientName;//客户名称 模糊查询

	private String keeperId;

    private String keeperName;//负责人名称 模糊查询

    private String regionId;//片区

    private String intItemsId;//意向项目

    private String coModeId; //合作模式

    private String saleStageId;//销售阶段\

    private int isMyKeeper =2;//是否是我负责的客户 1是 其他（2）否

    private List<String> keepers; //如果是的话,则选择当前用户的所有下级包括下级的下级
    
    private long lastFlowTime; //最后跟进时间

    private int pageNum;

    private int pageSize;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getClientId() {
        return clientId;
    }

    public void setClientId(String clientId) {
        this.clientId = clientId;
    }

    public String getClientName() {
        return clientName;
    }

    public void setClientName(String clientName) {
        this.clientName = clientName;
    }

    public String getKeeperId() {
        return keeperId;
    }

    public void setKeeperId(String keeperId) {
        this.keeperId = keeperId;
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

    public String getIntItemsId() {
        return intItemsId;
    }

    public void setIntItemsId(String intItemsId) {
        this.intItemsId = intItemsId;
    }

    public String getCoModeId() {
        return coModeId;
    }

    public void setCoModeId(String coModeId) {
        this.coModeId = coModeId;
    }

    public String getSaleStageId() {
        return saleStageId;
    }

    public void setSaleStageId(String saleStageId) {
        this.saleStageId = saleStageId;
    }

    public int getIsMyKeeper() {
        return isMyKeeper;
    }

    public void setIsMyKeeper(int isMyKeeper) {
        this.isMyKeeper = isMyKeeper;
    }

    public List<String> getKeepers() {
        return keepers;
    }

    public void setKeepers(List<String> keepers) {
        this.keepers = keepers;
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
    
    public long getLastFlowTime() {
		return lastFlowTime;
	}

	public void setLastFlowTime(long lastFlowTime) {
		this.lastFlowTime = lastFlowTime;
	}
}
