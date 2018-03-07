package com.ecaray.ecms.commons.constant;

public class ValiResult {

	private String msg;

	private boolean code;

	public String getMsg() {
		return msg;
	}

	public void setMsg(String msg) {
		this.msg = msg;
	}

	public boolean getCode() {
		return code;
	}

	public void setCode(boolean code) {
		this.code = code;
	}

	ValiResult(String msg, boolean code) {
		super();
		this.msg = msg;
		this.code = code;
	}

	ValiResult() {
		super();
		this.code = true;
	}

	public static ValiResult pass() {
		return new ValiResult();
	}

	public static ValiResult fail(String msg) {
		return new ValiResult(msg, false);
	}
}
