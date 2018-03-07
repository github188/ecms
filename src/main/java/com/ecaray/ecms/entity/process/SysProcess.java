package com.ecaray.ecms.entity.process;

import java.util.HashMap;
import java.util.Map;

public class SysProcess {
    private String id;

    private String userId;

    private Integer type;

    private String title;

    private String nodeId;

    private String relId;

    private Long addTime;

    private Long updateTime;
    
    private boolean isSendMail = false;
    
    private Map<String,String> mailParam = new HashMap<String,String>();
    
    private String subject;
    
    private String mailKey;
    
    private Integer nextIsHead ;
    
    private Map<String,Object> startMap ;
    
    private Integer status;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id == null ? null : id.trim();
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public Integer getType() {
        return type;
    }

    public void setType(Integer type) {
        this.type = type;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title == null ? null : title.trim();
    }

    public String getNodeId() {
        return nodeId;
    }

    public void setNodeId(String nodeId) {
        this.nodeId = nodeId == null ? null : nodeId.trim();
    }

    public String getRelId() {
        return relId;
    }

    public void setRelId(String relId) {
        this.relId = relId == null ? null : relId.trim();
    }

    public Long getAddTime() {
        return addTime;
    }

    public void setAddTime(Long addTime) {
        this.addTime = addTime;
    }

    public Long getUpdateTime() {
        return updateTime;
    }

    public void setUpdateTime(Long updateTime) {
        this.updateTime = updateTime;
    }

	public boolean getIsSendMail() {
		return isSendMail;
	}

	public void setSendMail(boolean isSendMail) {
		this.isSendMail = isSendMail;
	}

	public Map<String, String> getMailParam() {
		return mailParam;
	}

	public void setMailParam(Map<String, String> mailParam) {
		this.mailParam = mailParam;
	}

	public String getSubject() {
		return subject;
	}

	public void setSubject(String subject) {
		this.subject = subject;
	}

	public String getMailKey() {
		return mailKey;
	}

	public void setMailKey(String mailKey) {
		this.mailKey = mailKey;
	}

	public Integer getNextIsHead() {
		return nextIsHead;
	}

	public void setNextIsHead(Integer nextIsHead) {
		this.nextIsHead = nextIsHead;
	}

	public Map<String, Object> getStartMap() {
		return startMap;
	}

	public void setStartMap(Map<String, Object> startMap) {
		this.startMap = startMap;
	}

	public Integer getStatus() {
		return status;
	}

	public void setStatus(Integer status) {
		this.status = status;
	}
}
