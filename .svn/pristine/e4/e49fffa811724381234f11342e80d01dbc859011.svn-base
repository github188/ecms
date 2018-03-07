package com.ecaray.ecms.controller.pmo;

import com.ecaray.ecms.commons.authorization.annotation.Authorization;
import com.ecaray.ecms.commons.constant.Constants;
import com.ecaray.ecms.commons.constant.Result;
import com.ecaray.ecms.services.pmo.CommonService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;

/**
 * com.ecaray.imspmo.controller
 * Author ：zhxy
 * 2017/4/6 14:20
 * 说明：TODO
 */
@Api(description = "PMO/字段管理")
@RestController
@RequestMapping("pmo/common")
public class CommonController {


    @Autowired
    private CommonService commonService;
    @RequestMapping(value = "/markets",method = RequestMethod.GET)
    @Authorization
    @ApiOperation(value = "获取营销中心列表")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "authorization", value = "authorization", required = true, dataType = "string", paramType = "header"),
    })
    public Result selectCommon(HttpServletRequest request){
       return commonService.selectMarkets(request.getHeader(Constants.TOKEN_AYTHORIZATION));
    }


    @Authorization
    @ApiOperation(value = "获取营销中心列表")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "authorization", value = "authorization", required = true, dataType = "string", paramType = "header"),
    })
    @RequestMapping(value = "/users/{nocheck}",method = RequestMethod.GET)
    public Object selectUsers(HttpServletRequest request,@PathVariable("nocheck")String nocheck){
        return  commonService.selectUsers(request.getHeader(Constants.TOKEN_AYTHORIZATION),nocheck);

    }

    @Authorization
    @ApiOperation(value = "获取营销中心列表")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "authorization", value = "authorization", required = true, dataType = "string", paramType = "header"),
    })
    @RequestMapping(value ="/project/status/{type}",method = RequestMethod.GET)
    public Result selectPomProjectStatus(@PathVariable("type")String type){
       return  commonService.selectPomProjectStatus(type);
    }

    @Authorization
    @ApiOperation(value = "获取营销中心列表")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "authorization", value = "authorization", required = true, dataType = "string", paramType = "header"),
    })
    @RequestMapping(value = "/project/contacts")
    public Result selectPmoUserContacts(){
        commonService.selectUserConstantsById();
        return Result.success();
    }

}

