package com.ecaray.ecms.services.ctm;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ecaray.ecms.commons.constant.Constants;
import com.ecaray.ecms.commons.constant.Result;
import com.ecaray.ecms.commons.utils.ParaMap;
import com.ecaray.ecms.commons.utils.StrUtils;
import com.ecaray.ecms.dao.mapper.authority.UserRoleMapper;
import com.ecaray.ecms.dao.mapper.process.SysNodesMapper;
import com.ecaray.ecms.dao.mapper.process.SysProDoingMapper;
import com.ecaray.ecms.dao.mapper.process.SysProcessMapper;
import com.ecaray.ecms.entity.process.SysNodes;
import com.ecaray.ecms.entity.process.SysParameter;
import com.ecaray.ecms.services.common.ParameterService;
import com.ecaray.ecms.services.processes.ProcessSettingService;

@Service
public class CtmSettingService implements Constants{
	
	@Autowired
	ProcessSettingService setService;
	@Autowired
	ParameterService parameterService;
	@Autowired
	UserRoleMapper userRoleMapper;
	@Autowired
	SysNodesMapper sysNodesMapper;
	@Autowired
	SysProcessMapper sysProcessMapper;
	@Autowired
	SysProDoingMapper sysProDoingMapper;
	
	/**
	 * 获取合同审批可设置处理人的节点
	 */
	public List<SysNodes> getSettingNodes(){
			return setService.getSettingNodes(ctm_type);
	}
	
	/**
	 * 获取合同相关字段设置参数
	 */
	public ParaMap getCtmParameter(SysParameter param){
		return parameterService.getParameterList(param);
	}
	
	/**
	 * 更新合同相关字段设置参数
	 */
	public Result updateCtmParameter(List<SysParameter> list){
		for (SysParameter sysParameter : list) {
			if(!parameterService.hasTheName(sysParameter)){
				return Result.failed("属性名称已存在！");
			}
			if(StrUtils.isNull(sysParameter.getId())) {
				parameterService.addParameter(sysParameter);
			}else{
				sysParameter.setUpdateTime(System.currentTimeMillis());
				parameterService.updateParameter(sysParameter);
			}
		}
		return Result.success();
	}
	
	/**
	 * 添加合同相关字段
	 */
	public int addCtmParameter(SysParameter param) {
		return parameterService.addParameter(param);
	}
	
}
