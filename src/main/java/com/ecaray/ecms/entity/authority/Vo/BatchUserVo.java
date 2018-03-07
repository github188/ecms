package com.ecaray.ecms.entity.authority.Vo;

import java.util.List;

public class BatchUserVo {
	private int selectAll = 0;
	private List<String> ids;
	private List<String> roleIds;
	private String leaderId;
	private String depId;
	private String queryDepId;
	private String queryInfo;
	public int getSelectAll() {
		return selectAll;
	}
	public void setSelectAll(int selectAll) {
		this.selectAll = selectAll;
	}
	public List<String> getIds() {
		return ids;
	}
	public void setIds(List<String> ids) {
		this.ids = ids;
	}
	public List<String> getRoleIds() {
		return roleIds;
	}
	public void setRoleIds(List<String> roleIds) {
		this.roleIds = roleIds;
	}
	public String getLeaderId() {
		return leaderId;
	}
	public void setLeaderId(String leaderId) {
		this.leaderId = leaderId;
	}
	public String getDepId() {
		return depId;
	}
	public void setDepId(String depId) {
		this.depId = depId;
	}
	public String getQueryDepId() {
		return queryDepId;
	}
	public void setQueryDepId(String queryDepId) {
		this.queryDepId = queryDepId;
	}
	public String getQueryInfo() {
		return queryInfo;
	}
	public void setQueryInfo(String queryInfo) {
		this.queryInfo = queryInfo;
	}
}
