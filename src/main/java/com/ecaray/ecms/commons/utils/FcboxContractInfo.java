package com.ecaray.ecms.commons.utils;




public class FcboxContractInfo {

	@ExcelRows(index=0,remark="id")
	private String id;
	
	@ExcelRows(index=1,remark="柜台编号")
	private String edcode;
	
	@ExcelRows(index=2,remark="快递公司编码")
	private String express_company;
	
	@ExcelRows(index=3,remark="省名字")
	private String province_name;
	
	@ExcelRows(index=4,remark="城市名字")
	private String city_name;
	
	@ExcelRows(index=5,remark="大格口价格")
	private String big_price;
	
	@ExcelRows(index=6,remark="中格口价格")
	private String middle_price;
	
	@ExcelRows(index=7,remark="小格口价格")
	private String small_price;
	
	@ExcelRows(index=8,remark="修改时间")
	private String update_tm;
	
	@ExcelRows(index=0,remark="创建时间")
	private String create_tm;
	
	@ExcelRows(index=0,remark="创建人")
	private String create_emp;
	
	@ExcelRows(index=0,remark="修改人")
	private String update_emp;

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getEdcode() {
		return edcode;
	}

	public void setEdcode(String edcode) {
		this.edcode = edcode;
	}

	public String getExpress_company() {
		return express_company;
	}

	public void setExpress_company(String express_company) {
		this.express_company = express_company;
	}

	public String getProvince_name() {
		return province_name;
	}

	public void setProvince_name(String province_name) {
		this.province_name = province_name;
	}

	public String getCity_name() {
		return city_name;
	}

	public void setCity_name(String city_name) {
		this.city_name = city_name;
	}

	public String getBig_price() {
		return big_price;
	}

	public void setBig_price(String big_price) {
		this.big_price = big_price;
	}

	public String getMiddle_price() {
		return middle_price;
	}

	public void setMiddle_price(String middle_price) {
		this.middle_price = middle_price;
	}

	public String getSmall_price() {
		return small_price;
	}

	public void setSmall_price(String small_price) {
		this.small_price = small_price;
	}

	public String getUpdate_tm() {
		return update_tm;
	}

	public void setUpdate_tm(String update_tm) {
		this.update_tm = update_tm;
	}

	public String getCreate_tm() {
		return create_tm;
	}

	public void setCreate_tm(String create_tm) {
		this.create_tm = create_tm;
	}

	public String getCreate_emp() {
		return create_emp;
	}

	public void setCreate_emp(String create_emp) {
		this.create_emp = create_emp;
	}

	public String getUpdate_emp() {
		return update_emp;
	}

	public void setUpdate_emp(String update_emp) {
		this.update_emp = update_emp;
	}
}
