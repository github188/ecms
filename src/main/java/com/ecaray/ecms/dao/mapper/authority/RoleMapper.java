package com.ecaray.ecms.dao.mapper.authority;


import com.ecaray.ecms.entity.authority.Role;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface RoleMapper {
    int deleteByPrimaryKey(String id);

    int insert(Role record);

    int insertSelective(Role record);

    Role selectByPrimaryKey(String id);

    int updateByPrimaryKeySelective(Role record);

    int updateByPrimaryKey(Role record);

    List<Role> selectRoles(@Param("status") String status, @Param("name") String name);

    List<Role> selectRoleByUser(@Param("userId") String userId);

	String selectRoleIdByCode(int code);
}