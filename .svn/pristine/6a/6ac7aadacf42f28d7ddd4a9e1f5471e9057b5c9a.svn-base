package com.ecaray.ecms.controller.processes;

import com.ecaray.ecms.commons.authorization.annotation.Authorization;
import com.ecaray.ecms.commons.authorization.annotation.CurrentUser;
import com.ecaray.ecms.commons.constant.FlowResult;
import com.ecaray.ecms.entity.authority.User;
import com.ecaray.ecms.services.processes.PmoFlowService;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.List;
import java.util.Map;

/**
 * com.ecaray.authority.controller.processes
 * Author ：zhxy
 * 2017/4/1 17:57
 * 说明：TODO
 */
//@RestController
@RequestMapping("pmo/flow")
public class PmoFlowController {

    //Pmo流程服务类
    @Autowired
    PmoFlowService pmoFlowService;

    @ApiOperation(value="启动流程",notes = "start work flow")
    @RequestMapping(value = "/start",method = RequestMethod.POST)
/*
    @Authorization
*/

    /*@ApiImplicitParams({
            @ApiImplicitParam(name = "authorization", value = "authorization", required = true, dataType = "string", paramType = "header"),
    })*/
    public FlowResult startFlow(@RequestBody Map<String,Object> variables){
        String processId = variables.get("processId")==null?null:variables.get("processId")+""  ;
        String businessKey = variables.get("businessKey")==null?null:variables.get("businessKey")+"";

        User user = new User();
        user.setId("4413815445997");
        user.setUsername("yisq");
        variables.put("userId",user.getUsername());
        return pmoFlowService.startFlow(user,processId,businessKey,variables);
    }

    @ApiOperation(value="提交审核",notes = "submit work flow")
    @RequestMapping(value = "/submit",method = RequestMethod.POST)
  /*  @Authorization
    @ApiImplicitParams({
            @ApiImplicitParam(name = "authorization", value = "authorization", required = true, dataType = "string", paramType = "header"),
    })*/
    public FlowResult submitFlow(/*@CurrentUser User user ,*/@RequestBody Map<String,Object> map){
        User user = new User();
        user.setId("4413815445997");
        user.setUsername("yisq");
        return pmoFlowService.submitFlow(user,map);
    }

    @ApiOperation(value = "会签",notes = "countersign")
    @Authorization
    @RequestMapping(value="/countersign",method = RequestMethod.POST)
    @ApiImplicitParams({
            @ApiImplicitParam(name = "authorization", value = "authorization", required = true, dataType = "string", paramType = "header"),
    })
    public FlowResult counterSign(@CurrentUser User user , @RequestBody Map<String,Object> variables){
        String [] receivePeople = {"aa","bb"};
        List<String> assigneeList = Arrays.asList(receivePeople);
        variables.put("assigneeList", assigneeList);
        return pmoFlowService.submitFlow(user ,variables);
    }

    @RequestMapping(value = "/{businessKey}/task",method = RequestMethod.GET)
    public FlowResult getTaskByBusinessKey(@PathVariable String businessKey){
        return pmoFlowService.getTaskByBusinessKey(businessKey);
    }

    @Authorization
    @RequestMapping(value = "/user/task",method = RequestMethod.GET)
    @ApiImplicitParams({
            @ApiImplicitParam(name = "authorization", value = "authorization", required = true, dataType = "string", paramType = "header"),
    })
    public FlowResult getUserTask(@CurrentUser User user){
        return pmoFlowService.selectUserTask(user);
    }


    @ApiOperation(value="查询当前任务",notes = "query current users")
    @RequestMapping(value = "/oa/test/query",method = RequestMethod.GET)
    public void queryTask(@RequestParam("username") String username){
        pmoFlowService.selectUserTaskList(username);
    }

}
