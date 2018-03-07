package com.ecaray.ecms.services.processes.base;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ecaray.ecms.dao.mapper.process.SysNodesMapper;
import com.ecaray.ecms.entity.process.SysNodes;

/**
 * 节点相关
 */
@Service
public class SysNodesService {

	@Autowired
	private SysNodesMapper mapper;
	
	/**
	 * 查头结点
	 */
	public SysNodes getHeadNode(Integer type) {
		return mapper.selectHeadNode(type);
	}
	
	/**
	 * 查ishead节点
	 * @param type
	 * @return
	 */
	public SysNodes getNodeByTypeAndIsHead(Integer type,Integer ishead) {
		return mapper.selectNodeByTypeAndIsHead(type,ishead);
	}

	/**
	 * 查询当前节点的操作按钮
	 */
	public List<String> getNodeBtnId(String nodeId) {
		return mapper.selectBtnId(nodeId);
	}

	/**
	 * 通过id获取
	 */
	public SysNodes getNodeById(String nodeId) {
		return mapper.selectByPrimaryKey(nodeId);
	}

	public List<SysNodes> getCtmAttrNodeList() {
		return mapper.selectCtmAttrNodeList();
	}
}
