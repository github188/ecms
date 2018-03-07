package com.ecaray.ecms.dao.mapper.authority;

import com.ecaray.ecms.entity.authority.User;
import com.ecaray.ecms.entity.authority.UserRole;

import java.util.List;

public interface UserRoleMapper {
    int deleteByPrimaryKey(String id);

    int insert(UserRole record);

    int insertSelective(UserRole record);

    UserRole selectByPrimaryKey(String id);

    int updateByPrimaryKeySelective(UserRole record);

    int updateByPrimaryKey(UserRole record);

    /**
     * Author ：zhxy
     * 说明：批量插入
     */
    void insertUserRolesBatch(List<UserRole> userRoles);
    List<String> selectUserRoleList(String userId);
    /**
     * Author ：zhxy
     * 说明：删除用户对应的所有角色
     */
    void deleteUserRolesBatch(List<UserRole> userRoles);

	String selectByRoleCode(int code);

	void deleteUserRole(UserRole userRole);

	List<String> selectRoleIdListByUserId(String userId);

	List<String> selectRoleCodeListByUserId(String userId);

	List<UserRole> selectUserListByRoleCode(String code);
}