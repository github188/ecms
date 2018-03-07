package com.ecaray.ecms.controller.authority;

import com.ecaray.ecms.commons.authorization.annotation.Authorization;
import com.ecaray.ecms.commons.authorization.annotation.CurrentUser;
import com.ecaray.ecms.commons.constant.PageResult;
import com.ecaray.ecms.commons.constant.Result;
import com.ecaray.ecms.entity.authority.Resource;
import com.ecaray.ecms.entity.authority.User;
import com.ecaray.ecms.entity.authority.Vo.ResourceQueryFilter;
import com.ecaray.ecms.services.authority.ResourceService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;

/**
 * com.ecaray.authority.controller
 * Author ：zhxy
 * 2017/2/10 11:19
 * 说明：操作资源列表
 */
@Api(description = "权限/资源")
@RestController
@RequestMapping("authority/resource")
public class ResourceController {
    /**
     * Author ：zhxy
     * 说明：新增资源
     */
    @Autowired
    private ResourceService resourceService;


    @Authorization
    @ApiImplicitParams({
            @ApiImplicitParam(name = "authorization", value = "authorization", required = true, dataType = "string", paramType = "header"),
    })
    @ApiOperation(value = "添加资源",notes = "add resource")
    @RequestMapping(method = RequestMethod.POST)
    public Result addResource(@RequestBody Resource resource){
      return   resourceService.addResource(resource);
    }

    @Authorization
    @ApiImplicitParams({
            @ApiImplicitParam(name = "authorization", value = "authorization", required = true, dataType = "string", paramType = "header"),
    })
    @ApiOperation(value = "删除资源",notes = "del resource")
    @RequestMapping(method = RequestMethod.DELETE)
    public Result delResource(@RequestBody Resource resource){
       return  resourceService.delResource(resource);
    }

    @Authorization
    @ApiImplicitParams({
            @ApiImplicitParam(name = "authorization", value = "authorization", required = true, dataType = "string", paramType = "header"),
    })
    @ApiOperation(value = "修改资源",notes = "update resource")
    @RequestMapping(method = RequestMethod.PUT)
    public Result updateResource(@RequestBody Resource resource){
        return resourceService.updateResource(resource);
    }


    @Authorization
    @ApiImplicitParams({
            @ApiImplicitParam(name = "authorization", value = "authorization", required = true, dataType = "string", paramType = "header"),
    })
    @RequestMapping(value = "/{resourceId}/detail",method = RequestMethod.GET)
    public Result selectResourceById(@PathVariable("resourceId")String resourceId){
        return resourceService.selectResourceById(resourceId);
    }

    @Authorization
    @ApiOperation(value="查询资源",httpMethod = "GET",notes = "select resource by filter")
    @RequestMapping(value = "/list",method = RequestMethod.GET)
    @ApiImplicitParams({
            @ApiImplicitParam(name = "authorization", value = "authorization", required = true, dataType = "string", paramType = "header"),
            @ApiImplicitParam(name = "name", value = "查询名", required = false, paramType = "query",dataType = "String"),
            @ApiImplicitParam(name = "restype", value = "类型", required = false, paramType = "query",dataType = "String"),
            @ApiImplicitParam(name = "parentId", value = "父节点ID", required = false, paramType = "query",dataType = "String"),
            @ApiImplicitParam(name = "pageNum", value = "页码", required = true, paramType = "query",dataType = "int"),
            @ApiImplicitParam(name = "pageSize", value = "每页数量", required = true, paramType = "query",dataType = "int")})
    public PageResult selectResources(String name,
                                      String restype,
                                      String parentId,
                                      @RequestParam("pageNum")int pageNum,
                                      @RequestParam("pageSize")int pageSize){

        ResourceQueryFilter rqf = new ResourceQueryFilter();
        if(!StringUtils.isEmpty(name)){
            rqf.setName("%"+ name+"%");
        }
        rqf.setType(restype);
        rqf.setParentId(parentId);
        rqf.setPageNum(pageNum);
        rqf.setPageSize(pageSize);

        return resourceService.selectResourcesFilter(rqf);
    }

    @Authorization
    @ApiImplicitParams({
            @ApiImplicitParam(name = "authorization", value = "authorization", required = true, dataType = "string", paramType = "header"),
    })
    @ApiOperation(value="获取资源树",notes = "select resource trees")
    @RequestMapping(value="/tree/list",method = RequestMethod.GET)
    public Result selectTreeResources(){
        return resourceService.selectTreeResources("0");
    }
    
    @Authorization
    @ApiImplicitParams({
    	@ApiImplicitParam(name = "authorization", value = "authorization", required = true, dataType = "string", paramType = "header"),
    })
    @ApiOperation(value="获取资源树",notes = "select resource trees")
    @RequestMapping(value="{resourceId}/tree/list",method = RequestMethod.GET)
    public Result selectTreeResourcesById(@PathVariable("resourceId")String resourceId){
    	return resourceService.selectTreeResources(resourceId);
    }
    
    @Authorization
    @RequestMapping(value="/user/tree/list",method = RequestMethod.GET)
    public Result selectTreeResourcesByUserId(String userId,String parentId){
    	return resourceService.selectTreeResourcesByUserId(userId,parentId);
    }


    @Authorization
    @ApiImplicitParams({
            @ApiImplicitParam(name = "authorization", value = "authorization", required = true, dataType = "string", paramType = "header"),
    })
    @ApiOperation(value ="根据角色ID获取对应的资源",notes = "select resources by role id")
    @RequestMapping(value = "/role/resources",method = RequestMethod.GET)
    public PageResult selectResourceByRoleId(@RequestParam("roleId")String roleId,
                                              @RequestParam("pageNum")int pageNum,
                                              @RequestParam("pageSize")int pageSize){
        return resourceService.selectResourceByRoleId(roleId,pageNum,pageSize);

    }

    @Authorization
    @RequestMapping(value = "/user/resources",method = RequestMethod.GET)
    public PageResult selectResourceByUserId(@CurrentUser User user,String typeLevel,String resourceId){
        return resourceService.selectResourceByUserId(user,typeLevel,resourceId);
    }

}
