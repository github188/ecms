package com.ecaray.ecms.dao.mapper.crm;

import com.ecaray.ecms.entity.crm.CrmClient;
import com.ecaray.ecms.entity.crm.CrmClientContacts;
import com.ecaray.ecms.entity.crm.Vo.ClientQueryFilter;
import com.ecaray.ecms.entity.crm.Vo.CrmClientDetailQuery;
import com.ecaray.ecms.entity.crm.Vo.CrmClientVo;
import com.ecaray.ecms.entity.crm.Vo.CrmOppVo;

import java.util.List;

public interface CrmClientMapper {
    int deleteByPrimaryKey(String id);


    int insertSelective(CrmClient record);

    CrmClient selectByPrimaryKey(String id);

    CrmClientVo selectDetailPrimaryKey(CrmClientDetailQuery crmClientDetailQuery);

    int updateByPrimaryKeySelective(CrmClient record);

    List<CrmClientVo> selectClientListQuery(ClientQueryFilter clientQueryFilter);

	int addBatchClientContacts(List<CrmClientContacts> list);

	List<CrmOppVo> selectClientOppList(String clientId);
}