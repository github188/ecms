package com.ecaray.ecms.dao.mapper.crm;

import java.util.List;

import com.ecaray.ecms.entity.crm.CrmClientContacts;

public interface CrmClientContactsMapper {
    int deleteByPrimaryKey(String id);

    int insert(CrmClientContacts record);

    int insertSelective(CrmClientContacts record);

    CrmClientContacts selectByPrimaryKey(String id);

    int updateByPrimaryKeySelective(CrmClientContacts record);

    int updateByPrimaryKey(CrmClientContacts record);

    void insertBatch(List<CrmClientContacts> ccContactsList);

    List<CrmClientContacts> selectContactsListByCId(String clientId);

    List<CrmClientContacts> selectOppContactsList(String oppId);

	CrmClientContacts selectContactByconId(String conId);
}