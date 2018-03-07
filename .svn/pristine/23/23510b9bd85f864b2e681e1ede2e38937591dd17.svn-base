package com.ecaray.ecms.services.processes;


import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.activiti.engine.ProcessEngine;
import org.activiti.engine.RuntimeService;
import org.activiti.engine.TaskService;
import org.activiti.engine.runtime.ProcessInstance;
import org.activiti.engine.task.Task;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;

import com.ecaray.ecms.commons.constant.FlowResult;
import com.ecaray.ecms.entity.authority.User;

/**
 * com.ecaray.authority.services.processes
 * Author ：zhxy
 * 2017/4/2 23:14
 * 说明：TODO
 */
//@Service
public class PmoFlowService {
	
    @Autowired
    private RuntimeService runtimeService;
    @Autowired
    private ProcessEngine processEngine;
    @Autowired
    PmoFlowService pmoFlowService;
    @Autowired
    TaskService taskService;


    Logger logger  = LoggerFactory.getLogger(this.getClass());

    /**
     * Author ：zhxy
     * 说明：启动流程
     */
    public FlowResult startFlow(User user, String processId, String businessKey, Map<String, Object> variables){
//        identityService.setAuthenticatedUserId(user.getId());
        ProcessInstance processInstance = runtimeService
                .startProcessInstanceByKey(processId,businessKey,variables);

        logger.info(processInstance.getProcessDefinitionId()+",businessKey:"+processInstance.getBusinessKey()+" 已启动！");
        String  processInstanceId = processInstance.getProcessInstanceId();
        return flowCommitResult(processInstanceId,businessKey);
    }

    /**
     * Author ：zhxy
     * 说明：提交流程(包括会签)
     */
    public FlowResult submitFlow(User user , Map<String,Object> variables) {
        Object businessKey = variables.get("businessKey");
        if(businessKey==null||"".equals(businessKey)){
            return FlowResult.failed("business key is null");
        }
        List<Task> taskList = taskService.createTaskQuery().processInstanceBusinessKey(businessKey+"").list();
        String processInstanceId = null;
        if(taskList!=null && taskList.size()>0){
            processInstanceId = taskList.get(0).getProcessInstanceId();
        }else{
            return  FlowResult.failed("cannot find next node");
        }
        //TODO DELETE
        Task task = taskList.get(0);
        /*for(Task taskTmp:taskList) {
            if (user.getUsername().equals(task.getAssignee())) {
                task = taskTmp;
                break;
            }
        }*/ //TODO
        //完成请假申请任务
        try {
            taskService.complete(task.getId(), variables);
        }catch(Exception e){
            logger.info(e.getMessage());
            return FlowResult.failed("submit filed");
        }
        return flowCommitResult(processInstanceId,businessKey+"");
    }


    private FlowResult flowCommitResult(String processInstanceId,String businessKey){
        ProcessInstance processInstance = runtimeService.createProcessInstanceQuery().processInstanceId(processInstanceId).singleResult();
        boolean isEnded = true;
        List<Map<String,Object>> resultList = new ArrayList<Map<String,Object>>();
        if(processInstance!=null){
            isEnded = processInstance.isEnded();
            List<Task> resultTaskList = taskService.createTaskQuery().processInstanceBusinessKey(businessKey+"").list();
            for(Task resultTask:resultTaskList) {
                Map<String, Object> resultVariables = new HashMap<String, Object>();
                resultVariables.put("assignee", resultTask.getAssignee());
                resultVariables.put("actId", resultTask.getTaskDefinitionKey());
                resultVariables.put("actName", resultTask.getName());
                resultList.add(resultVariables);
            }
        }else{
            Map<String, Object> resultVariables = new HashMap<String, Object>();
            resultVariables.put("actId", "finish");
            resultVariables.put("actName", "结束流程");
            resultList.add(resultVariables);
        }
        return FlowResult.success().setEnded(isEnded).addObject(resultList);
    }

    /**
     * Author ：zhxy
     * 说明：TODO
     */
    public FlowResult getTaskByBusinessKey(String businessKey) {
        List<Task> task = taskService.createTaskQuery().processInstanceBusinessKey(businessKey).list();
        for(Task ttask:task){
            logger.info(ttask.getId());
            logger.info(ttask.getProcessDefinitionId());
            logger.info(ttask.getAssignee());
            logger.info(ttask.getParentTaskId());
        }
        return FlowResult.success();
    }

    public FlowResult selectUserTask(User user) {
        List<Task> tasks = taskService.createTaskQuery()
                .taskAssignee(user.getUsername())
                .list();
        Task task = taskService.createTaskQuery().processInstanceBusinessKey("yc0008").singleResult();
        return FlowResult.success().addObject("tasks");
    }


    //TEST
    public void selectUserTaskList(String username) {
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
}
