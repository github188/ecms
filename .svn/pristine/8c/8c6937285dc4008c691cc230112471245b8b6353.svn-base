package com.ecaray.ecms.dao.mapper.crm;

import com.ecaray.ecms.entity.crm.CrmOpp;
import com.ecaray.ecms.entity.crm.Vo.CrmOppVo;
import com.ecaray.ecms.entity.crm.Vo.OppQueryFilter;

import java.util.List;

import org.apache.ibatis.annotations.Param;

public interface CrmOppMapper {
    int deleteByPrimaryKey(String id);

    int insertSelective(CrmOpp record);

    CrmOpp selectByPrimaryKey(String id);

    int updateByPrimaryKeySelective(CrmOpp record);

    List<CrmOppVo> selectOppListQuery(OppQueryFilter oppQueryFilter);

	CrmOpp selectCrmOppById(@Param("oppId")String oppId);
    CrmOppVo selectOppDetailById(String id);
}