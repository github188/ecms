package com.ecaray.ecms.dao.mapper.sys;


import com.ecaray.ecms.entity.sys.SysEmailTemplate;

public interface SysEmailTemplateMapper {
    int deleteByPrimaryKey(String id);

    int insert(SysEmailTemplate record);

    int insertSelective(SysEmailTemplate record);

    SysEmailTemplate selectByPrimaryKey(String id);

    int updateByPrimaryKeySelective(SysEmailTemplate record);

    int updateByPrimaryKey(SysEmailTemplate record);
}