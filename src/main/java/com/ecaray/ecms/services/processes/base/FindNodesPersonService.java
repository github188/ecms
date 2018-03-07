package com.ecaray.ecms.services.processes.base;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.alibaba.druid.util.StringUtils;
import com.ecaray.ecms.commons.constant.Result;
import com.ecaray.ecms.commons.utils.StrUtils;
import com.ecaray.ecms.dao.mapper.authority.DeptMapper;
import com.ecaray.ecms.dao.mapper.ctm.CtmContractMapper;
import com.ecaray.ecms.dao.mapper.process.SysNodesUserMapper;
import com.ecaray.ecms.entity.authority.Dept;
import com.ecaray.ecms.entity.authority.User;
import com.ecaray.ecms.entity.ctm.CtmContract;
import com.ecaray.ecms.entity.process.SysNodes;
import com.ecaray.ecms.entity.process.SysProcess;
import com.ecaray.ecms.entity.process.Vo.ProNodeHandler;
import com.ecaray.ecms.services.authority.DeptService;
import com.ecaray.ecms.services.authority.UserService;
import com.ecaray.ecms.services.ctm.CtmContractService;
import com.ecaray.ecms.services.processes.SysProcessService;

@Service
public class FindNodesPersonService {
	
	@Autowired
	UserService userService;
	@Autowired
	DeptMapper deptMapper;
	@Autowired
	SysNodesService sysNodesService;
	@Autowired
	SysNodeAttrService sysNodeAttrService;
	
	@Autowired
	SysNodesUserMapper sysNodesUserMapper;
	@Autowired
	SysProcessService processService;
	@Autowired
	CtmContractService ctmContractService;
	
	@Autowired
	CtmContractMapper ctmContractExamineMapper;
	
	/**
	 * 获取直接上级
	 */
	public List<String> getGroupLeader(SysProcess process){
		String userId = process.getUserId();
		List<String> list = new ArrayList<String>();
		Result result = userService.selectUserDetailById(userId);
		User user = (User)result.getContent();
		if(user != null){
			list.add(user.getDirectLeader());
		}
		return list;
	}
	
	/**
	 * 获取流程发起人
	 */
	public List<String> getApplyUser(SysProcess process) {
		String userId = process.getUserId();
		List<String> list = new ArrayList<String>();
		if(!StringUtils.isEmpty(userId)){
			list.add(userId);
		}
		return list;
	}
	
	/**
	 * 获取一级部门负责人 
	 */
	public List<String> getDepLeader(SysProcess process) {
		String userId = process.getUserId();
		User user = userService.getUserById(userId);
		String leader = userService.getUserOneDepLeader(user,"1",1);
		List<String> list = new ArrayList<String>();
		if(!StringUtils.isEmpty(leader)){
			list.add(leader);
		}
		return list;
	}
	
	/**
	 * 获取节点配置的处理人
	 */
	public List<String> getHandler(SysProcess process){
		String nodeId = process.getNodeId();
		SysNodes node = sysNodesService.getNodeById(nodeId);
		if(process.getType() == 4 && node.getIsSetting() == 2) {
			CtmContract ctm = ctmContractService.getCtmById(process.getRelId());
			String attr = ctm.getCtmAttr();
			List<String> list = new ArrayList<String>();
			list = sysNodeAttrService.getAttrNodeUserList(nodeId, attr);
			return list;
		}
		List<ProNodeHandler> list = sysNodesUserMapper.selectNodesHandler(nodeId);
		List<String> l = new ArrayList<String>();
		for (ProNodeHandler handler : list) {
			if(handler != null){
				l.add(handler.getUserId());
			}
		}
		return l;
	}
	
	public List<String> getNextGroupLeader(SysProcess process) {
		List<String> list = new ArrayList<String>();
		String userId = process.getUserId();
		User user = userService.getUserById(userId);
		User leader = userService.getUserById(user.getDirectLeader());
		if(leader != null){
			list.add(leader.getDirectLeader()); 
		}
		return list;
	}
	
	public List<String> getNextDepLeader(SysProcess process) {
		List<String> list = new ArrayList<String>();
		String userId = process.getUserId();
		User user = userService.getUserById(userId);
		String depId = user.getDepId();
		Dept dep = deptMapper.selectByPrimaryKey(Long.parseLong(depId));
		Dept parentDep = deptMapper.selectByPrimaryKey(dep.getParentId());
		if(parentDep != null && StrUtils.isNotNull(parentDep.getLeaderId())){
			list.add(parentDep.getLeaderId()); 
		}
		return list;
	}
}
