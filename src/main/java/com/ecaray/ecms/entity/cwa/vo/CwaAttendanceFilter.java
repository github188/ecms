package com.ecaray.ecms.entity.cwa.vo;

import java.util.List;

public class CwaAttendanceFilter {
	private String month;
	
	private String depId;
	
	private String name;
	
	private List<String> depIdList;
	
	private Integer pageNum = 1;
	
	private Integer pageSize = 10;
	
	private Integer isPage = 1;
	
	private String userId;
	
	private Integer status;
	
	public String getMonth() {
		return month;
	}

	public void setMonth(String month) {
		this.month = month;
	}

	public String getDepId() {
		return depId;
	}

	public void setDepId(String depId) {
		this.depId = depId;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public List<String> getDepIdList() {
		return depIdList;
	}

	public void setDepIdList(List<String> depIdList) {
		this.depIdList = depIdList;
	}

	public Integer getPageNum() {
		return pageNum;
	}

	public void setPageNum(Integer pageNum) {
		this.pageNum = pageNum;
	}

	public Integer getPageSize() {
		return pageSize;
	}

	public void setPageSize(Integer pageSize) {
		this.pageSize = pageSize;
	}

	public Integer getIsPage() {
		return isPage;
	}

	public void setIsPage(Integer isPage) {
		this.isPage = isPage;
	}

	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	public Integer getStatus() {
		return status;
	}

	public void setStatus(Integer status) {
		this.status = status;
	}
}
