package com.ecaray.ecms.services.processes.base;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ecaray.ecms.dao.mapper.process.SysNodesUserMapper;
import com.ecaray.ecms.entity.process.SysNodesUser;

@Service
public class SysNodeUserService {
	
	@Autowired
	SysNodesUserMapper mapper;
	
	/**
	 * 查询角色审批的节点集合
	 */
	public List<String> getNodeListByUserId(String userId) {
		return mapper.selectNodesListByHanlder(userId);
	}
	
	public List<SysNodesUser> getNodeUserList() {
		return mapper.selectNodeUserList();
	}
}
