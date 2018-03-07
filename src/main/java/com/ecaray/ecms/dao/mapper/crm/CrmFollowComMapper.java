package com.ecaray.ecms.dao.mapper.crm;

import com.ecaray.ecms.entity.crm.CrmFollowCom;
import com.ecaray.ecms.entity.crm.Vo.CrmFollowComVo;

import java.util.List;

public interface CrmFollowComMapper {
    int deleteByPrimaryKey(String id);

    int insertSelective(CrmFollowCom record);

    CrmFollowCom selectByPrimaryKey(String id);

    int updateByPrimaryKeySelective(CrmFollowCom record);

    List<CrmFollowCom> selectComByFollowId(String followId);

    List<CrmFollowComVo> selectComByBelongId(String belongId);
}