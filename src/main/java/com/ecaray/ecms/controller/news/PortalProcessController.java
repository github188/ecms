package com.ecaray.ecms.controller.news;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.ecaray.ecms.commons.authorization.annotation.Authorization;
import com.ecaray.ecms.commons.authorization.annotation.CurrentUser;
import com.ecaray.ecms.commons.constant.Result;
import com.ecaray.ecms.entity.authority.User;
import com.ecaray.ecms.entity.news.PortalProcess;
import com.ecaray.ecms.entity.process.SysProDone;
import com.ecaray.ecms.services.news.PortalProcessService;
import com.ecaray.ecms.services.processes.ProcessService;

@RestController
@RequestMapping(value="news/process")
public class PortalProcessController {
	
	@Autowired
	PortalProcessService service;
	
	@Autowired
	ProcessService processService;
	/**
	 * 
	 * 发起审批
	 */
	@Authorization
	@RequestMapping(value = "/create", method = RequestMethod.POST)
	public Result createCtmExamine(@RequestBody PortalProcess portalProcess, @CurrentUser User user)
			throws Exception {
		portalProcess.setUserId(user.getId());
		return processService.createProcess(portalProcess);
	}
	
	/**
	 * 
	 * 发起审批
	 */
	@Authorization
	@RequestMapping(value = "/exmine", method = RequestMethod.POST)
	public Result exminePortal(@RequestBody SysProDone done, @CurrentUser User user)
			throws Exception {
		return processService.rotatingProcess(user, done);
	}
	
	/**
	 * 查询可以配置审批人的节点
	 */
	@Authorization
	@RequestMapping(value = "/nodes/list", method = RequestMethod.GET)
	public Result getSettingNodesList(@CurrentUser User user)
			throws Exception {
		return Result.success().addObject(service.getSettingNodes());
	}
	
	/**
	 * 修改文章内容
	 */
	@Authorization
	@RequestMapping(value = "/update", method = RequestMethod.POST)
	public Result updatePortalNews(@CurrentUser User user,@RequestBody PortalProcess protal)
			throws Exception {
		service.update(protal);
		return Result.success();
	}
	
	/**
	 * 保存文章内容
	 */
	@Authorization
	@RequestMapping(value = "/add", method = RequestMethod.POST)
	public Result addPortalNews(@CurrentUser User user,@RequestBody PortalProcess protal)
			throws Exception {
		service.saveProcessObject(protal);
		return Result.success();
	}
}
