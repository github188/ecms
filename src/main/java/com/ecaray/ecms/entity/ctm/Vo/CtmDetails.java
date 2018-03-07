package com.ecaray.ecms.entity.ctm.Vo;

import java.util.List;

import com.ecaray.ecms.entity.ctm.CtmContract;
import com.ecaray.ecms.entity.ctm.CtmFiles;

public class CtmDetails extends CtmContract {
	
	private String contractName;
	
	private String customerName;
	
	private String customerId;
	
	private String regionName;
	
	private String regionId;
	
	private String userName;
	
	private String salesmanId;
	
	private String oppName;
	
	private String depId;
	
	private String depName;
	
	private String salesmanTel;
	
	private String crmConName;
	
	private String crmConTel;
	
	private String crmConId;
	
	private String crmAdress;
	
	private String exstatus;
	
	private String substatus;
	
	private List<CtmFiles> ctmFiles;
	
	public String getCustomerId() {
		return customerId;
	}
	public void setCustomerId(String customerId) {
		this.customerId = customerId;
	}
	public String getContractName() {
		return contractName;
	}
	public void setContractName(String contractName) {
		this.contractName = contractName;
	}
	public String getCustomerName() {
		return customerName;
	}
	public void setCustomerName(String customerName) {
		this.customerName = customerName;
	}
	public String getRegionName() {
		return regionName;
	}
	public void setRegionName(String regionName) {
		this.regionName = regionName;
	}
	public String getRegionId() {
		return regionId;
	}
	public void setRegionId(String regionId) {
		this.regionId = regionId;
	}
	public String getUserName() {
		return userName;
	}
	public void setUserName(String userName) {
		this.userName = userName;
	}
	public String getSalesmanId() {
		return salesmanId;
	}
	public void setSalesmanId(String salesmanId) {
		this.salesmanId = salesmanId;
	}
	public String getOppName() {
		return oppName;
	}
	public void setOppName(String oppName) {
		this.oppName = oppName;
	}
	public String getDepId() {
		return depId;
	}
	public void setDepId(String depId) {
		this.depId = depId;
	}
	public String getDepName() {
		return depName;
	}
	public void setDepName(String depName) {
		this.depName = depName;
	}
	public String getSalesmanTel() {
		return salesmanTel;
	}
	public void setSalesmanTel(String salesmanTel) {
		this.salesmanTel = salesmanTel;
	}
	public String getCrmConName() {
		return crmConName;
	}
	public void setCrmConName(String crmConName) {
		this.crmConName = crmConName;
	}
	public String getCrmConTel() {
		return crmConTel;
	}
	public void setCrmConTel(String crmConTel) {
		this.crmConTel = crmConTel;
	}
	public String getCrmAdress() {
		return crmAdress;
	}
	public void setCrmAdress(String crmAdress) {
		this.crmAdress = crmAdress;
	}
	public String getCrmConId() {
		return crmConId;
	}
	public void setCrmConId(String crmConId) {
		this.crmConId = crmConId;
	}
	public String getExstatus() {
		return exstatus;
	}
	public void setExstatus(String exstatus) {
		this.exstatus = exstatus;
	}
	public String getSubstatus() {
		return substatus;
	}
	public void setSubstatus(String substatus) {
		this.substatus = substatus;
	}
	public List<CtmFiles> getCtmFiles() {
		return ctmFiles;
	}
	public void setCtmFiles(List<CtmFiles> files) {
		this.ctmFiles = files;
	}
}
