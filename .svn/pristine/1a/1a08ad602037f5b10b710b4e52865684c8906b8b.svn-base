package com.ecaray.ecms.dao.mapper.cwa;

import java.util.List;

import com.ecaray.ecms.entity.cwa.CwaLeave;

public interface CwaLeaveMapper {
    int deleteByPrimaryKey(String id);

    int insert(CwaLeave record);

    int insertSelective(CwaLeave record);

    CwaLeave selectByPrimaryKey(String id);

    int updateByPrimaryKeySelective(CwaLeave record);

    int updateByPrimaryKey(CwaLeave record);

	List<CwaLeave> selectListByUserId(String userId);

	double selectUserLeavelength(String userid);

	List<CwaLeave> selectList();
}