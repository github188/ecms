package com.ecaray.ecms.dao.mapper.cwa;

import java.util.List;

import com.ecaray.ecms.entity.cwa.CwaDeptAdmin;

public interface CwaDeptAdminMapper {
    int deleteByPrimaryKey(String id);

    int insert(CwaDeptAdmin record);

    int insertSelective(CwaDeptAdmin record);

    CwaDeptAdmin selectByPrimaryKey(String id);

    int updateByPrimaryKeySelective(CwaDeptAdmin record);

    int updateByPrimaryKey(CwaDeptAdmin record);

    CwaDeptAdmin selectByPrimaryDepId(String attendaceId);

	List<String> selectdepListByUserId(String userId);
}