package com.ecaray.ecms.controller.authority;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ecaray.ecms.commons.authorization.annotation.Authorization;
import com.ecaray.ecms.commons.constant.PageResult;
import com.ecaray.ecms.commons.constant.Result;
import com.ecaray.ecms.entity.authority.Role;
import com.ecaray.ecms.entity.authority.UserRole;
import com.ecaray.ecms.services.authority.RoleService;
import com.ecaray.ecms.services.authority.UserRoleService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;

/**
 * com.ecaray.authority.controller
 * Author ：zhxy
 * 2017/1/16 11:46
 * 说明：角色操作
 */
@Api(description = "权限/角色管理")
@RestController
@RequestMapping("authority/role")
public class RoleController {

    @Autowired
    private RoleService roleService;
    @Autowired
    private UserRoleService userRoleService;

    @Authorization
    @ApiImplicitParams({
            @ApiImplicitParam(name = "authorization", value = "authorization", required = true, dataType = "string", paramType = "header"),
    })
    @ApiOperation(value = "角色列表",notes = "select  role list by filter")
    @RequestMapping(value="/list",method = RequestMethod.GET)
    public PageResult selectRoles(String status,
                                  String name,
                                  @RequestParam("pageNum")int pageNum,
                                  @RequestParam("pageSize")int pageSize){
        return  roleService.selectRoleList(status,name,pageNum,pageSize);
    }

    @Authorization
    @ApiImplicitParams({
            @ApiImplicitParam(name = "authorization", value = "authorization", required = true, dataType = "string", paramType = "header"),
    })
    @ApiOperation(value="添加角色",notes ="add role")
    @RequestMapping(method = RequestMethod.POST)
    public Result addRole(@RequestBody Role role){
        return roleService.addRole(role);
    }


    @Authorization
    @ApiImplicitParams({
            @ApiImplicitParam(name = "authorization", value = "authorization", required = true, dataType = "string", paramType = "header"),
    })
    @ApiOperation(value="修改角色" ,notes = "update role")
    @RequestMapping(method = RequestMethod.PUT)
    public Result updateRole(@RequestBody Role role){
        return roleService.updateRole(role);
    }


    @Authorization
    @ApiImplicitParams({
            @ApiImplicitParam(name = "authorization", value = "authorization", required = true, dataType = "string", paramType = "header"),
    })
    @ApiOperation(value="删除角色" ,notes = "delete role")
    @RequestMapping(value="/{roleId}",method = RequestMethod.DELETE)
    public Result delRole(@PathVariable("roleId")String roleId){
        return roleService.delRoleByKey(roleId);
    }

    @Authorization
    @ApiImplicitParams({
            @ApiImplicitParam(name = "authorization", value = "authorization", required = true, dataType = "string", paramType = "header"),
    })
    @ApiOperation(value="根据用户ID获取角色列表",notes = "select roles by user id")
    @RequestMapping(value = "/user/rolelist",method = RequestMethod.GET)
    public PageResult selectRoleByUser(@RequestParam("userId") String userId,
                                       @RequestParam("pageNum") int pageNum,
                                       @RequestParam("pageSize")int pageSize){
        return roleService.selectRoleByUser(userId,pageNum,pageSize);
    }
    
    @Authorization
    @RequestMapping(value = "/list/code",method = RequestMethod.GET)
    public Result getUserListByRoleCode(String code){
    	if(code == null) {
    		code = "8";
    	}
    	return  Result.success().addObject(userRoleService.getUserListByRoleCode(code));
    }
    
    @Authorization
    @RequestMapping(value = "/user/add",method = RequestMethod.PUT)
    public Result addUserRoleByCode(@RequestBody UserRole userRole){
    	String userId = userRole.getUserId();
    	userRoleService.addUserRoleByCode(userId,8);
    	return  Result.success();
    }
    
    @Authorization
    @RequestMapping(value = "/user/delete",method = RequestMethod.PUT)
    public Result deleteUserRoleByCode(@RequestBody UserRole userRole){
    	String userId = userRole.getUserId();
    	userRoleService.deleteUserRoleByCode(userId,8);
    	return  Result.success();
    }

}
