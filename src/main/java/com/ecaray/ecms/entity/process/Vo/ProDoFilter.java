package com.ecaray.ecms.entity.process.Vo;

import java.util.List;

import com.ecaray.ecms.entity.process.SysProDoing;
import com.ecaray.ecms.entity.process.SysProDone;

public class ProDoFilter {
	
    private String id;

    private String processId;
    
    private String processName;
    
    private String sponsorsId;
    
    private String sponsorsName;

    private String nodeId;

    private String nodesName;

    private String handlerId;

    private String handlerName;

    private String title;
    
    private String type;

    private List<SysProDoing> doingPerson;
    
    private List<SysProDone>  donePerson;
    
    private Long addTime;

    private Long updateTime;
    
    private Integer pageNum = 0;
    
    private Integer pageSize = 0;
    
    private Integer isRevoke = 0;
    
    private Integer status;
    
    
    public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getNodesName() {
		return nodesName;
	}

	public void setNodesName(String nodesName) {
		this.nodesName = nodesName;
	}

	public String getHandlerName() {
		return handlerName;
	}

	public void setHandlerName(String handlerName) {
		this.handlerName = handlerName;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public List<SysProDoing> getDoingPerson() {
		return doingPerson;
	}

	public void setDoingPerson(List<SysProDoing> doingPerson) {
		this.doingPerson = doingPerson;
	}

	public List<SysProDone> getDonePerson() {
		return donePerson;
	}

	public void setDonePerson(List<SysProDone> donePerson) {
		this.donePerson = donePerson;
	}

	public String getSponsorsName() {
		return sponsorsName;
	}

	public void setSponsorsName(String sponsorsName) {
		this.sponsorsName = sponsorsName;
	}

	public String getSponsorsId() {
		return sponsorsId;
	}

	public void setSponsorsId(String sponsorsId) {
		this.sponsorsId = sponsorsId;
	}

	public String getProcessName() {
		return processName;
	}

	public void setProcessName(String processName) {
		this.processName = processName;
	}

	public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id == null ? null : id.trim();
    }

    public String getProcessId() {
        return processId;
    }

    public void setProcessId(String processId) {
        this.processId = processId == null ? null : processId.trim();
    }

    public String getNodeId() {
        return nodeId;
    }

    public void setNodeId(String nodeId) {
        this.nodeId = nodeId == null ? null : nodeId.trim();
    }

    public String getHandlerId() {
        return handlerId;
    }

    public void setHandlerId(String handlerId) {
        this.handlerId = handlerId == null ? null : handlerId.trim();
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

	public Integer getPageNum() {
		return pageNum;
	}

	public void setPageNum(Integer pageNum) {
		this.pageNum = pageNum;
	}

	public Integer getPageSize() {
		return pageSize;
	}

	public void setPageSize(Integer pageSize) {
		this.pageSize = pageSize;
	}

	public Integer getIsRevoke() {
		return isRevoke;
	}

	public void setIsRevoke(Integer isRevoke) {
		this.isRevoke = isRevoke;
	}

	public Integer getStatus() {
		return status;
	}

	public void setStatus(Integer status) {
		this.status = status;
	}
}