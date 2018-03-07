package com.ecaray.ecms.dao.mapper.crm;

import com.ecaray.ecms.entity.crm.CrmOppContacts;

import java.util.List;

public interface CrmOppContactsMapper {
    int deleteByPrimaryKey(String id);

    int insert(CrmOppContacts record);

    int insertSelective(CrmOppContacts record);

    CrmOppContacts selectByPrimaryKey(String id);

    int updateByPrimaryKeySelective(CrmOppContacts record);

    int updateByPrimaryKey(CrmOppContacts record);

    void insertBatch(List<CrmOppContacts> crmOppContactses);

    void deleteBatch(List<CrmOppContacts> crmOppContactses);

    void deleteByOppId(String oppId);
}