package com.ecaray.ecms.entity.ctm.Vo;

import java.util.List;

import com.ecaray.ecms.entity.ctm.CtmTemplate;

public class CtmTemplateTree extends CtmTemplate {

	private List<CtmTemplateTree> children;

	public List<CtmTemplateTree> getChildren() {
		return children;
	}

	public void setChildren(List<CtmTemplateTree> children) {
		this.children = children;
	}
	
	
}
