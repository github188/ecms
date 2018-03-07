package com.ecaray.ecms.dao.mapper.process;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.ecaray.ecms.entity.process.SysNodes;

public interface SysNodesMapper {
    int deleteByPrimaryKey(String id);

    int insert(SysNodes record);

    int insertSelective(SysNodes record);

    SysNodes selectByPrimaryKey(String id);

    int updateByPrimaryKeySelective(SysNodes record);

    int updateByPrimaryKey(SysNodes record);
    
    SysNodes selectHeadNode(Integer type);

	List<SysNodes> selectSettingNodes(int type);

	List<String> selectBtnId(String nodeId);

	SysNodes selectNodesByTypeAndIsHead(@Param("type")int type,@Param("isHead")int isHead);

	List<SysNodes> selectCtmAttrNodeList();

	SysNodes selectNodeByTypeAndIsHead(@Param("type")Integer type, @Param("isHead")Integer ishead);
}