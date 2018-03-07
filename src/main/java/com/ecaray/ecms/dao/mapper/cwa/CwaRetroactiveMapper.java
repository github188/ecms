package com.ecaray.ecms.dao.mapper.cwa;

import com.ecaray.ecms.entity.cwa.CwaRetroactive;

public interface CwaRetroactiveMapper {
    int deleteByPrimaryKey(String id);

    int insert(CwaRetroactive record);

    int insertSelective(CwaRetroactive record);

    CwaRetroactive selectByPrimaryKey(String id);

    int updateByPrimaryKeySelective(CwaRetroactive record);

    int updateByPrimaryKey(CwaRetroactive record);
}