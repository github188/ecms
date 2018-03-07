package com.ecaray.ecms.entity.authority.Vo;

import java.util.List;

public class UserTree {
	private String id;
	private List<UserTree> children;
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public List<UserTree> getChildren() {
		return children;
	}
	public void setChaildren(List<UserTree> children) {
		this.children = children;
	}
}
