package com.ecaray.ecms.dao.mapper.process;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.ecaray.ecms.entity.process.SysProDoing;
import com.ecaray.ecms.entity.process.SysProcess;
import com.ecaray.ecms.entity.process.Vo.ProDoFilter;

public interface SysProDoingMapper {
    int deleteByPrimaryKey(String id);

    int insert(SysProDoing record);

    int insertSelective(SysProDoing record);

    SysProDoing selectByPrimaryKey(String id);

    int updateByPrimaryKeySelective(SysProDoing record);

    int updateByPrimaryKey(SysProDoing record);
    
    List<ProDoFilter> selectDoingList(ProDoFilter proDoingFilter);
    
    List<SysProDoing> selectDoingPerson(String proessId);
    
    int selectDoingCount(SysProcess process);

	void deleteCtmSetting(@Param("processId")String id, @Param("nodeId")String nodeId, @Param("handlerId")String userId);

	SysProDoing selectDoingByProcess(@Param("handlerId")String id, @Param("processId")String processId,@Param("nodeId") String nodeId);

	void deleteByProcess(SysProcess process);
}