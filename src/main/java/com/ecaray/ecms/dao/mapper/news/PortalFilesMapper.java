package com.ecaray.ecms.dao.mapper.news;

import java.util.List;

import com.ecaray.ecms.entity.news.PortalFiles;

public interface PortalFilesMapper {
    int deleteByPrimaryKey(PortalFiles key);

    int insert(PortalFiles record);

    int insertSelective(PortalFiles record);

    PortalFiles selectByPrimaryKey(PortalFiles key);

    int updateByPrimaryKeySelective(PortalFiles record);

    int updateByPrimaryKey(PortalFiles record);

	List<PortalFiles> selectListByPortalId(String id);

	void deleteByPoralId(String id);
}