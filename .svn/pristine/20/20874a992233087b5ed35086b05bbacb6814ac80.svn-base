package com.ecaray.ecms.services.processes.base;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ecaray.ecms.commons.constant.Constants;
import com.ecaray.ecms.commons.utils.DataUtil;
import com.ecaray.ecms.commons.utils.DateUtil;
import com.ecaray.ecms.commons.utils.ParaMap;
import com.ecaray.ecms.commons.utils.StrUtils;
import com.ecaray.ecms.dao.mapper.sys.SysNodeAttrMapper;
import com.ecaray.ecms.dao.process.SysProcessDao;
import com.ecaray.ecms.entity.authority.User;
import com.ecaray.ecms.entity.ctm.Vo.CtmNodesAttrVo;
import com.ecaray.ecms.entity.process.SysNodes;
import com.ecaray.ecms.entity.process.SysProDoing;
import com.ecaray.ecms.entity.process.SysProcess;
import com.ecaray.ecms.entity.sys.SysNodeAttr;
import com.ecaray.ecms.services.authority.UserRoleService;
import com.ecaray.ecms.services.authority.UserService;

/**
 * 
 * 合同类型-节点处理人
 */
@Service
public class SysNodeAttrService implements Constants{

	@Autowired
	private SysNodeAttrMapper mapper;

	@Autowired
	private UserRoleService userRoleService;

	@Autowired
	private SysNodeUserService sysNodeUserService;

	@Autowired
	private SysNodesService sysNodesService;
	@Autowired
	private UserService userService;
	@Autowired
	private SysProDoneService sysProDoneService;
	@Autowired
	private SysProDoingService sysProDoingService;
	
	@Autowired
	private SysProcessDao dao;
	
	/**
	 * 新增
	 */
	public void add(SysNodeAttr nodeAttr) {
		if(StrUtils.isNull(nodeAttr.getId())) {
			nodeAttr.setId(DataUtil.uuidData());
		}
		long time = DateUtil.nowTime();
		nodeAttr.setAddTime(time);
		nodeAttr.setUpdateTime(time);
		mapper.insertSelective(nodeAttr);

		// 添加审批人权限
		String userId = nodeAttr.getUserId();
		userRoleService.addUserRoleByCode(userId, ctm_role_examiner);
	}

	/**
	 * 更新
	 */
	public void update(String id, String userId) {
		SysNodeAttr nodeAttr = new SysNodeAttr();
		nodeAttr.setUserId(userId);
		nodeAttr.setId(userId);
		update(nodeAttr);
	}

	/**
	 * 更新对象
	 */
	public void update(SysNodeAttr nodeAttr) {
		String id = nodeAttr.getId();
		if (StrUtils.isNotNull(id)) {
			// 之前的审批人
			SysNodeAttr oldNodeAttr = mapper.selectByPrimaryKey(id);
			String oldUserId = oldNodeAttr.getUserId();
			// 更新审批人
			long time = DateUtil.nowTime();
			nodeAttr.setUpdateTime(time);
			mapper.updateByPrimaryKeySelective(nodeAttr);
			String userId = nodeAttr.getUserId();
			userRoleService.addUserRoleByCode(userId, ctm_role_examiner);
			if (!hasOtherNodes(oldUserId)) {
				userRoleService.deleteUserRoleByCode(oldUserId, ctm_role_examiner);
			}
		}
	}

	/**
	 * 删除某个审批人
	 */
	public void delete(SysNodeAttr nodeAttr) {
		String id = nodeAttr.getId();
		if (StrUtils.isNotNull(id)) {
			mapper.deleteByPrimaryKey(id);
			String userId = nodeAttr.getUserId();
			if (!hasOtherNodes(userId)) {
				userRoleService.deleteUserRoleByCode(userId, ctm_role_examiner);
			}
		}
	}
	
	/**
	 * 删除某个节点所有人
	 */
	public void deleteAllUser(String attr, String nodeId) {
		List<SysNodeAttr> list = getNodeAttrList(attr,nodeId);
		for(SysNodeAttr nodeAttr : list) {
			delete(nodeAttr);
		}
	}

	/**
	 * 查询是否是其他节点的审批人 true是，false不是
	 */
	public boolean hasOtherNodes(String userId) {
		List<String> list = new ArrayList<String>();
		List<String> nodeUserList = sysNodeUserService.getNodeListByUserId(userId);
		List<String> nodeAttrUserList = mapper.selectNodeListByUserId(userId);
		list.addAll(nodeUserList);
		list.addAll(nodeAttrUserList);
		if (list.isEmpty() || list.size() == 0) {
			return false;
		}
		return true;
	}

	/**
	 * 获取合同类型的审批人列表
	 */
	@SuppressWarnings("unchecked")
	public List<CtmNodesAttrVo> getNodeAttrList(String attr) {
		List<SysNodeAttr> list = mapper.selectNodeAttrListByAttr(attr);
		List<SysNodes> nodeList = sysNodesService.getCtmAttrNodeList();
		List<CtmNodesAttrVo> group = new ArrayList<>();
		ParaMap map = new ParaMap();
		for (SysNodeAttr nodeAttr : list) {
			String nodeId = nodeAttr.getNodeId();
			SysNodes node = sysNodesService.getNodeById(nodeId);
			String nodeName = node.getNodeName();
			List<User> userList = new ArrayList<User>();
			if(map.get(nodeName) != null) {
				userList.addAll((List<User>)map.get(nodeName));
			}
			userList.add(userService.getUserByIdNoPassWord(nodeAttr.getUserId()));
			map.put(nodeName, userList);
		}
		for (SysNodes str : nodeList) {
			CtmNodesAttrVo attrVo = new CtmNodesAttrVo();
			attrVo.setNodeName(str.getNodeName());
			attrVo.setNodeId(str.getId());
			attrVo.setUser((List<User>) map.get(str.getNodeName()));
			group.add(attrVo);
		}
		return group;
	}

	/**
	 * 更新节点当前处理人
	 */
	public void updateNodeUserListByattr(CtmNodesAttrVo vo) {
		String nodeId = vo.getNodeId();
		String attr = vo.getAttr();
		List<SysProcess> processlist = dao.getProcessListByNode(nodeId);
		List<SysNodeAttr> list = getNodeAttrList(attr,nodeId);
		for (SysNodeAttr nodesAttr : list) {
			String oldUserId = nodesAttr.getUserId();
			for (SysProcess process : processlist) {
				String processId = process.getId();
				sysProDoneService.deleteCtmSetting(processId, nodeId, oldUserId);
				sysProDoingService.deleteCtmSetting(processId, nodeId, oldUserId);
			}
		} 
		deleteAllUser(attr,nodeId);
		List<User> users = vo.getUser();
		for(User user:users) {
			for (SysProcess process : processlist) {
				SysProDoing sysProDoing = new SysProDoing();
				sysProDoing.setId(DataUtil.uuidData());
				sysProDoing.setNodeId(nodeId);
				sysProDoing.setHandlerId(user.getId());
				sysProDoing.setProcessId(process.getId());
				sysProDoingService.add(sysProDoing);
			}
			SysNodeAttr addAttr = new SysNodeAttr();
			addAttr.setNodeId(nodeId);
			addAttr.setCtmAttr(attr);
			addAttr.setUserId(user.getId());
			add(addAttr);
		}
	}
	public List<String> getAttrNodeUserList(String nodeId,String attr){
		return mapper.selectAttrNodeUserList(nodeId,attr);
	}
	private List<SysNodeAttr> getNodeAttrList(String attr, String nodeId) {
		return mapper.selectNodeAttrList(attr,nodeId);
	}
}
