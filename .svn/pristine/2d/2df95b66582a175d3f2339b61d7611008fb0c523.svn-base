package com.ecaray.ecms.controller.processes;

import com.ecaray.ecms.commons.constant.Result;
import io.swagger.annotations.ApiOperation;
import org.activiti.engine.*;
import org.activiti.engine.repository.ProcessDefinition;
import org.activiti.engine.repository.ProcessDefinitionQuery;
import org.activiti.engine.runtime.ProcessInstance;
import org.activiti.engine.task.Task;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import java.io.FileNotFoundException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * com.ecaray.authority.controller.processes
 * Author ：zhxy
 * 2017/3/15 12:05
 * 说明：流程管理
 */
//@Controller
@RequestMapping("workflow")
public class FlowDeployController {
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
    public Result deployWrokFlow(@RequestParam("filename") String filename, @RequestParam("processid") String processid ) throws FileNotFoundException {
        repositoryService.createDeployment()
                .addClasspathResource("activiti/processes/"+filename)
                .deploy();
        ProcessDefinitionQuery processDefinitionQuery = repositoryService.createProcessDefinitionQuery();
        long count = processDefinitionQuery.processDefinitionKey("oa-test-31").count();
        return Result.success();
    }
    @RequestMapping(value ="/list",method = RequestMethod.GET)
    public Result getDeployList(){
        List<ProcessDefinition> list = processEngine.getRepositoryService()
                .createProcessDefinitionQuery().orderByProcessDefinitionVersion().asc().list();
        for(ProcessDefinition processDefinition :list) {
           System.out.println("deployid:"+processDefinition.getDeploymentId());
           System.out.println("name:"+processDefinition.getName());
           System.out.println("resourcename:"+processDefinition.getResourceName());
           System.out.println("tenantId:"+processDefinition.getTenantId());
       }

        return Result.success();
    }

    @RequestMapping(value = "/start",method = RequestMethod.POST)
    public Result startWorkFlow(@RequestParam("processkey") String processkey){
        runtimeService = processEngine.getRuntimeService();
        runtimeService.startProcessInstanceById(processkey);
       return Result.success();
    }


    @ApiOperation(value="启动流程",notes = "start flow")
    @RequestMapping(value = "/oa/start",method = RequestMethod.PUT)
    public Result oaFlowTest(@RequestParam("userId")String userId){
        RepositoryService repositoryService = processEngine.getRepositoryService();
        //创建查询对象
        ProcessDefinitionQuery query = repositoryService.createProcessDefinitionQuery();
        //添加查询条件
        query.processDefinitionKey("oa-test-31");//通过key获取
        // .processDefinitionName("My process")//通过name获取
        // .orderByProcessDefinitionId()//根据ID排序
        //执行查询获取流程定义明细
        List<ProcessDefinition> pds = query.list();
        for (ProcessDefinition pd : pds) {
            System.out.println("ID:"+pd.getId()+",NAME:"+pd.getName()+",KEY:"+pd.getKey()+",VERSION:"+pd.getVersion()+",RESOURCE_NAME:"+pd.getResourceName()+",DGRM_RESOURCE_NAME:"+pd.getDiagramResourceName());
        }
        startFlow(userId);
        return Result.success();
    }

    /**
     * Author ：zhxy
     * 说明：启动请假流程
     */
    public void startFlow(String userId){

        RuntimeService runtimeService = processEngine.getRuntimeService();
        /**
         * 启动请假单流程  并获取流程实例
         * 因为该请假单流程可以会启动多个所以每启动一个请假单流程都会在数据库中插入一条新版本的流程数据
         * 通过key启动的流程就是当前key下最新版本的流程
         *
         */

        Map<String, Object> variables = new HashMap<String, Object>();
        variables.put("userId",userId);
        ProcessInstance processInstance = runtimeService.startProcessInstanceByKey("oa-test-31",variables);
        System.out.println("id:"+processInstance.getId()+",activitiId:"+processInstance.getActivityId());
    }

    /**
     * Author ：zhxy
     * 说明：任务查询
     */
    @ApiOperation(value="查询当前任务",notes = "query current users")
    @RequestMapping(value = "/oa/test/query",method = RequestMethod.GET)
    public void queryTask(@RequestParam("username") String username){
        //获取任务服务对象
        TaskService taskService = processEngine.getTaskService();
        //根据接受人获取该用户的任务
        List<Task> tasks = taskService.createTaskQuery()
                .taskAssignee(username)
                .list();
        List<Task> tasks2 = taskService.createTaskQuery()
                .taskAssignee("张三")
                .list();

        for (Task task : tasks) {
            System.out.println("ID:"+task.getId()+",姓名:"+task.getName()+",接收人:"+task.getAssignee()+",开始时间:"+task.getCreateTime());
        }
    }

    @ApiOperation(value = "完成流程的当前环节",notes = "complete")
    @RequestMapping(value = "/oa/test/complete",method = RequestMethod.PUT)
    public void startTask(@RequestParam("taskId") String taskId, @RequestParam("day")int day){
        TaskService taskService = processEngine.getTaskService();
        Map<String, Object> variables = new HashMap<String, Object>();
        variables.put("day", day);
        //taskId 就是查询任务中的 ID
        //完成请假申请任务
        taskService.complete(taskId ,variables);
    }


    @ApiOperation(value ="删除流程",notes = "del flow")
    @RequestMapping(value="/oa/test/delete",method = RequestMethod.DELETE)
    public void delteFolwMessage(@RequestParam("deploymentId")String deploymentId){
            // 获取仓库服务对象
            RepositoryService repositoryService = processEngine.getRepositoryService();

            // 级联删除,会删除和当前规则相关的所有信息，包括历史
            repositoryService.deleteDeployment(deploymentId, true);
    }
}
