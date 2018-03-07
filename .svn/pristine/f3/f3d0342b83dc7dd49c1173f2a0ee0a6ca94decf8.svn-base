package com.ecaray.ecms.controller.authority;

import com.ecaray.ecms.commons.authorization.annotation.Authorization;
import com.ecaray.ecms.commons.constant.Result;
import com.ecaray.ecms.entity.authority.RoleButton;
import com.ecaray.ecms.entity.authority.RoleMenu;
import com.ecaray.ecms.entity.authority.RoleResource;
import com.ecaray.ecms.services.authority.RoleResourceService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * com.ecaray.authority.controller
 * Author ：zhxy
 * 2017/1/18 21:48
 * 说明：角色权限资源
 */
@Api(description = "权限/角色资源授权")
@RestController
@RequestMapping("authority/role/resource")
public class RoleResourceController {

    @Autowired
    private RoleResourceService roleResourceService;

    @ApiOperation(value="添加角色按钮授权",notes = "app permissions")
//    @RequestMapping(value="/button",method = RequestMethod.POST)
    public Result addRoleButtons(@RequestBody List<RoleButton> roleButtons){
        return roleResourceService.addRoleButtons(roleButtons);
    }

    @ApiOperation(value="取消角色按钮授权",notes = "cancel button permission")
//    @RequestMapping(value="/button",method = RequestMethod.DELETE)
    public Result deleteRoleButtons(@RequestBody List<RoleButton> roleButtons){
        return roleResourceService.deleteRoleButtons(roleButtons);
    }

    @ApiOperation(value="添加角色菜单授权",notes = "app permissions")
//    @RequestMapping(value="/menu",method = RequestMethod.POST)
    public Result addRoleMenus(@RequestBody List<RoleMenu> roleMenus){
        return roleResourceService.addRoleMenus(roleMenus);
    }

    @ApiOperation(value="取消角色菜单授权" ,notes = "cancel resource permission")
//    @RequestMapping(value="/menu",method = RequestMethod.DELETE)
    public Result deleteRoleMenus(@RequestBody List<RoleMenu> roleMenus){
        return roleResourceService.deleteRoleMenus(roleMenus);
    }

    //权限资源授权

    @ApiOperation(value ="添加角色资源授权",notes = "add role resource")
//    @RequestMapping(method = RequestMethod.POST)
    public Result addRoleResource(RoleResource roleResource){
        return roleResourceService.addRoleResource(roleResource);
    }

    @ApiOperation(value = "删除角色资源授权",notes = "del role resource")
//    @RequestMapping(method = RequestMethod.DELETE)
    public Result delRoleResource(RoleResource roleResource){
        return roleResourceService.delRoleResource(roleResource);
    }

    @ApiOperation(value = "更新角色资源授权",notes ="update role resource")
//    @RequestMapping(method = RequestMethod.PUT)
    public Result updateRoleResource(RoleResource roleResource){
        return Result.failed("");
    }

    @Authorization
    @ApiOperation(value="根据角色和系统id获取资源信息",notes = "get resource by role and sysid")
    @RequestMapping(value = "/{roleId}/{sysId}",method = RequestMethod.GET)
    @ApiImplicitParams({
            @ApiImplicitParam(name = "authorization", value = "authorization", required = true, dataType = "string", paramType = "header"),
    })
    public Result selectRoleResourceByRoleId(@PathVariable("roleId") String roleId,
                                             @PathVariable("sysId") String sysId){
       return roleResourceService.selectRoleResourceByRoleId(roleId,sysId);
    }


    @Authorization
    @ApiOperation(value="根据角色和系统id获取资源信息",notes = "get resource by role and sysid")
    @RequestMapping(value = "/{userId}/{sysId}",method = RequestMethod.GET)
    @ApiImplicitParams({
            @ApiImplicitParam(name = "authorization", value = "authorization", required = true, dataType = "string", paramType = "header"),
    })
    public Result selectRoleResourceByUserId(@PathVariable("userId") String userId,
                                             @PathVariable("sysId") String sysId){
        return roleResourceService.selectRoleResourceByUserId(userId,sysId);
    }


    @ApiOperation(value ="批量添加角色资源授权",notes = "add role resource")
//    @RequestMapping(value = "/batch",method = RequestMethod.POST)
    public Result addRoleResourceBatch(List<RoleResource> roleResource){
        return roleResourceService.addRoleResourceBatch(roleResource);
    }

    @ApiOperation(value = "批量删除角色资源授权",notes = "del role resource")
//    @RequestMapping(value = "/batch",method = RequestMethod.DELETE)
    public Result delRoleResource(@RequestBody List<RoleResource> roleResource){
        return roleResourceService.delRoleResourceBatch(roleResource);
    }

    @Authorization
    @ApiImplicitParams({
            @ApiImplicitParam(name = "authorization", value = "authorization", required = true, dataType = "string", paramType = "header"),
    })
    @ApiOperation(value ="批量角色角色资源授权",notes = "add role resource")
    @RequestMapping(value = "/batch",method = RequestMethod.PUT)
    public Result updateRoleResourceBatch(@RequestBody List<RoleResource> roleResource){
        return roleResourceService.updateRoleResourceBatch(roleResource);
    }
    }
