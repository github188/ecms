package com.ecaray.ecms.controller.authority;

import com.ecaray.ecms.commons.authorization.annotation.Authorization;
import com.ecaray.ecms.commons.constant.Result;
import com.ecaray.ecms.entity.authority.UserRole;
import com.ecaray.ecms.services.authority.UserRoleService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * com.ecaray.authority.controller
 * Author ：zhxy
 * 2017/1/18 19:19
 * 说明：角色菜单授权
 */
@Api(description = "权限/用户角色管理")
@RestController
@RequestMapping(value = "authority/user_permission")
public class UserRoleController {

    @Autowired
    private UserRoleService userRoleService;

    @Authorization
    @ApiImplicitParams({
            @ApiImplicitParam(name = "authorization", value = "authorization", required = true, dataType = "string", paramType = "header"),
    })
    @ApiOperation(value="更新用户对角色授权",notes = "role permission")
    @RequestMapping(method = RequestMethod.POST)
    public Result addUserRoleBatch(@RequestBody List<UserRole> userRoles){
       return  userRoleService.insertUserRolesBatch(userRoles);
    }
    
}
