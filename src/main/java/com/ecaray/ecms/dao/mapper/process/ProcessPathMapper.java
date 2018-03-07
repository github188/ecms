package com.ecaray.ecms.dao.mapper.process;

import com.ecaray.ecms.entity.process.ProcessPathKey;

public interface ProcessPathMapper {
    int deleteByPrimaryKey(ProcessPathKey key);

    int insert(ProcessPathKey record);

    int insertSelective(ProcessPathKey record);
    
    String selectPathByType(Integer type);
}