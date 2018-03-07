package com.ecaray.ecms.dao.mapper.sys;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.ecaray.ecms.entity.sys.SysNodeAttr;

public interface SysNodeAttrMapper {
    int deleteByPrimaryKey(String id);

    int insert(SysNodeAttr record);

    int insertSelective(SysNodeAttr record);

    SysNodeAttr selectByPrimaryKey(String id);

    int updateByPrimaryKeySelective(SysNodeAttr record);

    int updateByPrimaryKey(SysNodeAttr record);

	List<String> selectNodeListByUserId(String userId);

	List<SysNodeAttr> selectNodeAttrListByAttr(String attr);

	List<String> selectNodesHandlerIdList(String nodeId);

	void deleteAllUser(@Param("attr")String attr,@Param("nodeId") String nodeId);

	List<SysNodeAttr> selectNodeAttrList(@Param("attr")String attr,@Param("nodeId") String nodeId);

	List<String> selectAttrNodeUserList(@Param("nodeId")String nodeId, @Param("attr")String attr);
}