package com.ecaray.ecms.entity.authority.Vo;

/**
 * com.ecaray.authority.entity.Vo
 * Author ：zhxy
 * 2017/4/23 21:38
 * 说明：菜单 按钮权限查询
 */
public class ResourceQueryFilter {
    private String name;
    private String type;
    private String appId;
    private String parentId;
    private int pageNum;
    private int pageSize;


    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getAppId() {
        return appId;
    }

    public void setAppId(String appId) {
        this.appId = appId;
    }

    public int getPageSize() {
        return pageSize;
    }

    public void setPageSize(int pageSize) {
        this.pageSize = pageSize;
    }

    public int getPageNum() {
        return pageNum;
    }

    public void setPageNum(int pageNum) {
        this.pageNum = pageNum;
    }

    public String getParentId() {
        return parentId;
    }

    public void setParentId(String parentId) {
        this.parentId = parentId;
    }
}
