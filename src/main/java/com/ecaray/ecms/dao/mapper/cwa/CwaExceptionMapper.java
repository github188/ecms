package com.ecaray.ecms.dao.mapper.cwa;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.ecaray.ecms.entity.cwa.CwaCorrect;
import com.ecaray.ecms.entity.cwa.CwaException;
import com.ecaray.ecms.entity.process.Vo.DoneResultVo;

public interface CwaExceptionMapper {
    int deleteByPrimaryKey(String id);

    int insert(CwaException record);

    int insertSelective(CwaException record);

    CwaException selectByPrimaryKey(String id);

    int updateByPrimaryKeySelective(CwaException record);

    int updateByPrimaryKey(CwaException record);

    List<DoneResultVo> countUserHandlerRecord(CwaException cwaException);

	CwaException selectByResultId(String resultId);

	List<CwaException> selectByUserDateType(@Param("userId")String userId, @Param("date")String date, @Param("expType")int i);

	List<CwaException> selectByUserDate(@Param("userId")String userId, @Param("date")String date);

	CwaException selectCwaExceptionByCwaId(String cwaId);
}