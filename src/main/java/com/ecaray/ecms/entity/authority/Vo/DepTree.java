package com.ecaray.ecms.entity.authority.Vo;

public class DepTree {
	 private String id;
	 private String name;
	 private String leaderId;
	 private String parentId;
	 private DepTree parent;
	 
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getLeaderId() {
		return leaderId;
	}
	public void setLeaderId(String leaderId) {
		this.leaderId = leaderId;
	}
	public DepTree getParent() {
		return parent;
	}
	public void setParent(DepTree parent) {
		this.parent = parent;
	}
	public String getParentId() {
		return parentId;
	}
	public void setParentId(String parentId) {
		this.parentId = parentId;
	}
}
