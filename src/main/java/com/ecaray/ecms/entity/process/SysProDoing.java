package com.ecaray.ecms.entity.process;

public class SysProDoing {
    private String id;

    private String processId;

    private String nodeId;
    
    private String nodesName;

    private String handlerId;
    
    private String handlerName;

    private Long addTime;

    private Long updateTime;
    
    public String getId() {
        return id;
    }

    public String getNodeName() {
		return nodesName;
	}

	public void setNodeName(String nodeName) {
		this.nodesName = nodeName;
	}


	public void setHandlerName(String handlerName) {
        this.handlerName = handlerName == null ? null : handlerName.trim();
    }
    public String getHandlerName() {
    	return handlerName;
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
}