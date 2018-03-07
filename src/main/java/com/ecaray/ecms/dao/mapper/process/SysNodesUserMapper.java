package com.ecaray.ecms.dao.mapper.process;

import java.util.List;

import com.ecaray.ecms.entity.process.SysNodes;
import com.ecaray.ecms.entity.process.SysNodesUser;
import com.ecaray.ecms.entity.process.SysProcess;
import com.ecaray.ecms.entity.process.Vo.ProNodeHandler;

public interface SysNodesUserMapper {
    int deleteByPrimaryKey(String id);

    int insert(SysNodesUser record);

    int insertSelective(SysNodesUser record);

    SysNodesUser selectByPrimaryKey(String id);

    int updateByPrimaryKeySelective(SysNodesUser record);

    int updateByPrimaryKey(SysNodesUser record);

	List<ProNodeHandler> selectNodesHandler(String nodeId);

	int selectHandlerCount(SysProcess process);

	List<String> selectNodesHandlerIdList(String nodeId);

	List<String> selectNodesListByHanlder(String userId);

	List<SysNodesUser> selectNodeUserList();

	String selectCwaUserByNodeId(String nodeId);

	void deleteByNodeId(String nodeId);
}