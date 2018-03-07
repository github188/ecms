package com.ecaray.ecms.controller.processes;

import com.ecaray.ecms.commons.constant.Result;
import io.swagger.annotations.ApiOperation;
import org.activiti.engine.IdentityService;
import org.activiti.engine.ProcessEngine;
import org.activiti.engine.RepositoryService;
import org.activiti.engine.RuntimeService;
import org.activiti.engine.repository.ProcessDefinition;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.io.FileNotFoundException;
import java.util.List;

/**
 * com.ecaray.authority.controller.processes
 * Author ：zhxy
 * 2017/4/1 11:36
 * 说明：TODO
 */
//@RestController
@RequestMapping("/activiti")
public class ActivitiFlowController {
    @Autowired
    private RuntimeService runtimeService;
    @Autowired
    private RepositoryService repositoryService;
    @Autowired
    private ProcessEngine processEngine;

    @Autowired
    private IdentityService identityService;

    @ApiOperation(value="部署流程",notes = "filename,processname")
    @RequestMapping(value="/deploy",method = RequestMethod.POST)
    public Result deployWrokFlow(@RequestParam("filename") String filename) throws FileNotFoundException {
        repositoryService.createDeployment()
                .addClasspathResource("/processes/"+filename)
                .deploy();

        return Result.success();
    }

    @ApiOperation(value ="查看流程列表",notes = "")
    @RequestMapping(value ="/list",method = RequestMethod.GET)
    public Result getDeployList(){
        List<ProcessDefinition> list = processEngine.getRepositoryService()
                .createProcessDefinitionQuery().orderByProcessDefinitionVersion().asc().list();
        for(ProcessDefinition processDefinition :list) {
            System.out.println("deployid:"+processDefinition.getDeploymentId());
            System.out.println("name:"+processDefinition.getName());
            System.out.println("resourcename:"+processDefinition.getResourceName());

        }
        return Result.success();
    }

    @ApiOperation(value ="删除流程",notes = "del flow")
    @RequestMapping(value="/delete",method = RequestMethod.DELETE)
    public Result delteFolwMessage(@RequestParam("deploymentId")String deploymentId){
        // 获取仓库服务对象
        RepositoryService repositoryService = processEngine.getRepositoryService();

        // 级联删除,会删除和当前规则相关的所有信息，包括历史
        repositoryService.deleteDeployment(deploymentId, true);

        return Result.success();
    }
}
