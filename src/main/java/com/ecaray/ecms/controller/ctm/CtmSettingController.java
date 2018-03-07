package com.ecaray.ecms.controller.ctm;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.ecaray.ecms.commons.constant.PageResult;
import com.ecaray.ecms.commons.constant.Result;
import com.ecaray.ecms.commons.utils.ParaMap;
import com.ecaray.ecms.entity.ctm.Vo.CtmNodesAttrVo;
import com.ecaray.ecms.entity.process.SysParameter;
import com.ecaray.ecms.entity.process.Vo.NodesUserListVo;
import com.ecaray.ecms.entity.process.Vo.ParmeterVo;
import com.ecaray.ecms.services.ctm.CtmSettingService;
import com.ecaray.ecms.services.processes.ProcessSettingService;
import com.ecaray.ecms.services.processes.base.SysNodeAttrService;
import com.github.pagehelper.Page;

@RestController()
@RequestMapping("ctm/setting")
public class CtmSettingController {
	
	@Autowired
	CtmSettingService ctmsettingService;
	
	@Autowired
	ProcessSettingService processSettingService;
	
	@Autowired
	SysNodeAttrService sysNodeAttrService;
	
	/**
     * 获取合同审批可设置处理人的节点
     */
    @RequestMapping(value = "/node/list",method = RequestMethod.GET)
    public Result getSettingNodes(){
    	return Result.success().addObject(ctmsettingService.getSettingNodes());
    }
    
    /**
     * 获取合同审批节点审批人列表
     */
    @RequestMapping(value = "/node/handler",method = RequestMethod.GET)
    public Result getNodesHandler(String nodeId){
    	return Result.success().addObject(processSettingService.getNodesHandler(nodeId));
    }
    
    /**
     * 更新合同审批节点审批人列表
     */
    @RequestMapping(value = "/node/update",method = RequestMethod.PUT)
    public Result updateNodesHandler(@RequestBody NodesUserListVo vo){
    	processSettingService.updateNodesHandler(vo.getData());
    	return Result.success();
    }
    
    /**
     * 获取合同审批字段属性列表
     */
    @RequestMapping(value = "/param/list",method = RequestMethod.GET)
    public PageResult getCtmParameter(SysParameter param){
    	ParaMap map = ctmsettingService.getCtmParameter(param);
    	Object o = map.get("object");
		Page<?> page = (Page<?>) map.get("page");
		Integer pageNum = (Integer) map.get("pageNum");
		return PageResult.success().addObject(o).addPageInfo(page, pageNum);
    }
	
    /**
     * 更新合同审批字段属性列表
     */
    @RequestMapping(value = "/param/update",method = RequestMethod.PUT)
    public Result updateCtmParameter(@RequestBody ParmeterVo data){
    	return ctmsettingService.updateCtmParameter(data.getData());
    }
    
    /**
     * 添加合同审批字段属性
     */
    @RequestMapping(value = "/param/add",method = RequestMethod.POST)
    public Result addCtmParameter(SysParameter param){
    	if(ctmsettingService.addCtmParameter(param) == 0) {
    		return Result.failed("属性名称已存在！");
    	}
    	return Result.success().addObject(ctmsettingService.addCtmParameter(param));
    }
    
    /**
     * 通过合同属性获取审批人列表
     */
    @RequestMapping(value = "/attr/list",method = RequestMethod.GET)
    public Result getCtmHanderByAttr(String attr){
    	return Result.success().addObject(sysNodeAttrService.getNodeAttrList(attr));
    }
    
    /**
     * 更新审批人
     */
    @RequestMapping(value = "/attr/update",method = RequestMethod.POST)
    public Result updateNodeUserListByattr(@RequestBody CtmNodesAttrVo filter){
    	sysNodeAttrService.updateNodeUserListByattr(filter);
    	return Result.success();
    }
    
}
