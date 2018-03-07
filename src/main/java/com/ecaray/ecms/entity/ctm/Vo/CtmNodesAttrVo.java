package com.ecaray.ecms.entity.ctm.Vo;

import java.util.List;

import com.ecaray.ecms.entity.authority.User;

public class CtmNodesAttrVo {
	
	private String nodeId;
	
	private String nodeName;
	
	private List<User> user;
	
	private String attr;
	
	
	public String getNodeName() {
		return nodeName;
	}
	public void setNodeName(String nodeName) {
		this.nodeName = nodeName;
	}
	public List<User> getUser() {
		return user;
	}
	public void setUser(List<User> user) {
		this.user = user;
	}
	public String getNodeId() {
		return nodeId;
	}
	public void setNodeId(String nodeId) {
		this.nodeId = nodeId;
	}
	public String getAttr() {
		return attr;
	}
	public void setAttr(String attr) {
		this.attr = attr;
	}
}
