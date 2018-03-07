package com.ecaray.ecms.dao.mapper.authority;

import com.ecaray.ecms.entity.authority.RoleButton;

import java.util.List;

public interface RoleButtonMapper {
    int deleteByPrimaryKey(String id);

    int insert(RoleButton record);

    int insertSelective(RoleButton record);

    RoleButton selectByPrimaryKey(String id);

    int updateByPrimaryKeySelective(RoleButton record);

    int updateByPrimaryKey(RoleButton record);

    void insertRoleButtonsBatch(List<RoleButton> roleButtons);

    void deleteRoleButtonsBatch(List<RoleButton> roleButtons);
}