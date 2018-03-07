package com.ecaray.ecms.dao.mapper.process;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.ecaray.ecms.entity.cwa.vo.CwaFilter;
import com.ecaray.ecms.entity.process.SysProcess;
import com.ecaray.ecms.entity.process.Vo.ProDoFilter;

public interface SysProcessMapper {
	
    int deleteByPrimaryKey(String id);

    int insert(SysProcess record);

    int insertSelective(SysProcess record);

    SysProcess selectByPrimaryKey(String id);

    int updateByPrimaryKeySelective(SysProcess record);

    int updateByPrimaryKey(SysProcess record);

	List<ProDoFilter> selectMyApplyList(ProDoFilter filter);

	List<SysProcess> selectProcessListByNode(String nodeId);

	SysProcess selectByRefId(String refId);

	List<SysProcess> selectProcessListByNodeAndRegionId(@Param("nodeId")String id,@Param("regionId") String regionId);

	Object getRelObjByProcess(SysProcess process);

	List<CwaFilter> selectListByCwa(CwaFilter filter);
	
	List<SysProcess> selectListByStatus(@Param("month") String month,@Param("status") Integer status);

	List<SysProcess> selectAllList();
}