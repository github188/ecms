package com.ecaray.ecms.entity.process;

import java.util.List;

import com.ecaray.ecms.entity.news.PortalFiles;

public class ProcessBase{
	
	public String id;
	
	public String title;
	
	public String userId;

	private Integer pType; 
	
	public Integer processType;
	
	public Integer status;
	
	public Long addTime;

	public Long updateTime;
	
	public String userName;
	
	public List<PortalFiles> files;
	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	public Integer getProcessType() {
		return this.processType;
	}

	public void setStatus(Integer status) {
		this.status = status;
	}
	public Integer getStatus() {
		return status;
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

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public List<PortalFiles> getFiles() {
		return files;
	}

	public void setFiles(List<PortalFiles> files) {
		this.files = files;
	}
	
	public void setProcessType(Integer processType) {
		this.processType = processType;
	}

	public Integer getpType() {
		return pType;
	}

	public void setpType(Integer pType) {
		this.pType = pType;
	}
}
