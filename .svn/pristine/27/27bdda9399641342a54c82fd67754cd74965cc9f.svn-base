package com.ecaray.ecms.controller.authority;

import com.ecaray.ecms.commons.constant.PageResult;
import com.ecaray.ecms.commons.constant.Result;
import com.ecaray.ecms.entity.authority.Application;
import com.ecaray.ecms.services.authority.AppService;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

/**
 * com.ecaray.authority.controller
 * Author ：zhxy
 * 2017/1/14 15:39
 * 说明：应用
 */
@RestController
@RequestMapping("authority/apps")
public class AppController {
    @Autowired
    private AppService appService;
//    @ApiOperation(value="获取应用列表",notes="参数:pageNum，pageSize")
    @RequestMapping(value="/list",method = RequestMethod.GET)
    public PageResult selectAppList(@RequestParam int pageNum, @RequestParam int pageSize){
        return appService.selectAppList(pageNum,pageSize);
    }
//    @ApiOperation(value="添加应用",notes = "参数：app")
    @RequestMapping(method = RequestMethod.POST)
    public Result addApplication(Application application){
        return appService.addApp(application);
    }

//    @ApiOperation(value = "更新应用信息",notes = "参数：app")
    @RequestMapping(method = RequestMethod.PUT)
    public Result updateApplication(Application application){
        return appService.updateApp(application);
    }

//    @ApiOperation(value="根据id选取app",notes = "参数：id by pathvalue ")
    @RequestMapping(value="/{id}",method = RequestMethod.GET)
    public Result selectAppByKey(@PathVariable("id")String id){
        return appService.selectAppByKey(id);

    }

    @RequestMapping(value="user",method = RequestMethod.GET)
    public Result selectUserApps(@RequestParam("_uid")String id){
        return appService.selectUserApps(id);
    }
}
