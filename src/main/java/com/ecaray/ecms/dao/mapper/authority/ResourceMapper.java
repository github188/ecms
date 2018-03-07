package com.ecaray.ecms.dao.mapper.authority;


import java.util.List;
import java.util.Set;

import org.apache.ibatis.annotations.Param;

import com.ecaray.ecms.entity.authority.Resource;
import com.ecaray.ecms.entity.authority.Vo.ResourceQueryFilter;
import com.ecaray.ecms.entity.authority.Vo.ResourceQueryVo;
import com.ecaray.ecms.entity.authority.Vo.ResourceTreeVo;

public interface ResourceMapper {
    int deleteByPrimaryKey(String id);

    int insert(Resource record);

    int insertSelective(Resource record);

    Resource selectByPrimaryKey(String id);

    int updateByPrimaryKeySelective(Resource record);

    int updateByPrimaryKey(Resource record);

    List<Resource> selectResourceByAppId(String appId);

    List<ResourceQueryVo> selectResourcesFilter(ResourceQueryFilter resourceQueryFilter);

    List<ResourceTreeVo> selectTreeResources(@Param("pid") String pid);

    ResourceQueryVo selectDetailByPrimaryKey(String resourceId);

    List<ResourceQueryVo> selectResourceByRoleId(@Param("roleId") String roleId);
    
    Set<String> selectOneResourceByRoleId(@Param("roleId")String roleId,@Param("parentId")String parentId);

    List<ResourceQueryVo> selectResourceByUserId(@Param("userId") String userId,
                                                 @Param("typeLevel")String typeLevel,
                                                 @Param("resourceId") String resourceId);

	List<String> selectResourceListByRoleList(@Param("list")List<String> rolelist);
}