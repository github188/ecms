package com.ecaray.ecms.commons.constant;

import java.util.HashMap;
import java.util.Map;

public class FlowResult {

	private String code;
	private String message;
	private Object content;
	private Object pageinfo;

	private boolean isEnded;

	public enum Code {
		SUCCESS("success"),
		FAILED("failed");

		private final String value;

		Code(String value)
		{
			this.value = value;
		}

		public String getValue()
		{
			return value;
		}
	}

	public String getCode()
	{
		return code;
	}

	public void setCode(String code)
	{
		this.code = code;
	}

	public String getMessage()
	{
		return message;
	}

	public void setMessage(String message)
	{
		this.message = message;
	}

	public FlowResult(String code, String message)
	{
		super();
		this.code = code;
		this.message = message;
	}

	public FlowResult()
	{
		super();
	}

	public static FlowResult success()
	{
		return new FlowResult(FlowResult.Code.SUCCESS.getValue(), FlowResult.Code.SUCCESS.getValue());
	}

	public static FlowResult failed(String reason)
	{
		return new FlowResult(FlowResult.Code.FAILED.getValue(), reason);
	}

	@Override
	public String toString()
	{
		return "Result [code=" + code + ", message=" + message + "]";
	}


	public boolean isEnded() {
		return isEnded;
	}

	public FlowResult setEnded(boolean ended) {
		isEnded = ended;
		return this;
	}

	public Object getContent()
	{
		return content;
	}

	public Object getPageinfo() {
		return pageinfo;
	}

	public void setContent(Object content)
	{
		this.content = content;
	}

	public void setPageinfo(Object pageinfo) {
		this.pageinfo = pageinfo;
	}

	public FlowResult addObject(Object o){
		setContent(o);
		return this;
	}
	public FlowResult addPageInfo(long total, int pages){
		Map<String ,Object> pageMap =new HashMap<String,Object>();
		pageMap.put("total",total);
		pageMap.put("pages",pages);
		setPageinfo(pageMap);
		return this;
	}
}
