package com.ecaray.ecms.dao.mapper.sys;

import com.ecaray.ecms.entity.pmo.SysConstants;

import java.util.List;

public interface SysConstantsMapper {
    List<SysConstants> selectByType(String  type);
}