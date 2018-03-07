package com.ecaray.ecms.dao.mapper.cwa;

import java.util.List;

import com.ecaray.ecms.entity.cwa.CwaOverTime;

public interface CwaOverTimeMapper {
    int deleteByPrimaryKey(String id);

    int insert(CwaOverTime record);

    int insertSelective(CwaOverTime record);

    CwaOverTime selectByPrimaryKey(String id);

    int updateByPrimaryKeySelective(CwaOverTime record);

    int updateByPrimaryKey(CwaOverTime record);

	List<CwaOverTime> selectListByUserId(String userId);

	double selectUserOvertimelength(String userId);

	List<CwaOverTime> selectList();
}