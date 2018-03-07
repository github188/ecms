package com.ecaray.ecms.services.cwa.process;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ecaray.ecms.dao.mapper.cwa.CwaOutSideDelMapper;
import com.ecaray.ecms.dao.mapper.cwa.CwaOutSideMapper;
import com.ecaray.ecms.entity.cwa.CwaOutSide;
import com.ecaray.ecms.entity.cwa.CwaOutSideDel;
import com.ecaray.ecms.entity.process.ProcessBase;
import com.ecaray.ecms.entity.process.SysProDone;
import com.ecaray.ecms.entity.process.SysProcess;
import com.ecaray.ecms.services.authority.UserService;
import com.ecaray.ecms.services.processes.BaseProcessService;

@Service
public class OutSideProcess extends BaseProcessService {

	@Autowired
	private CwaOutSideMapper cwaOutSideMapper;
	@Autowired
	private UserService userService;
	
	@Autowired
	private CwaOutSideDelMapper cwaOutSideDelMapper;
	

	@Override
	public ProcessBase setTitle(ProcessBase pro) {
		return null;
	}

	@Override
	public SysProcess setTodoMailInfo(ProcessBase pro, SysProcess process) {
		return null;
	}

	@Override
	public void startProcessCallBack(ProcessBase pro) throws Exception {
	}

	@Override
	public Map<String, Object> getProcessRotaParam(SysProDone done, SysProcess process) {
		Map<String,Object> map = new HashMap<>();
		return map;
	}

	@Override
	public ProcessBase getObjectByProcess(SysProcess process) {
		CwaOutSide cwaOutSide = getOutSideById(process.getRelId());
		List<CwaOutSideDel> list = cwaOutSideDelMapper.selectListByOutId(cwaOutSide.getId());
		cwaOutSide.setList(list);
		cwaOutSide.setUserName(userService.getUserById(cwaOutSide.getUserId()).getRealname());
		return cwaOutSide;
	}

	private CwaOutSide getOutSideById(String relId) {
		return cwaOutSideMapper.selectByPrimaryKey(relId);
	}

	@Override
	public void rejectProcessCallBack(SysProDone done,ProcessBase pro, SysProcess process) {
	}

	@Override
	public void cancelProcessCallBack(ProcessBase pro, SysProcess process) {
	}

	@Override
	public void agreeProcessCallBack(SysProDone done,ProcessBase pro, SysProcess process) throws Exception {
	}
	
	@Override
	public void rotaingProcessCallBack(ProcessBase pro, SysProcess process) {
	}
	
	@Override
	public ProcessBase bindingParamByMap(Map<String, Object> paramap) throws Exception {
		return  null;
	}
	
	
	public String saveProcessObject(ProcessBase pro) {
		return null;
	}
	
	public String updateOutSideDel(CwaOutSideDel outsidedel) {
		return null;
	}
	
	/**
	 * 通过用户id查询外出记录
	 */
	public List<CwaOutSide> getListByUserId(String userId) {
		List<CwaOutSide> outSide = cwaOutSideMapper.selectByUserId(userId);
		for (CwaOutSide outside : outSide) {
			List<CwaOutSideDel> list = cwaOutSideDelMapper.selectListByOutId(outside.getId());
			outside.setList(list);
		}
		return outSide;
	}
}
