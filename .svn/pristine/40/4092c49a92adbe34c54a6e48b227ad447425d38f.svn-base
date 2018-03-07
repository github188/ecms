package com.ecaray.ecms.controller.processes;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.ecaray.ecms.commons.authorization.annotation.Authorization;
import com.ecaray.ecms.commons.authorization.annotation.CurrentUser;
import com.ecaray.ecms.commons.constant.PageResult;
import com.ecaray.ecms.commons.constant.Result;
import com.ecaray.ecms.commons.utils.ParaMap;
import com.ecaray.ecms.entity.authority.User;
import com.ecaray.ecms.entity.cwa.vo.CwaFilter;
import com.ecaray.ecms.entity.process.Vo.ProDoFilter;
import com.ecaray.ecms.services.cwa.CwaProcessService;
import com.ecaray.ecms.services.processes.ProcessService;
import com.ecaray.ecms.services.processes.SysProcessService;
import com.github.pagehelper.Page;

@RestController
@RequestMapping("sys/process")
public class SysProcessController {
	
	@Autowired
	ProcessService processService;
	
	@Autowired
	SysProcessService sysProcessService;
	
	@Autowired
	CwaProcessService cwaProcessService;
	
	/**
	 * 获取流程详情
	 */
	@Authorization
	@RequestMapping(value = "/details",method = RequestMethod.GET)
	public Result getProcessDetails(String processId,Integer type) throws Exception{
		return Result.success().addObject(processService.getProcessDetails(type, processId));
	}
	
	/**
	 * 获取结点按钮
	 * @throws Exception 
	 */
	@Authorization
	@RequestMapping(value = "todo/btn",method = RequestMethod.GET)
	public Result getNodesBtnId(String id,@CurrentUser User user) throws Exception {
		return Result.success().addObject(processService.getNodesBtnId(id,user));
	}
	
	/**
	 * 获取待办事项
	 */
	@Authorization
	@RequestMapping(value = "/todo/list",method = RequestMethod.GET)
	public PageResult getProDoingList(@CurrentUser User user,ProDoFilter filter){
		ParaMap map = sysProcessService.getProDoingList(user, filter);
    	Object o = map.get("object");
    	@SuppressWarnings("rawtypes")
		Page page = (Page)map.get("page");
    	Integer pageNum = (Integer)map.get("pageNum");
    	return PageResult.success().addObject(o).addPageInfo(page,pageNum);
	}
	/**
	 * 获取已办事项
	 */
	@Authorization
	@RequestMapping(value = "/done/list",method = RequestMethod.GET)
	public PageResult getProDoneList(@CurrentUser User user,ProDoFilter filter){
		ParaMap map = sysProcessService.getProDoneList(user, filter);
    	Object o = map.get("object");
    	@SuppressWarnings("rawtypes")
		Page page = (Page)map.get("page");
    	Integer pageNum = (Integer)map.get("pageNum");
    	return PageResult.success().addObject(o).addPageInfo(page,pageNum);
	}
	
	/**
	 * 获取我发起的流程
	 */
	@Authorization
	@RequestMapping(value = "/myapply/list",method = RequestMethod.GET)
	public PageResult getMyApplyList(@CurrentUser User user,ProDoFilter filter){
		ParaMap map = sysProcessService.getMyApplyList(user, filter);
    	Object o = map.get("object");
    	@SuppressWarnings("rawtypes")
		Page page = (Page)map.get("page");
    	Integer pageNum = (Integer)map.get("pageNum");
    	return PageResult.success().addObject(o).addPageInfo(page,pageNum);
	}
	
	/**
	 * 获取考勤审批单
	 * @throws Exception 
	 */
	@Authorization
	@RequestMapping(value = "/cwa/list",method = RequestMethod.GET)
	public PageResult getCwaProcessList(@CurrentUser User user,CwaFilter filter) throws Exception{
		return cwaProcessService.getCwaProcessList(user, filter);
	}
	
	/**
	 * 撤回
	 */
	@Authorization
	@RequestMapping(value = "/portal/revoke",method = RequestMethod.GET)
	public Result revokeProcess(@CurrentUser User user,String processId){
		return  processService.revokeProcess(processId,user);
	}
}
