package com.ecaray.ecms.controller.pmo;

import com.ecaray.ecms.commons.authorization.annotation.Authorization;
import com.ecaray.ecms.commons.authorization.annotation.CurrentUser;
import com.ecaray.ecms.commons.constant.PageResult;
import com.ecaray.ecms.commons.constant.Result;
import com.ecaray.ecms.entity.authority.User;
import com.ecaray.ecms.entity.pmo.Vo.PmoPersonModel;
import com.ecaray.ecms.entity.pmo.Vo.PmoProjectModel;
import com.ecaray.ecms.entity.pmo.Vo.ProjectQueryFilter;
import com.ecaray.ecms.services.pmo.PmoProjectService;
import com.github.pagehelper.PageHelper;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * com.ecaray.imspmo.controller
 * Author ：zhxy
 * 2017/3/30 9:55
 * 说明：项目controller
 */
@Api(description = "PMO/项目管理")
@Controller
@RequestMapping("pmo/project")
public class PmoProjectController {
    Logger loger = LoggerFactory.getLogger(PmoProjectController.class);

    @Autowired
    private PmoProjectService pmoProjectService;

    /**
     * Author ：zhxy
     * 说明：添加项目
     */
    @Authorization
    @ApiOperation(value = "添加项目")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "authorization", value = "authorization", required = true, dataType = "string", paramType = "header"),
    })
    @RequestMapping(method = RequestMethod.POST)
    public @ResponseBody Result addProject(@CurrentUser User user, @RequestBody PmoProjectModel pmoProjectModel, HttpServletRequest request){
        loger.info("新增项目");
        return pmoProjectService.addProject(pmoProjectModel,user);
    }

    /**
     * Author ：zhxy
     * 说明：关闭项目
     */
    @Authorization
    @ApiOperation(value = "关闭项目")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "authorization", value = "authorization", required = true, dataType = "string", paramType = "header"),
    })
    @RequestMapping(value = "/{projectId}/close",method = RequestMethod.PUT)
    public @ResponseBody Result closeProject(@PathVariable("projectId") String projectId){
        return pmoProjectService.closeProject(projectId);
    }


    @Authorization
    @ApiOperation(value = "更新项目")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "authorization", value = "authorization", required = true, dataType = "string", paramType = "header"),
    })
    @RequestMapping(value = "/update",method = RequestMethod.PUT)
    public @ResponseBody Result updateProject(@RequestBody PmoProjectModel pmoProjectModel){
        return pmoProjectService.updateProject(pmoProjectModel);
    }
    /**
     * Author ：zhxy
     * 说明：获取项目详情
     */

    @Authorization
    @ApiOperation(value = "获取项目详情")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "authorization", value = "authorization", required = true, dataType = "string", paramType = "header"),
    })
    @RequestMapping(value = "/{projectId}/detail",method = RequestMethod.GET)
    public @ResponseBody Result getProjectDetail(@PathVariable("projectId") String projectId){
        return pmoProjectService.getProjectDetail(projectId);
    }

    /**
     * Author ：zhxy
     * 说明：根据条件查询项目列表
     */
    @Authorization
    @ApiOperation(value = "根据条件查询项目")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "authorization", value = "authorization", required = true, dataType = "string", paramType = "header"),
    })
    @RequestMapping(value = "/list",method = RequestMethod.GET)
    public @ResponseBody PageResult selectProjectList(ProjectQueryFilter projectQueryFilter,@CurrentUser User user){
        PageHelper.startPage(projectQueryFilter.getPageNum(), projectQueryFilter.getPageSize());
        return pmoProjectService.selectProjectList(projectQueryFilter,user);
    }


    @Authorization
    @ApiOperation(value = "添加项目人员")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "authorization", value = "authorization", required = true, dataType = "string", paramType = "header"),
    })
    @RequestMapping("/person")
    public Result addPersonBatch(@RequestBody PmoPersonModel pmoPersonModel){
       return  pmoProjectService.addPersonBatch(pmoPersonModel);
    }

    @Authorization
    @ApiOperation(value = "获取项目相关人员")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "authorization", value = "authorization", required = true, dataType = "string", paramType = "header"),
    })
    @RequestMapping(value="/{projectId}/users",method = RequestMethod.GET)
    public @ResponseBody Result selectPmoProjectUsers(@PathVariable("projectId")String projectId){
        return pmoProjectService.selectPmoProjectUsers(projectId);
    }



    @ApiOperation(value = "导出项目")
    @RequestMapping(value = "/download/excel",method = RequestMethod.GET)
    public void downloadExcel(ProjectQueryFilter projectQueryFilter ,
                              HttpServletResponse response,
                              HttpServletRequest request){
        pmoProjectService.downloadProjectExcel(projectQueryFilter,response,request);
    }


    @Authorization
    @ApiOperation(value = "获取项目人员树")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "authorization", value = "authorization", required = true, dataType = "string", paramType = "header"),
    })
    @RequestMapping(value="/{projectId}/person_tree",method = RequestMethod.GET)
    public @ResponseBody  Result selectPmoProPersonTree(@PathVariable("projectId")String projectId){
       return  pmoProjectService.selectPmoProPersonTree(projectId);
    }


    @Authorization
    @ApiOperation(value = "数量统计")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "authorization", value = "authorization", required = true, dataType = "string", paramType = "header"),
    })
    @RequestMapping(value="/count",method = RequestMethod.GET)
    public @ResponseBody Result selectPmoProjectCount(HttpServletRequest request){
       return pmoProjectService.selectPmoProjectCount(request);
    }


    @Authorization
    @ApiOperation(value = "获取当前用户的项目角色")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "authorization", value = "authorization", required = true, dataType = "string", paramType = "header"),
    })
    @RequestMapping(value="/{proId}/role",method = RequestMethod.GET)
    public @ResponseBody Result selectByPersonId( @CurrentUser User user ,@PathVariable("proId")String proId ){
        return pmoProjectService.selectPmoProjectRole(user,proId);
    }


}
