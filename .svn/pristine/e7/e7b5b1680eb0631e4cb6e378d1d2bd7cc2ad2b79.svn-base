package com.ecaray.ecms.controller.pmo;

import com.ecaray.ecms.commons.authorization.annotation.Authorization;
import com.ecaray.ecms.commons.authorization.annotation.CurrentUser;
import com.ecaray.ecms.commons.constant.PageResult;
import com.ecaray.ecms.commons.constant.Result;
import com.ecaray.ecms.commons.exception.FlowSubmitException;
import com.ecaray.ecms.entity.authority.User;
import com.ecaray.ecms.entity.pmo.PmoRequire;
import com.ecaray.ecms.entity.pmo.PmoRequireTask;
import com.ecaray.ecms.entity.pmo.Vo.PmoRequireTaskModel;
import com.ecaray.ecms.entity.pmo.Vo.RequireQueryFilter;
import com.ecaray.ecms.services.pmo.PmoRequireService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.text.SimpleDateFormat;
import java.util.Date;

/**
 * com.ecaray.imspmo.controller
 * Author ：zhxy
 * 2017/3/30 11:29
 * 说明：项目需求的controller
 */
@Api(description = "PMO/需求管理")
@RestController
@RequestMapping("pmo/require")
public class PmoRequireController {

    @Autowired
    private PmoRequireService pmoRequireService;
    /**
     * Author ：zhxy
     * 说明：新增需求
     */
    @Authorization
    @ApiOperation(value = "新增需求")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "authorization", value = "authorization", required = true, dataType = "string", paramType = "header"),
    })
    @RequestMapping(value = "/add",method = RequestMethod.POST)
    public Result addRequire(@RequestBody PmoRequire pmoRequire, @CurrentUser User user) throws Exception {
     return  pmoRequireService.addRequire(pmoRequire,user);
    }

    /**
     * Author ：zhxy
     * 说明：新增并提交需求
     */
    @Authorization
    @ApiOperation(value = "新增并提交需求")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "authorization", value = "authorization", required = true, dataType = "string", paramType = "header"),
    })
    @RequestMapping(value = "/add_submit",method = RequestMethod.POST)
    public Result addAndSubmitRequire(@RequestBody PmoRequire pmoRequire, @CurrentUser User user) throws Exception {
        return  pmoRequireService.addAndSubmitRequire(pmoRequire,user);
    }
    /**
     * Author ：zhxy
     * 说明：提交需求
     */

    @Authorization
    @ApiOperation(value = "提交需求")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "authorization", value = "authorization", required = true, dataType = "string", paramType = "header"),
    })
    @RequestMapping(value = "/flow/submit",method = RequestMethod.POST)
    public Result submitRequire(@RequestBody PmoRequire pmoRequire,@CurrentUser User user) throws Exception {
       return  pmoRequireService.submitRequire(pmoRequire,user);
    }

    /**
     * Author ：zhxy
     * 说明：一审
     */
    @Authorization
    @ApiOperation(value = "一审")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "authorization", value = "authorization", required = true, dataType = "string", paramType = "header"),
    })
    @RequestMapping(value = "/flow/verify1",method =  RequestMethod.POST)
    public Result verify1Require(@RequestBody PmoRequire pmoRequire,@CurrentUser User user) throws Exception {
       return  pmoRequireService.verify1(pmoRequire,user);
    }

    /**
     * Author ：zhxy
     * 说明：二审
     */

    @Authorization
    @ApiOperation(value = "需求二审")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "authorization", value = "authorization", required = true, dataType = "string", paramType = "header"),
    })
    @RequestMapping(value="/flow/verify2",method = RequestMethod.POST)
    public Result verify2Require(@RequestBody PmoRequire pmoRequire,@CurrentUser User user) throws Exception{
       return  pmoRequireService.verify2(pmoRequire,user);
    }

    /**
     * Author ：zhxy
     * 说明：任务派发
     */

    @Authorization
    @ApiOperation(value = "任务派发")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "authorization", value = "authorization", required = true, dataType = "string", paramType = "header"),
    })
    @RequestMapping(value="/flow/distribute",method = RequestMethod.POST)
    public Result distributeRequire(@RequestBody PmoRequireTaskModel pmoRequireTaskModel,
                                    @CurrentUser User user) throws Exception {
        return pmoRequireService.distributeRequire(pmoRequireTaskModel, user);
    }

    /**
     * Author ：zhxy
     * 说明：任务反馈
     */
    @Authorization
    @ApiOperation(value = "任务反馈")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "authorization", value = "authorization", required = true, dataType = "string", paramType = "header"),
    })
    @RequestMapping(value="/flow/completeTask",method = RequestMethod.POST)
    public Result distributeRequire(@RequestBody  PmoRequireTask pmoRequireTask,HttpServletRequest request) throws Exception {
        return pmoRequireService.completeRequireTask(pmoRequireTask, request);
    }

    /**
     * Author ：zhxy
     * 说明：流程提交结束
     */
    @Authorization
    @ApiOperation(value = "提交流程结束")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "authorization", value = "authorization", required = true, dataType = "string", paramType = "header"),
    })
    @RequestMapping(value="/flow/{requireId}/finish",method = RequestMethod.POST)
    public Result finishRequire(@PathVariable("requireId")String requireId,@CurrentUser User user) throws FlowSubmitException{
        PmoRequire pmoRequire =new PmoRequire();
        pmoRequire.setId(requireId);
        return pmoRequireService.finishRequire(pmoRequire, user);
    }

    /**
     * Author ：zhxy
     * 说明：根据传入条件查询列表
     */

    @Authorization
    @ApiOperation(value = "根据传入人条件查询列表")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "authorization", value = "authorization", required = true, dataType = "string", paramType = "header"),
    })
    @RequestMapping(value = "/list",method = RequestMethod.GET)
    public PageResult selectRequireList( RequireQueryFilter requireQueryFilter,@CurrentUser User user){
        return pmoRequireService.selectRequireList(requireQueryFilter,user);
    }

    /**
     * Author ：zhxy
     * 说明：需求详情
     */
    @Authorization
    @ApiOperation(value = "需求详情")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "authorization", value = "authorization", required = true, dataType = "string", paramType = "header"),
    })
    @RequestMapping(value="/{requireId}/detail",method = RequestMethod.GET)
    public Result selectRequireDetailById(@PathVariable("requireId")String requireId){
        return pmoRequireService.selectRequireDetailById(requireId);
    }


    @ApiOperation(value = "导出需求")
    @RequestMapping(value = "/download/excel",method = RequestMethod.GET)
    public void downloadExcel(RequireQueryFilter requireQueryFilter , HttpServletResponse response,
                              HttpServletRequest request){
        pmoRequireService.downloadRequireExcel(requireQueryFilter,response,request);
    }


    @Authorization
    @ApiOperation(value = "需求统计")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "authorization", value = "authorization", required = true, dataType = "string", paramType = "header"),
    })
    @RequestMapping(value = "/count",method = RequestMethod.GET)
    public Result selectRequireCount(HttpServletRequest request){
       return  pmoRequireService.selectRequireCount(request);
    }

}
