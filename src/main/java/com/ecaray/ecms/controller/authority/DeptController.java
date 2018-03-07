package com.ecaray.ecms.controller.authority;

import com.ecaray.ecms.commons.authorization.annotation.Authorization;
import com.ecaray.ecms.commons.constant.Result;
import com.ecaray.ecms.entity.authority.Dept;
import com.ecaray.ecms.services.authority.DeptService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

/**
 * com.ecaray.authority.controller
 * Author ：zhxy
 * 2017/2/8 10:34
 * 说明：部门信息
 */
@Api(description = "权限/科室")
@RestController
@RequestMapping("authority/dep")
public class DeptController {

    @Autowired
    private DeptService deptService;

    @ApiOperation(value = "添加部门信息",notes = "add dep")
    @RequestMapping(method = RequestMethod.POST)
    @Authorization
    @ApiImplicitParams({
            @ApiImplicitParam(name = "authorization", value = "authorization", required = true, dataType = "string", paramType = "header"),
    })
    public Result addDept(@RequestBody Dept dept){
        return deptService.addDept(dept);
    }

    @ApiOperation(value="更新部门信息",notes = "update dep")
    @RequestMapping(method = RequestMethod.PUT)
    @Authorization
    @ApiImplicitParams({
            @ApiImplicitParam(name = "authorization", value = "authorization", required = true, dataType = "string", paramType = "header"),
    })
    public Result updateDept(@RequestBody Dept dept){
        return deptService.updateDept(dept);
    }

    @ApiOperation(value="删除部门信息",notes = "delete dep")
    @RequestMapping(value = "/{id}/delete",method = RequestMethod.DELETE)


    @Authorization
    @ApiImplicitParams({
            @ApiImplicitParam(name = "authorization", value = "authorization", required = true, dataType = "string", paramType = "header"),
    })
    public  Result deleteDept(@PathVariable("id")long id){
        return deptService.deleteDept(id);
    }

    @ApiOperation(value="获取部门信息列表",notes = "delete dep")
    @RequestMapping(value = "/{pid}/list",method = RequestMethod.GET)
    @Authorization
    @ApiImplicitParams({
            @ApiImplicitParam(name = "authorization", value = "authorization", required = true, dataType = "string", paramType = "header"),
    })
    public Result selectDepsByParentId(@PathVariable("pid") String pid){
        return deptService.selectDepsByParentId(pid);
    }


    @Authorization
    @ApiImplicitParams({
            @ApiImplicitParam(name = "authorization", value = "authorization", required = true, dataType = "string", paramType = "header"),
    })
    @ApiOperation(value="根据科室ID，获取科室信息",notes = "select dept message by dept id")
    @RequestMapping(value ="/{depId}/detail",method = RequestMethod.GET)
    public Result selectDeptDetailById(@PathVariable("depId") long depId){
        return deptService.selectDeptDetailById(depId);
    }

//    @Authorization
//    @ApiImplicitParams({
//            @ApiImplicitParam(name = "authorization", value = "authorization", required = true, dataType = "string", paramType = "header"),
//    })
//    @ApiOperation(value="获取部门信息列表(树表)",notes = "select dept tree map")
//    @RequestMapping(value = "/tree/list",method = RequestMethod.GET)
//    public Result selectDeptTreeList(String userId){
//        return deptService.selectDeptTreeList(userId);
//    }
    
    @Authorization
    @RequestMapping(value = "/list/pid",method = RequestMethod.GET)
    public Result getDeptListByParentId(String parentId){
    	return Result.success().addObject(deptService.getDeptListByParentId(parentId));
    }
}
