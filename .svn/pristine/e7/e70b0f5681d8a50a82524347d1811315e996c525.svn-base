package com.ecaray.ecms.dao.mapper.ctm;

import java.util.List;

import com.ecaray.ecms.entity.ctm.CtmContract;
import com.ecaray.ecms.entity.ctm.Vo.CtmDetails;
import com.ecaray.ecms.entity.ctm.Vo.CtmFilter;

public interface CtmContractMapper {
    int deleteByPrimaryKey(String id);

    int insert(CtmContract record);

    int insertSelective(CtmContract record);

    CtmContract selectByPrimaryKey(String id);

    int updateByPrimaryKeySelective(CtmContract record);

    int updateByPrimaryKey(CtmContract record);

	List<CtmContract> selectCtmList(CtmFilter filter);

	int selectCtmCountByDay(long time);
}