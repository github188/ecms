package com.ecaray.ecms.dao.mapper.cwa;

import java.util.List;

import com.ecaray.ecms.entity.cwa.CwaOutSide;

public interface CwaOutSideMapper {
    int deleteByPrimaryKey(String id);

    int insert(CwaOutSide record);

    int insertSelective(CwaOutSide record);

    CwaOutSide selectByPrimaryKey(String id);

    int updateByPrimaryKeySelective(CwaOutSide record);

    int updateByPrimaryKey(CwaOutSide record);

    List<CwaOutSide> selectByUserId(String userId);
}