package com.ecaray.ecms.dao.mapper.authority;


import com.ecaray.ecms.entity.authority.Application;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface ApplicationMapper {
    int deleteByPrimaryKey(String id);

    int insert(Application record);

    int insertSelective(Application record);

    Application selectByPrimaryKey(String id);

    int updateByPrimaryKeySelective(Application record);

    int updateByPrimaryKey(Application record);

    List<Application> selectApps();

    List<Application> selectUserApps(@Param("id") String id);
}