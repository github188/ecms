package com.ecaray.ecms.dao.process;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ecaray.ecms.commons.constant.DataUtil;
import com.ecaray.ecms.commons.utils.DateUtil;
import com.ecaray.ecms.commons.utils.StrUtils;
import com.ecaray.ecms.dao.mapper.process.SysNodesMapper;
import com.ecaray.ecms.dao.mapper.process.SysProFilterMapper;
import com.ecaray.ecms.dao.mapper.process.SysProcessMapper;
import com.ecaray.ecms.entity.process.SysNodes;
import com.ecaray.ecms.entity.process.SysProFilter;
import com.ecaray.ecms.entity.process.SysProcess;

/**
 * 系统流程
 *
 */
@Service
public class SysProcessDao {
	
	@Autowired
	private SysProcessMapper sysProcessMapper;
	
	@Autowired
	private SysNodesMapper sysNodesMapper;
	
	@Autowired
	private SysProFilterMapper sysProFilterMapper;
	
	
	
	/**
	 * 新增流程
	 */
	public String saveSysProcess(SysProcess process) {
		long time = DateUtil.nowTime();
		process.setAddTime(time);
		process.setUpdateTime(time);
		String id = process.getId();
		if (StrUtils.isNull(id)) {
			id = DataUtil.uuidData();
			process.setId(id);
		}
		sysProcessMapper.insertSelective(process);
		return id;
	}
	
	/**
	 * 根据流程id获取流程
	 */
	public SysProcess getProcessById(String processId) {
		return sysProcessMapper.selectByPrimaryKey(processId);
	}
	
	/**
	 * 根据业务id获取流程
	 */
	public SysProcess getProcessByRefId(String refId) {
		return sysProcessMapper.selectByRefId(refId);
	}
	
	/**
	 * 获取节点的流转条件集合
	 */
	public List<SysProFilter> getNodeFilters(String nodeId) {
		return sysProFilterMapper.selectNodeFilters(nodeId);
	}
	
	/**
	 * 获取流程的头结点
	 */
	public SysNodes getProcessHeadNode(Integer type) {
		return sysNodesMapper.selectHeadNode(type);
	}
	
	/**
	 * 获取当前处于改节点的流程列表
	 */
	public List<SysProcess> getProcessListByNode(String nodeId) {
		return sysProcessMapper.selectProcessListByNode(nodeId);
	}
}
