package com.ecaray.ecms.services.processes;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.alibaba.druid.util.StringUtils;
import com.ecaray.ecms.commons.constant.Constants;
import com.ecaray.ecms.commons.utils.DataUtil;
import com.ecaray.ecms.commons.utils.DateUtil;
import com.ecaray.ecms.dao.mapper.authority.UserRoleMapper;
import com.ecaray.ecms.dao.mapper.process.SysNodesMapper;
import com.ecaray.ecms.dao.mapper.process.SysNodesUserMapper;
import com.ecaray.ecms.dao.mapper.process.SysProDoingMapper;
import com.ecaray.ecms.dao.mapper.process.SysProDoneMapper;
import com.ecaray.ecms.dao.mapper.process.SysProcessMapper;
import com.ecaray.ecms.entity.authority.UserRole;
import com.ecaray.ecms.entity.process.SysNodes;
import com.ecaray.ecms.entity.process.SysNodesUser;
import com.ecaray.ecms.entity.process.SysProDoing;
import com.ecaray.ecms.entity.process.SysProcess;
import com.ecaray.ecms.entity.process.Vo.ProNodeHandler;

@Service
public class ProcessSettingService implements Constants {

	@Autowired
	SysNodesMapper sysNodesMapper;
	@Autowired
	SysNodesUserMapper sysNodesUserMapper;
	@Autowired
	SysProDoneMapper sysProDoneMapper;
	@Autowired
	SysProDoingMapper sysProDoingMapper;
	@Autowired
	SysProcessMapper sysProcessMapper;
	@Autowired
	UserRoleMapper userRoleMapper;
	
	/**
	 * 查询某种流程可设置处理人的节点集合
	 */
	public List<SysNodes> getSettingNodes(int type){
		return sysNodesMapper.selectSettingNodes(type);
	}
	
	/**
	 * 查询某节点当前处理人
	 */
	public List<ProNodeHandler> getNodesHandler(String nodeId) {
		return sysNodesUserMapper.selectNodesHandler(nodeId);
	}
	
	/**
	 * 更新考勤审批人（节点单人）
	 */
	public void updateCwaHandler(String userId,String nodeId){
		List<SysProcess> processlist = sysProcessMapper.selectProcessListByNode(nodeId);
		String olduser = sysNodesUserMapper.selectCwaUserByNodeId(nodeId);
		// 将旧审批人在当前节点为该节点的流程的审批记录作废
		for(SysProcess process : processlist) {
			sysProDoneMapper.deleteCtmSetting(process.getId(),nodeId,olduser);
			sysProDoingMapper.deleteCtmSetting(process.getId(),nodeId,olduser);
			// 更新待办
			SysProDoing sysProDoing = new SysProDoing();
			sysProDoing.setId(DataUtil.uuidData());
			sysProDoing.setNodeId(nodeId);
			sysProDoing.setHandlerId(userId);
			sysProDoing.setProcessId(process.getId());;
			sysProDoing.setAddTime(System.currentTimeMillis());
			sysProDoing.setUpdateTime(System.currentTimeMillis());
			sysProDoingMapper.insertSelective(sysProDoing);
		}
		sysNodesUserMapper.deleteByNodeId(nodeId);
		SysNodesUser nodeUser = new SysNodesUser();
		long now = DateUtil.nowTime();
		nodeUser.setId(DataUtil.uuidData());
		nodeUser.setAddTime(now);
		nodeUser.setUpdateTime(now);
		nodeUser.setIsvalid(1);
		nodeUser.setNodeId(nodeId);
		nodeUser.setUserId(userId);
		sysNodesUserMapper.insertSelective(nodeUser);
	}
	/**
	 * 更新节点当前处理人
	 */
	public void updateNodesHandler(List<SysNodesUser> list){
		if(list == null || list.size() == 0) {
			return;
		}
		String roleId = userRoleMapper.selectByRoleCode(ctm_role_examiner);
		String nodeId = list.get(0).getNodeId();
		List<SysProcess> processlist = sysProcessMapper.selectProcessListByNode(nodeId);
		UserRole userRole = new UserRole();
		for (SysNodesUser nodesUser : list) {
			if(!StringUtils.isEmpty(nodesUser.getId())){
				nodesUser.setUpdateTime(System.currentTimeMillis());
				SysNodesUser olduser = sysNodesUserMapper.selectByPrimaryKey(nodesUser.getId());
				// 将旧审批人在当前节点为该节点的流程的审批记录作废
				for(SysProcess process : processlist) {
					sysProDoneMapper.deleteCtmSetting(process.getId(),nodeId,olduser.getUserId());
					sysProDoingMapper.deleteCtmSetting(process.getId(),nodeId,olduser.getUserId());
					if(nodesUser.getIsvalid() == 1){
						// 更新待办
						SysProDoing sysProDoing = new SysProDoing();
						sysProDoing.setId(DataUtil.uuidData());
						sysProDoing.setNodeId(nodeId);
						sysProDoing.setHandlerId(nodesUser.getUserId());
						sysProDoing.setProcessId(process.getId());;
						sysProDoing.setAddTime(System.currentTimeMillis());
						sysProDoing.setUpdateTime(System.currentTimeMillis());
						sysProDoingMapper.insertSelective(sysProDoing);
						// 添加审批人权限
						userRole.setUserId(nodesUser.getUserId());
						userRole.setRoleId(roleId);
						List<String> roleList = userRoleMapper.selectUserRoleList(nodesUser.getUserId());
						if(!roleList.contains(roleId)){
							userRoleMapper.insertSelective(userRole);
						}
					}
				}
				sysNodesUserMapper.updateByPrimaryKeySelective(nodesUser);
				List<String> nodesList = sysNodesUserMapper.selectNodesListByHanlder(olduser.getUserId());
				if(nodesList.isEmpty()) {
					// 移除旧审批人的审批人权限
					userRole.setUserId(olduser.getUserId());
					userRole.setRoleId(roleId);
					userRoleMapper.deleteUserRole(userRole);
				}
			}else{
				List<String> handlerIds = sysNodesUserMapper.selectNodesHandlerIdList(nodesUser.getNodeId());
				if(!handlerIds.contains(nodesUser.getUserId())) {
					nodesUser.setId(DataUtil.uuidData());
					nodesUser.setAddTime(System.currentTimeMillis());
					// 更新待办
					for(SysProcess process : processlist) {
						SysProDoing sysProDoing = new SysProDoing();
						sysProDoing.setId(DataUtil.uuidData());
						sysProDoing.setNodeId(nodeId);
						sysProDoing.setHandlerId(nodesUser.getUserId());
						sysProDoing.setProcessId(process.getId());;
						sysProDoing.setAddTime(System.currentTimeMillis());
						sysProDoing.setUpdateTime(System.currentTimeMillis());
						sysProDoingMapper.insertSelective(sysProDoing);
					}
					sysNodesUserMapper.insertSelective(nodesUser);
					// 添加审批人权限
					userRole.setUserId(nodesUser.getUserId());
					userRole.setRoleId(roleId);
					List<String> roleList = userRoleMapper.selectUserRoleList(nodesUser.getUserId());
					if(!roleList.contains(roleId)){
						userRoleMapper.insertSelective(userRole);
					}
				}
			}
		}
	}
}
