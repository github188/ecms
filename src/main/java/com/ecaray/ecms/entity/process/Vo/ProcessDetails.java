package com.ecaray.ecms.entity.process.Vo;

import java.util.List;

import com.ecaray.ecms.entity.authority.User;
import com.ecaray.ecms.entity.ctm.CtmFiles;
import com.ecaray.ecms.entity.process.SysProDoing;
import com.ecaray.ecms.entity.process.SysProDone;

public class ProcessDetails {
	
    private List<SysProDone> doneList;
    
    private List<SysProDoing> doingList;
    
    private Object detailsObject;
    
    private User user;
    
    private List<CtmFiles> list;
    
    private String title;

    
	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public List<CtmFiles> getList() {
		return list;
	}

	public void setList(List<CtmFiles> list) {
		this.list = list;
	}

	public List<SysProDone> getDoneList() {
		return doneList;
	}

	public void setDoneList(List<SysProDone> doneList) {
		this.doneList = doneList;
	}

	public List<SysProDoing> getDoingList() {
		return doingList;
	}

	public void setDoingList(List<SysProDoing> doingList) {
		this.doingList = doingList;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}
	public Object getDetailsObject() {
		return detailsObject;
	}

	public void setDetailsObject(Object detailsObject) {
		this.detailsObject = detailsObject;
	}
}