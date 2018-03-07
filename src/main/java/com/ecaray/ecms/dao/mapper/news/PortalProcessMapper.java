package com.ecaray.ecms.dao.mapper.news;

import com.ecaray.ecms.entity.news.PortalProcess;

public interface PortalProcessMapper {
    int deleteByPrimaryKey(String id);

    int insert(PortalProcess record);

    int insertSelective(PortalProcess record);

    PortalProcess selectByPrimaryKey(String id);

    int updateByPrimaryKeySelective(PortalProcess record);

    int updateByPrimaryKeyWithBLOBs(PortalProcess record);

    int updateByPrimaryKey(PortalProcess record);
}