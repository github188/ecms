package com.ecaray.ecms.dao.mapper.crm;

import com.ecaray.ecms.entity.crm.CrmFollow;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface CrmFollowMapper {
    int deleteByPrimaryKey(String id);

    int insert(CrmFollow record);

    int insertSelective(CrmFollow record);

    CrmFollow selectByPrimaryKey(String id);

    int updateByPrimaryKeySelective(CrmFollow record);

    int updateByPrimaryKey(CrmFollow record);

    List<CrmFollow> selectClientFollows(@Param("clientId") String clientId,@Param("oppId") String oppId);

	CrmFollow selectFollowById(@Param(value = "followId") String followId);

	void updateClientLastFollowTime(CrmFollow crmFollow);
}