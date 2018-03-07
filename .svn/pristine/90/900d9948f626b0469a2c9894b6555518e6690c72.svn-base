package com.ecaray.ecms.controller.processes;

import org.activiti.engine.RuntimeService;
import org.activiti.engine.TaskService;
import org.activiti.engine.impl.RepositoryServiceImpl;
import org.activiti.engine.impl.persistence.entity.ExecutionEntity;
import org.activiti.engine.impl.persistence.entity.ProcessDefinitionEntity;
import org.activiti.engine.impl.pvm.PvmActivity;
import org.activiti.engine.impl.pvm.PvmTransition;
import org.activiti.engine.impl.pvm.process.ActivityImpl;
import org.activiti.engine.task.Task;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

/**
 * com.ecaray.authority.controller.processes
 * Author ：zhxy
 * 2017/4/3 0:14
 * 说明：TODO test Demo
 */
public class QueryNodeListDemo {


    @Autowired
    TaskService taskService;
    @Autowired
    RepositoryServiceImpl rs;
    @Autowired
    RuntimeService runtimeService;
    @Autowired
    Task task;

    String procInstanceId ="";
    public void test(){
        //    ACTIVITI相对于JBPM来说，比较年轻，用的人少，中文方面的资料更少，我根据网上到处找得资料以及看官方文档总结出来了代码，非常不容易啊。废话不多说，直接上代码吧：
//    首先是根据流程ID获取当前任务：
        List<Task> tasks = taskService.createTaskQuery().processInstanceId(procInstanceId).list();
//    然后根据当前任务获取当前流程的流程定义，然后根据流程定义获得所有的节点：
        ProcessDefinitionEntity def = (ProcessDefinitionEntity) ((RepositoryServiceImpl)rs).getDeployedProcessDefinition(task.getProcessDefinitionId());
        List<ActivityImpl> activitiList = def.getActivities();  //rs是指RepositoryService的实例
//    根据任务获取当前流程执行ID，执行实例以及当前流程节点的ID：
        String excId = task.getExecutionId();
        ExecutionEntity execution = (ExecutionEntity) runtimeService.createExecutionQuery().executionId(excId).singleResult();
        String activitiId = execution.getActivityId();
//    然后循环activitiList 并判断出当前流程所处节点，然后得到当前节点实例，根据节点实例获取所有从当前节点出发的路径，然后根据路径获得下一个节点实例：
        for(ActivityImpl activityImpl:activitiList){
            String id = activityImpl.getId();
            if(activitiId.equals(id)){
                System.out.println("当前任务："+activityImpl.getProperty("name")); //输出某个节点的某种属性
                List<PvmTransition> outTransitions = activityImpl.getOutgoingTransitions();//获取从某个节点出来的所有线路
                for(PvmTransition tr:outTransitions){
                    PvmActivity ac = tr.getDestination(); //获取线路的终点节点
                    System.out.println("下一步任务任务："+ac.getProperty("name"));
                }
                break;
            }
        }

    }

}
