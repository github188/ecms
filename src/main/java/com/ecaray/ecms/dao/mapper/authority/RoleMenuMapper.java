package com.ecaray.ecms.dao.mapper.authority;

import com.ecaray.ecms.entity.authority.RoleMenu;

import java.util.List;

public interface RoleMenuMapper {
    int deleteByPrimaryKey(String id);

    int insert(RoleMenu record);

    int insertSelective(RoleMenu record);

    RoleMenu selectByPrimaryKey(String id);

    int updateByPrimaryKeySelective(RoleMenu record);

    int updateByPrimaryKey(RoleMenu record);

    void insertRoleMenusBatch(List<RoleMenu> roleMenus);

    void deleteRoleMenusBatch(List<RoleMenu> roleMenus);
}