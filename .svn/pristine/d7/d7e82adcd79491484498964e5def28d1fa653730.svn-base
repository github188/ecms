package com.ecaray.ecms.dao.mapper.process;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.ecaray.ecms.entity.process.SysProDone;
import com.ecaray.ecms.entity.process.SysProcess;
import com.ecaray.ecms.entity.process.Vo.DoneResultVo;
import com.ecaray.ecms.entity.process.Vo.ProDoFilter;

public interface SysProDoneMapper {
    int deleteByPrimaryKey(String id);

    int insert(SysProDone record);

    int insertSelective(SysProDone record);

    SysProDone selectByPrimaryKey(String id);

    int updateByPrimaryKeySelective(SysProDone record);

    int updateByPrimaryKey(SysProDone record);

	List<ProDoFilter> selectDoneList(ProDoFilter filter);

	List<SysProDone> selectDonePerson(@Param("processId")String processId,@Param("nodeId") String nodeId);

	int selectNodesPassNum(SysProcess process);

	int selectNodesRejectNum(SysProcess process);

	void deleteCtmSetting(@Param("processId")String id, @Param("nodeId")String nodeId, @Param("handlerId")String userId);

	List<DoneResultVo> selectNodesReultGroup(SysProcess process);

	void setProcessResultIsvalid(SysProcess process);
}