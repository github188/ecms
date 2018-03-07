package com.ecaray.ecms.entity.authority.Vo;

public class UserFilter {

	private String driectName;
	
	private String realname;
	
	private String phone;
	
	private String address;
	
	private Integer pageSize;
	
	private Integer pageNum;
	
	public String getDriectName() {
		return driectName;
	}

	public void setDriectName(String driectName) {
		this.driectName = driectName;
	}

	public String getRealname() {
		return realname;
	}

	public void setRealname(String realname) {
		this.realname = realname;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public Integer getPageSize() {
		return pageSize;
	}

	public void setPageSize(Integer pageSize) {
		this.pageSize = pageSize;
	}

	public Integer getPageNum() {
		return pageNum;
	}

	public void setPageNum(Integer pageNum) {
		this.pageNum = pageNum;
	}
}
