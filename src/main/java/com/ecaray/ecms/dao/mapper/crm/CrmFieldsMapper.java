package com.ecaray.ecms.dao.mapper.crm;

import com.ecaray.ecms.entity.crm.CrmFields;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface CrmFieldsMapper {
    int deleteByPrimaryKey(String id);

    int insert(CrmFields record);

    int insertSelective(CrmFields record);

    CrmFields selectByPrimaryKey(String id);

    int updateByPrimaryKeySelective(CrmFields record);

    int updateByPrimaryKey(CrmFields record);

    List<CrmFields> selectFieldsListByBelong(@Param("belongCode") String belongCode);

    void addFieldsBatch(List<CrmFields> listAdd);

    void updateFieldsBatch(List<CrmFields> listUpd);
}