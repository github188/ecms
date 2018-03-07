package com.ecaray.ecms.controller.pmo;

import com.ecaray.ecms.commons.authorization.annotation.Authorization;
import com.ecaray.ecms.commons.constant.Result;
import com.ecaray.ecms.entity.sys.Area;
import com.ecaray.ecms.entity.sys.City;
import com.ecaray.ecms.entity.sys.Province;
import com.ecaray.ecms.services.common.RegionService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * com.ecaray.imspmo.controller
 * Author ：zhxy
 * 2017/4/3 15:24
 * 说明：地区服务类
 */
@Api(description = "PMO/区域管理")
@RestController
@RequestMapping("/region")
public class RegionController {
    @Autowired
    RegionService regionService;


    @Authorization
    @ApiOperation(value = "获取省份")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "authorization", value = "authorization", required = true, dataType = "string", paramType = "header"),
    })
    @RequestMapping(value = "/province",method = RequestMethod.GET)
    public Result selectProvinces(){
        List<Province> provinceList = regionService.selectProvinces();
        return Result.success().addObject(provinceList);
    }

    @Authorization
    @ApiOperation(value = "根据省份获取城市")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "authorization", value = "authorization", required = true, dataType = "string", paramType = "header"),
    })
    @RequestMapping(value = "/{provinceId}/city",method = RequestMethod.GET)
    public Result selectCitiesByProvinceId(@PathVariable("provinceId")String provinceId){
        List<City> cityList = regionService.selectCityByProvinceId(provinceId);
        return Result.success().addObject(cityList);
    }

    @Authorization
    @ApiOperation(value = "根据城市获取区域")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "authorization", value = "authorization", required = true, dataType = "string", paramType = "header"),
    })
    @RequestMapping("/{cityId}/area")
    public Result selectAreaByCityId(@PathVariable("cityId") String cityId){
        List<Area> areaList = regionService.selectAreaByCityId(cityId);
        return Result.success().addObject(areaList);
    }
}
