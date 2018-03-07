package com.ecaray.ecms.dao.mapper.sys;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.ecaray.ecms.entity.sys.SysToread;

public interface SysToreadMapper {
    int deleteByPrimaryKey(String id);

    int insert(SysToread record);

    int insertSelective(SysToread record);

    SysToread selectByPrimaryKey(String id);

    int updateByPrimaryKeySelective(SysToread record);

    int updateByPrimaryKey(SysToread record);

	List<SysToread> selectListByUser(@Param("userId")String userId,@Param("title")String key);

	SysToread selectUserToRead(@Param("userId")String userId, @Param("refId")String refId);
}