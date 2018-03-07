package com.ecaray.ecms.entity.process;

public class SysNodes {
    private String id;

    private String nodeName;

    private Integer processType;

    private Integer isHead;

    private Integer isSetting;

    private String personPath;
    
    private String userId;
    
    private String userName;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id == null ? null : id.trim();
    }

    public String getNodeName() {
        return nodeName;
    }

    public void setNodeName(String nodeName) {
        this.nodeName = nodeName == null ? null : nodeName.trim();
    }

    public Integer getProcessType() {
        return processType;
    }

    public void setProcessType(Integer processType) {
        this.processType = processType;
    }

    public Integer getIsHead() {
        return isHead;
    }

    public void setIsHead(Integer isHead) {
        this.isHead = isHead;
    }

    public Integer getIsSetting() {
        return isSetting;
    }

    public void setIsSetting(Integer isSetting) {
        this.isSetting = isSetting;
    }

    public String getPersonPath() {
        return personPath;
    }

    public void setPersonPath(String personPath) {
        this.personPath = personPath == null ? null : personPath.trim();
    }

	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}
}