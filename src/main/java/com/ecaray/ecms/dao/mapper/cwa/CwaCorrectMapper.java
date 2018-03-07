package com.ecaray.ecms.dao.mapper.cwa;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.ecaray.ecms.entity.cwa.CwaCorrect;
import com.ecaray.ecms.entity.cwa.CwaException;

public interface CwaCorrectMapper {
    int deleteByPrimaryKey(String id);

    int insert(CwaCorrect record);

    int insertSelective(CwaCorrect record);

    CwaCorrect selectByPrimaryKey(String id);

    int updateByPrimaryKeySelective(CwaCorrect record);

    int updateByPrimaryKey(CwaCorrect record);

	List<CwaCorrect> listCwaCorrByTime(@Param("userId")String userId,@Param("starttime") Long starttime,@Param("endtime") Long endtime);

	CwaCorrect selectByResultId(String id);
}