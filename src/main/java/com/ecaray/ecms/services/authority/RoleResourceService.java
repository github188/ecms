package com.ecaray.ecms.services.authority;

import com.ecaray.ecms.commons.constant.Result;
import com.ecaray.ecms.dao.mapper.authority.RoleButtonMapper;
import com.ecaray.ecms.dao.mapper.authority.RoleMenuMapper;
import com.ecaray.ecms.dao.mapper.authority.RoleResourceMapper;
import com.ecaray.ecms.entity.authority.Resource;
import com.ecaray.ecms.entity.authority.RoleButton;
import com.ecaray.ecms.entity.authority.RoleMenu;
import com.ecaray.ecms.entity.authority.RoleResource;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * com.ecaray.authority.services
 * Author ：zhxy
 * 2017/1/18 21:21
 * 说明：用户权限
 */
@Service
public class RoleResourceService {
    @Autowired
    private RoleButtonMapper roleButtonMapper;
    @Autowired
    private RoleMenuMapper roleMenuMapper;
    @Autowired
    private RoleResourceMapper roleResourceMapper;

    Logger logger  = LoggerFactory.getLogger(RoleResourceService.class);

    /**;
     * Author ：zhxy
     * 说明：添加用户按钮授权
     */
    public Result addRoleButtons(List<RoleButton> roleButtons){
       roleButtonMapper.insertRoleButtonsBatch(roleButtons);
        return Result.success();
    }

    /**
     * Author ：zhxy
     * 说明：删除角色按钮授权
     */

    public Result deleteRoleButtons(List<RoleButton> roleButtons){
        roleButtonMapper.deleteRoleButtonsBatch(roleButtons);
        return Result.success();
    }

    /**
     * Author ：zhxy
     * 说明：添加角色菜单授权
     */
    public Result addRoleMenus(List<RoleMenu> roleMenus){
        roleMenuMapper.insertRoleMenusBatch(roleMenus);
        return Result.success();
    }

    /**
     * Author ：zhxy
     * 说明：删除角色菜单授权
     */
    public Result deleteRoleMenus(List<RoleMenu> roleMenus){
        roleMenuMapper.deleteRoleMenusBatch(roleMenus);
        return Result.success();
    }

    /** 资源角色*/
    /**
     * Author ：zhxy
     * 说明：新增角色资源授权
     */
    public Result addRoleResource(RoleResource roleResource) {
        roleResourceMapper.insert(roleResource);
        return Result.success();
    }

    /**
     * Author ：zhxy
     * 说明：删除角色资源,角色ID 和资源ID
     */
    public Result delRoleResource(RoleResource roleResource){
        roleResourceMapper.deleteByPrimaryKey(roleResource);
        return Result.success();
    }

    /**
     * Author ：zhxy
     * 说明：批量新增角色资源
     */
    public Result addRoleResourceBatch(List<RoleResource> roleResources){
        roleResourceMapper.insertRoleResourcesBatch(roleResources);
        return Result.success();
    }

    /**
     * Author ：zhxy
     * 说明：批量删除角色资源信息
     */
    public Result delRoleResourceBatch(List<RoleResource> roleResources){
        roleResourceMapper.deleteRoleResourcesBatch(roleResources);
        return Result.success();
    }

    /**
     * Author ：zhxy
     * 说明：根据系统和角色ID，选取用户资源
     */

    public Result selectRoleResourceByRoleId(String roleId,String sysId) {
        List<Resource> resources  = roleResourceMapper.selectRoleResourceByRoleId(roleId,sysId);
        return Result.success().addObject(resources);
    }

    public Result selectRoleResourceByUserId(String userId,String sysId) {
        List<Resource> resources  = roleResourceMapper.selectRoleResourceByUserId(userId,sysId);
        return Result.success().addObject(resources);
    }

    //更新角色资源授权
    @Transactional
    public Result updateRoleResourceBatch(List<RoleResource> roleResources) {
        logger.info("update role resource batch:"+System.currentTimeMillis());
        for(RoleResource roleRes :roleResources){
            if("1".equals(roleRes.getRoleId())){
                return Result.failed("超级管理员权限不允许修改!");
            }
        }
        //根据用户角色来删除该角色所对应的所有资源
        roleResourceMapper.deleteRoleResourcesBatch(roleResources);
        //插入传入的用户角色资源
        roleResourceMapper.insertRoleResourcesBatch(roleResources);

        return Result.success();
    }
}
