package com.ecaray.ecms.dao.mapper.authority;

import com.ecaray.ecms.entity.authority.Resource;
import com.ecaray.ecms.entity.authority.RoleResource;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * com.ecaray.authority.mapper
 * Author ：Zhxy
 * 2017/3/23 16:54
 * 说明：
 */
public interface RoleResourceMapper {
    int deleteByPrimaryKey(RoleResource record);

    int insert(RoleResource record);

    int insertSelective(RoleResource record);

    RoleResource selectByPrimaryKey(String id);

    int updateByPrimaryKeySelective(RoleResource record);

    int updateByPrimaryKey(RoleResource record);

    void insertRoleResourcesBatch(List<RoleResource> roleResources);

    void deleteRoleResourcesBatch(List<RoleResource> roleResources);

    List<Resource> selectRoleResourceByRoleId(@Param("roleId") String roleId, @Param("sysId") String sysId);

    List<Resource> selectRoleResourceByUserId(String userId, String sysId);
}
