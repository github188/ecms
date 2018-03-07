package com.ecaray.ecms.dao.mapper.pmo;

import com.ecaray.ecms.entity.pmo.PmoFlowMsg;

public interface PmoFlowMsgMapper {
    int deleteByPrimaryKey(String id);

    int insert(PmoFlowMsg record);

    int insertSelective(PmoFlowMsg record);

    PmoFlowMsg selectByPrimaryKey(String id);

    int updateByPrimaryKeySelective(PmoFlowMsg record);

    int updateByPrimaryKeyWithBLOBs(PmoFlowMsg record);

    int updateByPrimaryKey(PmoFlowMsg record);
}